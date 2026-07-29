// =====================================
// SISTEMA DE PROGRESSO PSCPP v3.0
// Bridge Trainer PSCPP
// Armazenamento local no navegador
// =====================================


// Chave utilizada no localStorage
const CHAVE_PROGRESSO_PSCPP = "bridgeTrainerPSCPP_progresso";


// Estrutura de progresso carregada
let dadosProgresso = null;


// =====================================
// CRIAR ESTRUTURA INICIAL
// =====================================

function criarEstruturaInicialProgresso() {

    return {

        versao: "3.0",

        ultimaAtualizacao: null,

        disciplinas: {}

    };

}


// =====================================
// CARREGAR DADOS DE PROGRESSO
// =====================================

async function carregarDadosProgresso() {

    try {

        const progressoLocal =
            localStorage.getItem(CHAVE_PROGRESSO_PSCPP);

        // Se já existir progresso salvo no tablet,
        // ele terá prioridade.
        if (progressoLocal) {

            dadosProgresso =
                JSON.parse(progressoLocal);

            console.log(
                "Progresso carregado do localStorage:",
                dadosProgresso
            );

            return dadosProgresso;

        }

        // Caso ainda não exista progresso local,
        // tenta carregar a estrutura inicial do JSON.
        try {

            const caminhoJSON =
                obterCaminhoProgressoJSON();

            const resposta =
                await fetch(caminhoJSON);

            if (!resposta.ok) {

                throw new Error(
                    "Não foi possível carregar progresso.json"
                );

            }

            dadosProgresso =
                await resposta.json();

        }
        catch (erroJSON) {

            console.warn(
                "progresso.json não foi carregado. " +
                "Será criada uma estrutura inicial.",
                erroJSON
            );

            dadosProgresso =
                criarEstruturaInicialProgresso();

        }

        salvarDadosProgresso();

        console.log(
            "Estrutura inicial de progresso criada:",
            dadosProgresso
        );

        return dadosProgresso;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar progresso:",
            erro
        );

        dadosProgresso =
            criarEstruturaInicialProgresso();

        return dadosProgresso;

    }

}


// =====================================
// IDENTIFICAR CAMINHO DO progresso.json
// =====================================

function obterCaminhoProgressoJSON() {

    const caminhoAtual =
        window.location.pathname;

    // Página dentro de:
    // docs/disciplinas/nome-disciplina/
    if (caminhoAtual.includes("/disciplinas/")) {

        return "../../data/progresso.json";

    }

    // Página dentro de:
    // docs/guia-estudos/
    if (caminhoAtual.includes("/guia-estudos/")) {

        return "../data/progresso.json";

    }

    // Página principal:
    // docs/index.html
    return "data/progresso.json";

}


// =====================================
// SALVAR DADOS
// =====================================

function salvarDadosProgresso() {

    if (!dadosProgresso) {

        dadosProgresso =
            criarEstruturaInicialProgresso();

    }

    dadosProgresso.ultimaAtualizacao =
        new Date().toISOString();

    localStorage.setItem(

        CHAVE_PROGRESSO_PSCPP,

        JSON.stringify(dadosProgresso)

    );

}


// =====================================
// GARANTIR DISCIPLINA
// =====================================

function garantirDisciplina(idDisciplina) {

    if (!dadosProgresso) {

        dadosProgresso =
            criarEstruturaInicialProgresso();

    }

    if (!dadosProgresso.disciplinas) {

        dadosProgresso.disciplinas = {};

    }

    if (!dadosProgresso.disciplinas[idDisciplina]) {

        dadosProgresso.disciplinas[idDisciplina] = {

            progresso: 0,

            assuntos: {}

        };

    }

    if (
        !dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos
    ) {

        dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos = {};

    }

}


// =====================================
// MARCAR ASSUNTO COMO ESTUDADO
// =====================================

function marcarComoEstudado(
    idDisciplina,
    idAssunto
) {

    garantirDisciplina(idDisciplina);

    const assuntos =
        dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos;

    assuntos[idAssunto] = {

        concluido: true,

        dataConclusao:
            new Date().toISOString()

    };

    recalcularProgressoDisciplina(
        idDisciplina
    );

    salvarDadosProgresso();

    atualizarElementosDaPagina(
        idDisciplina,
        idAssunto
    );

}


// =====================================
// DESMARCAR ASSUNTO
// =====================================

function desmarcarComoEstudado(
    idDisciplina,
    idAssunto
) {

    garantirDisciplina(idDisciplina);

    const assuntos =
        dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos;

    assuntos[idAssunto] = {

        concluido: false,

        dataConclusao: null

    };

    recalcularProgressoDisciplina(
        idDisciplina
    );

    salvarDadosProgresso();

    atualizarElementosDaPagina(
        idDisciplina,
        idAssunto
    );

}


// =====================================
// ALTERNAR ESTADO DO ASSUNTO
// =====================================

function alternarStatusEstudo(
    idDisciplina,
    idAssunto
) {

    if (
        assuntoFoiEstudado(
            idDisciplina,
            idAssunto
        )
    ) {

        desmarcarComoEstudado(
            idDisciplina,
            idAssunto
        );

    }
    else {

        marcarComoEstudado(
            idDisciplina,
            idAssunto
        );

    }

}


// =====================================
// VERIFICAR SE FOI ESTUDADO
// =====================================

function assuntoFoiEstudado(
    idDisciplina,
    idAssunto
) {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[idDisciplina] ||
        !dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos ||
        !dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos[idAssunto]
    ) {

        return false;

    }

    return Boolean(

        dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos[idAssunto]
            .concluido

    );

}


// =====================================
// CONTAR ASSUNTOS DA DISCIPLINA
// =====================================

function obterQuantidadeAssuntos(
    idDisciplina
) {

    if (
        typeof conteudoPSCPP !== "undefined" &&
        conteudoPSCPP[idDisciplina] &&
        Array.isArray(
            conteudoPSCPP[idDisciplina].assuntos
        )
    ) {

        return conteudoPSCPP[
            idDisciplina
        ].assuntos.length;

    }

    return 0;

}


// =====================================
// RECALCULAR DISCIPLINA
// =====================================

function recalcularProgressoDisciplina(
    idDisciplina
) {

    garantirDisciplina(idDisciplina);

    const totalAssuntos =
        obterQuantidadeAssuntos(
            idDisciplina
        );

    if (totalAssuntos === 0) {

        dadosProgresso
            .disciplinas[idDisciplina]
            .progresso = 0;

        return 0;

    }

    const assuntosSalvos =
        dadosProgresso
            .disciplinas[idDisciplina]
            .assuntos;

    const totalConcluidos =
        Object.values(assuntosSalvos)
            .filter(
                assunto =>
                    assunto.concluido === true
            )
            .length;

    const percentual =
        Math.round(
            (
                totalConcluidos /
                totalAssuntos
            ) * 100
        );

    dadosProgresso
        .disciplinas[idDisciplina]
        .progresso = percentual;

    return percentual;

}


// =====================================
// PROGRESSO POR DISCIPLINA
// =====================================

function obterProgressoDisciplina(
    idDisciplina
) {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[idDisciplina]
    ) {

        return 0;

    }

    return (
        dadosProgresso
            .disciplinas[idDisciplina]
            .progresso || 0
    );

}


// =====================================
// PROGRESSO GERAL
// =====================================

function calcularProgressoGeral() {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return 0;

    }

    let idsDisciplinas = [];

    if (
        typeof conteudoPSCPP !== "undefined"
    ) {

        idsDisciplinas =
            Object.keys(conteudoPSCPP);

    }
    else {

        idsDisciplinas =
            Object.keys(
                dadosProgresso.disciplinas
            );

    }

    if (idsDisciplinas.length === 0) {

        return 0;

    }

    let soma = 0;

    idsDisciplinas.forEach(
        idDisciplina => {

            soma +=
                obterProgressoDisciplina(
                    idDisciplina
                );

        }
    );

    return Math.round(
        soma / idsDisciplinas.length
    );

}


// =====================================
// ATUALIZAR BOTÃO DA AULA
// =====================================

function atualizarBotaoEstudo(
    idDisciplina,
    idAssunto
) {

    const botao =
        document.getElementById(
            "botao-marcar-estudado"
        );

    if (!botao) {

        return;

    }

    const concluido =
        assuntoFoiEstudado(
            idDisciplina,
            idAssunto
        );

    if (concluido) {

        botao.textContent =
            "✓ Conteúdo estudado";

        botao.classList.add(
            "conteudo-concluido"
        );

        botao.setAttribute(
            "aria-pressed",
            "true"
        );

    }
    else {

        botao.textContent =
            "Marcar como estudado";

        botao.classList.remove(
            "conteudo-concluido"
        );

        botao.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


// =====================================
// ATUALIZAR PROGRESSO VISUAL
// =====================================

function atualizarProgressoVisual() {

    const progressoGeral =
        calcularProgressoGeral();

    const barra =
        document.getElementById(
            "barra-progresso-geral"
        );

    const texto =
        document.getElementById(
            "texto-progresso-geral"
        );

    if (barra) {

        barra.style.width =
            progressoGeral + "%";

        barra.setAttribute(
            "aria-valuenow",
            progressoGeral
        );

    }

    if (texto) {

        texto.textContent =
            progressoGeral + "% concluído";

    }

}


// =====================================
// ATUALIZAR ELEMENTOS DA PÁGINA
// =====================================

function atualizarElementosDaPagina(
    idDisciplina,
    idAssunto
) {

    atualizarBotaoEstudo(
        idDisciplina,
        idAssunto
    );

    atualizarProgressoVisual();

    document.dispatchEvent(

        new CustomEvent(
            "progressoPSCPPAtualizado",
            {
                detail: {
                    disciplina:
                        idDisciplina,

                    assunto:
                        idAssunto,

                    progressoDisciplina:
                        obterProgressoDisciplina(
                            idDisciplina
                        ),

                    progressoGeral:
                        calcularProgressoGeral()
                }
            }
        )

    );

}


// =====================================
// INICIALIZAÇÃO DA AULA
// =====================================

async function inicializarProgressoAula(
    idDisciplina,
    idAssunto
) {

    if (!dadosProgresso) {

        await carregarDadosProgresso();

    }

    recalcularProgressoDisciplina(
        idDisciplina
    );

    atualizarBotaoEstudo(
        idDisciplina,
        idAssunto
    );

    atualizarProgressoVisual();

}


// =====================================
// LIMPAR TODO O PROGRESSO
// Usar somente quando necessário
// =====================================

function limparTodoProgresso() {

    const confirmar = window.confirm(
        "Deseja realmente apagar todo o progresso de estudo?"
    );

    if (!confirmar) {

        return;

    }

    localStorage.removeItem(
        CHAVE_PROGRESSO_PSCPP
    );

    dadosProgresso =
        criarEstruturaInicialProgresso();

    window.location.reload();

}


// =====================================
// CARREGAMENTO AUTOMÁTICO
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        await carregarDadosProgresso();

        atualizarProgressoVisual();

    }
);


// =====================================
// FIM PROGRESSO v3.0
// =====================================
