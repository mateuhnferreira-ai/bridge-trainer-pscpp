// =====================================
// CENTRO DE DESEMPENHO PSCPP
// Bridge Trainer PSCPP
// Versão 1.0
// =====================================


// =====================================
// CONFIGURAÇÃO
// =====================================

const CHAVE_HISTORICO_EXERCICIOS =
    "bridgeTrainerPSCPP_historicoExercicios";


// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    iniciarCentroDesempenho

);


// =====================================
// INICIAR
// =====================================

function iniciarCentroDesempenho(){


    const historico =
    carregarHistorico();


    atualizarResumoGeral(
        historico
    );


    atualizarPreparacaoPSCPP(
        historico
    );


}

// =====================================
// CARREGAR HISTÓRICO
// =====================================

function carregarHistorico(){


    const dados =
    localStorage.getItem(
        CHAVE_HISTORICO_EXERCICIOS
    );


    if(!dados){

        return [];

    }


    try{

        return JSON.parse(dados);

    }

    catch(e){

        console.error(e);

        return [];

    }

}

// =====================================
// RESUMO GERAL
// =====================================

function atualizarResumoGeral(historico){


    let questoes = 0;

    let acertos = 0;

    let erros = 0;


    historico.forEach(tentativa=>{

        questoes += tentativa.total;

        acertos += tentativa.acertos;

        erros += tentativa.erros;

    });


    let percentual = 0;


    if(questoes>0){

        percentual =
        (acertos/questoes)*100;

    }


    atualizarTexto(

        "desempenho-total-questoes",

        questoes

    );


    atualizarTexto(

        "desempenho-total-acertos",

        acertos

    );


    atualizarTexto(

        "desempenho-total-erros",

        erros

    );


    atualizarTexto(

        "desempenho-total-tentativas",

        historico.length

    );


    atualizarTexto(

        "desempenho-aproveitamento-geral",

        percentual.toFixed(1)+"%"

    );


    if(historico.length>0){

        const ultima =
        historico[historico.length-1];


        atualizarTexto(

            "desempenho-ultima-atividade",

            formatarData(

                ultima.data

            )

        );

    }

      }
