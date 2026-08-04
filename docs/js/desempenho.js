// =====================================
// CENTRO DE DESEMPENHO PSCPP
// Bridge Trainer PSCPP
// Versão 1.1
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const CHAVE_HISTORICO_EXERCICIOS =
    "bridgeTrainerPSCPP_historicoExercicios";


let historicoTentativas = [];

let historicoExercicios = [];


// =====================================
// INICIALIZAÇÃO
// =====================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarCentroDesempenho
    );

} else {

    iniciarCentroDesempenho();

}


// =====================================
// INICIAR MÓDULO
// =====================================

function iniciarCentroDesempenho() {

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoDisciplinas();

    atualizarDesempenhoAulas();

    atualizarDesempenhoTopicos();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}


// =====================================
// NORMALIZAR HISTÓRICO DE DESEMPENHO
// =====================================

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


    const questoesNormalizadas = [];


    historicoSalvo.forEach(
        tentativa => {

            if (!tentativa) {

                return;

            }


            /*
             * Compatibilidade com registros antigos
             * que já tenham sido salvos individualmente.
             */

            if (
                typeof tentativa.acertou !==
                "undefined"
            ) {

                questoesNormalizadas.push(
                    tentativa
                );

                return;

            }


            /*
             * Formato atual do exercicios.js:
             *
             * tentativa
             * └── questoes[]
             */

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


// =====================================
// CARREGAR HISTÓRICO
// =====================================

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

// =====================================
// FUNÇÕES AUXILIARES
// =====================================

function atualizarTexto(
    id,
    texto
) {

    const elemento =
        document.getElementById(id);


    if (elemento) {

        elemento.textContent = texto;

    }

}


function atualizarHTML(
    id,
    html
) {

    const elemento =
        document.getElementById(id);


    if (elemento) {

        elemento.innerHTML = html;

    }

}


function limparElemento(id) {

    atualizarHTML(
        id,
        ""
    );

}


function formatarPercentual(valor) {

    const numero =
        Number(valor);


    if (!Number.isFinite(numero)) {

        return "0,0%";

    }


    return numero
        .toFixed(1)
        .replace(".", ",") + "%";

}


function formatarData(data) {

    if (!data) {

        return "--";

    }


    const objetoData =
        new Date(data);


    if (
        Number.isNaN(
            objetoData.getTime()
        )
    ) {

        return "--";

    }


    return objetoData.toLocaleDateString(
        "pt-BR"
    );

}


function formatarDataHora(data) {

    if (!data) {

        return "--";

    }


    const objetoData =
        new Date(data);


    if (
        Number.isNaN(
            objetoData.getTime()
        )
    ) {

        return "--";

    }


    return objetoData.toLocaleString(
        "pt-BR",
        {

            dateStyle: "short",

            timeStyle: "short"

        }
    );

}


function escaparHTML(texto) {

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
        typeof valor !== "string"
    ) {

        return padrao;

    }


    const texto =
        valor.trim();


    return texto || padrao;

}


function registroFoiAcerto(registro) {

    return (
        registro &&
        (
            registro.acertou === true ||
            registro.acertou === "true" ||
            registro.resultado === "acerto" ||
            registro.resultado === "correto"
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


// =====================================
// GERAR BARRA DE DESEMPENHO
// =====================================

function gerarBarraDesempenho(
    percentual
) {

    const valor =
        Math.max(
            0,
            Math.min(
                100,
                Number(percentual) || 0
            )
        );


    return `
        <div
            class="barra-progresso"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${valor.toFixed(1)}"
        >

            <div
                class="barra-progresso-preenchimento"
                style="width: ${valor.toFixed(1)}%;"
            ></div>

        </div>
    `;

}


// =====================================
// GERAR ITEM DE DESEMPENHO
// =====================================

function gerarItemDesempenho(
    titulo,
    total,
    acertos
) {

    const erros =
        total - acertos;


    const percentual =
        calcularPercentual(
            acertos,
            total
        );


    return `
        <div class="widget">

            <h3>
                ${escaparHTML(titulo)}
            </h3>

            <p>
                <strong>Questões:</strong>
                ${total}

                &nbsp;|&nbsp;

                <strong>Acertos:</strong>
                ${acertos}

                &nbsp;|&nbsp;

                <strong>Erros:</strong>
                ${erros}
            </p>

            <p>
                <strong>Aproveitamento:</strong>
                ${formatarPercentual(percentual)}
            </p>

            ${gerarBarraDesempenho(percentual)}

        </div>
    `;

}


// =====================================
// AGRUPAR HISTÓRICO
// =====================================

function agruparHistorico(
    obterChave,
    obterTitulo
) {

    const grupos = {};


    historicoExercicios.forEach(
        registro => {

            if (!registro) {

                return;

            }


            const chave =
                obterChave(registro);


            const titulo =
                obterTitulo(registro);


            if (!grupos[chave]) {

                grupos[chave] = {

                    titulo: titulo,

                    total: 0,

                    acertos: 0

                };

            }


            grupos[chave].total++;


            if (
                registroFoiAcerto(
                    registro
                )
            ) {

                grupos[chave].acertos++;

            }

        }
    );


    return grupos;

}


// =====================================
// ORDENAR GRUPOS POR NOME
// =====================================

function ordenarGruposPorNome(
    grupos
) {

    return Object.values(grupos)
        .sort(
            (a, b) =>
                a.titulo.localeCompare(
                    b.titulo,
                    "pt-BR"
                )
        );

}


// =====================================
// TOTAIS GERAIS
// =====================================
function obterTotalTentativas() {

    return historicoTentativas.length;

}
function obterTotalQuestoes() {

    return historicoExercicios.length;

}


function obterTotalAcertos() {

    return historicoExercicios.filter(
        registro =>
            registroFoiAcerto(
                registro
            )
    ).length;

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


// =====================================
// RESUMO GERAL
// =====================================

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


// =====================================
// ÚLTIMA ATIVIDADE
// =====================================

function obterUltimoRegistro() {

    if (
        historicoExercicios.length === 0
    ) {

        return null;

    }


    const registrosComData =
        historicoExercicios.filter(
            registro =>
                registro &&
                registro.data &&
                !Number.isNaN(
                    new Date(
                        registro.data
                    ).getTime()
                )
        );


    if (
        registrosComData.length === 0
    ) {

        return historicoExercicios[
            historicoExercicios.length - 1
        ];

    }


    return registrosComData
        .slice()
        .sort(
            (a, b) =>
                new Date(b.data) -
                new Date(a.data)
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


// =====================================
// PREPARAÇÃO PSCPP
// =====================================

function atualizarPreparacaoPSCPP() {

    atualizarTexto(
        "preparacao-questoes",
        obterTotalQuestoes()
    );


    atualizarTexto(
        "preparacao-acertos",
        obterTotalAcertos()
    );


    atualizarTexto(
        "preparacao-erros",
        obterTotalErros()
    );


    atualizarTexto(
        "preparacao-percentual",
        formatarPercentual(
            obterAproveitamentoGeral()
        )
    );

}


// =====================================
// DESEMPENHO POR DISCIPLINA
// =====================================

function atualizarDesempenhoDisciplinas() {

    const grupos =
        agruparHistorico(

            registro =>
                obterNomeValido(
                    registro.disciplina,
                    "Não informada"
                ),

            registro =>
                obterNomeValido(
                    registro.disciplina,
                    "Não informada"
                )

        );


    const disciplinas =
        ordenarGruposPorNome(
            grupos
        );


    if (
        disciplinas.length === 0
    ) {

        atualizarHTML(
            "lista-desempenho-disciplinas",
            `
                <p>
                    Nenhum exercício respondido.
                </p>
            `
        );

        return;

    }


    const html =
        disciplinas
            .map(
                disciplina =>
                    gerarItemDesempenho(
                        disciplina.titulo,
                        disciplina.total,
                        disciplina.acertos
                    )
            )
            .join("");


    atualizarHTML(
        "lista-desempenho-disciplinas",
        html
    );

}


// =====================================
// DESEMPENHO POR AULA
// =====================================

function atualizarDesempenhoAulas() {

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


                return (
                    disciplina +
                    "::" +
                    aula
                );

            },

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


                return (
                    aula +
                    " — " +
                    disciplina
                );

            }

        );


    const aulas =
        ordenarGruposPorNome(
            grupos
        );


    if (
        aulas.length === 0
    ) {

        atualizarHTML(
            "lista-desempenho-aulas",
            `
                <p>
                    Nenhuma aula registrada.
                </p>
            `
        );

        return;

    }


    const html =
        aulas
            .map(
                aula =>
                    gerarItemDesempenho(
                        aula.titulo,
                        aula.total,
                        aula.acertos
                    )
            )
            .join("");


    atualizarHTML(
        "lista-desempenho-aulas",
        html
    );

}


// =====================================
// DESEMPENHO POR TÓPICO
// =====================================

function atualizarDesempenhoTopicos() {

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

            registro => {

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
                    topico +
                    " — " +
                    aula
                );

            }

        );


    const topicos =
        ordenarGruposPorNome(
            grupos
        );


    if (
        topicos.length === 0
    ) {

        atualizarHTML(
            "lista-desempenho-topicos",
            `
                <p>
                    Nenhum tópico registrado.
                </p>
            `
        );

        return;

    }


    const html =
        topicos
            .map(
                topico =>
                    gerarItemDesempenho(
                        topico.titulo,
                        topico.total,
                        topico.acertos
                    )
            )
            .join("");


    atualizarHTML(
        "lista-desempenho-topicos",
        html
    );

}


// =====================================
// ASSUNTOS PRIORITÁRIOS
// =====================================

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
        Object.values(grupos)
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
                (a, b) => {

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
        prioridades.length === 0
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
                        <div class="widget">

                            <h3>
                                ${escaparHTML(item.titulo)}
                            </h3>

                            <p>
                                <strong>
                                    ${formatarPercentual(
                                        item.percentual
                                    )}
                                </strong>

                                de aproveitamento
                            </p>

                            <p>
                                ${item.total}
                                questão(ões)

                                &nbsp;|&nbsp;

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
            .join("");


    atualizarHTML(
        "lista-assuntos-prioritarios",
        html
    );

}


// =====================================
// EVOLUÇÃO DO DESEMPENHO
// =====================================

function atualizarEvolucao() {

    if (
        historicoExercicios.length === 0
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
                (a, b) => {

                    const dataA =
                        new Date(
                            a?.data || 0
                        ).getTime();


                    const dataB =
                        new Date(
                            b?.data || 0
                        ).getTime();


                    return dataA - dataB;

                }
            );


    const ultimos =
        registrosOrdenados.slice(
            -10
        );


    const acertos =
        ultimos.filter(
            registro =>
                registroFoiAcerto(
                    registro
                )
        ).length;


    const erros =
        ultimos.length -
        acertos;


    const percentual =
        calcularPercentual(
            acertos,
            ultimos.length
        );


    const html = `
        <div class="widget">

            <h3>
                Últimas ${ultimos.length} questões
            </h3>

            <p>
                <strong>Acertos:</strong>
                ${acertos}

                &nbsp;|&nbsp;

                <strong>Erros:</strong>
                ${erros}
            </p>

            <p>
                <strong>Aproveitamento:</strong>

                ${formatarPercentual(
                    percentual
                )}
            </p>

            ${gerarBarraDesempenho(
                percentual
            )}

        </div>
    `;


    atualizarHTML(
        "lista-evolucao-desempenho",
        html
    );

}


// =====================================
// CLASSIFICAR NÍVEL DE DESEMPENHO
// =====================================

function classificarDesempenho(
    percentual
) {

    if (
        percentual >= 85
    ) {

        return "excelente";

    }


    if (
        percentual >= 70
    ) {

        return "adequado";

    }


    if (
        percentual >= 50
    ) {

        return "intermediário";

    }


    return "insuficiente";

}


// =====================================
// RECOMENDAÇÃO AUTOMÁTICA
// =====================================

function atualizarRecomendacao() {

    if (
        historicoExercicios.length === 0
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
        Object.values(grupos)
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
                (a, b) => {

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
        topicos[0];


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


    let recomendacao = "";


    if (
        piorTopico.percentual < 50
    ) {

        recomendacao =
            `Seu desempenho geral está em nível ${nivelGeral}. ` +
            `Priorize o estudo e a revisão do tópico ` +
            `"${piorTopico.titulo}", no qual o aproveitamento atual é ` +
            `${formatarPercentual(piorTopico.percentual)} ` +
            `em ${piorTopico.total} questão(ões).`;

    }

    else if (
        piorTopico.percentual < 70
    ) {

        recomendacao =
            `Seu desempenho geral está em nível ${nivelGeral}. ` +
            `Reforce o tópico "${piorTopico.titulo}", cujo aproveitamento ` +
            `atual é ${formatarPercentual(piorTopico.percentual)}. ` +
            `Revise a teoria e responda novas questões sobre esse assunto.`;

    }

    else {

        recomendacao =
            `Seu desempenho geral está em nível ${nivelGeral}. ` +
            `O tópico com maior necessidade relativa de revisão é ` +
            `"${piorTopico.titulo}", com aproveitamento de ` +
            `${formatarPercentual(piorTopico.percentual)}. ` +
            `Mantenha revisões periódicas e continue ampliando o histórico de questões.`;

    }


    atualizarTexto(
        "texto-recomendacao-desempenho",
        recomendacao
    );

}


// =====================================
// ATUALIZAÇÃO AUTOMÁTICA
// =====================================

function atualizarCentroDesempenho() {

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoDisciplinas();

    atualizarDesempenhoAulas();

    atualizarDesempenhoTopicos();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}


// =====================================
// ATUALIZAR AO RETORNAR PARA A PÁGINA
// =====================================

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


// =====================================
// SINCRONIZAÇÃO ENTRE ABAS
// =====================================

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


// =====================================
// ATUALIZAÇÃO EXTERNA
// =====================================

window.atualizarCentroDesempenho =
    atualizarCentroDesempenho;


// =====================================
// UTILIDADES EXTERNAS
// =====================================

function existeHistorico() {

    return (
        historicoExercicios.length >
        0
    );

}


function obterHistorico() {

    return historicoExercicios.slice();

}


window.existeHistoricoDesempenho =
    existeHistorico;


window.obterHistoricoDesempenho =
    obterHistorico;


// =====================================
// DEPURAÇÃO
// =====================================

function exibirResumoConsole() {

    console.group(
        "Centro de Desempenho PSCPP"
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
        "Última atividade:",
        obterUltimaAtividade()
    );


    console.groupEnd();

}


window.exibirResumoDesempenho =
    exibirResumoConsole;


// =====================================
// FIM DO ARQUIVO
// =====================================
