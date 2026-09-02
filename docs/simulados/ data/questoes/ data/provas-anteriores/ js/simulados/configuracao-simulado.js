// =====================================
// CONFIGURAÇÃO DE SIMULADOS PSCPP
// Bridge Trainer PSCPP
//
// Responsabilidade:
// - definir tipos de simulado
// - definir quantidades permitidas
// - armazenar temporariamente a
//   configuração escolhida pelo usuário
//
// Não contém questões.
// Não calcula desempenho.
// Não modifica progresso.js.
// =====================================


// =====================================
// CONSTANTES
// =====================================

const QUANTIDADES_SIMULADO_PSCPP = [
    10,
    20,
    30,
    40,
    50,
    70
];


const TIPOS_SIMULADO_PSCPP = {

    GERAL: "geral",

    DISCIPLINA: "disciplina",

    PROVA_ANTERIOR: "prova-anterior"

};


// =====================================
// DISCIPLINAS
// =====================================
//
// Estes identificadores devem permanecer
// estáveis porque serão usados também
// nas questões e no desempenho.
// =====================================

const DISCIPLINAS_SIMULADO_PSCPP = [

    {
        id: "manobrabilidade",
        nome: "Manobrabilidade"
    },

    {
        id: "arte-naval",
        nome: "Arte Naval"
    },

    {
        id: "navegacao",
        nome: "Navegação"
    },

    {
        id: "regulamentacao",
        nome: "Legislação e Regulamentação"
    },

    {
        id: "meteorologia-oceanografia",
        nome: "Meteorologia e Oceanografia"
    },

    {
        id: "comunicacoes",
        nome: "Comunicações"
    },

    {
        id: "ingles",
        nome: "Inglês"
    },

    {
        id: "conhecimentos-gerais",
        nome: "Conhecimentos Gerais"
    }

];


// =====================================
// CONFIGURAÇÃO ATUAL
// =====================================

let configuracaoSimuladoPSCPP = {

    tipo: null,

    disciplina: null,

    quantidade: null,

    provaAnterior: null

};


// =====================================
// DEFINIR TIPO
// =====================================

function definirTipoSimulado(tipo) {

    const tiposValidos =
        Object.values(TIPOS_SIMULADO_PSCPP);


    if (!tiposValidos.includes(tipo)) {

        console.error(
            "Tipo de simulado inválido:",
            tipo
        );

        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        tipo;


    // Limpar informações incompatíveis

    if (tipo === TIPOS_SIMULADO_PSCPP.GERAL) {

        configuracaoSimuladoPSCPP.disciplina =
            null;

        configuracaoSimuladoPSCPP.provaAnterior =
            null;

    }


    if (tipo === TIPOS_SIMULADO_PSCPP.DISCIPLINA) {

        configuracaoSimuladoPSCPP.provaAnterior =
            null;

    }


    if (tipo === TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR) {

        configuracaoSimuladoPSCPP.disciplina =
            null;

        configuracaoSimuladoPSCPP.quantidade =
            null;

    }


    return true;

}


// =====================================
// DEFINIR DISCIPLINA
// =====================================

function definirDisciplinaSimulado(
    disciplinaId
) {

    const disciplinaExiste =
        DISCIPLINAS_SIMULADO_PSCPP.some(
            disciplina =>
                disciplina.id === disciplinaId
        );


    if (!disciplinaExiste) {

        console.error(
            "Disciplina inválida:",
            disciplinaId
        );

        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.DISCIPLINA;


    configuracaoSimuladoPSCPP.disciplina =
        disciplinaId;


    configuracaoSimuladoPSCPP.provaAnterior =
        null;


    return true;

}


// =====================================
// DEFINIR QUANTIDADE
// =====================================

function definirQuantidadeSimulado(
    quantidade
) {

    const numero =
        Number(quantidade);


    if (
        !QUANTIDADES_SIMULADO_PSCPP.includes(
            numero
        )
    ) {

        console.error(
            "Quantidade inválida:",
            quantidade
        );

        return false;

    }


    configuracaoSimuladoPSCPP.quantidade =
        numero;


    return true;

}


// =====================================
// DEFINIR PROVA ANTERIOR
// =====================================

function definirProvaAnterior(
    provaId
) {

    if (!provaId) {

        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR;


    configuracaoSimuladoPSCPP.provaAnterior =
        provaId;


    configuracaoSimuladoPSCPP.disciplina =
        null;


    configuracaoSimuladoPSCPP.quantidade =
        null;


    return true;

}


// =====================================
// VALIDAR CONFIGURAÇÃO
// =====================================

function validarConfiguracaoSimulado() {

    const config =
        configuracaoSimuladoPSCPP;


    if (!config.tipo) {

        return {

            valida: false,

            mensagem:
                "Selecione o tipo de simulado."

        };

    }


    // =================================
    // SIMULADO GERAL
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.GERAL
    ) {

        if (!config.quantidade) {

            return {

                valida: false,

                mensagem:
                    "Selecione a quantidade de questões."

            };

        }

    }


    // =================================
    // SIMULADO POR DISCIPLINA
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.DISCIPLINA
    ) {

        if (!config.disciplina) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma disciplina."

            };

        }


        if (!config.quantidade) {

            return {

                valida: false,

                mensagem:
                    "Selecione a quantidade de questões."

            };

        }

    }


    // =================================
    // PROVA ANTERIOR
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR
    ) {

        if (!config.provaAnterior) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma prova anterior."

            };

        }

    }


    return {

        valida: true,

        mensagem:
            "Configuração válida."

    };

}


// =====================================
// OBTER CONFIGURAÇÃO
// =====================================

function obterConfiguracaoSimulado() {

    return {

        ...configuracaoSimuladoPSCPP

    };

}


// =====================================
// SALVAR CONFIGURAÇÃO TEMPORÁRIA
// =====================================
//
// sessionStorage é usado porque esta
// configuração pertence apenas ao
// simulado atualmente iniciado.
// =====================================

function salvarConfiguracaoSimulado() {

    const validacao =
        validarConfiguracaoSimulado();


    if (!validacao.valida) {

        console.error(
            validacao.mensagem
        );

        return false;

    }


    sessionStorage.setItem(
        "bridgeTrainerPSCPP_simuladoAtual",
        JSON.stringify(
            configuracaoSimuladoPSCPP
        )
    );


    return true;

}


// =====================================
// CARREGAR CONFIGURAÇÃO
// =====================================

function carregarConfiguracaoSimulado() {

    const dados =
        sessionStorage.getItem(
            "bridgeTrainerPSCPP_simuladoAtual"
        );


    if (!dados) {

        return null;

    }


    try {

        configuracaoSimuladoPSCPP =
            JSON.parse(dados);


        return {
            ...configuracaoSimuladoPSCPP
        };

    }

    catch (erro) {

        console.error(
            "Erro ao carregar configuração:",
            erro
        );


        return null;

    }

}


// =====================================
// LIMPAR CONFIGURAÇÃO
// =====================================

function limparConfiguracaoSimulado() {

    configuracaoSimuladoPSCPP = {

        tipo: null,

        disciplina: null,

        quantidade: null,

        provaAnterior: null

    };


    sessionStorage.removeItem(
        "bridgeTrainerPSCPP_simuladoAtual"
    );

}
