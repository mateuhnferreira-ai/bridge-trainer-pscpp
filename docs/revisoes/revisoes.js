// =====================================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
// Versão 1.3
//
// OBJETIVO:
//
// Gerar automaticamente uma verdadeira
// mini-aula de revisão a partir da aula original.
//
// A revisão NÃO depende exclusivamente do desempenho.
//
// O núcleo conceitual é obrigatório e procura extrair:
//
// - conceito;
// - explicação;
// - relações físicas;
// - fórmulas;
// - interpretação;
// - aplicação operacional;
// - atenção PSCPP;
// - termos técnicos.
//
// PRÓXIMAS CAMADAS:
//
// - desempenho adaptativo;
// - pontos prioritários;
// - questões inteligentes;
// - registro automático da revisão.
// =====================================================


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const REVISAO_MAX_NUCLEOS =
    8;


const REVISAO_MAX_PARAGRAFOS_CONCEITO =
    3;


const REVISAO_MAX_TERMOS_POR_NUCLEO =
    8;


// =====================================================
// ESTADO DA REVISÃO
// =====================================================

let revisaoAtual = {

    disciplina: null,

    aula: null,

    caminhoAulaOriginal: null,

    documentoAulaOriginal: null,

    topicosAnalisados: [],

    nucleosSelecionados: []

};


// =====================================================
// NORMALIZAÇÃO
// =====================================================

function normalizarIdRevisao(
    texto
) {

    if (!texto) {

        return "";

    }


    return texto

        .toString()

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .toLowerCase()

        .trim()

        .replace(
            /[^a-z0-9]+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""
        );

}


// =====================================================
// LIMPAR TEXTO
// =====================================================

function limparTextoRevisao(
    texto
) {

    if (!texto) {

        return "";

    }


    return texto

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


// =====================================================
// ESCAPAR HTML
// =====================================================

function escaparHTMLRevisao(
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


// =====================================================
// FORMATAR IDENTIFICADOR
// =====================================================

function formatarTituloRevisao(
    identificador
) {

    if (!identificador) {

        return "—";

    }


    return identificador

        .split("-")

        .map(
            palavra => {

                if (!palavra) {

                    return "";

                }


                return (

                    palavra
                        .charAt(0)
                        .toUpperCase() +

                    palavra.slice(1)

                );

            }
        )

        .join(" ");

}


// =====================================================
// PARÂMETROS DA URL
// =====================================================

function obterParametrosRevisao() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    return {

        disciplina:
            normalizarIdRevisao(
                parametros.get(
                    "disciplina"
                )
            ),

        aula:
            normalizarIdRevisao(
                parametros.get(
                    "aula"
                )
            )

    };

}


// =====================================================
// ATUALIZAÇÃO DA INTERFACE
// =====================================================

function atualizarTextoRevisao(
    id,
    texto
) {

    const elemento =
        document.getElementById(
            id
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        texto;

}


function atualizarHTMLRevisao(
    id,
    html
) {

    const elemento =
        document.getElementById(
            id
        );


    if (!elemento) {

        return;

    }


    elemento.innerHTML =
        html;

}


// =====================================================
// CAMINHO DA AULA ORIGINAL
// =====================================================

function criarCaminhoAulaOriginal(
    disciplina,
    aula
) {

    if (
        !disciplina ||
        !aula
    ) {

        return null;

    }


    return (

        "../disciplinas/" +

        disciplina +

        "/" +

        aula +

        ".html"

    );

}


// =====================================================
// ERRO
// =====================================================

function mostrarErroRevisao(
    mensagem
) {

    atualizarTextoRevisao(

        "titulo-revisao",

        "⚠ Revisão não identificada"

    );


    atualizarTextoRevisao(

        "subtitulo-revisao",

        mensagem

    );


    atualizarHTMLRevisao(

        "painel-foco-revisao",

        `

        <p>
            Não foi possível preparar
            esta aula de revisão.
        </p>

        <p>
            ${escaparHTMLRevisao(
                mensagem
            )}
        </p>

        `

    );

}


// =====================================================
// IDENTIDADE
// =====================================================

function preencherIdentidadeRevisao() {

    const nomeDisciplina =
        formatarTituloRevisao(
            revisaoAtual.disciplina
        );


    const nomeAula =
        formatarTituloRevisao(
            revisaoAtual.aula
        );


    atualizarTextoRevisao(

        "titulo-revisao",

        "🔁 Revisão — " +
        nomeAula

    );


    atualizarTextoRevisao(

        "subtitulo-revisao",

        "Revisão conceitual da aula " +
        nomeAula +
        " — " +
        nomeDisciplina +
        "."

    );


    atualizarTextoRevisao(

        "revisao-disciplina",

        nomeDisciplina

    );


    atualizarTextoRevisao(

        "revisao-aula",

        nomeAula

    );

}


// =====================================================
// CARREGAR AULA ORIGINAL
// =====================================================

async function carregarAulaOriginal() {

    const caminho =
        criarCaminhoAulaOriginal(

            revisaoAtual.disciplina,

            revisaoAtual.aula

        );


    if (!caminho) {

        throw new Error(
            "Não foi possível criar o caminho da aula original."
        );

    }


    revisaoAtual
        .caminhoAulaOriginal =
        caminho;


    const resposta =
        await fetch(
            caminho
        );


    if (!resposta.ok) {

        throw new Error(

            "A aula original não foi encontrada em: " +
            caminho

        );

    }


    const html =
        await resposta.text();


    if (!html) {

        throw new Error(
            "A aula original foi carregada, mas está vazia."
        );

    }


    return html;

}


// =====================================================
// CRIAR DOCUMENTO TEMPORÁRIO
// =====================================================

function criarDocumentoAulaOriginal(
    html
) {

    const parser =
        new DOMParser();


    return parser.parseFromString(

        html,

        "text/html"

    );

}


// =====================================================
// VALIDAR AULA
// =====================================================

function validarDocumentoAulaOriginal(
    documento
) {

    if (
        !documento ||
        !documento.body
    ) {

        return false;

    }


    const disciplinaEncontrada =
        normalizarIdRevisao(
            documento.body
                .dataset
                .disciplina
        );


    const aulaEncontrada =
        normalizarIdRevisao(
            documento.body
                .dataset
                .aula
        );


    if (
        disciplinaEncontrada !==
            revisaoAtual.disciplina ||
        aulaEncontrada !==
            revisaoAtual.aula
    ) {

        console.warn(
            "A identidade interna da aula diverge da URL.",
            {

                esperado: {

                    disciplina:
                        revisaoAtual.disciplina,

                    aula:
                        revisaoAtual.aula

                },

                encontrado: {

                    disciplina:
                        disciplinaEncontrada,

                    aula:
                        aulaEncontrada

                }

            }
        );

    }


    return true;

}


// =====================================================
// RESUMO ESTRUTURAL
// =====================================================

function obterResumoEstruturaAula(
    documento
) {

    return {

        topicos:
            documento
                .querySelectorAll(
                    ".topico-aula"
                )
                .length,

        destaques:
            documento
                .querySelectorAll(
                    ".destaque"
                )
                .length,

        atencoes:
            documento
                .querySelectorAll(
                    ".atencao-pratico"
                )
                .length,

        termosTecnicos:
            documento
                .querySelectorAll(
                    ".termos-tecnicos"
                )
                .length,

        questoes:
            documento
                .querySelectorAll(
                    ".questao"
                )
                .length

    };

}


// =====================================================
// TÍTULO DO TÓPICO
// =====================================================

function obterTituloTopicoRevisao(
    topico
) {

    const titulo =
        topico.querySelector(
            "h2, h3"
        );


    if (!titulo) {

        return "";

    }


    return limparTextoRevisao(
        titulo.textContent
    );

}


// =====================================================
// REMOVER NUMERAÇÃO
// =====================================================

function removerNumeroTituloRevisao(
    titulo
) {

    return String(
        titulo || ""
    )

        .replace(
            /^\s*\d+[\.\-\)]*\s*/,
            ""
        )

        .trim();

}


// =====================================================
// OBTER WIDGET PRINCIPAL
// =====================================================

function obterWidgetPrincipalTopico(
    topico
) {

    if (!topico) {

        return null;

    }


    return topico.querySelector(
        ":scope > .widget"
    ) ||

    topico.querySelector(
        ".widget"
    );

}


// =====================================================
// PARÁGRAFOS DO CONCEITO
// =====================================================
//
// Captura até três parágrafos principais,
// antes das caixas especiais.
//
// Assim deixamos de produzir apenas
// uma frase isolada.
// =====================================================

function obterParagrafosConceituais(
    topico
) {

    const widget =
        obterWidgetPrincipalTopico(
            topico
        );


    if (!widget) {

        return [];

    }


    const resultados =
        [];


    const filhos =
        Array.from(
            widget.children
        );


    for (
        const filho of filhos
    ) {

        if (
            filho.matches &&
            filho.matches(
                ".destaque, " +
                ".atencao-pratico, " +
                ".termos-tecnicos, " +
                ".figura-aula"
            )
        ) {

            continue;

        }


        if (
            filho.tagName ===
            "P"
        ) {

            const texto =
                limparTextoRevisao(
                    filho.textContent
                );


            if (
                texto.length >=
                25
            ) {

                resultados.push(
                    texto
                );

            }

        }


        if (
            resultados.length >=
            REVISAO_MAX_PARAGRAFOS_CONCEITO
        ) {

            break;

        }

    }


    return resultados;

}


// =====================================================
// DESTAQUES
// =====================================================

function obterDestaquesTopico(
    topico
) {

    const blocos =
        Array.from(
            topico.querySelectorAll(
                ".destaque"
            )
        );


    return blocos

        .map(
            bloco => {

                const titulo =
                    bloco.querySelector(
                        "h3, h4"
                    );


                const paragrafos =
                    Array.from(
                        bloco.querySelectorAll(
                            "p"
                        )
                    )

                    .map(
                        p =>
                            limparTextoRevisao(
                                p.textContent
                            )
                    )

                    .filter(
                        texto =>
                            texto.length >
                            10
                    );


                return {

                    titulo:
                        titulo
                            ? limparTextoRevisao(
                                titulo.textContent
                            )
                            : "Conceito fundamental",

                    textos:
                        paragrafos

                };

            }
        )

        .filter(
            bloco =>
                bloco.textos.length >
                0
        );

}


// =====================================================
// PONTOS DE ATENÇÃO
// =====================================================

function obterAtencoesTopico(
    topico
) {

    return Array.from(

        topico.querySelectorAll(
            ".atencao-pratico"
        )

    )

        .map(
            bloco => {

                const paragrafos =
                    Array.from(
                        bloco.querySelectorAll(
                            "p"
                        )
                    );


                return paragrafos

                    .map(
                        p =>
                            limparTextoRevisao(
                                p.textContent
                            )
                    )

                    .filter(
                        texto =>
                            texto.length >
                            10
                    );

            }
        )

        .flat();

}


// =====================================================
// TERMOS TÉCNICOS
// =====================================================

function obterTermosTecnicosTopico(
    topico
) {

    const itens =
        Array.from(

            topico.querySelectorAll(
                ".termos-tecnicos li"
            )

        );


    const termos =
        itens

            .map(
                item =>
                    limparTextoRevisao(
                        item.textContent
                    )
            )

            .filter(
                texto =>
                    texto.length >
                    2
            );


    return termos.slice(
        0,
        REVISAO_MAX_TERMOS_POR_NUCLEO
    );

}


// =====================================================
// APLICAÇÃO OPERACIONAL
// =====================================================
//
// Procura classes específicas e também
// caixas cujo título contenha palavras
// relacionadas à aplicação operacional.
// =====================================================

function obterAplicacoesOperacionais(
    topico
) {

    const resultados =
        [];


    const seletores = [

        ".aplicacao-operacional",

        ".aplicacao-pratica",

        ".aplicacao",

        ".operacional"

    ];


    seletores.forEach(
        seletor => {

            topico
                .querySelectorAll(
                    seletor
                )
                .forEach(
                    bloco => {

                        const texto =
                            limparTextoRevisao(
                                bloco.textContent
                            );


                        if (
                            texto.length >
                            20
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );

        }
    );


    const caixas =
        Array.from(
            topico.querySelectorAll(
                ".widget, .destaque"
            )
        );


    caixas.forEach(
        caixa => {

            const titulo =
                caixa.querySelector(
                    "h3, h4"
                );


            if (!titulo) {

                return;

            }


            const nome =
                limparTextoRevisao(
                    titulo.textContent
                )
                .toLowerCase();


            if (
                nome.includes(
                    "aplicação"
                ) ||
                nome.includes(
                    "aplicacao"
                ) ||
                nome.includes(
                    "operacional"
                )
            ) {

                const paragrafos =
                    Array.from(
                        caixa.querySelectorAll(
                            "p"
                        )
                    );


                paragrafos.forEach(
                    paragrafo => {

                        const texto =
                            limparTextoRevisao(
                                paragrafo.textContent
                            );


                        if (
                            texto.length >
                            20
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );

            }

        }
    );


    return Array.from(
        new Set(
            resultados
        )
    );

}


// =====================================================
// DETECTAR FÓRMULA
// =====================================================
//
// Muitas fórmulas das aulas não usam
// uma classe própria.
//
// Por isso procuramos também padrões
// matemáticos no texto.
//
// Exemplos:
//
// Nv = ∂N / ∂v
// Yv = ∂Y / ∂v
// F = m × a
// V ∝ √L
// =====================================================

function pareceFormulaRevisao(
    texto
) {

    if (!texto) {

        return false;

    }


    const valor =
        limparTextoRevisao(
            texto
        );


    if (
        valor.length >
        180
    ) {

        return false;

    }


    const possuiIgual =
        valor.includes(
            "="
        );


    const possuiSimbolo =
        /[∂∑∆√≈∝≤≥×÷]/.test(
            valor
        );


    const possuiDerivada =
        /\bd[a-zA-Z]\s*\/\s*d[a-zA-Z]/.test(
            valor
        );


    const possuiVariaveis =
        /^[A-Za-z][A-Za-z0-9()_\s]*\s*=/.test(
            valor
        );


    return (

        possuiSimbolo ||

        possuiDerivada ||

        (
            possuiIgual &&
            possuiVariaveis
        )

    );

}


// =====================================================
// EXTRAIR FÓRMULAS
// =====================================================

function obterFormulasTopico(
    topico
) {

    const resultados =
        [];


    const seletores = [

        ".formula",

        ".equacao",

        ".equação",

        "math"

    ];


    seletores.forEach(
        seletor => {

            topico
                .querySelectorAll(
                    seletor
                )
                .forEach(
                    elemento => {

                        const texto =
                            limparTextoRevisao(
                                elemento.textContent
                            );


                        if (texto) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );

        }
    );


    const candidatos =
        Array.from(
            topico.querySelectorAll(
                "p, strong"
            )
        );


    candidatos.forEach(
        elemento => {

            const texto =
                limparTextoRevisao(
                    elemento.textContent
                );


            if (
                pareceFormulaRevisao(
                    texto
                )
            ) {

                resultados.push(
                    texto
                );

            }

        }
    );


    return Array.from(
        new Set(
            resultados
        )
    )

        .slice(
            0,
            4
        );

}


// =====================================================
// INTERPRETAÇÃO FÍSICA
// =====================================================
//
// Procura parágrafos que já contenham
// linguagem interpretativa.
//
// Não cria informação nova.
// Apenas seleciona o que está na aula.
// =====================================================

function obterInterpretacoesTopico(
    topico
) {

    const paragrafos =
        Array.from(
            topico.querySelectorAll(
                "p"
            )
        );


    const marcadores = [

        "isso significa",

        "fisicamente",

        "na prática",

        "na pratica",

        "representa",

        "indica",

        "tende",

        "efeito",

        "consequência",

        "consequencia",

        "implica",

        "quando o navio",

        "para o prático",

        "para o pratico"

    ];


    const resultados =
        [];


    paragrafos.forEach(
        paragrafo => {

            const texto =
                limparTextoRevisao(
                    paragrafo.textContent
                );


            const minusculo =
                texto.toLowerCase();


            const combina =
                marcadores.some(
                    marcador =>
                        minusculo.includes(
                            marcador
                        )
                );


            if (
                combina &&
                texto.length >=
                    35 &&
                texto.length <=
                    550
            ) {

                resultados.push(
                    texto
                );

            }

        }
    );


    return Array.from(
        new Set(
            resultados
        )
    )

        .slice(
            0,
            2
        );

}


// =====================================================
// IMPORTÂNCIA ESTRUTURAL
// =====================================================

function calcularImportanciaTopico(
    topico
) {

    let pontos =
        1;


    if (
        topico.querySelector(
            ".destaque"
        )
    ) {

        pontos +=
            4;

    }


    if (
        topico.querySelector(
            ".atencao-pratico"
        )
    ) {

        pontos +=
            3;

    }


    if (
        topico.querySelector(
            ".termos-tecnicos"
        )
    ) {

        pontos +=
            1;

    }


    if (
        obterFormulasTopico(
            topico
        ).length >
        0
    ) {

        pontos +=
            4;

    }


    if (
        obterAplicacoesOperacionais(
            topico
        ).length >
        0
    ) {

        pontos +=
            2;

    }


    if (
        topico.querySelector(
            ".figura-aula, figure, svg"
        )
    ) {

        pontos +=
            1;

    }


    return pontos;

}


// =====================================================
// ANALISAR TÓPICOS
// =====================================================

function analisarTopicosAula(
    documento
) {

    const elementos =
        Array.from(
            documento.querySelectorAll(
                ".topico-aula"
            )
        );


    const total =
        elementos.length;


    return elementos

        .map(
            (
                topico,
                indice
            ) => {

                const titulo =
                    removerNumeroTituloRevisao(

                        obterTituloTopicoRevisao(
                            topico
                        )

                    );


                const conceito =
                    obterParagrafosConceituais(
                        topico
                    );


                const destaques =
                    obterDestaquesTopico(
                        topico
                    );


                const formulas =
                    obterFormulasTopico(
                        topico
                    );


                const interpretacoes =
                    obterInterpretacoesTopico(
                        topico
                    );


                const aplicacoes =
                    obterAplicacoesOperacionais(
                        topico
                    );


                const atencoes =
                    obterAtencoesTopico(
                        topico
                    );


                const termos =
                    obterTermosTecnicosTopico(
                        topico
                    );


                return {

                    indice:
                        indice,

                    posicao:
                        total > 1
                            ? indice /
                                (
                                    total - 1
                                )
                            : 0,

                    id:
                        normalizarIdRevisao(

                            topico.dataset
                                .topicoId ||

                            topico.id ||

                            titulo

                        ),

                    titulo:
                        titulo,

                    conceito:
                        conceito,

                    destaques:
                        destaques,

                    formulas:
                        formulas,

                    interpretacoes:
                        interpretacoes,

                    aplicacoes:
                        aplicacoes,

                    atencoes:
                        atencoes,

                    termos:
                        termos,

                    importancia:
                        calcularImportanciaTopico(
                            topico
                        )

                };

            }
        )

        .filter(
            item => {

                return (

                    item.titulo &&

                    (
                        item.conceito.length >
                            0 ||

                        item.destaques.length >
                            0
                    )

                );

            }
        );

}


// =====================================================
// SELEÇÃO DISTRIBUÍDA
// =====================================================
//
// Mantemos cobertura da aula inteira.
//
// Uma aula longa é dividida em faixas.
// Cada faixa fornece um núcleo principal.
// =====================================================

function selecionarNucleosPrincipais(
    topicos
) {

    if (
        !Array.isArray(
            topicos
        ) ||
        topicos.length ===
            0
    ) {

        return [];

    }


    const quantidade =
        Math.min(

            REVISAO_MAX_NUCLEOS,

            topicos.length

        );


    const tamanhoFaixa =
        topicos.length /
        quantidade;


    const selecionados =
        [];


    for (
        let faixa = 0;
        faixa < quantidade;
        faixa++
    ) {

        const inicio =
            Math.floor(
                faixa *
                tamanhoFaixa
            );


        const fim =
            Math.min(

                topicos.length,

                Math.floor(
                    (
                        faixa + 1
                    ) *
                    tamanhoFaixa
                )

            );


        const candidatos =
            topicos

                .slice(
                    inicio,
                    fim
                )

                .sort(
                    (
                        a,
                        b
                    ) => {

                        if (
                            b.importancia !==
                            a.importancia
                        ) {

                            return (

                                b.importancia -
                                a.importancia

                            );

                        }


                        return (

                            a.indice -
                            b.indice

                        );

                    }
                );


        if (
            candidatos.length >
            0
        ) {

            selecionados.push(
                candidatos[0]
            );

        }

    }


    return selecionados

        .sort(
            (
                a,
                b
            ) =>

                a.indice -
                b.indice
        );

}


// =====================================================
// GERAR PARÁGRAFOS
// =====================================================

function gerarParagrafosRevisao(
    textos
) {

    if (
        !Array.isArray(
            textos
        ) ||
        textos.length ===
            0
    ) {

        return "";

    }


    return textos

        .map(
            texto => `

                <p>
                    ${escaparHTMLRevisao(
                        texto
                    )}
                </p>

            `
        )

        .join("");

}


// =====================================================
// GERAR DESTAQUES
// =====================================================

function gerarDestaquesRevisao(
    destaques
) {

    if (
        !Array.isArray(
            destaques
        ) ||
        destaques.length ===
            0
    ) {

        return "";

    }


    return destaques

        .map(
            bloco => `

                <div class="destaque">

                    <h3>
                        💡
                        ${escaparHTMLRevisao(
                            bloco.titulo
                        )}
                    </h3>

                    ${gerarParagrafosRevisao(
                        bloco.textos
                    )}

                </div>

            `
        )

        .join("");

}


// =====================================================
// GERAR FÓRMULAS
// =====================================================

function gerarFormulasRevisao(
    formulas
) {

    if (
        !Array.isArray(
            formulas
        ) ||
        formulas.length ===
            0
    ) {

        return "";

    }


    return `

        <div class="destaque">

            <h3>
                🧮 Relações e fórmulas
            </h3>

            ${formulas

                .map(
                    formula => `

                        <p
                        style="
                            text-align:center;
                            font-size:1.15rem;
                            margin:14px 0;
                        "
                        >

                            <strong>
                                ${escaparHTMLRevisao(
                                    formula
                                )}
                            </strong>

                        </p>

                    `
                )

                .join("")
            }

        </div>

    `;

}


// =====================================================
// GERAR INTERPRETAÇÃO
// =====================================================

function gerarInterpretacoesRevisao(
    interpretacoes
) {

    if (
        !Array.isArray(
            interpretacoes
        ) ||
        interpretacoes.length ===
            0
    ) {

        return "";

    }


    return `

        <div class="widget">

            <h3>
                🔎 Interpretação
            </h3>

            ${gerarParagrafosRevisao(
                interpretacoes
            )}

        </div>

    `;

}


// =====================================================
// GERAR APLICAÇÃO OPERACIONAL
// =====================================================

function gerarAplicacoesRevisao(
    aplicacoes
) {

    if (
        !Array.isArray(
            aplicacoes
        ) ||
        aplicacoes.length ===
            0
    ) {

        return "";

    }


    return `

        <div class="destaque">

            <h3>
                ⚓ Aplicação operacional
            </h3>

            ${gerarParagrafosRevisao(
                aplicacoes.slice(
                    0,
                    2
                )
            )}

        </div>

    `;

}


// =====================================================
// GERAR ATENÇÃO PSCPP
// =====================================================

function gerarAtencoesRevisao(
    atencoes
) {

    if (
        !Array.isArray(
            atencoes
        ) ||
        atencoes.length ===
            0
    ) {

        return "";

    }


    return `

        <div class="atencao-pratico">

            <h3>
                ⚠ Atenção PSCPP
            </h3>

            ${gerarParagrafosRevisao(
                atencoes.slice(
                    0,
                    3
                )
            )}

        </div>

    `;

}


// =====================================================
// GERAR TERMOS TÉCNICOS
// =====================================================

function gerarTermosRevisao(
    termos
) {

    if (
        !Array.isArray(
            termos
        ) ||
        termos.length ===
            0
    ) {

        return "";

    }


    return `

        <div class="termos-tecnicos">

            <h3>
                🌐 Terminologia técnica
            </h3>

            <ul>

                ${termos

                    .map(
                        termo => `

                            <li>
                                ${escaparHTMLRevisao(
                                    termo
                                )}
                            </li>

                        `
                    )

                    .join("")
                }

            </ul>

        </div>

    `;

}


// =====================================================
// RENDERIZAR NÚCLEOS CONCEITUAIS
// =====================================================

function renderizarNucleosConceituais(
    nucleos
) {

    const container =
        document.getElementById(
            "lista-pontos-revisao"
        );


    if (!container) {

        return;

    }


    // =================================
    // IMPORTANTE
    //
    // Para uma mini-aula, os núcleos
    // ficam em uma coluna.
    //
    // Não queremos mais cards pequenos
    // lado a lado.
    // =================================

    container.style
        .gridTemplateColumns =
        "1fr";


    if (
        !Array.isArray(
            nucleos
        ) ||
        nucleos.length ===
            0
    ) {

        container.innerHTML = `

            <div class="widget">

                <p>
                    Não foi possível gerar
                    automaticamente o núcleo
                    conceitual desta aula.
                </p>

            </div>

        `;


        return;

    }


    const html =
        nucleos

            .map(
                (
                    nucleo,
                    indice
                ) => {

                    return `

                    <article
                    class="widget"
                    data-revisao-topico="${
                        escaparHTMLRevisao(
                            nucleo.id
                        )
                    }"
                    >

                        <h2>

                            ${indice + 1}.
                            ${escaparHTMLRevisao(
                                nucleo.titulo
                            )}

                        </h2>


                        <div>

                            <h3>
                                📘 Estrutura conceitual
                            </h3>

                            ${gerarParagrafosRevisao(
                                nucleo.conceito
                            )}

                        </div>


                        ${gerarDestaquesRevisao(
                            nucleo.destaques
                        )}


                        ${gerarFormulasRevisao(
                            nucleo.formulas
                        )}


                        ${gerarInterpretacoesRevisao(
                            nucleo.interpretacoes
                        )}


                        ${gerarAplicacoesRevisao(
                            nucleo.aplicacoes
                        )}


                        ${gerarAtencoesRevisao(
                            nucleo.atencoes
                        )}


                        ${gerarTermosRevisao(
                            nucleo.termos
                        )}


                    </article>

                    `;

                }
            )

            .join("");


    container.innerHTML =
        html;

}


// =====================================================
// GERAR NÚCLEO DA REVISÃO
// =====================================================

function gerarNucleoRevisao(
    documento
) {

    const topicos =
        analisarTopicosAula(
            documento
        );


    revisaoAtual
        .topicosAnalisados =
        topicos;


    const nucleos =
        selecionarNucleosPrincipais(
            topicos
        );


    revisaoAtual
        .nucleosSelecionados =
        nucleos;


    renderizarNucleosConceituais(
        nucleos
    );


    console.log(
        "Núcleo conceitual expandido:",
        {

            topicosAnalisados:
                topicos.length,

            nucleosSelecionados:
                nucleos

        }
    );

}


// =====================================================
// PAINEL DE FOCO
// =====================================================

function mostrarAulaOriginalCarregada(
    resumo
) {

    atualizarHTMLRevisao(

        "painel-foco-revisao",

        `

        <p>
            <strong>
                Aula original localizada com sucesso.
            </strong>
        </p>

        <p>
            O sistema está utilizando a estrutura
            completa da aula original para produzir
            uma revisão conceitual automática.
        </p>

        <ul>

            <li>
                Tópicos analisáveis:
                <strong>
                    ${resumo.topicos}
                </strong>
            </li>

            <li>
                Conceitos destacados:
                <strong>
                    ${resumo.destaques}
                </strong>
            </li>

            <li>
                Pontos de atenção:
                <strong>
                    ${resumo.atencoes}
                </strong>
            </li>

            <li>
                Blocos de terminologia:
                <strong>
                    ${resumo.termosTecnicos}
                </strong>
            </li>

            <li>
                Questões disponíveis:
                <strong>
                    ${resumo.questoes}
                </strong>
            </li>

        </ul>

        <p>
            <strong>
                Método:
            </strong>

            núcleo conceitual obrigatório
            + relações físicas
            + fórmulas
            + aplicação operacional
            + atenção PSCPP
            + terminologia técnica.
        </p>

        `

    );

}


// =====================================================
// PREPARAR AULA ORIGINAL
// =====================================================

async function prepararAulaOriginal() {

    try {

        const html =
            await carregarAulaOriginal();


        const documento =
            criarDocumentoAulaOriginal(
                html
            );


        if (
            !validarDocumentoAulaOriginal(
                documento
            )
        ) {

            throw new Error(
                "A estrutura da aula original é inválida."
            );

        }


        revisaoAtual
            .documentoAulaOriginal =
            documento;


        const resumo =
            obterResumoEstruturaAula(
                documento
            );


        mostrarAulaOriginalCarregada(
            resumo
        );


        gerarNucleoRevisao(
            documento
        );


        console.log(
            "Aula de revisão preparada:",
            revisaoAtual
        );


        return true;

    }
    catch (erro) {

        console.error(
            "Erro ao preparar revisão:",
            erro
        );


        atualizarHTMLRevisao(

            "painel-foco-revisao",

            `

            <p>
                <strong>
                    ⚠ Não foi possível preparar
                    a aula de revisão.
                </strong>
            </p>

            <p>
                ${escaparHTMLRevisao(
                    erro.message
                )}
            </p>

            `

        );


        return false;

    }

}


// =====================================================
// INICIALIZAÇÃO
// =====================================================

async function inicializarAulaRevisao() {

    const parametros =
        obterParametrosRevisao();


    if (
        !parametros.disciplina ||
        !parametros.aula
    ) {

        mostrarErroRevisao(
            "Disciplina ou aula não informada na URL."
        );


        return;

    }


    revisaoAtual.disciplina =
        parametros.disciplina;


    revisaoAtual.aula =
        parametros.aula;


    preencherIdentidadeRevisao();


    await prepararAulaOriginal();

}


// =====================================================
// CARREGAMENTO AUTOMÁTICO
// =====================================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        inicializarAulaRevisao();

    }

);


// =====================================================
// DEBUG
// =====================================================

console.log(
    "SISTEMA DE AULA DE REVISÃO PSCPP v1.3 CARREGADO"
);


// =====================================================
// FIM revisoes.js v1.3
// =====================================================
