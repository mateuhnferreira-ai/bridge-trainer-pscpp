// =====================================
// BANCO DE CONTEÚDO PSCPP
// Bridge Trainer PSCPP
// Versão estratégica com pesos
// =====================================


const conteudoPSCPP = {



manobrabilidade: {

nome: "Manobrabilidade",

prioridade: "Muito Alta",

pesoDisciplina: 5,


assuntos: [


{
nome: "Resistência do Navio",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Propulsão",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Hélices",
status: "Em estudo",
horas: 25,
importancia: "Alta",
peso: 4
},


{
nome: "Lemes",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Controlabilidade",
status: "Em estudo",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Efeitos Hidrodinâmicos",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Estabilidade Direcional",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Qualidades de Manobra",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Testes de Manobrabilidade IMO",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Águas Rasas e Canais",
status: "Não iniciado",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Interação Hidrodinâmica",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Rebocadores",
status: "Não iniciado",
horas: 30,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Manobras Portuárias",
status: "Não iniciado",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Manobras de Emergência",
status: "Não iniciado",
horas: 10,
importancia: "Alta",
peso: 3
}


]

},






arteNaval: {

nome: "Arte Naval",

prioridade: "Alta",

pesoDisciplina: 4,


assuntos: [


{
nome: "Fundamentos do Navio",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Estruturas Navais",
status: "Não iniciado",
horas: 30,
importancia: "Alta",
peso: 4
},


{
nome: "Compartimentagem",
status: "Não iniciado",
horas: 15,
importancia: "Média",
peso: 3
},


{
nome: "Estabilidade",
status: "Não iniciado",
horas: 40,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Avarias e Controle de Danos",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 3
},


{
nome: "Equipamentos de Convés",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Sistemas do Navio",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
}


]

},


navegacao: {

nome: "Navegação em Águas Restritas / COLREG",

prioridade: "Muito Alta",

pesoDisciplina: 5,


assuntos: [


{
nome: "Navegação em Águas Restritas",
status: "Não iniciado",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
nome: "COLREG 1972",
status: "Não iniciado",
horas: 45,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Regras de Governo e Navegação",
status: "Não iniciado",
horas: 35,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Sinalização Náutica",
status: "Não iniciado",
horas: 25,
importancia: "Alta",
peso: 4
},


{
nome: "Cartas Náuticas",
status: "Não iniciado",
horas: 30,
importancia: "Alta",
peso: 4
},


{
nome: "ECDIS",
status: "Não iniciado",
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
nome: "Atmosfera e Pressão Atmosférica",
status: "Não iniciado",
horas: 10,
importancia: "Média",
peso: 3
},


{
nome: "Sistemas Meteorológicos",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Ventos e Frentes",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Previsão Meteorológica",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},


{
nome: "Ondas e Estado do Mar",
status: "Não iniciado",
horas: 10,
importancia: "Alta",
peso: 3
},


{
nome: "Marés e Correntes",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Oceanografia Operacional",
status: "Não iniciado",
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
nome: "NORMAM-201 - Embarcações Empregadas na Navegação de Mar Aberto",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "NORMAM-204 - Tráfego e Permanência de Embarcações em AJB",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "NORMAM-302 - IAFN",
status: "Não iniciado",
horas: 10,
importancia: "Média",
peso: 3
},


{
nome: "NORMAM-311 - Serviço de Praticagem",
status: "Não iniciado",
horas: 35,
importancia: "Muito Alta",
peso: 5
},


{
nome: "NORMAM-601 - Auxílios à Navegação",
status: "Não iniciado",
horas: 10,
importancia: "Alta",
peso: 4
},


{
nome: "NORMAM-602 - Serviço de Tráfego de Embarcações (VTS)",
status: "Não iniciado",
horas: 10,
importancia: "Alta",
peso: 4
},


{
nome: "Lei nº 2.180/1954 - Tribunal Marítimo",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "LESTA - Lei nº 9.537/1997",
status: "Não iniciado",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
nome: "RLESTA - Decreto nº 2.596/1998",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},


{
nome: "Legislação da Praticagem",
status: "Não iniciado",
horas: 25,
importancia: "Muito Alta",
peso: 5
},


{
nome: "COLREG 1972 e Normas IMO",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},


{
nome: "Lei dos Portos e Transporte Aquaviário",
status: "Não iniciado",
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
nome: "Standard Marine Communication Phrases (SMCP IMO)",
status: "Não iniciado",
horas: 30,
importancia: "Muito Alta",
peso: 5
},

{
nome: "Radiocomunicações Marítimas",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},

{
nome: "Código Internacional de Sinais (CIS)",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Sistema Marítimo Global de Socorro e Segurança (GMDSS)",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},

{
nome: "Exercícios e Revisão de Comunicações",
status: "Não iniciado",
horas: 5,
importancia: "Média",
peso: 3
}

]

},


conhecimentosGerais: {

nome: "Conhecimentos Gerais",

prioridade: "Alta",

pesoDisciplina: 4,

assuntos: [

{
nome: "Planejamento Portuário",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},

{
nome: "PIANC",
status: "Não iniciado",
horas: 20,
importancia: "Alta",
peso: 4
},

{
nome: "NORMAM-224",
status: "Não iniciado",
horas: 15,
importancia: "Muito Alta",
peso: 5
},

{
nome: "Fatores Humanos",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "MARPOL",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Economia Marítima",
status: "Não iniciado",
horas: 10,
importancia: "Média",
peso: 3
},

{
nome: "Direito Processual Marítimo",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Segurança da Navegação",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},

{
nome: "Gestão Portuária",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Hidrovias",
status: "Não iniciado",
horas: 10,
importancia: "Média",
peso: 3
},

{
nome: "Dragagem",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Meio Ambiente",
status: "Não iniciado",
horas: 10,
importancia: "Média",
peso: 3
},

{
nome: "IMO",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
},

{
nome: "Infraestrutura Portuária",
status: "Não iniciado",
horas: 15,
importancia: "Alta",
peso: 4
},

{
nome: "Casos Práticos",
status: "Não iniciado",
horas: 20,
importancia: "Muito Alta",
peso: 5
}

]

}

};


// =====================================
// FIM DO BANCO DE CONTEÚDO PSCPP
// =====================================
