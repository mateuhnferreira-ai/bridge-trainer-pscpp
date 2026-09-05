// =====================================
// BANCO DE QUESTÕES — NAVEGAÇÃO
// Bridge Trainer PSCPP
//
// Estrutura padrão do banco de questões
// Compatível com:
// - Simulados personalizados
// - Gabarito comentado
// - Centro de Desempenho
// =====================================


const questoesNavegacaoPSCPP = [


// =====================================
// COLE OS BLOCOS DE QUESTÕES AQUI
//
// PADRÃO DOS IDs:
//
// NAV-0001
// NAV-0002
// NAV-0003
// ...
//
// PADRÃO DA QUESTÃO:
//
// {
//     id: "NAV-0001",
//
//     disciplina: "navegacao",
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
// 5. Não criar outro banco ou funções paralelas.
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

const bancoNavegacaoPSCPP = {

    id: "navegacao",

    nome: "Navegação",

    versao: "1.0",

    questoes: questoesNavegacaoPSCPP

};


// =====================================
// OBTER TODAS AS QUESTÕES
// =====================================

function obterQuestoesNavegacaoPSCPP() {

    return [...questoesNavegacaoPSCPP];

}


// =====================================
// OBTER QUESTÃO POR ID
// =====================================

function obterQuestaoNavegacaoPorIdPSCPP(questaoId) {

    return questoesNavegacaoPSCPP.find(function(questao) {

        return questao.id === questaoId;

    }) || null;

}


// =====================================
// OBTER QUANTIDADE DE QUESTÕES
// =====================================

function obterQuantidadeQuestoesNavegacaoPSCPP() {

    return questoesNavegacaoPSCPP.length;

}


// =====================================
// CONFIRMAÇÃO DE CARREGAMENTO
// =====================================

console.log(
    "Banco de Navegação PSCPP carregado:",
    questoesNavegacaoPSCPP.length,
    "questões."
);
