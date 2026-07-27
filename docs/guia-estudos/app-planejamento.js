// =====================================
// APLICATIVO DE PLANEJAMENTO PSCPP
// Bridge Trainer PSCPP
// =====================================



// Calcula informações gerais

let dadosPlanejamento =
calcularPlanejamento();




// Gera plano estratégico

let planoEstudo =
gerarPlanoEstudo();




// =====================================
// SEMANA ATUAL
// =====================================


let semanaElemento =
document.getElementById("semana-atual");


if(semanaElemento){


semanaElemento.innerHTML =

"Semana 1 de " +
dadosPlanejamento.semanasDisponiveis;


}





// =====================================
// HORAS DISPONÍVEIS
// =====================================


let horasElemento =
document.getElementById("horas-disponiveis");


if(horasElemento){


horasElemento.innerHTML =

dadosPlanejamento.horasPorSemana +
" horas / semana";


}




// =====================================
// META DA SEMANA
// =====================================


let metaElemento =
document.getElementById("meta-semana");


if(metaElemento){


if(planoEstudo.length > 0){


metaElemento.innerHTML =

planoEstudo[0].disciplina +
" - " +
planoEstudo[0].assunto;



}
else{


metaElemento.innerHTML =
"Todos os assuntos concluídos";


}



}





// =====================================
// DISTRIBUIÇÃO POR DISCIPLINA
// =====================================


let distribuicao =
document.getElementById(
"distribuicao-carga"
);



if(distribuicao){



let disciplinas = {};



planoEstudo.forEach(item => {



if(!disciplinas[item.disciplina]){


disciplinas[item.disciplina] = 0;


}



disciplinas[item.disciplina]
+= item.horas;



});





for(let disciplina in disciplinas){



let card =
document.createElement("div");



card.className =
"card";



card.innerHTML = `


<h3>
${disciplina}
</h3>


<p>
${disciplinas[disciplina]} horas pendentes
</p>


`;



distribuicao.appendChild(card);



}



}





// =====================================
// PRÓXIMOS ESTUDOS
// =====================================


let lista =
document.getElementById(
"lista-estudos"
);



if(lista){



planoEstudo
.slice(0,10)
.forEach(item => {



let estudo =
document.createElement("div");



estudo.className =
"card";



estudo.innerHTML = `


<h3>
${item.disciplina}
</h3>


<p>
${item.assunto}
</p>


<p>
⏱ ${item.horas} horas
</p>


<p>
⭐ Prioridade:
${item.prioridade}
</p>


`;



lista.appendChild(estudo);



});



}
