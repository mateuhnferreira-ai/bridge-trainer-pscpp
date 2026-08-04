// =====================================
// CENTRO DE DESEMPENHO PSCPP
// Bridge Trainer PSCPP
// Versão 1.0
// =====================================



// =====================================
// CONFIGURAÇÕES
// =====================================

const CHAVE_HISTORICO_EXERCICIOS =
    "bridgeTrainerPSCPP_historicoExercicios";



let historicoExercicios = [];



// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        iniciarCentroDesempenho();

    }

);



// =====================================
// INICIAR MÓDULO
// =====================================

function iniciarCentroDesempenho(){


    carregarHistorico();


    atualizarResumoGeral();


    atualizarPreparacaoPSCPP();


    atualizarDesempenhoDisciplinas();


    atualizarDesempenhoAulas();


    atualizarDesempenhoTopicos();


    atualizarAssuntosPrioritarios();


    atualizarEvolucao();


    atualizarRecomendacao();


}



// =====================================
// CARREGAR HISTÓRICO
// =====================================

function carregarHistorico(){


    try{


        const dados =

            localStorage.getItem(

                CHAVE_HISTORICO_EXERCICIOS

            );


        if(dados){


            historicoExercicios =

                JSON.parse(dados);


        }else{


            historicoExercicios = [];


        }


    }

    catch(erro){


        console.error(

            "Erro ao carregar histórico:",

            erro

        );


        historicoExercicios = [];


    }


}



// =====================================
// FUNÇÕES AUXILIARES
// =====================================

function atualizarTexto(

    id,

    texto

){

    const elemento =

        document.getElementById(id);


    if(elemento){

        elemento.textContent = texto;

    }

}



function atualizarHTML(

    id,

    html

){

    const elemento =

        document.getElementById(id);


    if(elemento){

        elemento.innerHTML = html;

    }

}



function limparElemento(id){

    atualizarHTML(

        id,

        ""

    );

}



function formatarPercentual(valor){


    if(

        isNaN(valor)

    ){

        return "0%";

    }


    return

        valor.toFixed(1) + "%";


}



function formatarData(data){


    if(

        !data

    ){

        return "--";

    }


    const d =

        new Date(data);


    if(

        isNaN(d)

    ){

        return "--";

    }


    return d.toLocaleDateString(

        "pt-BR"

    );


}



// =====================================
// TOTAIS GERAIS
// =====================================

function obterTotalQuestoes(){


    return historicoExercicios.length;


}



function obterTotalAcertos(){


    return historicoExercicios.filter(

        q => q.acertou

    ).length;


}



function obterTotalErros(){


    return historicoExercicios.filter(

        q => !q.acertou

    ).length;


}



function obterAproveitamentoGeral(){


    const total =

        obterTotalQuestoes();


    if(total===0){

        return 0;

    }


    return (

        obterTotalAcertos()

        /

        total

    ) *100;


        }

// =====================================
// RESUMO GERAL
// =====================================

function atualizarResumoGeral(){


    const totalQuestoes =
        obterTotalQuestoes();


    const totalAcertos =
        obterTotalAcertos();


    const totalErros =
        obterTotalErros();


    const aproveitamento =
        obterAproveitamentoGeral();


    atualizarTexto(

        "desempenho-total-questoes",

        totalQuestoes

    );


    atualizarTexto(

        "desempenho-total-acertos",

        totalAcertos

    );


    atualizarTexto(

        "desempenho-total-erros",

        totalErros

    );


    atualizarTexto(

        "desempenho-aproveitamento-geral",

        formatarPercentual(

            aproveitamento

        )

    );


    atualizarTexto(

        "desempenho-total-tentativas",

        totalQuestoes

    );


    atualizarTexto(

        "desempenho-ultima-atividade",

        obterUltimaAtividade()

    );


}



// =====================================
// ÚLTIMA ATIVIDADE
// =====================================

function obterUltimaAtividade(){


    if(

        historicoExercicios.length===0

    ){

        return "--";

    }


    const ultima =

        historicoExercicios[

            historicoExercicios.length-1

        ];


    return formatarData(

        ultima.data

    );


}



// =====================================
// PREPARAÇÃO PSCPP
// =====================================

function atualizarPreparacaoPSCPP(){


    atualizarTexto(

        "preparacao-questoes",

        obterTotalQuestoes()

    );


    atualizarTexto(

        "preparacao-acertos",

        obterTotalAcertos()

    );


    atualizarTexto(

        "preparacao-erros",

        obterTotalErros()

    );


    atualizarTexto(

        "preparacao-percentual",

        formatarPercentual(

            obterAproveitamentoGeral()

        )

    );


        }

// =====================================
// DESEMPENHO POR DISCIPLINA
// =====================================

function atualizarDesempenhoDisciplinas(){


    const lista = {};



    historicoExercicios.forEach(registro=>{


        const disciplina =

            registro.disciplina ||

            "Não informada";



        if(!lista[disciplina]){

            lista[disciplina]={

                total:0,

                acertos:0

            };

        }



        lista[disciplina].total++;



        if(registro.acertou){

            lista[disciplina].acertos++;

        }


    });



    let html="";



    const disciplinas =

        Object.keys(lista);



    if(

        disciplinas.length===0

    ){

        html="<p>Nenhum exercício respondido.</p>";

    }



    disciplinas.forEach(disciplina=>{


        const dados =

            lista[disciplina];



        const percentual =

            (dados.acertos/dados.total)*100;



        html += `

<div class="item-desempenho">

<strong>${disciplina}</strong>

<br>

Questões:
${dados.total}

&nbsp;&nbsp;|&nbsp;&nbsp;

Acertos:
${dados.acertos}

&nbsp;&nbsp;|&nbsp;&nbsp;

${formatarPercentual(percentual)}

</div>

`;



    });



    atualizarHTML(

        "lista-desempenho-disciplinas",

        html

    );


}



// =====================================
// DESEMPENHO POR AULA
// =====================================

function atualizarDesempenhoAulas(){


    const lista={};



    historicoExercicios.forEach(registro=>{


        const aula=

            registro.aula ||

            "Não informada";



        if(!lista[aula]){

            lista[aula]={

                total:0,

                acertos:0

            };

        }



        lista[aula].total++;



        if(registro.acertou){

            lista[aula].acertos++;

        }


    });



    let html="";



    const aulas=

        Object.keys(lista);



    if(aulas.length===0){

        html="<p>Nenhuma aula registrada.</p>";

    }



    aulas.forEach(aula=>{


        const dados=

            lista[aula];



        const percentual=

            (dados.acertos/dados.total)*100;



        html += `

<div class="item-desempenho">

<strong>${aula}</strong>

<br>

Questões:
${dados.total}

&nbsp;&nbsp;|&nbsp;&nbsp;

Acertos:
${dados.acertos}

&nbsp;&nbsp;|&nbsp;&nbsp;

${formatarPercentual(percentual)}

</div>

`;



    });



    atualizarHTML(

        "lista-desempenho-aulas",

        html

    );


        }

// =====================================
// DESEMPENHO POR TÓPICO
// =====================================

function atualizarDesempenhoTopicos() {

    const lista = {};

    historicoExercicios.forEach(registro => {

        const topico =
            registro.topico || "Não informado";

        if (!lista[topico]) {

            lista[topico] = {

                total: 0,

                acertos: 0

            };

        }

        lista[topico].total++;

        if (registro.acertou) {

            lista[topico].acertos++;

        }

    });

    let html = "";

    const topicos = Object.keys(lista);

    if (topicos.length === 0) {

        html = "<p>Nenhum tópico registrado.</p>";

    }

    topicos.forEach(topico => {

        const dados = lista[topico];

        const percentual =
            (dados.acertos / dados.total) * 100;

        html += `

<div class="item-desempenho">

<strong>${topico}</strong>

<br>

Questões: ${dados.total}

&nbsp;&nbsp;|&nbsp;&nbsp;

Acertos: ${dados.acertos}

&nbsp;&nbsp;|&nbsp;&nbsp;

${formatarPercentual(percentual)}

</div>

`;

    });

    atualizarHTML(

        "lista-desempenho-topicos",

        html

    );

}



// =====================================
// ASSUNTOS PRIORITÁRIOS
// =====================================

function atualizarAssuntosPrioritarios() {

    const lista = {};

    historicoExercicios.forEach(registro => {

        const topico =
            registro.topico || "Não informado";

        if (!lista[topico]) {

            lista[topico] = {

                total: 0,

                acertos: 0

            };

        }

        lista[topico].total++;

        if (registro.acertou) {

            lista[topico].acertos++;

        }

    });

    let prioridades = [];

    Object.keys(lista).forEach(topico => {

        const dados = lista[topico];

        prioridades.push({

            topico: topico,

            percentual:
                (dados.acertos / dados.total) * 100,

            total: dados.total

        });

    });

    prioridades.sort(

        (a, b) =>

        a.percentual - b.percentual

    );

    let html = "";

    if (prioridades.length === 0) {

        html = "<p>Nenhum dado disponível.</p>";

    }

    prioridades.forEach(item => {

        html += `

<div class="item-desempenho">

<strong>${item.topico}</strong>

<br>

${formatarPercentual(item.percentual)}

(${item.total} questões)

</div>

`;

    });

    atualizarHTML(

        "lista-assuntos-prioritarios",

        html

    );

}



// =====================================
// EVOLUÇÃO DO DESEMPENHO
// =====================================

function atualizarEvolucao() {

    let html = "";

    if (historicoExercicios.length === 0) {

        html = "<p>Sem histórico suficiente.</p>";

    }

    else {

        const ultimos =

            historicoExercicios.slice(-10);

        let acertos = 0;

        ultimos.forEach(item => {

            if (item.acertou) {

                acertos++;

            }

        });

        const percentual =

            (acertos / ultimos.length) * 100;

        html = `

<div class="item-desempenho">

Últimas ${ultimos.length} questões

<br>

Acertos: ${acertos}

<br>

Aproveitamento:

<strong>

${formatarPercentual(percentual)}

</strong>

</div>

`;

    }

    atualizarHTML(

        "lista-evolucao-desempenho",

        html

    );

}



// =====================================
// RECOMENDAÇÃO AUTOMÁTICA
// =====================================

function atualizarRecomendacao() {

    const lista = {};

    historicoExercicios.forEach(registro => {

        const topico =
            registro.topico || "Não informado";

        if (!lista[topico]) {

            lista[topico] = {

                total: 0,

                acertos: 0

            };

        }

        lista[topico].total++;

        if (registro.acertou) {

            lista[topico].acertos++;

        }

    });

    let piorTopico = null;

    let piorPercentual = 101;

    Object.keys(lista).forEach(topico => {

        const dados = lista[topico];

        const percentual =

            (dados.acertos / dados.total) * 100;

        if (percentual < piorPercentual) {

            piorPercentual = percentual;

            piorTopico = topico;

        }

    });

    if (!piorTopico) {

        atualizarTexto(

            "texto-recomendacao-desempenho",

            "Resolva exercícios para gerar recomendações."

        );

        return;

    }

    atualizarTexto(

        "texto-recomendacao-desempenho",

        `Priorize a revisão do tópico "${piorTopico}", cujo desempenho atual é ${formatarPercentual(piorPercentual)}.`

    );

        }
// =====================================
// ATUALIZAÇÃO AUTOMÁTICA
// =====================================

function atualizarCentroDesempenho(){

    carregarHistorico();

    atualizarResumoGeral();

    atualizarPreparacaoPSCPP();

    atualizarDesempenhoDisciplinas();

    atualizarDesempenhoAulas();

    atualizarDesempenhoTopicos();

    atualizarAssuntosPrioritarios();

    atualizarEvolucao();

    atualizarRecomendacao();

}



// =====================================
// ATUALIZAÇÃO EXTERNA
// =====================================

window.atualizarCentroDesempenho =

    atualizarCentroDesempenho;



// =====================================
// UTILIDADES
// =====================================

function existeHistorico(){

    return historicoExercicios.length > 0;

}



function obterHistorico(){

    return historicoExercicios;

}



// =====================================
// DEPURAÇÃO
// =====================================

function exibirResumoConsole(){

    console.group(

        "Centro de Desempenho"

    );

    console.log(

        "Questões:",

        obterTotalQuestoes()

    );

    console.log(

        "Acertos:",

        obterTotalAcertos()

    );

    console.log(

        "Erros:",

        obterTotalErros()

    );

    console.log(

        "Aproveitamento:",

        formatarPercentual(

            obterAproveitamentoGeral()

        )

    );

    console.groupEnd();

}



// =====================================
// FIM DO ARQUIVO
// =====================================
