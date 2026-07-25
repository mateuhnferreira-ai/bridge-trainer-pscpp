// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE
// =====================================


let totalDisciplinas = Object.keys(conteudoPSCPP).length;


let totalAssuntos = 0;


let totalHoras = 0;



for (let disciplina in conteudoPSCPP) {


    let assuntos = conteudoPSCPP[disciplina].assuntos;


    totalAssuntos += assuntos.length;



    assuntos.forEach(assunto => {

        totalHoras += assunto.horas;

    });


}



// Atualiza tela


document.getElementById("total-disciplinas").innerHTML =
totalDisciplinas;



document.getElementById("total-assuntos").innerHTML =
totalAssuntos;



document.getElementById("total-horas").innerHTML =
totalHoras + " horas";
