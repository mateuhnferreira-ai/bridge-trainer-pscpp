// =====================================
// SISTEMA DE EXERCÍCIOS PSCPP v3.0
// Bridge Trainer PSCPP
//
// Funções:
//
// 1. Seleção interativa de alternativas.
// 2. Correção automática.
// 3. Resultado da tentativa.
// 4. Salvamento permanente no localStorage.
// 5. Histórico de desempenho.
// 6. Registro de erros por tópico.
// 7. Nova tentativa sem restaurar marcações.
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


const CHAVE_HISTORICO_EXERCICIOS_PSCPP =
    "bridgeTrainerPSCPP_historicoExercicios";


const LIMITE_TENTATIVAS_EXIBIDAS =
    10;


// =====================================
// ESTADO DA TENTATIVA ATUAL
// =====================================

const respostasExerciciosPSCPP = {};


let exercicioCorrigidoPSCPP =
    false;


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
// OBTER INFORMAÇÕES DA PÁGINA
// =====================================

function obterIdentificacaoExercicioPSCPP() {

    const corpo =
        document.body;


    const tituloPagina =
        normalizarTextoExercicio(
            document.title
        );


    const disciplina =
        normalizarTextoExercicio(
            corpo.dataset.disciplina
        ) || "disciplina-nao-identificada";


    const aula =
        normalizarTextoExercicio(
            corpo.dataset.aula
        ) ||
        tituloPagina ||
        window.location.pathname;


    return {

        disciplina: disciplina,

        aula: aula,

        pagina: window.location.pathname

    };

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
// REGISTRAR RESPOSTA DA TENTATIVA
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
        !alternativa ||
        exercicioCorrigidoPSCPP
    ) {

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

        return;

    }


    selecionarAlternativaExercicio(
        questao,
        alternativa
    );

}


// =====================================
// ACESSIBILIDADE PELO TECLADO
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
// PREPARAR QUESTÃO
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


    const totalQuestoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        ).length;


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
// CARREGAR HISTÓRICO
// =====================================

function carregarHistoricoExerciciosPSCPP() {

    try {

        const historicoSalvo =
            localStorage.getItem(
                CHAVE_HISTORICO_EXERCICIOS_PSCPP
            );


        if (!historicoSalvo) {

            return [];

        }


        const historico =
            JSON.parse(
                historicoSalvo
            );


        return Array.isArray(
            historico
        )
            ? historico
            : [];

    } catch (erro) {

        console.error(
            "Bridge Trainer: não foi possível carregar o histórico.",
            erro
        );


        return [];

    }

}


// =====================================
// SALVAR HISTÓRICO
// =====================================

function salvarHistoricoExerciciosPSCPP(
    historico
) {

    try {

        localStorage.setItem(

            CHAVE_HISTORICO_EXERCICIOS_PSCPP,

            JSON.stringify(
                historico
            )

        );


        return true;

    } catch (erro) {

        console.error(
            "Bridge Trainer: não foi possível salvar o histórico.",
            erro
        );


        return false;

    }

}


// =====================================
// REGISTRAR NOVA TENTATIVA
// =====================================

function registrarTentativaHistoricoPSCPP(
    resultado
) {

    const historico =
        carregarHistoricoExerciciosPSCPP();


    historico.push(
        resultado
    );


    salvarHistoricoExerciciosPSCPP(
        historico
    );


    return historico;

}


// =====================================
// CRIAR IDENTIFICADOR DA TENTATIVA
// =====================================

function criarIdTentativaPSCPP() {

    return (

        "tentativa-" +

        Date.now() +

        "-" +

        Math.random()
            .toString(36)
            .slice(2, 8)

    );

}


// =====================================
// FORMATAR DATA
// =====================================

function formatarDataTentativaPSCPP(
    dataISO
) {

    const data =
        new Date(
            dataISO
        );


    if (
        Number.isNaN(
            data.getTime()
        )
    ) {

        return dataISO;

    }


    return data.toLocaleString(
        "pt-BR"
    );

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


    if (
        !respostaCorreta ||
        !respostaUsuario
    ) {

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


    questao.classList.add(

        acertou
            ? "questao-correta"
            : "questao-incorreta"

    );


    questao.dataset.resultado =

        acertou
            ? "correta"
            : "incorreta";


    questao.querySelectorAll(
        SELETOR_ALTERNATIVA_PSCPP
    ).forEach(function (
        alternativa
    ) {

        alternativa.disabled =
            true;

    });


    return {

        questaoId: questaoId,

        topico:
            respostaUsuario.topico ||
            "Tópico não informado",

        edital:
            respostaUsuario.edital,

        bibliografia:
            respostaUsuario.bibliografia,

        respostaUsuario:
            respostaUsuario.alternativa,

        respostaCorreta:
            respostaCorreta,

        acertou:
            acertou

    };

}


// =====================================
// MOSTRAR RESULTADO ATUAL
// =====================================

function mostrarResultadoExercicios(
    resultado
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


    textoResultado.innerHTML =

        "<strong>Acertos:</strong> " +
        resultado.acertos +
        "<br>" +

        "<strong>Erros:</strong> " +
        resultado.erros +
        "<br>" +

        "<strong>Total:</strong> " +
        resultado.total +
        "<br>" +

        "<strong>Aproveitamento:</strong> " +
        resultado.percentual +
        "%";


    caixaResultado.style.display =
        "block";

}


// =====================================
// CRIAR PAINEL DE HISTÓRICO
// =====================================

function garantirPainelHistoricoPSCPP() {

    let painel =
        document.getElementById(
            "historico-exercicios-pscpp"
        );


    if (painel) {

        return painel;

    }


    const resultado =
        document.getElementById(
            "resultado-exercicios"
        );


    if (!resultado) {

        return null;

    }


    painel =
        document.createElement(
            "div"
        );


    painel.id =
        "historico-exercicios-pscpp";


    painel.className =
        "historico-exercicios-pscpp";


    resultado.insertAdjacentElement(
        "afterend",
        painel
    );


    return painel;

}


// =====================================
// RENDERIZAR HISTÓRICO DA AULA
// =====================================

function renderizarHistoricoExerciciosPSCPP() {

    const painel =
        garantirPainelHistoricoPSCPP();


    if (!painel) {

        return;

    }


    const identificacao =
        obterIdentificacaoExercicioPSCPP();


    const historicoCompleto =
        carregarHistoricoExerciciosPSCPP();


    const historicoAula =
        historicoCompleto
            .filter(function (
                tentativa
            ) {

                return (
                    tentativa.pagina ===
                    identificacao.pagina
                );

            })
            .slice(
                -LIMITE_TENTATIVAS_EXIBIDAS
            )
            .reverse();


    if (
        historicoAula.length === 0
    ) {

        painel.innerHTML =

            "<h3>📊 Histórico de desempenho</h3>" +

            "<p>" +

            "Nenhuma tentativa concluída nesta aula." +

            "</p>";


        return;

    }


    let html =

        "<h3>📊 Histórico de desempenho</h3>" +

        "<p>" +

        "Tentativas mais recentes desta aula:" +

        "</p>" +

        "<div class='lista-historico-exercicios'>";


    historicoAula.forEach(function (
        tentativa,
        indice
    ) {

        const numeroTentativa =
            historicoAula.length -
            indice;


        html +=

            "<div class='item-historico-exercicio'>" +

            "<strong>Tentativa " +
            numeroTentativa +
            "</strong>" +

            "<span>" +
            formatarDataTentativaPSCPP(
                tentativa.data
            ) +
            "</span>" +

            "<p>" +

            tentativa.acertos +
            " acertos de " +
            tentativa.total +
            " — " +

            "<strong>" +
            tentativa.percentual +
            "%</strong>" +

            "</p>" +

            "</div>";

    });


    html +=
        "</div>";


    painel.innerHTML =
        html;

}


// =====================================
// CORRIGIR EXERCÍCIO COMPLETO
// =====================================

function corrigirExerciciosPSCPP() {

    if (exercicioCorrigidoPSCPP) {

        return;

    }


    const questoes =
        document.querySelectorAll(
            SELETOR_QUESTAO_PSCPP
        );


    const total =
        questoes.length;


    const respondidas =
        Object.keys(
            respostasExerciciosPSCPP
        ).length;


    if (total === 0) {

        return;

    }


    if (
        respondidas < total
    ) {

        alert(
            "Responda todas as questões antes de corrigir o exercício."
        );


        return;

    }


    let acertos = 0;

    let erros = 0;


    const detalhesQuestoes = [];

    const errosPorTopico = {};


    questoes.forEach(function (
        questao
    ) {

        const detalhe =
            corrigirQuestaoExercicio(
                questao
            );


        if (!detalhe) {

            return;

        }


        detalhesQuestoes.push(
            detalhe
        );


        if (detalhe.acertou) {

            acertos++;

        } else {

            erros++;


            if (
                !errosPorTopico[
                    detalhe.topico
                ]
            ) {

                errosPorTopico[
                    detalhe.topico
                ] = 0;

            }


            errosPorTopico[
                detalhe.topico
            ]++;

        }

    });


    const percentual =
        total > 0
            ? Math.round(
                (acertos / total) * 100
            )
            : 0;


    const identificacao =
        obterIdentificacaoExercicioPSCPP();


    const resultadoTentativa = {

        id:
            criarIdTentativaPSCPP(),

        data:
            new Date().toISOString(),

        disciplina:
            identificacao.disciplina,

        aula:
            identificacao.aula,

        pagina:
            identificacao.pagina,

        total:
            total,

        acertos:
            acertos,

        erros:
            erros,

        percentual:
            percentual,

        errosPorTopico:
            errosPorTopico,

        questoes:
            detalhesQuestoes

    };


    registrarTentativaHistoricoPSCPP(
        resultadoTentativa
    );


    exercicioCorrigidoPSCPP =
        true;


    mostrarResultadoExercicios(
        resultadoTentativa
    );


    renderizarHistoricoExerciciosPSCPP();


    const botao =
        document.getElementById(
            "botao-corrigir-exercicios"
        );


    if (botao) {

        botao.disabled =
            true;


        botao.textContent =
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


    if (
        !botao ||
        botao.dataset.correcaoPreparada ===
        "true"
    ) {

        return;

    }


    botao.addEventListener(
        "click",
        corrigirExerciciosPSCPP
    );


    botao.dataset.correcaoPreparada =
        "true";

}


// =====================================
// CONSULTAR HISTÓRICO COMPLETO
// =====================================

function obterHistoricoExerciciosPSCPP() {

    return carregarHistoricoExerciciosPSCPP();

}


// =====================================
// LIMPAR TENTATIVA ATUAL
// =====================================

function limparRespostasExerciciosPSCPP() {

    document.querySelectorAll(
        SELETOR_QUESTAO_PSCPP
    ).forEach(function (
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


    const resultado =
        document.getElementById(
            "resultado-exercicios"
        );


    if (resultado) {

        resultado.style.display =
            "none";

    }


    const botao =
        document.getElementById(
            "botao-corrigir-exercicios"
        );


    if (botao) {

        botao.disabled =
            false;


        botao.textContent =
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


    renderizarHistoricoExerciciosPSCPP();


    console.info(

        "Bridge Trainer PSCPP: sistema de exercícios v3.0 iniciado.",

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
