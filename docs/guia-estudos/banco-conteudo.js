// =====================================
// BANCO DE CONTEÚDO PSCPP
// Bridge Trainer PSCPP
// Versão estratégica v3.1
//
// Fonte estrutural para:
// - Guia de Estudos
// - Planejamento
// - Motor estratégico
// - Pomodoro inteligente
//
// O progresso NÃO é armazenado aqui.
// O estado real é obtido pelo progresso.js.
//
// IMPORTANTE:
//
// id
// deve ser exatamente igual ao data-aula
// utilizado nas páginas das aulas.
//
// horas
// representa agora uma ESTIMATIVA REALISTA
// de tempo de primeiro estudo do assunto.
//
// Não deve ser usada como peso de importância.
// Para isso existem:
// - importancia
// - peso
// - cargaCognitiva
//
// cargaCognitiva:
// "Alta"  = conteúdo pesado / maior concentração
// "Média" = conteúdo intermediário
// "Baixa" = leitura/revisão mais leve
//
// Carga total aproximada desta versão:
// 403 horas.
// =====================================


var conteudoPSCPP = {


// =====================================
// I - MANOBRABILIDADE
// Total aproximado: 80 h
// =====================================

manobrabilidade: {

nome: "Manobrabilidade",

prioridade: "Muito Alta",

pesoDisciplina: 5,

assuntos: [

{
id: "resistencia",
nome: "Resistência do Navio",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "controlabilidade",
nome: "Controlabilidade",
horas: 8,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "helices",
nome: "Hélices",
horas: 6,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "lemes",
nome: "Lemes",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "propulsao",
nome: "Propulsão",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "efeitos-hidrodinamicos",
nome: "Efeitos Hidrodinâmicos",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "estabilidade-direcional",
nome: "Estabilidade Direcional",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "qualidades-de-manobra",
nome: "Qualidades de Manobra",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "testes-de-manobrabilidade",
nome: "Testes de Manobrabilidade",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "efeitos-ambientais",
nome: "Efeitos Ambientais",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "aguas-rasas-e-canais",
nome: "Águas Rasas e Canais",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "interacao-hidrodinamica",
nome: "Interação Hidrodinâmica",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "rebocadores",
nome: "Rebocadores",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "manobras-portuarias",
nome: "Manobras Portuárias",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "manobras-de-emergencia",
nome: "Manobras de Emergência",
horas: 3,
importancia: "Alta",
peso: 3,
cargaCognitiva: "Média"
}

]

},


// =====================================
// II - ARTE NAVAL
// Total aproximado: 72 h
// =====================================

"arte-naval": {

nome: "Arte Naval",

prioridade: "Alta",

pesoDisciplina: 4,

assuntos: [

{
id: "fundamentos",
nome: "Fundamentos de Arte Naval",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "tipos-de-navios",
nome: "Tipos e Características dos Navios",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Baixa"
},

{
id: "estrutura-naval",
nome: "Estrutura Naval",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "compartimentagem",
nome: "Compartimentagem e Estanqueidade",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "aparelhos-de-governo",
nome: "Aparelhos de Governo",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "fundear-e-amarrar",
nome: "Aparelhos de Fundear e Amarrar",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "equipamentos-de-conves",
nome: "Equipamentos de Convés",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Baixa"
},

{
id: "cabos-e-espias",
nome: "Cabos, Espias e Manuseio",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "estabilidade",
nome: "Estabilidade do Navio",
horas: 8,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "operacoes-marinheiras",
nome: "Operações Marinheiras",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "manobras-portuarias",
nome: "Manobras Portuárias",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "rebocadores-portuarios",
nome: "Rebocadores Portuários",
horas: 8,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "estabilidade-dos-rebocadores",
nome: "Estabilidade dos Rebocadores",
horas: 5,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "transferencia-de-pratico",
nome: "Transferência de Prático",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "master-pilot-information-exchange",
nome: "Master–Pilot Information Exchange",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
}

]

},


// =====================================
// III - NAVEGAÇÃO
// Total aproximado: 65 h
// =====================================

navegacao: {

nome: "Navegação",

prioridade: "Muito Alta",

pesoDisciplina: 5,

assuntos: [

{
id: "navegacao-costeira",
nome: "Navegação Costeira",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "aguas-restritas",
nome: "Navegação em Águas Restritas",
horas: 8,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "planejamento-navegacao",
nome: "Planejamento da Navegação",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "pilotagem",
nome: "Pilotagem",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "colreg",
nome: "COLREG 1972",
horas: 10,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "manobras-com-trafego",
nome: "Manobras com Tráfego",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "ecdis",
nome: "ECDIS",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "balizamento",
nome: "Balizamento e Auxílios à Navegação",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "publicacoes",
nome: "Publicações Náuticas",
horas: 3,
importancia: "Alta",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "ais-vts",
nome: "AIS e VTS",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "bridge-team-management",
nome: "Bridge Team Management / BRM",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "dynamic-positioning",
nome: "Dynamic Positioning — DP",
horas: 3,
importancia: "Média",
peso: 3,
cargaCognitiva: "Média"
}

]

},


// =====================================
// IV - METEOROLOGIA E OCEANOGRAFIA
// Total aproximado: 52 h
// =====================================

meteorologia: {

nome: "Meteorologia e Oceanografia",

prioridade: "Média",

pesoDisciplina: 3,

assuntos: [

{
id: "fundamentos-meteorologia",
nome: "Fundamentos de Meteorologia",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "atmosfera",
nome: "Atmosfera Terrestre",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "pressao-atmosferica",
nome: "Pressão Atmosférica",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "temperatura-umidade",
nome: "Temperatura e Umidade",
horas: 3,
importancia: "Média",
peso: 3,
cargaCognitiva: "Média"
},

{
id: "ventos",
nome: "Ventos",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "circulacao-atmosferica",
nome: "Circulação Atmosférica",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "massas-ar-frentes",
nome: "Massas de Ar e Frentes",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "nuvens-precipitacao",
nome: "Nuvens e Precipitação",
horas: 3,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "sistemas-meteorologicos",
nome: "Sistemas Meteorológicos",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "meteorologia-tropical",
nome: "Meteorologia Tropical, Ciclones e Tempestades",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "previsao-meteorologica",
nome: "Previsão Meteorológica",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "boletins-meteorologicos",
nome: "Boletins Meteorológicos e Informações Hydro/Meteo",
horas: 2,
importancia: "Alta",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "ondas-estado-mar",
nome: "Ondas e Estado do Mar",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "mares-correntes",
nome: "Marés e Correntes Oceânicas",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "meteorologia-aplicada",
nome: "Meteorologia Aplicada à Navegação",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "condicoes-adversas-navegacao",
nome: "Condições Adversas e Efeitos sobre o Navio",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
}

]

},


// =====================================
// V - LEGISLAÇÃO E REGULAMENTAÇÃO
// Total aproximado: 80 h
// =====================================

regulamentacao: {

nome: "Legislação e Regulamentação",

prioridade: "Muito Alta",

pesoDisciplina: 5,

assuntos: [

{
id: "normam-201",
nome: "NORMAM-201/DPC",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "normam-204",
nome: "NORMAM-204/DPC",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "normam-302",
nome: "NORMAM-302/DPC",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "normam-311",
nome: "NORMAM-311/DPC — Serviço de Praticagem",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "normam-601",
nome: "NORMAM-601/DHN",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "normam-112",
nome: "NORMAM-112/DPC",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "normam-602",
nome: "NORMAM-602/DHN — VTS",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "lei-2180-tribunal-maritimo",
nome: "Lei nº 2.180/1954 — Tribunal Marítimo",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "lesta-lei-9537",
nome: "Lei nº 9.537/1997 — LESTA",
horas: 5,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "rlesta-decreto-2596",
nome: "Decreto nº 2.596/1998 — RLESTA",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "lei-14813-praticagem",
nome: "Lei nº 14.813/2024 — Praticagem",
horas: 5,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "autoridade-maritima-portaria-37",
nome: "Portaria nº 37/MB/2022",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "colreg",
nome: "COLREG 1972",
horas: 7,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "publicacoes-dhn",
nome: "Publicações Náuticas da DHN",
horas: 2,
importancia: "Alta",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "sar-brasil",
nome: "Serviço de Busca e Salvamento — SAR Brasil",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "lei-12815-portos",
nome: "Lei nº 12.815/2013 — Lei dos Portos",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "lei-complementar-97",
nome: "Lei Complementar nº 97/1999",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "resolucao-imo-a960",
nome: "IMO Resolution A.960(23)",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "glossario-md35-g01",
nome: "Glossário MD35-G-01",
horas: 2,
importancia: "Média",
peso: 2,
cargaCognitiva: "Baixa"
},

{
id: "politica-nacional-defesa",
nome: "Política Nacional de Defesa",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "politica-maritima-nacional",
nome: "Política Marítima Nacional",
horas: 2,
importancia: "Alta",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "decreto-2256",
nome: "Decreto nº 2.256/1997",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "lei-7642-pem",
nome: "Lei nº 7.642/1987 — PEM",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "lei-7652-registro-propriedade-maritima",
nome: "Lei nº 7.652/1988 — Registro da Propriedade Marítima",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "lei-9432-transporte-aquaviario",
nome: "Lei nº 9.432/1997 — Transporte Aquaviário",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
}

]

},


// =====================================
// VI - COMUNICAÇÕES
// Total aproximado: 20 h
// =====================================

comunicacoes: {

nome: "Comunicações",

prioridade: "Média",

pesoDisciplina: 2,

assuntos: [

{
id: "smcp",
nome: "Standard Marine Communication Phrases — SMCP",
horas: 6,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "radiocomunicacoes-maritimas",
nome: "Radiocomunicações Marítimas",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "codigo-internacional-sinais",
nome: "Código Internacional de Sinais",
horas: 3,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Baixa"
},

{
id: "gmdss",
nome: "GMDSS",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Média"
},

{
id: "exercicios-comunicacoes",
nome: "Exercícios e Revisão de Comunicações",
horas: 3,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
}

]

},


// =====================================
// VII - CONHECIMENTOS GERAIS
// Total aproximado: 34 h
// =====================================

"conhecimentos-gerais": {

nome: "Conhecimentos Gerais",

prioridade: "Alta",

pesoDisciplina: 4,

assuntos: [

{
id: "planejamento-portuario",
nome: "Planejamento Portuário",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "pianc",
nome: "PIANC — Harbour Approach Channels",
horas: 5,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Alta"
},

{
id: "normam-224",
nome: "NORMAM-224",
horas: 4,
importancia: "Muito Alta",
peso: 5,
cargaCognitiva: "Alta"
},

{
id: "fatores-humanos",
nome: "Fatores Humanos e Fadiga",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "ship-port-interface",
nome: "Ship/Port Interface e Aspectos Operacionais",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "direitos-humanos",
nome: "Direitos Humanos",
horas: 2,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "marpol",
nome: "MARPOL 73/78",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
},

{
id: "economia-maritima",
nome: "Economia Marítima",
horas: 3,
importancia: "Média",
peso: 3,
cargaCognitiva: "Baixa"
},

{
id: "direito-processual-maritimo",
nome: "Direito Processual Marítimo",
horas: 4,
importancia: "Alta",
peso: 4,
cargaCognitiva: "Média"
}

]

}


};


// =====================================
// DEBUG
// =====================================

console.log(
    "BANCO DE CONTEÚDO PSCPP v3.1 CARREGADO"
);


console.log(
    conteudoPSCPP
);


// =====================================
// FIM DO BANCO DE CONTEÚDO PSCPP v3.1
// =====================================
