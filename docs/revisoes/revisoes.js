// =====================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
// Versão 1.2
//
// FUNÇÕES:
//
// - identifica disciplina e aula pela URL;
// - localiza automaticamente a aula original;
// - interpreta o HTML da aula;
// - reconhece sua estrutura semântica;
// - seleciona automaticamente os principais
//   conceitos para revisão;
// - preserva cobertura de toda a aula.
//
// FUTURAS CAMADAS:
//
// v1.3 → pontos de atenção;
// v1.4 → termos técnicos;
// v1.5 → desempenho adaptativo;
// v1.6 → questões de revisão.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const REVISAO_MAX_PONTOS_PRINCIPAIS =
    8;


// =====================================
// DADOS DA REVISÃO ATUAL
// =====================================

let revisaoAtual = {

    disciplina: null,

    aula: null,

    caminhoAulaOriginal: null,

    documentoAulaOriginal: null,

    topicosAnalisados: []

};


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================

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


// =====================================
// NORMALIZAR TEXTO
// =====================================

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


// =====================================
// FORMATAR ID COMO TÍTULO
// =====================================

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


// =====================================
// LER PARÂMETROS DA URL
// =====================================

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


// =====================================
// ATUALIZAR TEXTO
// =====================================

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


// =====================================
// ATUALIZAR HTML
// =====================================

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


// =====================================
// ESCAPAR HTML
// =====================================

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


// =====================================
// CRIAR CAMINHO DA AULA ORIGINAL
// =====================================

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


// =====================================
// MOSTRAR ERRO
// =====================================

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


// =====================================
// PREENCHER IDENTIDADE
// =====================================

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

        "Revisão da aula " +
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


// =====================================
// CARREGAR AULA ORIGINAL
// =====================================

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


// =====================================
// CRIAR DOCUMENTO TEMPORÁRIO
// =====================================

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


// =====================================
// VALIDAR DOCUMENTO
// =====================================

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
            "Identidade divergente na aula original.",
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


// =====================================
// RESUMO DA ESTRUTURA
// =====================================

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
// MOTOR DE EXTRAÇÃO DOS PONTOS PRINCIPAIS
// =====================================================


// =====================================
// OBTER TÍTULO DO TÓPICO
// =====================================

function obterTituloTopicoRevisao(
    topico
) {

    if (!topico) {

        return "";

    }


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


// =====================================
// REMOVER NUMERAÇÃO DO TÍTULO
// =====================================

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


// =====================================
// OBTER PRIMEIRO PARÁGRAFO DIRETO
// =====================================
//
// Evita capturar primeiro um texto de
// caixas secundárias quando houver
// explicação principal no widget.
// =====================================

function obterParagrafoPrincipalTopico(
    topico
) {

    if (!topico) {

        return "";

    }


    const widget =
        topico.querySelector(
            ".widget"
        );


    if (!widget) {

        return "";

    }


    const filhos =
        Array.from(
            widget.children
        );


    for (
        const filho of filhos
    ) {

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
                30
            ) {

                return texto;

            }

        }

    }


    const paragrafo =
        widget.querySelector(
            "p"
        );


    return paragrafo
        ? limparTextoRevisao(
            paragrafo.textContent
        )
        : "";

}


// =====================================
// OBTER CONCEITO DE DESTAQUE
// =====================================

function obterTextoDestaqueTopico(
    topico
) {

    if (!topico) {

        return "";

    }


    const destaque =
        topico.querySelector(
            ".destaque"
        );


    if (!destaque) {

        return "";

    }


    const paragrafos =
        Array.from(
            destaque.querySelectorAll(
                "p"
            )
        );


    for (
        const paragrafo of paragrafos
    ) {

        const texto =
            limparTextoRevisao(
                paragrafo.textContent
            );


        if (
            texto.length >=
            20
        ) {

            return texto;

        }

    }


    return "";

}


// =====================================
// RESUMO DO TÓPICO
// =====================================
//
// Preferência:
//
// 1. conceito em destaque;
// 2. primeiro parágrafo da explicação.
//
// Isso reduz a quantidade de texto
// transportada para a revisão.
// =====================================

function obterResumoTopicoRevisao(
    topico
) {

    const destaque =
        obterTextoDestaqueTopico(
            topico
        );


    if (destaque) {

        return destaque;

    }


    return obterParagrafoPrincipalTopico(
        topico
    );

}


// =====================================
// CALCULAR IMPORTÂNCIA ESTRUTURAL
// =====================================
//
// Não utiliza desempenho.
//
// A pontuação procura reconhecer
// conceitos que receberam tratamento
// didático especial na aula.
//
// .destaque         +4
// .atencao-pratico  +2
// .termos-tecnicos  +1
// figura            +1
// fórmula           +1
//
// Todo tópico começa com 1.
// =====================================

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
            2;

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
        topico.querySelector(
            ".figura-aula, figure, svg"
        )
    ) {

        pontos +=
            1;

    }


    if (
        topico.querySelector(
            ".formula, .equacao, math"
        )
    ) {

        pontos +=
            1;

    }


    return pontos;

}


// =====================================
// ANALISAR TODOS OS TÓPICOS
// =====================================

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


                const resumo =
                    obterResumoTopicoRevisao(
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

                    resumo:
                        resumo,

                    importancia:
                        calcularImportanciaTopico(
                            topico
                        ),

                    possuiDestaque:
                        Boolean(
                            topico.querySelector(
                                ".destaque"
                            )
                        ),

                    possuiAtencao:
                        Boolean(
                            topico.querySelector(
                                ".atencao-pratico"
                            )
                        ),

                    possuiTermos:
                        Boolean(
                            topico.querySelector(
                                ".termos-tecnicos"
                            )
                        )

                };

            }
        )

        .filter(
            item =>

                item.titulo &&
                item.resumo

        );

}


// =====================================
// SELEÇÃO DISTRIBUÍDA
// =====================================
//
// A aula é dividida em faixas.
//
// Exemplo:
//
// 64 tópicos / 8 pontos principais
//
// aproximadamente:
//
// faixa 1 → tópicos 1–8
// faixa 2 → tópicos 9–16
// ...
//
// De cada faixa selecionamos o conceito
// estruturalmente mais relevante.
//
// Isso impede que todos os pontos da
// revisão venham apenas da primeira
// parte da aula.
// =====================================

function selecionarPontosPrincipais(
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

            REVISAO_MAX_PONTOS_PRINCIPAIS,

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


        let candidatos =
            topicos.slice(
                inicio,
                fim
            );


        if (
            candidatos.length ===
            0
        ) {

            continue;

        }


        candidatos =
            candidatos.sort(
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


        selecionados.push(
            candidatos[0]
        );

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


// =====================================
// RENDERIZAR PONTOS PRINCIPAIS
// =====================================

function renderizarPontosPrincipais(
    pontos
) {

    if (
        !Array.isArray(
            pontos
        ) ||
        pontos.length ===
            0
    ) {

        atualizarHTMLRevisao(

            "lista-pontos-revisao",

            `

            <div class="widget">

                <p>
                    Não foi possível identificar
                    automaticamente os conceitos
                    principais desta aula.
                </p>

            </div>

            `

        );


        return;

    }


    const html =
        pontos

            .map(
                (
                    ponto,
                    indice
                ) => {

                    const marcadores =
                        [];


                    if (
                        ponto.possuiDestaque
                    ) {

                        marcadores.push(
                            "conceito fundamental"
                        );

                    }


                    if (
                        ponto.possuiAtencao
                    ) {

                        marcadores.push(
                            "atenção PSCPP"
                        );

                    }


                    if (
                        ponto.possuiTermos
                    ) {

                        marcadores.push(
                            "terminologia técnica"
                        );

                    }


                    const classificacao =
                        marcadores.length > 0

                            ? `

                            <p
                            style="
                                margin-top:10px;
                                font-size:0.85rem;
                                opacity:0.75;
                            "
                            >

                                ${escaparHTMLRevisao(
                                    marcadores.join(
                                        " • "
                                    )
                                )}

                            </p>

                            `

                            : "";


                    return `

                    <div class="widget">

                        <h3>

                            ${indice + 1}.
                            ${escaparHTMLRevisao(
                                ponto.titulo
                            )}

                        </h3>

                        <p>

                            ${escaparHTMLRevisao(
                                ponto.resumo
                            )}

                        </p>

                        ${classificacao}

                    </div>

                    `;

                }
            )

            .join("");


    atualizarHTMLRevisao(

        "lista-pontos-revisao",

        html

    );

}


// =====================================
// GERAR NÚCLEO DA REVISÃO
// =====================================

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


    const principais =
        selecionarPontosPrincipais(
            topicos
        );


    renderizarPontosPrincipais(
        principais
    );


    console.log(
        "Núcleo da revisão:",
        {

            topicosAnalisados:
                topicos.length,

            pontosSelecionados:
                principais

        }
    );

}


// =====================================
// MOSTRAR AULA CARREGADA
// =====================================

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
            O motor identificou a estrutura
            necessária para construir a revisão.
        </p>

        <ul>

            <li>
                Tópicos:
                <strong>
                    ${resumo.topicos}
                </strong>
            </li>

            <li>
                Destaques:
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
                Termos técnicos:
                <strong>
                    ${resumo.termosTecnicos}
                </strong>
            </li>

            <li>
                Questões:
                <strong>
                    ${resumo.questoes}
                </strong>
            </li>

        </ul>

        <p>
            <strong>
                Núcleo conceitual automático:
            </strong>
            os principais conceitos já foram
            selecionados abaixo.
        </p>

        `

    );

}


// =====================================
// PREPARAR AULA ORIGINAL
// =====================================

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


        // =================================
        // GERAR NÚCLEO FIXO DA REVISÃO
        // =================================

        gerarNucleoRevisao(
            documento
        );


        console.log(
            "Aula original preparada:",
            {

                revisao:
                    revisaoAtual,

                estrutura:
                    resumo

            }
        );


        return true;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar aula original:",
            erro
        );


        atualizarHTMLRevisao(

            "painel-foco-revisao",

            `

            <p>
                <strong>
                    ⚠ Não foi possível carregar
                    a aula original.
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


// =====================================
// INICIALIZAR
// =====================================

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


// =====================================
// INICIALIZAÇÃO AUTOMÁTICA
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        inicializarAulaRevisao();

    }

);


// =====================================
// DEBUG
// =====================================

console.log(
    "SISTEMA DE AULA DE REVISÃO v1.2 CARREGADO"
);


// =====================================
// FIM revisoes.js v1.2
// =====================================
