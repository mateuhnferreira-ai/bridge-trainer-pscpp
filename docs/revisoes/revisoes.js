// =====================================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
// Versão 1.4
//
// REFINAMENTO DA REVISÃO CONCEITUAL
//
// PRINCIPAIS MELHORIAS:
//
// - deduplicação de conteúdo;
// - fórmulas separadas do texto conceitual;
// - destaques não repetem fórmulas;
// - interpretação não repete conceito;
// - aplicação operacional isolada;
// - atenção PSCPP isolada;
// - terminologia técnica limpa;
// - preservação do núcleo conceitual obrigatório;
// - nenhuma informação técnica nova é inventada.
//
// A revisão continua sendo extraída
// exclusivamente da aula original.
// =====================================================


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const REVISAO_MAX_NUCLEOS =
    8;


const REVISAO_MAX_PARAGRAFOS_CONCEITO =
    4;


const REVISAO_MAX_DESTAQUES =
    2;


const REVISAO_MAX_INTERPRETACOES =
    2;


const REVISAO_MAX_APLICACOES =
    2;


const REVISAO_MAX_ATENCOES =
    3;


const REVISAO_MAX_TERMOS =
    8;


const REVISAO_MAX_FORMULAS =
    4;


// =====================================================
// ESTADO
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
// NORMALIZAR ID
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
// NORMALIZAR TEXTO PARA COMPARAÇÃO
// =====================================================

function normalizarTextoComparacao(
    texto
) {

    return String(
        texto || ""
    )

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .toLowerCase()

        .replace(
            /\s+/g,
            " "
        )

        .replace(
            /[.,;:!?()[\]{}"'`´]/g,
            ""
        )

        .trim();

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
// FORMATAR ID COMO TÍTULO
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
// DEDUPLICAR TEXTOS
// =====================================================

function deduplicarTextosRevisao(
    textos
) {

    const resultado =
        [];


    const vistos =
        new Set();


    (
        textos || []
    ).forEach(
        texto => {

            const limpo =
                limparTextoRevisao(
                    texto
                );


            if (!limpo) {

                return;

            }


            const chave =
                normalizarTextoComparacao(
                    limpo
                );


            if (!chave) {

                return;

            }


            if (
                vistos.has(
                    chave
                )
            ) {

                return;

            }


            vistos.add(
                chave
            );


            resultado.push(
                limpo
            );

        }
    );


    return resultado;

}


// =====================================================
// TEXTO JÁ EXISTE EM OUTRA CAMADA?
// =====================================================

function textoJaRepresentado(
    texto,
    referencias
) {

    const alvo =
        normalizarTextoComparacao(
            texto
        );


    if (!alvo) {

        return false;

    }


    return (
        referencias || []
    ).some(
        referencia => {

            const base =
                normalizarTextoComparacao(
                    referencia
                );


            if (!base) {

                return false;

            }


            return (

                alvo === base ||

                (
                    alvo.length >
                        35 &&
                    base.includes(
                        alvo
                    )
                ) ||

                (
                    base.length >
                        35 &&
                    alvo.includes(
                        base
                    )
                )

            );

        }
    );

}


// =====================================================
// URL
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
// INTERFACE
// =====================================================

function atualizarTextoRevisao(
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


function atualizarHTMLRevisao(
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


// =====================================================
// CAMINHO DA AULA
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
// CARREGAR AULA
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


    return await resposta.text();

}


// =====================================================
// DOCUMENTO TEMPORÁRIO
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
// VALIDAÇÃO
// =====================================================

function validarDocumentoAulaOriginal(
    documento
) {

    return Boolean(

        documento &&
        documento.body

    );

}


// =====================================================
// RESUMO ESTRUTURAL
// =====================================================

function obterResumoEstruturaAula(
    documento
) {

    return {

        topicos:
            documento.querySelectorAll(
                ".topico-aula"
            ).length,

        destaques:
            documento.querySelectorAll(
                ".destaque"
            ).length,

        atencoes:
            documento.querySelectorAll(
                ".atencao-pratico"
            ).length,

        termosTecnicos:
            documento.querySelectorAll(
                ".termos-tecnicos"
            ).length,

        questoes:
            documento.querySelectorAll(
                ".questao"
            ).length

    };

}


// =====================================================
// TÍTULO
// =====================================================

function obterTituloTopicoRevisao(
    topico
) {

    const titulo =
        topico.querySelector(
            "h2, h3"
        );


    return titulo
        ? limparTextoRevisao(
            titulo.textContent
        )
        : "";

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
// WIDGET PRINCIPAL
// =====================================================

function obterWidgetPrincipalTopico(
    topico
) {

    return (

        topico.querySelector(
            ":scope > .widget"
        ) ||

        topico.querySelector(
            ".widget"
        )

    );

}


// =====================================================
// DETECTAR FÓRMULA
// =====================================================

function pareceFormulaRevisao(
    texto
) {

    const valor =
        limparTextoRevisao(
            texto
        );


    if (
        !valor ||
        valor.length >
            180
    ) {

        return false;

    }


    const simbolos =
        /[∂∑∆√≈∝≤≥×÷]/;


    const igualdade =
        /=/;


    const derivada =
        /\b[d∂][A-Za-z]\s*\/\s*[d∂][A-Za-z]/;


    const formaAlgebrica =
        /^[A-Za-z][A-Za-z0-9_'′()]*\s*[≈=∝]/;


    return (

        simbolos.test(
            valor
        ) ||

        derivada.test(
            valor
        ) ||

        (
            igualdade.test(
                valor
            ) &&
            formaAlgebrica.test(
                valor
            )
        )

    );

}


// =====================================================
// FÓRMULAS
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


    topico
        .querySelectorAll(
            "p, strong"
        )
        .forEach(
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


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_FORMULAS
        );

}


// =====================================================
// PARÁGRAFOS CONCEITUAIS
// =====================================================

function obterParagrafosConceituais(
    topico,
    formulas
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


    Array.from(
        widget.children
    )
    .forEach(
        filho => {

            if (
                filho.matches &&
                filho.matches(

                    ".destaque, " +
                    ".atencao-pratico, " +
                    ".termos-tecnicos, " +
                    ".figura-aula"

                )
            ) {

                return;

            }


            if (
                filho.tagName !==
                "P"
            ) {

                return;

            }


            const texto =
                limparTextoRevisao(
                    filho.textContent
                );


            if (
                texto.length <
                    25 ||
                pareceFormulaRevisao(
                    texto
                ) ||
                textoJaRepresentado(
                    texto,
                    formulas
                )
            ) {

                return;

            }


            resultados.push(
                texto
            );

        }
    );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_PARAGRAFOS_CONCEITO
        );

}


// =====================================================
// DESTAQUES
// =====================================================

function obterDestaquesTopico(
    topico,
    formulas,
    conceito
) {

    const resultado =
        [];


    Array.from(
        topico.querySelectorAll(
            ".destaque"
        )
    )
    .forEach(
        bloco => {

            const titulo =
                bloco.querySelector(
                    "h3, h4"
                );


            const textos =
                [];


            bloco
                .querySelectorAll(
                    "p"
                )
                .forEach(
                    p => {

                        const texto =
                            limparTextoRevisao(
                                p.textContent
                            );


                        if (
                            texto.length <
                                15 ||
                            pareceFormulaRevisao(
                                texto
                            ) ||
                            textoJaRepresentado(
                                texto,
                                formulas
                            ) ||
                            textoJaRepresentado(
                                texto,
                                conceito
                            )
                        ) {

                            return;

                        }


                        textos.push(
                            texto
                        );

                    }
                );


            const textosLimpos =
                deduplicarTextosRevisao(
                    textos
                );


            if (
                textosLimpos.length >
                0
            ) {

                resultado.push({

                    titulo:
                        titulo
                            ? limparTextoRevisao(
                                titulo.textContent
                            )
                            : "Conceito fundamental",

                    textos:
                        textosLimpos

                });

            }

        }
    );


    return resultado.slice(
        0,
        REVISAO_MAX_DESTAQUES
    );

}


// =====================================================
// INTERPRETAÇÃO
// =====================================================

function obterInterpretacoesTopico(
    topico,
    referencias
) {

    const marcadores = [

        "isso significa",

        "fisicamente",

        "representa",

        "indica",

        "implica",

        "tende",

        "consequência",

        "consequencia",

        "quando o navio",

        "o efeito",

        "em termos físicos",

        "em termos fisicos"

    ];


    const resultados =
        [];


    topico
        .querySelectorAll(
            "p"
        )
        .forEach(
            p => {

                const texto =
                    limparTextoRevisao(
                        p.textContent
                    );


                if (
                    texto.length <
                        35 ||
                    texto.length >
                        550 ||
                    pareceFormulaRevisao(
                        texto
                    ) ||
                    textoJaRepresentado(
                        texto,
                        referencias
                    )
                ) {

                    return;

                }


                const minusculo =
                    texto.toLowerCase();


                if (
                    marcadores.some(
                        marcador =>
                            minusculo.includes(
                                marcador
                            )
                    )
                ) {

                    resultados.push(
                        texto
                    );

                }

            }
        );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_INTERPRETACOES
        );

}


// =====================================================
// APLICAÇÃO OPERACIONAL
// =====================================================

function obterAplicacoesOperacionais(
    topico,
    referencias
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

                        bloco
                            .querySelectorAll(
                                "p"
                            )
                            .forEach(
                                p => {

                                    const texto =
                                        limparTextoRevisao(
                                            p.textContent
                                        );


                                    if (
                                        texto.length >
                                            25 &&
                                        !textoJaRepresentado(
                                            texto,
                                            referencias
                                        )
                                    ) {

                                        resultados.push(
                                            texto
                                        );

                                    }

                                }
                            );

                    }
                );

        }
    );


    topico
        .querySelectorAll(
            ".widget, .destaque"
        )
        .forEach(
            caixa => {

                const titulo =
                    caixa.querySelector(
                        "h3, h4"
                    );


                if (!titulo) {

                    return;

                }


                const nome =
                    normalizarTextoComparacao(
                        titulo.textContent
                    );


                if (
                    !nome.includes(
                        "aplicacao"
                    ) &&
                    !nome.includes(
                        "operacional"
                    ) &&
                    !nome.includes(
                        "pratico"
                    )
                ) {

                    return;

                }


                caixa
                    .querySelectorAll(
                        "p"
                    )
                    .forEach(
                        p => {

                            const texto =
                                limparTextoRevisao(
                                    p.textContent
                                );


                            if (
                                texto.length >
                                    25 &&
                                !textoJaRepresentado(
                                    texto,
                                    referencias
                                )
                            ) {

                                resultados.push(
                                    texto
                                );

                            }

                        }
                    );

            }
        );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_APLICACOES
        );

}


// =====================================================
// ATENÇÃO PSCPP
// =====================================================

function obterAtencoesTopico(
    topico,
    referencias
) {

    const resultados =
        [];


    topico
        .querySelectorAll(
            ".atencao-pratico p"
        )
        .forEach(
            p => {

                const texto =
                    limparTextoRevisao(
                        p.textContent
                    );


                if (
                    texto.length >
                        15 &&
                    !textoJaRepresentado(
                        texto,
                        referencias
                    )
                ) {

                    resultados.push(
                        texto
                    );

                }

            }
        );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_ATENCOES
        );

}


// =====================================================
// TERMOS TÉCNICOS
// =====================================================

function obterTermosTecnicosTopico(
    topico
) {

    const resultados =
        [];


    topico
        .querySelectorAll(
            ".termos-tecnicos li"
        )
        .forEach(
            li => {

                const texto =
                    limparTextoRevisao(
                        li.textContent
                    );


                if (
                    texto.length >
                    2
                ) {

                    resultados.push(
                        texto
                    );

                }

            }
        );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_TERMOS
        );

}


// =====================================================
// IMPORTÂNCIA ESTRUTURAL
// =====================================================

function calcularImportanciaTopico(
    topico,
    formulas
) {

    let pontos =
        1;


    if (
        topico.querySelector(
            ".destaque"
        )
    ) {

        pontos += 4;

    }


    if (
        topico.querySelector(
            ".atencao-pratico"
        )
    ) {

        pontos += 3;

    }


    if (
        topico.querySelector(
            ".termos-tecnicos"
        )
    ) {

        pontos += 1;

    }


    if (
        formulas.length >
        0
    ) {

        pontos += 4;

    }


    if (
        topico.querySelector(
            ".aplicacao-operacional, " +
            ".aplicacao-pratica"
        )
    ) {

        pontos += 2;

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


                const formulas =
                    obterFormulasTopico(
                        topico
                    );


                const conceito =
                    obterParagrafosConceituais(

                        topico,

                        formulas

                    );


                const destaques =
                    obterDestaquesTopico(

                        topico,

                        formulas,

                        conceito

                    );


                const referenciasBase =
                    [

                        ...formulas,

                        ...conceito,

                        ...destaques.flatMap(
                            item =>
                                item.textos
                        )

                    ];


                const interpretacoes =
                    obterInterpretacoesTopico(

                        topico,

                        referenciasBase

                    );


                const referenciasComInterpretacao =
                    [

                        ...referenciasBase,

                        ...interpretacoes

                    ];


                const aplicacoes =
                    obterAplicacoesOperacionais(

                        topico,

                        referenciasComInterpretacao

                    );


                const atencoes =
                    obterAtencoesTopico(

                        topico,

                        [

                            ...referenciasComInterpretacao,

                            ...aplicacoes

                        ]

                    );


                const termos =
                    obterTermosTecnicosTopico(
                        topico
                    );


                return {

                    indice:
                        indice,

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

                            topico,

                            formulas

                        )

                };

            }
        )

        .filter(
            item =>

                item.titulo &&

                (
                    item.conceito.length >
                        0 ||

                    item.destaques.length >
                        0 ||

                    item.formulas.length >
                        0
                )

        );

}


// =====================================================
// SELECIONAR NÚCLEOS
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


    return selecionados.sort(
        (
            a,
            b
        ) =>
            a.indice -
            b.indice
    );

}


// =====================================================
// PARÁGRAFOS HTML
// =====================================================

function gerarParagrafosRevisao(
    textos
) {

    return (
        textos || []
    )

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
// DESTAQUE HTML
// =====================================================

function gerarDestaquesRevisao(
    destaques
) {

    if (
        !destaques ||
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
                    💡 ${escaparHTMLRevisao(
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
// FÓRMULAS HTML
// =====================================================

function gerarFormulasRevisao(
    formulas
) {

    if (
        !formulas ||
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
                    font-size:1.2rem;
                    margin:18px 0;
                    line-height:1.6;
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
// INTERPRETAÇÃO HTML
// =====================================================

function gerarInterpretacoesRevisao(
    textos
) {

    if (
        !textos ||
        textos.length ===
            0
    ) {

        return "";

    }


    return `

    <div class="widget">

        <h3>
            🔎 Interpretação física
        </h3>

        ${gerarParagrafosRevisao(
            textos
        )}

    </div>

    `;

}


// =====================================================
// APLICAÇÃO HTML
// =====================================================

function gerarAplicacoesRevisao(
    textos
) {

    if (
        !textos ||
        textos.length ===
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
            textos
        )}

    </div>

    `;

}


// =====================================================
// ATENÇÃO HTML
// =====================================================

function gerarAtencoesRevisao(
    textos
) {

    if (
        !textos ||
        textos.length ===
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
            textos
        )}

    </div>

    `;

}


// =====================================================
// TERMOS HTML
// =====================================================

function gerarTermosRevisao(
    termos
) {

    if (
        !termos ||
        termos.length ===
            0
    ) {

        return "";

    }


    return `

    <div class="termos-tecnicos">

        <h3>
            🌐 Termos técnicos
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
// RENDERIZAR NÚCLEOS
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


    container.style
        .gridTemplateColumns =
        "1fr";


    if (
        !nucleos ||
        nucleos.length ===
            0
    ) {

        container.innerHTML = `

        <div class="widget">

            <p>
                Não foi possível gerar
                o núcleo conceitual.
            </p>

        </div>

        `;


        return;

    }


    container.innerHTML =
        nucleos

            .map(
                (
                    nucleo,
                    indice
                ) => `

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


                    ${
                        nucleo.conceito.length >
                        0
                            ? `

                            <div>

                                <h3>
                                    📘 Estrutura conceitual
                                </h3>

                                ${gerarParagrafosRevisao(
                                    nucleo.conceito
                                )}

                            </div>

                            `
                            : ""
                    }


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

                `
            )

            .join("");

}


// =====================================================
// GERAR NÚCLEO
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
        "REVISÃO v1.4 — núcleos:",
        nucleos
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
                Aula original localizada.
            </strong>
        </p>

        <p>
            A revisão abaixo foi construída
            automaticamente a partir da
            estrutura técnica da aula.
        </p>

        <p>
            <strong>
                ${resumo.topicos}
            </strong>
            tópicos analisados,
            com conceitos, fórmulas,
            interpretação, aplicações,
            pontos de atenção e terminologia.
        </p>

        `

    );

}


// =====================================================
// PREPARAR AULA
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
                "A aula original possui estrutura inválida."
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


        return true;

    }
    catch (erro) {

        console.error(
            "Erro na revisão:",
            erro
        );


        atualizarHTMLRevisao(

            "painel-foco-revisao",

            `

            <p>
                <strong>
                    ⚠ Erro ao preparar revisão.
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
// INICIALIZAR
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
// CARREGAMENTO
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
    "SISTEMA DE REVISÃO PSCPP v1.4 CARREGADO"
);


// =====================================================
// FIM
// =====================================================


/* =====================================================
   EXTENSÃO v1.5
   PONTOS DE ATENÇÃO DA REVISÃO

   Bridge Trainer PSCPP

   Função:

   - reunir automaticamente os pontos de atenção
     existentes na aula original;

   - priorizar os tópicos que fazem parte do
     núcleo conceitual da revisão;

   - complementar com outros pontos importantes
     da aula;

   - eliminar repetições;

   - não depender do desempenho do aluno;

   - não inventar conteúdo novo.
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

const REVISAO_MAX_PONTOS_ATENCAO_GERAL =
    10;


// =====================================
// CRIAR REGISTRO DE ATENÇÃO
// =====================================

function criarRegistroAtencaoRevisao(
    topico,
    texto
) {

    if (
        !topico ||
        !texto
    ) {

        return null;

    }


    return {

        idTopico:
            topico.id || "",

        tituloTopico:
            topico.titulo ||
            "Ponto de atenção",

        texto:
            limparTextoRevisao(
                texto
            ),

        importancia:
            Number(
                topico.importancia || 0
            )

    };

}


// =====================================
// COLETAR ATENÇÕES DOS NÚCLEOS
// =====================================

function coletarAtencoesDosNucleos(
    nucleos
) {

    const resultado =
        [];


    (
        nucleos || []
    ).forEach(
        topico => {

            (
                topico.atencoes || []
            ).forEach(
                texto => {

                    const registro =
                        criarRegistroAtencaoRevisao(
                            topico,
                            texto
                        );


                    if (
                        registro
                    ) {

                        resultado.push(
                            registro
                        );

                    }

                }
            );

        }
    );


    return resultado;

}


// =====================================
// COLETAR ATENÇÕES COMPLEMENTARES
// =====================================

function coletarAtencoesComplementares(
    topicos,
    nucleos
) {

    const idsNucleos =
        new Set(

            (
                nucleos || []
            ).map(
                item =>
                    item.id
            )

        );


    const candidatos =
        (
            topicos || []
        )

        .filter(
            topico =>

                !idsNucleos.has(
                    topico.id
                ) &&

                Array.isArray(
                    topico.atencoes
                ) &&

                topico.atencoes.length >
                    0

        )

        .sort(
            (
                a,
                b
            ) =>

                Number(
                    b.importancia || 0
                ) -

                Number(
                    a.importancia || 0
                )

        );


    const resultado =
        [];


    candidatos.forEach(
        topico => {

            topico.atencoes
                .forEach(
                    texto => {

                        const registro =
                            criarRegistroAtencaoRevisao(
                                topico,
                                texto
                            );


                        if (
                            registro
                        ) {

                            resultado.push(
                                registro
                            );

                        }

                    }
                );

        }
    );


    return resultado;

}


// =====================================
// DEDUPLICAR PONTOS DE ATENÇÃO
// =====================================

function deduplicarPontosAtencaoRevisao(
    registros
) {

    const resultado =
        [];


    const textosRegistrados =
        [];


    (
        registros || []
    ).forEach(
        registro => {

            if (
                !registro ||
                !registro.texto
            ) {

                return;

            }


            if (
                textoJaRepresentado(

                    registro.texto,

                    textosRegistrados

                )
            ) {

                return;

            }


            textosRegistrados.push(
                registro.texto
            );


            resultado.push(
                registro
            );

        }
    );


    return resultado;

}


// =====================================
// SELECIONAR PONTOS DE ATENÇÃO
// =====================================

function selecionarPontosAtencaoRevisao(
    topicos,
    nucleos
) {

    // Primeiro:
    // pontos pertencentes ao núcleo
    // conceitual obrigatório.

    const principais =
        coletarAtencoesDosNucleos(
            nucleos
        );


    // Depois:
    // pontos relevantes existentes
    // em outros tópicos da aula.

    const complementares =
        coletarAtencoesComplementares(

            topicos,

            nucleos

        );


    const combinados = [

        ...principais,

        ...complementares

    ];


    return deduplicarPontosAtencaoRevisao(
        combinados
    )

        .slice(
            0,
            REVISAO_MAX_PONTOS_ATENCAO_GERAL
        );

}


// =====================================
// RENDERIZAR PONTOS DE ATENÇÃO
// =====================================

function renderizarPontosAtencaoRevisao(
    pontos
) {

    const container =
        document.getElementById(
            "lista-atencao-revisao"
        );


    if (!container) {

        return;

    }


    if (
        !Array.isArray(
            pontos
        ) ||
        pontos.length ===
            0
    ) {

        container.innerHTML = `

            <div class="widget">

                <p>
                    Nenhum ponto de atenção específico
                    foi identificado nesta aula.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML = `

        <div class="widget">

            <p>
                Os pontos abaixo merecem atenção especial
                durante a revisão porque representam
                distinções, limitações ou interpretações
                destacadas na própria aula.
            </p>

        </div>


        ${pontos

            .map(
                (
                    ponto,
                    indice
                ) => `

                <div
                    class="atencao-pratico"
                    data-revisao-atencao="${
                        escaparHTMLRevisao(
                            ponto.idTopico
                        )
                    }"
                >

                    <h3>

                        ⚠ ${indice + 1}.
                        ${escaparHTMLRevisao(
                            ponto.tituloTopico
                        )}

                    </h3>

                    <p>

                        ${escaparHTMLRevisao(
                            ponto.texto
                        )}

                    </p>

                </div>

                `
            )

            .join("")
        }

    `;

}


// =====================================
// GERAR CAMADA DE ATENÇÃO
// =====================================

function gerarPontosAtencaoRevisao() {

    const pontos =
        selecionarPontosAtencaoRevisao(

            revisaoAtual
                .topicosAnalisados,

            revisaoAtual
                .nucleosSelecionados

        );


    renderizarPontosAtencaoRevisao(
        pontos
    );


    console.log(

        "REVISÃO v1.5 — pontos de atenção:",

        pontos

    );

}


// =====================================================
// SOBRESCREVER GERAÇÃO DO NÚCLEO
//
// Mantém toda a lógica da v1.4
// e acrescenta a nova camada de atenção.
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


    // Mini-aula conceitual

    renderizarNucleosConceituais(
        nucleos
    );


    // Pontos de atenção globais

    gerarPontosAtencaoRevisao();


    console.log(

        "REVISÃO v1.5 — núcleo + atenção:",

        {

            nucleos:
                nucleos.length,

            topicos:
                topicos.length

        }

    );

}


/* =====================================================
   FIM EXTENSÃO v1.5
===================================================== */


/* =====================================================
   EXTENSÃO v1.6
   TERMOS TÉCNICOS DA REVISÃO

   Bridge Trainer PSCPP

   Objetivos:

   - extrair termos técnicos da aula original;
   - priorizar termos ligados aos núcleos principais;
   - complementar com termos de outros tópicos relevantes;
   - eliminar duplicações;
   - preservar o texto técnico da aula original;
   - não inventar traduções nem explicações.
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

const REVISAO_MAX_TERMOS_GERAIS =
    20;


// =====================================
// CRIAR REGISTRO DE TERMO
// =====================================

function criarRegistroTermoRevisao(
    topico,
    texto
) {

    if (
        !topico ||
        !texto
    ) {

        return null;

    }


    const termoLimpo =
        limparTextoRevisao(
            texto
        );


    if (!termoLimpo) {

        return null;

    }


    return {

        idTopico:
            topico.id || "",

        tituloTopico:
            topico.titulo ||
            "Terminologia",

        texto:
            termoLimpo,

        importancia:
            Number(
                topico.importancia || 0
            )

    };

}


// =====================================
// COLETAR TERMOS DOS NÚCLEOS
// =====================================

function coletarTermosDosNucleos(
    nucleos
) {

    const resultado =
        [];


    (
        nucleos || []
    ).forEach(
        topico => {

            (
                topico.termos || []
            ).forEach(
                texto => {

                    const registro =
                        criarRegistroTermoRevisao(
                            topico,
                            texto
                        );


                    if (registro) {

                        resultado.push(
                            registro
                        );

                    }

                }
            );

        }
    );


    return resultado;

}


// =====================================
// COLETAR TERMOS COMPLEMENTARES
// =====================================

function coletarTermosComplementares(
    topicos,
    nucleos
) {

    const idsNucleos =
        new Set(

            (
                nucleos || []
            ).map(
                item =>
                    item.id
            )

        );


    const candidatos =
        (
            topicos || []
        )

        .filter(
            topico =>

                !idsNucleos.has(
                    topico.id
                ) &&

                Array.isArray(
                    topico.termos
                ) &&

                topico.termos.length >
                    0

        )

        .sort(
            (
                a,
                b
            ) =>

                Number(
                    b.importancia || 0
                ) -

                Number(
                    a.importancia || 0
                )

        );


    const resultado =
        [];


    candidatos.forEach(
        topico => {

            topico.termos
                .forEach(
                    texto => {

                        const registro =
                            criarRegistroTermoRevisao(
                                topico,
                                texto
                            );


                        if (registro) {

                            resultado.push(
                                registro
                            );

                        }

                    }
                );

        }
    );


    return resultado;

}


// =====================================
// DEDUPLICAR TERMOS
// =====================================

function deduplicarTermosRevisao(
    registros
) {

    const resultado =
        [];


    const vistos =
        new Set();


    (
        registros || []
    ).forEach(
        registro => {

            if (
                !registro ||
                !registro.texto
            ) {

                return;

            }


            const chave =
                normalizarTextoComparacao(
                    registro.texto
                );


            if (
                !chave ||
                vistos.has(
                    chave
                )
            ) {

                return;

            }


            vistos.add(
                chave
            );


            resultado.push(
                registro
            );

        }
    );


    return resultado;

}


// =====================================================
// TERMOS TÉCNICOS
// =====================================================
//
// Extração flexível.
//
// Aceita diferentes estruturas usadas nas aulas:
//
// .termos-tecnicos
// ├── ul > li
// ├── ol > li
// ├── p
// └── elementos textuais internos
//
// Prioridade:
//
// 1. itens <li>
// 2. parágrafos <p>
// 3. texto direto do bloco
//
// Isso permite que aulas antigas e novas
// alimentem automaticamente a revisão.
// =====================================================

function obterTermosTecnicosTopico(
    topico
) {

    const resultados =
        [];


    if (!topico) {

        return resultados;

    }


    const blocos =
        Array.from(

            topico.querySelectorAll(
                ".termos-tecnicos"
            )

        );


    blocos.forEach(
        bloco => {

            // =================================
            // 1. LISTAS
            // =================================

            const itens =
                Array.from(
                    bloco.querySelectorAll(
                        "li"
                    )
                );


            if (
                itens.length >
                0
            ) {

                itens.forEach(
                    item => {

                        const texto =
                            limparTextoRevisao(
                                item.textContent
                            );


                        if (
                            texto.length >
                            2
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );


                return;

            }


            // =================================
            // 2. PARÁGRAFOS
            // =================================

            const paragrafos =
                Array.from(
                    bloco.querySelectorAll(
                        "p"
                    )
                );


            if (
                paragrafos.length >
                0
            ) {

                paragrafos.forEach(
                    paragrafo => {

                        const texto =
                            limparTextoRevisao(
                                paragrafo.textContent
                            );


                        if (
                            texto.length >
                            2
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );


                return;

            }


            // =================================
            // 3. FALLBACK
            // =================================
            //
            // Para blocos antigos que possuam
            // apenas texto ou <strong>.
            // =================================

            const clone =
                bloco.cloneNode(
                    true
                );


            clone
                .querySelectorAll(
                    "h1, h2, h3, h4, h5, h6"
                )
                .forEach(
                    titulo =>
                        titulo.remove()
                );


            const texto =
                limparTextoRevisao(
                    clone.textContent
                );


            if (
                texto.length >
                2
            ) {

                resultados.push(
                    texto
                );

            }

        }
    );


    return deduplicarTextosRevisao(
        resultados
    )

        .slice(
            0,
            REVISAO_MAX_TERMOS
        );

}


// =====================================
// RENDERIZAR TERMOS TÉCNICOS
// =====================================

function renderizarTermosTecnicosRevisao(
    termos
) {

    const container =
        document.getElementById(
            "lista-termos-revisao"
        );


    if (!container) {

        return;

    }


    if (
        !Array.isArray(
            termos
        ) ||
        termos.length ===
            0
    ) {

        container.innerHTML = `

            <p>
                Nenhuma terminologia técnica específica
                foi identificada automaticamente
                nesta aula.
            </p>

        `;


        return;

    }


    container.innerHTML = `

        <p>
            Os termos abaixo foram selecionados
            automaticamente a partir da terminologia
            técnica utilizada na aula original.
        </p>


        <div
        style="
            display:grid;
            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(280px, 1fr)
                );
            gap:14px;
            margin-top:18px;
        "
        >

            ${termos

                .map(
                    termo => `

                    <div
                    class="termos-tecnicos"
                    data-revisao-termo="${
                        escaparHTMLRevisao(
                            termo.idTopico
                        )
                    }"
                    >

                        <p>
                            <strong>
                                ${escaparHTMLRevisao(
                                    termo.texto
                                )}
                            </strong>
                        </p>

                        <p
                        style="
                            margin-top:8px;
                            font-size:0.85rem;
                            opacity:0.75;
                        "
                        >

                            Relacionado a:
                            ${escaparHTMLRevisao(
                                termo.tituloTopico
                            )}

                        </p>

                    </div>

                    `
                )

                .join("")
            }

        </div>

    `;

}


// =====================================
// GERAR CAMADA DE TERMOS
// =====================================

function gerarTermosTecnicosGeraisRevisao() {

    const termos =
        selecionarTermosTecnicosRevisao(

            revisaoAtual
                .topicosAnalisados,

            revisaoAtual
                .nucleosSelecionados

        );


    renderizarTermosTecnicosRevisao(
        termos
    );


    console.log(

        "REVISÃO v1.6 — termos técnicos:",

        termos

    );

}


// =====================================================
// SOBRESCREVER NOVAMENTE A GERAÇÃO DO NÚCLEO
//
// Mantém:
//
// v1.4 → mini-aula conceitual
// v1.5 → pontos de atenção
//
// Acrescenta:
//
// v1.6 → glossário técnico geral
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


    // =================================
    // NÚCLEO CONCEITUAL
    // =================================

    renderizarNucleosConceituais(
        nucleos
    );


    // =================================
    // PONTOS DE ATENÇÃO
    // =================================

    gerarPontosAtencaoRevisao();


    // =================================
    // TERMOS TÉCNICOS
    // =================================

    gerarTermosTecnicosGeraisRevisao();


    console.log(

        "REVISÃO v1.6 — revisão expandida:",

        {

            topicos:
                topicos.length,

            nucleos:
                nucleos.length

        }

    );

}


/* =====================================================
   FIM EXTENSÃO v1.6
===================================================== */
