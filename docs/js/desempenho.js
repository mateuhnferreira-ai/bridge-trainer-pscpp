// =====================================================
// CENTRO DE DESEMPENHO PSCPP
// Bridge Trainer PSCPP
// Versão 2.0
//
// Estrutura:
//
// Disciplina
// └── Aula
//     └── Tópicos
//
// Melhorias:
//
// - organização hierárquica;
// - disciplinas recolhíveis;
// - aulas recolhíveis;
// - tópicos exibidos somente quando solicitados;
// - barras independentes do sistema de progresso;
// - correção do Índice de Preparação;
// - preservação integral do histórico existente;
// - assuntos prioritários;
// - evolução;
// - recomendação automática.
// =====================================================


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const CHAVE_HISTORICO_EXERCICIOS =
    "bridgeTrainerPSCPP_historicoExercicios";


let historicoTentativas = [];

let historicoExercicios = [];


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
// INICIAR CENTRO DE DESEMPENHO
// =====================================================

function iniciarCentroDesempenho() {

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoHierarquico();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}


// =====================================================
// NORMALIZAR HISTÓRICO
// =====================================================

function normalizarHistoricoDesempenho(
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
            // FORMATO ANTIGO:
            // questão salva individualmente
            // =========================================

            if (
                typeof tentativa.acertou !==
                "undefined"
            ) {

                questoesNormalizadas.push(
                    tentativa
                );


                return;

            }


            // =========================================
            // FORMATO ATUAL:
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
// CARREGAR HISTÓRICO
// =====================================================

function carregarHistorico() {

    try {

        const dados =
            localStorage.getItem(
                CHAVE_HISTORICO_EXERCICIOS
            );


        if (!dados) {

            historicoTentativas = [];

            historicoExercicios = [];


            return;

        }


        const historicoSalvo =
            JSON.parse(
                dados
            );


        historicoTentativas =

            Array.isArray(
                historicoSalvo
            )

                ? historicoSalvo
                : [];


        historicoExercicios =
            normalizarHistoricoDesempenho(
                historicoTentativas
            );

    }
    catch (erro) {

        console.error(
            "Erro ao carregar histórico de exercícios:",
            erro
        );


        historicoTentativas = [];

        historicoExercicios = [];

    }

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
            .toFixed(
                1
            )
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
// BARRA DE DESEMPENHO
// =====================================================
//
// IMPORTANTE:
//
// Não usa mais:
//
// .progresso
//
// nem:
//
// .barra-progresso-preenchimento
//
// Assim o Centro de Desempenho fica independente
// das barras utilizadas pelo progresso.js.
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
// TOTAIS
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
                    "Aula não informada"
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
                    "Aula não informada"
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
//
// O índice atual representa o aproveitamento
// acumulado das questões respondidas.
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
                    "Aula não informada"
                );


            const nomeTopico =
                obterNomeValido(
                    registro.topico,
                    "Tópico não informado"
                );


            // =========================================
            // DISCIPLINA
            // =========================================

            if (
                !disciplinas[
                    nomeDisciplina
                ]
            ) {

                disciplinas[
                    nomeDisciplina
                ] = {

                    titulo:
                        nomeDisciplina,

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


            // =========================================
            // AULA
            // =========================================

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


            // =========================================
            // TÓPICO
            // =========================================

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
// GERAR AULA
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
                            aula(s)

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
                    Nenhum exercício respondido ainda.
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
                        "Aula não informada"
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
// EVOLUÇÃO DO DESEMPENHO
// =====================================================

function atualizarEvolucao() {

    if (
        historicoExercicios.length ===
        0
    ) {

        atualizarHTML(
            "lista-evolucao-desempenho",
            `
                <p>
                    Sem histórico suficiente.
                </p>
            `
        );


        return;

    }


    const registrosOrdenados =
        historicoExercicios

            .slice()

            .sort(
                (
                    a,
                    b
                ) => {

                    const dataA =
                        new Date(
                            a?.data || 0
                        )
                        .getTime();


                    const dataB =
                        new Date(
                            b?.data || 0
                        )
                        .getTime();


                    return (
                        dataA -
                        dataB
                    );

                }
            );


    const ultimos =
        registrosOrdenados
            .slice(
                -10
            );


    const acertos =
        ultimos
            .filter(
                registro =>
                    registroFoiAcerto(
                        registro
                    )
            )
            .length;


    const erros =
        ultimos.length -
        acertos;


    const percentual =
        calcularPercentual(
            acertos,
            ultimos.length
        );


    atualizarHTML(
        "lista-evolucao-desempenho",
        `

            <div class="desempenho-evolucao">

                <h3>
                    Últimas ${ultimos.length} questões
                </h3>

                <p>

                    <strong>
                        Acertos:
                    </strong>

                    ${acertos}

                    &nbsp;•&nbsp;

                    <strong>
                        Erros:
                    </strong>

                    ${erros}

                </p>


                <p>

                    <strong>
                        Aproveitamento:
                    </strong>

                    ${formatarPercentual(
                        percentual
                    )}

                </p>


                ${gerarBarraDesempenho(
                    percentual
                )}

            </div>

        `
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
            "Resolva exercícios para gerar recomendações de estudo."
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
                        "Aula não informada"
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
// ATUALIZAR CENTRO COMPLETO
// =====================================================

function atualizarCentroDesempenho() {

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

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
            CHAVE_HISTORICO_EXERCICIOS
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


// =====================================================
// DEBUG
// =====================================================

window.exibirResumoDesempenho =
    function () {

        console.group(
            "Centro de Desempenho PSCPP v2.0"
        );


        console.log(
            "Questões:",
            obterTotalQuestoes()
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
            "Disciplinas avaliadas:",
            obterQuantidadeDisciplinasAvaliadas()
        );


        console.log(
            "Aulas avaliadas:",
            obterQuantidadeAulasAvaliadas()
        );


        console.log(
            "Tópicos avaliados:",
            obterQuantidadeTopicosAvaliados()
        );


        console.groupEnd();

    };


// =====================================================
// FIM DESEMPENHO.JS v2.0
// =====================================================
