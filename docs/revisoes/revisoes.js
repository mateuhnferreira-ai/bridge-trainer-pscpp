// =====================================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
//
// Base funcional:
//
// v1.4 → revisão conceitual
// v1.5 → pontos de atenção
// v1.6 → termos técnicos
// v1.7 → questões interativas
// v1.8 → gabarito comentado
// v1.9 → conclusão e agendamento
//
// PADRONIZAÇÃO DE CAMINHOS:
//
// A identificação lógica permanece:
//
// disciplina.id + modulo.id
//
// O caminho físico passa a ser obtido de:
//
// disciplinas.json
//
// Portanto:
//
// ID lógico ≠ obrigatoriamente nome do arquivo.
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

    nucleosSelecionados: [],

    questoesSelecionadas: []

};


// =====================================================
// CATÁLOGO FÍSICO DAS DISCIPLINAS
// =====================================================
//
// Fonte única para localizar:
//
// - pasta física da disciplina;
// - arquivo físico da aula.
//
// Os parâmetros da revisão continuam usando
// os IDs lógicos oficiais.

let catalogoDisciplinasRevisao =
    null;


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
                    alvo.length > 35 &&
                    base.includes(
                        alvo
                    )
                ) ||

                (
                    base.length > 35 &&
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
// CARREGAR CATÁLOGO DE DISCIPLINAS
// =====================================================

async function carregarCatalogoDisciplinasRevisao() {

    if (
        catalogoDisciplinasRevisao
    ) {

        return catalogoDisciplinasRevisao;

    }


    const caminhoCatalogo =
        "../data/disciplinas.json";


    try {

        const resposta =
            await fetch(
                caminhoCatalogo,
                {
                    cache: "no-store"
                }
            );


        if (
            !resposta.ok
        ) {

            throw new Error(

                "disciplinas.json não foi encontrado. " +
                "HTTP " +
                resposta.status +
                " — " +
                resposta.url

            );

        }


        let catalogo;


        try {

            catalogo =
                await resposta.json();

        }
        catch (erroJSON) {

            throw new Error(

                "disciplinas.json foi localizado, " +
                "mas contém JSON inválido. " +
                erroJSON.message

            );

        }


        if (
            !catalogo ||
            !Array.isArray(
                catalogo.disciplinas
            )
        ) {

            throw new Error(

                "disciplinas.json foi carregado, " +
                "mas não possui a estrutura esperada: " +
                "catalogo.disciplinas."

            );

        }


        catalogoDisciplinasRevisao =
            catalogo;


        console.log(

            "Revisão: catálogo carregado com sucesso.",

            catalogoDisciplinasRevisao
                .disciplinas
                .length,

            "disciplinas."

        );


        return catalogoDisciplinasRevisao;

    }
    catch (erro) {

        console.error(
            "Revisão: erro ao carregar disciplinas.json:",
            erro
        );


        atualizarHTMLRevisao(

            "painel-foco-revisao",

            `

            <p>
                <strong>
                    ⚠ Erro ao carregar o catálogo.
                </strong>
            </p>

            <p>
                ${escaparHTMLRevisao(
                    erro.message
                )}
            </p>

            `

        );


        return null;

    }

}


// =====================================================
// OBTER DISCIPLINA NO CATÁLOGO
// =====================================================

function obterDisciplinaCatalogoRevisao(
    idDisciplina
) {

    if (
        !catalogoDisciplinasRevisao ||
        !Array.isArray(
            catalogoDisciplinasRevisao.disciplinas
        )
    ) {

        return null;

    }


    return (
        catalogoDisciplinasRevisao
            .disciplinas
            .find(

                disciplina =>
                    disciplina.id ===
                    idDisciplina

            ) ||
        null
    );

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


    const dadosDisciplina =
        obterDisciplinaCatalogoRevisao(
            disciplina
        );


    if (!dadosDisciplina) {

        console.error(
            "Revisão: disciplina não encontrada no catálogo:",
            disciplina
        );


        return null;

    }


    const modulos =
        Array.isArray(
            dadosDisciplina.modulos
        )
            ? dadosDisciplina.modulos
            : [];


    const modulo =
        modulos.find(

            item =>
                item.id ===
                aula

        );


    if (!modulo) {

        console.error(
            "Revisão: aula não encontrada no catálogo:",
            disciplina,
            aula
        );


        return null;

    }


    if (
        !dadosDisciplina.pasta ||
        !modulo.arquivo
    ) {

        console.error(
            "Revisão: pasta ou arquivo físico não definido:",
            disciplina,
            aula
        );


        return null;

    }


    return (

        "../disciplinas/" +
        dadosDisciplina.pasta +
        "/" +
        modulo.arquivo

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
        valor.length > 180
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
                texto.length < 25 ||
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
                            texto.length < 15 ||
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
                textosLimpos.length > 0
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
                    texto.length < 35 ||
                    texto.length > 550 ||
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
                                        texto.length > 25 &&
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
                                texto.length > 25 &&
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
                    texto.length > 15 &&
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

            const itens =
                Array.from(
                    bloco.querySelectorAll(
                        "li"
                    )
                );


            if (
                itens.length > 0
            ) {

                itens.forEach(
                    item => {

                        const texto =
                            limparTextoRevisao(
                                item.textContent
                            );


                        if (
                            texto.length > 2
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );


                return;

            }


            const paragrafos =
                Array.from(
                    bloco.querySelectorAll(
                        "p"
                    )
                );


            if (
                paragrafos.length > 0
            ) {

                paragrafos.forEach(
                    paragrafo => {

                        const texto =
                            limparTextoRevisao(
                                paragrafo.textContent
                            );


                        if (
                            texto.length > 2
                        ) {

                            resultados.push(
                                texto
                            );

                        }

                    }
                );


                return;

            }


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
                texto.length > 2
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
        formulas.length > 0
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
                    item.conceito.length > 0 ||

                    item.destaques.length > 0 ||

                    item.formulas.length > 0
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
        topicos.length === 0
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
            candidatos.length > 0
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
        destaques.length === 0
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
        formulas.length === 0
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
        textos.length === 0
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
        textos.length === 0
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
        textos.length === 0
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
        termos.length === 0
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
        nucleos.length === 0
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
                        nucleo.conceito.length > 0
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
// PONTOS DE ATENÇÃO GERAIS
// =====================================================

const REVISAO_MAX_PONTOS_ATENCAO_GERAL =
    10;


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

                topico.atencoes.length > 0

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


function selecionarPontosAtencaoRevisao(
    topicos,
    nucleos
) {

    const principais =
        coletarAtencoesDosNucleos(
            nucleos
        );


    const complementares =
        coletarAtencoesComplementares(

            topicos,

            nucleos

        );


    return deduplicarPontosAtencaoRevisao(

        [

            ...principais,

            ...complementares

        ]

    )

        .slice(
            0,
            REVISAO_MAX_PONTOS_ATENCAO_GERAL
        );

}


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
        pontos.length === 0
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

}


// =====================================================
// TERMOS TÉCNICOS GERAIS
// =====================================================

const REVISAO_MAX_TERMOS_GERAIS =
    20;


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

                topico.termos.length > 0

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


function selecionarTermosTecnicosRevisao(
    topicos,
    nucleos
) {

    const principais =
        coletarTermosDosNucleos(
            nucleos
        );


    const complementares =
        coletarTermosComplementares(

            topicos,

            nucleos

        );


    return deduplicarTermosRevisao(

        [

            ...principais,

            ...complementares

        ]

    )

        .slice(
            0,
            REVISAO_MAX_TERMOS_GERAIS
        );

}


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
        termos.length === 0
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

}


// =====================================================
// QUESTÕES INTERATIVAS
// =====================================================

const REVISAO_MAX_QUESTOES =
    10;


function normalizarTopicoQuestaoRevisao(
    texto
) {

    return normalizarTextoComparacao(
        texto || ""
    );

}


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


    if (!topicoQuestao) {

        return 0;

    }


    if (
        tituloNucleo &&
        topicoQuestao === tituloNucleo
    ) {

        return 100;

    }


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


                return texto.includes(
                    "questoes de revisao"
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


function prepararCloneQuestaoRevisao(
    registro,
    numero
) {

    const clone =
        registro.elemento.cloneNode(
            true
        );


    clone.dataset.questaoId =

        "revisao-" +

        revisaoAtual.aula +

        "-" +

        registro.id;


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
        questoes.length === 0
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


function inicializarQuestoesInterativasRevisao() {

    document.body.dataset.disciplina =
        revisaoAtual.disciplina;


    document.body.dataset.aula =
        revisaoAtual.aula;


    if (
        typeof limparRespostasExerciciosPSCPP ===
        "function"
    ) {

        limparRespostasExerciciosPSCPP();

    }


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
// GABARITO COMENTADO
// =====================================================

function analisarTituloQuestaoGabarito(
    texto
) {

    const limpo =
        limparTextoRevisao(
            texto
        );


    if (!limpo) {

        return null;

    }


    const resultado =
        limpo.match(
            /quest(?:ã|a)o\s*(\d+)\s*[—–-]?\s*(?:alternativa\s*)?([A-E])?/i
        );


    if (!resultado) {

        return null;

    }


    return {

        numero:
            Number(
                resultado[1]
            ),

        resposta:
            resultado[2]
                ? resultado[2]
                    .toUpperCase()
                : ""

    };

}


function localizarSecaoGabaritoOriginal(
    documento
) {

    if (!documento) {

        return null;

    }


    const porId =
        Array.from(
            documento.querySelectorAll(
                "section[id]"
            )
        )
        .find(
            secao => {

                const id =
                    normalizarTextoComparacao(
                        secao.id
                    );


                return id.includes(
                    "gabarito"
                );

            }
        );


    if (porId) {

        return porId;

    }


    const secoes =
        Array.from(
            documento.querySelectorAll(
                "section"
            )
        );


    const porTitulo =
        secoes.find(
            secao => {

                const titulo =
                    secao.querySelector(
                        ":scope h2"
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
        );


    if (porTitulo) {

        return porTitulo;

    }


    console.warn(
        "Revisão: seção real de gabarito não localizada."
    );


    return null;

}


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


    const resultado =
        [];


    titulos.forEach(
        titulo => {

            const dadosTitulo =
                analisarTituloQuestaoGabarito(
                    titulo.textContent
                );


            if (!dadosTitulo) {

                return;

            }


            const elementos =
                [];


            let atual =
                titulo.nextElementSibling;


            while (atual) {

                if (
                    atual.tagName === "H3" &&
                    analisarTituloQuestaoGabarito(
                        atual.textContent
                    )
                ) {

                    break;

                }


                if (
                    atual.tagName !== "SCRIPT" &&
                    atual.tagName !== "BUTTON"
                ) {

                    elementos.push(
                        atual.cloneNode(
                            true
                        )
                    );

                }


                atual =
                    atual.nextElementSibling;

            }


            resultado.push({

                numero:
                    dadosTitulo.numero,

                resposta:
                    dadosTitulo.resposta,

                elementos:
                    elementos

            });

        }
    );


    return resultado;

}


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


    const gabaritos =
        extrairGabaritosOriginais(

            revisaoAtual
                .documentoAulaOriginal

        );


    container.innerHTML =
        "";


    if (
        gabaritos.length === 0
    ) {

        container.innerHTML = `

            <p>
                Nenhum comentário de gabarito
                pôde ser extraído da aula original.
            </p>

        `;


        return;

    }


    let totalRelacionados =
        0;


    (
        questoesSelecionadas || []
    ).forEach(
        (
            questao,
            indiceRevisao
        ) => {

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

                return;

            }


            totalRelacionados++;


            const bloco =
                document.createElement(
                    "div"
                );


            bloco.className =
                "widget gabarito-item-revisao";


            const titulo =
                document.createElement(
                    "h3"
                );


            titulo.textContent =

                "Questão " +

                (indiceRevisao + 1) +

                (
                    gabarito.resposta
                        ? " — " +
                          gabarito.resposta
                        : ""
                );


            bloco.appendChild(
                titulo
            );


            gabarito.elementos.forEach(
                elemento => {

                    bloco.appendChild(
                        elemento.cloneNode(
                            true
                        )
                    );

                }
            );


            const referencia =
                document.createElement(
                    "p"
                );


            referencia.style.fontSize =
                "0.85rem";


            referencia.style.opacity =
                "0.7";


            referencia.textContent =

                "Correspondente à questão " +

                numeroOriginal +

                " da aula original.";


            bloco.appendChild(
                referencia
            );


            container.appendChild(
                bloco
            );

        }
    );


    if (
        totalRelacionados === 0
    ) {

        container.innerHTML = `

            <p>
                Os comentários foram encontrados,
                mas não foi possível relacioná-los
                às questões selecionadas.
            </p>

        `;

    }

}


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


    gabarito.style.display =
        "none";


    botao.textContent =
        "Mostrar Gabarito";


    botao.onclick =
        function () {

            const abrir =
                gabarito.style.display ===
                "none";


            gabarito.style.display =
                abrir
                    ? "block"
                    : "none";


            botao.textContent =
                abrir
                    ? "Ocultar Gabarito"
                    : "Mostrar Gabarito";

        };

}


function gerarGabaritoComentadoRevisao() {

    renderizarGabaritoRevisao(

        revisaoAtual
            .questoesSelecionadas || []

    );


    prepararBotaoGabaritoRevisao();

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


    revisaoAtual
        .questoesSelecionadas =
        questoes;


    renderizarQuestoesRevisao(
        questoes
    );


    inicializarQuestoesInterativasRevisao();


    gerarGabaritoComentadoRevisao();

}


// =====================================================
// GERAR NÚCLEO COMPLETO
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


    gerarPontosAtencaoRevisao();


    gerarTermosTecnicosGeraisRevisao();


    gerarQuestoesInterativasRevisao();


    console.log(

        "REVISÃO PSCPP — revisão gerada:",

        {

            topicos:
                topicos.length,

            nucleos:
                nucleos.length,

            questoes:
                revisaoAtual
                    .questoesSelecionadas
                    .length

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

        const catalogo =
            await carregarCatalogoDisciplinasRevisao();


        if (!catalogo) {

            throw new Error(
                "O catálogo de disciplinas não pôde ser carregado."
            );

        }


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
// CONTROLE DE REVISÃO 7 / 30 / 90
// =====================================================

async function garantirProgressoCarregadoRevisao() {

    if (
        typeof dadosProgresso !==
            "undefined" &&
        dadosProgresso
    ) {

        return true;

    }


    if (
        typeof carregarDadosProgresso ===
        "function"
    ) {

        await carregarDadosProgresso();


        return Boolean(
            dadosProgresso
        );

    }


    console.warn(
        "Revisão: progresso.js não está disponível."
    );


    return false;

}


function revisaoFoiRegistradaHoje(
    dataISO
) {

    if (!dataISO) {

        return false;

    }


    const data =
        new Date(
            dataISO
        );


    if (
        Number.isNaN(
            data.getTime()
        )
    ) {

        return false;

    }


    const hoje =
        new Date();


    return (

        data.getFullYear() ===
            hoje.getFullYear() &&

        data.getMonth() ===
            hoje.getMonth() &&

        data.getDate() ===
            hoje.getDate()

    );

}


function formatarDataPainelRevisao(
    data
) {

    if (
        typeof formatarDataRevisao ===
        "function"
    ) {

        return formatarDataRevisao(
            data
        );

    }


    if (!data) {

        return "—";

    }


    const objeto =
        new Date(
            data
        );


    if (
        Number.isNaN(
            objeto.getTime()
        )
    ) {

        return "—";

    }


    return objeto.toLocaleDateString(
        "pt-BR"
    );

}


async function atualizarSituacaoRevisaoAutomatica() {

    const carregado =
        await garantirProgressoCarregadoRevisao();


    if (!carregado) {

        return;

    }


    if (
        !revisaoAtual.disciplina ||
        !revisaoAtual.aula
    ) {

        return;

    }


    if (
        typeof obterDadosRevisaoAula !==
        "function"
    ) {

        return;

    }


    const dados =
        obterDadosRevisaoAula(

            revisaoAtual.disciplina,

            revisaoAtual.aula

        );


    if (!dados) {

        return;

    }


    atualizarTextoRevisao(

        "revisao-ultima-data",

        formatarDataPainelRevisao(
            dados.ultimaRevisao
        )

    );


    atualizarTextoRevisao(

        "revisao-proxima-data",

        formatarDataPainelRevisao(
            dados.proximaRevisao
        )

    );


    atualizarEstadoBotaoConclusaoRevisao(
        dados
    );

}


function atualizarEstadoBotaoConclusaoRevisao(
    dados
) {

    const botao =
        document.getElementById(
            "botao-revisao-concluida"
        );


    if (!botao) {

        return;

    }


    if (
        dados &&
        revisaoFoiRegistradaHoje(
            dados.ultimaRevisao
        )
    ) {

        botao.disabled =
            true;


        botao.textContent =
            "✅ Revisão registrada hoje";


        return;

    }


    botao.disabled =
        false;


    botao.textContent =
        "✅ Marcar revisão como concluída";

}


async function concluirRevisaoAutomatica() {

    const botao =
        document.getElementById(
            "botao-revisao-concluida"
        );


    if (
        !revisaoAtual.disciplina ||
        !revisaoAtual.aula
    ) {

        window.alert(
            "Não foi possível identificar esta revisão."
        );


        return;

    }


    const carregado =
        await garantirProgressoCarregadoRevisao();


    if (!carregado) {

        window.alert(
            "Não foi possível acessar os dados de progresso."
        );


        return;

    }


    if (
        typeof obterDadosRevisaoAula !==
        "function" ||
        typeof marcarAulaRevisadaHoje !==
        "function"
    ) {

        window.alert(
            "O sistema de revisões do progresso não está disponível."
        );


        return;

    }


    const dadosAntes =
        obterDadosRevisaoAula(

            revisaoAtual.disciplina,

            revisaoAtual.aula

        );


    if (
        dadosAntes &&
        revisaoFoiRegistradaHoje(
            dadosAntes.ultimaRevisao
        )
    ) {

        atualizarEstadoBotaoConclusaoRevisao(
            dadosAntes
        );


        return;

    }


    if (botao) {

        botao.disabled =
            true;


        botao.textContent =
            "Registrando revisão...";

    }


    const resultado =
        marcarAulaRevisadaHoje(

            revisaoAtual.disciplina,

            revisaoAtual.aula

        );


    if (!resultado) {

        if (botao) {

            botao.disabled =
                false;


            botao.textContent =
                "✅ Marcar revisão como concluída";

        }


        window.alert(

            "A revisão não pôde ser registrada. " +
            "Verifique se a aula original está concluída."

        );


        return;

    }


    atualizarTextoRevisao(

        "revisao-ultima-data",

        formatarDataPainelRevisao(
            resultado.ultimaRevisao
        )

    );


    atualizarTextoRevisao(

        "revisao-proxima-data",

        formatarDataPainelRevisao(
            resultado.proximaRevisao
        )

    );


    if (botao) {

        botao.disabled =
            true;


        botao.textContent =
            "✅ Revisão registrada hoje";

    }


    console.log(

        "REVISÃO — revisão registrada:",

        resultado

    );

}


function prepararBotaoConclusaoRevisao() {

    const botao =
        document.getElementById(
            "botao-revisao-concluida"
        );


    if (!botao) {

        return;

    }


    if (
        botao.dataset
            .revisaoPreparada ===
        "true"
    ) {

        return;

    }


    botao.addEventListener(

        "click",

        concluirRevisaoAutomatica

    );


    botao.dataset
        .revisaoPreparada =
        "true";

}


async function inicializarControleRevisaoAutomatica() {

    prepararBotaoConclusaoRevisao();


    await atualizarSituacaoRevisaoAutomatica();

}


// =====================================================
// INICIALIZAR AULA DE REVISÃO
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

    async function () {

        await inicializarAulaRevisao();


        window.setTimeout(

            inicializarControleRevisaoAutomatica,

            300

        );

    }

);


// =====================================================
// DEBUG
// =====================================================

console.log(
    "SISTEMA DE REVISÃO PSCPP CARREGADO"
);


// =====================================================
// FIM
// =====================================================
