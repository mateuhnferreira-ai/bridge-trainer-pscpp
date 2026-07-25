// =====================================
// MOTOR DE PLANEJAMENTO PSCPP
// =====================================


function gerarPlanoEstudo(){


let plano = [];



for(let disciplina in conteudoPSCPP){


    let assuntos = conteudoPSCPP[disciplina].assuntos;



    assuntos.forEach(assunto => {



        if(assunto.status !== "Concluído"){


            plano.push({

                disciplina:
                conteudoPSCPP[disciplina].nome,


                assunto:
                assunto.nome,


                horas:
                assunto.horas,


                importancia:
                assunto.importancia


            });


        }


    });



}



return plano;


}
