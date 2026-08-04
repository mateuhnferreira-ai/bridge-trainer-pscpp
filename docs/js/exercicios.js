// =====================================
// SISTEMA DE EXERCÍCIOS PSCPP v1.0
// Bridge Trainer PSCPP
//
// Funções desta versão:
//
// 1. Localizar automaticamente as questões.
// 2. Localizar as alternativas de cada questão.
// 3. Permitir apenas uma alternativa selecionada.
// 4. Destacar visualmente a alternativa escolhida.
// 5. Registrar as respostas em memória.
//
// A correção automática e o relatório
// serão implementados nas próximas versões.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const SELETOR_QUESTAO_PSCPP = ".questao";

const SELETOR_ALTERNATIVA_PSCPP =
    ".alternativa, .alternativa-questao";

const CLASSE_ALTERNATIVA_SELECIONADA =
    "alternativa-selecionada";


// Armazena as respostas da página atual.
//
// Estrutura:
//
// {
//     "EH001": {
//         questaoId: "EH001",
//         alternativa: "C",
//         topico: "Squat",
//         edital: "8.11",
//         bibliografia: "PNA Volume III"
//     }
// }

const respostasExerciciosPSCPP = {};


// =====================================
// NORMALIZAR TEXTO
// =====================================

function normalizarTextoExercicio(texto) {

    if (texto === null || texto === undefined) {

        return "";

    }

    return texto
        .toString()
        .trim();

}


// =====================================
// OBTER IDENTIFICADOR DA QUESTÃO
// =====================================

function obterIdQuestao(questao, indice) {

    const idInformado = normalizarTextoExercicio(
        questao.dataset.questaoId
    );

    if (idInformado) {

        return idInformado;

    }


    // Identificador temporário caso o HTML ainda
    // não possua data-questao-id.

    const idGerado =
        "questao-automatica-" + (indice + 1);

    questao.dataset.questaoId = idGerado;

    return idGerado;

}


// =====================================
// OBTER OPÇÃO DA ALTERNATIVA
// =====================================

function obterOpcaoAlternativa(alternativa, indice) {

    const opcaoInformada = normalizarTextoExercicio(
        alternativa.dataset.opcao ||
        alternativa.dataset.alternativa
    ).toUpperCase();


    if (opcaoInformada) {

        return opcaoInformada;

    }


    // Gera A, B, C, D... quando o atributo
    // ainda não estiver presente no HTML.

    const opcaoGerada =
        String.fromCharCode(65 + indice);

    alternativa.dataset.opcao = opcaoGerada;

    return opcaoGerada;

}


// =====================================
// REMOVER SELEÇÃO ANTERIOR
// =====================================

function limparSelecaoQuestao(questao) {

    const alternativas = questao.querySelectorAll(
        SELETOR_ALTERNATIVA_PSCPP
    );


    alternativas.forEach(function (alternativa) {

        alternativa.classList.remove(
            CLASSE_ALTERNATIVA_SELECIONADA
        );

        alternativa.setAttribute(
            "aria-pressed",
            "false"
        );

    });

}


// =====================================
// REGISTRAR RESPOSTA
// =====================================

function registrarRespostaQuestao(
    questao,
    alternativa
) {

    const questaoId =
        normalizarTextoExercicio(
            questao.dataset.questaoId
        );


    const opcao =
        normalizarTextoExercicio(
            alternativa.dataset.opcao ||
            alternativa.dataset.alternativa
        ).toUpperCase();


    if (!questaoId || !opcao) {

        console.warn(
            "Bridge Trainer: questão ou alternativa sem identificação.",
            {
                questao: questao,
                alternativa: alternativa
            }
        );

        return;

    }


    respostasExerciciosPSCPP[questaoId] = {

        questaoId: questaoId,

        alternativa: opcao,

        topico: normalizarTextoExercicio(
            questao.dataset.topico
        ),

        edital: normalizarTextoExercicio(
            questao.dataset.edital
        ),

        bibliografia: normalizarTextoExercicio(
            questao.dataset.bibliografia
        )

    };


    questao.dataset.respostaSelecionada =
        opcao;


    atualizarEstadoQuestao(questao);

}


// =====================================
// ATUALIZAR ESTADO VISUAL DA QUESTÃO
// =====================================

function atualizarEstadoQuestao(questao) {

    const questaoId =
        normalizarTextoExercicio(
            questao.dataset.questaoId
        );


    const resposta =
        respostasExerciciosPSCPP[questaoId];


    if (resposta) {

        questao.classList.add(
            "questao-respondida"
        );

        questao.dataset.respondida =
            "true";

    } else {

        questao.classList.remove(
            "questao-respondida"
        );

        questao.dataset.respondida =
            "false";

    }


    atualizarResumoSelecaoExercicios();

}


// =====================================
// SELECIONAR ALTERNATIVA
// =====================================

function selecionarAlternativaExercicio(
    questao,
    alternativa
) {

    if (!questao || !alternativa) {

        return;

    }


    // Remove qualquer alternativa marcada
    // anteriormente na mesma questão.

    limparSelecaoQuestao(questao);


    // Marca somente a alternativa escolhida.

    alternativa.classList.add(
        CLASSE_ALTERNATIVA_SELECIONADA
    );

    alternativa.setAttribute(
        "aria-pressed",
        "true"
    );


    registrarRespostaQuestao(
        questao,
        alternativa
    );

}


// =====================================
// CLIQUE NA ALTERNATIVA
// =====================================

function tratarCliqueAlternativa(evento) {

    const alternativa =
        evento.currentTarget;


    const questao =
        alternativa.closest(
            SELETOR_QUESTAO_PSCPP
        );


    if (!questao) {

        console.warn(
            "Bridge Trainer: alternativa fora de uma questão válida."
        );

        return;

    }


    selecionarAlternativaExercicio(
        questao,
        alternativa
    );

}


// =====================================
// USO PELO TECLADO
// =====================================

function tratarTecladoAlternativa(evento) {

    if (
        evento.key !== "Enter" &&
        evento.key !== " "
    ) {

        return;

    }


    evento.preventDefault();

    tratarCliqueAlternativa(evento);

}


// =====================================
// PREPARAR UMA QUESTÃO
// =====================================

function prepararQuestaoExercicio(
    questao,
    indiceQuestao
) {

    const questaoId =
        obterIdQuestao(
            questao,
            indiceQuestao
        );


    questao.dataset.questaoId =
        questaoId;


    questao.dataset.respondida =
        "false";


    const alternativas =
        questao.querySelectorAll(
            SELETOR_ALTERNATIVA_PSCPP
        );


    if (alternativas.length === 0) {

        console.warn(
            "Bridge Trainer: questão sem alternativas.",
            questaoId
        );

        return;

    }


    alternativas.forEach(function (
        alternativa,
        indiceAlternativa
    ) {

        const opcao =
            obterOpcaoAlternativa(
                alternativa,
                indiceAlternativa
            );


        alternativa.dataset.opcao =
            opcao;


        alternativa.setAttribute(
            "type",
            "button"
        );


        alternativa.setAttribute(
            "aria-pressed",
            "false"
        );


        // Evita duplicar eventos caso a função
        // de inicialização seja chamada novamente.

        if (
            alternativa.dataset.exercicioPreparado
            === "true"
        ) {

            return;

        }


        alternativa.addEventListener(
            "click",
            tratarCliqueAlternativa
        );


        alternativa.addEventListener(
            "keydown",
            tratarTecladoAlternativa
        );


        alternativa.dataset.exercicioPreparado =
            "true";

    });

}


// =====================================
// ATUALIZAR RESUMO DE SELEÇÃO
// =====================================

function atualizarResumoSelecaoExercicios() {

    const resumo =
        document.getElementById(
            "resumo-selecao-exercicios"
        );


    if (!resumo) {

        return;

    }


    const questoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        );


    const totalQuestoes =
        questoes.length;


    const totalRespondidas =
        Object.keys(
            respostasExerciciosPSCPP
        ).length;


    resumo.textContent =
        totalRespondidas +
        " de " +
        totalQuestoes +
        " questões respondidas";

}


// =====================================
// OBTER RESPOSTAS ATUAIS
// =====================================

function obterRespostasExerciciosPSCPP() {

    return JSON.parse(
        JSON.stringify(
            respostasExerciciosPSCPP
        )
    );

}


// =====================================
// OBTER RESPOSTA DE UMA QUESTÃO
// =====================================

function obterRespostaQuestaoPSCPP(
    questaoId
) {

    const id =
        normalizarTextoExercicio(
            questaoId
        );


    if (!id) {

        return null;

    }


    return respostasExerciciosPSCPP[id]
        || null;

}


// =====================================
// LIMPAR TODAS AS RESPOSTAS
// =====================================

function limparRespostasExerciciosPSCPP() {

    const questoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        );


    questoes.forEach(function (questao) {

        limparSelecaoQuestao(questao);

        questao.classList.remove(
            "questao-respondida"
        );

        questao.dataset.respondida =
            "false";

        delete questao.dataset
            .respostaSelecionada;

    });


    Object.keys(
        respostasExerciciosPSCPP
    ).forEach(function (questaoId) {

        delete respostasExerciciosPSCPP[
            questaoId
        ];

    });


    atualizarResumoSelecaoExercicios();

}


// =====================================
// INICIALIZAR SISTEMA
// =====================================

function inicializarExerciciosPSCPP() {

    const questoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        );


    if (questoes.length === 0) {

        return;

    }


    questoes.forEach(function (
        questao,
        indice
    ) {

        prepararQuestaoExercicio(
            questao,
            indice
        );

    });


    atualizarResumoSelecaoExercicios();


    console.info(
        "Bridge Trainer PSCPP: sistema de exercícios v1.0 iniciado.",
        questoes.length,
        "questões localizadas."
    );

}


// =====================================
// INICIALIZAÇÃO AUTOMÁTICA
// =====================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarExerciciosPSCPP
    );

} else {

    inicializarExerciciosPSCPP();

}
