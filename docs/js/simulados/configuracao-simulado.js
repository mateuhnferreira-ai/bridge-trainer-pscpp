// =====================================
// CONFIGURAÇÃO DE SIMULADOS PSCPP v1.0
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Definir os tipos de simulado.
// 2. Definir as disciplinas disponíveis.
// 3. Definir as quantidades permitidas.
// 4. Armazenar a configuração atual.
// 5. Validar a configuração escolhida.
// 6. Salvar temporariamente o simulado
//    atual no sessionStorage.
// 7. Preparar suporte a provas anteriores.
//
// Este arquivo NÃO:
// - contém questões;
// - sorteia questões;
// - corrige questões;
// - calcula desempenho.
// =====================================


// =====================================
// CHAVE DE ARMAZENAMENTO
// =====================================

const CHAVE_CONFIGURACAO_SIMULADO_PSCPP =
    "bridgeTrainerPSCPP_configuracaoSimulado";


// =====================================
// TIPOS DE SIMULADO
// =====================================

const TIPOS_SIMULADO_PSCPP = {

    GERAL:
        "geral",

    DISCIPLINA:
        "disciplina",

    PROVA_ANTERIOR:
        "prova-anterior"

};


// =====================================
// QUANTIDADES PERMITIDAS
// =====================================

const QUANTIDADES_SIMULADO_PSCPP = [

    10,
    20,
    30,
    40,
    50,
    70

];


// =====================================
// DISCIPLINAS DO BANCO DE QUESTÕES
// =====================================
//
// Os IDs abaixo devem permanecer estáveis.
//
// Eles serão utilizados por:
//
// - banco de questões;
// - motor de simulados;
// - desempenho;
// - histórico;
// - filtros;
// - provas anteriores.
// =====================================

const DISCIPLINAS_SIMULADO_PSCPP = [

    {
        id: "arte-naval",
        nome: "Arte Naval"
    },

    {
        id: "manobrabilidade",
        nome: "Manobrabilidade"
    },

    {
        id: "conhecimentos-gerais",
        nome: "Conhecimentos Gerais"
    },

    {
        id: "regulamentacao",
        nome: "Legislação e Regulamentação"
    },

    {
        id: "meteorologia",
        nome: "Meteorologia"
    },

    {
        id: "navegacao",
        nome: "Navegação"
    }

];


// =====================================
// ESTADO PADRÃO DA CONFIGURAÇÃO
// =====================================

function criarConfiguracaoPadraoSimuladoPSCPP() {

    return {

        tipo: null,

        disciplina: null,

        quantidade: null,

        provaAnterior: null

    };

}


// =====================================
// CONFIGURAÇÃO ATUAL
// =====================================

let configuracaoSimuladoPSCPP =
    criarConfiguracaoPadraoSimuladoPSCPP();


// =====================================
// NORMALIZAR TEXTO
// =====================================

function normalizarTextoSimuladoPSCPP(
    valor
) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";

    }


    return valor
        .toString()
        .trim();

}


// =====================================
// OBTER LISTA DE DISCIPLINAS
// =====================================

function obterDisciplinasSimuladoPSCPP() {

    return DISCIPLINAS_SIMULADO_PSCPP.map(
        function (
            disciplina
        ) {

            return {
                ...disciplina
            };

        }
    );

}


// =====================================
// VERIFICAR DISCIPLINA
// =====================================

function disciplinaSimuladoValidaPSCPP(
    disciplinaId
) {

    const id =
        normalizarTextoSimuladoPSCPP(
            disciplinaId
        );


    return DISCIPLINAS_SIMULADO_PSCPP.some(
        function (
            disciplina
        ) {

            return (
                disciplina.id === id
            );

        }
    );

}


// =====================================
// VERIFICAR QUANTIDADE
// =====================================

function quantidadeSimuladoValidaPSCPP(
    quantidade
) {

    const numero =
        Number(
            quantidade
        );


    return QUANTIDADES_SIMULADO_PSCPP.includes(
        numero
    );

}


// =====================================
// DEFINIR SIMULADO GERAL
// =====================================

function configurarSimuladoGeralPSCPP(
    quantidade
) {

    const numero =
        Number(
            quantidade
        );


    if (
        !quantidadeSimuladoValidaPSCPP(
            numero
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: quantidade inválida para simulado geral.",
            quantidade
        );


        return false;

    }


    configuracaoSimuladoPSCPP = {

        tipo:
            TIPOS_SIMULADO_PSCPP.GERAL,

        disciplina:
            null,

        quantidade:
            numero,

        provaAnterior:
            null

    };


    return true;

}


// =====================================
// DEFINIR SIMULADO POR DISCIPLINA
// =====================================

function configurarSimuladoDisciplinaPSCPP(
    disciplinaId,
    quantidade
) {

    const disciplina =
        normalizarTextoSimuladoPSCPP(
            disciplinaId
        );


    const numero =
        Number(
            quantidade
        );


    if (
        !disciplinaSimuladoValidaPSCPP(
            disciplina
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: disciplina inválida.",
            disciplinaId
        );


        return false;

    }


    if (
        !quantidadeSimuladoValidaPSCPP(
            numero
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: quantidade inválida.",
            quantidade
        );


        return false;

    }


    configuracaoSimuladoPSCPP = {

        tipo:
            TIPOS_SIMULADO_PSCPP.DISCIPLINA,

        disciplina:
            disciplina,

        quantidade:
            numero,

        provaAnterior:
            null

    };


    return true;

}


// =====================================
// DEFINIR PROVA ANTERIOR
// =====================================

function configurarProvaAnteriorPSCPP(
    provaId
) {

    const prova =
        normalizarTextoSimuladoPSCPP(
            provaId
        );


    if (!prova) {

        console.error(
            "Bridge Trainer PSCPP: identificador da prova anterior não informado."
        );


        return false;

    }


    configuracaoSimuladoPSCPP = {

        tipo:
            TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR,

        disciplina:
            null,

        quantidade:
            null,

        provaAnterior:
            prova

    };


    return true;

}


// =====================================
// DEFINIR TIPO MANUALMENTE
// =====================================
//
// Função auxiliar para a futura interface.
// =====================================

function definirTipoSimuladoPSCPP(
    tipo
) {

    const tipoNormalizado =
        normalizarTextoSimuladoPSCPP(
            tipo
        );


    const tiposValidos =
        Object.values(
            TIPOS_SIMULADO_PSCPP
        );


    if (
        !tiposValidos.includes(
            tipoNormalizado
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: tipo de simulado inválido.",
            tipo
        );


        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        tipoNormalizado;


    if (
        tipoNormalizado ===
        TIPOS_SIMULADO_PSCPP.GERAL
    ) {

        configuracaoSimuladoPSCPP.disciplina =
            null;


        configuracaoSimuladoPSCPP.provaAnterior =
            null;

    }


    if (
        tipoNormalizado ===
        TIPOS_SIMULADO_PSCPP.DISCIPLINA
    ) {

        configuracaoSimuladoPSCPP.provaAnterior =
            null;

    }


    if (
        tipoNormalizado ===
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR
    ) {

        configuracaoSimuladoPSCPP.disciplina =
            null;


        configuracaoSimuladoPSCPP.quantidade =
            null;

    }


    return true;

}


// =====================================
// DEFINIR DISCIPLINA MANUALMENTE
// =====================================

function definirDisciplinaSimuladoPSCPP(
    disciplinaId
) {

    const disciplina =
        normalizarTextoSimuladoPSCPP(
            disciplinaId
        );


    if (
        !disciplinaSimuladoValidaPSCPP(
            disciplina
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: disciplina inválida.",
            disciplinaId
        );


        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.DISCIPLINA;


    configuracaoSimuladoPSCPP.disciplina =
        disciplina;


    configuracaoSimuladoPSCPP.provaAnterior =
        null;


    return true;

}


// =====================================
// DEFINIR QUANTIDADE MANUALMENTE
// =====================================

function definirQuantidadeSimuladoPSCPP(
    quantidade
) {

    const numero =
        Number(
            quantidade
        );


    if (
        !quantidadeSimuladoValidaPSCPP(
            numero
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: quantidade inválida.",
            quantidade
        );


        return false;

    }


    configuracaoSimuladoPSCPP.quantidade =
        numero;


    return true;

}


// =====================================
// DEFINIR PROVA ANTERIOR MANUALMENTE
// =====================================

function definirProvaAnteriorSimuladoPSCPP(
    provaId
) {

    const prova =
        normalizarTextoSimuladoPSCPP(
            provaId
        );


    if (!prova) {

        console.error(
            "Bridge Trainer PSCPP: prova anterior inválida."
        );


        return false;

    }


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR;


    configuracaoSimuladoPSCPP.provaAnterior =
        prova;


    configuracaoSimuladoPSCPP.disciplina =
        null;


    configuracaoSimuladoPSCPP.quantidade =
        null;


    return true;

}


// =====================================
// VALIDAR CONFIGURAÇÃO
// =====================================

function validarConfiguracaoSimuladoPSCPP() {

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

        if (
            !quantidadeSimuladoValidaPSCPP(
                config.quantidade
            )
        ) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma quantidade válida de questões."

            };

        }


        return {

            valida: true,

            mensagem:
                "Configuração válida."

        };

    }


    // =================================
    // SIMULADO POR DISCIPLINA
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.DISCIPLINA
    ) {

        if (
            !disciplinaSimuladoValidaPSCPP(
                config.disciplina
            )
        ) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma disciplina válida."

            };

        }


        if (
            !quantidadeSimuladoValidaPSCPP(
                config.quantidade
            )
        ) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma quantidade válida de questões."

            };

        }


        return {

            valida: true,

            mensagem:
                "Configuração válida."

        };

    }


    // =================================
    // PROVA ANTERIOR
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR
    ) {

        if (
            !normalizarTextoSimuladoPSCPP(
                config.provaAnterior
            )
        ) {

            return {

                valida: false,

                mensagem:
                    "Selecione uma prova anterior."

            };

        }


        return {

            valida: true,

            mensagem:
                "Configuração válida."

        };

    }


    return {

        valida: false,

        mensagem:
            "Configuração de simulado inválida."

    };

}


// =====================================
// OBTER CONFIGURAÇÃO ATUAL
// =====================================

function obterConfiguracaoSimuladoPSCPP() {

    return {

        ...configuracaoSimuladoPSCPP

    };

}


// =====================================
// SALVAR CONFIGURAÇÃO
// =====================================
//
// Utilizamos sessionStorage porque a
// configuração pertence ao simulado
// que está sendo realizado naquele
// momento.
//
// O histórico de desempenho será
// armazenado separadamente.
// =====================================

function salvarConfiguracaoSimuladoPSCPP() {

    const validacao =
        validarConfiguracaoSimuladoPSCPP();


    if (!validacao.valida) {

        console.error(
            "Bridge Trainer PSCPP:",
            validacao.mensagem
        );


        return false;

    }


    try {

        sessionStorage.setItem(

            CHAVE_CONFIGURACAO_SIMULADO_PSCPP,

            JSON.stringify(
                configuracaoSimuladoPSCPP
            )

        );


        return true;

    }

    catch (erro) {

        console.error(
            "Bridge Trainer PSCPP: não foi possível salvar a configuração do simulado.",
            erro
        );


        return false;

    }

}


// =====================================
// CARREGAR CONFIGURAÇÃO
// =====================================

function carregarConfiguracaoSimuladoPSCPP() {

    try {

        const dados =
            sessionStorage.getItem(
                CHAVE_CONFIGURACAO_SIMULADO_PSCPP
            );


        if (!dados) {

            return null;

        }


        const configuracao =
            JSON.parse(
                dados
            );


        configuracaoSimuladoPSCPP = {

            ...criarConfiguracaoPadraoSimuladoPSCPP(),

            ...configuracao

        };


        return {

            ...configuracaoSimuladoPSCPP

        };

    }

    catch (erro) {

        console.error(
            "Bridge Trainer PSCPP: não foi possível carregar a configuração.",
            erro
        );


        return null;

    }

}


// =====================================
// LIMPAR CONFIGURAÇÃO
// =====================================

function limparConfiguracaoSimuladoPSCPP() {

    configuracaoSimuladoPSCPP =
        criarConfiguracaoPadraoSimuladoPSCPP();


    try {

        sessionStorage.removeItem(
            CHAVE_CONFIGURACAO_SIMULADO_PSCPP
        );

    }

    catch (erro) {

        console.error(
            "Bridge Trainer PSCPP: não foi possível limpar a configuração.",
            erro
        );

    }

}


// =====================================
// RESUMO DA CONFIGURAÇÃO
// =====================================
//
// Será útil posteriormente na tela
// antes de iniciar o simulado.
// =====================================

function obterResumoConfiguracaoSimuladoPSCPP() {

    const config =
        obterConfiguracaoSimuladoPSCPP();


    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.GERAL
    ) {

        return {

            tipo:
                "Simulado Geral",

            disciplina:
                "Todas as disciplinas",

            quantidade:
                config.quantidade

        };

    }


    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.DISCIPLINA
    ) {

        const disciplina =
            DISCIPLINAS_SIMULADO_PSCPP.find(
                function (
                    item
                ) {

                    return (
                        item.id ===
                        config.disciplina
                    );

                }
            );


        return {

            tipo:
                "Simulado por Disciplina",

            disciplina:
                disciplina
                    ? disciplina.nome
                    : config.disciplina,

            quantidade:
                config.quantidade

        };

    }


    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.PROVA_ANTERIOR
    ) {

        return {

            tipo:
                "Prova Anterior",

            provaAnterior:
                config.provaAnterior

        };

    }


    return {

        tipo:
            "Não configurado"

    };

}


// =====================================
// INFORMAÇÃO DE INICIALIZAÇÃO
// =====================================

console.info(
    "Bridge Trainer PSCPP: configuração de simulados v1.0 carregada."
);
