// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE INTELIGENTE v4.0
// Bridge Trainer PSCPP
//
// A partir da v4.0, o status de cada assunto
// (Não iniciado / Em estudo / Concluído) não vem mais
// do banco-conteudo.js — é calculado em tempo real a
// partir do progresso salvo por progresso.js
// (obterProgressoAula), usando o campo "id" de cada
// assunto como idAula.
// =====================================


console.log("APP GUIA CARREGADO");


// =====================================
// VARIÁVEIS PRINCIPAIS
// =====================================

let totalDisciplinas = 0;

let totalAssuntos = 0;

let totalHoras = 0;

let assuntosConcluidos = 0;

let horasConcluidas = 0;


// Controle estratégico

let pesoTotal = 0;

let pesoConcluido = 0;


// Recomendação

let proximoEstudo = null;

let maiorPrioridade = 0;


// =====================================
// STATUS REAL DE UM ASSUNTO
// =====================================
//
// Consulta progresso.js (já carregado antes deste
// script) para saber o percentual real de conclusão
// do assunto, usando idDisciplina + assunto.id.

function obterStatusRealDoAssunto(
    idDisciplina,
    assunto
) {

    const percentual =
        obterProgressoAula(

            idDisciplina,

            assunto.id

        );


    if (percentual >= 100) {

        return "Concluído";

    }


    if (percentual > 0) {

        return "Em estudo";

    }


    return "Não iniciado";

}


// =====================================
// PROCESSAMENTO DO BANCO DE CONTEÚDO
// =====================================

function processarConteudo() {


    if (typeof conteudoPSCPP === "undefined") {

        console.error(
            "Banco de conteúdo PSCPP não encontrado."
        );

        return;

    }


    // Reinicia os acumuladores — importante caso esta
    // função seja chamada mais de uma vez (ex: após o
    // usuário marcar um tópico como estudado em outra aba)
    totalDisciplinas = 0;

    totalAssuntos = 0;

    totalHoras = 0;

    assuntosConcluidos = 0;

    horasConcluidas = 0;

    pesoTotal = 0;

    pesoConcluido = 0;

    proximoEstudo = null;

    maiorPrioridade = 0;


    totalDisciplinas =
        Object.keys(conteudoPSCPP).length;


    for (let idDisciplina in conteudoPSCPP) {


        let dadosDisciplina =
            conteudoPSCPP[idDisciplina];


        let assuntos =
            dadosDisciplina.assuntos || [];


        assuntos.forEach(assunto => {


            totalAssuntos++;


            totalHoras += assunto.horas;


            let pesoAssunto =
                assunto.horas *
                assunto.peso;


            pesoTotal += pesoAssunto;


            const statusReal =
                obterStatusRealDoAssunto(

                    idDisciplina,

                    assunto

                );


            if (statusReal === "Concluído") {


                assuntosConcluidos++;

                horasConcluidas += assunto.horas;

                pesoConcluido += pesoAssunto;


            }


            // ============================
            // RECOMENDAÇÃO INTELIGENTE
            // ============================

            if (statusReal !== "Concluído") {


                let prioridadeAtual =

                    assunto.peso *
                    (dadosDisciplina.pesoDisciplina || 1);


                if (
                    prioridadeAtual >
                    maiorPrioridade
                ) {


                    maiorPrioridade =
                        prioridadeAtual;


                    proximoEstudo = {


                        idDisciplina:
                            idDisciplina,

                        idAssunto:
                            assunto.id,

                        disciplina:
                            dadosDisciplina.nome,

                        assunto:
                            assunto.nome,

                        peso:
                            assunto.peso,

                        horas:
                            assunto.horas,

                        status:
                            statusReal

                    };


                }


            }


        });


    }


}


// =====================================
// CÁLCULO DO PROGRESSO
// =====================================

function calcularProgressoEstrategico() {


    if (pesoTotal === 0) {

        return 0;

    }


    return Math.round(

        (pesoConcluido /
        pesoTotal) * 100

    );


}


// =====================================
// ATUALIZA ELEMENTOS HTML
// =====================================

function atualizarElemento(id, valor) {


    let elemento =
        document.getElementById(id);


    if (elemento) {

        elemento.innerHTML =
            valor;

    }


}


// =====================================
// CRIA CARDS INTELIGENTES
// =====================================

function criarPainelInteligente() {


    let progresso =
        calcularProgressoEstrategico();


    let dashboard =
        document.querySelector(".dashboard");


    if (!dashboard) {

        return;

    }


    let cards =
        dashboard.querySelector(".cards");


    if (!cards) {

        return;

    }


    // Remove painéis inteligentes de uma execução
    // anterior, para não duplicar cards ao reprocessar
    const paineisAntigos =
        cards.querySelectorAll(
            "[data-painel-inteligente]"
        );

    paineisAntigos.forEach(
        painel => painel.remove()
    );


    let progressoBox =
        document.createElement("div");


    progressoBox.className =
        "card";

    progressoBox.dataset.painelInteligente =
        "progresso";


    progressoBox.innerHTML = `

    <h3>
    📈 Progresso Estratégico
    </h3>

    <p>
    ${progresso}% concluído
    </p>

    <p>
    ${assuntosConcluidos}
    de
    ${totalAssuntos}
    assuntos
    </p>

    <p>
    ${horasConcluidas}h estudadas
    </p>

    `;


    cards.appendChild(progressoBox);


    let focoBox =
        document.createElement("div");


    focoBox.className =
        "card";

    focoBox.dataset.painelInteligente =
        "foco";


    if (proximoEstudo) {


        focoBox.innerHTML = `


        <h3>
        🎯 Próximo Foco
        </h3>


        <p>
        <strong>
        ${proximoEstudo.disciplina}
        </strong>
        </p>


        <p>
        ${proximoEstudo.assunto}
        </p>


        <p>
        Peso:
        ${proximoEstudo.peso}
        </p>


        <p>
        Carga:
        ${proximoEstudo.horas}
        horas
        </p>


        `;


    }
    else {


        focoBox.innerHTML = `


        <h3>
        🎯 Próximo Foco
        </h3>


        <p>
        Todos os assuntos concluídos.
        </p>


        `;


    }


    cards.appendChild(focoBox);


}


// =====================================
// INICIALIZAÇÃO
// =====================================
//
// carregarDadosProgresso() é assíncrona (lê localStorage
// ou busca data/progresso.json). É preciso esperar essa
// promessa resolver antes de processar o conteúdo —
// senão dadosProgresso ainda estará vazio e todo assunto
// apareceria como "Não iniciado" mesmo com progresso
// real salvo.

async function inicializarGuiaDeEstudos() {


    if (typeof carregarDadosProgresso !== "function") {

        console.error(
            "progresso.js não foi carregado antes de " +
            "app-guia.js. Inclua <script src=\"../js/progresso.js\">" +
            " antes deste arquivo."
        );

        return;

    }


    await carregarDadosProgresso();


    processarConteudo();


    atualizarElemento(
        "total-disciplinas",
        totalDisciplinas
    );


    atualizarElemento(
        "total-assuntos",
        totalAssuntos
    );


    atualizarElemento(
        "total-horas",
        totalHoras + " horas"
    );


    criarPainelInteligente();


}


document.addEventListener(
    "DOMContentLoaded",
    inicializarGuiaDeEstudos
);


// =====================================
// FIM APP-GUIA v4.0
// =====================================
