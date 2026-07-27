// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v2.0
// Bridge Trainer PSCPP
// =====================================


function gerarPlanoEstudo(){


let plano = [];



// Percorre banco de conteúdo


for(let disciplina in conteudoPSCPP){



    let dadosDisciplina =
    conteudoPSCPP[disciplina];



    let assuntos =
    dadosDisciplina.assuntos;




    assuntos.forEach(assunto => {



        if(
            assunto.status !== "Concluído" &&
            assunto.status !== "Dominado"
        ){



            let pesoDisciplina =
            dadosDisciplina.pesoDisciplina || 1;



            let pesoAssunto =
            assunto.peso || 1;



            let prioridade =
            pesoDisciplina *
            pesoAssunto;




            plano.push({


                disciplina:
                dadosDisciplina.nome,



                assunto:
                assunto.nome,



                horas:
                assunto.horas,



                importancia:
                assunto.importancia,



                pesoDisciplina:
                pesoDisciplina,



                pesoAssunto:
                pesoAssunto,



                prioridade:
                prioridade



            });



        }



    });



}



// Ordenação:
// maior prioridade primeiro


plano.sort(
(a,b) =>
b.prioridade - a.prioridade
);



return plano;



}
