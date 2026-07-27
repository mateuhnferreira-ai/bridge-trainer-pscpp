// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE INTELIGENTE
// =====================================


let totalDisciplinas = Object.keys(conteudoPSCPP).length;


let totalAssuntos = 0;

let totalHoras = 0;

let assuntosConcluidos = 0;

let horasConcluidas = 0;



// Percorre banco de conteúdo

for (let disciplina in conteudoPSCPP) {


    let assuntos = conteudoPSCPP[disciplina].assuntos;


    totalAssuntos += assuntos.length;



    assuntos.forEach(assunto => {


        totalHoras += assunto.horas;



        if (
            assunto.status === "Concluído" ||
            assunto.status === "Dominado"
        ) {

            assuntosConcluidos++;

            horasConcluidas += assunto.horas;

        }


    });


}



// Calcula progresso


let progresso = 0;


if (totalAssuntos > 0) {

    progresso = Math.round(
        (assuntosConcluidos / totalAssuntos) * 100
    );

}





// Atualização segura da interface


let disciplinasElemento =
document.getElementById("total-disciplinas");


if (disciplinasElemento) {

    disciplinasElemento.innerHTML =
    totalDisciplinas;

}




let assuntosElemento =
document.getElementById("total-assuntos");


if (assuntosElemento) {

    assuntosElemento.innerHTML =
    totalAssuntos;

}




let horasElemento =
document.getElementById("total-horas");


if (horasElemento) {

    horasElemento.innerHTML =
    totalHoras + " horas";

}




// Criação dinâmica do progresso

let dashboard =
document.querySelector(".dashboard");



if (dashboard) {


    let progressoBox =
    document.createElement("div");


    progressoBox.className = "card";


    progressoBox.innerHTML = `

    <h3>
    📈 Progresso Geral
    </h3>

    <p>
    ${progresso}% concluído
    </p>

    <p>
    ${assuntosConcluidos} de ${totalAssuntos} assuntos
    </p>

    <p>
    ${horasConcluidas}h estudadas
    </p>

    `;


    let cards =
    dashboard.querySelector(".cards");


    if(cards){

        cards.appendChild(progressoBox);

    }


        }
