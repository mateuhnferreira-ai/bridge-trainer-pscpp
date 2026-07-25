// =====================================
// INTERFACE DO PLANEJAMENTO
// =====================================


// RESUMO DO PLANEJAMENTO

let resumo = calcularPlanejamento();


console.log("Semanas disponíveis:", resumo.semanasDisponiveis);

console.log("Horas por semana:", resumo.horasPorSemana);

console.log("Horas totais:", resumo.horasTotais);




// GERA LISTA DE ESTUDOS


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
