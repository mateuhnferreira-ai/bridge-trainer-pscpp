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
},

 // =====================================
// NAV-0011
// ALCANCE DE FARÓIS
// =====================================

{
    id: "NAV-0011",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Alcance Nominal, Luminoso e Geográfico de Faróis",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na aterragem costeira, a determinação da distância de avistamento de um farol exige o correto entendimento dos seus alcances. Em conformidade com a conceituação da DHN:",

    alternativas: {

        A: "O Alcance Geográfico independe da curvatura da Terra, dependendo apenas da intensidade luminosa da lâmpada em candelas.",

        B: "O Alcance Luminoso é a distância máxima de avistamento considerando a elevação do foco e a altura dos olhos do observador.",

        C: "O Alcance Nominal informado nas cartas náuticas é o alcance luminoso para uma visibilidade meteorológica padrão de 10 milhas náuticas.",

        D: "Se o Alcance Geográfico de um farol for de 16 milhas e seu Alcance Luminoso para a visibilidade do momento for de 10 milhas, o navegador avistará a luz a 16 milhas.",

        E: "A elevação do foco da luz do farol informada na carta náutica é referida ao Nível de Redução (NR) das sondagens."

    },

    resposta: "C",

    comentario:
        "O Alcance Nominal é o alcance luminoso correspondente a uma visibilidade meteorológica padrão de 10 milhas náuticas. O Alcance Geográfico está relacionado à curvatura da Terra, à elevação do foco e à altura dos olhos do observador. Já o Alcance Luminoso depende da intensidade luminosa e das condições de visibilidade. Na prática, o avistamento fica limitado pelo menor dos alcances aplicáveis.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Auxílios à Navegação — alcance das luzes",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0012
// NAVEGAÇÃO ESTIMADA
// =====================================

{
    id: "NAV-0012",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Navegação Estimada — Dead Reckoning",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A navegação estimada (DR) é a técnica de determinar a posição provável do navio a partir das características do seu movimento. Conforme exposto no Capítulo 5 do Navegação Ciência e Arte (Vol. 1):",

    alternativas: {

        A: "A posição estimada considera rigorosamente o efeito de ventos e correntes marítimas em seu cálculo básico.",

        B: "O raio do círculo de incerteza em torno da posição estimada representa a consistência do ponto, admitida empiricamente como 10% (0,1) da distância percorrida desde a última posição observada.",

        C: "A plotagem do ponto estimado deve ser feita utilizando o Rumo no Fundo (Rf) e a Velocidade no Fundo (SOG).",

        D: "O ponto estimado (Pest) possui o mesmo grau de confiabilidade e precisão que um ponto observado (Pobs) por três LDPs simultâneas.",

        E: "Uma mudança de rumo altera a posição estimada anterior, exigindo o cancelamento do traçado desde a última posição observada."

    },

    resposta: "B",

    comentario:
        "Segundo o conjunto fornecido, o raio do círculo de incerteza associado à posição estimada é admitido empiricamente como 10%, ou 0,1, da distância percorrida desde a última posição observada. A posição estimada não possui o mesmo grau de confiabilidade de uma posição obtida por LDPs observadas simultaneamente.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 5 — Navegação Estimada",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0013
// TRIÂNGULO DE CORRENTE
// =====================================

{
    id: "NAV-0013",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Triângulo de Corrente",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na resolução gráfica dos problemas do triângulo de corrente em navegação costeira, conforme o Capítulo 5 do Navegação Ciência e Arte, os vetores representam diferentes componentes do movimento. Assinale a alternativa correta.",

    alternativas: {

        A: "O vetor do rumo e velocidade na água do navio liga a posição de partida à posição no fundo.",

        B: "A Direção da Corrente (Rumo da Corrente) é a direção PARA ONDE a corrente flui, e a sua intensidade é a Velocidade da Corrente.",

        C: "O Caimento é o ângulo formado entre a proa do navio e a linha de rumo da agulha devido ao efeito exclusivo da giroscópica.",

        D: "O Abatimento é o desvio provocado exclusivamente pelo efeito da corrente marítima sob a quilha do navio.",

        E: "A Velocidade de Avanço (SOA) é a velocidade efetivamente medida pelo odômetro de fundo doppler em relação à água."

    },

    resposta: "B",

    comentario:
        "No triângulo de corrente, a direção ou rumo da corrente indica para onde a corrente flui, enquanto sua intensidade corresponde à velocidade da corrente. Essa convenção deve ser distinguida da utilizada para o vento, cuja direção normalmente indica de onde ele sopra.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 5 — Correntes e navegação estimada",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0014
// RADAR — STC E FTC
// =====================================

{
    id: "NAV-0014",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Radar Costeiro — Controles STC e FTC",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Durante a navegação costeira e em canais de acesso com radar, o operador deve ajustar adequadamente os circuitos de atenuação do receptor. Segundo o Capítulo 14 do Navegação Ciência e Arte (Vol. 1):",

    alternativas: {

        A: "O controle STC (Anti-Clutter Mar) deve ser mantido no nível máximo absoluto em mar calmo para aumentar o ganho em distâncias longas.",

        B: "O controle FTC (Anti-Clutter Chuva) é um filtro diferenciador que reduz a extensão de ecos maciços, como chuva e neve, permitindo identificar alvos no interior da precipitação.",

        C: "A linha de fé luminosa (Heading Marker) não oferece risco de mascarar pequenos ecos diretamente pela proa do navio.",

        D: "O ajuste de sintonia (tuning) do radar deve ser feito reduzindo o ganho ao mínimo até a imagem desaparecer por completo.",

        E: "A apresentação do radar em Head-Up não estabilizado é a única aceita para traçado de paralelas indexadas em canais estreitos."

    },

    resposta: "B",

    comentario:
        "O FTC (Fast Time Constant), empregado como Anti-Clutter Chuva, atua sobre ecos extensos de precipitação, reduzindo sua extensão apresentada e facilitando a identificação de alvos no interior dessas áreas. O STC está associado principalmente à atenuação do clutter do mar nas proximidades do navio e seu emprego excessivo pode eliminar ecos pequenos.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 14 — Radar",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0015
// LIMITAÇÕES DO RADAR
// =====================================

{
    id: "NAV-0015",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Radar Costeiro — Largura do Feixe Horizontal",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Ao obter marcações radar de acidentes geográficos para posicionamento costeiro, o navegador deve considerar as distorções da antena. Assinale a afirmativa correta.",

    alternativas: {

        A: "As marcações radar são mais precisas do que as distâncias radar devido à alta resolução angular da antena.",

        B: "O efeito da largura do feixe horizontal (beamwidth) alarga visualmente os alvos na tela, fazendo com que marcações tangentes a uma ilha pareçam mais abertas, deslocadas para fora do acidente real.",

        C: "Na aterragem com radar em costas baixas e praias de areia, o primeiro eco refletido na tela corresponde rigorosamente à linha de baixa-mar.",

        D: "Ecos duplos surgem na tela do radar posicionados na metade da distância real do alvo refletor.",

        E: "Setores de sombra radar ocorrem apenas quando o navio opera na banda S e o ganho está desajustado."

    },

    resposta: "B",

    comentario:
        "A largura horizontal do feixe da antena produz alargamento azimutal dos ecos. Por isso, as bordas aparentes de um alvo extenso podem aparecer deslocadas para fora, afetando especialmente as marcações radar tangentes a ilhas, promontórios e outros acidentes geográficos. Em geral, as distâncias radar apresentam maior precisão que as marcações.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 14 — Radar, precisão e limitações",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0016
// PARALLEL INDEXING
// =====================================

{
    id: "NAV-0016",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Parallel Indexing — Paralelas Indexadas",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A técnica de Paralelas Indexadas no radar é amplamente utilizada para o monitoramento contínuo da posição em canais restritos costeiros. Sobre essa técnica, é correto afirmar que:",

    alternativas: {

        A: "Exige obrigatoriamente a apresentação do radar em Movimento Verdadeiro (True Motion) com estabilização no fundo.",

        B: "Consiste em traçar na tela do radar uma linha paralela à derrota planejada, mantida tangente ao eco de um ponto fixo de terra a uma distância igual à distância de passagem prevista (DPA).",

        C: "Se o eco do ponto de referência afastar-se da linha indexada, significa que o navio está mantendo-se perfeitamente sobre a derrota.",

        D: "A técnica é aplicável apenas a pontos de terra situados diretamente sobre a linha de fé na proa.",

        E: "Paralelas indexadas funcionam adequadamente com radares operando em Head-Up não estabilizado por agulha."

    },

    resposta: "B",

    comentario:
        "A Parallel Index é estabelecida paralelamente à derrota planejada, com afastamento correspondente à distância de passagem prevista em relação ao ponto fixo utilizado como referência. O movimento do eco em relação à linha indexada permite acompanhar continuamente se o navio permanece ou não na derrota prevista.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 14 — Navegação Radar e Paralelas Indexadas",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0017
// ROSA DE MANOBRA
// =====================================

{
    id: "NAV-0017",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Rosa de Manobra — Triângulo de Velocidades",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na resolução de problemas de movimento relativo na Rosa de Manobra para navegação costeira e radar, conforme o Capítulo 14 do Navegação Ciência e Arte, assinale a alternativa correta.",

    alternativas: {

        A: "O centro do diagrama circular é designado pela letra t, o vetor t → r representa o rumo e velocidade verdadeira do navio de referência, e o vetor t → m representa o rumo e velocidade verdadeira do alvo.",

        B: "O vetor r → m representa a direção e velocidade do movimento verdadeiro do navio manobrador.",

        C: "A Direção do Movimento Relativo (DMR) é dada pelo vetor t → m.",

        D: "O ponto r representa sempre a posição geográfica inicial do alvo no instante da primeira plotagem.",

        E: "Se o vetor de movimento relativo r → m for nulo, o alvo está navegando na mesma velocidade do navio de referência em rumos cruzados a 90°."

    },

    resposta: "A",

    comentario:
        "Na simbologia utilizada na Rosa de Manobra, t representa o centro ou navio de referência. O vetor t → r representa o movimento verdadeiro do navio de referência, t → m representa o movimento verdadeiro do alvo e r → m representa o movimento relativo. A alternativa correta é A.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 14 — Rosa de Manobra e movimento relativo",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0018
// ROSA DE MANOBRA — PROBLEMA OPERACIONAL
// =====================================

{
    id: "NAV-0018",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Rosa de Manobra — Movimento Relativo e CPA",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Um navio de referência t navega no Rumo Verdadeiro Rv = 000° a 15 nós. Às 1000h, um contato m é detectado na Marcação Verdadeira Mv = 045° a 10,0 milhas. Às 1012h (Δt = 12 min), o mesmo contato encontra-se na Mv = 045° a 6,0 milhas. Assinale a alternativa com a análise correta.",

    alternativas: {

        A: "DMR = 225°; PMA/CPA = 0,0 milhas (rumo de colisão direta); o alvo navega no Rv = 180° com V = 5 nós.",

        B: "DMR = 045°; PMA = 6,0 milhas; o alvo possui o mesmo rumo e velocidade do navio de referência.",

        C: "DMR = 225°; PMA = 0,0 milhas; o alvo navega no Rv = 225° a 20 nós.",

        D: "DMR = 135°; PMA = 4,0 milhas; o alvo está parado na água sem seguimento.",

        E: "Trata-se de um eco falso decorrente de reflexão indireta na superestrutura do próprio navio."

    },

    resposta: "A",

    comentario:
        "A marcação permanece constante em 045° enquanto a distância diminui de 10 para 6 milhas, caracterizando aproximação em rumo de colisão e CPA igual a zero. A DMR é a recíproca da marcação, ou 225°. Em 12 minutos, a distância relativa diminui 4 milhas, correspondendo a uma velocidade relativa de 20 nós. Segundo a construção apresentada no conjunto, o triângulo de velocidades conduz ao alvo no Rv = 180° com velocidade de 5 nós.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 14 — Rosa de Manobra e movimento relativo",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0019
// MARÉS E NÍVEL DE REDUÇÃO
// =====================================

{
    id: "NAV-0019",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Nível de Redução, Altura da Maré e Profundidade Total",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na navegação costeira em áreas de pouca sonda, a relação entre os planos de referência vertical é crítica para a segurança. Segundo as definições da DHN e do Navegação Ciência e Arte, assinale a alternativa correta.",

    alternativas: {

        A: "O Nível de Redução (NR) é o plano de referência das sondagens nas cartas brasileiras, correspondendo ao nível médio dos mares (NM).",

        B: "A Altura da Maré é a distância vertical entre a superfície da água num dado instante e o Nível de Redução (NR).",

        C: "A Profundidade Total (P) em um determinado instante é calculada subtraindo-se a Altura da Maré (E) da Sondagem Cartografada (D).",

        D: "As marés de sizígia ocorrem na lua em quarto minguante, apresentando as menores alturas do mês.",

        E: "O plano do Nível de Redução fica situado acima do Nível Médio em todas as cartas náuticas da DHN."

    },

    resposta: "B",

    comentario:
        "A Altura da Maré é a distância vertical entre a superfície da água em determinado instante e o Nível de Redução. A profundidade disponível é obtida considerando a sondagem cartografada e a altura da maré correspondente ao instante considerado. O Nível de Redução não deve ser confundido com o Nível Médio.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Marés — níveis de referência e profundidades",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0020
// SIZÍGIA E QUADRATURA
// =====================================

{
    id: "NAV-0020",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Marés de Sizígia e Quadratura",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "O comportamento astronômico das marés influencia diretamente a Folga Abaixo da Quilha (UKC). Conforme a doutrina do Navegação Ciência e Arte (Vol. 1), assinale a alternativa correta.",

    alternativas: {

        A: "Nas marés de sizígia (lua nova e cheia), as forças atrativas do Sol e da Lua se somam, produzindo as maiores preamares e as menores baixamares, isto é, as maiores amplitudes.",

        B: "Nas marés de quadratura, ocorrem as maiores amplitudes do mês, elevando o risco de encalhe na preamar.",

        C: "O estofo da maré é o momento de máxima velocidade da corrente de maré na barra do porto.",

        D: "Durante as baixamares de sizígia, a profundidade real encontrada no mar será invariavelmente maior do que a sonda representada na carta náutica.",

        E: "A amplitude da maré é definida como a distância vertical entre a linha de flutuação do navio e o fundo do mar."

    },

    resposta: "A",

    comentario:
        "As marés de sizígia ocorrem nas fases de Lua Nova e Lua Cheia, quando os efeitos gravitacionais do Sol e da Lua atuam de forma a produzir amplitudes maiores: preamares mais altas e baixamares mais baixas. Nas quadraturas, associadas aos quartos crescente e minguante, as amplitudes são menores.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Marés — sizígia e quadratura",
            pagina: ""
        }

    ]
},

// =====================================
// NAV-0021
// SINCRONISMO DAS OBSERVAÇÕES
// =====================================

{
    id: "NAV-0021",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Sincronismo das Observações — Ordem MARQUE!",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na condução prática da navegação costeira visual por uma Equipe de Navegação (Bridge Team), a coordenação temporal na leitura das LDPs é essencial para evitar deformação na posição observada. Segundo a publicação oficial, assinale a alternativa correta.",

    alternativas: {

        A: "A ordem verbal \"MARQUE!\" é utilizada para sincronizar a leitura simultânea de alidades, repetidoras e radares, atribuindo-se essa hora à posição obtida.",

        B: "As leituras de LDPs por diferentes observadores podem ser realizadas com até 10 minutos de diferença sem necessidade de transporte gráfico.",

        C: "O erro instrumental da agulha giroscópica é desprezível e não necessita de verificação antes da entrada em canais restritos.",

        D: "As retas de marcação visual devem ser traçadas na carta náutica estendendo-se obrigatoriamente desde o ponto visado até a margem oposta da carta.",

        E: "A posição observada por LDPs visuais refere-se à posição futura estimada para os próximos 15 minutos de viagem."

    },

    resposta: "A",

    comentario:
        "A ordem verbal \"MARQUE!\" é utilizada para sincronizar o instante das observações realizadas pelos diferentes integrantes da equipe de navegação. Dessa forma, as LDPs obtidas podem ser consideradas referentes ao mesmo instante, reduzindo o erro decorrente do deslocamento do navio entre observações.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Navegação Costeira — obtenção e plotagem de LDPs",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0022
// ALINHAMENTOS
// =====================================

{
    id: "NAV-0022",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Alinhamentos como Linha de Posição",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Os alinhamentos constituem Linhas de Posição de altíssima precisão na navegação costeira. De acordo com o Capítulo 4 do Navegação Ciência e Arte (Vol. 1), assinale a alternativa correta.",

    alternativas: {

        A: "O uso de um alinhamento como LDP depende obrigatoriamente da calibração prévia da agulha magnética.",

        B: "Os alinhamentos constituem LDPs de excelente precisão e não necessitam de qualquer instrumento de bússola para sua observação, além de permitirem a verificação direta do erro da giroscópica/agulha.",

        C: "Apenas alinhamentos oficialmente traçados e impressos nas cartas náuticas podem ser utilizados pelo navegador.",

        D: "A precisão de um alinhamento diminui à medida que a distância entre os dois pontos de terra alinhados aumenta.",

        E: "Um alinhamento não pode ser utilizado como LDP de segurança para delimitar canais de acesso a portos."

    },

    resposta: "B",

    comentario:
        "Os alinhamentos constituem LDPs de grande precisão porque sua observação independe da leitura de uma agulha. Quando dois pontos conhecidos encontram-se visualmente alinhados, o navio está sobre a linha definida por eles. Essa propriedade também permite utilizar um alinhamento conhecido para verificar erros da agulha ou da giroscópica.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 4 — Linhas de Posição e Alinhamentos",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0023
// ESTACIÓGRAFO
// =====================================

{
    id: "NAV-0023",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Estaciógrafo e Ângulos Horizontais",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Quando o navegador necessita obter a posição do navio por segmentos capazes sem conhecer o valor do erro ou desvio da agulha magnética de bordo, emprega-se a técnica de:",

    alternativas: {

        A: "Marcações astronômicas simultâneas de três estrelas no horizonte.",

        B: "Medição de três marcações da agulha de pontos adjacentes, diminuindo-se seus valores dois a dois para obter os ângulos horizontais, cancelando o desvio desconhecido e plotando a posição com estaciógrafo.",

        C: "Leitura de três distâncias radar sequenciais no mesmo ponto de terra.",

        D: "Traçado de três paralelas indexadas com espaçamento variável na tela do radar.",

        E: "Cálculo do desvio de banda com a balança de inclinação em movimento."

    },

    resposta: "B",

    comentario:
        "Tomando-se três marcações da agulha de pontos adjacentes e subtraindo seus valores dois a dois, obtêm-se os ângulos horizontais entre os pontos. Como o mesmo erro ou desvio afeta as marcações, ele é eliminado na diferença. Os ângulos resultantes podem então ser empregados no estaciógrafo para determinar a posição.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 4 — Segmentos Capazes e Estaciógrafo",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0024
// ISÓBATAS E CATZOC
// =====================================

{
    id: "NAV-0024",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Isóbatas e Zonas de Confiança — CATZOC",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A utilização da linha de igual profundidade (isóbata) como LDP na navegação costeira exige cuidados operacionais. Segundo o Capítulo 4 do Navegação Ciência e Arte (Vol. 1), assinale a alternativa correta.",

    alternativas: {

        A: "A isóbata fornece uma LDP de precisão absoluta em qualquer tipo de relevo submarino, superando as marcações visuais.",

        B: "O emprego da isóbata como LDP exige a consideração das informações do Diagrama de Levantamentos / Zonas de Confiança (CATZOC) da carta náutica e a correção da sonda pelo calado e maré.",

        C: "O alarme de profundidade do ecobatímetro deve ser ajustado no valor exato do calado máximo do navio sem margem de segurança.",

        D: "A isóbata cartografada é referida ao Nível Médio dos Mares (NM).",

        E: "A profundidade lida no ecobatímetro independe da densidade e da temperatura da água do mar na área costeira."

    },

    resposta: "B",

    comentario:
        "O emprego de uma isóbata como Linha de Posição exige avaliação da qualidade e da precisão do levantamento hidrográfico representado na carta, além das correções necessárias para comparar a profundidade observada com a profundidade cartografada. O conjunto fornecido destaca o Diagrama de Levantamentos/Zonas de Confiança (CATZOC), o calado e a maré como elementos dessa avaliação.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 4 — Linhas de Posição por profundidade",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0025
// MARCAÇÃO E DISTÂNCIA
// =====================================

{
    id: "NAV-0025",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Posição por Marcação e Distância",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "A determinação da posição observada pelo cruzamento de uma marcação visual e uma distância radar/estadiamétrica de um mesmo ponto de terra notável:",

    alternativas: {

        A: "Apresenta baixíssima confiabilidade devido à ambiguidade geométrica entre as duas LDPs.",

        B: "É uma combinação de elevadíssima precisão porque as duas LDPs, reta de marcação e circunferência de distância, cruzam-se rigorosamente a 90°.",

        C: "Exige obrigatoriamente a observação prévia de um segundo ponto distante a mais de 10 milhas.",

        D: "Gera um triângulo de incerteza de grandes dimensões na carta náutica.",

        E: "Não pode ser utilizada na navegação costeira noturna."

    },

    resposta: "B",

    comentario:
        "Uma reta de marcação dirigida ao objeto e uma circunferência de distância centrada nesse mesmo objeto possuem interseção ortogonal. No ponto de interseção, a reta radial é perpendicular à tangente da circunferência, proporcionando uma geometria muito favorável para determinação da posição.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Capítulo 4 — Determinação da posição por LDPs",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0026
// DUAS DISTÂNCIAS RADAR
// =====================================

{
    id: "NAV-0026",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Posição por Duas Distâncias Radar",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Ao obter a posição do navio por duas distâncias radar de dois pontos de terra distintos (D1 e D2), o navegador deve estar atento ao seguinte fenômeno geométrico:",

    alternativas: {

        A: "As duas circunferências de distância não se cruzam em nenhum ponto do mar.",

        B: "As duas circunferências de distância cruzam-se em dois pontos distintos, gerando ambiguidade que deve ser resolvida pela posição estimada ou por uma terceira LDP.",

        C: "A posição resultante é automaticamente eliminada pelo sistema ARPA do radar.",

        D: "O cruzamento de duas distâncias radar gera invariavelmente uma reta paralela à linha de fé.",

        E: "A ambiguidade só ocorre quando as distâncias são medidas com o radar ajustado no ganho mínimo."

    },

    resposta: "B",

    comentario:
        "Cada distância medida a um ponto conhecido define uma circunferência centrada nesse ponto. Duas circunferências podem apresentar dois pontos de interseção geometricamente possíveis. A posição estimada do navio ou uma terceira LDP permite identificar qual das interseções corresponde à posição real.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Determinação da posição por distâncias",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0027
// RETAS DE SEGURANÇA NO RADAR
// =====================================

{
    id: "NAV-0027",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Retas de Segurança no Radar e Parallel Indexing",

    edital: "Navegação Costeira",

    dificuldade: "dificil",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Na navegação radar em canais restritos, a combinação de paralelas indexadas com a iluminação da carta permite traçar \"Retas de Segurança\" no radar. Essas retas representam:",

    alternativas: {

        A: "Limites de distância de passagem de ecos de terra que garantem ao navio manter-se em profundidades seguras e a safa de perigos submersos.",

        B: "Linhas horizontais que indicam o centro exato da tela do radar em movimento verdadeiro.",

        C: "Feixes de emissão do transceptor que atenuam a interferência de outros radares na mesma faixa.",

        D: "Marcações cegas causadas pelos mastros da embarcação de praticagem."

    },

    resposta: "A",

    comentario:
        "As Retas de Segurança empregadas na navegação radar podem ser estabelecidas a partir da geometria da derrota, dos perigos cartografados e das distâncias de passagem previstas. Associadas às paralelas indexadas, permitem acompanhar continuamente se o navio permanece a uma distância segura dos perigos.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Navegação Radar — Retas de Segurança e Paralelas Indexadas",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0028
// UKC, CATURRO E ARFAGEM
// =====================================

{
    id: "NAV-0028",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "UKC — Caturro e Arfagem",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Durante a demanda a portos costeiros através de canais de acesso abertos ao mar, o comportamento dinâmico do navio sob ação de ondas provoca:",

    alternativas: {

        A: "Aumento da Folga Abaixo da Quilha (UKC) devido à sustentação hidrodinâmica das vagas na proa.",

        B: "Risco severo de toque no fundo devido ao caturro e arfagem (pitching and heaving), reduzindo drasticamente a margem de segurança vertical abaixo do casco.",

        C: "Eliminação total do efeito squat devido à aceleração vertical do navio.",

        D: "Elevação do plano do Nível de Redução da carta náutica local."

    },

    resposta: "B",

    comentario:
        "O caturro (pitching) e a arfagem (heaving) provocam movimentos verticais e angulares do casco. Em águas com pequena folga abaixo da quilha, esses movimentos podem reduzir momentaneamente a distância entre determinadas partes do casco e o fundo, aumentando o risco de toque.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Navegação em águas de pouca profundidade — margem de segurança vertical",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0029
// EFEITO SQUAT
// =====================================

{
    id: "NAV-0029",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Efeito Squat em Águas Rasas",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "O fenômeno hidrodinâmico do Efeito Squat, caracterizado pelo rebaixamento e alteração de trim durante a navegação costeira em canais rasos, caracteriza-se por:",

    alternativas: {

        A: "Elevação da quilha e diminuição do calado à medida que o navio acelera.",

        B: "Rebaixamento do casco e variação da folga abaixo da quilha (UKC) que aumenta proporcionalmente ao quadrado da velocidade na água (V²).",

        C: "Efeito nulo em navios de grande porte e formas cheias, como petroleiros e mineradores.",

        D: "Ocorrência exclusiva quando o navio navega em águas de profundidade superior a 100 metros.",

        E: "Redução da resistência do leme e facilitação da estabilidade de governo em canais estreitos."

    },

    resposta: "B",

    comentario:
        "O squat corresponde ao afundamento dinâmico do navio, acompanhado eventualmente de alteração do trim, quando navegando especialmente em águas rasas ou confinadas. No conjunto fornecido, destaca-se sua forte dependência da velocidade, aproximadamente proporcional ao quadrado da velocidade na água, e sua consequência operacional direta: redução da UKC.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Navegação em águas rasas — Squat",
            pagina: ""
        }

    ]
},


// =====================================
// NAV-0030
// ALINHAMENTO DE SEGURANÇA
// =====================================

{
    id: "NAV-0030",

    disciplina: "navegacao",

    assunto: "Navegação Costeira",

    topico: "Alinhamentos como LDP de Segurança",

    edital: "Navegação Costeira",

    dificuldade: "media",

    tipo: "multipla-escolha",

    origem: "banco",

    enunciado:
        "Ao navegar ao longo de um canal estreito costeiro ladeado por pedrais submersos em ambos os bordos, a manutenção da proa sobre um alinhamento de segurança:",

    alternativas: {

        A: "Garante que o navio está seguindo uma trajetória segura sobre a direção do alinhamento, ou sua recíproca, constituindo a LDP de segurança mais precisa.",

        B: "Exige que a equipe de passadiço efetue correções contínuas na agulha magnética a cada 5 minutos.",

        C: "Elimina a necessidade de manter observação do ecobatímetro e da carta náutica.",

        D: "Impede a navegação de qualquer outra embarcação no canal em sentido contrário.",

        E: "Só pode ser utilizado se a velocidade do navio for superior a 18 nós."

    },

    resposta: "A",

    comentario:
        "Um alinhamento fornece uma referência visual direta e de grande precisão. Quando empregado como LDP de segurança, permite verificar imediatamente se o navio permanece sobre a direção segura estabelecida. Seu emprego, entretanto, não elimina a necessidade de acompanhamento pelos demais meios disponíveis de navegação.",

    bibliografia: [

        {
            publicacao: "Navegação: A Ciência e a Arte — Volume 1",
            capitulo: "Linhas de Posição — Alinhamentos e LDPs de Segurança",
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
