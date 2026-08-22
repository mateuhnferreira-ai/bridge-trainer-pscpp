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
// SELECIONAR TERMOS TÉCNICOS
// =====================================

function selecionarTermosTecnicosRevisao(
    topicos,
    nucleos
) {

    // Primeiro entram os termos pertencentes
    // aos núcleos conceituais da revisão.

    const principais =
        coletarTermosDosNucleos(
            nucleos
        );


    // Depois acrescentamos termos relevantes
    // dos demais tópicos da aula.

    const complementares =
        coletarTermosComplementares(

            topicos,

            nucleos

        );


    const combinados = [

        ...principais,

        ...complementares

    ];


    return deduplicarTermosRevisao(
        combinados
    )

        .slice(
            0,
            REVISAO_MAX_TERMOS_GERAIS
        );

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


/* =====================================================
   EXTENSÃO v1.7
   QUESTÕES INTERATIVAS DE REVISÃO

   Bridge Trainer PSCPP

   OBJETIVOS:

   - selecionar questões existentes na aula original;
   - distribuir as questões entre diferentes conceitos;
   - evitar concentração excessiva em um único tópico;
   - preservar integralmente:
       .questao
       .alternativa
       data-resposta
       data-topico
       data-edital
       data-bibliografia;
   - reutilizar exercicios.js v3.0;
   - manter correção automática;
   - manter histórico;
   - manter integração com desempenho.

   IMPORTANTE:

   Nenhuma questão nova é inventada.
   A revisão reutiliza questões reais
   existentes na aula original.
===================================================== */


// =====================================================
// CONFIGURAÇÕES
// =====================================================

const REVISAO_MAX_QUESTOES =
    10;


// =====================================================
// NORMALIZAR TÓPICO DA QUESTÃO
// =====================================================

function normalizarTopicoQuestaoRevisao(
    texto
) {

    return normalizarTextoComparacao(
        texto || ""
    );

}


// =====================================================
// EXTRAIR QUESTÕES DA AULA ORIGINAL
// =====================================================

function obterQuestoesOriginaisRevisao(
    documento
) {

    if (!documento) {

        return [];

    }


    return Array.from(
        documento.querySelectorAll(
            ".questao"
        )
    )

        .map(
            (
                questao,
                indice
            ) => {

                const topico =
                    limparTextoRevisao(
                        questao.dataset.topico ||
                        ""
                    );


                const resposta =
                    limparTextoRevisao(

                        questao.dataset.resposta ||

                        questao.dataset
                            .respostaCorreta ||

                        ""

                    );


                const alternativas =
                    questao.querySelectorAll(
                        ".alternativa, .alternativa-questao"
                    );


                return {

                    indice:
                        indice,

                    elemento:
                        questao,

                    id:
                        limparTextoRevisao(

                            questao.dataset
                                .questaoId ||

                            "questao-original-" +
                            (indice + 1)

                        ),

                    topico:
                        topico,

                    topicoNormalizado:
                        normalizarTopicoQuestaoRevisao(
                            topico
                        ),

                    resposta:
                        resposta,

                    valida:
                        Boolean(
                            resposta &&
                            alternativas.length >= 2
                        )

                };

            }
        )

        .filter(
            questao =>
                questao.valida
        );

}


// =====================================================
// CALCULAR RELAÇÃO ENTRE QUESTÃO E NÚCLEO
// =====================================================

function calcularRelacaoQuestaoNucleo(
    questao,
    nucleo
) {

    if (
        !questao ||
        !nucleo
    ) {

        return 0;

    }


    const topicoQuestao =
        questao.topicoNormalizado;


    const tituloNucleo =
        normalizarTextoComparacao(
            nucleo.titulo
        );


    const idNucleo =
        normalizarTextoComparacao(
            nucleo.id
        );


    if (
        !topicoQuestao
    ) {

        return 0;

    }


    // Correspondência direta

    if (
        tituloNucleo &&
        topicoQuestao ===
            tituloNucleo
    ) {

        return 100;

    }


    // ID do núcleo contido no tópico

    if (
        idNucleo &&
        (
            topicoQuestao.includes(
                idNucleo
            ) ||
            idNucleo.includes(
                topicoQuestao
            )
        )
    ) {

        return 80;

    }


    // Título parcialmente correspondente

    if (
        tituloNucleo &&
        (
            topicoQuestao.includes(
                tituloNucleo
            ) ||
            tituloNucleo.includes(
                topicoQuestao
            )
        )
    ) {

        return 70;

    }


    // Comparação por palavras relevantes

    const palavrasQuestao =
        topicoQuestao
            .split(" ")
            .filter(
                palavra =>
                    palavra.length >= 4
            );


    const palavrasNucleo =
        tituloNucleo
            .split(" ")
            .filter(
                palavra =>
                    palavra.length >= 4
            );


    let coincidencias =
        0;


    palavrasQuestao.forEach(
        palavra => {

            if (
                palavrasNucleo.includes(
                    palavra
                )
            ) {

                coincidencias++;

            }

        }
    );


    return coincidencias * 10;

}


// =====================================================
// SELECIONAR QUESTÕES PARA OS NÚCLEOS
// =====================================================

function selecionarQuestoesDosNucleos(
    questoes,
    nucleos
) {

    const selecionadas =
        [];


    const idsUsados =
        new Set();


    (
        nucleos || []
    ).forEach(
        nucleo => {

            let melhor =
                null;


            let melhorPontuacao =
                0;


            questoes.forEach(
                questao => {

                    if (
                        idsUsados.has(
                            questao.id
                        )
                    ) {

                        return;

                    }


                    const pontuacao =
                        calcularRelacaoQuestaoNucleo(

                            questao,

                            nucleo

                        );


                    if (
                        pontuacao >
                        melhorPontuacao
                    ) {

                        melhorPontuacao =
                            pontuacao;


                        melhor =
                            questao;

                    }

                }
            );


            if (
                melhor &&
                melhorPontuacao > 0
            ) {

                selecionadas.push(
                    melhor
                );


                idsUsados.add(
                    melhor.id
                );

            }

        }
    );


    return {

        selecionadas:
            selecionadas,

        idsUsados:
            idsUsados

    };

}


// =====================================================
// COMPLETAR QUESTÕES DE FORMA DIVERSIFICADA
// =====================================================

function completarQuestoesRevisao(
    questoes,
    selecionadas,
    idsUsados
) {

    const topicosUsados =
        new Set(

            selecionadas.map(
                questao =>
                    questao.topicoNormalizado
            )

        );


    // =================================
    // PRIMEIRO:
    // priorizar tópicos ainda não usados
    // =================================

    for (
        const questao of questoes
    ) {

        if (
            selecionadas.length >=
            REVISAO_MAX_QUESTOES
        ) {

            break;

        }


        if (
            idsUsados.has(
                questao.id
            )
        ) {

            continue;

        }


        if (
            topicosUsados.has(
                questao.topicoNormalizado
            )
        ) {

            continue;

        }


        selecionadas.push(
            questao
        );


        idsUsados.add(
            questao.id
        );


        topicosUsados.add(
            questao.topicoNormalizado
        );

    }


    // =================================
    // SEGUNDO:
    // completar caso ainda faltem
    // questões
    // =================================

    for (
        const questao of questoes
    ) {

        if (
            selecionadas.length >=
            REVISAO_MAX_QUESTOES
        ) {

            break;

        }


        if (
            idsUsados.has(
                questao.id
            )
        ) {

            continue;

        }


        selecionadas.push(
            questao
        );


        idsUsados.add(
            questao.id
        );

    }


    return selecionadas;

}


// =====================================================
// SELEÇÃO FINAL
// =====================================================

function selecionarQuestoesRevisao(
    documento,
    nucleos
) {

    const questoes =
        obterQuestoesOriginaisRevisao(
            documento
        );


    if (
        questoes.length === 0
    ) {

        return [];

    }


    const selecaoInicial =
        selecionarQuestoesDosNucleos(

            questoes,

            nucleos

        );


    return completarQuestoesRevisao(

        questoes,

        selecaoInicial.selecionadas,

        selecaoInicial.idsUsados

    )

        .slice(
            0,
            REVISAO_MAX_QUESTOES
        );

}


// =====================================================
// LOCALIZAR ÁREA DE QUESTÕES
// =====================================================
//
// Primeiro procura um ID específico.
//
// Caso o aula.html antigo ainda não tenha
// esse ID, procura automaticamente a seção
// cujo título contém "Questões de revisão".
//
// Assim não precisamos alterar agora
// todas as versões do template.
// =====================================================

function obterContainerQuestoesRevisao() {

    let container =
        document.getElementById(
            "lista-questoes-revisao"
        );


    if (container) {

        return container;

    }


    const titulos =
        Array.from(
            document.querySelectorAll(
                "h2"
            )
        );


    const tituloQuestoes =
        titulos.find(
            titulo => {

                const texto =
                    normalizarTextoComparacao(
                        titulo.textContent
                    );


                return (

                    texto.includes(
                        "questoes de revisao"
                    )

                );

            }
        );


    if (!tituloQuestoes) {

        return null;

    }


    const section =
        tituloQuestoes.closest(
            "section"
        );


    if (!section) {

        return null;

    }


    container =
        section.querySelector(
            ".widget"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.className =
            "widget";


        section.appendChild(
            container
        );

    }


    container.id =
        "lista-questoes-revisao";


    return container;

}


// =====================================================
// PREPARAR CLONE DA QUESTÃO
// =====================================================

function prepararCloneQuestaoRevisao(
    registro,
    numero
) {

    const clone =
        registro.elemento.cloneNode(
            true
        );


    // =================================
    // NOVO ID PARA A REVISÃO
    //
    // Evita conflito caso no futuro
    // aula original e revisão coexistam.
    // =================================

    clone.dataset.questaoId =

        "revisao-" +

        revisaoAtual.aula +

        "-" +

        registro.id;


    // =================================
    // REMOVER ESTADOS VISUAIS
    // =================================

    clone.classList.remove(

        "questao-respondida",

        "questao-correta",

        "questao-incorreta"

    );


    delete clone.dataset.respondida;

    delete clone.dataset.resultado;

    delete clone.dataset.respostaSelecionada;


    clone
        .querySelectorAll(
            ".alternativa, .alternativa-questao"
        )
        .forEach(
            alternativa => {

                alternativa.classList.remove(

                    "alternativa-selecionada",

                    "alternativa-correta",

                    "alternativa-incorreta"

                );


                alternativa.disabled =
                    false;


                alternativa.removeAttribute(
                    "aria-pressed"
                );


                delete alternativa.dataset
                    .exercicioPreparado;

            }
        );


    // =================================
    // RENÚMERAR TÍTULO VISUAL
    // =================================

    const titulo =
        clone.querySelector(
            "h3"
        );


    if (titulo) {

        titulo.textContent =
            "Questão " +
            numero;

    }


    return clone;

}


// =====================================================
// CRIAR CONTROLES DOS EXERCÍCIOS
// =====================================================

function criarControlesQuestoesRevisao(
    container,
    total
) {

    const controle =
        document.createElement(
            "div"
        );


    controle.className =
        "widget";


    controle.innerHTML = `

        <h3>
            📋 Progresso das questões
        </h3>

        <p id="resumo-selecao-exercicios">

            0 de ${total}
            questões respondidas

        </p>

        <button
            type="button"
            id="botao-corrigir-exercicios"
            class="botao-estudo"
        >
            ✅ Corrigir Exercício
        </button>

    `;


    container.appendChild(
        controle
    );


    const resultado =
        document.createElement(
            "div"
        );


    resultado.id =
        "resultado-exercicios";


    resultado.className =
        "widget";


    resultado.style.display =
        "none";


    resultado.innerHTML = `

        <h3>
            📊 Resultado da tentativa
        </h3>

        <p id="texto-resultado-exercicios">
        </p>

    `;


    container.appendChild(
        resultado
    );

}


// =====================================================
// RENDERIZAR QUESTÕES
// =====================================================

function renderizarQuestoesRevisao(
    questoes
) {

    const container =
        obterContainerQuestoesRevisao();


    if (!container) {

        console.warn(
            "Área de questões de revisão não encontrada."
        );


        return;

    }


    container.innerHTML =
        "";


    if (
        !Array.isArray(
            questoes
        ) ||
        questoes.length ===
            0
    ) {

        container.innerHTML = `

            <p>
                Nenhuma questão válida foi encontrada
                na aula original.
            </p>

        `;


        return;

    }


    const introducao =
        document.createElement(
            "p"
        );


    introducao.textContent =

        questoes.length +

        " questões foram selecionadas " +

        "automaticamente para revisar " +

        "diferentes conceitos desta aula.";


    container.appendChild(
        introducao
    );


    questoes.forEach(
        (
            registro,
            indice
        ) => {

            const clone =
                prepararCloneQuestaoRevisao(

                    registro,

                    indice + 1

                );


            container.appendChild(
                clone
            );

        }
    );


    criarControlesQuestoesRevisao(

        container,

        questoes.length

    );

}


// =====================================================
// PREPARAR EXERCICIOS.JS PARA A REVISÃO
// =====================================================

function inicializarQuestoesInterativasRevisao() {

    // =================================
    // IDENTIDADE PARA O HISTÓRICO
    //
    // Mantemos disciplina e aula originais.
    //
    // Assim o desempenho da revisão
    // reforça os dados daquele mesmo assunto.
    //
    // A URL continua diferente e permite
    // distinguir a página de revisão
    // pelo campo "pagina".
    // =================================

    document.body.dataset.disciplina =
        revisaoAtual.disciplina;


    document.body.dataset.aula =
        revisaoAtual.aula;


    // =================================
    // LIMPAR ESTADO GLOBAL DO
    // exercicios.js
    //
    // Como a página inicialmente não
    // tinha questões, agora precisamos
    // garantir uma tentativa nova.
    // =================================

    if (
        typeof limparRespostasExerciciosPSCPP ===
        "function"
    ) {

        limparRespostasExerciciosPSCPP();

    }


    // =================================
    // ATIVAR O MESMO MOTOR DAS AULAS
    // =================================

    if (
        typeof inicializarExerciciosPSCPP ===
        "function"
    ) {

        inicializarExerciciosPSCPP();

    }
    else {

        console.warn(
            "exercicios.js não está disponível na página de revisão."
        );

    }

}


// =====================================================
// GERAR QUESTÕES DA REVISÃO
// =====================================================

function gerarQuestoesInterativasRevisao() {

    const documento =
        revisaoAtual
            .documentoAulaOriginal;


    const nucleos =
        revisaoAtual
            .nucleosSelecionados;


    if (!documento) {

        return;

    }


    const questoes =
        selecionarQuestoesRevisao(

            documento,

            nucleos

        );


    renderizarQuestoesRevisao(
        questoes
    );


    inicializarQuestoesInterativasRevisao();


    console.log(

        "REVISÃO v1.7 — questões selecionadas:",

        questoes.map(
            questao => ({

                id:
                    questao.id,

                topico:
                    questao.topico

            })
        )

    );

}


// =====================================================
// SOBRESCREVER GERAÇÃO PRINCIPAL
//
// Mantém:
//
// v1.4 → núcleos conceituais
// v1.5 → pontos de atenção
// v1.6 → termos técnicos
//
// Acrescenta:
//
// v1.7 → questões interativas
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


    // =================================
    // QUESTÕES INTERATIVAS
    // =================================

    gerarQuestoesInterativasRevisao();


    console.log(
        "REVISÃO PSCPP v1.7 carregada."
    );

}


/* =====================================================
   FIM EXTENSÃO v1.7
===================================================== */
/* =====================================================
   EXTENSÃO v1.8
   GABARITO COMENTADO AUTOMÁTICO

   Bridge Trainer PSCPP

   OBJETIVO:

   - localizar o gabarito comentado da aula original;
   - identificar cada comentário pelo número da questão;
   - mostrar somente os comentários correspondentes
     às questões selecionadas para a revisão;
   - manter o botão Mostrar / Ocultar;
   - não criar explicações novas;
   - preservar o conteúdo da aula original.
===================================================== */


// =====================================================
// ESTADO DAS QUESTÕES DA REVISÃO
// =====================================================

revisaoAtual.questoesSelecionadas =
    [];


// =====================================================
// LOCALIZAR SEÇÃO DE GABARITO ORIGINAL
// =====================================================

function localizarSecaoGabaritoOriginal(
    documento
) {

    if (!documento) {

        return null;

    }


    const titulos =
        Array.from(
            documento.querySelectorAll(
                "h2"
            )
        );


    const tituloGabarito =
        titulos.find(
            titulo => {

                const texto =
                    normalizarTextoComparacao(
                        titulo.textContent
                    );


                return (
                    texto.includes(
                        "gabarito comentado"
                    )
                );

            }
        );


    if (!tituloGabarito) {

        return null;

    }


    return tituloGabarito.closest(
        "section"
    );

}


// =====================================================
// EXTRAIR NÚMERO DO GABARITO
// =====================================================

function obterNumeroQuestaoGabarito(
    titulo
) {

    const texto =
        limparTextoRevisao(
            titulo
        );


    const resultado =
        texto.match(
            /quest[aã]o\s+(\d+)/i
        );


    if (!resultado) {

        return null;

    }


    return Number(
        resultado[1]
    );

}


// =====================================================
// EXTRAIR GABARITOS DA AULA
// =====================================================

function extrairGabaritosOriginais(
    documento
) {

    const secao =
        localizarSecaoGabaritoOriginal(
            documento
        );


    if (!secao) {

        return [];

    }


    const titulos =
        Array.from(
            secao.querySelectorAll(
                "h3"
            )
        );


    const gabaritos =
        [];


    titulos.forEach(
        titulo => {

            const numero =
                obterNumeroQuestaoGabarito(
                    titulo.textContent
                );


            if (!numero) {

                return;

            }


            const elementos =
                [];


            let atual =
                titulo.nextElementSibling;


            while (atual) {

                // Para no próximo gabarito.

                if (
                    atual.tagName === "H3" &&
                    obterNumeroQuestaoGabarito(
                        atual.textContent
                    )
                ) {

                    break;

                }


                // HR costuma separar as questões,
                // mas não encerra obrigatoriamente
                // a leitura se houver outro conteúdo.

                if (
                    atual.tagName === "HR"
                ) {

                    const proximo =
                        atual.nextElementSibling;


                    if (
                        proximo &&
                        proximo.tagName === "H3" &&
                        obterNumeroQuestaoGabarito(
                            proximo.textContent
                        )
                    ) {

                        break;

                    }

                }


                elementos.push(
                    atual.cloneNode(
                        true
                    )
                );


                atual =
                    atual.nextElementSibling;

            }


            gabaritos.push({

                numero:
                    numero,

                titulo:
                    limparTextoRevisao(
                        titulo.textContent
                    ),

                elementos:
                    elementos

            });

        }
    );


    return gabaritos;

}


// =====================================================
// RENDERIZAR GABARITO SELECIONADO
// =====================================================

function renderizarGabaritoRevisao(
    questoesSelecionadas
) {

    const container =
        document.getElementById(
            "gabarito-revisao"
        );


    if (!container) {

        return;

    }


    const documento =
        revisaoAtual
            .documentoAulaOriginal;


    const gabaritos =
        extrairGabaritosOriginais(
            documento
        );


    if (
        gabaritos.length === 0
    ) {

        container.innerHTML = `

            <p>
                A aula original não possui
                gabarito comentado identificável.
            </p>

        `;


        return;

    }


    container.innerHTML =
        "";


    questoesSelecionadas.forEach(
        (
            questao,
            indiceRevisao
        ) => {

            // O índice original começa em zero.
            // O número da questão começa em um.

            const numeroOriginal =
                questao.indice + 1;


            const gabarito =
                gabaritos.find(
                    item =>
                        item.numero ===
                        numeroOriginal
                );


            if (!gabarito) {

                return;

            }


            const bloco =
                document.createElement(
                    "div"
                );


            bloco.className =
                "gabarito-item-revisao";


            const titulo =
                document.createElement(
                    "h3"
                );


            titulo.textContent =

                "Questão " +

                (indiceRevisao + 1) +

                " — comentário";


            bloco.appendChild(
                titulo
            );


            gabarito.elementos
                .forEach(
                    elemento => {

                        bloco.appendChild(
                            elemento.cloneNode(
                                true
                            )
                        );

                    }
                );


            const separador =
                document.createElement(
                    "hr"
                );


            bloco.appendChild(
                separador
            );


            container.appendChild(
                bloco
            );

        }
    );


    if (
        container.children.length ===
        0
    ) {

        container.innerHTML = `

            <p>
                Não foi possível relacionar
                as questões selecionadas aos
                comentários da aula original.
            </p>

        `;

    }

}


// =====================================================
// BOTÃO MOSTRAR / OCULTAR
// =====================================================

function prepararBotaoGabaritoRevisao() {

    const botao =
        document.getElementById(
            "botao-gabarito-revisao"
        );


    const gabarito =
        document.getElementById(
            "gabarito-revisao"
        );


    if (
        !botao ||
        !gabarito
    ) {

        return;

    }


    if (
        botao.dataset
            .gabaritoPreparado ===
        "true"
    ) {

        return;

    }


    botao.addEventListener(

        "click",

        function () {

            const oculto =

                gabarito.style.display ===
                    "none" ||

                window
                    .getComputedStyle(
                        gabarito
                    )
                    .display ===
                    "none";


            gabarito.style.display =

                oculto
                    ? "block"
                    : "none";

        }

    );


    botao.dataset
        .gabaritoPreparado =
        "true";

}


// =====================================================
// GERAR GABARITO DA REVISÃO
// =====================================================

function gerarGabaritoComentadoRevisao() {

    renderizarGabaritoRevisao(

        revisaoAtual
            .questoesSelecionadas

    );


    prepararBotaoGabaritoRevisao();


    console.log(

        "REVISÃO v1.8 — gabarito carregado.",

        revisaoAtual
            .questoesSelecionadas
            .length,

        "questões."

    );

}


// =====================================================
// SOBRESCREVER GERAÇÃO DAS QUESTÕES
//
// Mantemos toda a seleção da v1.7.
//
// Apenas guardamos quais questões foram
// escolhidas para que a v1.8 possa localizar
// seus comentários.
// =====================================================

function gerarQuestoesInterativasRevisao() {

    const documento =
        revisaoAtual
            .documentoAulaOriginal;


    const nucleos =
        revisaoAtual
            .nucleosSelecionados;


    if (!documento) {

        return;

    }


    const questoes =
        selecionarQuestoesRevisao(

            documento,

            nucleos

        );


    revisaoAtual
        .questoesSelecionadas =
        questoes;


    renderizarQuestoesRevisao(
        questoes
    );


    inicializarQuestoesInterativasRevisao();


    // =================================
    // GABARITO COMENTADO
    // =================================

    gerarGabaritoComentadoRevisao();


    console.log(

        "REVISÃO v1.8 — questões + gabarito:",

        questoes.map(
            questao => ({

                original:
                    questao.indice + 1,

                topico:
                    questao.topico

            })
        )

    );

}


/* =====================================================
   FIM EXTENSÃO v1.8
===================================================== */
/* =====================================================
   CORREÇÃO v1.8.1
   GABARITO COMENTADO DA REVISÃO

   Compatível com o padrão real das aulas:

   <section ... hidden>
       <h2>Gabarito comentado</h2>

       <h3>Questão 1 — C</h3>
       <p>Comentário...</p>

       <h3>Questão 2 — D</h3>
       <p>Comentário...</p>
   </section>
===================================================== */


// =====================================================
// LOCALIZAR GABARITO ORIGINAL
// =====================================================

function localizarSecaoGabaritoOriginal(
    documento
) {

    if (!documento) {

        return null;

    }


    // Primeiro procura qualquer section
    // contendo um H2 de Gabarito Comentado.

    const secoes =
        Array.from(
            documento.querySelectorAll(
                "section"
            )
        );


    return secoes.find(
        secao => {

            const titulo =
                secao.querySelector(
                    "h2"
                );


            if (!titulo) {

                return false;

            }


            const texto =
                normalizarTextoComparacao(
                    titulo.textContent
                );


            return texto.includes(
                "gabarito comentado"
            );

        }
    ) || null;

}


// =====================================================
// NÚMERO DA QUESTÃO
// =====================================================

function obterNumeroQuestaoGabarito(
    texto
) {

    const limpo =
        limparTextoRevisao(
            texto
        );


    const correspondencia =
        limpo.match(
            /Quest[aã]o\s+(\d+)/i
        );


    if (!correspondencia) {

        return null;

    }


    return Number(
        correspondencia[1]
    );

}


// =====================================================
// EXTRAIR RESPOSTA CORRETA DO TÍTULO
// =====================================================

function obterRespostaTituloGabarito(
    texto
) {

    const limpo =
        limparTextoRevisao(
            texto
        );


    const correspondencia =
        limpo.match(
            /Quest[aã]o\s+\d+\s*[—\-–]\s*([A-E])/i
        );


    return correspondencia
        ? correspondencia[1].toUpperCase()
        : "";

}


// =====================================================
// EXTRAIR GABARITOS
// =====================================================

function extrairGabaritosOriginais(
    documento
) {

    const secao =
        localizarSecaoGabaritoOriginal(
            documento
        );


    if (!secao) {

        console.warn(
            "Revisão: seção de gabarito original não localizada."
        );


        return [];

    }


    const titulos =
        Array.from(
            secao.querySelectorAll(
                "h3"
            )
        );


    const resultado =
        [];


    titulos.forEach(
        titulo => {

            const numero =
                obterNumeroQuestaoGabarito(
                    titulo.textContent
                );


            if (!numero) {

                return;

            }


            const resposta =
                obterRespostaTituloGabarito(
                    titulo.textContent
                );


            const elementos =
                [];


            let atual =
                titulo.nextElementSibling;


            while (atual) {

                // Encontrou a próxima questão:
                // encerra o comentário atual.

                if (
                    atual.tagName === "H3" &&
                    obterNumeroQuestaoGabarito(
                        atual.textContent
                    )
                ) {

                    break;

                }


                elementos.push(
                    atual.cloneNode(
                        true
                    )
                );


                atual =
                    atual.nextElementSibling;

            }


            resultado.push({

                numero:
                    numero,

                resposta:
                    resposta,

                titulo:
                    limparTextoRevisao(
                        titulo.textContent
                    ),

                elementos:
                    elementos

            });

        }
    );


    console.log(
        "Revisão — gabaritos encontrados:",
        resultado.length,
        resultado
    );


    return resultado;

}


// =====================================================
// RENDERIZAR GABARITO DA REVISÃO
// =====================================================

function renderizarGabaritoRevisao(
    questoesSelecionadas
) {

    const container =
        document.getElementById(
            "gabarito-revisao"
        );


    if (!container) {

        console.warn(
            "Revisão: container #gabarito-revisao não existe."
        );


        return;

    }


    const documento =
        revisaoAtual
            .documentoAulaOriginal;


    const gabaritos =
        extrairGabaritosOriginais(
            documento
        );


    container.innerHTML =
        "";


    if (
        !Array.isArray(
            questoesSelecionadas
        ) ||
        questoesSelecionadas.length === 0
    ) {

        container.innerHTML = `

            <p>
                Nenhuma questão foi selecionada
                para esta revisão.
            </p>

        `;


        return;

    }


    let totalEncontrados =
        0;


    questoesSelecionadas.forEach(
        (
            questao,
            indiceRevisao
        ) => {

            // A propriedade indice vem da posição
            // original da questão na aula.

            const numeroOriginal =
                Number(
                    questao.indice
                ) + 1;


            const gabarito =
                gabaritos.find(
                    item =>
                        item.numero ===
                        numeroOriginal
                );


            if (!gabarito) {

                console.warn(
                    "Gabarito não encontrado para questão original:",
                    numeroOriginal
                );


                return;

            }


            totalEncontrados++;


            const bloco =
                document.createElement(
                    "div"
                );


            bloco.className =
                "widget gabarito-item-revisao";


            // =================================
            // TÍTULO
            // =================================

            const titulo =
                document.createElement(
                    "h3"
                );


            titulo.textContent =

                "Questão " +

                (indiceRevisao + 1) +

                " — Alternativa " +

                (
                    gabarito.resposta ||
                    "—"
                );


            bloco.appendChild(
                titulo
            );


            // =================================
            // COMENTÁRIO ORIGINAL
            // =================================

            gabarito.elementos.forEach(
                elemento => {

                    bloco.appendChild(
                        elemento.cloneNode(
                            true
                        )
                    );

                }
            );


            // =================================
            // REFERÊNCIA DA QUESTÃO ORIGINAL
            // =================================

            const referencia =
                document.createElement(
                    "p"
                );


            referencia.style.fontSize =
                "0.85rem";


            referencia.style.opacity =
                "0.7";


            referencia.textContent =

                "Questão original " +

                numeroOriginal +

                " da aula.";


            bloco.appendChild(
                referencia
            );


            container.appendChild(
                bloco
            );

        }
    );


    if (
        totalEncontrados === 0
    ) {

        container.innerHTML = `

            <p>
                Não foi possível relacionar
                as questões da revisão aos
                comentários da aula original.
            </p>

        `;

    }

}


// =====================================================
// MOSTRAR / OCULTAR
// =====================================================

function prepararBotaoGabaritoRevisao() {

    const botao =
        document.getElementById(
            "botao-gabarito-revisao"
        );


    const container =
        document.getElementById(
            "gabarito-revisao"
        );


    if (
        !botao ||
        !container
    ) {

        return;

    }


    // Remove qualquer configuração anterior
    // simplesmente substituindo onclick.

    botao.onclick =
        function () {

            const estaOculto =

                container.style.display ===
                    "none" ||

                container.style.display ===
                    "";


            container.style.display =

                estaOculto
                    ? "block"
                    : "none";


            botao.textContent =

                estaOculto
                    ? "Ocultar Gabarito"
                    : "Mostrar Gabarito";

        };


    botao.textContent =
        "Mostrar Gabarito";

}


// =====================================================
// GERAR GABARITO
// =====================================================

function gerarGabaritoComentadoRevisao() {

    renderizarGabaritoRevisao(

        revisaoAtual
            .questoesSelecionadas

    );


    prepararBotaoGabaritoRevisao();


    console.log(
        "REVISÃO v1.8.1 — gabarito preparado."
    );

}


// =====================================================
// FIM CORREÇÃO v1.8.1
// =====================================================



/* =====================================================
   DEBUG VISUAL DO GABARITO
===================================================== */

function mostrarDiagnosticoGabaritoRevisao() {

    const container =
        document.getElementById(
            "gabarito-revisao"
        );

    if (!container) {
        return;
    }


    const documento =
        revisaoAtual
            .documentoAulaOriginal;


    const questoes =
        revisaoAtual
            .questoesSelecionadas || [];


    let secao = null;

    let gabaritos = [];


    try {

        secao =
            localizarSecaoGabaritoOriginal(
                documento
            );

    }
    catch (erro) {

        console.error(
            "Erro ao localizar seção do gabarito:",
            erro
        );

    }


    try {

        gabaritos =
            extrairGabaritosOriginais(
                documento
            ) || [];

    }
    catch (erro) {

        console.error(
            "Erro ao extrair gabaritos:",
            erro
        );

    }


    container.style.display =
        "block";


    container.innerHTML = `

        <div class="widget">

            <h3>
                🔧 Diagnóstico do gabarito
            </h3>

            <p>
                <strong>
                    Questões selecionadas:
                </strong>
                ${questoes.length}
            </p>

            <p>
                <strong>
                    Seção de gabarito encontrada:
                </strong>
                ${secao ? "SIM" : "NÃO"}
            </p>

            <p>
                <strong>
                    Comentários encontrados:
                </strong>
                ${gabaritos.length}
            </p>

        </div>

    `;

}


document.addEventListener(

    "DOMContentLoaded",

    function () {

        setTimeout(
            mostrarDiagnosticoGabaritoRevisao,
            1500
        );

    }

);
