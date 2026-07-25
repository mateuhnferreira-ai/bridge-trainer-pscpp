// =====================================
// INTERFACE DO PLANEJAMENTO PSCPP
// =====================================


// RESUMO DO PLANEJAMENTO

let resumo = calcularPlanejamento();



document.getElementById("horas-disponiveis").innerHTML =
resumo.horasPorSemana + " horas / semana";



document.getElementById("meta-semana").innerHTML =
"Avançar no ciclo de estudos";





// =====================================
// LISTA DE PRÓXIMOS ESTUDOS
// =====================================


let plano = gerarPlanoEstudo();



let areaEstudos = document.getElementById("lista-estudos");



plano.forEach(item => {



areaEstudos.innerHTML += `


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






// =====================================
// DISTRIBUIÇÃO DA CARGA POR DISCIPLINA
// =====================================


let areaCarga = document.getElementById("distribuicao-carga");



for(let disciplina in conteudoPSCPP){



    let totalHoras = 0;



    conteudoPSCPP[disciplina].assuntos.forEach(assunto => {



        totalHoras += assunto.horas;



    });




    areaCarga.innerHTML += `


    <div class="card">


        <h3>
        ${conteudoPSCPP[disciplina].nome}
        </h3>


        <p>
        ⏱ ${totalHoras} horas previstas
        </p>


    </div>


    `;


}
