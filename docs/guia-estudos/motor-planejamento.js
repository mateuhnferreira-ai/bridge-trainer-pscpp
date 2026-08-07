// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.0
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
// 7. Manter compatibilidade com progresso.js.
//
// IMPORTANTE:
// Este motor NÃO salva progresso.
// Ele apenas recomenda a ordem de estudo.
// =====================================


// =====================================
// CONFIGURAÇÕES DO MOTOR
// =====================================

const MOTOR_LIMITE_PLANO_PADRAO = 20;


// Bônus para aulas já iniciadas.
// Não é alto o suficiente para "prender"
// o aluno indefinidamente no mesmo assunto.

const MOTOR_BONUS_ASSUNTO_INICIADO = 1.15;


// Redução aplicada quando dois assuntos
// consecutivos seriam de carga cognitiva alta.

const MOTOR_PENALIDADE_ALTA_SEGUIDA = 0.55;


// Pequeno bônus para conteúdos de carga
// média ou baixa quando o último estudo
// recomendado foi pesado.

const MOTOR_BONUS_RECUPERACAO = 1.25;


// =====================================
// OBTER PROGRESSO SEGURO
// =====================================

function obterProgressoSeguro(
    idDisciplina,
    idAssunto
) {

    if (
        typeof obterProgressoAula !== "function"
    ) {

        return 0;

    }


    return obterProgressoAula(
        idDisciplina,
        idAssunto
    ) || 0;

}


// =====================================
// OBTER PESO DA CONFIGURAÇÃO
// =====================================

function obterPesoConfiguracao(
    nomeDisciplina
) {

    if (
        typeof configuracaoEstudo === "undefined" ||
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


    if (valor === "alta") {

        return "Alta";

    }


    if (valor === "baixa") {

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
        dadosDisciplina.pesoDisciplina || 1;


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


    // Aula iniciada recebe pequeno bônus,
    // mas não domina o algoritmo.

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

    let plano = [];


    for (
        let idDisciplina in conteudoPSCPP
    ) {

        const dadosDisciplina =
            conteudoPSCPP[
                idDisciplina
            ];


        const assuntos =
            dadosDisciplina.assuntos || [];


        assuntos.forEach(
            assunto => {

                const percentualConcluido =
                    obterProgressoSeguro(
                        idDisciplina,
                        assunto.id
                    );


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


    if (!ultimoItem) {

        return prioridade;

    }


    const cargaAtual =
        item.cargaCognitiva;


    const cargaAnterior =
        ultimoItem.cargaCognitiva;


    // Regra principal:
    // evitar Alta -> Alta.

    if (
        cargaAnterior === "Alta" &&
        cargaAtual === "Alta"
    ) {

        prioridade *=
            MOTOR_PENALIDADE_ALTA_SEGUIDA;

    }


    // Depois de conteúdo pesado,
    // favorecer um bloco intermediário ou leve.

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
// EVITAR REPETIÇÃO IMEDIATA
// DA MESMA DISCIPLINA
// =====================================
//
// Não proíbe repetir disciplina.
// Apenas usa como desempate quando
// houver alternativa estratégica próxima.

function calcularPenalidadeDisciplina(
    item,
    ultimoItem
) {

    if (!ultimoItem) {

        return 1;

    }


    if (
        item.idDisciplina ===
        ultimoItem.idDisciplina
    ) {

        return 0.92;

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

    let melhorPontuacao = -Infinity;


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


    if (melhor) {

        melhor.prioridade =
            Math.round(
                melhorPontuacao * 100
            ) / 100;

    }


    return melhor;

}


// =====================================
// CONVERTER ÚLTIMO BLOCO POMODORO
// EM CONTEXTO PARA O MOTOR
// =====================================

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
        dadosDisciplina.assuntos.find(
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
// GERAR SEQUÊNCIA EQUILIBRADA
// =====================================

function gerarSequenciaEquilibrada(
    planoBruto,
    limite
) {

    const candidatos =
        [...planoBruto];


    const sequencia = [];


    // Agora o motor começa considerando
    // aquilo que foi REALMENTE estudado
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


        if (!escolhido) {

            break;

        }


        sequencia.push(
            escolhido
        );


        const indice =
            candidatos.indexOf(
                escolhido
            );


        if (indice >= 0) {

            candidatos.splice(
                indice,
                1
            );

        }


        // Depois da primeira escolha,
        // a própria sequência recomendada
        // passa a fornecer o contexto.

        ultimoItem =
            escolhido;

    }


    return sequencia;

}

// =====================================
// GERAR PLANO DE ESTUDO
// =====================================
//
// Função principal mantida com o mesmo nome
// para não quebrar app-planejamento.js.

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
//
// Será útil para:
// - página principal
// - Pomodoro
// - coaching
// - "Próxima Aula"

function obterProximoEstudo() {

    const plano =
        gerarPlanoEstudo(1);


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

    return gerarPlanoEstudo(
        quantidade
    );

}


// =====================================
// DEBUG
// =====================================

console.log(
    "MOTOR DE PLANEJAMENTO PSCPP v3.0 CARREGADO"
);


// =====================================
// FIM DO MOTOR DE PLANEJAMENTO v3.0
// =====================================
