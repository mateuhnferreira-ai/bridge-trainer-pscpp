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
}, 
    
// =====================================
// NAVEGAÇÃO EM ÁGUAS RESTRITAS
// NAV-0031 a NAV-0040
// =====================================

{
    id: "NAV-0031",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Definição de Águas Restritas e Limites Operacionais",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `De acordo com o Capítulo 9 do Navegação Ciência e Arte (Vol. 1), a "Navegação em Águas Restritas" é definida como aquela praticada no acesso e no interior de portos, baías, canais, rios e lagos, onde a proximidade dos perigos, a conformação da costa e/ou as profundidades reduzidas impõem severas restrições à manobra do navio. Em termos práticos de passadiço, os procedimentos inerentes à navegação em águas restritas devem ser formalmente guarnecidos quando:`,

    alternativas: {
        A: "O navio adentrar a Zona Econômica Exclusiva (ZEE) de 200 milhas náuticas da costa.",
        B: "A distância à costa ou ao perigo mais próximo for inferior a 3 milhas náuticas ou quando as profundidades reduzidas tornarem pequena a folga abaixo da quilha.",
        C: "O ecobatímetro indicar uma profundidade inferior a 100 metros, independentemente do calado da embarcação.",
        D: "O navio estiver a menos de 12 milhas náuticas da costa, no limite do Mar Territorial brasileiro.",
        E: "A visibilidade meteorológica cair abaixo de 2 milhas náuticas em alto-mar."
    },

    resposta: "B",

    comentario: `O Navegação Ciência e Arte (Vol. 1, Cap. 9, Item 9.3) estabelece que os procedimentos formais de navegação em águas restritas devem ser guarnecidos quando a distância à costa ou ao perigo mais próximo for inferior a 3 milhas náuticas ou quando as profundidades reduzidas tornarem pequena a lazeira de água abaixo da quilha.

A, C, D e E citam distâncias e profundidades genéricas (200 MN, 100 m, 12 MN, 2 MN) sem respaldo no capítulo de águas restritas.

Dica de prova: guarde o limite clássico da Marinha do Brasil para guarnecer o Detalhe Especial para o Mar em Águas Restritas: distância < 3 milhas do perigo/costa ou lazeira reduzida.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 9, Item 9.3",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0032",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Requisitos de Precisão IMO/IALA e o Parâmetro 2 dRMS",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A precisão de posicionamento exigida durante a navegação em águas restritas e na aproximação a portos é significativamente maior do que na navegação costeira ou oceânica. Segundo as recomendações da Organização Marítima Internacional (IMO) e da Associação Internacional de Autoridades de Auxílios à Navegação Marítima e Faróis (IALA) citadas no Capítulo 9 do Navegação Ciência e Arte (Vol. 1), a precisão de posição requerida para essas áreas e o significado estatístico do padrão adotado correspondem a:`,

    alternativas: {
        A: "Precisão da ordem de 100 metros, correspondendo ao erro provável simples (1E) com 50% de probabilidade.",
        B: "Precisão da ordem de 10 metros, expressa pelo parâmetro 2 dRMS (distance root mean square), que representa um nível de confiabilidade de 95%.",
        C: "Precisão absoluta de 1 metro, garantida exclusivamente pelo GPS de navegação civil sem correções diferenciais.",
        D: "Precisão da ordem de 50 metros, equivalente a 1 dRMS, representando 68% de probabilidade de acerto.",
        E: "Precisão nula, pois em águas restritas a navegação por estimativa substitui totalmente os meios de posicionamento observados."
    },

    resposta: "B",

    comentario: `O Navegação Ciência e Arte (Vol. 1, Cap. 9, Item 9.3) cita que as normas da IMO e IALA para aproximação de portos e águas restritas exigem precisões da ordem de 10 metros (2 dRMS, ou seja, 95% de confiabilidade).

A, C, D e E alteram a ordem de grandeza da precisão (100 m, 1 m, 50 m) e os conceitos de estatística de erro (1E, 1 dRMS).

Dica de prova: memorize a regra indicada no material: Águas Restritas = 10 metros de precisão com 2 dRMS (95% de probabilidade).`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 9, Item 9.3",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0033",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Dados Táticos do Navio - Geometria da Curva de Giro",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Durante uma manobra em canal restrito, o Prático ordena uma guinada de 90° para boreste. Para o correto planejamento gráfico do movimento do navio na carta náutica, é necessário compreender os elementos da curva de giro definidos no Capítulo 8 do Navegação Ciência e Arte (Vol. 1). Sobre os conceitos táticos, assinale a opção correta:`,

    alternativas: {
        A: "Avanço é a distância medida na direção do rumo inicial, desde o ponto em que o leme foi carregado até a proa atingir o novo rumo; atinge seu valor máximo para uma guinada de 90°.",
        B: "Afastamento é a distância medida ao longo da curva descrita pelo centro de gravidade, desde o instante da ordem de leme até o navio parar totalmente.",
        C: "Diâmetro Tático é a distância perpendicular medida entre o rumo inicial e a tangente à curva de giro quando o navio completa uma alteração de rumo de 360°.",
        D: "Ângulo de Deriva é o ângulo formado entre o plano diametral do navio e a linha do rumo inicial antes de carregar o leme.",
        E: "Diâmetro Final é a distância entre o ponto onde o leme foi carregado e o ponto de colisão com a margem do canal."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.2): Avanço é a distância medida na direção do rumo inicial, desde o ponto em que o leme foi carregado até a proa atingir o novo rumo. O avanço é máximo para uma guinada de 90°.

B erra a definição de Afastamento, que é medido perpendicularmente ao rumo inicial. C erra o Diâmetro Tático, relacionado à guinada de 180°. D e E trocam os conceitos de Ângulo de Deriva e Diâmetro Final.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.2",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0034",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Efeito do Leme e Abatimento da Popa - Rabo de Peixe",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Ao guinar um navio de grande porte em um canal estreito carregando o leme para boreste, o Prático deve estar extremamente atento ao comportamento dinâmico do casco nos primeiros instantes da manobra. Em conformidade com as considerações práticas sobre a curva de giro expostas no Capítulo 8 do Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "A proa guina imediatamente para boreste e todo o casco ganha caminho para boreste sem que a popa se desloque para bombordo.",
        B: "A água exerce forte pressão sobre a porta do leme, fazendo com que a proa guine para boreste, enquanto o centro de gravidade continua inicialmente no rumo original e a popa é empurrada para bombordo, produzindo um abatimento lateral para o bordo oposto ao da guinada.",
        C: "O navio começa a ganhar caminho lateral para o bordo da guinada imediatamente após o leme atingir 5 graus de bordo.",
        D: "O abatimento da popa para o bordo oposto à guinada é cancelado se o navio estiver navegando em velocidade reduzida de 3 nós.",
        E: "Para evitar um obstáculo diretamente pela proa a uma distância inferior a um comprimento do navio, basta carregar todo o leme para um dos bordos."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.3): ao carregar o leme para um bordo, a pressão na porta do leme faz a proa guinar para o bordo da guinada, mas o centro de gravidade segue inicialmente o rumo original e a popa é empurrada para o bordo contrário, produzindo o abatimento da popa ou "rabo de peixe".

A e C ignoram esse abatimento inicial da popa. D e E afirmam incorretamente que baixa velocidade ou leme total anulam o fenômeno ou garantem evitar obstáculo muito próximo.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.3",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0035",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Variação dos Dados Táticos com o Ângulo de Leme e Velocidade",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A relação entre a velocidade do navio, o ângulo de leme aplicado e as dimensões da curva de giro é fundamental para a manobra em canais restritos. Com base no Capítulo 8 do Navegação Ciência e Arte (Vol. 1), assinale a afirmativa correta:`,

    alternativas: {
        A: "O avanço, o diâmetro tático e o afastamento aumentam linearmente com o aumento do ângulo de leme de 15° para 35°.",
        B: "O avanço, o diâmetro tático e o afastamento diminuem com o aumento do ângulo de leme, enquanto o ângulo de deriva aumenta.",
        C: "O tempo de evolução de uma guinada aumenta à medida que a velocidade do navio na água aumenta.",
        D: "Os valores de avanço e afastamento permanecem rigorosamente inalterados seja qual for a velocidade do navio ou ângulo de leme utilizado.",
        E: "O diâmetro tático para 35° de leme é sempre o dobro do diâmetro tático para 15° de leme."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.3): o avanço, o diâmetro tático e o afastamento diminuem com o aumento do ângulo de leme, enquanto o ângulo de deriva aumenta.

A afirma o oposto. C erra a relação apresentada entre tempo de evolução e velocidade. D e E estabelecem relações rígidas que não correspondem ao conteúdo fornecido.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.3",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0036",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Determinação do Ponto de Guinada - Wheel Over Point (WOP)",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `No planejamento da navegação em águas restritas, quando há uma inflexão (mudança de rumo) na derrota prevista dentro de um canal, é necessário determinar graficamente o Ponto de Guinada (Wheel Over Point - WOP). Segundo a metodologia descrita no Capítulo 8 do Navegação Ciência e Arte (Vol. 1), para localizar o WOP na carta náutica, utiliza-se:`,

    alternativas: {
        A: "Exclusivamente o valor da distância de parada do navio em crash stop.",
        B: "O traçado da linha do novo rumo deslocada paralelamente a si mesma de uma distância igual ao Afastamento, encontrando a interseção com o rumo inicial, e a partir desse ponto mede-se para ré a distância do Avanço para fixar o WOP.",
        C: "A medição direta de duas milhas náuticas a vante de cada bóia do canal.",
        D: "O cálculo do efeito squat multiplicado pelo calado máximo da embarcação.",
        E: "A divisão do comprimento total do navio pelo seno do ângulo de guinada."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.7): o Ponto de Guinada (WOP) é obtido graficamente traçando-se a linha do novo rumo deslocada paralelamente de uma distância igual ao Afastamento. Na interseção com o rumo inicial, mede-se para ré a distância do Avanço.

A, C, D e E propõem métodos sem relação com o traçado geométrico dos dados táticos apresentado no material.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.7",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0037",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Seleção da Marca de Guinada - Través vs. Proa/Paralela",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Após a determinação do Ponto de Guinada (WOP) na carta náutica, seleciona-se um ponto notável em terra para servir como referência visual ou radar para o início da manobra. O Capítulo 8 do Navegação Ciência e Arte (Vol. 1) analisa as vantagens e desvantagens na escolha da marca de guinada. A respeito dessa seleção, é correto afirmar que:`,

    alternativas: {
        A: "Um objeto situado o mais próximo possível do través no momento da guinada proporciona uma marcação que varia rapidamente, garantindo maior precisão na identificação do instante exato de dar a ordem de leme; contudo, se o navio estiver fora da derrota original, continuará fora da derrota no novo rumo.",
        B: "Um objeto cuja marcação no WOP seja paralela ao novo rumo (marca de proa) é altamente sensível e varia muito rapidamente, sendo a melhor opção para identificar o instante exato da guinada.",
        C: "A marca de través é desaconselhada em qualquer situação por apresentar taxa de variação azimutal nula.",
        D: "Selecionar uma marca de proa paralela ao novo rumo exige obrigatoriamente que a agulha giroscópica tenha um erro conhecido superior a 5 graus.",
        E: "A escolha do ponto de referência para guinada independe da posição geométrica do objeto em relação à derrota."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.7): a marca de través é excelente para definir o momento exato da guinada por variar rapidamente; contudo, se o navio estiver fora da derrota original, continuará fora no novo rumo.

A marca de proa varia mais lentamente e apresenta característica operacional diferente. C, D e E contêm erros conceituais em relação à seleção da referência de guinada.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.7",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0038",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Hidrodinâmica de Águas Rasas - Efeito Squat",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Ao navegar em canais restritos e águas rasas, a diminuição da lazeira de água sob o casco altera a distribuição de pressões ao redor do navio. O fenômeno hidrodinâmico do Squat (rebaixamento dinâmico), estudado no Navegação Ciência e Arte, caracteriza-se por:`,

    alternativas: {
        A: "Aumento da pressão hidrodinâmica sob o casco pelo princípio de Pascal, provocando a elevação do navio e aumento da folga abaixo da quilha (UKC).",
        B: "Queda da pressão hidrodinâmica sob o casco devido ao aumento da velocidade do escoamento da água (princípio de Bernoulli), provocando o afundamento do navio e alteração de trim, reduzindo a folga abaixo da quilha (UKC).",
        C: "Rebaixamento estático do casco que ocorre apenas quando o navio está totalmente parado e fundeado no centro do canal.",
        D: "Elevação exclusiva da popa em navios de formas finas (baixo coeficiente de bloco Cb).",
        E: "Fenômeno que varia na razão inversa do quadrado da velocidade (1/V²), tornando-se negligenciável em altas velocidades."
    },

    resposta: "B",

    comentario: `O Efeito Squat é o afundamento dinâmico do casco causado pela queda de pressão hidrodinâmica sob o fundo do navio devido ao escoamento acelerado da água em águas rasas, reduzindo a folga abaixo da quilha (UKC) e podendo alterar o trim.

A descreve elevação do casco. C trata o fenômeno como estático. D e E apresentam comportamento físico incompatível com a fundamentação fornecida.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Águas rasas — Efeito Squat",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0039",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Fórmula Prática e Variáveis do Efeito Squat",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A magnitude do rebaixamento por Squat é criticamente influenciada pela velocidade do navio na água (V), pelo coeficiente de bloco (Cb) do casco e pelo grau de confinamento do canal. De acordo com a doutrina técnica de manobra e navegação em águas restritas:`,

    alternativas: {
        A: "O Squat em águas rasas abertas varia proporcionalmente a V (velocidade simples), enquanto em canais estreitos confinados a sua magnitude é consideravelmente menor.",
        B: "O Squat é diretamente proporcional ao quadrado da velocidade (V²), sendo que em canais confinados a restrição lateral faz com que o afundamento seja aproximadamente o dobro do observado em águas rasas irrestritas.",
        C: "Navios de formas cheias (Cb > 0,80, como grandes petroleiros e mineradores) tendem a afundar excessivamente pela popa, elevando a proa em águas rasas.",
        D: "A redução da velocidade do navio pela metade reduz o efeito Squat a apenas 50% do seu valor original.",
        E: "O Squat independe do calado e das dimensões da seção transversal do canal navegável."
    },

    resposta: "B",

    comentario: `Conforme a fundamentação fornecida, a magnitude do Squat varia diretamente com o quadrado da velocidade (V²) e é aproximadamente o dobro em canais confinados/estreitos em comparação a águas rasas abertas.

As relações práticas apresentadas no material são:

Squat ∝ (Cb × V²) / 100, em águas abertas;

Squat ∝ (Cb × V²) / 50, em canais.

A erra a proporcionalidade. C erra a atitude de trim indicada para navios de bloco alto. D ignora a relação quadrática. E desconsidera fatores geométricos relevantes.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Águas rasas — Efeito Squat",
            pagina: ""
        }
    ]
},

{
    id: "NAV-0040",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Efeito de Margem - Bank Cushion e Bank Suction",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Quando um navio navega descentralizado ao longo de um canal estreito, próximo a uma das margens (barrancas ou taludes), surgem forças hidrodinâmicas conhecidas como "Efeitos de Margem" (Bank Effects). Segundo a teoria de manobra exposta nas publicações de navegação e praticagem:`,

    alternativas: {
        A: "A proa é atraída para a margem mais próxima (Bank Suction) e a popa é repelida para o centro do canal (Bank Cushion).",
        B: "O acúmulo de água entre a bochecha do navio e a margem próxima cria uma zona de alta pressão que repele a proa para o centro do canal (Bank Cushion), enquanto o escoamento acelerado a ré cria uma zona de baixa pressão que atrai a popa em direção à margem (Bank Suction).",
        C: "O navio sofre uma força de atração uniforme ao longo de todo o seu costado, mantendo a proa e a popa rigorosamente paralelas à margem sem tendência de guinada.",
        D: "Os efeitos de margem são anulados se o navio aumentar a velocidade para mais de 15 nós no canal.",
        E: "A tendência natural de um navio sob efeito de margem é guinar a proa contra a margem próxima, exigindo leme para o centro do canal para evitar o encalhe da proa."
    },

    resposta: "B",

    comentario: `Efeitos de Margem (Bank Effects): o acúmulo de água na bochecha próxima gera alta pressão, provocando a repulsão da proa para o centro do canal — Bank Cushion. O fluxo acelerado na região de ré gera baixa pressão, provocando a atração da popa em direção à margem — Bank Suction.

A inverte Bank Cushion e Bank Suction. C elimina incorretamente o momento de guinada. D afirma que o aumento de velocidade anula o fenômeno. E inverte a tendência da proa.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Navegação em águas restritas — Efeitos de margem",
            pagina: ""
        }
    ]
},
    
// =====================================
// NAVEGAÇÃO EM ÁGUAS RESTRITAS
// NAV-0041 a NAV-0050
// =====================================


// =====================================
// NAV-0041
// EFEITO DE MARGEM — CORREÇÃO
// =====================================

{
    id: "NAV-0041",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Manobra de Correção e Riscos sob Efeito de Margem",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Analisando a situação operacional de um navio de grande porte sofrendo forte Efeito de Margem (Bank Effect) ao aproximar-se da margem de boreste de um canal estreito, assinale a conduta de manobra correta e o risco associado:`,

    alternativas: {
        A: "A proa guinará para bombordo (centro do canal) e a popa será sugada para a margem de boreste; se o Prático carregar o leme para boreste para conter a guinada da proa, o efeito de propulsão do hélice aumentará a atração da popa contra a margem.",
        B: "O Prático deve aumentar a velocidade da máquina para Full Ahead para anular a pressão da bochecha e afastar a popa da margem.",
        C: "A proa guinará para boreste em direção à margem, devendo-se aplicar leme para bombordo com urgência.",
        D: "A força de repulsão da proa (Bank Cushion) atua com maior intensidade quando o navio navega em águas profundas e distantes de qualquer talude.",
        E: "Os efeitos de margem não afetam a estabilidade de governo, sendo dispensável o uso de leme de correção."
    },

    resposta: "A",

    comentario: `Sob efeito de margem a boreste, a proa guina para o centro do canal (bombordo) e a popa cai para a margem de boreste. Se o operador der leme para boreste para conter a proa, a descarga do hélice (propeller wash) contra o leme carregado intensifica a sucção da popa contra a margem de boreste.

A alternativa B está incorreta porque aumentar máquinas agrava significativamente o Bank Suction. C inverte o comportamento da proa. D e E contradizem os efeitos hidrodinâmicos associados à proximidade da margem.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Navegação em Águas Restritas — Efeitos de Margem",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0042
// INTERAÇÃO — ULTRAPASSAGEM
// =====================================

{
    id: "NAV-0042",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Interação Hidrodinâmica em Ultrapassagem de Navios",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Durante a navegação em um canal estreito, um navio A (alcançante) efetua a ultrapassagem de um navio B (alcançado) pelo seu bordo de bombordo. De acordo com os princípios de interação hidrodinâmica entre cascos (Ship-to-Ship Interaction) em águas restritas, no momento em que a proa de A emparelha com a popa de B:`,

    alternativas: {
        A: "A proa de A é atraída para a popa de B devido à zona de alta pressão existente entre os cascos.",
        B: "As duas embarcações se repelem mutuamente ao longo de todo o comprimento dos cascos.",
        C: "A zona de alta pressão a vante da proa de A exerce uma força de repulsão sobre a popa de B, fazendo a proa de B guinar em direção ao canal central, enquanto a popa de A é sugada para o bordo de B.",
        D: "Não há qualquer alteração nas forças de leme de ambas as embarcações até que estejam totalmente safas.",
        E: "O navio alcançado (B) ganha velocidade automaticamente devido ao efeito de arrasto do navio alcançante (A)."
    },

    resposta: "C",

    comentario: `Na ultrapassagem em canal estreito, quando a proa de A atinge a popa de B, a onda de alta pressão da proa de A empurra a popa de B para longe, produzindo repulsão da popa de B, enquanto a popa de A é sugada para o casco de B.

A, B, D e E invertem ou omitem os efeitos de alta e baixa pressão que surgem durante a interação dos cascos emparelhados.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Navegação em Águas Restritas — Interação Hidrodinâmica entre Navios",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0043
// INTERAÇÃO — HEAD-ON
// =====================================

{
    id: "NAV-0043",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Interação Hidrodinâmica no Cruzamento de Navios - Head-On",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Quando dois navios de grande porte navegam em rumos opostos e se cruzam a curta distância em um canal estreito (Head-on), as forças hidrodinâmicas variam dinamicamente ao longo das etapas do cruzamento. Assinale a sequência correta das forças registradas:`,

    alternativas: {
        A: "Primeiramente as proas se atraem; em seguida os bordos se repelem; e finalmente as popas se repelem.",
        B: "Na aproximação proa com proa, a alta pressão entre as bochechas provoca a repulsão mútua das proas; quando os bordos ficam emparelhados, o fluxo acelerado cria baixa pressão e atração mútua dos cascos; e na passagem popa com popa, a atração das popas exige atenção para evitar a colisão de ré.",
        C: "As duas embarcações mantêm forças de repulsão constantes do início ao fim da manobra de cruzamento.",
        D: "A velocidade de cruzamento não altera a intensidade das forças de repulsão e atração entre os cascos."
    },

    resposta: "B",

    comentario: `No cruzamento Head-on, a sequência apresentada é: primeiro, proa com proa, com repulsão das proas devido à alta pressão entre as bochechas; depois, com os meios-navios emparelhados, ocorre atração mútua decorrente da região de baixa pressão; finalmente, na passagem popa com popa, ocorre atração das popas, exigindo atenção para evitar colisão de ré.

As alternativas A, C e D invertem ou eliminam etapas importantes da interação hidrodinâmica.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Navegação em Águas Restritas — Interação Hidrodinâmica entre Navios",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0044
// ALINHAMENTOS
// =====================================

{
    id: "NAV-0044",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Uso de Alinhamentos em Águas Restritas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Os alinhamentos (dois pontos notáveis de terra observados exatamente enfiados) representam uma das Linhas de Posição (LDP) mais valiosas na navegação em águas restritas. Segundo o Capítulo 4 do Navegação Ciência e Arte (Vol. 1), as principais vantagens operacionais do alinhamento são:`,

    alternativas: {
        A: "Alta sensibilidade angular e o fato de independer totalmente de qualquer instrumento de agulha para sua observação, permitindo ainda aferir diretamente o erro da giroscópica ou da agulha magnética de bordo.",
        B: "Necessidade de calibração prévia do radar para validar visualmente a linha enfiada.",
        C: "Imunidade total ao efeito de abatimento por vento e corrente quando o navio governa sobre ele.",
        D: "Capacidade de fornecer a posição tridimensional do navio sem necessidade de ecobatímetro.",
        E: "Aplicação restrita ao período diurno, sendo proibido seu uso na navegação noturna."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 4, Item 4.2.2): o alinhamento oferece altíssima precisão e independe de qualquer instrumento de agulha para sua observação, servindo ainda para verificar o erro da giroscópica ou da agulha magnética.

B, C, D e E estabelecem características ou limitações que não correspondem às vantagens do alinhamento apresentadas no material.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 4, Item 4.2.2",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0045
// MARCAÇÕES DE SEGURANÇA
// =====================================

{
    id: "NAV-0045",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Emprego de Setores e Marcações de Segurança",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Ao conduzir um navio ao longo de um canal de acesso cercado por bancos de areia e pedrais submersos, o Prático utiliza Marcações de Segurança visual/radar ou luzes de setor. Em conformidade com o Capítulo 7 do Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "Uma marcação de segurança exige a determinação prévia da latitude e longitude exatas do navio por navegação astronômica.",
        B: "As marcações de segurança estabelecem limites angulares a partir de um ponto notável; ao observar que a marcação do ponto aproxima-se do limite de perigo, o Prático deve corrigir o rumo para o bordo oposto ao perigo para manter o navio na lazeira de água segura.",
        C: "Se a marcação do ponto de referência ultrapassar o limite seguro, significa que o navio entrou em zona de profundidade infinita.",
        D: "O uso de luzes de setor colorido (verde e encarnado) orienta o navio a navegar continuamente dentro do setor colorido para garantir o centro do canal."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 7, Item 7.3): ao aproximar-se da marcação de segurança limite, o navegador corrige o rumo para o bordo oposto ao perigo, mantendo-se na lazeira de água segura.

A, C e D apresentam exigências ou interpretações incorretas das marcações de segurança e das luzes de setor.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 7, Item 7.3",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0046
// PARALLEL INDEXING
// =====================================

{
    id: "NAV-0046",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Navegação Radar em Águas Restritas - Paralelas Indexadas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A técnica de Paralelas Indexadas (Parallel Indexing) é a ferramenta primária de monitoramento radar da posição em canais restritos. A respeito da preparação e execução dessa técnica (Capítulo 14 de Navegação Ciência e Arte):`,

    alternativas: {
        A: "A linha paralela indexada é traçada na tela do radar paralela ao Rumo Verdadeiro planejado, a uma distância do centro da tela igual à Distância de Passagem Prevista (DPA) de um eco fixo de terra; se o eco mantiver-se sobre a linha, o navio está sobre a derrota.",
        B: "A técnica exige obrigatoriamente a apresentação do radar em Movimento Verdadeiro (True Motion) não estabilizado.",
        C: "As paralelas indexadas só podem ser utilizadas para alvos situados diretamente sobre a linha de fé na proa do navio.",
        D: "Se o eco de referência se afastar da linha paralela indexada, significa que a agulha giroscópica de bordo pifou.",
        E: "A técnica é ineficaz em canais que apresentam inflexões e mudanças de rumo."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 14, Item 14.7): a linha paralela indexada é traçada paralela ao rumo e mantida tangente ao eco de um ponto de terra a uma distância igual à DPA. Se o eco permanecer na linha, o navio está na derrota.

B erra o modo de apresentação. C limita incorretamente a técnica a alvos pela proa. D atribui qualquer afastamento a uma falha da giroscópica. E nega sua utilização em derrotas com mudanças de rumo.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 14, Item 14.7",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0047
// RETAS DE SEGURANÇA
// =====================================

{
    id: "NAV-0047",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Retas de Segurança e Ponto de Guinada no Radar",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Empregando o radar em águas restritas, o navegador pode combinar as paralelas indexadas com as isóbatas da carta náutica para traçar "Retas de Segurança" e pontos de guinada radar. Conforme demonstrado no Capítulo 14 do Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "As Retas de Segurança no radar indicam a velocidade máxima permitida para o navio no canal.",
        B: "As Retas de Segurança definem as distâncias limites em relação aos ecos de terra que garantem ao navio manter-se em profundidades seguras e safa de perigos submersos contíguos ao canal.",
        C: "O ponto de guinada radar independe dos dados táticos do navio (avanço e afastamento).",
        D: "O uso de retas de segurança no radar dispensa o acompanhamento da sonda no ecobatímetro."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 14, Figura 14.45): as Retas de Segurança no radar delimitam as distâncias mínimas de segurança em relação aos ecos de terra para evitar perigos submersos contíguos.

A, C e D desvirtuam o conceito de reta de segurança e sua integração com os demais meios de navegação.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 14, Figura 14.45",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0048
// FUNDEIO DE PRECISÃO
// =====================================

{
    id: "NAV-0048",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Fundeio de Precisão - Ponto de Largada do Ferro",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Na execução de um fundeio de precisão em águas restritas em um ponto pré-determinado F (conforme detalhado no Capítulo 8 do Navegação Ciência e Arte), o instante de dar a ordem de "LARGAR O FERRO!" deve considerar a geometria da embarcação. O Ponto de Largada do Ferro (PL/LG) difere da posição planejada para o passadiço no momento do fundeio porque:`,

    alternativas: {
        A: "O ferro é largado pelo passadiço e cai verticalmente sob a alidade do repetidor.",
        B: "A ordem de largar o ferro deve ser dada quando o escovém do navio atingir o ponto de fundeio F; como o radar e as alidades de navegação situam-se no passadiço, o PL/LG deve ser marcado na carta a uma distância à frente do ponto F igual à distância horizontal do escovém ao passadiço.",
        C: "O ferro deve ser largado quando o passadiço estiver a duas milhas náuticas de distância do ponto F.",
        D: "A distância entre o escovém e o passadiço é desprezada em navios com comprimento total superior a 200 metros.",
        E: "O Ponto de Largada do Ferro é determinado exclusivamente pela profundidade lida no ecobatímetro."
    },

    resposta: "B",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.9): para que o ferro caia exatamente sobre o ponto de fundeio F, o Ponto de Largada do Ferro (PL/LG) deve ser marcado a vante na carta a uma distância igual à distância horizontal do escovém ao passadiço.

A, C, D e E desconsideram a posição física do escovém em relação aos sensores e referências utilizados no passadiço.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.9",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0049
// CÍRCULO DE GIRO DO PASSADIÇO
// =====================================

{
    id: "NAV-0049",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Círculo de Giro do Passadiço - CGP e Garreamento",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Após a conclusão da manobra de fundeio de precisão, o Encarregado de Navegação traça na carta o Círculo de Giro do Passadiço (CGP) para monitorar a segurança do navio amarrado ao ferro. De acordo com o Capítulo 8 do Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "O raio do CGP é calculado somando-se o comprimento do filame de corrente arriado à distância do escovém ao passadiço.",
        B: "O raio do CGP é igual apenas ao comprimento da amarra arriada (filame) em braças.",
        C: "Posições subsequentes do navio plotadas fora dos limites do CGP indicam que o navio está perfeitamente seguro e com a amarra unhada com firmeza.",
        D: "Se a posição observada do passadiço localizar-se fora do CGP, é sinal de que o navio está garrando, devendo o Comandante e a equipe de convés ser imediatamente alertados.",
        E: "As afirmativas A e D estão corretas e completam o procedimento operacional de fundeio."
    },

    resposta: "E",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.9): o raio do Círculo de Giro do Passadiço (CGP) é a soma do filame com a distância escovém-passadiço. Posições observadas fora do CGP indicam que o navio está garrando.

Assim, as afirmativas A e D estão corretas e se complementam, tornando E a resposta correta.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.9",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0050
// ECDIS — SAFETY CONTOUR / SAFETY DEPTH
// =====================================

{
    id: "NAV-0050",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "ECDIS - Safety Contour vs. Safety Depth",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Na navegação em águas restritas utilizando o sistema ECDIS com cartas vetoriais (ENC), a correta parametrização das profundidades de segurança é vital para evitar alarmes falsos ou encalhes. Em conformidade com as normas técnicas de operação do ECDIS:`,

    alternativas: {
        A: "O Safety Contour (Contorno de Segurança) é a isobática selecionada que estabelece a divisão visual entre águas seguras (claras) e águas rasas/não navegáveis (escuras); se o valor exato digitado não existir na ENC, o sistema adota automaticamente a isobática imediatamente mais profunda.",
        B: "O Safety Depth (Profundidade de Segurança) altera o preenchimento de cor das zonas de fundo, mas não destaca os números das sondagens pontuais.",
        C: "O parâmetro Shallow Contour define o limite máximo de profundidade para navios de guerra em canais de acesso.",
        D: "O ECDIS gera alarmes sonoros automáticos de encalhe para qualquer sonda independentemente da configuração do Safety Contour.",
        E: "As cartas ráster (RNC) possuem capacidade de reordenação vetorial de camadas superior às cartas ENC."
    },

    resposta: "A",

    comentario: `No ECDIS, o Safety Contour estabelece a separação visual entre águas consideradas seguras e águas rasas ou potencialmente não navegáveis. Quando o valor configurado pelo operador não corresponde a uma isóbata existente na ENC, o sistema utiliza a próxima isóbata disponível mais profunda.

O Safety Depth possui função distinta, relacionada principalmente ao destaque das sondagens pontuais relevantes. B, C, D e E confundem as funções dos parâmetros e as características de ENC e RNC.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "ECDIS — Parâmetros de Segurança",
            pagina: ""
        }
    ]
},
// =====================================
// NAVEGAÇÃO EM ÁGUAS RESTRITAS
// NAV-0051 a NAV-0060
// =====================================


// =====================================
// NAV-0051
// CATZOC
// =====================================

{
    id: "NAV-0051",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Zonas de Confiança - Categoria CATZOC nas Cartas Eletrônicas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Ao planejar a folga abaixo da quilha (UKC) para trânsito em canais restritos com profundidades críticas, o Prático deve consultar a qualidade dos levantamentos hidrográficos através da categoria CATZOC (Category Zone of Confidence). Sobre o CATZOC:`,

    alternativas: {
        A: "O nível ZOC A1 representa o padrão de maior precisão e cobertura total do fundo (obtida por varredura multifeixe), garantindo incerteza de posição horizontal de ± 5 m e alta precisão de sonda.",
        B: "O nível ZOC D indica que o canal foi varrido com tecnologia laser de última geração e possui erro de sonda nulo.",
        C: "As categorias CATZOC aplicam-se exclusivamente às cartas de navegação fluvial em rios não mapeados.",
        D: "A categoria ZOC C exige que a margem de segurança vertical seja reduzida a zero devido à alta confiabilidade dos dados de 1800."
    },

    resposta: "A",

    comentario: `O padrão CATZOC ZOC A1 é o nível máximo de confiabilidade em levantamentos hidrográficos, garantindo varredura 100% do fundo e erro de posição horizontal ≤ ± 5 m.

B, C e D atribuem características falsas às categorias ZOC D e C.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Cartas Eletrônicas — CATZOC",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0052
// EQUIPE DE NAVEGAÇÃO / BTM
// =====================================

{
    id: "NAV-0052",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Organização da Equipe de Navegação em Águas Restritas - BTM",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A condução da navegação em águas restritas exige o guarnecimento da Equipe de Navegação em passadiço no regime de Detalhe Especial para o Mar (DEM). De acordo com os procedimentos padronizados no Capítulo 9 do Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "A atribuição da Equipe de Navegação é fornecer um fluxo contínuo de informações de posição, rumos e velocidades ao Comandante e ao Prático, minorando o tempo percorrido sem posicionamento.",
        B: "A ordem verbal \"Atenção para o MARQUE! ... MARQUE!\" é utilizada para sincronizar a obtenção simultânea de LDPs por diferentes observadores, atribuindo-se essa hora à posição observada.",
        C: "Os intervalos de determinação de posição em águas restritas variam geralmente de 1 a 6 minutos, dependendo das restrições e da velocidade do navio.",
        D: "Todas as afirmativas acima estão corretas.",
        E: "Apenas as afirmativas A e B estão corretas."
    },

    resposta: "D",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 9, Itens 9.1 a 9.4): todas as afirmativas descrevem a função da Equipe de Navegação em DEM, o uso da ordem "MARQUE!" e a frequência de posições de 1 a 6 minutos.

Portanto, A, B e C estão corretas, tornando D a resposta da questão.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 9, Itens 9.1 a 9.4",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0053
// ERRO DA GIROSCÓPICA
// =====================================

{
    id: "NAV-0053",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Erros de Agulha Giroscópica na Navegação em Águas Restritas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Durante a navegação em canais restritos, a verificação contínua do erro da agulha giroscópica de bordo é indispensável para evitar desvios no traçado das LDPs e nas paralelas indexadas. Conforme o Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "O erro da giroscópica pode ser verificado diretamente comparando-se a marcação observada de um alinhamento de terra com o seu valor verdadeiro cartografado.",
        B: "Se a giro apresentar um erro para Oeste (W), todas as marcações verdadeiras observadas serão maiores do que as lidas na repetidora.",
        C: "O erro de giro não afeta a orientação das paralelas indexadas na tela do radar em movimento relativo.",
        D: "A verificação do erro da giroscópica em águas restritas só deve ser efetuada após o navio atracar no berço."
    },

    resposta: "A",

    comentario: `O erro da agulha giroscópica em águas restritas pode ser verificado diretamente comparando-se a marcação lida de um alinhamento cartografado com a sua marcação verdadeira na carta náutica.

B inverte o sinal do erro W. C e D negam a relevância operacional da verificação do erro da giroscópica durante a navegação em águas restritas.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Agulha Giroscópica e Navegação em Águas Restritas",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0054
// TRIÂNGULO DE CORRENTE
// =====================================

{
    id: "NAV-0054",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Resolução do Triângulo de Corrente em Canais Estreitos",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Um navio navega em um canal no Rumo na Superfície RN = 090° com velocidade na água VN = 10 nós. Uma corrente de maré de vazante flui na direção Rcor = 180° com intensidade Vcor = 2 nós. Sobre os componentes do movimento resultante (Capítulo 5 de Navegação Ciência e Arte):`,

    alternativas: {
        A: "O navio sofrerá um abatimento para boreste (sul), alterando o Rumo no Fundo (Rfd) para um valor maior que 090°, enquanto a velocidade no fundo (SOG) será superior a 10 nós.",
        B: "O navio sofrerá caimento para bombordo e a velocidade no fundo será de 8 nós.",
        C: "A corrente não afetará a trajetória no fundo por atuar exatamente pelo través do navio.",
        D: "O abatimento será para bombordo e o Rumo no Fundo será 080°.",
        E: "A velocidade no fundo será igual a 12 nós."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 5, Figura 5.12): uma corrente para o sul (180°) atuando em um navio governando para leste (090°) provoca abatimento para boreste, fazendo Rfd > 090°.

A velocidade resultante no fundo é:

SOG = √(10² + 2²)

SOG = √104

SOG ≈ 10,2 nós.

Portanto, a velocidade no fundo é ligeiramente superior a 10 nós.

B, C, D e E apresentam direção de abatimento ou valores vetoriais incorretos.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 5, Figura 5.12",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0055
// ODÔMETRO DOPPLER
// =====================================

{
    id: "NAV-0055",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Odômetro Doppler e Velocidade em Águas Rasas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A medição precisa da velocidade sobre o fundo (SOG) e sobre a água (STW) em águas restritas é realizada pelo Odômetro Doppler. Segundo a publicação Navegação Ciência e Arte (Vol. 1):`,

    alternativas: {
        A: "O odômetro Doppler operando no modo Bottom Track (rastreio do fundo) fornece a velocidade real do navio em relação ao fundo do mar, indicando os componentes longitudinal e transversal.",
        B: "O odômetro Doppler de fundo perde o sinal de fundo quando navega em profundidades inferiores a 5 metros.",
        C: "Todos os odômetros de hélice de fundo medem a velocidade em relação ao fundo com precisão absoluta em rios.",
        D: "O modo Water Track do odômetro Doppler mede a velocidade diretamente em relação às estrelas de navegação astronômica."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 11, Item 11.3.2): o Odômetro Doppler no modo Bottom Track mede a velocidade real sobre o fundo (SOG), podendo fornecer componentes longitudinal e transversal.

B, C e D apresentam premissas incorretas sobre o funcionamento e os modos de medição do Doppler.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 11, Item 11.3.2",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0056
// RIPEAM — REGRA 9
// =====================================

{
    id: "NAV-0056",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "RIPEAM Regra 9 - Regras de Trânsito em Canais Estreitos",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A navegação de navios e embarcações de praticagem em canais estreitos é estritamente regida pela Regra 9 do RIPEAM. Em conformidade com essa regra, é incorreto afirmar que:`,

    alternativas: {
        A: "Uma embarcação navegando ao longo de um canal estreito deve manter-se tão próxima quanto seja seguro do limite exterior do canal a seu boreste.",
        B: "Embarcações de comprimento inferior a 20 metros ou embarcações a vela não devem dificultar a passagem de uma embarcação que só possa navegar com segurança dentro de um canal estreito.",
        C: "Uma embarcação de propulsão mecânica de grande porte navegando em um canal estreito tem prioridade absoluta e pode navegar pelo lado esquerdo (bombordo) do canal se desejar encurtar a distância.",
        D: "Embarcações engajadas na pesca não devem dificultar a passagem de qualquer outra embarcação navegando num canal estreito.",
        E: "A travessia de um canal estreito não deve ser feita se interferir na passagem de um navio que só possa navegar no canal."
    },

    resposta: "C",

    comentario: `A afirmativa C é incorreta e, portanto, constitui o gabarito. A Regra 9 do RIPEAM determina que uma embarcação navegando ao longo de um canal estreito ou via de acesso deve manter-se tão próxima quanto seja seguro e praticável do limite exterior do canal ou via que estiver a seu boreste.

A, B, D e E reproduzem as exigências apresentadas para a navegação em canais estreitos.`,

    bibliografia: [
        {
            publicacao: "RIPEAM / COLREG 1972",
            capitulo: "Regra 9 — Canais Estreitos",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0057
// RIPEAM — SINAIS SONOROS
// =====================================

{
    id: "NAV-0057",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Sinais Sonoros em Curvas Cegas e Ultrapassagens - RIPEAM",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Na condução de navios em canais estreitos com curvas de visibilidade prejudicada por obstáculos na costa, bem como em manobras de ultrapassagem, aplicam-se sinais sonoros de apito prescritos nas Regras 9 e 34 do RIPEAM:`,

    alternativas: {
        A: "Ao aproximar-se de uma curva cega num canal estreito, a embarcação deve soar um apito longo, devendo esse sinal ser respondido com um apito longo por qualquer navio que esteja do outro lado da curva.",
        B: "A ultrapassagem num canal estreito que dependa da concordância do alcançado é solicitada pelo alcançante com dois apitos curtos e respondida com dois apitos longos.",
        C: "O sinal de concordância da embarcação alcançada em um canal estreito é um apito longo, um curto, um longo e um curto (— · — ·), nesta ordem.",
        D: "As afirmativas A e C estão corretas e expressam rigorosamente as regras do RIPEAM.",
        E: "As afirmativas B e C estão corretas."
    },

    resposta: "D",

    comentario: `Regra 9(f) e Regra 34(e) do RIPEAM: ao aproximar-se de uma curva ou área de um canal estreito ou via de acesso onde outras embarcações possam estar ocultas por uma obstrução, deve ser soado um apito longo, respondido com um apito longo por qualquer embarcação que o ouça do outro lado.

Na ultrapassagem em canal estreito, o sinal de concordância da embarcação alcançada é um apito longo, um curto, um longo e um curto (— · — ·).

Portanto, A e C estão corretas e a resposta é D.`,

    bibliografia: [
        {
            publicacao: "RIPEAM / COLREG 1972",
            capitulo: "Regra 9 — Canais Estreitos; Regra 34 — Sinais de Manobra e Advertência",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0058
// MASTER-PILOT INFORMATION EXCHANGE
// =====================================

{
    id: "NAV-0058",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Praticagem Portuária e Troca de Informações - IMO A.960(23)",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A Resolução IMO A.960(23) estabelece as Recomendações sobre Treinamento, Qualificação e Procedimentos Operacionais para Práticos. Sobre o relacionamento entre o Prático e a Equipe do Passadiço (Bridge Team) em águas restritas:`,

    alternativas: {
        A: "O Prático assume a responsabilidade civil e o comando do navio, sendo o Comandante um mero espectador da manobra.",
        B: "A troca de informações entre o Comandante e o Prático (Master-Pilot Information Exchange - MPX) é obrigatória e deve ocorrer no embarque, abordando o plano de viagem (Passage Plan), calados, dados táticos, falhas de equipamentos e peculiaridades da área restrita.",
        C: "O plano de viagem do navio deixa de ter validade quando o Prático pisa a bordo.",
        D: "O Comandante não pode intervir na manobra conduzida pelo Prático mesmo se identificar risco iminente de encalhe ou colisão."
    },

    resposta: "B",

    comentario: `Segundo a fundamentação fornecida, a Resolução IMO A.960(23) estabelece a necessidade da troca formal de informações entre Comandante e Prático (Master-Pilot Information Exchange — MPX) antes da manobra, abrangendo informações relevantes ao plano e à condição operacional do navio.

A presença do Prático não elimina a autoridade e responsabilidade do Comandante nem invalida o planejamento da viagem. Por isso, A, C e D estão incorretas.`,

    bibliografia: [
        {
            publicacao: "IMO Resolution A.960(23)",
            capitulo: "Operational Procedures for Maritime Pilots",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0059
// TRANSFERÊNCIA DO PRÁTICO
// =====================================

{
    id: "NAV-0059",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Arranjos de Transferência do Prático - IMO A.1045 e SOLAS V/23",
    edital: "Navegação em Águas Restritas",
    dificuldade: "dificil",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `A montagem e operação da escada de prático (Pilot Ladder) para embarque/desembarque em águas restritas são reguladas pela Convenção SOLAS Regra V/23 e pela Resolução IMO A.1045. É uma exigência técnica dessas normas que:`,

    alternativas: {
        A: "Para borda livre (freeboard) superior a 9 metros, é obrigatório o uso de uma instalação combinada (Combination Arrangement), combinando a escada de acomodação com a escada de prático.",
        B: "A escada de prático pode ser amarrada nas balaustradas móveis do tombadilho sem necessidade de pontos estruturais de fixação.",
        C: "A subida em escada de prático simples é autorizada até a altura máxima de 15 metros sem necessidade de plataforma intermediária.",
        D: "Os degraus da escada de prático devem ser confeccionados em alumínio polido escorregadio."
    },

    resposta: "A",

    comentario: `Conforme a fundamentação fornecida para SOLAS V/23 e IMO Resolução A.1045, para borda livre superior a 9 metros deve ser utilizada uma instalação combinada (Combination Arrangement), associando a escada de acomodação à escada de prático.

B, C e D contrariam os requisitos de segurança, construção e fixação apresentados para os arranjos de transferência do Prático.`,

    bibliografia: [
        {
            publicacao: "SOLAS",
            capitulo: "Regulation V/23 — Pilot Transfer Arrangements",
            pagina: ""
        },
        {
            publicacao: "IMO Resolution A.1045",
            capitulo: "Pilot Transfer Arrangements",
            pagina: ""
        }
    ]
},


// =====================================
// NAV-0060
// DESACELERAÇÃO E DISTÂNCIA DE PARADA
// =====================================

{
    id: "NAV-0060",
    disciplina: "navegacao",
    assunto: "aguas-restritas",
    topico: "Manobra de Desaceleração e Distância de Parada em Águas Restritas",
    edital: "Navegação em Águas Restritas",
    dificuldade: "media",
    tipo: "multipla-escolha",
    origem: "banco",

    enunciado: `Durante a navegação em um canal restrito de acesso ao porto, o Prático precisa reduzir a velocidade do navio de 12 nós para 4 nós antes de atingir a bacia de evolução. Com base na dinâmica de desaceleração e manobra de máquinas (Capítulo 8 do Navegação Ciência e Arte):`,

    alternativas: {
        A: "A distância percorrida pelo navio durante a desaceleração é calculada utilizando a Tabela de Aceleração e Desaceleração de bordo, considerando o tempo necessário para a variação de RPM e a velocidade média no intervalo.",
        B: "A inversão das máquinas de Full Ahead para Full Astern em navios de grande porte paralisa o navio em uma distância igual ao seu próprio comprimento, sem provocar guinadas de proa.",
        C: "A resposta de desaceleração do navio em águas rasas é mais rápida do que em águas profundas devido à sustentação do casco.",
        D: "O uso do leme não produz efeito sobre a taxa de desaceleração do navio."
    },

    resposta: "A",

    comentario: `Navegação Ciência e Arte (Vol. 1, Cap. 8, Item 8.8 e Figura 8.9): as variações de velocidade e desaceleração são determinadas com auxílio das tabelas táticas de bordo, relacionando o tempo necessário para a variação de RPM à velocidade média no intervalo.

B estabelece uma distância de parada irreal e ignora possíveis efeitos direcionais durante a inversão. C atribui comportamento incorreto às águas rasas. D desconsidera o aumento de resistência associado à atuação do leme.`,

    bibliografia: [
        {
            publicacao: "Navegação Ciência e Arte — Volume 1",
            capitulo: "Capítulo 8, Item 8.8 e Figura 8.9",
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
