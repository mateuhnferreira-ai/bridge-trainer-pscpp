// =====================================================
// CENTRO DE DESEMPENHO PSCPP
// Bridge Trainer PSCPP
// Versão 4.0
//
// FONTES DE DADOS:
//
// 1. Exercícios das aulas
//    bridgeTrainerPSCPP_historicoExercicios
//
// 2. Simulados PSCPP
//    bridgeTrainerPSCPP_desempenhoSimulados
//
// Estrutura de análise:
//
// Disciplina
// └── Aula / Assunto
//     └── Tópico
//
// Recursos:
//
// - integração exercícios + simulados;
// - preservação dos históricos existentes;
// - resumo geral unificado;
// - desempenho específico em simulados;
// - desempenho de simulados por disciplina;
// - histórico dos últimos simulados;
// - disciplinas recolhíveis;
// - aulas/assuntos recolhíveis;
// - tópicos detalhados;
// - barras independentes do progresso.js;
// - índice de preparação;
// - assuntos prioritários;
// - gráfico mensal de evolução;
// - linha temporal SET/2026 → NOV/2027;
// - recomendação automática.
// =====================================================


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const CHAVE_HISTORICO_EXERCICIOS =
    "bridgeTrainerPSCPP_historicoExercicios";


const CHAVE_HISTORICO_SIMULADOS =
    "bridgeTrainerPSCPP_desempenhoSimulados";


let historicoTentativas = [];

let historicoExercicios = [];


// =====================================================
// CONFIGURAÇÃO DO GRÁFICO DE EVOLUÇÃO
// =====================================================

const DATA_INICIO_GRAFICO_PSCPP =
    new Date(2026, 8, 1);
// Setembro de 2026


const DATA_FIM_GRAFICO_PSCPP =
    new Date(2027, 10, 1);
// Novembro de 2027


let dadosMensaisEvolucaoPSCPP = [];


// =====================================================
// INICIALIZAÇÃO
// =====================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarCentroDesempenho
    );

}
else {

    iniciarCentroDesempenho();

}


// =====================================================
// INICIAR CENTRO
// =====================================================

function iniciarCentroDesempenho() {

    garantirEstilosDesempenhoPSCPP();

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoSimulados();

    atualizarDesempenhoHierarquico();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}


// =====================================================
// NORMALIZAR HISTÓRICO DOS EXERCÍCIOS
// =====================================================

function normalizarHistoricoExerciciosPSCPP(
    historicoSalvo
) {

    if (
        !Array.isArray(
            historicoSalvo
        )
    ) {

        return [];

    }


    const questoesNormalizadas =
        [];


    historicoSalvo.forEach(
        tentativa => {

            if (!tentativa) {

                return;

            }


            // =========================================
            // FORMATO ANTIGO
            // Questão salva individualmente
            // =========================================

            if (
                typeof tentativa.acertou !==
                "undefined"
            ) {

                questoesNormalizadas.push({

                    ...tentativa,

                    origem:
                        tentativa.origem ||
                        "exercicio"

                });


                return;

            }


            // =========================================
            // FORMATO ATUAL
            // tentativa.questoes[]
            // =========================================

            if (
                !Array.isArray(
                    tentativa.questoes
                )
            ) {

                return;

            }


            tentativa.questoes.forEach(
                questao => {

                    if (!questao) {

                        return;

                    }


                    questoesNormalizadas.push({

                        origem:
                            "exercicio",

                        tentativaId:
                            tentativa.id || "",

                        data:
                            tentativa.data || "",

                        disciplina:
                            tentativa.disciplina ||
                            "Disciplina não informada",

                        aula:
                            tentativa.aula ||
                            "Aula não informada",

                        assunto:
                            tentativa.aula ||
                            "",

                        pagina:
                            tentativa.pagina || "",

                        questaoId:
                            questao.questaoId || "",

                        topico:
                            questao.topico ||
                            "Tópico não informado",

                        edital:
                            questao.edital || "",

                        bibliografia:
                            questao.bibliografia || "",

                        respostaUsuario:
                            questao.respostaUsuario || "",

                        respostaCorreta:
                            questao.respostaCorreta || "",

                        acertou:
                            questao.acertou === true

                    });

                }
            );

        }
    );


    return questoesNormalizadas;

}


// =====================================================
// NORMALIZAR HISTÓRICO DOS SIMULADOS
// =====================================================

function normalizarHistoricoSimuladosPSCPP(
    dadosSimulados
) {

    if (
        !dadosSimulados ||
        typeof dadosSimulados !==
        "object"
    ) {

        return {

            tentativas: [],
            questoes: []

        };

    }


    const historico =
        Array.isArray(
            dadosSimulados.historico
        )
            ? dadosSimulados.historico
            : [];


    const tentativas =
        [];


    const questoes =
        [];


    historico.forEach(
        tentativa => {

            if (!tentativa) {

                return;

            }


            tentativas.push({

                ...tentativa,

                origem:
                    "simulado"

            });


            if (
                !Array.isArray(
                    tentativa.questoes
                )
            ) {

                return;

            }


            tentativa.questoes.forEach(
                questao => {

                    if (!questao) {

                        return;

                    }


                    const assunto =
                        obterNomeValido(
                            questao.assunto,
                            "Simulado PSCPP"
                        );


                    questoes.push({

                        origem:
                            "simulado",

                        tentativaId:
                            tentativa.id || "",

                        data:
                            tentativa.data || "",

                        disciplina:
                            questao.disciplina ||
                            "Disciplina não informada",

                        aula:
                            assunto,

                        assunto:
                            assunto,

                        pagina:
                            "",

                        questaoId:
                            questao.questaoId || "",

                        topico:
                            questao.topico ||
                            assunto ||
                            "Tópico não informado",

                        edital:
                            questao.edital || "",

                        bibliografia:
                            Array.isArray(
                                questao.bibliografia
                            )
                                ? questao.bibliografia
                                : [],

                        respostaUsuario:
                            questao.respostaUsuario || "",

                        respostaCorreta:
                            questao.respostaCorreta || "",

                        acertou:
                            questao.acertou === true

                    });

                }
            );

        }
    );


    return {

        tentativas:
            tentativas,

        questoes:
            questoes

    };

}


// =====================================================
// LER JSON DO LOCALSTORAGE
// =====================================================

function lerJSONLocalStorage(
    chave,
    valorPadrao
) {

    try {

        const dados =
            localStorage.getItem(
                chave
            );


        if (!dados) {

            return valorPadrao;

        }


        return JSON.parse(
            dados
        );

    }
    catch (erro) {

        console.error(
            "Erro ao ler armazenamento:",
            chave,
            erro
        );


        return valorPadrao;

    }

}


// =====================================================
// CARREGAR HISTÓRICO UNIFICADO
// =====================================================

function carregarHistorico() {

    // =========================================
    // EXERCÍCIOS
    // =========================================

    const historicoSalvoExercicios =
        lerJSONLocalStorage(

            CHAVE_HISTORICO_EXERCICIOS,

            []

        );


    const tentativasExercicios =
        Array.isArray(
            historicoSalvoExercicios
        )
            ? historicoSalvoExercicios
            : [];


    const questoesExercicios =
        normalizarHistoricoExerciciosPSCPP(
            tentativasExercicios
        );


    // =========================================
    // SIMULADOS
    // =========================================

    const dadosSimulados =
        lerJSONLocalStorage(

            CHAVE_HISTORICO_SIMULADOS,

            {
                historico: []
            }

        );


    const simuladosNormalizados =
        normalizarHistoricoSimuladosPSCPP(
            dadosSimulados
        );


    // =========================================
    // HISTÓRICO UNIFICADO
    // =========================================

    historicoTentativas = [

        ...tentativasExercicios.map(
            tentativa => ({

                ...tentativa,

                origem:
                    tentativa.origem ||
                    "exercicio"

            })
        ),

        ...simuladosNormalizados.tentativas

    ];


    historicoExercicios = [

        ...questoesExercicios,

        ...simuladosNormalizados.questoes

    ];

}


// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

function atualizarTexto(
    id,
    texto
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            texto;

    }

}


function atualizarHTML(
    id,
    html
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.innerHTML =
            html;

    }

}


function formatarPercentual(
    valor
) {

    const numero =
        Number(
            valor
        );


    if (
        !Number.isFinite(
            numero
        )
    ) {

        return "0,0%";

    }


    return (
        numero
            .toFixed(1)
            .replace(
                ".",
                ","
            ) +
        "%"
    );

}


function formatarDataHora(
    data
) {

    if (!data) {

        return "--";

    }


    const objetoData =
        new Date(
            data
        );


    if (
        Number.isNaN(
            objetoData.getTime()
        )
    ) {

        return "--";

    }


    return objetoData
        .toLocaleString(
            "pt-BR",
            {
                dateStyle:
                    "short",

                timeStyle:
                    "short"
            }
        );

}


function formatarTempoSegundos(
    segundos
) {

    let valor =
        Number(
            segundos
        );


    if (
        !Number.isFinite(
            valor
        ) ||
        valor < 0
    ) {

        valor = 0;

    }


    valor =
        Math.round(
            valor
        );


    const horas =
        Math.floor(
            valor / 3600
        );


    const minutos =
        Math.floor(
            (valor % 3600) / 60
        );


    const segundosRestantes =
        valor % 60;


    if (
        horas >
        0
    ) {

        return [

            String(
                horas
            ).padStart(
                2,
                "0"
            ),

            String(
                minutos
            ).padStart(
                2,
                "0"
            ),

            String(
                segundosRestantes
            ).padStart(
                2,
                "0"
            )

        ].join(
            ":"
        );

    }


    return [

        String(
            minutos
        ).padStart(
            2,
            "0"
        ),

        String(
            segundosRestantes
        ).padStart(
            2,
            "0"
        )

    ].join(
        ":"
    );

}


function escaparHTML(
    texto
) {

    return String(
        texto ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


function obterNomeValido(
    valor,
    padrao
) {

    if (
        typeof valor !==
        "string"
    ) {

        return padrao;

    }


    const texto =
        valor.trim();


    return (
        texto ||
        padrao
    );

}


function registroFoiAcerto(
    registro
) {

    return Boolean(

        registro &&

        (
            registro.acertou ===
                true ||

            registro.acertou ===
                "true" ||

            registro.resultado ===
                "acerto" ||

            registro.resultado ===
                "correto"
        )

    );

}


function calcularPercentual(
    acertos,
    total
) {

    if (
        !total ||
        total <= 0
    ) {

        return 0;

    }


    return (
        acertos /
        total
    ) * 100;

}


// =====================================================
// NOMES DAS DISCIPLINAS
// =====================================================

function formatarNomeDisciplinaPSCPP(
    disciplina
) {

    const nomes = {

        "arte-naval":
            "Arte Naval",

        "arte naval":
            "Arte Naval",

        "manobrabilidade":
            "Manobrabilidade",

        "conhecimentos-gerais":
            "Conhecimentos Gerais",

        "conhecimentos gerais":
            "Conhecimentos Gerais",

        "regulamentacao":
            "Regulamentação",

        "regulamentação":
            "Regulamentação",

        "meteorologia":
            "Meteorologia",

        "navegacao":
            "Navegação",

        "navegação":
            "Navegação"

    };


    const texto =
        obterNomeValido(
            disciplina,
            "Disciplina não informada"
        );


    const chave =
        texto
            .trim()
            .toLowerCase();


    return (
        nomes[
            chave
        ] ||
        texto
    );

}


// =====================================================
// BARRA DE DESEMPENHO
// =====================================================

function gerarBarraDesempenho(
    percentual
) {

    const valor =
        Math.max(

            0,

            Math.min(

                100,

                Number(
                    percentual
                ) || 0

            )

        );


    return `

        <div
            class="barra-desempenho"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${valor.toFixed(1)}"
        >

            <div
                class="barra-desempenho-preenchimento"
                style="width:${valor.toFixed(1)}%;"
            ></div>

        </div>

    `;

}


// =====================================================
// TOTAIS GERAIS
// =====================================================

function obterTotalTentativas() {

    return historicoTentativas.length;

}


function obterTotalQuestoes() {

    return historicoExercicios.length;

}


function obterTotalAcertos() {

    return historicoExercicios
        .filter(
            registro =>
                registroFoiAcerto(
                    registro
                )
        )
        .length;

}


function obterTotalErros() {

    return (
        obterTotalQuestoes() -
        obterTotalAcertos()
    );

}


function obterAproveitamentoGeral() {

    return calcularPercentual(

        obterTotalAcertos(),

        obterTotalQuestoes()

    );

}


// =====================================================
// CONTAGENS POR ORIGEM
// =====================================================

function obterTentativasSimuladosPSCPP() {

    return historicoTentativas
        .filter(
            tentativa =>
                tentativa &&
                tentativa.origem ===
                "simulado"
        );

}


function obterQuestoesSimuladosPSCPP() {

    return historicoExercicios
        .filter(
            registro =>
                registro &&
                registro.origem ===
                "simulado"
        );

}


function obterTotalTentativasExercicios() {

    return historicoTentativas
        .filter(
            tentativa =>
                tentativa.origem !==
                "simulado"
        )
        .length;

}


function obterTotalTentativasSimulados() {

    return obterTentativasSimuladosPSCPP()
        .length;

}


function obterTotalQuestoesExercicios() {

    return historicoExercicios
        .filter(
            registro =>
                registro.origem !==
                "simulado"
        )
        .length;

}


function obterTotalQuestoesSimulados() {

    return obterQuestoesSimuladosPSCPP()
        .length;

}


// =====================================================
// ÚLTIMA ATIVIDADE
// =====================================================

function obterUltimoRegistro() {

    if (
        historicoExercicios.length ===
        0
    ) {

        return null;

    }


    const registrosComData =
        historicoExercicios
            .filter(
                registro =>

                    registro &&
                    registro.data &&

                    !Number.isNaN(

                        new Date(
                            registro.data
                        )
                        .getTime()

                    )
            );


    if (
        registrosComData.length ===
        0
    ) {

        return historicoExercicios[
            historicoExercicios.length - 1
        ];

    }


    return registrosComData
        .slice()
        .sort(
            (
                a,
                b
            ) =>

                new Date(
                    b.data
                ) -

                new Date(
                    a.data
                )
        )[0];

}


function obterUltimaAtividade() {

    const ultimoRegistro =
        obterUltimoRegistro();


    if (!ultimoRegistro) {

        return "--";

    }


    return formatarDataHora(
        ultimoRegistro.data
    );

}


// =====================================================
// RESUMO GERAL
// =====================================================

function atualizarResumoGeral() {

    const totalQuestoes =
        obterTotalQuestoes();


    const totalAcertos =
        obterTotalAcertos();


    const totalErros =
        obterTotalErros();


    const aproveitamento =
        obterAproveitamentoGeral();


    atualizarTexto(
        "desempenho-total-questoes",
        totalQuestoes
    );


    atualizarTexto(
        "desempenho-total-acertos",
        totalAcertos
    );


    atualizarTexto(
        "desempenho-total-erros",
        totalErros
    );


    atualizarTexto(
        "desempenho-aproveitamento-geral",
        formatarPercentual(
            aproveitamento
        )
    );


    atualizarTexto(
        "desempenho-total-tentativas",
        obterTotalTentativas()
    );


    atualizarTexto(
        "desempenho-ultima-atividade",
        obterUltimaAtividade()
    );

}


// =====================================================
// CONTAGEM DE ELEMENTOS AVALIADOS
// =====================================================

function obterQuantidadeDisciplinasAvaliadas() {

    const conjunto =
        new Set();


    historicoExercicios.forEach(
        registro => {

            conjunto.add(

                obterNomeValido(
                    registro.disciplina,
                    "Disciplina não informada"
                )

            );

        }
    );


    return conjunto.size;

}


function obterQuantidadeAulasAvaliadas() {

    const conjunto =
        new Set();


    historicoExercicios.forEach(
        registro => {

            const disciplina =
                obterNomeValido(
                    registro.disciplina,
                    "Disciplina não informada"
                );


            const aula =
                obterNomeValido(
                    registro.aula,
                    "Aula/Assunto não informado"
                );


            conjunto.add(
                disciplina +
                "::" +
                aula
            );

        }
    );


    return conjunto.size;

}


function obterQuantidadeTopicosAvaliados() {

    const conjunto =
        new Set();


    historicoExercicios.forEach(
        registro => {

            const disciplina =
                obterNomeValido(
                    registro.disciplina,
                    "Disciplina não informada"
                );


            const aula =
                obterNomeValido(
                    registro.aula,
                    "Aula/Assunto não informado"
                );


            const topico =
                obterNomeValido(
                    registro.topico,
                    "Tópico não informado"
                );


            conjunto.add(

                disciplina +
                "::" +
                aula +
                "::" +
                topico

            );

        }
    );


    return conjunto.size;

}


// =====================================================
// PREPARAÇÃO PARA O PSCPP
// =====================================================

function atualizarPreparacaoPSCPP() {

    const topicos =
        obterQuantidadeTopicosAvaliados();


    const aulas =
        obterQuantidadeAulasAvaliadas();


    const disciplinas =
        obterQuantidadeDisciplinasAvaliadas();


    const indice =
        obterAproveitamentoGeral();


    atualizarTexto(
        "desempenho-topicos-avaliados",
        topicos
    );


    atualizarTexto(
        "desempenho-aulas-avaliadas",
        aulas
    );


    atualizarTexto(
        "desempenho-disciplinas-avaliadas",
        disciplinas
    );


    atualizarTexto(
        "desempenho-indice-preparacao",
        formatarPercentual(
            indice
        )
    );


    const barra =
        document.getElementById(
            "barra-indice-preparacao"
        );


    if (barra) {

        const valor =
            Math.max(

                0,

                Math.min(
                    100,
                    indice
                )

            );


        barra.style.width =
            valor +
            "%";


        barra.textContent =
            formatarPercentual(
                valor
            );


        barra.setAttribute(
            "aria-valuenow",
            valor.toFixed(1)
        );

    }

}


// =====================================================
// DESEMPENHO ESPECÍFICO DOS SIMULADOS
// =====================================================

function obterResumoSimuladosPSCPP() {

    const tentativas =
        obterTentativasSimuladosPSCPP();


    const questoes =
        obterQuestoesSimuladosPSCPP();


    const totalQuestoes =
        questoes.length;


    const acertos =
        questoes.filter(
            registro =>
                registroFoiAcerto(
                    registro
                )
        )
        .length;


    const erros =
        totalQuestoes -
        acertos;


    const aproveitamento =
        calcularPercentual(
            acertos,
            totalQuestoes
        );


    let melhorResultado =
        0;


    let tempoTotal =
        0;


    let questoesComTempo =
        0;


    tentativas.forEach(
        tentativa => {

            const percentual =
                Number(
                    tentativa.percentual
                );


            if (
                Number.isFinite(
                    percentual
                )
            ) {

                melhorResultado =
                    Math.max(
                        melhorResultado,
                        percentual
                    );

            }
            else {

                const totalTentativa =
                    Number(
                        tentativa.total
                    ) || 0;


                const acertosTentativa =
                    Number(
                        tentativa.acertos
                    ) || 0;


                const calculado =
                    calcularPercentual(
                        acertosTentativa,
                        totalTentativa
                    );


                melhorResultado =
                    Math.max(
                        melhorResultado,
                        calculado
                    );

            }


            const tempo =
                Number(
                    tentativa.tempoTotalSegundos
                );


            const totalTentativa =
                Number(
                    tentativa.total
                );


            if (
                Number.isFinite(
                    tempo
                ) &&
                tempo >= 0 &&
                Number.isFinite(
                    totalTentativa
                ) &&
                totalTentativa > 0
            ) {

                tempoTotal +=
                    tempo;


                questoesComTempo +=
                    totalTentativa;

            }

        }
    );


    const tempoMedio =
        questoesComTempo > 0
            ? tempoTotal /
                questoesComTempo
            : 0;


    return {

        tentativas:
            tentativas.length,

        totalQuestoes:
            totalQuestoes,

        acertos:
            acertos,

        erros:
            erros,

        aproveitamento:
            aproveitamento,

        melhorResultado:
            melhorResultado,

        tempoMedio:
            tempoMedio

    };

}


// =====================================================
// AGRUPAR SIMULADOS POR DISCIPLINA
// =====================================================

function obterDesempenhoSimuladosPorDisciplinaPSCPP() {

    const grupos =
        {};


    obterQuestoesSimuladosPSCPP()
        .forEach(
            registro => {

                const disciplina =
                    formatarNomeDisciplinaPSCPP(
                        registro.disciplina
                    );


                if (
                    !grupos[
                        disciplina
                    ]
                ) {

                    grupos[
                        disciplina
                    ] = {

                        disciplina:
                            disciplina,

                        total:
                            0,

                        acertos:
                            0

                    };

                }


                grupos[
                    disciplina
                ].total++;


                if (
                    registroFoiAcerto(
                        registro
                    )
                ) {

                    grupos[
                        disciplina
                    ].acertos++;

                }

            }
        );


    return Object.values(
        grupos
    )

        .map(
            grupo => ({

                ...grupo,

                erros:
                    grupo.total -
                    grupo.acertos,

                percentual:
                    calcularPercentual(
                        grupo.acertos,
                        grupo.total
                    )

            })
        )

        .sort(
            (
                a,
                b
            ) =>

                a.disciplina.localeCompare(
                    b.disciplina,
                    "pt-BR"
                )
        );

}


// =====================================================
// RENDERIZAR DESEMPENHO POR DISCIPLINA
// NOS SIMULADOS
// =====================================================

function atualizarDisciplinasSimuladosPSCPP() {

    const container =
        document.getElementById(
            "lista-desempenho-disciplinas-simulados"
        );


    if (!container) {

        return;

    }


    const disciplinas =
        obterDesempenhoSimuladosPorDisciplinaPSCPP();


    if (
        disciplinas.length ===
        0
    ) {

        container.innerHTML = `

            <p>
                Ainda não existem dados de simulados.
            </p>

        `;


        return;

    }


    container.innerHTML =
        disciplinas

            .map(
                item => `

                    <div class="desempenho-simulado-disciplina">

                        <div class="desempenho-topico-cabecalho">

                            <strong>
                                ${escaparHTML(
                                    item.disciplina
                                )}
                            </strong>


                            <span class="desempenho-percentual">

                                ${formatarPercentual(
                                    item.percentual
                                )}

                            </span>

                        </div>


                        <p class="desempenho-resumo">

                            Questões:
                            ${item.total}

                            &nbsp;•&nbsp;

                            Acertos:
                            ${item.acertos}

                            &nbsp;•&nbsp;

                            Erros:
                            ${item.erros}

                        </p>


                        ${gerarBarraDesempenho(
                            item.percentual
                        )}

                    </div>

                `
            )
            .join(
                ""
            );

}


// =====================================================
// HISTÓRICO DOS ÚLTIMOS SIMULADOS
// =====================================================

function atualizarHistoricoSimuladosPSCPP() {

    const container =
        document.getElementById(
            "lista-historico-simulados"
        );


    if (!container) {

        return;

    }


    const tentativas =
        obterTentativasSimuladosPSCPP()

            .slice()

            .sort(
                (
                    a,
                    b
                ) =>

                    new Date(
                        b.data || 0
                    ) -

                    new Date(
                        a.data || 0
                    )
            )

            .slice(
                0,
                10
            );


    if (
        tentativas.length ===
        0
    ) {

        container.innerHTML = `

            <p>
                Nenhum simulado registrado.
            </p>

        `;


        return;

    }


    container.innerHTML =
        tentativas

            .map(
                (
                    tentativa,
                    indice
                ) => {

                    const total =
                        Number(
                            tentativa.total
                        ) || 0;


                    const acertos =
                        Number(
                            tentativa.acertos
                        ) || 0;


                    const erros =
                        Number.isFinite(
                            Number(
                                tentativa.erros
                            )
                        )
                            ? Number(
                                tentativa.erros
                            )
                            : total -
                                acertos;


                    const percentual =
                        Number.isFinite(
                            Number(
                                tentativa.percentual
                            )
                        )
                            ? Number(
                                tentativa.percentual
                            )
                            : calcularPercentual(
                                acertos,
                                total
                            );


                    const disciplinas =
                        Array.isArray(
                            tentativa.disciplinas
                        )
                            ? tentativa.disciplinas
                                .map(
                                    formatarNomeDisciplinaPSCPP
                                )
                                .join(
                                    ", "
                                )
                            : "Não informadas";


                    const tempo =
                        Number(
                            tentativa.tempoTotalSegundos
                        );


                    return `

                        <div class="desempenho-historico-simulado">

                            <div class="desempenho-topico-cabecalho">

                                <strong>

                                    📝 Simulado ${tentativas.length - indice}

                                </strong>


                                <span class="desempenho-percentual">

                                    ${formatarPercentual(
                                        percentual
                                    )}

                                </span>

                            </div>


                            <p>

                                <strong>
                                    Data:
                                </strong>

                                ${escaparHTML(
                                    formatarDataHora(
                                        tentativa.data
                                    )
                                )}

                            </p>


                            <p>

                                <strong>
                                    Disciplinas:
                                </strong>

                                ${escaparHTML(
                                    disciplinas
                                )}

                            </p>


                            <p>

                                ${total}
                                questão(ões)

                                •
                                ${acertos}
                                acerto(s)

                                •
                                ${erros}
                                erro(s)

                                ${
                                    Number.isFinite(
                                        tempo
                                    )

                                        ? `• Tempo: ${formatarTempoSegundos(
                                            tempo
                                        )}`

                                        : ""
                                }

                            </p>


                            ${gerarBarraDesempenho(
                                percentual
                            )}

                        </div>

                    `;

                }
            )
            .join(
                ""
            );

}


// =====================================================
// ATUALIZAR PAINEL DOS SIMULADOS
// =====================================================

function atualizarDesempenhoSimulados() {

    const resumo =
        obterResumoSimuladosPSCPP();


    atualizarTexto(
        "simulados-total-tentativas",
        resumo.tentativas
    );


    atualizarTexto(
        "simulados-total-questoes",
        resumo.totalQuestoes
    );


    atualizarTexto(
        "simulados-total-acertos",
        resumo.acertos
    );


    atualizarTexto(
        "simulados-aproveitamento",
        formatarPercentual(
            resumo.aproveitamento
        )
    );


    atualizarTexto(
        "simulados-melhor-resultado",
        formatarPercentual(
            resumo.melhorResultado
        )
    );


    atualizarTexto(
        "simulados-tempo-medio",
        formatarTempoSegundos(
            resumo.tempoMedio
        )
    );


    atualizarDisciplinasSimuladosPSCPP();

    atualizarHistoricoSimuladosPSCPP();

}


// =====================================================
// CRIAR ESTRUTURA HIERÁRQUICA
// =====================================================

function criarEstruturaHierarquicaDesempenho() {

    const disciplinas =
        {};


    historicoExercicios.forEach(
        registro => {

            if (!registro) {

                return;

            }


            const nomeDisciplina =
                obterNomeValido(
                    registro.disciplina,
                    "Disciplina não informada"
                );


            const nomeAula =
                obterNomeValido(
                    registro.aula,
                    "Aula/Assunto não informado"
                );


            const nomeTopico =
                obterNomeValido(
                    registro.topico,
                    "Tópico não informado"
                );


            if (
                !disciplinas[
                    nomeDisciplina
                ]
            ) {

                disciplinas[
                    nomeDisciplina
                ] = {

                    titulo:
                        formatarNomeDisciplinaPSCPP(
                            nomeDisciplina
                        ),

                    total:
                        0,

                    acertos:
                        0,

                    aulas:
                        {}

                };

            }


            const disciplina =
                disciplinas[
                    nomeDisciplina
                ];


            disciplina.total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                disciplina.acertos++;

            }


            if (
                !disciplina
                    .aulas[
                        nomeAula
                    ]
            ) {

                disciplina
                    .aulas[
                        nomeAula
                    ] = {

                        titulo:
                            nomeAula,

                        total:
                            0,

                        acertos:
                            0,

                        topicos:
                            {}

                    };

            }


            const aula =
                disciplina
                    .aulas[
                        nomeAula
                    ];


            aula.total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                aula.acertos++;

            }


            if (
                !aula
                    .topicos[
                        nomeTopico
                    ]
            ) {

                aula
                    .topicos[
                        nomeTopico
                    ] = {

                        titulo:
                            nomeTopico,

                        total:
                            0,

                        acertos:
                            0

                    };

            }


            const topico =
                aula
                    .topicos[
                        nomeTopico
                    ];


            topico.total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                topico.acertos++;

            }

        }
    );


    return disciplinas;

}


// =====================================================
// RESUMO NUMÉRICO
// =====================================================

function gerarResumoNumericoDesempenho(
    total,
    acertos
) {

    const erros =
        total -
        acertos;


    const percentual =
        calcularPercentual(
            acertos,
            total
        );


    return {

        total:
            total,

        acertos:
            acertos,

        erros:
            erros,

        percentual:
            percentual

    };

}


// =====================================================
// GERAR TÓPICO
// =====================================================

function gerarTopicoHierarquico(
    topico
) {

    const resumo =
        gerarResumoNumericoDesempenho(

            topico.total,

            topico.acertos

        );


    return `

        <div class="desempenho-topico">

            <div class="desempenho-topico-cabecalho">

                <strong>
                    ${escaparHTML(
                        topico.titulo
                    )}
                </strong>

                <span class="desempenho-percentual">

                    ${formatarPercentual(
                        resumo.percentual
                    )}

                </span>

            </div>


            <p class="desempenho-resumo">

                Questões:
                ${resumo.total}

                &nbsp;•&nbsp;

                Acertos:
                ${resumo.acertos}

                &nbsp;•&nbsp;

                Erros:
                ${resumo.erros}

            </p>


            ${gerarBarraDesempenho(
                resumo.percentual
            )}

        </div>

    `;

}


// =====================================================
// GERAR AULA / ASSUNTO
// =====================================================

function gerarAulaHierarquica(
    aula
) {

    const resumo =
        gerarResumoNumericoDesempenho(

            aula.total,

            aula.acertos

        );


    const topicos =
        Object.values(
            aula.topicos
        )
        .sort(
            (
                a,
                b
            ) =>

                a.titulo.localeCompare(
                    b.titulo,
                    "pt-BR"
                )
        );


    const htmlTopicos =
        topicos
            .map(
                gerarTopicoHierarquico
            )
            .join(
                ""
            );


    return `

        <details class="desempenho-aula">

            <summary>

                <div class="desempenho-summary-conteudo">

                    <div>

                        <strong>
                            📖 ${escaparHTML(
                                aula.titulo
                            )}
                        </strong>

                        <span class="desempenho-summary-info">

                            ${resumo.total}
                            questão(ões)

                            •
                            ${resumo.acertos}
                            acerto(s)

                            •
                            ${resumo.erros}
                            erro(s)

                        </span>

                    </div>


                    <span class="desempenho-percentual">

                        ${formatarPercentual(
                            resumo.percentual
                        )}

                    </span>

                </div>


                ${gerarBarraDesempenho(
                    resumo.percentual
                )}

            </summary>


            <div class="desempenho-topicos">

                ${htmlTopicos}

            </div>

        </details>

    `;

}


// =====================================================
// GERAR DISCIPLINA
// =====================================================

function gerarDisciplinaHierarquica(
    disciplina
) {

    const resumo =
        gerarResumoNumericoDesempenho(

            disciplina.total,

            disciplina.acertos

        );


    const aulas =
        Object.values(
            disciplina.aulas
        )
        .sort(
            (
                a,
                b
            ) =>

                a.titulo.localeCompare(
                    b.titulo,
                    "pt-BR"
                )
        );


    const htmlAulas =
        aulas
            .map(
                gerarAulaHierarquica
            )
            .join(
                ""
            );


    return `

        <details class="desempenho-disciplina">

            <summary>

                <div class="desempenho-summary-conteudo">

                    <div>

                        <strong class="desempenho-titulo-disciplina">

                            📚 ${escaparHTML(
                                disciplina.titulo
                            )}

                        </strong>


                        <span class="desempenho-summary-info">

                            ${aulas.length}
                            aula(s)/assunto(s)

                            •
                            ${resumo.total}
                            questão(ões)

                            •
                            ${resumo.acertos}
                            acerto(s)

                            •
                            ${resumo.erros}
                            erro(s)

                        </span>

                    </div>


                    <span class="desempenho-percentual">

                        ${formatarPercentual(
                            resumo.percentual
                        )}

                    </span>

                </div>


                ${gerarBarraDesempenho(
                    resumo.percentual
                )}

            </summary>


            <div class="desempenho-aulas">

                ${htmlAulas}

            </div>

        </details>

    `;

}


// =====================================================
// RENDERIZAR DESEMPENHO HIERÁRQUICO
// =====================================================

function atualizarDesempenhoHierarquico() {

    const container =
        document.getElementById(
            "lista-desempenho-hierarquico"
        );


    if (!container) {

        return;

    }


    const estrutura =
        criarEstruturaHierarquicaDesempenho();


    const disciplinas =
        Object.values(
            estrutura
        )
        .sort(
            (
                a,
                b
            ) =>

                a.titulo.localeCompare(
                    b.titulo,
                    "pt-BR"
                )
        );


    if (
        disciplinas.length ===
        0
    ) {

        container.innerHTML = `

            <div class="widget">

                <p>
                    Nenhum exercício ou simulado respondido ainda.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        disciplinas
            .map(
                gerarDisciplinaHierarquica
            )
            .join(
                ""
            );

}


// =====================================================
// AGRUPAR HISTÓRICO
// =====================================================

function agruparHistorico(
    obterChave,
    obterTitulo
) {

    const grupos =
        {};


    historicoExercicios.forEach(
        registro => {

            if (!registro) {

                return;

            }


            const chave =
                obterChave(
                    registro
                );


            const titulo =
                obterTitulo(
                    registro
                );


            if (
                !grupos[
                    chave
                ]
            ) {

                grupos[
                    chave
                ] = {

                    titulo:
                        titulo,

                    total:
                        0,

                    acertos:
                        0

                };

            }


            grupos[
                chave
            ].total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                grupos[
                    chave
                ].acertos++;

            }

        }
    );


    return grupos;

}


// =====================================================
// ASSUNTOS PRIORITÁRIOS
// =====================================================

function atualizarAssuntosPrioritarios() {

    const grupos =
        agruparHistorico(

            registro => {

                const disciplina =
                    obterNomeValido(
                        registro.disciplina,
                        "Disciplina não informada"
                    );


                const aula =
                    obterNomeValido(
                        registro.aula,
                        "Aula/Assunto não informado"
                    );


                const topico =
                    obterNomeValido(
                        registro.topico,
                        "Tópico não informado"
                    );


                return (

                    disciplina +
                    "::" +
                    aula +
                    "::" +
                    topico

                );

            },

            registro =>
                obterNomeValido(
                    registro.topico,
                    "Tópico não informado"
                )

        );


    const prioridades =
        Object.values(
            grupos
        )

        .map(
            grupo => ({

                titulo:
                    grupo.titulo,

                total:
                    grupo.total,

                acertos:
                    grupo.acertos,

                percentual:
                    calcularPercentual(
                        grupo.acertos,
                        grupo.total
                    )

            })
        )

        .sort(
            (
                a,
                b
            ) => {

                if (
                    a.percentual !==
                    b.percentual
                ) {

                    return (
                        a.percentual -
                        b.percentual
                    );

                }


                return (
                    b.total -
                    a.total
                );

            }
        );


    if (
        prioridades.length ===
        0
    ) {

        atualizarHTML(
            "lista-assuntos-prioritarios",
            `
                <p>
                    Nenhum dado disponível.
                </p>
            `
        );


        return;

    }


    const html =
        prioridades

            .slice(
                0,
                5
            )

            .map(
                item => {

                    const erros =
                        item.total -
                        item.acertos;


                    return `

                        <div class="desempenho-prioridade">

                            <div class="desempenho-topico-cabecalho">

                                <strong>
                                    ${escaparHTML(
                                        item.titulo
                                    )}
                                </strong>

                                <span class="desempenho-percentual">

                                    ${formatarPercentual(
                                        item.percentual
                                    )}

                                </span>

                            </div>


                            <p>

                                ${item.total}
                                questão(ões)

                                •
                                ${erros}
                                erro(s)

                            </p>


                            ${gerarBarraDesempenho(
                                item.percentual
                            )}

                        </div>

                    `;

                }
            )
            .join(
                ""
            );


    atualizarHTML(
        "lista-assuntos-prioritarios",
        html
    );

}


// =====================================================
// CRIAR MESES DA LINHA TEMPORAL
// =====================================================

function criarLinhaTemporalEvolucaoPSCPP() {

    const meses =
        [];


    const cursor =
        new Date(
            DATA_INICIO_GRAFICO_PSCPP
        );


    while (
        cursor <=
        DATA_FIM_GRAFICO_PSCPP
    ) {

        meses.push({

            ano:
                cursor.getFullYear(),

            mes:
                cursor.getMonth(),

            total:
                0,

            acertos:
                0,

            erros:
                0,

            percentual:
                null

        });


        cursor.setMonth(
            cursor.getMonth() + 1
        );

    }


    return meses;

}


// =====================================================
// RÓTULO DO MÊS
// =====================================================

function obterRotuloMesPSCPP(
    ano,
    mes
) {

    const nomes =
        [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ"
        ];


    return (
        nomes[
            mes
        ] +
        "/" +
        ano
    );

}


// =====================================================
// CALCULAR EVOLUÇÃO MENSAL
// =====================================================

function calcularEvolucaoMensalPSCPP() {

    const meses =
        criarLinhaTemporalEvolucaoPSCPP();


    historicoExercicios.forEach(
        registro => {

            if (
                !registro ||
                !registro.data
            ) {

                return;

            }


            const data =
                new Date(
                    registro.data
                );


            if (
                Number.isNaN(
                    data.getTime()
                )
            ) {

                return;

            }


            const ano =
                data.getFullYear();


            const mes =
                data.getMonth();


            const grupo =
                meses.find(
                    item =>
                        item.ano === ano &&
                        item.mes === mes
                );


            if (!grupo) {

                return;

            }


            grupo.total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                grupo.acertos++;

            }

        }
    );


    meses.forEach(
        grupo => {

            grupo.erros =
                grupo.total -
                grupo.acertos;


            grupo.percentual =
                grupo.total > 0
                    ? calcularPercentual(
                        grupo.acertos,
                        grupo.total
                    )
                    : null;


            grupo.rotulo =
                obterRotuloMesPSCPP(
                    grupo.ano,
                    grupo.mes
                );

        }
    );


    return meses;

}


// =====================================================
// DETALHE DE UM MÊS DO GRÁFICO
// =====================================================

function mostrarDetalheMesEvolucaoPSCPP(
    indice
) {

    const item =
        dadosMensaisEvolucaoPSCPP[
            indice
        ];


    const detalhe =
        document.getElementById(
            "detalhe-evolucao-mensal"
        );


    if (
        !item ||
        !detalhe
    ) {

        return;

    }


    if (
        item.total === 0
    ) {

        detalhe.innerHTML = `

            <strong>
                ${escaparHTML(
                    item.rotulo
                )}
            </strong>

            <p>
                Nenhuma atividade registrada neste mês.
            </p>

        `;


        return;

    }


    detalhe.innerHTML = `

        <strong>
            ${escaparHTML(
                item.rotulo
            )}
        </strong>

        <p>

            Aproveitamento:
            <strong>
                ${formatarPercentual(
                    item.percentual
                )}
            </strong>

            &nbsp;•&nbsp;

            Questões:
            <strong>
                ${item.total}
            </strong>

            &nbsp;•&nbsp;

            Acertos:
            <strong>
                ${item.acertos}
            </strong>

            &nbsp;•&nbsp;

            Erros:
            <strong>
                ${item.erros}
            </strong>

        </p>

    `;

}


// =====================================================
// EVOLUÇÃO — GRÁFICO VERTICAL
// =====================================================

function atualizarEvolucao() {

    const container =
        document.getElementById(
            "lista-evolucao-desempenho"
        );


    if (!container) {

        return;

    }


    dadosMensaisEvolucaoPSCPP =
        calcularEvolucaoMensalPSCPP();


    const possuiDados =
        dadosMensaisEvolucaoPSCPP.some(
            item =>
                item.total >
                0
        );


    const barras =
        dadosMensaisEvolucaoPSCPP

            .map(
                (
                    item,
                    indice
                ) => {

                    const possuiAtividade =
                        item.total >
                        0;


                    const altura =
                        possuiAtividade
                            ? Math.max(
                                2,
                                item.percentual
                            )
                            : 0;


                    const valor =
                        possuiAtividade
                            ? formatarPercentual(
                                item.percentual
                            )
                            : "—";


                    return `

                        <button
                            type="button"
                            class="grafico-evolucao-coluna"
                            data-indice="${indice}"
                            aria-label="${escaparHTML(
                                item.rotulo
                            )}: ${
                                possuiAtividade
                                    ? formatarPercentual(
                                        item.percentual
                                    )
                                    : "sem atividade"
                            }"
                        >

                            <span class="grafico-evolucao-valor">

                                ${valor}

                            </span>


                            <span class="grafico-evolucao-area-barra">

                                <span
                                    class="grafico-evolucao-barra ${
                                        possuiAtividade
                                            ? ""
                                            : "sem-dados"
                                    }"
                                    style="height:${altura}%;"
                                ></span>

                            </span>


                            <span class="grafico-evolucao-rotulo">

                                ${escaparHTML(
                                    item.rotulo
                                        .replace(
                                            "/",
                                            "<br>"
                                        )
                                )}

                            </span>

                        </button>

                    `;

                }
            )
            .join(
                ""
            );


    container.innerHTML = `

        <div class="grafico-evolucao-wrapper">

            <div class="grafico-evolucao-titulo">

                <strong>
                    Aproveitamento mensal
                </strong>

                <span>
                    Exercícios + simulados
                </span>

            </div>


            <div class="grafico-evolucao-corpo">

                <div class="grafico-evolucao-eixo-y">

                    <span>100%</span>

                    <span>75%</span>

                    <span>50%</span>

                    <span>25%</span>

                    <span>0%</span>

                </div>


                <div class="grafico-evolucao-scroll">

                    <div class="grafico-evolucao-area">

                        <div class="grafico-linha grafico-linha-100"></div>

                        <div class="grafico-linha grafico-linha-75"></div>

                        <div class="grafico-linha grafico-linha-50"></div>

                        <div class="grafico-linha grafico-linha-25"></div>

                        <div class="grafico-linha grafico-linha-0"></div>


                        <div class="grafico-evolucao-colunas">

                            ${barras}

                        </div>

                    </div>

                </div>

            </div>


            <div
                id="detalhe-evolucao-mensal"
                class="grafico-evolucao-detalhe"
            >

                ${
                    possuiDados

                        ? `
                            Toque em uma barra para visualizar
                            os detalhes do mês.
                        `

                        : `
                            Ainda não existem atividades registradas
                            no período analisado.
                        `
                }

            </div>

        </div>

    `;


    container
        .querySelectorAll(
            ".grafico-evolucao-coluna"
        )
        .forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const indice =
                            Number(
                                botao.dataset.indice
                            );


                        mostrarDetalheMesEvolucaoPSCPP(
                            indice
                        );

                    }
                );

            }
        );

}


// =====================================================
// CLASSIFICAR DESEMPENHO
// =====================================================

function classificarDesempenho(
    percentual
) {

    if (
        percentual >=
        85
    ) {

        return "excelente";

    }


    if (
        percentual >=
        70
    ) {

        return "adequado";

    }


    if (
        percentual >=
        50
    ) {

        return "intermediário";

    }


    return "insuficiente";

}


// =====================================================
// RECOMENDAÇÃO AUTOMÁTICA
// =====================================================

function atualizarRecomendacao() {

    if (
        historicoExercicios.length ===
        0
    ) {

        atualizarTexto(
            "texto-recomendacao-desempenho",
            "Resolva exercícios ou simulados para gerar recomendações de estudo."
        );


        return;

    }


    const grupos =
        agruparHistorico(

            registro => {

                const disciplina =
                    obterNomeValido(
                        registro.disciplina,
                        "Disciplina não informada"
                    );


                const aula =
                    obterNomeValido(
                        registro.aula,
                        "Aula/Assunto não informado"
                    );


                const topico =
                    obterNomeValido(
                        registro.topico,
                        "Tópico não informado"
                    );


                return (

                    disciplina +
                    "::" +
                    aula +
                    "::" +
                    topico

                );

            },

            registro =>
                obterNomeValido(
                    registro.topico,
                    "Tópico não informado"
                )

        );


    const topicos =
        Object.values(
            grupos
        )

        .map(
            grupo => ({

                titulo:
                    grupo.titulo,

                total:
                    grupo.total,

                acertos:
                    grupo.acertos,

                percentual:
                    calcularPercentual(
                        grupo.acertos,
                        grupo.total
                    )

            })
        )

        .sort(
            (
                a,
                b
            ) => {

                if (
                    a.percentual !==
                    b.percentual
                ) {

                    return (
                        a.percentual -
                        b.percentual
                    );

                }


                return (
                    b.total -
                    a.total
                );

            }
        );


    const piorTopico =
        topicos[
            0
        ];


    if (!piorTopico) {

        atualizarTexto(
            "texto-recomendacao-desempenho",
            "Ainda não existem dados suficientes para gerar uma recomendação."
        );


        return;

    }


    const nivelGeral =
        classificarDesempenho(
            obterAproveitamentoGeral()
        );


    let recomendacao =
        "";


    if (
        piorTopico.percentual <
        50
    ) {

        recomendacao =

            `Seu desempenho geral está em nível ${nivelGeral}. ` +

            `Priorize o estudo e a revisão do tópico ` +

            `"${piorTopico.titulo}", no qual o aproveitamento atual é ` +

            `${formatarPercentual(
                piorTopico.percentual
            )} em ${piorTopico.total} questão(ões).`;

    }

    else if (
        piorTopico.percentual <
        70
    ) {

        recomendacao =

            `Seu desempenho geral está em nível ${nivelGeral}. ` +

            `Reforce o tópico "${piorTopico.titulo}", cujo aproveitamento ` +

            `atual é ${formatarPercentual(
                piorTopico.percentual
            )}. Revise a teoria e responda novas questões sobre esse assunto.`;

    }

    else {

        recomendacao =

            `Seu desempenho geral está em nível ${nivelGeral}. ` +

            `O tópico com maior necessidade relativa de revisão é ` +

            `"${piorTopico.titulo}", com aproveitamento de ` +

            `${formatarPercentual(
                piorTopico.percentual
            )}. Mantenha revisões periódicas e continue ampliando o histórico de questões.`;

    }


    atualizarTexto(
        "texto-recomendacao-desempenho",
        recomendacao
    );

}


// =====================================================
// ESTILOS DO GRÁFICO E DOS NOVOS PAINÉIS
//
// Mantidos aqui para não exigir alteração adicional
// no style.css nesta etapa.
// =====================================================

function garantirEstilosDesempenhoPSCPP() {

    if (
        document.getElementById(
            "estilos-desempenho-v4"
        )
    ) {

        return;

    }


    const estilo =
        document.createElement(
            "style"
        );


    estilo.id =
        "estilos-desempenho-v4";


    estilo.textContent = `

        .desempenho-simulado-disciplina,
        .desempenho-historico-simulado {

            padding: 16px 0;

            border-bottom:
                1px solid rgba(127, 127, 127, 0.22);

        }


        .desempenho-simulado-disciplina:last-child,
        .desempenho-historico-simulado:last-child {

            border-bottom:
                none;

        }


        .grafico-evolucao-wrapper {

            width: 100%;

        }


        .grafico-evolucao-titulo {

            display: flex;

            justify-content: space-between;

            gap: 12px;

            align-items: center;

            margin-bottom: 18px;

            flex-wrap: wrap;

        }


        .grafico-evolucao-titulo span {

            font-size: 0.9rem;

            opacity: 0.75;

        }


        .grafico-evolucao-corpo {

            display: flex;

            width: 100%;

            min-height: 330px;

        }


        .grafico-evolucao-eixo-y {

            width: 48px;

            min-width: 48px;

            height: 260px;

            display: flex;

            flex-direction: column;

            justify-content: space-between;

            align-items: flex-end;

            padding-right: 8px;

            font-size: 0.72rem;

            opacity: 0.75;

        }


        .grafico-evolucao-scroll {

            overflow-x: auto;

            overflow-y: hidden;

            width: 100%;

            padding-bottom: 8px;

            -webkit-overflow-scrolling: touch;

        }


        .grafico-evolucao-area {

            position: relative;

            height: 300px;

            min-width: 910px;

        }


        .grafico-evolucao-colunas {

            position: absolute;

            inset: 0;

            display: grid;

            grid-template-columns:
                repeat(15, minmax(48px, 1fr));

            gap: 6px;

            padding: 0 6px;

            z-index: 2;

        }


        .grafico-evolucao-coluna {

            border: none;

            background: transparent;

            padding: 0;

            margin: 0;

            min-width: 48px;

            height: 300px;

            cursor: pointer;

            display: grid;

            grid-template-rows:
                24px
                236px
                40px;

            align-items: end;

            color: inherit;

            font: inherit;

        }


        .grafico-evolucao-coluna:focus-visible {

            outline:
                2px solid currentColor;

            outline-offset:
                2px;

            border-radius:
                6px;

        }


        .grafico-evolucao-valor {

            text-align: center;

            font-size: 0.72rem;

            font-weight: 700;

            line-height: 1;

            align-self: center;

        }


        .grafico-evolucao-area-barra {

            height: 236px;

            width: 100%;

            display: flex;

            align-items: flex-end;

            justify-content: center;

        }


        .grafico-evolucao-barra {

            display: block;

            width: 68%;

            max-width: 34px;

            min-height: 2px;

            background:
                currentColor;

            opacity: 0.8;

            border-radius:
                5px 5px 0 0;

            transition:
                height 0.25s ease,
                opacity 0.2s ease,
                transform 0.2s ease;

        }


        .grafico-evolucao-coluna:hover
        .grafico-evolucao-barra,

        .grafico-evolucao-coluna:focus
        .grafico-evolucao-barra {

            opacity: 1;

            transform:
                scaleX(1.08);

        }


        .grafico-evolucao-barra.sem-dados {

            height: 0 !important;

            min-height: 0;

            opacity: 0.18;

        }


        .grafico-evolucao-rotulo {

            align-self: start;

            padding-top: 8px;

            text-align: center;

            font-size: 0.68rem;

            line-height: 1.15;

            white-space: nowrap;

        }


        .grafico-linha {

            position: absolute;

            left: 0;

            right: 0;

            border-top:
                1px dashed rgba(127, 127, 127, 0.28);

            z-index: 1;

            pointer-events: none;

        }


        .grafico-linha-100 {

            top: 24px;

        }


        .grafico-linha-75 {

            top: 83px;

        }


        .grafico-linha-50 {

            top: 142px;

        }


        .grafico-linha-25 {

            top: 201px;

        }


        .grafico-linha-0 {

            top: 260px;

            border-top-style: solid;

        }


        .grafico-evolucao-detalhe {

            margin-top: 14px;

            padding: 14px;

            border-radius: 8px;

            background:
                rgba(127, 127, 127, 0.08);

        }


        .grafico-evolucao-detalhe p {

            margin-bottom: 0;

        }


        @media (max-width: 700px) {

            .grafico-evolucao-corpo {

                min-height: 310px;

            }


            .grafico-evolucao-area {

                min-width: 850px;

            }


            .grafico-evolucao-eixo-y {

                width: 42px;

                min-width: 42px;

                font-size: 0.68rem;

            }

        }

    `;


    document.head.appendChild(
        estilo
    );

}


// =====================================================
// ATUALIZAR CENTRO COMPLETO
// =====================================================

function atualizarCentroDesempenho() {

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoSimulados();

    atualizarDesempenhoHierarquico();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}


// =====================================================
// RETORNO À ABA
// =====================================================

document.addEventListener(

    "visibilitychange",

    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            atualizarCentroDesempenho();

        }

    }

);


// =====================================================
// SINCRONIZAÇÃO ENTRE ABAS
// =====================================================

window.addEventListener(

    "storage",

    evento => {

        if (

            evento.key ===
                CHAVE_HISTORICO_EXERCICIOS ||

            evento.key ===
                CHAVE_HISTORICO_SIMULADOS

        ) {

            atualizarCentroDesempenho();

        }

    }

);


// =====================================================
// UTILIDADES EXTERNAS
// =====================================================

window.atualizarCentroDesempenho =
    atualizarCentroDesempenho;


window.mostrarDetalheMesEvolucaoPSCPP =
    mostrarDetalheMesEvolucaoPSCPP;


window.existeHistoricoDesempenho =
    function () {

        return (
            historicoExercicios.length >
            0
        );

    };


window.obterHistoricoDesempenho =
    function () {

        return historicoExercicios
            .slice();

    };


window.obterResumoFontesDesempenho =
    function () {

        return {

            tentativasExercicios:
                obterTotalTentativasExercicios(),

            tentativasSimulados:
                obterTotalTentativasSimulados(),

            questoesExercicios:
                obterTotalQuestoesExercicios(),

            questoesSimulados:
                obterTotalQuestoesSimulados()

        };

    };


window.obterResumoSimuladosPSCPP =
    obterResumoSimuladosPSCPP;


window.obterEvolucaoMensalPSCPP =
    function () {

        return calcularEvolucaoMensalPSCPP();

    };


// =====================================================
// DEBUG
// =====================================================

window.exibirResumoDesempenho =
    function () {

        console.group(
            "Centro de Desempenho PSCPP v4.0"
        );


        console.log(
            "Questões totais:",
            obterTotalQuestoes()
        );


        console.log(
            "Questões de exercícios:",
            obterTotalQuestoesExercicios()
        );


        console.log(
            "Questões de simulados:",
            obterTotalQuestoesSimulados()
        );


        console.log(
            "Tentativas totais:",
            obterTotalTentativas()
        );


        console.log(
            "Tentativas de exercícios:",
            obterTotalTentativasExercicios()
        );


        console.log(
            "Tentativas de simulados:",
            obterTotalTentativasSimulados()
        );


        console.log(
            "Acertos:",
            obterTotalAcertos()
        );


        console.log(
            "Erros:",
            obterTotalErros()
        );


        console.log(
            "Aproveitamento:",
            formatarPercentual(
                obterAproveitamentoGeral()
            )
        );


        console.log(
            "Resumo simulados:",
            obterResumoSimuladosPSCPP()
        );


        console.log(
            "Disciplinas avaliadas:",
            obterQuantidadeDisciplinasAvaliadas()
        );


        console.log(
            "Aulas/assuntos avaliados:",
            obterQuantidadeAulasAvaliadas()
        );


        console.log(
            "Tópicos avaliados:",
            obterQuantidadeTopicosAvaliados()
        );


        console.log(
            "Evolução mensal:",
            calcularEvolucaoMensalPSCPP()
        );


        console.groupEnd();

    };


// =====================================================
// FIM DESEMPENHO.JS v4.0
// =====================================================
