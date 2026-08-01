// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v2.1
// Bridge Trainer PSCPP
//
// A partir da v2.1, o motor não lê mais assunto.status
// (campo removido do banco-conteudo.js). O que já foi
// concluído agora é verificado em tempo real via
// obterProgressoAula(), do progresso.js — que precisa
// estar carregado ANTES deste script na página.
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



        const percentualConcluido =
        (typeof obterProgressoAula === "function")
            ? obterProgressoAula(disciplina, assunto.id)
            : 0;



        if(percentualConcluido < 100){



            let pesoDisciplina =
            dadosDisciplina.pesoDisciplina || 1;



            let pesoAssunto =
            assunto.peso || 1;



            let prioridadeConfiguracao = 1;



            if(
                configuracaoEstudo &&
                configuracaoEstudo.pesosPrioridade &&
                configuracaoEstudo.pesosPrioridade[dadosDisciplina.nome]
            ){


                prioridadeConfiguracao =
                configuracaoEstudo.pesosPrioridade[dadosDisciplina.nome];


            }




            let prioridade =
            pesoDisciplina *
            pesoAssunto *
            prioridadeConfiguracao;





            plano.push({


                idDisciplina:
                disciplina,



                idAssunto:
                assunto.id,



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
                prioridade,



                percentualConcluido:
                percentualConcluido



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
