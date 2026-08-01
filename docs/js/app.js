/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS v3.0
   Camada de Coaching — funções que ainda serão
   implementadas em cima do progresso já calculado
   por progresso.js (fonte única da verdade)
===================================================== */


// =====================================
// OUVIR ATUALIZAÇÕES DE PROGRESSO
// =====================================
//
// progresso.js já cuida de:
// - carregar/salvar dados (localStorage + progresso.json)
// - calcular progresso de tópico, aula, disciplina e geral
// - atualizar toda a interface (cards, barras, botões)
//
// app.js não deve recalcular nada disso. Em vez disso,
// escuta o evento "progressoPSCPPAtualizado" disparado
// por progresso.js sempre que algo muda, e usa esses
// dados para as funções de coaching abaixo.

document.addEventListener(
    "progressoPSCPPAtualizado",
    function (evento) {

        // evento.detail contém:
        // { disciplina, aula, progressoAula,
        //   progressoDisciplina, progressoGeral }

        atualizarMetas(evento.detail);

    }
);


// =====================================
// META DA SEMANA
// =====================================
//
// TODO: definir a lógica de coaching, por exemplo:
// - disciplina com menor progresso vira prioridade
// - tópicos pendentes na aula atual
// - proximidade da prova / cronograma de planejamento.html

function atualizarMetas(detalheProgresso) {

    console.log(
        "atualizarMetas — aguardando implementação",
        detalheProgresso
    );

}


// =====================================
// ÚLTIMA AULA ESTUDADA
// =====================================
//
// TODO: usar dadosProgresso (progresso.js) para
// encontrar a aula com dataConclusao mais recente
// entre todos os tópicos concluídos, e popular o
// widget "#ultima-aula" do index.html

function ultimaAula() {

    console.log(
        "ultimaAula — aguardando implementação"
    );

}


// =====================================
// PRÓXIMA REVISÃO (REPETIÇÃO ESPAÇADA)
// =====================================
//
// TODO: usar dataConclusao dos tópicos para calcular
// quando cada um deve ser revisado (ex: 1, 7, 30 dias)
// e popular o widget "#proxima-revisao" do index.html

function revisar() {

    console.log(
        "revisar — aguardando implementação"
    );

}


/* =====================================================
   FIM APP.JS v3.0
===================================================== */
