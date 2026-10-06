// =====================================
// BANCO DE QUESTÕES — NAVEGAÇÃO
// Bridge Trainer PSCPP
// Versão 1.0
// =====================================


const questoesNavegacaoPSCPP = [


// =====================================
// NAV-0001
// CONVERSÃO DE RUMOS E MARCAÇÕES
// =====================================

{
    id: "NAV-0001",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Conversão de Rumos e Marcações",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Um navio navega no Rumo da Agulha (Rag) 085° em uma região onde a Declinação Magnética (Dec mg) na carta náutica é de 21° W, referida ao ano de 2015, apresentando um incremento anual para Oeste de 3' por ano. O ano atual da navegação é 2025. O navegador consulta a Curva de Desvios da Agulha Magnética de bordo e obtém para esta proa um Desvio da Agulha (Dag) de 3,5° E. Sabendo-se que o navio observa o farol de uma ilha na Marcação da Agulha (Mag) 320°, assinale a alternativa que apresenta, respectivamente, o Rumo Verdadeiro (Rv) do navio e a Marcação Verdadeira (Mv) a ser traçada na carta náutica.",

    alternativas: {

        A: "Rv = 067,0°; Mv = 302,0°",

        B: "Rv = 064,5°; Mv = 299,5°",

        C: "Rv = 067,0°; Mv = 338,0°",

        D: "Rv = 103,0°; Mv = 338,0°",

        E: "Rv = 070,5°; Mv = 305,5°"

    },

    resposta: "A",

    comentario:
        "A Declinação Magnética em 2015 era 21° W. Em 10 anos, com incremento anual de 3' W, ocorre uma variação total de 30' W, ou 0,5° W. Assim, em 2025, Dec mg = 21,5° W. Como Rag = 085° e Dag = 3,5° E, temos Rmg = 088,5°. Aplicando a declinação: Rv = 088,5° - 21,5° = 067,0°. Para a marcação: Mv = 320° + 3,5° - 21,5° = 302,0°. Portanto, a alternativa correta é A.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Agulhas náuticas, rumos e marcações",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0002
// DESVIOS DA AGULHA MAGNÉTICA
// =====================================

{
    id: "NAV-0002",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Determinação dos Desvios da Agulha Magnética",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Para a determinação e verificação dos Desvios da Agulha Magnética por meio do método da \"Marcação de um Ponto Distante\", o Navegação Ciência e Arte (Vol. 1) estabelece critérios geométricos para mitigar erros observacionais. Em conformidade com a referida publicação, é incorreto afirmar que:",

    alternativas: {

        A: "O navio deve preferencialmente estar amarrado a uma bóia ou fundeado, com sua posição conhecida com exatidão por meios independentes.",

        B: "O ponto visado deve ser bem definido, estar devidamente representado na carta náutica e encontrar-se a uma distância mínima de 6 milhas náuticas do navio.",

        C: "A distância mínima de 6 milhas garante que, durante um giro do navio em torno do ferro com raio de até 100 metros, a variação da marcação verdadeira do objeto seja inferior a 0,5°.",

        D: "O desvio da agulha para cada proa testada é determinado comparando-se a Marcação da Agulha (Mag) observada com a Marcação Magnética (Mmg) do objeto.",

        E: "Caso o navio determine o desvio da agulha governando sobre um alinhamento cartografado, esse valor de desvio independe da proa do navio, podendo ser aplicado a qualquer rumo posterior."

    },

    resposta: "E",

    comentario:
        "A alternativa E é incorreta. O Desvio da Agulha Magnética é função da proa do navio. Um desvio determinado enquanto o navio governa sobre determinado alinhamento corresponde àquela proa específica e não pode ser generalizado para qualquer rumo posterior.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Agulha Magnética — determinação dos desvios",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0003
// COMPENSAÇÃO DA AGULHA MAGNÉTICA
// =====================================

{
    id: "NAV-0003",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Compensação de Agulhas e Desvio de Banda",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A compensação do Desvio de Banda na agulha magnética de bordo é realizada com o auxílio da Balança de Inclinação. Segundo as instruções contidas no Capítulo 3 do Navegação Ciência e Arte (Vol. 1), assinale a opção correta.",

    alternativas: {

        A: "A balança de inclinação é calibrada em terra ajustando-se o contrapeso à distância d; a bordo, antes de iniciar a compensação na 1ª proa (Rmg E ou W), o contrapeso deve ser deslocado para a distância 0,9d (ou 0,8d se a agulha estiver em compartimento de aço).",

        B: "A compensação do desvio de banda deve ser efetuada com o navio aproado obrigatoriamente ao Norte ou Sul magnético, pois nesses rumos o campo vertical do navio é máximo.",

        C: "O desvio de banda é corrigido mediante a alteração da posição das esferas de ferro doce no plano longitudinal do navio.",

        D: "A mudança de latitude magnética não altera a compensação do desvio de banda previamente efetuada, dispensando novos ajustes.",

        E: "Os ímãs de compensação do desvio de banda são instalados horizontalmente na bitácula paralelos à linha de fé."

    },

    resposta: "A",

    comentario:
        "Na compensação do Desvio de Banda utilizando a Balança de Inclinação, a distância d obtida em terra é ajustada a bordo para 0,9d, ou 0,8d quando a agulha se encontra em compartimento de aço, antes do início da compensação na primeira proa magnética Leste ou Oeste. Portanto, a alternativa correta é A.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 3 — Agulhas Náuticas",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0004
// SEGMENTO CAPAZ
// =====================================

{
    id: "NAV-0004",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "LDP — Segmento Capaz",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na navegação costeira visual por segmento capaz, o navegador mede com o sextante o ângulo horizontal α = 40° entre dois pontos de terra, M e F. Sobre a construção geométrica dessa Linha de Posição na carta náutica, assinale a opção correta.",

    alternativas: {

        A: "O centro O da circunferência do segmento capaz situa-se na mediatriz do segmento MF, sendo localizado traçando-se a partir de M ou F um ângulo de 90° - α = 50° para o lado em que se encontra o navio.",

        B: "Se o ângulo observado for obtuso (α > 90°), o ângulo a ser traçado a partir de M para encontrar o centro O na mediatriz será dado por 180° - α.",

        C: "O ângulo central do segmento capaz subtendido pelo arco MF é igual ao próprio ângulo lido α = 40°.",

        D: "A LDP segmento capaz sofre acentuada degradação de precisão quando a agulha giroscópica de bordo apresenta um erro desconhecido de 2°.",

        E: "A observação do segmento capaz por sextante dispensa cuidados com a altitude dos pontos visados, mesmo quando há acentuada diferença de elevação entre eles."

    },

    resposta: "A",

    comentario:
        "Na construção do segmento capaz para um ângulo agudo α, traça-se a mediatriz do segmento que une os dois pontos observados e, a partir de um deles, constrói-se o ângulo 90° - α. Para α = 40°, o ângulo de construção é 50°. O ângulo central correspondente é 2α. A técnica utiliza ângulo horizontal e, portanto, não depende diretamente do erro da agulha.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição — Segmento Capaz",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0005
// PRECISÃO DAS LDPs
// =====================================

{
    id: "NAV-0005",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Ângulo de Cruzamento de LDPs",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A precisão da posição observada por duas LDPs depende do ângulo de corte entre elas. Com base nos ensinamentos do Navegação Ciência e Arte (Vol. 1) sobre o efeito geométrico no erro de posição, assinale a alternativa correta.",

    alternativas: {

        A: "O ângulo ideal de cruzamento entre duas LDPs para obter a mínima área de incerteza é de 60°.",

        B: "Se o navio navega sobre um alinhamento perfeito e cruza uma segunda LDP a 30° com um erro de marcação de -5°, o erro da posição resultante será menor do que se a segunda LDP cruzasse o alinhamento a 90° com o mesmo erro de -5°.",

        C: "Devem ser evitados ângulos de cruzamento entre LDPs menores que 30° ou maiores que 150°, pois a área de incerteza cresce significativamente.",

        D: "No cruzamento de três LDPs visuais, o ângulo ideal entre elas é de 45° quando todos os pontos estão situados no mesmo bordo.",

        E: "O erro de posição resultante do cruzamento de duas LDPs varia na razão direta do seno do ângulo de corte (Δx = e · sin θ)."

    },

    resposta: "C",

    comentario:
        "Devem ser evitados ângulos de cruzamento inferiores a 30° ou superiores a 150°, pois a geometria do corte aumenta significativamente a incerteza da posição. Para duas LDPs, a situação mais favorável ocorre próxima de 90°. A relação geométrica do erro possui o seno do ângulo de corte no denominador, razão pela qual ângulos muito agudos ou próximos de 180° amplificam o erro.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição — precisão e ângulo de cruzamento",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0006
// TEORIA DE ERROS
// =====================================

{
    id: "NAV-0006",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Teoria de Erros em LDPs",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "No estudo da precisão do posicionamento costeiro visual exposto no Navegação Ciência e Arte (Vol. 1), a relação entre o erro provável (E) e as zonas de confiança da LDP estabelece que:",

    alternativas: {

        A: "O erro provável (E) corresponde à probabilidade de 95% de o navio não exceder a referida margem em torno da LDP.",

        B: "A zona de confiança de 50% de probabilidade é uma faixa centrada na LDP com largura total de 2E, enquanto a zona de 95% de probabilidade possui uma largura total de 6E.",

        C: "O erro provável (E) é matematicamente igual a 3/2 do erro médio quadrático.",

        D: "A elipse de erro da posição observada transforma-se em um círculo perfeito quando o ângulo de cruzamento de duas LDPs é igual a 30°.",

        E: "O parâmetro dRMS representa o erro máximo absoluto cometido em 100% das observações azimutais de passadiço."

    },

    resposta: "B",

    comentario:
        "A zona de confiança de 50% corresponde a uma faixa de largura total 2E, ou ±E em torno da LDP. Para 95% de probabilidade, a faixa considerada possui largura total 6E, ou ±3E. Portanto, a alternativa correta é B.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição — teoria de erros e precisão",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0007
// ILUMINAÇÃO DA CARTA
// =====================================

{
    id: "NAV-0007",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Iluminação da Carta Náutica e Critério das Profundidades",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "No planejamento da navegação de segurança em águas restritas, o Encarregado de Navegação \"ilumina\" a carta náutica para destacar as áreas perigosas (No-Go Areas). Segundo o Capítulo 7 do Navegação Ciência e Arte (Vol. 1), assinale a alternativa correta.",

    alternativas: {

        A: "No critério das profundidades, a linha de perigo é traçada na isobática correspondente ao calado do navio acrescido da margem de segurança vertical (ou 15% do calado, se esse valor for maior).",

        B: "A margem de segurança vertical considera apenas a profundidade cartografada, descartando os efeitos de variação de maré e squat.",

        C: "O critério da distância ao perigo mais próximo exige a manutenção rígida de uma faixa de 5 milhas de qualquer obstáculo submerso, independentemente do calado do navio.",

        D: "A iluminação da carta por hachuramento a lápis deve cobrir totalmente os símbolos dos auxílios à navegação para evitar distração visual.",

        E: "Uma isobática utilizada como LDP de segurança possui o mesmo grau de precisão geométrica de um alinhamento visual em qualquer tipo de fundo."

    },

    resposta: "A",

    comentario:
        "No critério das profundidades, a linha de perigo é estabelecida considerando o calado do navio acrescido da margem de segurança vertical, adotando-se 15% do calado quando esse valor for superior à margem estabelecida. A análise da margem vertical deve considerar os fatores que possam reduzir a folga disponível sob a quilha.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 7 — Planejamento e navegação de segurança",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0008
// MARCAÇÕES DE SEGURANÇA
// =====================================

{
    id: "NAV-0008",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Marcações de Segurança e Setores de Perigo",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Um navio aproxima-se de uma barra navegando no Rumo Verdadeiro Rv = 000°. Para evitar uma área de pedras submersas projetada da costa a boreste da derrota, o navegador estabelece uma Marcação de Segurança M = 010° em relação ao farol Ponta Alta. Durante a aproximação, o navegador observa a marcação visual do farol. Assinale a conduta correta.",

    alternativas: {

        A: "Qualquer marcação observada do farol maior que 010° (por exemplo, 015°) indica que o navio está em águas seguras.",

        B: "Qualquer marcação observada menor que 010° (por exemplo, 005°) indica que o navio está garantido em águas profundas a safa do perigo.",

        C: "Se a marcação observada for 005°, o navio deve guinar imediatamente para boreste para afastar-se do perigo.",

        D: "A marcação de segurança só possui validade operacional se o navio estiver navegando com o piloto automático acoplado ao GPS.",

        E: "Caso o perigo estivesse situado a bombordo da derrota, as marcações maiores que 010° indicariam invasão da zona de perigo."

    },

    resposta: "A",

    comentario:
        "No cenário apresentado, o perigo encontra-se a boreste da derrota e a marcação de segurança foi estabelecida em 010°. Uma marcação observada superior a esse limite, como 015°, mantém o navio no setor seguro definido pela geometria da marcação de segurança. A interpretação deve sempre considerar a posição relativa do perigo, do ponto de referência e da derrota planejada.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição e Marcações de Segurança",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0009
// SETORES DE FARÓIS
// =====================================

{
    id: "NAV-0009",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Setores de Visibilidade e Orientação de Faróis",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A interpretação dos arcos e setores de visibilidade das luzes dos faróis nas cartas náuticas e na Lista de Faróis da DHN segue regras cartográficas padronizadas. De acordo com o Navegação Ciência e Arte (Vol. 1), assinale a alternativa correta.",

    alternativas: {

        A: "As marcações dos limites de setores de luz são dadas em Marcações Magnéticas tomadas do farol para o mar.",

        B: "Os limites dos setores de luz são dados em Marcações Verdadeiras, de 000° a 360°, tomadas do mar para o sinal (ao largo), no sentido horário.",

        C: "O setor encarnado de um farol indica a direção na qual a luz é emitida com maior intensidade para aterragem em mar aberto.",

        D: "O setor de obscuridade de um farol representa uma faixa segura de navegação canalizada por feixes laser.",

        E: "Quando um navio cruza o limite e entra no setor colorido de aviso de um farol, deve manter a proa no mesmo rumo até encontrar o próximo alinhamento."

    },

    resposta: "B",

    comentario:
        "Os limites dos setores de luz são expressos por Marcações Verdadeiras, de 000° a 360°, tomadas do mar para o sinal, isto é, ao largo, e contadas no sentido horário. A alternativa B reproduz essa convenção.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Auxílios à Navegação — faróis e setores de visibilidade",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0010
// TRANSPORTE DE LDP
// =====================================

{
    id: "NAV-0010",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Transporte de Linha de Posição",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Quando o navegador dispõe de apenas um ponto notável em terra visível durante um intervalo de tempo, utiliza-se o transporte de LDP. Ao transportar uma reta de marcação observada às 1300h para as 1330h, considerando rumo e velocidade constantes, assinale a alternativa correta.",

    alternativas: {

        A: "A marcação das 1300h é trasladada paralelamente a si mesma ao longo da direção do rumo no fundo, cobrindo a distância percorrida pelo navio no intervalo.",

        B: "A posição obtida pelo cruzamento da LDP transportada com a nova LDP das 1330h é uma posição observada de precisão absoluta, isenta de erros de corrente.",

        C: "O transporte da LDP deve ser realizado deslocando-se a linha na direção da marcação do objeto visado.",

        D: "É permitido transportar uma LDP visual por tempo indeterminado durante a navegação costeira sem necessidade de novas confirmações."

    },

    resposta: "A",

    comentario:
        "O transporte de uma Linha de Posição consiste em trasladar a LDP paralelamente a si mesma segundo o deslocamento do navio durante o intervalo considerado. A distância transportada corresponde ao deslocamento ocorrido entre as duas observações. A posição obtida incorpora as incertezas existentes na estimativa do movimento do navio e não possui precisão absoluta.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição — transporte de LDP",
            pagina: ""
        }

    ]
}


];


// =====================================
// BANCO — NAVEGAÇÃO
// =====================================

const bancoNavegacaoPSCPP = {

    id: "navegacao",

    nome: "Navegação",

    versao: "1.0",

    questoes: questoesNavegacaoPSCPP

};


// =====================================
// FUNÇÕES DE ACESSO AO BANCO
// =====================================

function obterQuestoesNavegacaoPSCPP() {

    return [...questoesNavegacaoPSCPP];

}


function obterQuestaoNavegacaoPorIdPSCPP(questaoId) {

    return questoesNavegacaoPSCPP.find(function(questao) {

        return questao.id === questaoId;

    }) || null;

}


function obterQuantidadeQuestoesNavegacaoPSCPP() {

    return questoesNavegacaoPSCPP.length;

}
