// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE INTELIGENTE v2.0
// =====================================


let totalDisciplinas = Object.keys(conteudoPSCPP).length;


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
// LEITURA DO BANCO DE CONTEÚDO
// =====================================


for (let disciplina in conteudoPSCPP) {


    let dadosDisciplina = conteudoPSCPP[disciplina];


    let assuntos = dadosDisciplina.assuntos;



    assuntos.forEach(assunto => {



        totalAssuntos++;


        totalHoras += assunto.horas;



        let pesoAssunto =
        assunto.horas * assunto.peso;



        pesoTotal += pesoAssunto;




        if (
            assunto.status === "Concluído" ||
            assunto.status === "Dominado"
        ) {


            assuntosConcluidos++;

            horasConcluidas += assunto.horas;

            pesoConcluido += pesoAssunto;


        }





        // Busca próximo estudo recomendado

        if (
            assunto.status !== "Concluído" &&
            assunto.status !== "Dominado"
        ) {



            let prioridadeAtual =
            assunto.peso *
            (dadosDisciplina.pesoDisciplina || 1);



            if (
                prioridadeAtual > maiorPrioridade
            ) {


                maiorPrioridade = prioridadeAtual;


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




// =====================================
// CÁLCULO DE PROGRESSO
// =====================================


let progresso = 0;


if (pesoTotal > 0) {


    progresso =
    Math.round(
        (pesoConcluido / pesoTotal) * 100
    );


}




// =====================================
// ATUALIZAÇÃO DOS CARDS PRINCIPAIS
// =====================================



function atualizarElemento(id, valor){


    let elemento =
    document.getElementById(id);


    if(elemento){

        elemento.innerHTML = valor;

    }


}



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





// =====================================
// CRIA PAINEL INTELIGENTE
// =====================================


let dashboard =
document.querySelector(".dashboard");



if(dashboard){



    let cards =
    dashboard.querySelector(".cards");



    if(cards){



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
            ${proximoEstudo.horas} horas
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


}
