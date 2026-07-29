// =====================================
// SISTEMA DE PROGRESSO PSCPP v4.0
// Bridge Trainer PSCPP
//
// Estrutura dinâmica:
//
// Disciplina
// └── Aula
//     ├── Tópico 1
//     ├── Tópico 2
//     └── Tópico N
//
// A quantidade de tópicos é identificada
// automaticamente pelo HTML de cada aula.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const CHAVE_PROGRESSO_PSCPP =
    "bridgeTrainerPSCPP_progresso";


let dadosProgresso = null;


// Informações da aula atualmente aberta
let aulaAtual = {

    disciplina: null,

    aula: null

};


// =====================================
// CRIAR ESTRUTURA INICIAL
// =====================================

function criarEstruturaInicialProgresso() {

    return {

        versao: "4.0",

        ultimaAtualizacao: null,

        disciplinas: {}

    };

}


// =====================================
// NORMALIZAR IDENTIFICADORES
// =====================================

function normalizarIdentificador(texto) {

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
// CARREGAR PROGRESSO
// =====================================

async function carregarDadosProgresso() {

    try {

        const progressoSalvo =
            localStorage.getItem(
                CHAVE_PROGRESSO_PSCPP
            );


        if (progressoSalvo) {

            dadosProgresso =
                JSON.parse(
                    progressoSalvo
                );


            prepararEstruturaProgresso();


            console.log(
                "Progresso carregado do tablet:",
                dadosProgresso
            );


            return dadosProgresso;

        }


        dadosProgresso =
            await carregarProgressoInicialJSON();


        prepararEstruturaProgresso();


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
// CARREGAR progresso.json
// =====================================

async function carregarProgressoInicialJSON() {

    try {

        const caminhoJSON =
            obterCaminhoProgressoJSON();


        const resposta =
            await fetch(
                caminhoJSON
            );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível carregar progresso.json"
            );

        }


        const dados =
            await resposta.json();


        return dados;

    }
    catch (erro) {

        console.warn(
            "O progresso.json não foi carregado. " +
            "Será criada uma estrutura inicial local.",
            erro
        );


        return criarEstruturaInicialProgresso();

    }

}


// =====================================
// CAMINHO DO progresso.json
// =====================================

function obterCaminhoProgressoJSON() {

    const caminhoAtual =
        window.location.pathname;


    if (
        caminhoAtual.includes(
            "/disciplinas/"
        )
    ) {

        return "../../data/progresso.json";

    }


    if (
        caminhoAtual.includes(
            "/guia-estudos/"
        )
    ) {

        return "../data/progresso.json";

    }


    return "data/progresso.json";

}


// =====================================
// PREPARAR ESTRUTURA
// =====================================

function prepararEstruturaProgresso() {

    if (
        !dadosProgresso ||
        typeof dadosProgresso !== "object"
    ) {

        dadosProgresso =
            criarEstruturaInicialProgresso();

    }


    dadosProgresso.versao =
        "4.0";


    if (
        !dadosProgresso.disciplinas
    ) {

        dadosProgresso.disciplinas = {};

    }

}


// =====================================
// SALVAR PROGRESSO
// =====================================

function salvarDadosProgresso() {

    prepararEstruturaProgresso();


    dadosProgresso.ultimaAtualizacao =
        new Date().toISOString();


    localStorage.setItem(

        CHAVE_PROGRESSO_PSCPP,

        JSON.stringify(
            dadosProgresso
        )

    );

}


// =====================================
// GARANTIR DISCIPLINA
// =====================================

function garantirDisciplina(
    idDisciplina
) {

    prepararEstruturaProgresso();


    const disciplinaNormalizada =
        normalizarIdentificador(
            idDisciplina
        );


    if (
        !dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ]
    ) {

        dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ] = {

                progresso: 0,

                aulas: {}

            };

    }


    const disciplina =
        dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ];


    if (!disciplina.aulas) {

        disciplina.aulas = {};

    }


    return disciplina;

}


// =====================================
// GARANTIR AULA
// =====================================

function garantirAula(
    idDisciplina,
    idAula
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const aulaNormalizada =
        normalizarIdentificador(
            idAula
        );


    if (
        !disciplina
            .aulas[
                aulaNormalizada
            ]
    ) {

        disciplina
            .aulas[
                aulaNormalizada
            ] = {

                progresso: 0,

                concluida: false,

                totalTopicos: 0,

                topicos: {}

            };

    }


    const aula =
        disciplina
            .aulas[
                aulaNormalizada
            ];


    if (!aula.topicos) {

        aula.topicos = {};

    }


    return aula;

}


// =====================================
// GARANTIR TÓPICO
// =====================================

function garantirTopico(
    idDisciplina,
    idAula,
    idTopico
) {

    const aula =
        garantirAula(
            idDisciplina,
            idAula
        );


    const topicoNormalizado =
        normalizarIdentificador(
            idTopico
        );


    if (
        !aula
            .topicos[
                topicoNormalizado
            ]
    ) {

        aula
            .topicos[
                topicoNormalizado
            ] = {

                concluido: false,

                dataConclusao: null

            };

    }


    return aula
        .topicos[
            topicoNormalizado
        ];

}


// =====================================
// IDENTIFICAR DADOS DA AULA
// =====================================

function identificarAulaAtual() {

    const corpo =
        document.body;


    if (!corpo) {

        return false;

    }


    const disciplina =
        corpo.dataset.disciplina;


    const aula =
        corpo.dataset.aula;


    if (
        !disciplina ||
        !aula
    ) {

        console.warn(
            "A página não possui data-disciplina " +
            "e data-aula no elemento body."
        );


        return false;

    }


    aulaAtual.disciplina =
        normalizarIdentificador(
            disciplina
        );


    aulaAtual.aula =
        normalizarIdentificador(
            aula
        );


    return true;

}


// =====================================
// LOCALIZAR TÓPICOS DA PÁGINA
// =====================================

function obterTopicosDaPagina() {

    return Array.from(

        document.querySelectorAll(
            ".topico-aula"
        )

    );

}


// =====================================
// IDENTIFICAR ID DO TÓPICO
// =====================================

function obterIdDoTopico(
    elementoTopico,
    indice
) {

    let idTopico =
        elementoTopico.dataset.topicoId;


    if (!idTopico) {

        const titulo =
            elementoTopico.querySelector(
                "h2, h3, h4"
            );


        if (titulo) {

            idTopico =
                normalizarIdentificador(
                    titulo.textContent
                );

        }

    }


    if (!idTopico) {

        idTopico =
            "topico-" + (indice + 1);

    }


    idTopico =
        normalizarIdentificador(
            idTopico
        );


    elementoTopico.dataset.topicoId =
        idTopico;


    return idTopico;

}


// =====================================
// REGISTRAR TÓPICOS DA AULA
// =====================================

function registrarTopicosDaAula() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return;

    }


    const topicos =
        obterTopicosDaPagina();


    const aula =
        garantirAula(

            aulaAtual.disciplina,

            aulaAtual.aula

        );


    aula.totalTopicos =
        topicos.length;


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            garantirTopico(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );

        }
    );


    recalcularProgressoAula(

        aulaAtual.disciplina,

        aulaAtual.aula

    );


    salvarDadosProgresso();

}


// =====================================
// VERIFICAR SE TÓPICO FOI ESTUDADO
// =====================================

function topicoFoiEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    const aula =
        normalizarIdentificador(
            idAula
        );


    const topico =
        normalizarIdentificador(
            idTopico
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ].topicos ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ].topicos[
                topico
            ]
    ) {

        return false;

    }


    return Boolean(

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .aulas[
                aula
            ]
            .topicos[
                topico
            ]
            .concluido

    );

}


// =====================================
// MARCAR TÓPICO COMO ESTUDADO
// =====================================

function marcarTopicoComoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const topico =
        garantirTopico(

            idDisciplina,

            idAula,

            idTopico

        );


    topico.concluido = true;


    topico.dataConclusao =
        new Date().toISOString();


    atualizarProgressoCompleto(

        idDisciplina,

        idAula

    );


    atualizarInterfaceAula();

}


// =====================================
// DESMARCAR TÓPICO
// =====================================

function desmarcarTopicoComoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const topico =
        garantirTopico(

            idDisciplina,

            idAula,

            idTopico

        );


    topico.concluido = false;


    topico.dataConclusao = null;


    atualizarProgressoCompleto(

        idDisciplina,

        idAula

    );


    atualizarInterfaceAula();

}


// =====================================
// ALTERNAR ESTADO DO TÓPICO
// =====================================

function alternarTopicoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const concluido =
        topicoFoiEstudado(

            idDisciplina,

            idAula,

            idTopico

        );


    if (concluido) {

        desmarcarTopicoComoEstudado(

            idDisciplina,

            idAula,

            idTopico

        );

    }
    else {

        marcarTopicoComoEstudado(

            idDisciplina,

            idAula,

            idTopico

        );

    }

}


// =====================================
// RECALCULAR PROGRESSO DA AULA
// =====================================

function recalcularProgressoAula(
    idDisciplina,
    idAula
) {

    const aula =
        garantirAula(

            idDisciplina,

            idAula

        );


    const totalTopicos =
        aula.totalTopicos || 0;


    if (totalTopicos === 0) {

        aula.progresso = 0;

        aula.concluida = false;


        return 0;

    }


    const topicosRegistrados =
        Object.values(
            aula.topicos
        );


    const totalConcluidos =
        topicosRegistrados.filter(

            topico =>
                topico.concluido === true

        ).length;


    const percentual =
        Math.round(

            (
                totalConcluidos /
                totalTopicos
            ) * 100

        );


    aula.progresso =
        percentual;


    aula.concluida =
        percentual === 100;


    return percentual;

}


// =====================================
// RECALCULAR PROGRESSO DA DISCIPLINA
// =====================================

function recalcularProgressoDisciplina(
    idDisciplina
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const aulas =
        Object.values(
            disciplina.aulas
        );


    if (aulas.length === 0) {

        disciplina.progresso = 0;


        return 0;

    }


    let somaProgresso = 0;


    aulas.forEach(
        aula => {

            somaProgresso +=
                aula.progresso || 0;

        }
    );


    disciplina.progresso =
        Math.round(

            somaProgresso /
            aulas.length

        );


    return disciplina.progresso;

}


// =====================================
// RECALCULAR TUDO
// =====================================

function atualizarProgressoCompleto(
    idDisciplina,
    idAula
) {

    recalcularProgressoAula(

        idDisciplina,

        idAula

    );


    recalcularProgressoDisciplina(
        idDisciplina
    );


    salvarDadosProgresso();


    dispararEventoProgresso(

        idDisciplina,

        idAula

    );

}


// =====================================
// PROGRESSO DA AULA
// =====================================

function obterProgressoAula(
    idDisciplina,
    idAula
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    const aula =
        normalizarIdentificador(
            idAula
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ]
    ) {

        return 0;

    }


    return (

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .aulas[
                aula
            ]
            .progresso || 0

    );

}


// =====================================
// PROGRESSO DA DISCIPLINA
// =====================================

function obterProgressoDisciplina(
    idDisciplina
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ]
    ) {

        return 0;

    }


    return (

        dadosProgresso
            .disciplinas[
                disciplina
            ]
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


    const disciplinas =
        Object.values(
            dadosProgresso.disciplinas
        );


    if (disciplinas.length === 0) {

        return 0;

    }


    let soma = 0;


    disciplinas.forEach(
        disciplina => {

            soma +=
                disciplina.progresso || 0;

        }
    );


    return Math.round(

        soma /
        disciplinas.length

    );

}


// =====================================
// CRIAR CONTROLE DO TÓPICO
// =====================================

function criarControleDoTopico(
    elementoTopico,
    idTopico
) {

    let controle =
        elementoTopico.querySelector(
            ".controle-progresso-topico"
        );


    if (controle) {

        return controle;

    }


    controle =
        document.createElement(
            "div"
        );


    controle.className =
        "controle-progresso-topico";


    const botao =
        document.createElement(
            "button"
        );


    botao.type =
        "button";


    botao.className =
        "botao-topico-estudado";


    botao.dataset.topicoId =
        idTopico;


    botao.setAttribute(
        "aria-pressed",
        "false"
    );


    botao.addEventListener(
        "click",
        function () {

            alternarTopicoEstudado(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );

        }
    );


    controle.appendChild(
        botao
    );


    elementoTopico.appendChild(
        controle
    );


    return controle;

}


// =====================================
// INSERIR BOTÕES AUTOMATICAMENTE
// =====================================

function inserirBotoesDosTopicos() {

    const topicos =
        obterTopicosDaPagina();


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            criarControleDoTopico(

                elementoTopico,

                idTopico

            );

        }
    );

}


// =====================================
// ATUALIZAR BOTÕES DOS TÓPICOS
// =====================================

function atualizarBotoesDosTopicos() {

    const botoes =
        document.querySelectorAll(
            ".botao-topico-estudado"
        );


    botoes.forEach(
        botao => {

            const idTopico =
                botao.dataset.topicoId;


            const concluido =
                topicoFoiEstudado(

                    aulaAtual.disciplina,

                    aulaAtual.aula,

                    idTopico

                );


            if (concluido) {

                botao.textContent =
                    "✓ Tópico estudado";


                botao.classList.add(
                    "topico-concluido"
                );


                botao.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }
            else {

                botao.textContent =
                    "Marcar tópico como estudado";


                botao.classList.remove(
                    "topico-concluido"
                );


                botao.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }
    );

}


// =====================================
// DESTACAR TÓPICOS CONCLUÍDOS
// =====================================

function atualizarEstadoDosTopicos() {

    const topicos =
        obterTopicosDaPagina();


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            const concluido =
                topicoFoiEstudado(

                    aulaAtual.disciplina,

                    aulaAtual.aula,

                    idTopico

                );


            elementoTopico.classList.toggle(

                "topico-estudado",

                concluido

            );

        }
    );

}


// =====================================
// ATUALIZAR PROGRESSO VISUAL DA AULA
// =====================================

function atualizarProgressoVisualAula() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return;

    }


    const percentual =
        obterProgressoAula(

            aulaAtual.disciplina,

            aulaAtual.aula

        );


    const barra =
        document.getElementById(
            "barra-progresso-aula"
        );


    const texto =
        document.getElementById(
            "texto-progresso-aula"
        );


    if (barra) {

        barra.style.width =
            percentual + "%";


        barra.setAttribute(
            "aria-valuenow",
            percentual
        );

    }


    if (texto) {

        texto.textContent =
            percentual +
            "% da aula concluída";

    }

}


// =====================================
// ATUALIZAR PROGRESSO GERAL VISUAL
// =====================================

function atualizarProgressoVisualGeral() {

    const percentual =
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
            percentual + "%";


        barra.setAttribute(
            "aria-valuenow",
            percentual
        );

    }


    if (texto) {

        texto.textContent =
            percentual +
            "% concluído";

    }

}


// =====================================
// ATUALIZAR INTERFACE DA AULA
// =====================================

function atualizarInterfaceAula() {

    atualizarBotoesDosTopicos();


    atualizarEstadoDosTopicos();


    atualizarProgressoVisualAula();


    atualizarProgressoVisualGeral();

}


// =====================================
// EVENTO DE ATUALIZAÇÃO
// =====================================

function dispararEventoProgresso(
    idDisciplina,
    idAula
) {

    document.dispatchEvent(

        new CustomEvent(

            "progressoPSCPPAtualizado",

            {

                detail: {

                    disciplina:
                        idDisciplina,

                    aula:
                        idAula,

                    progressoAula:
                        obterProgressoAula(
                            idDisciplina,
                            idAula
                        ),

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
// IR AO PRIMEIRO TÓPICO PENDENTE
// =====================================

function localizarPrimeiroTopicoPendente() {

    const topicos =
        obterTopicosDaPagina();


    for (
        let indice = 0;
        indice < topicos.length;
        indice++
    ) {

        const elementoTopico =
            topicos[indice];


        const idTopico =
            obterIdDoTopico(
                elementoTopico,
                indice
            );


        const concluido =
            topicoFoiEstudado(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );


        if (!concluido) {

            return elementoTopico;

        }

    }


    return null;

}


// =====================================
// ROLAR ATÉ ONDE O ESTUDO PAROU
// =====================================

function irParaOndeParei() {

    const primeiroPendente =
        localizarPrimeiroTopicoPendente();


    if (!primeiroPendente) {

        window.alert(
            "Todos os tópicos desta aula já foram estudados."
        );


        return;

    }


    primeiroPendente.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });


    primeiroPendente.classList.add(
        "topico-destacado"
    );


    window.setTimeout(
        function () {

            primeiroPendente.classList.remove(
                "topico-destacado"
            );

        },
        2500
    );

}


// =====================================
// INICIALIZAR AULA
// =====================================

async function inicializarProgressoAula() {

    await carregarDadosProgresso();


    const aulaIdentificada =
        identificarAulaAtual();


    if (!aulaIdentificada) {

        atualizarProgressoVisualGeral();


        return;

    }


    registrarTopicosDaAula();


    inserirBotoesDosTopicos();


    atualizarInterfaceAula();

}


// =====================================
// LIMPAR TODO O PROGRESSO
// =====================================

function limparTodoProgresso() {

    const confirmar =
        window.confirm(

            "Deseja realmente apagar todo " +
            "o progresso de estudo salvo neste tablet?"

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

    function () {

        inicializarProgressoAula();

    }

);


// =====================================
// FIM DO SISTEMA DE PROGRESSO v4.0
// =====================================
