// =====================================
// CÁLCULO DO PLANEJAMENTO PSCPP
// =====================================


function calcularPlanejamento(){



let inicio = new Date(configuracaoEstudo.dataInicio);


let prova = new Date(configuracaoEstudo.dataProva);



let diferenca = prova - inicio;



let semanas = Math.floor(
    diferenca / (1000 * 60 * 60 * 24 * 7)
);



let horasSemana =
configuracaoEstudo.horasPorDia *
configuracaoEstudo.diasPorSemana;



let horasTotais =
semanas * horasSemana;



return {


semanasDisponiveis: semanas,


horasPorSemana: horasSemana,


horasTotais: horasTotais


};


}
