// =====================================
// BANCO DE CONTEÚDO PSCPP
// Bridge Trainer PSCPP
// Versão estratégica com pesos — v2.0
//
// O campo "status" foi removido. O status real de
// cada assunto (Não iniciado / Em estudo / Concluído)
// passou a ser calculado dinamicamente por app-guia.js
// a partir do progresso salvo em progresso.js — este
// banco guarda apenas dados estruturais e fixos.
//
// O campo "id" é o identificador curto do assunto,
// usado para casar com o data-aula da página real da
// aula (ex: <body data-disciplina="manobrabilidade"
// data-aula="helices">). Ele é independente do "nome"
// de exibição, que pode mudar livremente sem quebrar
// o vínculo com o progresso salvo.
// =====================================


var conteudoPSCPP = {


manobrabilidade: {

nome: "Manobrabilidade",

prioridade: "Muito Alta",

pesoDisciplina: 5,


assuntos: [


{
id: "resistencia-do-navio",
nome: "Resistência do Navio",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "controlabilidade",
nome: "Controlabilidade",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
id: "helices",
nome: "Hélices",
horas: 25,
importancia: "Alta",
peso: 4
},


{
id: "lemes",
nome: "Lemes",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "propulsao",
nome: "Propulsão",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "efeitos-hidrodinamicos",
nome: "Efeitos Hidrodinâmicos",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "estabilidade-direcional",
nome: "Estabilidade Direcional",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "qualidades-de-manobra",
nome: "Qualidades de Manobra",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "testes-de-manobrabilidade-imo",
nome: "Testes de Manobrabilidade IMO",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "efeitos-ambientais",
nome: "Efeitos Ambientais",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "aguas-rasas-e-canais",
nome: "Águas Rasas e Canais",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "interacao-hidrodinamica",
nome: "Interação Hidrodinâmica",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "rebocadores",
nome: "Rebocadores",
horas: 30,
importancia: "Muito Alta",
peso: 5
},


{
id: "manobras-portuarias",
nome: "Manobras Portuárias",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "manobras-de-emergencia",
nome: "Manobras de Emergência",
horas: 10,
importancia: "Alta",
peso: 3
}


]

},






"arte-naval": {

nome: "Arte Naval",

prioridade: "Alta",

pesoDisciplina: 4,


assuntos: [


{
id: "fundamentos",
nome: "Fundamentos de Arte Naval",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "tipos-de-navios",
nome: "Tipos e Características dos Navios",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "estrutura-naval",
nome: "Estrutura Naval",
horas: 25,
importancia: "Alta",
peso: 4
},


{
id: "compartimentagem",
nome: "Compartimentagem e Estanqueidade",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "aparelhos-de-governo",
nome: "Aparelhos de Governo",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "fundear-e-amarrar",
nome: "Aparelhos de Fundear e Amarrar",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "equipamentos-de-conves",
nome: "Equipamentos de Convés",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "cabos-e-espias",
nome: "Cabos, Espias e Manuseio",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "estabilidade",
nome: "Estabilidade do Navio",
horas: 40,
importancia: "Muito Alta",
peso: 5
},


{
id: "operacoes-marinheiras",
nome: "Operações Marinheiras",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "manobras-portuarias",
nome: "Manobras Portuárias",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "rebocadores-portuarios",
nome: "Rebocadores Portuários",
horas: 35,
importancia: "Muito Alta",
peso: 5
},


{
id: "estabilidade-dos-rebocadores",
nome: "Estabilidade dos Rebocadores",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "transferencia-de-pratico",
nome: "Transferência de Prático",
horas: 15,
importancia: "Muito Alta",
peso: 5
},


{
id: "master-pilot-information-exchange",
nome: "Master–Pilot Information Exchange",
horas: 15,
importancia: "Muito Alta",
peso: 5
}


]

},





navegacao: {

nome: "Navegação em Águas Restritas / COLREG",

prioridade: "Muito Alta",

pesoDisciplina: 5,


assuntos: [


{
id: "navegacao-em-aguas-restritas",
nome: "Navegação em Águas Restritas",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
id: "colreg-1972",
nome: "COLREG 1972",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
id: "regras-de-governo-e-navegacao",
nome: "Regras de Governo e Navegação",
horas: 35,
importancia: "Muito Alta",
peso: 5
},


{
id: "sinalizacao-nautica",
nome: "Sinalização Náutica",
horas: 25,
importancia: "Alta",
peso: 4
},


{
id: "cartas-nauticas",
nome: "Cartas Náuticas",
horas: 30,
importancia: "Alta",
peso: 4
},


{
id: "ecdis",
nome: "ECDIS",
horas: 20,
importancia: "Média",
peso: 3
}


]

},






meteorologia: {

nome: "Meteorologia e Oceanografia",

prioridade: "Média",

pesoDisciplina: 3,


assuntos: [


{
id: "atmosfera-e-pressao-atmosferica",
nome: "Atmosfera e Pressão Atmosférica",
horas: 10,
importancia: "Média",
peso: 3
},


{
id: "sistemas-meteorologicos",
nome: "Sistemas Meteorológicos",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "ventos-e-frentes",
nome: "Ventos e Frentes",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "previsao-meteorologica",
nome: "Previsão Meteorológica",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "ondas-e-estado-do-mar",
nome: "Ondas e Estado do Mar",
horas: 10,
importancia: "Alta",
peso: 3
},


{
id: "mares-e-correntes",
nome: "Marés e Correntes",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "oceanografia-operacional",
nome: "Oceanografia Operacional",
horas: 10,
importancia: "Média",
peso: 3
}


]

},






// =====================================
// PARTE 3/3
// REGULAMENTAÇÃO + COMUNICAÇÕES
// FECHAMENTO DO BANCO
// =====================================


regulamentacao: {

nome: "Legislação e Regulamentação",

prioridade: "Muito Alta",

pesoDisciplina: 5,


assuntos: [


{
id: "normam-201",
nome: "NORMAM-201 - Embarcações Empregadas na Navegação de Mar Aberto",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "normam-204",
nome: "NORMAM-204 - Tráfego e Permanência de Embarcações em AJB",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "normam-302",
nome: "NORMAM-302 - IAFN",
horas: 10,
importancia: "Média",
peso: 3
},


{
id: "normam-311",
nome: "NORMAM-311 - Serviço de Praticagem",
horas: 35,
importancia: "Muito Alta",
peso: 5
},


{
id: "normam-601",
nome: "NORMAM-601 - Auxílios à Navegação",
horas: 10,
importancia: "Alta",
peso: 4
},


{
id: "normam-602",
nome: "NORMAM-602 - Serviço de Tráfego de Embarcações (VTS)",
horas: 10,
importancia: "Alta",
peso: 4
},


{
id: "lei-2180-1954-tribunal-maritimo",
nome: "Lei nº 2.180/1954 - Tribunal Marítimo",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "lesta-lei-9537-1997",
nome: "LESTA - Lei nº 9.537/1997",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "rlesta-decreto-2596-1998",
nome: "RLESTA - Decreto nº 2.596/1998",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "legislacao-da-praticagem",
nome: "Legislação da Praticagem",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
id: "colreg-1972-e-normas-imo",
nome: "COLREG 1972 e Normas IMO",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "lei-dos-portos-e-transporte-aquaviario",
nome: "Lei dos Portos e Transporte Aquaviário",
horas: 15,
importancia: "Alta",
peso: 4
}


]

},






comunicacoes: {

nome: "Comunicações",

prioridade: "Média",

pesoDisciplina: 2,


assuntos: [


{
id: "smcp-imo",
nome: "Standard Marine Communication Phrases (SMCP IMO)",
horas: 30,
importancia: "Muito Alta",
peso: 5
},


{
id: "radiocomunicacoes-maritimas",
nome: "Radiocomunicações Marítimas",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "codigo-internacional-de-sinais",
nome: "Código Internacional de Sinais (CIS)",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "gmdss",
nome: "Sistema Marítimo Global de Socorro e Segurança (GMDSS)",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "exercicios-e-revisao-de-comunicacoes",
nome: "Exercícios e Revisão de Comunicações",
horas: 5,
importancia: "Média",
peso: 3
}


]

},






"conhecimentos-gerais": {

nome: "Conhecimentos Gerais",

prioridade: "Alta",

pesoDisciplina: 4,


assuntos: [


{
id: "planejamento-portuario",
nome: "Planejamento Portuário",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "pianc",
nome: "PIANC",
horas: 20,
importancia: "Alta",
peso: 4
},


{
id: "normam-224",
nome: "NORMAM-224",
horas: 15,
importancia: "Muito Alta",
peso: 5
},


{
id: "fatores-humanos",
nome: "Fatores Humanos",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "marpol",
nome: "MARPOL",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "economia-maritima",
nome: "Economia Marítima",
horas: 10,
importancia: "Média",
peso: 3
},


{
id: "direito-processual-maritimo",
nome: "Direito Processual Marítimo",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "seguranca-da-navegacao",
nome: "Segurança da Navegação",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "gestao-portuaria",
nome: "Gestão Portuária",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "hidrovias",
nome: "Hidrovias",
horas: 10,
importancia: "Média",
peso: 3
},


{
id: "dragagem",
nome: "Dragagem",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "meio-ambiente",
nome: "Meio Ambiente",
horas: 10,
importancia: "Média",
peso: 3
},


{
id: "imo",
nome: "IMO",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
id: "infraestrutura-portuaria",
nome: "Infraestrutura Portuária",
horas: 15,
importancia: "Alta",
peso: 4
},


{
id: "casos-praticos",
nome: "Casos Práticos",
horas: 20,
importancia: "Muito Alta",
peso: 5
}


]

}


};


console.log("BANCO CARREGADO");
console.log(conteudoPSCPP);


// =====================================
// FIM DO BANCO DE CONTEÚDO PSCPP
// =====================================
