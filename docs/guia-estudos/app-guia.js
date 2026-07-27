// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE INTELIGENTE v3.0
// Bridge Trainer PSCPP
// =====================================


// =====================================
// VARIÁVEIS PRINCIPAIS
// =====================================
console.log("APP GUIA CARREGADO");

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
// PROCESSAMENTO DO BANCO DE CONTEÚDO
// =====================================


function processarConteudo(){


    if(typeof conteudoPSCPP === "undefined"){

        console.error(
        "Banco de conteúdo PSCPP não encontrado."
        );

        return;

    }



    totalDisciplinas =
    Object.keys(conteudoPSCPP).length;



    for(let disciplina in conteudoPSCPP){


        let dadosDisciplina =
        conteudoPSCPP[disciplina];



        let assuntos =
        dadosDisciplina.assuntos || [];



        assuntos.forEach(assunto => {



            totalAssuntos++;


            totalHoras += assunto.horas;



            let pesoAssunto =
            assunto.horas *
            assunto.peso;



            pesoTotal += pesoAssunto;




            if(
                assunto.status === "Concluído" ||
                assunto.status === "Dominado"
            ){


                assuntosConcluidos++;

                horasConcluidas += assunto.horas;

                pesoConcluido += pesoAssunto;


            }




            // ============================
            // RECOMENDAÇÃO INTELIGENTE
            // ============================


            if(
                assunto.status !== "Concluído" &&
                assunto.status !== "Dominado"
            ){



                let prioridadeAtual =

                assunto.peso *
                (dadosDisciplina.pesoDisciplina || 1);



                if(
                    prioridadeAtual >
                    maiorPrioridade
                ){


                    maiorPrioridade =
                    prioridadeAtual;



                    proximoEstudo = {


                        disciplina:
                        dadosDisciplina.nome,


                        assunto:
                        assunto.nome,


                        peso:
                        assunto.peso,


                        horas:
                        assunto.horas,


                        status:
                        assunto.status


                    };


                }


            }



        });



    }



}





// =====================================
// CÁLCULO DO PROGRESSO
// =====================================


function calcularProgresso(){


    if(pesoTotal === 0){

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


function atualizarElemento(id, valor){


    let elemento =
    document.getElementById(id);



    if(elemento){

        elemento.innerHTML =
        valor;

    }


}





// =====================================
// CRIA CARDS INTELIGENTES
// =====================================


function criarPainelInteligente(){


    let progresso =
    calcularProgresso();



    let dashboard =
    document.querySelector(".dashboard");



    if(!dashboard){

        return;

    }



    let cards =
    dashboard.querySelector(".cards");



    if(!cards){

        return;

    }





    let progressoBox =
    document.createElement("div");


    progressoBox.className =
    "card";



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




    if(proximoEstudo){


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
    else{


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



// =====================================
// FIM APP-GUIA v3.0
// =====================================
