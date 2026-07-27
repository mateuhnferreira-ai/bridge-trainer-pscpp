// =====================================
// CÁLCULO DO PLANEJAMENTO PSCPP
// Bridge Trainer PSCPP
// =====================================


function calcularPlanejamento(){



let inicio = new Date(
    configuracaoEstudo.inicio
);



let prova = new Date(
    configuracaoEstudo.prova
);




let diferenca =
prova - inicio;




let semanas = Math.floor(
    diferenca /
    (1000 * 60 * 60 * 24 * 7)
);





let diasPorSemana =
configuracaoEstudo.diasEstudo.length;





let horasSemana =
configuracaoEstudo.horasPorDia *
diasPorSemana;






let horasTotais =
semanas *
horasSemana;






return {


semanasDisponiveis:
semanas,


horasPorSemana:
horasSemana,


horasTotais:
horasTotais



};



}
