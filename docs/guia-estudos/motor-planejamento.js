// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.1
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Ler o banco de conteúdo.
// 2. Ignorar aulas já concluídas.
// 3. Calcular prioridade estratégica.
// 4. Considerar carga cognitiva.
// 5. Evitar dois conteúdos pesados seguidos.
// 6. Montar sequência equilibrada de estudos.
// 7. Considerar o último estudo REAL registrado
//    pelo Pomodoro.
// 8. Manter compatibilidade com progresso.js.
//
// IMPORTANTE:
// Este motor NÃO salva progresso.
// Ele apenas recomenda a ordem de estudo.
// =====================================


// =====================================
// CONFIGURAÇÕES DO MOTOR
// =====================================

const MOTOR_LIMITE_PLANO_PADRAO = 20;


// Bônus para uma aula parcialmente iniciada.
// Ajuda na continuidade, mas não obriga o
// sistema a permanecer indefinidamente nela.

const MOTOR_BONUS_ASSUNTO_INICIADO = 1.15;


// Penalidade aplicada quando um conteúdo
// de carga cognitiva Alta seria seguido
// imediatamente por outro conteúdo Alta.

const MOTOR_PENALIDADE_ALTA_SEGUIDA = 0.55;


// Bônus para conteúdos Média ou Baixa
// quando o último estudo foi de carga Alta.

const MOTOR_BONUS_RECUPERACAO = 1.25;


// Pequena penalidade para repetir imediatamente
// a mesma disciplina quando existe alternativa.

const MOTOR_PENALIDADE_MESMA_DISCIPLINA = 0.92;


// =====================================
// OBTER PROGRESSO SEGURO
// =====================================

function obterProgressoSeguro(
    idDisciplina,
    idAssunto
) {

    if (
        typeof obterProgressoAula !==
        "function"
    ) {

        return 0;

    }


    return (
        obterProgressoAula(
            idDisciplina,
            idAssunto
        ) || 0
    );

}


// =====================================
// OBTER PESO DA CONFIGURAÇÃO
// =====================================

function obterPesoConfiguracao(
    nomeDisciplina
) {

    if (
        typeof configuracaoEstudo ===
            "undefined" ||
        !configuracaoEstudo ||
        !configuracaoEstudo.pesosPrioridade
    ) {

        return 1;

    }


    return (

        configuracaoEstudo
            .pesosPrioridade[
                nomeDisciplina
            ] || 1

    );

}


// =====================================
// NORMALIZAR CARGA COGNITIVA
// =====================================

function normalizarCargaCognitiva(
    carga
) {

    const valor =
        String(
            carga || "Média"
        )
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );


    if (
        valor === "alta"
    ) {

        return "Alta";

    }


    if (
        valor === "baixa"
    ) {

        return "Baixa";

    }


    return "Média";

}


// =====================================
// CALCULAR PRIORIDADE BASE
// =====================================

function calcularPrioridadeBase(
    dadosDisciplina,
    assunto,
    percentualConcluido
) {

    const pesoDisciplina =
        dadosDisciplina
            .pesoDisciplina || 1;


    const pesoAssunto =
        assunto.peso || 1;


    const pesoConfiguracao =
        obterPesoConfiguracao(
            dadosDisciplina.nome
        );


    let prioridade =

        pesoDisciplina *
        pesoAssunto *
        pesoConfiguracao;


    // Aula parcialmente iniciada recebe
    // pequeno bônus de continuidade.

    if (
        percentualConcluido > 0 &&
        percentualConcluido < 100
    ) {

        prioridade *=
            MOTOR_BONUS_ASSUNTO_INICIADO;

    }


    return prioridade;

}


// =====================================
// GERAR PLANO BRUTO
// =====================================

function gerarPlanoBruto() {

    const plano = [];


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        console.warn(
            "conteudoPSCPP não está disponível."
        );


        return plano;

    }


    for (
        const idDisciplina
        in conteudoPSCPP
    ) {

        const dadosDisciplina =
            conteudoPSCPP[
                idDisciplina
            ];


        const assuntos =
            Array.isArray(
                dadosDisciplina.assuntos
            )
                ? dadosDisciplina.assuntos
                : [];


        assuntos.forEach(
            assunto => {

                const percentualConcluido =
                    obterProgressoSeguro(

                        idDisciplina,

                        assunto.id

                    );


                // Aula completamente concluída
                // não entra mais no plano normal.

                if (
                    percentualConcluido >= 100
                ) {

                    return;

                }


                const prioridadeBase =
                    calcularPrioridadeBase(

                        dadosDisciplina,

                        assunto,

                        percentualConcluido

                    );


                plano.push({

                    idDisciplina:
                        idDisciplina,

                    idAssunto:
                        assunto.id,

                    disciplina:
                        dadosDisciplina.nome,

                    assunto:
                        assunto.nome,

                    horas:
                        assunto.horas || 0,

                    importancia:
                        assunto.importancia ||
                        "Média",

                    pesoDisciplina:
                        dadosDisciplina
                            .pesoDisciplina || 1,

                    pesoAssunto:
                        assunto.peso || 1,

                    cargaCognitiva:
                        normalizarCargaCognitiva(
                            assunto.cargaCognitiva
                        ),

                    prioridadeBase:
                        prioridadeBase,

                    prioridade:
                        prioridadeBase,

                    percentualConcluido:
                        percentualConcluido

                });

            }
        );

    }


    plano.sort(
        (a, b) =>
            b.prioridadeBase -
            a.prioridadeBase
    );


    return plano;

}


// =====================================
// AJUSTAR PRIORIDADE PELA CARGA
// =====================================

function calcularPrioridadeContextual(
    item,
    ultimoItem
) {

    let prioridade =
        item.prioridadeBase;


    if (
        !ultimoItem
    ) {

        return prioridade;

    }


    const cargaAtual =
        normalizarCargaCognitiva(
            item.cargaCognitiva
        );


    const cargaAnterior =
        normalizarCargaCognitiva(
            ultimoItem.cargaCognitiva
        );


    // =================================
    // REGRA PRINCIPAL
    // Alta -> Alta deve ser evitado.
    // =================================

    if (
        cargaAnterior === "Alta" &&
        cargaAtual === "Alta"
    ) {

        prioridade *=
            MOTOR_PENALIDADE_ALTA_SEGUIDA;

    }


    // =================================
    // RECUPERAÇÃO COGNITIVA
    // Depois de Alta, favorecer Média
    // ou Baixa.
    // =================================

    if (
        cargaAnterior === "Alta" &&
        (
            cargaAtual === "Média" ||
            cargaAtual === "Baixa"
        )
    ) {

        prioridade *=
            MOTOR_BONUS_RECUPERACAO;

    }


    return prioridade;

}


// =====================================
// PENALIDADE POR REPETIÇÃO DE DISCIPLINA
// =====================================
//
// Não impede repetir disciplina.
//
// Serve apenas para favorecer diversidade
// quando dois candidatos possuem prioridade
// estratégica semelhante.

function calcularPenalidadeDisciplina(
    item,
    ultimoItem
) {

    if (
        !ultimoItem
    ) {

        return 1;

    }


    if (
        item.idDisciplina ===
        ultimoItem.idDisciplina
    ) {

        return
            MOTOR_PENALIDADE_MESMA_DISCIPLINA;

    }


    return 1;

}


// =====================================
// OBTER ÚLTIMO ITEM REAL ESTUDADO
// A PARTIR DO POMODORO
// =====================================
//
// O Pomodoro v3.0 registra:
//
// disciplina
// aula
// segundos
// início
// fim
//
// Aqui esses dados são convertidos para
// o formato esperado pelo motor.

function obterUltimoItemRealEstudado() {

    if (
        typeof obterUltimoBlocoPomodoro !==
        "function"
    ) {

        return null;

    }


    const ultimoBloco =
        obterUltimoBlocoPomodoro();


    if (
        !ultimoBloco ||
        !ultimoBloco.disciplina ||
        !ultimoBloco.aula
    ) {

        return null;

    }


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        return null;

    }


    const dadosDisciplina =
        conteudoPSCPP[
            ultimoBloco.disciplina
        ];


    if (
        !dadosDisciplina ||
        !Array.isArray(
            dadosDisciplina.assuntos
        )
    ) {

        return null;

    }


    const assunto =
        dadosDisciplina
            .assuntos
            .find(

                item =>
                    item.id ===
                    ultimoBloco.aula

            );


    if (
        !assunto
    ) {

        return null;

    }


    return {

        idDisciplina:
            ultimoBloco.disciplina,

        idAssunto:
            assunto.id,

        disciplina:
            dadosDisciplina.nome,

        assunto:
            assunto.nome,

        cargaCognitiva:
            normalizarCargaCognitiva(
                assunto.cargaCognitiva
            ),

        ultimoBlocoSegundos:
            ultimoBloco.segundos || 0,

        ultimoBlocoFim:
            ultimoBloco.fim || null

    };

}


// =====================================
// ESCOLHER PRÓXIMO ITEM
// =====================================

function escolherProximoItem(
    candidatos,
    ultimoItem
) {

    let melhor =
        null;


    let melhorPontuacao =
        -Infinity;


    candidatos.forEach(
        item => {

            let pontuacao =
                calcularPrioridadeContextual(

                    item,

                    ultimoItem

                );


            pontuacao *=
                calcularPenalidadeDisciplina(

                    item,

                    ultimoItem

                );


            if (
                pontuacao >
                melhorPontuacao
            ) {

                melhorPontuacao =
                    pontuacao;


                melhor =
                    item;

            }

        }
    );


    if (
        melhor
    ) {

        melhor.prioridade =
            Math.round(
                melhorPontuacao *
                100
            ) / 100;

    }


    return melhor;

}


// =====================================
// GERAR SEQUÊNCIA EQUILIBRADA
// =====================================

function gerarSequenciaEquilibrada(
    planoBruto,
    limite
) {

    const candidatos =
        [
            ...planoBruto
        ];


    const sequencia =
        [];


    // A PRIMEIRA decisão agora considera
    // aquilo que o usuário realmente estudou
    // no último bloco Pomodoro.

    let ultimoItem =
        obterUltimoItemRealEstudado();


    while (
        candidatos.length > 0 &&
        sequencia.length < limite
    ) {

        const escolhido =
            escolherProximoItem(

                candidatos,

                ultimoItem

            );


        if (
            !escolhido
        ) {

            break;

        }


        sequencia.push(
            escolhido
        );


        const indice =
            candidatos.indexOf(
                escolhido
            );


        if (
            indice >= 0
        ) {

            candidatos.splice(
                indice,
                1
            );

        }


        // Depois da primeira escolha,
        // cada recomendação passa a servir
        // como contexto para a seguinte.

        ultimoItem =
            escolhido;

    }


    return sequencia;

}


// =====================================
// GERAR PLANO DE ESTUDO
// =====================================
//
// Nome mantido para compatibilidade com:
//
// app-planejamento.js
// página principal
// futuras funções de coaching

function gerarPlanoEstudo(
    limite =
        MOTOR_LIMITE_PLANO_PADRAO
) {

    const planoBruto =
        gerarPlanoBruto();


    return gerarSequenciaEquilibrada(

        planoBruto,

        limite

    );

}


// =====================================
// OBTER PRÓXIMO ESTUDO
// =====================================

function obterProximoEstudo() {

    const plano =
        gerarPlanoEstudo(
            1
        );


    if (
        plano.length === 0
    ) {

        return null;

    }


    return plano[0];

}


// =====================================
// OBTER PRÓXIMOS ESTUDOS
// =====================================

function obterProximosEstudos(
    quantidade = 3
) {

    const quantidadeSegura =
        Math.max(
            1,
            Number(
                quantidade
            ) || 1
        );


    return gerarPlanoEstudo(
        quantidadeSegura
    );

}


// =====================================
// RECALCULAR APÓS NOVO BLOCO POMODORO
// =====================================
//
// O Pomodoro v3.0 dispara:
//
// pomodoroPSCPPBlocoRegistrado
//
// O motor não altera a interface diretamente.
// Apenas emite um novo evento informando que
// sua recomendação pode ter mudado.

document.addEventListener(

    "pomodoroPSCPPBlocoRegistrado",

    function () {

        const proximo =
            obterProximoEstudo();


        document.dispatchEvent(

            new CustomEvent(

                "planejamentoPSCPPAtualizado",

                {

                    detail: {

                        proximoEstudo:
                            proximo

                    }

                }

            )

        );

    }

);


// =====================================
// DEBUG
// =====================================

console.log(
    "MOTOR DE PLANEJAMENTO PSCPP v3.1 CARREGADO"
);


// =====================================
// FIM DO MOTOR DE PLANEJAMENTO v3.1
// =====================================
