// =====================================
// INTERFACE DO PLANEJAMENTO
// =====================================


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
