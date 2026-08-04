// =====================================
// SISTEMA DE EXERCÍCIOS PSCPP v2.0
// Bridge Trainer PSCPP
//
// Funções:
//
// 1. Localizar automaticamente as questões.
// 2. Permitir uma alternativa por questão.
// 3. Registrar as respostas selecionadas.
// 4. Corrigir automaticamente o exercício.
// 5. Destacar respostas corretas e incorretas.
// 6. Exibir acertos, erros e aproveitamento.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const SELETOR_QUESTAO_PSCPP =
    ".questao";


const SELETOR_ALTERNATIVA_PSCPP =
    ".alternativa, .alternativa-questao";


const CLASSE_ALTERNATIVA_SELECIONADA =
    "alternativa-selecionada";


const CLASSE_ALTERNATIVA_CORRETA =
    "alternativa-correta";


const CLASSE_ALTERNATIVA_INCORRETA =
    "alternativa-incorreta";


// =====================================
// ESTADO DO EXERCÍCIO
// =====================================

const respostasExerciciosPSCPP = {};


let exercicioCorrigidoPSCPP = false;


// =====================================
// NORMALIZAR TEXTO
// =====================================

function normalizarTextoExercicio(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";

    }

    return texto
        .toString()
        .trim();

}


// =====================================
// OBTER IDENTIFICADOR DA QUESTÃO
// =====================================

function obterIdQuestao(
    questao,
    indice
) {

    const idInformado =
        normalizarTextoExercicio(
            questao.dataset.questaoId
        );


    if (idInformado) {

        return idInformado;

    }


    const idGerado =
        "questao-automatica-" +
        (indice + 1);


    questao.dataset.questaoId =
        idGerado;


    return idGerado;

}


// =====================================
// OBTER OPÇÃO DA ALTERNATIVA
// =====================================

function obterOpcaoAlternativa(
    alternativa,
    indice
) {

    const opcaoInformada =
        normalizarTextoExercicio(

            alternativa.dataset.opcao ||

            alternativa.dataset.alternativa

        ).toUpperCase();


    if (opcaoInformada) {

        return opcaoInformada;

    }


    const opcaoGerada =
        String.fromCharCode(
            65 + indice
        );


    alternativa.dataset.opcao =
        opcaoGerada;


    return opcaoGerada;

}


// =====================================
// OBTER RESPOSTA CORRETA
// =====================================

function obterRespostaCorretaQuestao(
    questao
) {

    return normalizarTextoExercicio(

        questao.dataset.resposta ||

        questao.dataset.respostaCorreta

    ).toUpperCase();

}


// =====================================
// LOCALIZAR ALTERNATIVA POR OPÇÃO
// =====================================

function localizarAlternativaPorOpcao(
    questao,
    opcao
) {

    const alternativas =
        questao.querySelectorAll(
            SELETOR_ALTERNATIVA_PSCPP
        );


    let alternativaEncontrada =
        null;


    alternativas.forEach(function (
        alternativa
    ) {

        const opcaoAlternativa =
            normalizarTextoExercicio(

                alternativa.dataset.opcao ||

                alternativa.dataset.alternativa

            ).toUpperCase();


        if (
            opcaoAlternativa === opcao
        ) {

            alternativaEncontrada =
                alternativa;

        }

    });


    return alternativaEncontrada;

}


// =====================================
// LIMPAR SELEÇÃO DA QUESTÃO
// =====================================

function limparSelecaoQuestao(
    questao
) {

    const alternativas =
        questao.querySelectorAll(
            SELETOR_ALTERNATIVA_PSCPP
        );


    alternativas.forEach(function (
        alternativa
    ) {

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
// LIMPAR CORREÇÃO VISUAL
// =====================================

function limparCorrecaoQuestao(
    questao
) {

    questao.classList.remove(
        "questao-correta",
        "questao-incorreta"
    );


    delete questao.dataset.resultado;


    const alternativas =
        questao.querySelectorAll(
            SELETOR_ALTERNATIVA_PSCPP
        );


    alternativas.forEach(function (
        alternativa
    ) {

        alternativa.classList.remove(
            CLASSE_ALTERNATIVA_CORRETA,
            CLASSE_ALTERNATIVA_INCORRETA
        );


        alternativa.disabled =
            false;

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


    if (
        !questaoId ||
        !opcao
    ) {

        console.warn(
            "Bridge Trainer: questão ou alternativa sem identificação.",
            {
                questao: questao,
                alternativa: alternativa
            }
        );

        return;

    }


    respostasExerciciosPSCPP[
        questaoId
    ] = {

        questaoId: questaoId,

        alternativa: opcao,

        topico:
            normalizarTextoExercicio(
                questao.dataset.topico
            ),

        edital:
            normalizarTextoExercicio(
                questao.dataset.edital
            ),

        bibliografia:
            normalizarTextoExercicio(
                questao.dataset.bibliografia
            )

    };


    questao.dataset
        .respostaSelecionada =
        opcao;


    atualizarEstadoQuestao(
        questao
    );

}


// =====================================
// ATUALIZAR ESTADO DA QUESTÃO
// =====================================

function atualizarEstadoQuestao(
    questao
) {

    const questaoId =
        normalizarTextoExercicio(
            questao.dataset.questaoId
        );


    const resposta =
        respostasExerciciosPSCPP[
            questaoId
        ];


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

    if (
        !questao ||
        !alternativa
    ) {

        return;

    }


    if (exercicioCorrigidoPSCPP) {

        return;

    }


    limparSelecaoQuestao(
        questao
    );


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

function tratarCliqueAlternativa(
    evento
) {

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

function tratarTecladoAlternativa(
    evento
) {

    if (
        evento.key !== "Enter" &&
        evento.key !== " "
    ) {

        return;

    }


    evento.preventDefault();


    tratarCliqueAlternativa(
        evento
    );

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


    if (
        alternativas.length === 0
    ) {

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


        if (
            alternativa.dataset
                .exercicioPreparado ===
            "true"
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


        alternativa.dataset
            .exercicioPreparado =
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
// MOSTRAR RESULTADO
// =====================================

function mostrarResultadoExercicios(
    acertos,
    erros,
    total
) {

    const caixaResultado =
        document.getElementById(
            "resultado-exercicios"
        );


    const textoResultado =
        document.getElementById(
            "texto-resultado-exercicios"
        );


    if (
        !caixaResultado ||
        !textoResultado
    ) {

        return;

    }


    const percentual =
        total > 0
            ? Math.round(
                (acertos / total) * 100
            )
            : 0;


    textoResultado.innerHTML =

        "<strong>Acertos:</strong> " +
        acertos +
        "<br>" +

        "<strong>Erros:</strong> " +
        erros +
        "<br>" +

        "<strong>Total:</strong> " +
        total +
        "<br>" +

        "<strong>Aproveitamento:</strong> " +
        percentual +
        "%";


    caixaResultado.style.display =
        "block";


    caixaResultado.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// =====================================
// CORRIGIR UMA QUESTÃO
// =====================================

function corrigirQuestaoExercicio(
    questao
) {

    const questaoId =
        normalizarTextoExercicio(
            questao.dataset.questaoId
        );


    const respostaCorreta =
        obterRespostaCorretaQuestao(
            questao
        );


    const respostaUsuario =
        respostasExerciciosPSCPP[
            questaoId
        ];


    if (!respostaCorreta) {

        console.warn(
            "Bridge Trainer: questão sem data-resposta.",
            questaoId
        );

        return null;

    }


    if (!respostaUsuario) {

        return null;

    }


    const alternativaCorreta =
        localizarAlternativaPorOpcao(
            questao,
            respostaCorreta
        );


    const alternativaSelecionada =
        localizarAlternativaPorOpcao(
            questao,
            respostaUsuario.alternativa
        );


    const acertou =
        respostaUsuario.alternativa ===
        respostaCorreta;


    if (alternativaCorreta) {

        alternativaCorreta.classList.add(
            CLASSE_ALTERNATIVA_CORRETA
        );

    }


    if (
        !acertou &&
        alternativaSelecionada
    ) {

        alternativaSelecionada
            .classList.add(
                CLASSE_ALTERNATIVA_INCORRETA
            );

    }


    if (acertou) {

        questao.classList.add(
            "questao-correta"
        );


        questao.dataset.resultado =
            "correta";

    } else {

        questao.classList.add(
            "questao-incorreta"
        );


        questao.dataset.resultado =
            "incorreta";

    }


    const alternativas =
        questao.querySelectorAll(
            SELETOR_ALTERNATIVA_PSCPP
        );


    alternativas.forEach(function (
        alternativa
    ) {

        alternativa.disabled =
            true;

    });


    return acertou;

}


// =====================================
// CORRIGIR EXERCÍCIO
// =====================================

function corrigirExerciciosPSCPP() {

    if (exercicioCorrigidoPSCPP) {

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


    if (totalQuestoes === 0) {

        return;

    }


    if (
        totalRespondidas <
        totalQuestoes
    ) {

        alert(

            "Responda todas as questões antes de corrigir o exercício."

        );

        return;

    }


    let acertos = 0;

    let erros = 0;


    questoes.forEach(function (
        questao
    ) {

        const resultado =
            corrigirQuestaoExercicio(
                questao
            );


        if (resultado === true) {

            acertos++;

        }


        if (resultado === false) {

            erros++;

        }

    });


    exercicioCorrigidoPSCPP =
        true;


    mostrarResultadoExercicios(
        acertos,
        erros,
        totalQuestoes
    );


    const botaoCorrigir =
        document.getElementById(
            "botao-corrigir-exercicios"
        );


    if (botaoCorrigir) {

        botaoCorrigir.disabled =
            true;


        botaoCorrigir.textContent =
            "✅ Exercício corrigido";

    }

}


// =====================================
// PREPARAR BOTÃO DE CORREÇÃO
// =====================================

function prepararBotaoCorrecaoExercicios() {

    const botao =
        document.getElementById(
            "botao-corrigir-exercicios"
        );


    if (!botao) {

        return;

    }


    if (
        botao.dataset
            .correcaoPreparada ===
        "true"
    ) {

        return;

    }


    botao.addEventListener(
        "click",
        corrigirExerciciosPSCPP
    );


    botao.dataset
        .correcaoPreparada =
        "true";

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


    return respostasExerciciosPSCPP[
        id
    ] || null;

}


// =====================================
// LIMPAR TODAS AS RESPOSTAS
// =====================================

function limparRespostasExerciciosPSCPP() {

    const questoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        );


    questoes.forEach(function (
        questao
    ) {

        limparSelecaoQuestao(
            questao
        );


        limparCorrecaoQuestao(
            questao
        );


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
    ).forEach(function (
        questaoId
    ) {

        delete respostasExerciciosPSCPP[
            questaoId
        ];

    });


    exercicioCorrigidoPSCPP =
        false;


    const caixaResultado =
        document.getElementById(
            "resultado-exercicios"
        );


    if (caixaResultado) {

        caixaResultado.style.display =
            "none";

    }


    const botaoCorrigir =
        document.getElementById(
            "botao-corrigir-exercicios"
        );


    if (botaoCorrigir) {

        botaoCorrigir.disabled =
            false;


        botaoCorrigir.textContent =
            "✅ Corrigir Exercício";

    }


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


    if (
        questoes.length === 0
    ) {

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


    prepararBotaoCorrecaoExercicios();


    atualizarResumoSelecaoExercicios();


    console.info(

        "Bridge Trainer PSCPP: sistema de exercícios v2.0 iniciado.",

        questoes.length,

        "questões localizadas."

    );

}


// =====================================
// INICIALIZAÇÃO AUTOMÁTICA
// =====================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        inicializarExerciciosPSCPP

    );

} else {

    inicializarExerciciosPSCPP();

}
