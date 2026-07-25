// =====================================
// INTERFACE DO PLANEJAMENTO PSCPP
// =====================================


console.log("APP PLANEJAMENTO CARREGADO");



// Calcula resumo

let resumo = calcularPlanejamento();



// Mostra resumo na tela


document.getElementById("semanas-disponiveis").innerHTML =
"📅 Semanas disponíveis: " + resumo.semanasDisponiveis;



document.getElementById("horas-semana").innerHTML =
"⏱ Horas por semana: " + resumo.horasPorSemana;



document.getElementById("horas-totais").innerHTML =
"🎯 Carga total disponível: " + resumo.horasTotais + " horas";





// Lista de estudos


let plano = gerarPlanoEstudo();


let area = document.getElementById("lista-estudos");



plano.forEach(item => {


area.innerHTML += `

<div class="card">


<h3>
${item.disciplina}
</h3>


<p>
📖 ${item.assunto}
</p>


<p>
⏱ ${item.horas} horas
</p>


<p>
⭐ Prioridade: ${item.importancia}
</p>


</div>

`;



});
