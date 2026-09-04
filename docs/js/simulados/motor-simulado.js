// =====================================
// MOTOR DE SIMULADOS PSCPP v1.1
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Preparar simulados personalizados
// 2. Reunir questões das disciplinas
// 3. Eliminar questões duplicadas
// 4. Embaralhar simulados personalizados
// 5. Carregar provas anteriores
// 6. Preservar a ordem original das provas
//
// IMPORTANTE:
//
// Simulado personalizado:
// banco normal -> embaralhamento -> seleção
//
// Prova anterior:
// prova oficial -> ordem original -> todas as questões
// =====================================


// =====================================
// ESTADO DO SIMULADO
// =====================================

let simuladoAtualPSCPP = {

    configuracao: null,

    questoes: [],

    iniciado: false,

    finalizado: false,

    provaAnterior: null

};


// =====================================
// EMBARALHAR QUESTÕES
// =====================================

function embaralharQuestoesPSCPP(lista) {

    const copia = [...lista];


    for (

        let i = copia.length - 1;

        i > 0;

        i--

    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );


        const temporario = copia[i];

        copia[i] = copia[j];

        copia[j] = temporario;

    }


    return copia;

}


// =====================================
// OBTER QUESTÕES POR DISCIPLINA
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


    return [];

}


// =====================================
// REUNIR QUESTÕES DAS DISCIPLINAS
// =====================================

function reunirQuestoesDisciplinasPSCPP(
    disciplinas
) {

    let banco = [];


    if (!Array.isArray(disciplinas)) {

        return banco;

    }


    disciplinas.forEach(

        function(disciplinaId) {

            const questoes =
                obterQuestoesPorDisciplinaPSCPP(
                    disciplinaId
                );


            banco = banco.concat(
                questoes
            );

        }

    );


    return banco;

}


// =====================================
// REMOVER QUESTÕES DUPLICADAS
// =====================================

function removerQuestoesDuplicadasPSCPP(
    questoes
) {

    const mapa = new Map();


    questoes.forEach(

        function(questao) {

            if (
                !questao ||
                !questao.id
            ) {

                return;

            }


            if (
                !mapa.has(
                    questao.id
                )
            ) {

                mapa.set(
                    questao.id,
                    questao
                );

            }

        }

    );


    return Array.from(
        mapa.values()
    );

}


// =====================================
// SELECIONAR QUESTÕES
// SIMULADO PERSONALIZADO
// =====================================

function selecionarQuestoesSimuladoPSCPP(
    banco,
    quantidade
) {

    const bancoSemDuplicadas =
        removerQuestoesDuplicadasPSCPP(
            banco
        );


    const bancoEmbaralhado =
        embaralharQuestoesPSCPP(
            bancoSemDuplicadas
        );


    return bancoEmbaralhado.slice(
        0,
        quantidade
    );

}


// =====================================
// PROVAS ANTERIORES DISPONÍVEIS
// =====================================

function obterProvasAnterioresDisponiveisPSCPP() {

    const provas = [];


    if (
        typeof obterQuestoesProva2006PSCPP ===
        "function"
    ) {

        provas.push({

            id: "prova-2006",

            ano: 2006,

            nome:
                "Prova Escrita PSCPP — 2006",

            total:
                obterQuestoesProva2006PSCPP()
                    .length

        });

    }


    return provas;

}


// =====================================
// NORMALIZAR ID DA PROVA
// =====================================

function normalizarIdProvaAnteriorPSCPP(
    provaId
) {

    if (!provaId) {

        return "";

    }


    const id = provaId
        .toString()
        .trim()
        .toLowerCase();


    if (
        id === "2006" ||
        id === "prova2006" ||
        id === "prova-2006" ||
        id === "pscpp-2006"
    ) {

        return "prova-2006";

    }


    return id;

}


// =====================================
// OBTER QUESTÕES DE PROVA ANTERIOR
// =====================================

function obterQuestoesProvaAnteriorPSCPP(
    provaId
) {

    const idNormalizado =
        normalizarIdProvaAnteriorPSCPP(
            provaId
        );


    switch (idNormalizado) {


        // =====================================
        // PROVA 2006
        // =====================================

        case "prova-2006":

            if (
                typeof obterQuestoesProva2006PSCPP ===
                "function"
            ) {

                return obterQuestoesProva2006PSCPP();

            }

            break;

    }


    return [];

}


// =====================================
// OBTER DADOS DA PROVA ANTERIOR
// =====================================

function obterDadosProvaAnteriorPSCPP(
    provaId
) {

    const idNormalizado =
        normalizarIdProvaAnteriorPSCPP(
            provaId
        );


    switch (idNormalizado) {


        case "prova-2006":

            if (
                typeof obterDadosProva2006PSCPP ===
                "function"
            ) {

                return obterDadosProva2006PSCPP();

            }


            return {

                id:
                    "prova-2006",

                nome:
                    "Prova Escrita PSCPP — 2006",

                ano:
                    2006,

                origem:
                    "prova-anterior",

                questoes:
                    obterQuestoesProvaAnteriorPSCPP(
                        idNormalizado
                    )

            };

    }


    return null;

}


// =====================================
// PREPARAR PROVA ANTERIOR
// =====================================

function prepararProvaAnteriorPSCPP(
    configuracao
) {

    const provaId =
        normalizarIdProvaAnteriorPSCPP(
            configuracao.provaAnterior
        );


    if (!provaId) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma prova anterior foi selecionada."

        };

    }


    const questoes =
        obterQuestoesProvaAnteriorPSCPP(
            provaId
        );


    if (
        !questoes ||
        questoes.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "A prova selecionada não está disponível ou seu arquivo de questões não foi carregado."

        };

    }


    const dadosProva =
        obterDadosProvaAnteriorPSCPP(
            provaId
        );


    // =====================================
    // NÃO EMBARALHAR
    //
    // A ordem oficial da prova deve ser
    // preservada integralmente.
    // =====================================

    const questoesOrdenadas =
        [...questoes].sort(

            function(a, b) {

                const numeroA =
                    Number(
                        a.numeroOriginal
                    ) || 0;


                const numeroB =
                    Number(
                        b.numeroOriginal
                    ) || 0;


                return numeroA - numeroB;

            }

        );


    simuladoAtualPSCPP = {

        configuracao:
            configuracao,

        questoes:
            questoesOrdenadas,

        iniciado:
            false,

        finalizado:
            false,

        provaAnterior: {

            id:
                provaId,

            nome:
                dadosProva
                    ? dadosProva.nome
                    : provaId,

            ano:
                dadosProva
                    ? dadosProva.ano
                    : null,

            total:
                questoesOrdenadas.length

        }

    };


    return {

        sucesso: true,

        tipo:
            "prova-anterior",

        mensagem:
            "Prova anterior preparada com sucesso.",

        total:
            questoesOrdenadas.length,

        questoes:
            [...questoesOrdenadas],

        provaAnterior:
            simuladoAtualPSCPP
                .provaAnterior

    };

}


// =====================================
// PREPARAR SIMULADO PERSONALIZADO
// =====================================

function prepararSimuladoPersonalizadoPSCPP(
    configuracao
) {

    const disciplinas =
        configuracao.disciplinas;


    const quantidade =
        configuracao.quantidade;


    const banco =
        reunirQuestoesDisciplinasPSCPP(
            disciplinas
        );


    const bancoSemDuplicadas =
        removerQuestoesDuplicadasPSCPP(
            banco
        );


    if (
        bancoSemDuplicadas.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "Não há questões disponíveis nas disciplinas selecionadas."

        };

    }


    if (
        bancoSemDuplicadas.length <
        quantidade
    ) {

        return {

            sucesso: false,

            mensagem:
                "O banco possui apenas " +
                bancoSemDuplicadas.length +
                " questões disponíveis para as disciplinas selecionadas, mas foram solicitadas " +
                quantidade +
                " questões."

        };

    }


    const questoesSelecionadas =
        selecionarQuestoesSimuladoPSCPP(

            bancoSemDuplicadas,

            quantidade

        );


    simuladoAtualPSCPP = {

        configuracao:
            configuracao,

        questoes:
            questoesSelecionadas,

        iniciado:
            false,

        finalizado:
            false,

        provaAnterior:
            null

    };


    return {

        sucesso: true,

        tipo:
            "personalizado",

        mensagem:
            "Simulado preparado com sucesso.",

        total:
            questoesSelecionadas.length,

        questoes:
            [...questoesSelecionadas]

    };

}


// =====================================
// PREPARAR SIMULADO
// FUNÇÃO PRINCIPAL
// =====================================

function prepararSimuladoPSCPP() {

    if (
        typeof carregarConfiguracaoSimuladoPSCPP !==
        "function"
    ) {

        return {

            sucesso: false,

            mensagem:
                "O sistema de configuração do simulado não foi carregado."

        };

    }


    const configuracao =
        carregarConfiguracaoSimuladoPSCPP();


    if (!configuracao) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma configuração de simulado foi encontrada."

        };

    }


    if (
        typeof validarConfiguracaoSimuladoPSCPP ===
        "function"
    ) {

        const validacao =
            validarConfiguracaoSimuladoPSCPP(
                configuracao
            );


        if (
            validacao &&
            validacao.valido === false
        ) {

            return {

                sucesso: false,

                mensagem:
                    validacao.mensagem ||
                    "A configuração do simulado é inválida."

            };

        }

    }


    // =====================================
    // PROVA ANTERIOR
    // =====================================

    if (
        configuracao.tipo ===
        "prova-anterior"
    ) {

        return prepararProvaAnteriorPSCPP(
            configuracao
        );

    }


    // =====================================
    // SIMULADO PERSONALIZADO
    // =====================================

    return prepararSimuladoPersonalizadoPSCPP(
        configuracao
    );

}


// =====================================
// OBTER ESTADO ATUAL
// =====================================

function obterSimuladoAtualPSCPP() {

    return {

        configuracao:
            simuladoAtualPSCPP
                .configuracao,

        questoes:
            [
                ...simuladoAtualPSCPP
                    .questoes
            ],

        iniciado:
            simuladoAtualPSCPP
                .iniciado,

        finalizado:
            simuladoAtualPSCPP
                .finalizado,

        provaAnterior:
            simuladoAtualPSCPP
                .provaAnterior
                ? {
                    ...simuladoAtualPSCPP
                        .provaAnterior
                }
                : null

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
// OBTER QUANTIDADE DE QUESTÕES
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

    simuladoAtualPSCPP.iniciado =
        true;


    return true;

}


// =====================================
// MARCAR COMO FINALIZADO
// =====================================

function marcarSimuladoComoFinalizadoPSCPP() {

    simuladoAtualPSCPP.finalizado =
        true;


    return true;

}


// =====================================
// IDENTIFICAR PROVA ANTERIOR
// =====================================

function simuladoAtualEhProvaAnteriorPSCPP() {

    return !!(
        simuladoAtualPSCPP &&
        simuladoAtualPSCPP.configuracao &&
        simuladoAtualPSCPP
            .configuracao
            .tipo ===
            "prova-anterior"
    );

}


// =====================================
// OBTER PROVA ANTERIOR ATUAL
// =====================================

function obterProvaAnteriorAtualPSCPP() {

    if (
        !simuladoAtualPSCPP
            .provaAnterior
    ) {

        return null;

    }


    return {

        ...simuladoAtualPSCPP
            .provaAnterior

    };

}


// =====================================
// LOG DE CARREGAMENTO
// =====================================

console.log(
    "Motor de Simulados PSCPP v1.1 carregado."
);
