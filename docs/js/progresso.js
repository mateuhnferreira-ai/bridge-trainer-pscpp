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
        typeof conteudoPSCPP !== "
