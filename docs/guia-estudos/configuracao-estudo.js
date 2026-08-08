// =====================================
// CONFIGURAÇÃO DE ESTUDO PSCPP
// Bridge Trainer PSCPP
// Versão 2.0
//
// Esta configuração define:
//
// - período geral de preparação
// - disponibilidade semanal
// - fases do planejamento
// - revisão
// - pesos estratégicos por disciplina
//
// Os pesos passam a usar os IDs das
// disciplinas, evitando erro por mudança
// no nome de exibição.
// =====================================


const configuracaoEstudo = {


    // =================================
    // PERÍODO GERAL
    // =================================

    inicio:
        "2026-08-03",


    prova:
        "2027-11-01",



    // =================================
    // FASES DO PLANEJAMENTO
    // =================================
    //
    // Fase 1:
    // percorrer todo o conteúdo programático
    //
    // Fase 2:
    // consolidação e aumento de exercícios
    //
    // Fase 3:
    // reta final predominantemente voltada
    // a revisão, questões e simulados
    //
    // As datas poderão ser recalibradas
    // posteriormente sem alterar o motor.

    fases: {

        conteudo: {

            inicio:
                "2026-08-03",

            fim:
                "2027-07-31"

        },


        consolidacao: {

            inicio:
                "2027-08-01",

            fim:
                "2027-09-30"

        },


        retaFinal: {

            inicio:
                "2027-10-01",

            fim:
                "2027-11-01"

        }

    },



    // =================================
    // DISPONIBILIDADE
    // =================================

    horasPorDia:
        2,


    diasEstudo: [

        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta"

    ],



    // =================================
    // REVISÃO
    // =================================

    usarRevisao:
        true,


    cicloRevisaoDias: [

        7,
        30,
        90

    ],



    // =================================
    // MARGEM DE SEGURANÇA
    // =================================
    //
    // 0.90 significa que o planejamento
    // considera apenas 90% das horas
    // teoricamente disponíveis.
    //
    // Isso cria margem para:
    //
    // - dias perdidos
    // - compromissos
    // - cansaço
    // - imprevistos
    // - semanas menos produtivas

    fatorDisponibilidadeReal:
        0.90,



    // =================================
    // PESOS POR DISCIPLINA
    // =================================
    //
    // Agora usamos ID em vez do nome.

    pesosPrioridade: {

        "manobrabilidade":
            5,

        "navegacao":
            5,

        "regulamentacao":
            4,

        "arte-naval":
            4,

        "conhecimentos-gerais":
            4,

        "comunicacoes":
            3,

        "meteorologia":
            3

    }


};
