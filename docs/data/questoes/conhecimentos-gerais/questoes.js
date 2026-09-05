// =====================================
// BANCO DE QUESTÕES — CONHECIMENTOS GERAIS
// Bridge Trainer PSCPP
//
// Estrutura padrão do banco de questões
// Compatível com:
// - Simulados personalizados
// - Gabarito comentado
// - Centro de Desempenho
// =====================================


const questoesConhecimentosGeraisPSCPP = [


// =====================================
// COLE OS BLOCOS DE QUESTÕES AQUI
//
// PADRÃO DOS IDs:
//
// CG-0001
// CG-0002
// CG-0003
// ...
//
// PADRÃO DA QUESTÃO:
//
// {
//     id: "CG-0001",
//
//     disciplina: "conhecimentos-gerais",
//
//     assunto: "Nome do assunto",
//
//     topico: "Nome específico do tópico",
//
//     edital:
//         "Item correspondente do conteúdo programático",
//
//     dificuldade: "media",
//
//     tipo: "multipla-escolha",
//
//     origem: "banco",
//
//     enunciado:
//         "Texto da questão.",
//
//     alternativas: {
//
//         A: "Alternativa A.",
//
//         B: "Alternativa B.",
//
//         C: "Alternativa C.",
//
//         D: "Alternativa D.",
//
//         E: "Alternativa E."
//
//     },
//
//     resposta: "A",
//
//     comentario:
//         "Comentário técnico do gabarito.",
//
//     bibliografia: [
//
//         {
//             publicacao:
//                 "Nome da publicação",
//
//             capitulo:
//                 "Capítulo ou seção",
//
//             pagina: ""
//         }
//
//     ]
// }
//
// IMPORTANTE:
//
// 1. As questões devem ser inseridas ANTES do fechamento ];
//
// 2. Cada questão deve ser separada da seguinte por vírgula.
//
// 3. Os IDs devem permanecer sequenciais.
//
// 4. Não alterar a estrutura abaixo.
//
// 5. Não criar outro banco ou outras funções paralelas.
//
// 6. Quando não houver página confirmada,
//    manter:
//
//    pagina: ""
//
// =====================================


];


// =====================================
// INFORMAÇÕES DO BANCO
// =====================================

const bancoConhecimentosGeraisPSCPP = {

    id: "conhecimentos-gerais",

    nome: "Conhecimentos Gerais",

    versao: "1.0",

    questoes: questoesConhecimentosGeraisPSCPP

};


// =====================================
// OBTER TODAS AS QUESTÕES
// =====================================

function obterQuestoesConhecimentosGeraisPSCPP() {

    return [...questoesConhecimentosGeraisPSCPP];

}


// =====================================
// OBTER QUESTÃO POR ID
// =====================================

function obterQuestaoConhecimentosGeraisPorIdPSCPP(questaoId) {

    return questoesConhecimentosGeraisPSCPP.find(function(questao) {

        return questao.id === questaoId;

    }) || null;

}


// =====================================
// OBTER QUANTIDADE DE QUESTÕES
// =====================================

function obterQuantidadeQuestoesConhecimentosGeraisPSCPP() {

    return questoesConhecimentosGeraisPSCPP.length;

}


// =====================================
// CONFIRMAÇÃO DE CARREGAMENTO
// =====================================

console.log(
    "Banco de Conhecimentos Gerais PSCPP carregado:",
    questoesConhecimentosGeraisPSCPP.length,
    "questões."
);
