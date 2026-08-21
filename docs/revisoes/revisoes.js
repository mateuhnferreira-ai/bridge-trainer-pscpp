// =====================================
// SISTEMA DE AULA DE REVISÃO PSCPP
// Bridge Trainer PSCPP
// Versão 1.0
//
// PRIMEIRA ETAPA:
//
// - ler disciplina da URL;
// - ler aula da URL;
// - preencher a página de revisão;
// - preparar a base para futuras camadas.
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

    aula: null

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
// Depois buscaremos os nomes reais em
// disciplinas.json / banco-conteudo.js.
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


    const disciplina =
        normalizarIdRevisao(
            parametros.get(
                "disciplina"
            )
        );


    const aula =
        normalizarIdRevisao(
            parametros.get(
                "aula"
            )
        );


    return {

        disciplina:
            disciplina,

        aula:
            aula

    };

}


// =====================================
// ATUALIZAR TEXTO SE ELEMENTO EXISTIR
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
// MOSTRAR ERRO DE IDENTIFICAÇÃO
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


    const painel =
        document.getElementById(
            "painel-foco-revisao"
        );


    if (painel) {

        painel.innerHTML = `

            <p>
                Não foi possível identificar
                corretamente a aula que deve
                ser revisada.
            </p>

            <p>
                A página precisa receber os parâmetros:
            </p>

            <p>
                <strong>
                ?disciplina=...&aula=...
                </strong>
            </p>

        `;

    }

}


// =====================================
// PREENCHER IDENTIDADE DA REVISÃO
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


    const painel =
        document.getElementById(
            "painel-foco-revisao"
        );


    if (painel) {

        painel.innerHTML = `

            <p>
                Aula identificada com sucesso.
            </p>

            <p>
                <strong>Disciplina:</strong>
                ${nomeDisciplina}
            </p>

            <p>
                <strong>Aula:</strong>
                ${nomeAula}
            </p>

            <p>
                Na próxima etapa,
                esta página passará a carregar
                automaticamente os dados reais
                da aula original.
            </p>

        `;

    }

}


// =====================================
// INICIALIZAR PÁGINA DE REVISÃO
// =====================================

function inicializarAulaRevisao() {

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


    console.log(
        "Aula de revisão identificada:",
        revisaoAtual
    );

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
    "SISTEMA DE AULA DE REVISÃO v1.0 CARREGADO"
);


// =====================================
// FIM revisoes.js v1.0
// =====================================
