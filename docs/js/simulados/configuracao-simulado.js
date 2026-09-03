// =====================================
// CONFIGURAÇÃO DE SIMULADOS PSCPP v1.1
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Definir disciplinas disponíveis.
// 2. Permitir seleção de uma ou várias.
// 3. Definir quantidade de questões.
// 4. Salvar configuração atual.
// 5. Validar configuração.
// 6. Preparar suporte a provas anteriores.
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

    PERSONALIZADO:
        "personalizado",

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
// DISCIPLINAS DISPONÍVEIS
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
// CRIAR CONFIGURAÇÃO PADRÃO
// =====================================

function criarConfiguracaoPadraoSimuladoPSCPP() {

    return {

        tipo:
            TIPOS_SIMULADO_PSCPP.PERSONALIZADO,

        disciplinas: [],

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

function normalizarTextoSimuladoPSCPP(valor) {

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
// OBTER DISCIPLINAS
// =====================================

function obterDisciplinasSimuladoPSCPP() {

    return DISCIPLINAS_SIMULADO_PSCPP.map(
        function(disciplina) {

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
        function(disciplina) {

            return disciplina.id === id;

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
// LIMPAR DISCIPLINAS
// =====================================

function limparDisciplinasSimuladoPSCPP() {

    configuracaoSimuladoPSCPP.disciplinas = [];

}


// =====================================
// ADICIONAR DISCIPLINA
// =====================================

function adicionarDisciplinaSimuladoPSCPP(
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


    if (
        !configuracaoSimuladoPSCPP.disciplinas.includes(
            disciplina
        )
    ) {

        configuracaoSimuladoPSCPP.disciplinas.push(
            disciplina
        );

    }


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.PERSONALIZADO;


    configuracaoSimuladoPSCPP.provaAnterior =
        null;


    return true;

}


// =====================================
// REMOVER DISCIPLINA
// =====================================

function removerDisciplinaSimuladoPSCPP(
    disciplinaId
) {

    const disciplina =
        normalizarTextoSimuladoPSCPP(
            disciplinaId
        );


    configuracaoSimuladoPSCPP.disciplinas =
        configuracaoSimuladoPSCPP.disciplinas.filter(
            function(item) {

                return item !== disciplina;

            }
        );


    return true;

}


// =====================================
// ALTERNAR DISCIPLINA
// =====================================
//
// Útil para checkbox da futura interface.
// =====================================

function alternarDisciplinaSimuladoPSCPP(
    disciplinaId,
    selecionada
) {

    if (selecionada) {

        return adicionarDisciplinaSimuladoPSCPP(
            disciplinaId
        );

    }


    return removerDisciplinaSimuladoPSCPP(
        disciplinaId
    );

}


// =====================================
// DEFINIR VÁRIAS DISCIPLINAS
// =====================================

function definirDisciplinasSimuladoPSCPP(
    disciplinas
) {

    if (
        !Array.isArray(
            disciplinas
        )
    ) {

        console.error(
            "Bridge Trainer PSCPP: lista de disciplinas inválida."
        );

        return false;

    }


    const disciplinasValidas = [];


    disciplinas.forEach(
        function(disciplinaId) {

            const disciplina =
                normalizarTextoSimuladoPSCPP(
                    disciplinaId
                );


            if (
                disciplinaSimuladoValidaPSCPP(
                    disciplina
                ) &&
                !disciplinasValidas.includes(
                    disciplina
                )
            ) {

                disciplinasValidas.push(
                    disciplina
                );

            }

        }
    );


    configuracaoSimuladoPSCPP.disciplinas =
        disciplinasValidas;


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.PERSONALIZADO;


    configuracaoSimuladoPSCPP.provaAnterior =
        null;


    return true;

}


// =====================================
// SELECIONAR TODAS
// =====================================

function selecionarTodasDisciplinasSimuladoPSCPP() {

    configuracaoSimuladoPSCPP.disciplinas =
        DISCIPLINAS_SIMULADO_PSCPP.map(
            function(disciplina) {

                return disciplina.id;

            }
        );


    configuracaoSimuladoPSCPP.tipo =
        TIPOS_SIMULADO_PSCPP.PERSONALIZADO;


    configuracaoSimuladoPSCPP.provaAnterior =
        null;


    return true;

}


// =====================================
// VERIFICAR SE TODAS ESTÃO SELECIONADAS
// =====================================

function todasDisciplinasSelecionadasPSCPP() {

    return (
        configuracaoSimuladoPSCPP
            .disciplinas
            .length ===
        DISCIPLINAS_SIMULADO_PSCPP.length
    );

}


// =====================================
// DEFINIR QUANTIDADE
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
// CONFIGURAR SIMULADO PERSONALIZADO
// =====================================

function configurarSimuladoPersonalizadoPSCPP(
    disciplinas,
    quantidade
) {

    const disciplinasOk =
        definirDisciplinasSimuladoPSCPP(
            disciplinas
        );


    const quantidadeOk =
        definirQuantidadeSimuladoPSCPP(
            quantidade
        );


    if (
        !disciplinasOk ||
        !quantidadeOk
    ) {

        return false;

    }


    return true;

}


// =====================================
// CONFIGURAR PROVA ANTERIOR
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

        disciplinas: [],

        quantidade: null,

        provaAnterior:
            prova

    };


    return true;

}


// =====================================
// VALIDAR CONFIGURAÇÃO
// =====================================

function validarConfiguracaoSimuladoPSCPP() {

    const config =
        configuracaoSimuladoPSCPP;


    // =================================
    // SIMULADO PERSONALIZADO
    // =================================

    if (
        config.tipo ===
        TIPOS_SIMULADO_PSCPP.PERSONALIZADO
    ) {

        if (
            !Array.isArray(
                config.disciplinas
            ) ||
            config.disciplinas.length === 0
        ) {

            return {

                valida: false,

                mensagem:
                    "Selecione pelo menos uma disciplina."

            };

        }


        const disciplinasValidas =
            config.disciplinas.every(
                function(disciplinaId) {

                    return disciplinaSimuladoValidaPSCPP(
                        disciplinaId
                    );

                }
            );


        if (!disciplinasValidas) {

            return {

                valida: false,

                mensagem:
                    "Existe uma disciplina inválida na configuração."

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
            "Configuração inválida."

    };

}


// =====================================
// OBTER CONFIGURAÇÃO
// =====================================

function obterConfiguracaoSimuladoPSCPP() {

    return {

        ...configuracaoSimuladoPSCPP,

        disciplinas: [
            ...configuracaoSimuladoPSCPP.disciplinas
        ]

    };

}


// =====================================
// SALVAR CONFIGURAÇÃO
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
            "Bridge Trainer PSCPP: não foi possível salvar a configuração.",
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

            ...configuracao,

            disciplinas:
                Array.isArray(
                    configuracao.disciplinas
                )
                    ? configuracao.disciplinas
                    : []

        };


        return obterConfiguracaoSimuladoPSCPP();

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
// OBTER NOMES DAS DISCIPLINAS
// =====================================

function obterNomesDisciplinasSelecionadasPSCPP() {

    return configuracaoSimuladoPSCPP
        .disciplinas
        .map(
            function(disciplinaId) {

                const disciplina =
                    DISCIPLINAS_SIMULADO_PSCPP.find(
                        function(item) {

                            return (
                                item.id ===
                                disciplinaId
                            );

                        }
                    );


                return disciplina
                    ? disciplina.nome
                    : disciplinaId;

            }
        );

}


// =====================================
// RESUMO DA CONFIGURAÇÃO
// =====================================

function obterResumoConfiguracaoSimuladoPSCPP() {

    const config =
        obterConfiguracaoSimuladoPSCPP();


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


    const nomes =
        obterNomesDisciplinasSelecionadasPSCPP();


    return {

        tipo:
            todasDisciplinasSelecionadasPSCPP()
                ? "Simulado Geral"
                : "Simulado Personalizado",

        disciplinas:
            nomes,

        quantidade:
            config.quantidade

    };

}


// =====================================
// INFORMAÇÃO DE INICIALIZAÇÃO
// =====================================

console.info(
    "Bridge Trainer PSCPP: configuração de simulados v1.1 carregada."
);
