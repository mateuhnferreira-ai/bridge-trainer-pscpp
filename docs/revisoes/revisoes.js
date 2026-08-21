// =====================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
// Versão 1.1
//
// Funções atuais:
//
// - ler disciplina e aula da URL;
// - identificar a revisão;
// - localizar automaticamente a aula original;
// - carregar o HTML da aula;
// - preparar sua estrutura para extração;
// - manter a base para revisão inteligente.
//
// Exemplo:
//
// aula.html?disciplina=manobrabilidade&aula=controlabilidade
// =====================================


// =====================================
// DADOS ATUAIS DA REVISÃO
// =====================================

let revisaoAtual = {

    disciplina: null,

    aula: null,

    caminhoAulaOriginal: null,

    documentoAulaOriginal: null

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
// FORMATAR ID COMO TÍTULO
// =====================================
//
// Temporário.
//
// Depois poderemos buscar nomes reais
// em disciplinas.json.
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
// CAMINHO DA AULA ORIGINAL
// =====================================
//
// Estrutura atual:
//
// docs/
// ├── disciplinas/
// │   └── manobrabilidade/
// │       └── controlabilidade.html
// │
// └── revisoes/
//     └── aula.html
//
// Portanto:
//
// ../disciplinas/{disciplina}/{aula}.html
//
// OBSERVAÇÃO:
//
// Isto pressupõe que:
// id da aula = nome do arquivo.
//
// Depois poderemos substituir esta regra
// pela leitura do disciplinas.json,
// caso necessário.
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
// CARREGAR HTML DA AULA ORIGINAL
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
            "A aula original foi carregada, mas seu conteúdo está vazio."
        );

    }


    return html;

}


// =====================================
// TRANSFORMAR HTML EM DOCUMENTO
// =====================================
//
// Isso NÃO abre a aula na tela.
//
// O HTML é convertido em um documento
// temporário apenas para leitura.
//
// Depois poderemos consultar:
//
// .topico-aula
// .destaque
// .atencao-pratico
// .termos-tecnicos
// .questao
// etc.
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
// VALIDAR AULA ORIGINAL
// =====================================

function validarDocumentoAulaOriginal(
    documento
) {

    if (!documento) {

        return false;

    }


    const body =
        documento.body;


    if (!body) {

        return false;

    }


    const disciplina =
        normalizarIdRevisao(
            body.dataset.disciplina
        );


    const aula =
        normalizarIdRevisao(
            body.dataset.aula
        );


    if (
        disciplina !==
            revisaoAtual.disciplina ||
        aula !==
            revisaoAtual.aula
    ) {

        console.warn(
            "A identidade encontrada na aula original " +
            "não coincide com a URL da revisão.",
            {
                esperado: {
                    disciplina:
                        revisaoAtual.disciplina,
                    aula:
                        revisaoAtual.aula
                },
                encontrado: {
                    disciplina:
                        disciplina,
                    aula:
                        aula
                }
            }
        );

    }


    return true;

}


// =====================================
// CONTAR ELEMENTOS IMPORTANTES
// =====================================
//
// Nesta etapa serve apenas para confirmar
// que conseguimos acessar a estrutura da aula.
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


// =====================================
// MOSTRAR SUCESSO DO CARREGAMENTO
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
            A estrutura da aula já está disponível
            para o motor de revisão.
        </p>

        <ul>

            <li>
                Tópicos encontrados:
                <strong>
                    ${resumo.topicos}
                </strong>
            </li>

            <li>
                Destaques encontrados:
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
                Blocos de termos técnicos:
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
// INICIALIZAR AULA DE REVISÃO
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
// INICIALIZAÇÃO
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
    "SISTEMA DE AULA DE REVISÃO v1.1 CARREGADO"
);


// =====================================
// FIM revisoes.js v1.1
// =====================================
