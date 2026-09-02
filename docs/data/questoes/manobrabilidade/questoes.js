// =====================================
// BANCO DE QUESTÕES — MANOBRABILIDADE
// Bridge Trainer PSCPP
// Versão 1.0
//
// Este arquivo contém exclusivamente
// questões da disciplina Manobrabilidade.
//
// Regras:
//
// 1. Toda questão deve possuir ID único.
// 2. Toda questão deve estar vinculada
//    ao conteúdo programático.
// 3. Toda questão deve indicar a
//    bibliografia que fundamenta a resposta.
// 4. Não inserir informação não sustentada
//    pelas fontes utilizadas.
// 5. O ID de uma questão nunca deve ser
//    reutilizado após sua publicação.
// =====================================


const questoesManobrabilidadePSCPP = [

    // =================================
    // QUESTÕES DE MANOBRABILIDADE
    // =================================
    //
    // As questões serão adicionadas aqui
    // progressivamente.
    //
    // PADRÃO DE IDENTIFICAÇÃO:
    //
    // MAN-0001
    // MAN-0002
    // MAN-0003
    // ...
    //
    // Não alterar IDs depois que uma
    // questão começar a registrar
    // desempenho do usuário.
    // =================================

];


// =====================================
// INFORMAÇÕES DO BANCO
// =====================================

const bancoManobrabilidadePSCPP = {

    id:
        "manobrabilidade",

    nome:
        "Manobrabilidade",

    versao:
        "1.0",

    questoes:
        questoesManobrabilidadePSCPP

};


// =====================================
// CONSULTAR TODAS AS QUESTÕES
// =====================================

function obterQuestoesManobrabilidadePSCPP() {

    return [
        ...questoesManobrabilidadePSCPP
    ];

}


// =====================================
// CONSULTAR QUESTÃO PELO ID
// =====================================

function obterQuestaoManobrabilidadePorIdPSCPP(
    questaoId
) {

    return questoesManobrabilidadePSCPP.find(
        function (
            questao
        ) {

            return (
                questao.id ===
                questaoId
            );

        }
    ) || null;

}


// =====================================
// QUANTIDADE DE QUESTÕES
// =====================================

function obterQuantidadeQuestoesManobrabilidadePSCPP() {

    return questoesManobrabilidadePSCPP.length;

}
