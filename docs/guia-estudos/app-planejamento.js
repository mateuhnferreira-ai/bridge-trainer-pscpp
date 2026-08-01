// =====================================
// APLICATIVO DE PLANEJAMENTO PSCPP v2.1
// Bridge Trainer PSCPP
//
// v2.1: toda a inicialização passou a esperar
// carregarDadosProgresso() (progresso.js) resolver
// antes de gerar o plano — antes disso, gerarPlanoEstudo()
// rodava com dadosProgresso ainda vazio, e todo assunto
// aparecia como "não concluído" mesmo com progresso real
// salvo no localStorage.
// =====================================


async function inicializarPlanejamento(){


if(typeof carregarDadosProgresso === "function"){


    await carregarDadosProgresso();


}
else{


    console.error(
        "progresso.js não foi carregado antes de " +
        "app-planejamento.js. Inclua <script src=\"../js/progresso.js\">" +
        " antes deste arquivo."
    );


}


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


disciplinas[item.disciplina] = {

idDisciplina: item.idDisciplina,

horas: 0

};


}



disciplinas[item.disciplina].horas
+= item.horas;



});





for(let disciplina in disciplinas){



let dadosCard =
disciplinas[disciplina];



let card =
document.createElement("a");



card.className =
"card";



card.href =
"../disciplinas/" +
dadosCard.idDisciplina +
"/index.html";



card.innerHTML = `


<h3>
${disciplina}
</h3>


<p>
${dadosCard.horas} horas pendentes
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


<a
    href="../disciplinas/${item.idDisciplina}/${item.idAssunto}.html"
    class="botao"
>
Ir para a aula
</a>


`;



lista.appendChild(estudo);



});



}


}


document.addEventListener(
    "DOMContentLoaded",
    inicializarPlanejamento
);
