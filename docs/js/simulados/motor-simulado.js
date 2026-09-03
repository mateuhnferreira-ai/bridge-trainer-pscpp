// =====================================
// MOTOR DE SIMULADOS PSCPP v1.0
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Ler a configuração salva.
// 2. Reunir questões das disciplinas escolhidas.
// 3. Embaralhar o banco disponível.
// 4. Selecionar a quantidade solicitada.
// 5. Preparar uma tentativa de simulado.
// 6. Não corrigir respostas.
// 7. Não controlar cronômetro.
//
// O cronômetro e a execução visual ficarão
// na página realizar.html.
// =====================================


// =====================================
// ESTADO DO SIMULADO
// =====================================

let simuladoAtualPSCPP = {

    configuracao: null,

    questoes: [],

    iniciado: false,

    finalizado: false

};


// =====================================
// UTILITÁRIO DE EMBARALHAMENTO
// =====================================
//
// Algoritmo Fisher-Yates
// =====================================

function embaralharQuestoesPSCPP(lista) {

    const copia = [
        ...lista
    ];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temporario =
            copia[i];


        copia[i] =
            copia[j];


        copia[j] =
            temporario;

    }


    return copia;

}


// =====================================
// OBTER QUESTÕES DE UMA DISCIPLINA
// =====================================
//
// Cada arquivo de banco deverá disponibilizar
// sua própria função:
//
// obterQuestoesArteNavalPSCPP()
// obterQuestoesManobrabilidadePSCPP()
// obterQuestoesConhecimentosGeraisPSCPP()
// obterQuestoesRegulamentacaoPSCPP()
// obterQuestoesMeteorologiaPSCPP()
// obterQuestoesNavegacaoPSCPP()
// =====================================

function obterQuestoesPorDisciplinaPSCPP(
    disciplinaId
) {

    switch (disciplinaId) {


        case "arte-naval":

            if (
                typeof obterQuestoesArteNavalPSCPP ===
                "function"
            ) {

                return obterQuestoesArteNavalPSCPP();

            }

            break;


        case "manobrabilidade":

            if (
                typeof obterQuestoesManobrabilidadePSCPP ===
                "function"
            ) {

                return obterQuestoesManobrabilidadePSCPP();

            }

            break;


        case "conhecimentos-gerais":

            if (
                typeof obterQuestoesConhecimentosGeraisPSCPP ===
                "function"
            ) {

                return obterQuestoesConhecimentosGeraisPSCPP();

            }

            break;


        case "regulamentacao":

            if (
                typeof obterQuestoesRegulamentacaoPSCPP ===
                "function"
            ) {

                return obterQuestoesRegulamentacaoPSCPP();

            }

            break;


        case "meteorologia":

            if (
                typeof obterQuestoesMeteorologiaPSCPP ===
                "function"
            ) {

                return obterQuestoesMeteorologiaPSCPP();

            }

            break;


        case "navegacao":

            if (
                typeof obterQuestoesNavegacaoPSCPP ===
                "function"
            ) {

                return obterQuestoesNavegacaoPSCPP();

            }

            break;

    }


    console.warn(
        "Bridge Trainer PSCPP: banco não encontrado para a disciplina:",
        disciplinaId
    );


    return [];

}


// =====================================
// REUNIR QUESTÕES DAS DISCIPLINAS
// =====================================

function reunirQuestoesDisciplinasPSCPP(
    disciplinas
) {

    if (
        !Array.isArray(
            disciplinas
        )
    ) {

        return [];

    }


    let questoes = [];


    disciplinas.forEach(
        function(disciplinaId) {

            const questoesDisciplina =
                obterQuestoesPorDisciplinaPSCPP(
                    disciplinaId
                );


            if (
                Array.isArray(
                    questoesDisciplina
                )
            ) {

                questoes =
                    questoes.concat(
                        questoesDisciplina
                    );

            }

        }
    );


    return questoes;

}


// =====================================
// REMOVER QUESTÕES DUPLICADAS
// =====================================

function removerQuestoesDuplicadasPSCPP(
    questoes
) {

    const idsUtilizados =
        new Set();


    return questoes.filter(
        function(questao) {

            if (
                !questao ||
                !questao.id
            ) {

                return false;

            }


            if (
                idsUtilizados.has(
                    questao.id
                )
            ) {

                return false;

            }


            idsUtilizados.add(
                questao.id
            );


            return true;

        }
    );

}


// =====================================
// SELECIONAR QUESTÕES
// =====================================

function selecionarQuestoesSimuladoPSCPP(
    banco,
    quantidade
) {

    const numero =
        Number(
            quantidade
        );


    if (
        !Array.isArray(
            banco
        )
    ) {

        return [];

    }


    if (
        !Number.isInteger(
            numero
        ) ||
        numero <= 0
    ) {

        return [];

    }


    const bancoSemDuplicadas =
        removerQuestoesDuplicadasPSCPP(
            banco
        );


    const embaralhadas =
        embaralharQuestoesPSCPP(
            bancoSemDuplicadas
        );


    return embaralhadas.slice(
        0,
        numero
    );

}


// =====================================
// PREPARAR SIMULADO
// =====================================

function prepararSimuladoPSCPP() {

    const configuracao =
        carregarConfiguracaoSimuladoPSCPP();


    if (!configuracao) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma configuração de simulado foi encontrada."

        };

    }


    const validacao =
        validarConfiguracaoSimuladoPSCPP();


    if (
        !validacao.valida
    ) {

        return {

            sucesso: false,

            mensagem:
                validacao.mensagem

        };

    }


    // =================================
    // PROVAS ANTERIORES
    // =================================

    if (
        configuracao.tipo ===
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR
    ) {

        return {

            sucesso: false,

            mensagem:
                "O carregamento de provas anteriores será implementado em módulo próprio."

        };

    }


    // =================================
    // SIMULADO PERSONALIZADO
    // =================================

    const banco =
        reunirQuestoesDisciplinasPSCPP(
            configuracao.disciplinas
        );


    if (
        banco.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "Não há questões disponíveis nas disciplinas selecionadas."

        };

    }


    if (
        banco.length <
        configuracao.quantidade
    ) {

        return {

            sucesso: false,

            mensagem:
                "O banco possui apenas " +
                banco.length +
                " questões disponíveis para essa seleção. " +
                "O simulado solicitado possui " +
                configuracao.quantidade +
                " questões."

        };

    }


    const questoesSelecionadas =
        selecionarQuestoesSimuladoPSCPP(

            banco,

            configuracao.quantidade

        );


    simuladoAtualPSCPP = {

        configuracao: {
            ...configuracao,
            disciplinas: [
                ...configuracao.disciplinas
            ]
        },

        questoes:
            questoesSelecionadas,

        iniciado:
            false,

        finalizado:
            false

    };


    return {

        sucesso: true,

        mensagem:
            "Simulado preparado com sucesso.",

        quantidade:
            simuladoAtualPSCPP.questoes.length,

        disciplinas: [
            ...configuracao.disciplinas
        ]

    };

}


// =====================================
// OBTER SIMULADO ATUAL
// =====================================

function obterSimuladoAtualPSCPP() {

    return {

        configuracao:
            simuladoAtualPSCPP.configuracao
                ? {
                    ...simuladoAtualPSCPP.configuracao,

                    disciplinas: [
                        ...simuladoAtualPSCPP
                            .configuracao
                            .disciplinas
                    ]
                }
                : null,

        questoes: [
            ...simuladoAtualPSCPP.questoes
        ],

        iniciado:
            simuladoAtualPSCPP.iniciado,

        finalizado:
            simuladoAtualPSCPP.finalizado

    };

}


// =====================================
// OBTER QUESTÕES DO SIMULADO ATUAL
// =====================================

function obterQuestoesSimuladoAtualPSCPP() {

    return [
        ...simuladoAtualPSCPP.questoes
    ];

}


// =====================================
// OBTER QUANTIDADE
// =====================================

function obterQuantidadeQuestoesSimuladoAtualPSCPP() {

    return simuladoAtualPSCPP
        .questoes
        .length;

}


// =====================================
// MARCAR COMO INICIADO
// =====================================

function marcarSimuladoComoIniciadoPSCPP() {

    if (
        simuladoAtualPSCPP
            .questoes
            .length === 0
    ) {

        return false;

    }


    simuladoAtualPSCPP.iniciado =
        true;


    simuladoAtualPSCPP.finalizado =
        false;


    return true;

}


// =====================================
// MARCAR COMO FINALIZADO
// =====================================

function marcarSimuladoComoFinalizadoPSCPP() {

    if (
        !simuladoAtualPSCPP.iniciado
    ) {

        return false;

    }


    simuladoAtualPSCPP.finalizado =
        true;


    return true;

}


// =====================================
// LIMPAR SIMULADO
// =====================================

function limparSimuladoAtualPSCPP() {

    simuladoAtualPSCPP = {

        configuracao: null,

        questoes: [],

        iniciado: false,

        finalizado: false

    };

}


// =====================================
// INFORMAÇÃO DE INICIALIZAÇÃO
// =====================================

console.info(
    "Bridge Trainer PSCPP: motor de simulados v1.0 carregado."
);
