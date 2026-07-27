// =====================================
// SISTEMA DE PROGRESSO PSCPP v1.0
// Bridge Trainer PSCPP
// =====================================


let dadosProgresso = null;


// =====================================
// CARREGAR PROGRESSO
// =====================================

async function carregarProgresso(){


try{


let resposta =
await fetch("data/progresso.json");


dadosProgresso =
await resposta.json();


console.log(
"Progresso carregado",
dadosProgresso
);


return dadosProgresso;


}
catch(erro){


console.error(
"Erro ao carregar progresso:",
erro
);


return null;


}


}



// =====================================
// PROGRESSO GERAL
// =====================================


function calcularProgressoGeral(){


if(!dadosProgresso){

return 0;

}



let disciplinas =
Object.values(
dadosProgresso.disciplinas
);



if(disciplinas.length === 0){

return 0;

}



let soma = 0;



disciplinas.forEach(disciplina=>{


soma += disciplina.progresso || 0;


});



return Math.round(
soma / disciplinas.length
);



}



// =====================================
// PROGRESSO POR DISCIPLINA
// =====================================


function obterProgressoDisciplina(id){


if(
!dadosProgresso ||
!dadosProgresso.disciplinas[id]
){

return 0;

}



return
dadosProgresso.disciplinas[id].progresso || 0;



}



// =====================================
// INICIALIZAÇÃO
// =====================================


carregarProgresso();
