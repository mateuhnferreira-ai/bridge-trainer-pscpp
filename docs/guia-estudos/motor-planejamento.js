// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.2
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Ler o banco de conteúdo.
// 2. Ignorar aulas já concluídas.
// 3. Calcular prioridade estratégica.
// 4. Considerar carga cognitiva.
// 5. Evitar dois conteúdos pesados seguidos.
// 6. Montar sequência equilibrada.
// 7. Considerar o último estudo REAL.
// 8. Trabalhar com histórico do Pomodoro.
// 9. Manter continuidade por até
//    3 Pomodoros completos (1h30).
// 10. Liberar alternância após o ciclo.
// 11. Manter compatibilidade com progresso.js.
//
// IMPORTANTE:
//
// O motor NÃO salva progresso.
//
// Ele apenas decide/recomenda
// a sequência estratégica de estudo.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const MOTOR_LIMITE_PLANO_PADRAO = 20;


// 3 blocos completos de 30 minutos

const MOTOR_BLOCOS_POR_CICLO = 3;


// Duração esperada de um Pomodoro completo

const MOTOR_SEGUNDOS_BLOCO_COMPLETO =
    30 * 60;


// Histórico criado pelo pomodoro.js

const MOTOR_CHAVE_HISTORICO_POMODORO =
    "bridgeTrainerPSCPP_historicoPomodoro";


// Bônus normal para assunto já iniciado

const MOTOR_BONUS_ASSUNTO_INICIADO =
    1.15;


// Penalidade:
//
// Alta -> Alta

const MOTOR_PENALIDADE_ALTA_SEGUIDA =
    0.55;


// Recuperação cognitiva:
//
// Alta -> Média/Baixa

const MOTOR_BONUS_RECUPERACAO =
    1.25;


// Pequena penalidade para repetir
// imediatamente a mesma disciplina
// quando a continuidade não estiver
// sendo obrigatória.

const MOTOR_PENALIDADE_MESMA_DISCIPLINA =
    0.92;


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
// CARREGAR HISTÓRICO POMODORO
// =====================================
//
// Primeiro tenta utilizar a função
// do pomodoro.js.
//
// Caso pomodoro.js não esteja carregado
// naquela página, lê diretamente o
// mesmo localStorage.
//
// Assim planejamento.html também pode
// considerar o histórico real.

function obterHistoricoPomodoroMotor() {

    if (
        typeof carregarHistoricoPomodoro ===
        "function"
    ) {

        const historico =
            carregarHistoricoPomodoro();


        if (
            Array.isArray(
                historico
            )
        ) {

            return historico;

        }

    }


    try {

        const salvo =
            localStorage.getItem(
                MOTOR_CHAVE_HISTORICO_POMODORO
            );


        if (!salvo) {

            return [];

        }


        const dados =
            JSON.parse(
                salvo
            );


        return Array.isArray(
            dados
        )
            ? dados
            : [];

    }
    catch (erro) {

        console.warn(
            "Não foi possível ler o histórico Pomodoro:",
            erro
        );


        return [];

    }

}


// =====================================
// OBTER ÚLTIMO BLOCO REAL
// =====================================

function obterUltimoBlocoPomodoroMotor() {

    if (
        typeof obterUltimoBlocoPomodoro ===
        "function"
    ) {

        const bloco =
            obterUltimoBlocoPomodoro();


        if (bloco) {

            return bloco;

        }

    }


    const historico =
        obterHistoricoPomodoroMotor();


    if (
        historico.length === 0
    ) {

        return null;

    }


    return (
        historico[
            historico.length - 1
        ] || null
    );

}


// =====================================
// VERIFICAR BLOCO COMPLETO
// =====================================
//
// Somente um Pomodoro realmente concluído
// conta para o ciclo de 3 blocos.
//
// Pausa manual,
// saída da página,
// interrupções etc.
// não contam como bloco completo.

function blocoPomodoroFoiCompleto(
    bloco
) {

    if (!bloco) {

        return false;

    }


    return (

        bloco.motivo ===
            "bloco-concluido" &&

        Number(
            bloco.segundos || 0
        ) >=
            MOTOR_SEGUNDOS_BLOCO_COMPLETO

    );

}


// =====================================
// ANALISAR CICLO POMODORO ATUAL
// =====================================
//
// Descobre:
//
// - qual foi o último assunto estudado;
// - quantos Pomodoros completos consecutivos
//   desse assunto existem desde a última
//   mudança de assunto.
//
// Blocos parciais do MESMO assunto não
// contam como completos, mas também não
// quebram a continuidade.
//
// Um bloco de OUTRO assunto encerra
// a sequência anterior.

function analisarCicloPomodoroAtual() {

    const historico =
        obterHistoricoPomodoroMotor();


    if (
        historico.length === 0
    ) {

        return {

            disciplina: null,

            aula: null,

            blocosCompletos: 0,

            cicloCompleto: false

        };

    }


    const ultimoBloco =
        historico[
            historico.length - 1
        ];


    if (
        !ultimoBloco ||
        !ultimoBloco.disciplina ||
        !ultimoBloco.aula
    ) {

        return {

            disciplina: null,

            aula: null,

            blocosCompletos: 0,

            cicloCompleto: false

        };

    }


    const disciplinaAlvo =
        ultimoBloco.disciplina;


    const aulaAlvo =
        ultimoBloco.aula;


    let blocosCompletos = 0;


    for (
        let indice =
            historico.length - 1;

        indice >= 0;

        indice--
    ) {

        const bloco =
            historico[
                indice
            ];


        if (
            !bloco
        ) {

            continue;

        }


        // Mudou de assunto:
        // termina o ciclo analisado.

        if (
            bloco.disciplina !==
                disciplinaAlvo ||
            bloco.aula !==
                aulaAlvo
        ) {

            break;

        }


        // Só bloco completo entra na contagem.

        if (
            blocoPomodoroFoiCompleto(
                bloco
            )
        ) {

            blocosCompletos++;

        }

    }


    return {

        disciplina:
            disciplinaAlvo,

        aula:
            aulaAlvo,

        blocosCompletos:
            blocosCompletos,

        cicloCompleto:
            blocosCompletos >=
            MOTOR_BLOCOS_POR_CICLO

    };

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


    // Assunto parcialmente iniciado
    // recebe pequeno bônus de continuidade.

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


                // Aula concluída sai
                // do plano normal.

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
// OBTER ITEM DO ÚLTIMO ESTUDO
// =====================================

function obterUltimoItemRealEstudado() {

    const ultimoBloco =
        obterUltimoBlocoPomodoroMotor();


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


    if (!assunto) {

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
// LOCALIZAR ASSUNTO DO CICLO ATUAL
// =====================================
//
// Enquanto não houver 3 blocos completos,
// este assunto permanece recomendado,
// desde que ainda não esteja concluído.

function obterItemDeContinuidade(
    planoBruto
) {

    const ciclo =
        analisarCicloPomodoroAtual();


    if (
        !ciclo.disciplina ||
        !ciclo.aula
    ) {

        return null;

    }


    // Já completou 3 Pomodoros.
    // Hora de liberar a alternância.

    if (
        ciclo.cicloCompleto
    ) {

        return null;

    }


    const item =
        planoBruto.find(

            candidato =>

                candidato.idDisciplina ===
                    ciclo.disciplina &&

                candidato.idAssunto ===
                    ciclo.aula

        );


    // Se não estiver mais no plano bruto,
    // provavelmente foi concluído.

    if (!item) {

        return null;

    }


    return {

        ...item,

        continuidadePomodoro:
            true,

        blocosCompletosNoCiclo:
            ciclo.blocosCompletos,

        blocosRestantesNoCiclo:
            Math.max(

                0,

                MOTOR_BLOCOS_POR_CICLO -
                ciclo.blocosCompletos

            )

    };

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


    // Alta -> Alta
    // deve ser evitado depois que
    // o ciclo de continuidade terminou.

    if (
        cargaAnterior === "Alta" &&
        cargaAtual === "Alta"
    ) {

        prioridade *=
            MOTOR_PENALIDADE_ALTA_SEGUIDA;

    }


    // Depois de conteúdo Alta,
    // Média/Baixa recebe bônus.

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
// PENALIDADE POR MESMA DISCIPLINA
// =====================================

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
// ESCOLHER PRÓXIMO ITEM
// =====================================

function escolherProximoItem(
    candidatos,
    ultimoItem
) {

    let melhor = null;

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


    let ultimoItem =
        obterUltimoItemRealEstudado();


    // =================================
    // REGRA DE CONTINUIDADE
    //
    // Se o assunto atual ainda possui
    // menos de 3 Pomodoros completos,
    // ele permanece como PRIMEIRA
    // recomendação.
    // =================================

    const itemContinuidade =
        obterItemDeContinuidade(
            candidatos
        );


    if (
        itemContinuidade &&
        limite > 0
    ) {

        sequencia.push(
            itemContinuidade
        );


        const indice =
            candidatos.findIndex(

                item =>

                    item.idDisciplina ===
                        itemContinuidade.idDisciplina &&

                    item.idAssunto ===
                        itemContinuidade.idAssunto

            );


        if (
            indice >= 0
        ) {

            candidatos.splice(
                indice,
                1
            );

        }


        ultimoItem =
            itemContinuidade;

    }


    // =================================
    // RESTANTE DA SEQUÊNCIA
    // =================================

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


        ultimoItem =
            escolhido;

    }


    return sequencia;

}


// =====================================
// GERAR PLANO DE ESTUDO
// =====================================

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
// OBTER SITUAÇÃO DO CICLO ATUAL
// =====================================
//
// Pode ser usado depois pela interface
// para mostrar:
//
// "2 de 3 blocos concluídos"

function obterSituacaoCicloPomodoro() {

    const ciclo =
        analisarCicloPomodoroAtual();


    if (
        !ciclo.disciplina ||
        !ciclo.aula
    ) {

        return null;

    }


    return {

        disciplina:
            ciclo.disciplina,

        aula:
            ciclo.aula,

        blocosCompletos:
            ciclo.blocosCompletos,

        totalBlocos:
            MOTOR_BLOCOS_POR_CICLO,

        blocosRestantes:
            Math.max(

                0,

                MOTOR_BLOCOS_POR_CICLO -
                ciclo.blocosCompletos

            ),

        cicloCompleto:
            ciclo.cicloCompleto

    };

}


// =====================================
// RECALCULAR APÓS BLOCO POMODORO
// =====================================

document.addEventListener(

    "pomodoroPSCPPBlocoRegistrado",

    function () {

        const proximo =
            obterProximoEstudo();


        const ciclo =
            obterSituacaoCicloPomodoro();


        document.dispatchEvent(

            new CustomEvent(

                "planejamentoPSCPPAtualizado",

                {

                    detail: {

                        proximoEstudo:
                            proximo,

                        cicloPomodoro:
                            ciclo

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
    "MOTOR DE PLANEJAMENTO PSCPP v3.2 CARREGADO"
);


// =====================================
// FIM DO MOTOR DE PLANEJAMENTO v3.2
// =====================================
