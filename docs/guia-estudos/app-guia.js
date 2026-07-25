// =====================================
// CONTROLE DO GUIA DE ESTUDOS PSCPP
// =====================================


console.log("Guia de Estudos carregado");



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



console.log("Disciplinas:", totalDisciplinas);

console.log("Assuntos:", totalAssuntos);

console.log("Horas previstas:", totalHoras);
