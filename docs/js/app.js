/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS v2.0
   Dashboard Integrado com Progresso
===================================================== */


document.addEventListener(
"DOMContentLoaded",
iniciarDashboard
);



/* =====================================================
   INICIALIZAÇÃO
===================================================== */


async function iniciarDashboard(){


    if(typeof carregarDadosProgresso === "function"){


        await carregarDadosProgresso();


    }


    atualizarDashboard();



}




/* =====================================================
   ATUALIZA DASHBOARD PRINCIPAL
===================================================== */


function atualizarDashboard(){


    const disciplinas = obterListaProgresso();


    calcularProgressoGeral(
        disciplinas
    );


}





/* =====================================================
   LISTA DE PROGRESSO
===================================================== */


function obterListaProgresso(){


return [


    obterProgressoDisciplina(
        "arte-naval"
    ),


    obterProgressoDisciplina(
        "manobrabilidade"
    ),


    obterProgressoDisciplina(
        "navegacao"
    ),


    obterProgressoDisciplina(
        "meteorologia"
    ),


    obterProgressoDisciplina(
        "regulamentacao"
    ),


    obterProgressoDisciplina(
        "comunicacoes"
    ),


    obterProgressoDisciplina(
        "conhecimentos-gerais"
    )


];


}





/* =====================================================
   PROGRESSO GERAL
===================================================== */


function calcularProgressoGeral(lista){


    let soma = 0;



    lista.forEach(valor => {


        soma += valor || 0;


    });



    let media = Math.round(
        soma / lista.length
    );



    const barra =
    document.getElementById(
        "progresso-geral"
    );



    const texto =
    document.getElementById(
        "porcentagem-geral"
    );



    if(barra){


        barra.style.width =
        media + "%";


    }



    if(texto){


        texto.textContent =
        media + "%";


    }



    atualizarMiniBarras(lista);


}





/* =====================================================
   BARRAS DAS DISCIPLINAS
===================================================== */


function atualizarMiniBarras(lista){


    const barras =
    document.querySelectorAll(
        ".mini-progresso"
    );


    const textos =
    document.querySelectorAll(
        ".card span"
    );



    barras.forEach(
    (barra, indice)=>{


        let valor =
        lista[indice] || 0;



        barra.style.width =
        valor + "%";



        if(textos[indice]){


            textos[indice].textContent =
            valor + "%";


        }



    });



}





/* =====================================================
   FUNÇÕES FUTURAS
===================================================== */


function salvarProgresso(){

    console.log(
    "Salvar progresso - aguardando implementação"
    );

}



function atualizarMetas(){

}



function ultimaAula(){

}



function revisar(){

}



/* =====================================================
   FIM APP.JS v2.0
===================================================== */
