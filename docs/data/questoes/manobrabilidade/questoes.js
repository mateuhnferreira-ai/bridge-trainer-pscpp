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

 

    // =====================================
    // MAN-0001
    // RESISTÊNCIA FRICCIONAL
    // =====================================

    {
        id: "MAN-0001",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência friccional",

        edital:
            "Resistência do Navio — resistência friccional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "De acordo com os experimentos fundamentais de William Froude e com os fundamentos clássicos da resistência ao avanço, a resistência de fricção de um navio é um componente da resistência total que:",

        alternativas: {

            A:
                "Varia de forma diretamente proporcional ao quadrado da velocidade em todas as faixas de operação.",

            B:
                "É independente da área da superfície molhada, sendo determinada exclusivamente pelo coeficiente de bloco.",

            C:
                "Historicamente foi representada por uma relação do tipo R = f S V^n, sendo que, para superfícies lisas ensaiadas por Froude, o expoente n podia assumir valor ligeiramente inferior a 2.",

            D:
                "Diminui à medida que a temperatura da água aumenta porque a viscosidade cinemática da água aumenta.",

            E:
                "Representa necessariamente o componente majoritário da resistência em qualquer navio operando em números de Froude elevados."

        },

        resposta: "C",

        comentario:
            "Nos experimentos de Froude com pranchas, a resistência foi representada por uma relação empírica do tipo R = f S V^n. Para a prancha lisa mais longa, o expoente diminuiu até aproximadamente 1,83. A formulação moderna da resistência friccional utiliza o coeficiente de atrito como função do número de Reynolds.",

        bibliografia: [

            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Sections 3.2 e 3.3 — Froude's Experiments on Friction / Frictional Resistance Formulations",

                pagina:
                    "aprox. pp. 8–10"
            }

        ]

    },


    // =====================================
    // MAN-0002
    // SQUAT
    // =====================================

    {
        id: "MAN-0002",

        disciplina: "manobrabilidade",

        assunto: "Águas rasas e restritas",

        topico: "Squat",

        edital:
            "Efeitos de águas rasas e restritas sobre o comportamento do navio",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fenômeno do squat, ou afundamento dinâmico acompanhado de alteração de trim, é uma preocupação crítica para a segurança da navegação em águas restritas. Sobre as variáveis que influenciam o squat, assinale a opção correta:",

        alternativas: {

            A:
                "O squat varia de forma linear com a velocidade do navio através da água.",

            B:
                "Em águas rasas e confinadas, o valor obtido pela fórmula simplificada de Barrass para águas abertas deve ser reduzido pela metade.",

            C:
                "Navios de elevado coeficiente de bloco tendem, como regra prática, a apresentar o squat máximo pela popa.",

            D:
                "Mantidas as demais condições, o aumento da velocidade de 6 para 12 nós tende a produzir aproximadamente quatro vezes o squat.",

            E:
                "A aceleração rápida em águas rasas elimina temporariamente o squat pela geração de sustentação hidrodinâmica."

        },

        resposta: "D",

        comentario:
            "O squat varia aproximadamente com o quadrado da velocidade através da água. Assim, dobrar a velocidade implica aproximadamente quatro vezes o squat. Na formulação simplificada apresentada por MacElrevey, o squat em águas rasas e confinadas é aproximadamente o dobro do obtido para águas abertas. Como regra prática, navios com Cb elevado tendem a squat pela proa; cascos mais finos, como certos porta-contêineres, tendem a squat pela popa.",

        bibliografia: [

            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",

                capitulo:
                    "Chapter 2 — Shiphandling in a Channel; The Basics of Squat",

                pagina:
                    "pp. 87–90"
            },

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Restricted/Shallow Water Effects",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0003
    // RESISTÊNCIA DE ONDA
    // =====================================

    {
        id: "MAN-0003",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência de formação de ondas",

        edital:
            "Resistência do Navio — resistência de formação de ondas",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A interação entre os sistemas de ondas gerados pelas diferentes regiões do casco influencia significativamente a resistência de formação de ondas. Sobre esse fenômeno, assinale a alternativa correta:",

        alternativas: {

            A:
                "A resistência de onda aumenta de maneira perfeitamente suave e monotônica com a velocidade.",

            B:
                "Os chamados humps ocorrem quando uma crista de um sistema de ondas coincide com um cavado de outro sistema.",

            C:
                "Os chamados hollows correspondem ao reforço construtivo entre cristas de diferentes sistemas de ondas.",

            D:
                "A interferência entre os sistemas de ondas pode produzir humps e hollows na curva de resistência em função da velocidade.",

            E:
                "A formação de ondas independe do número de Froude e depende exclusivamente do número de Reynolds."

        },

        resposta: "D",

        comentario:
            "Os sistemas de ondas associados ao casco interferem entre si. Interferência construtiva pode produzir picos de resistência, os humps, enquanto interferência parcialmente destrutiva pode produzir hollows. Por isso, a parcela de resistência de ondas não cresce necessariamente de maneira suave com a velocidade.",

        bibliografia: [

            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave-Making Resistance",

                pagina:
                    ""
            },

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Wave Resistance",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0004
    // VENTO × CORRENTE
    // =====================================

    {
        id: "MAN-0004",

        disciplina: "manobrabilidade",

        assunto: "Forças que afetam o navio",

        topico: "Vento e corrente",

        edital:
            "Forças externas atuantes sobre o navio — vento e corrente",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Durante uma manobra, o Prático deve avaliar as forças produzidas pelo movimento relativo do ar e da água sobre o navio. Considerando a pressão dinâmica e a diferença de densidade entre os fluidos, assinale a alternativa correta:",

        alternativas: {

            A:
                "Um vento de 10 nós exerce aproximadamente a mesma pressão dinâmica que uma corrente de 10 nós.",

            B:
                "Para a mesma velocidade, a água produz somente cerca de 30 vezes a pressão dinâmica produzida pelo ar.",

            C:
                "Como regra prática, aproximadamente 30 nós de vento produzem pressão dinâmica comparável à de uma corrente de 1 nó, para áreas equivalentes.",

            D:
                "A ação do vento é proporcional à velocidade, enquanto a da corrente é proporcional ao cubo da velocidade.",

            E:
                "A densidade do ar e da água pode ser desprezada quando se comparam seus efeitos hidrodinâmicos sobre o navio."

        },

        resposta: "C",

        comentario:
            "A pressão dinâmica é proporcional à densidade do fluido e ao quadrado da velocidade. O Naval Shiphandling observa que a água salgada é aproximadamente 855 vezes mais densa que o ar padrão e apresenta a regra prática de que cerca de 30 nós de vento equivalem, em pressão dinâmica, a aproximadamente 1 nó de corrente.",

        bibliografia: [

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Dynamic Pressure, Wind and Current",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0005
    // APÊNDICES
    // =====================================

    {
        id: "MAN-0005",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência de apêndices",

        edital:
            "Resistências associadas às perturbações produzidas pela forma do casco e por seus apêndices",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre a resistência produzida pelos apêndices do navio e outros componentes adicionais da resistência, assinale a opção tecnicamente correta:",

        alternativas: {

            A:
                "Quilhas de balanço corretamente instaladas normalmente acrescentam cerca de 15% da resistência total do navio.",

            B:
                "Ângulos moderados de leme podem aumentar a resistência do navio em aproximadamente 2% a 6%.",

            C:
                "Túneis de propulsores transversais jamais produzem resistência adicional quando o propulsor está desligado.",

            D:
                "A resistência do ar de um navio convencional representa normalmente de 10% a 15% da resistência hidrodinâmica total em velocidade máxima e ar calmo.",

            E:
                "A resistência de redemoinhos é produzida principalmente pelo escoamento laminar perfeitamente aderido ao casco."

        },

        resposta: "B",

        comentario:
            "Practical Ship Hydrodynamics indica que um leme em posição neutra acrescenta pouca resistência, da ordem de 1%, mas ângulos moderados podem elevar a resistência em aproximadamente 2% a 6%. Quilhas de balanço corretamente arranjadas contribuem tipicamente apenas cerca de 1% a 2%.",

        bibliografia: [

            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Additional Resistance — Appendages",

                pagina:
                    "aprox. pp. 94–95"
            },

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Appendage Resistance",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0006
    // REYNOLDS
    // =====================================

    {
        id: "MAN-0006",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Número de Reynolds",

        edital:
            "Resistência friccional e efeitos viscosos",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Na análise moderna da resistência friccional de um casco, qual parâmetro adimensional está diretamente associado aos efeitos viscosos e à caracterização do regime da camada limite?",

        alternativas: {

            A:
                "Número de Froude.",

            B:
                "Número de Reynolds.",

            C:
                "Coeficiente de bloco.",

            D:
                "Razão velocidade-comprimento, isoladamente.",

            E:
                "Número de cavitação."

        },

        resposta: "B",

        comentario:
            "O número de Reynolds, Re = VL/ν, relaciona velocidade, comprimento característico e viscosidade cinemática. Ele é o parâmetro fundamental para os efeitos viscosos e para a resistência friccional. O número de Froude está associado principalmente aos efeitos de superfície livre e formação de ondas.",

        bibliografia: [

            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Frictional Resistance",

                pagina:
                    ""
            },

            {
                publicacao:
                    "Ship Resistance and Flow",

                capitulo:
                    "Chapters 1–3 — Viscous Flow and Resistance",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0007
    // RESISTÊNCIA DO AR
    // =====================================

    {
        id: "MAN-0007",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência aerodinâmica",

        edital:
            "Resistências adicionais relevantes à operação",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Considerando um navio avançando em ar calmo, o Naval Shiphandling indica experimentalmente que a resistência aerodinâmica simples, em relação à resistência total da água na velocidade máxima, situa-se aproximadamente em qual faixa?",

        alternativas: {

            A:
                "0,01% a 0,1%.",

            B:
                "1,5% a 3%.",

            C:
                "5% a 10%.",

            D:
                "10% a 15%.",

            E:
                "20% a 30%."

        },

        resposta: "B",

        comentario:
            "Crenshaw registra que experimentos em vários navios indicaram resistência do ar da ordem de 1,5% a 3% da resistência total da água na velocidade máxima. Entretanto, vento relativo forte pode produzir efeito operacional muito mais significativo.",

        bibliografia: [

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Air and Wind Resistance",

                pagina:
                    ""
            }

        ]

    },


    // =====================================
    // MAN-0008
    // BILGE KEELS
    // =====================================

    {
        id: "MAN-0008",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Quilhas de balanço",

        edital:
            "Resistência de apêndices",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Segundo dados de experiência de projeto compilados em Practical Ship Hydrodynamics, quilhas de balanço corretamente posicionadas e alinhadas com o escoamento acrescentam tipicamente à resistência total em águas calmas aproximadamente:",

        alternativas: {

            A:
                "1% a 2%.",

            B:
                "5% a 8%.",

            C:
                "10% a 12%.",

            D:
                "15% a 20%.",

            E:
                "Mais de 25%."

        },

        resposta: "A",

        comentario:
            "Practical Ship Hydrodynamics informa que bilge keels corretamente arranjadas contribuem normalmente com apenas cerca de 1% a 2% da resistência total. Condições de trim e movimentos em ondas podem alterar significativamente essa contribuição operacional.",

        bibliografia: [

            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Appendages",

                pagina:
                    "aprox. pp. 94–95"
            }

        ]

    },


    // =====================================
    // MAN-0009
    // BOW THRUSTER
    // =====================================

    {
        id: "MAN-0009",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Propulsores transversais e resistência",

        edital:
            "Resistência de apêndices e aberturas do casco",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre a influência de propulsores transversais na resistência ao avanço, assinale a alternativa compatível com Practical Ship Hydrodynamics:",

        alternativas: {

            A:
                "Qualquer bow thruster aumenta necessariamente a resistência total em mais de 10%.",

            B:
                "Um bow thruster adequadamente projetado e localizado pode não aumentar significativamente a resistência ao avanço.",

            C:
                "Propulsores transversais na região de ré nunca acrescentam resistência.",

            D:
                "A abertura do túnel elimina a resistência viscosa local.",

            E:
                "A resistência produzida pelo túnel independe de sua geometria e localização."

        },

        resposta: "B",

        comentario:
            "Bertram registra que bow thrusters adequadamente projetados e posicionados não aumentam significativamente a resistência. Já propulsores transversais localizados na região de ré podem produzir acréscimos apreciáveis, dependendo da configuração.",

        bibliografia: [

            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Appendages",

                pagina:
                    "aprox. pp. 94–95"
            }

        ]

    },


    // =====================================
    // MAN-0010
    // ÁGUAS RASAS
    // =====================================

    {
        id: "MAN-0010",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência em águas rasas",

        edital:
            "Resistências adicionais relevantes à operação em águas restritas",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Com relação à resistência ao avanço em águas rasas, assinale a alternativa correta:",

        alternativas: {

            A:
                "A redução da profundidade diminui sempre a resistência de ondas e a resistência friccional.",

            B:
                "Águas rasas não modificam o campo de pressão ao redor do casco enquanto houver folga sob a quilha.",

            C:
                "A proximidade do fundo pode aumentar a resistência friccional e, em geral, também a resistência de ondas, tornando-se particularmente importante nas proximidades do número de Froude crítico baseado na profundidade.",

            D:
                "O número de Froude baseado na profundidade é irrelevante para navios de deslocamento.",

            E:
                "O efeito da profundidade sobre a resistência ocorre somente quando o navio encalha."

        },

        resposta: "C",

        comentario:
            "Em águas rasas o escoamento ao redor e sob o casco é restringido. Practical Ship Hydrodynamics registra aumento da resistência friccional e, normalmente, também da resistência de ondas; próximo da condição crítica baseada no número de Froude de profundidade, o aumento da resistência pode ser acentuado.",

        bibliografia: [

            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Shallow Water",

                pagina:
                    "aprox. p. 95"
            },

            {
                publicacao:
                    "Naval Shiphandling — 4th Edition",

                capitulo:
                    "Chapter 2 — Forces Affecting the Ship; Shallow Water Resistance",

                pagina:
                    ""
            }

        ]

    }
    // =====================================
    // MAN-0011
    // STRAIGHT-LINE STABILITY
    // =====================================

    {
        id: "MAN-0011",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Straight-line Stability",

        edital:
            "Controlabilidade — estabilidade de movimento e estabilidade direcional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "No contexto da estabilidade de movimento de um navio com controles fixos, a Straight-line Stability (Case I) é definida como a capacidade do navio de, após uma perturbação externa momentânea:",

        alternativas: {

            A:
                "Retomar a trajetória original exata em que se encontrava.",

            B:
                "Retomar o rumo original, mas em uma trajetória paralela distinta.",

            C:
                "Retomar o movimento em linha reta, embora em uma nova direção.",

            D:
                "Oscilar em torno do rumo original até atingir o equilíbrio hidrostático.",

            E:
                "Manter a velocidade constante independentemente da mudança de proa."

        },

        resposta: "C",

        comentario:
            "A straight-line stability corresponde à capacidade de o navio voltar a desenvolver movimento retilíneo após cessar a perturbação, sem exigir que retorne ao rumo ou à trajetória original.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Stability of Motion / Straight-line Stability",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0012
    // TURNING CIRCLE — ADVANCE
    // =====================================

    {
        id: "MAN-0012",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Turning Circle — Advance",

        edital:
            "Controlabilidade — manobras padrão e curva de giro",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Durante a execução de um Turning Circle, o parâmetro definido como a distância percorrida na direção do rumo original até que a proa do navio tenha girado 90 graus é o:",

        alternativas: {

            A: "Tactical Diameter.",

            B: "Transfer.",

            C: "Steady Turning Diameter.",

            D: "Advance.",

            E: "Radius of Gyration."

        },

        resposta: "D",

        comentario:
            "Advance é a distância medida na direção do rumo inicial desde o início da aplicação do leme até a mudança de 90° da proa.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Turning Maneuvers",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0013
    // PIVOT POINT
    // =====================================

    {
        id: "MAN-0013",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Pivot Point em curva estabelecida",

        edital:
            "Controlabilidade — geometria e dinâmica da curva de giro",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Segundo o PNA, o Pivot Point (Ponto de Pivô) de um navio em uma curva de giro estabelecida (Steady Turn) geralmente se localiza:",

        alternativas: {

            A:
                "No centro de gravidade (CG) do navio.",

            B:
                "Entre a proa e aproximadamente 1/5 do comprimento do navio (L) a partir da proa.",

            C:
                "Na popa, sobre o eixo de rotação do leme.",

            D:
                "No centro de flutuação longitudinal (LCF).",

            E:
                "Exatamente à meia-nau para navios de casco em V."

        },

        resposta: "B",

        comentario:
            "Na curva estabelecida, o ponto de pivô aparente encontra-se deslocado para vante do centro do navio, podendo situar-se próximo da região compreendida entre a proa e cerca de 1/5 de L a partir dela.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Turning Characteristics",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0014
    // ZIGZAG — OVERSHOOT
    // =====================================

    {
        id: "MAN-0014",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Zigzag Maneuver — Overshoot Angle",

        edital:
            "Controlabilidade — manobras padrão de governo",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A manobra de Zigzag (Z-Maneuver) é fundamental para avaliar a capacidade de controle do navio. O principal índice numérico extraído deste teste para medir a capacidade de antecipação do timoneiro em águas restritas é o:",

        alternativas: {

            A:
                "Stability Index σ1.",

            B:
                "Time to first execute.",

            C:
                "Overshoot Angle.",

            D:
                "Drift Angle β.",

            E:
                "Reach distance."

        },

        resposta: "C",

        comentario:
            "O Overshoot Angle é uma das medidas fundamentais da resposta de contramanobra do navio e indica quanto a proa ultrapassa o ângulo de execução depois da inversão do leme.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Zigzag Maneuver",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0015
    // SHALLOW WATER — TURNING
    // =====================================

    {
        id: "MAN-0015",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Influência de águas rasas na curva de giro",

        edital:
            "Controlabilidade — efeitos de águas rasas sobre a manobrabilidade",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em águas rasas (Shallow Water), observa-se uma alteração significativa nas características de manobra. Quando a razão entre a profundidade da água e o calado do navio (Dw/T) é de aproximadamente 1,2, o diâmetro de giro pode aumentar em relação a águas profundas em cerca de:",

        alternativas: {

            A:
                "10% a 20%.",

            B:
                "30% a 40%.",

            C:
                "60% a 100%.",

            D:
                "200%.",

            E:
                "Nenhuma das anteriores, pois o navio torna-se mais estável e gira em menor espaço."

        },

        resposta: "C",

        comentario:
            "Em condições de água muito rasa, a restrição do escoamento pode aumentar significativamente o diâmetro de giro, chegando a acréscimos da ordem de 60% a 100% nas condições indicadas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Shallow-Water Effects",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0016
    // DIEUDONNÉ SPIRAL
    // =====================================

    {
        id: "MAN-0016",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Dieudonné Spiral Maneuver",

        edital:
            "Controlabilidade — avaliação da estabilidade direcional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O Dieudonné Spiral Maneuver é utilizado para identificar a existência de:",

        alternativas: {

            A:
                "Cavitação no leme.",

            B:
                "Instabilidade direcional e laços de histerese (loop).",

            C:
                "Perda de velocidade em curvas.",

            D:
                "Eficiência de propulsores azimutais.",

            E:
                "Efeito squat em canais estreitos."

        },

        resposta: "B",

        comentario:
            "A manobra espiral permite avaliar a relação entre ângulo de leme e taxa de guinada. Um loop ou hysteresis loop é indicativo de instabilidade direcional com controles fixos.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Spiral Maneuvers",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0017
    // CONTROL LOOP
    // =====================================

    {
        id: "MAN-0017",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "The Control Loop",

        edital:
            "Controlabilidade — sistema de controle e governo",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "No ciclo de controle (The Control Loop), a ação corretiva tomada pelo timoneiro ou piloto automático ao observar um erro de trajetória é enviada diretamente ao:",

        alternativas: {

            A:
                "Rudder Angle Indicator.",

            B:
                "Main Propulsion Machinery.",

            C:
                "Steering Gear.",

            D:
                "Hull Hydrodynamic Forces.",

            E:
                "External Disturbances."

        },

        resposta: "C",

        comentario:
            "O comando de correção atua sobre o steering gear, que movimenta o leme. A resposta hidrodinâmica subsequente altera o movimento do navio.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — The Control Loop",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0018
    // POSITIONAL MOTION STABILITY
    // =====================================

    {
        id: "MAN-0018",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Positional Motion Stability",

        edital:
            "Controlabilidade — níveis de estabilidade de movimento",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O termo Positional Motion Stability refere-se ao nível mais alto da hierarquia de estabilidade, onde o navio:",

        alternativas: {

            A:
                "Retorna à sua orientação de proa original apenas.",

            B:
                "Retorna à trajetória original exata (mesma linha sobre o solo).",

            C:
                "Mantém a posição estática mesmo sob vento de 50 nós.",

            D:
                "Alinha-se automaticamente com a correnteza do canal.",

            E:
                "É capaz de girar sobre o próprio eixo sem auxílio de rebocadores."

        },

        resposta: "B",

        comentario:
            "Positional motion stability representa a condição mais restritiva da hierarquia, envolvendo retorno à trajetória espacial original após a perturbação.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Stability of Motion",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0019
    // DRIFT ANGLE
    // =====================================

    {
        id: "MAN-0019",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Drift Angle β",

        edital:
            "Controlabilidade — equações de movimento no plano horizontal",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "De acordo com as equações de movimento linearizadas para o plano horizontal, o ângulo entre a velocidade linear V do navio e o eixo longitudinal x é denominado:",

        alternativas: {

            A:
                "Yaw angle.",

            B:
                "Heading angle.",

            C:
                "Drift angle (ou angle of attack) β.",

            D:
                "Rudder deflection angle.",

            E:
                "Heel angle."

        },

        resposta: "C",

        comentario:
            "O drift angle β representa a diferença angular entre a direção instantânea da velocidade do navio e seu eixo longitudinal.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Equations of Horizontal-Plane Motion",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0020
    // STABILITY INDICES
    // =====================================

    {
        id: "MAN-0020",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Stability Indices σ1 e σ2",

        edital:
            "Controlabilidade — estabilidade direcional",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Na análise de Coursekeeping, um navio que possui índices de estabilidade σ1 e σ2 ambos negativos é considerado:",

        alternativas: {

            A:
                "Instável em linha reta.",

            B:
                "Estável em linha reta (controls-fixed stable).",

            C:
                "Necessitado de piloto automático adaptativo.",

            D:
                "Estável apenas se o leme estiver em Hard-over.",

            E:
                "Direcionalmente instável em águas rasas."

        },

        resposta: "B",

        comentario:
            "No critério apresentado no PNA, valores negativos dos dois índices correspondem à condição de estabilidade com controles fixos.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Controls-Fixed Stability",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0021
    // BANK EFFECT
    // =====================================

    {
        id: "MAN-0021",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Bank Suction e Bow Cushion",

        edital:
            "Controlabilidade — interação com margens de canais",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fenômeno de Bank Suction em canais estreitos ocorre devido à assimetria do fluxo de água em torno do casco. Quando um navio navega paralelo a uma margem mas deslocado do centro do canal, a força hidrodinâmica resultante tende a:",

        alternativas: {

            A:
                "Empurrar a proa para longe da margem e a popa para perto dela.",

            B:
                "Atrair o navio inteiro para a margem mais próxima (força de sucção).",

            C:
                "Criar um momento de adensamento (Squat) maior na proa.",

            D:
                "Reduzir o calado do navio por efeito Venturi.",

            E:
                "Nenhuma das anteriores."

        },

        resposta: "A",

        comentario:
            "O efeito clássico de margem combina bow cushion, que tende a afastar a proa da margem, com bank suction, que tende a atrair a região de popa em direção à margem.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Restricted-Water / Bank Effects",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0022
    // BECH REVERSE SPIRAL
    // =====================================

    {
        id: "MAN-0022",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Bech Reverse Spiral Maneuver",

        edital:
            "Controlabilidade — testes de estabilidade direcional",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A manobra de Bech Spiral (ou Reverse Spiral) difere da espiral de Dieudonné por:",

        alternativas: {

            A:
                "Ser realizada apenas com auxílio de rebocadores.",

            B:
                "Comandar taxas de guinada constantes e medir o ângulo de leme médio resultante.",

            C:
                "Ser executada obrigatoriamente em marcha à ré (backing).",

            D:
                "Ignorar os efeitos de águas rasas.",

            E:
                "Utilizar ângulos de leme superiores a 35 graus."

        },

        resposta: "B",

        comentario:
            "Na reverse spiral de Bech, estabelece-se uma taxa de guinada e determina-se o ângulo médio de leme necessário para mantê-la.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Reverse Spiral Maneuver",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0023
    // PROPELLER EFFECT
    // =====================================

    {
        id: "MAN-0023",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Influência do propulsor",

        edital:
            "Controlabilidade — interação propulsor, casco e governo",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em relação à influência do propulsor na controlabilidade, é correto afirmar que:",

        alternativas: {

            A:
                "Em todos os navios, o efeito de paddlewheel facilita o governo em baixa velocidade.",

            B:
                "O uso de Controllable-pitch propellers (CPP) garante a manutenção total da capacidade de governo mesmo na posição de passo zero.",

            C:
                "Propulsores duplos (Twin screws) que giram para fora (outboard) melhoram a manobrabilidade em relação aos que giram para dentro.",

            D:
                "O leme só é efetivo se estiver localizado fora da esteira do propulsor.",

            E:
                "A taxa de deflexão do leme (Rudder rate) não afeta a controlabilidade de navios de grande porte."

        },

        resposta: "C",

        comentario:
            "A configuração e o sentido de rotação dos propulsores influenciam a capacidade de manobra. Propulsores gêmeos outboard-turning são tradicionalmente associados a vantagens de manobrabilidade.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Propeller and Rudder Effects",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0024
    // TRANSFER
    // =====================================

    {
        id: "MAN-0024",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Turning Circle — Transfer",

        edital:
            "Controlabilidade — parâmetros da curva de giro",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A distância lateral percorrida pelo centro de gravidade do navio, medida a partir da linha de rumo original, até que a proa gire 90 graus é o:",

        alternativas: {

            A:
                "Tactical Diameter.",

            B:
                "Advance.",

            C:
                "Transfer.",

            D:
                "Steady Radius.",

            E:
                "Drift Offset."

        },

        resposta: "C",

        comentario:
            "Transfer é o deslocamento transversal em relação ao rumo inicial medido quando a mudança de rumo alcança 90°.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Turning Circle Definitions",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0025
    // BLOCK COEFFICIENT
    // =====================================

    {
        id: "MAN-0025",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Coeficiente de bloco e estabilidade direcional",

        edital:
            "Controlabilidade — influência da forma do casco",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Navios com coeficiente de bloco (CB) elevado, como grandes petroleiros (VLCCs), tendem a apresentar:",

        alternativas: {

            A:
                "Grande estabilidade direcional inerente.",

            B:
                "Instabilidade direcional (dynamic instability), mas boa capacidade de giro.",

            C:
                "Cascos muito finos que facilitam o Coursekeeping.",

            D:
                "Menor efeito de vento lateral devido ao baixo calado aéreo.",

            E:
                "Diâmetros de giro tácticos maiores que cargueiros menores."

        },

        resposta: "B",

        comentario:
            "Cascos de elevado coeficiente de bloco podem apresentar menor estabilidade direcional inerente e, simultaneamente, elevada capacidade de giro.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Hull Form Effects",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0026
    // PULLOUT TEST
    // =====================================

    {
        id: "MAN-0026",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Pullout Maneuver",

        edital:
            "Controlabilidade — testes de estabilidade direcional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O teste de Pullout, realizado após uma curva de giro, serve para confirmar a estabilidade de um navio. Se o navio for estável, após o leme retornar à meia-nau, a taxa de guinada deverá:",

        alternativas: {

            A:
                "Manter-se constante.",

            B:
                "Aumentar até o navio capotar.",

            C:
                "Decair para zero.",

            D:
                "Estabilizar-se em um valor residual diferente de zero.",

            E:
                "Inverter o sentido bruscamente."

        },

        resposta: "C",

        comentario:
            "Em um navio direcionalmente estável, removida a ação do leme, a taxa de guinada decai progressivamente para zero.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Pullout Maneuver",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0027
    // SHIP-TO-SHIP INTERACTION
    // =====================================

    {
        id: "MAN-0027",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Overtaking Interaction",

        edital:
            "Controlabilidade — interação hidrodinâmica entre navios",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A interação entre dois navios em curso de ultrapassagem (Overtaking) em canal estreito gera forças perigosas. No momento em que os navios estão diretamente lado a lado (abreast), a força entre eles é tipicamente de:",

        alternativas: {

            A:
                "Repulsão mútua.",

            B:
                "Atração mútua.",

            C:
                "Sucção apenas no navio de menor porte.",

            D:
                "Nula, pois as pressões se equilibram.",

            E:
                "Guinada divergente nas proas."

        },

        resposta: "B",

        comentario:
            "Quando os costados ficam próximos e aproximadamente paralelos, o escoamento acelerado entre os navios reduz a pressão local e produz uma forte tendência de atração entre eles.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Ship Interaction",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0028
    // SQUAT
    // =====================================

    {
        id: "MAN-0028",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Squat",

        edital:
            "Controlabilidade — efeitos de águas rasas e restritas",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O efeito Squat em águas restritas é caracterizado por:",

        alternativas: {

            A:
                "Aumento da velocidade do navio devido à compressão do fluxo sob o casco.",

            B:
                "Redução do calado e aumento da borda livre.",

            C:
                "Aumento do calado (sinkage) e mudança de trim.",

            D:
                "Melhora na eficiência do propulsor.",

            E:
                "Redução da estabilidade estática transversal."

        },

        resposta: "C",

        comentario:
            "Squat corresponde à combinação de sinkage dinâmico e alteração de trim produzidos pelo escoamento ao redor do navio em movimento, particularmente relevante em águas rasas e confinadas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Shallow-Water Effects",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0029
    // ENVIRONMENTAL OPERABILITY
    // =====================================

    {
        id: "MAN-0029",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Environmental Operability",

        edital:
            "Controlabilidade — influência ambiental sobre o desempenho",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O conceito de Environmental Operability (Operabilidade Ambiental) relaciona o desempenho de uma missão no mar com:",

        alternativas: {

            A:
                "O desempenho em ar calmo e águas tranquilas.",

            B:
                "O cumprimento rigoroso da MARPOL.",

            C:
                "A potência máxima do motor principal.",

            D:
                "A lotação máxima de passageiros permitida pela SOLAS.",

            E:
                "O custo do combustível em condições de tempestade."

        },

        resposta: "A",

        comentario:
            "Environmental operability expressa o desempenho obtido sob condições ambientais em relação a uma referência de desempenho em condições ideais ou calmas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Environmental Operability",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0030
    // BASIC CONTROL FUNCTIONS
    // =====================================

    {
        id: "MAN-0030",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Funções básicas de controle",

        edital:
            "Controlabilidade — funções de controle do navio",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A controlabilidade de um navio é dividida em três funções. Qual das alternativas NÃO representa uma dessas funções básicas segundo o PNA?",

        alternativas: {

            A:
                "Coursekeeping.",

            B:
                "Maneuvering.",

            C:
                "Speed Changing.",

            D:
                "Dynamic Positioning.",

            E:
                "Todas acima são funções básicas."

        },

        resposta: "D",

        comentario:
            "As três funções fundamentais consideradas são Coursekeeping, Maneuvering e Speed Changing. Dynamic Positioning é um sistema especializado de controle, não uma das três funções básicas dessa classificação.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Controllability Functions",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0031
    // HYSTERESIS LOOP
    // =====================================

    {
        id: "MAN-0031",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Hysteresis Loop",

        edital:
            "Controlabilidade — estabilidade direcional",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Um navio que apresenta um Hysteresis Loop (laço de histerese) em seu gráfico de espiral é diagnosticado como:",

        alternativas: {

            A:
                "Direcionalmente estável em todas as velocidades.",

            B:
                "Possuidor de um índice de estabilidade σ1 negativo.",

            C:
                "Controls-fixed unstable (instável com controles fixos).",

            D:
                "Altamente manobrável e fácil de manter o rumo.",

            E:
                "Inapto para navegação em alto mar."

        },

        resposta: "C",

        comentario:
            "A presença de hysteresis loop na curva obtida em uma manobra espiral é característica de instabilidade direcional com controles fixos.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Spiral Maneuver / Directional Stability",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0032
    // RUDDER AREA
    // =====================================

    {
        id: "MAN-0032",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Área relativa do leme",

        edital:
            "Controlabilidade — influência do leme",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A razão entre a área do leme e a área do plano lateral submerso (AR/LT) é um fator de projeto que afeta diretamente:",

        alternativas: {

            A:
                "A velocidade de serviço.",

            B:
                "A estabilidade direcional e a capacidade de curva.",

            C:
                "O consumo de combustível em marcha lenta.",

            D:
                "O efeito Squat em canais.",

            E:
                "A resistência estrutural do casco."

        },

        resposta: "B",

        comentario:
            "A dimensão relativa do leme influencia diretamente a capacidade de gerar força lateral e momento de guinada, afetando tanto a resposta de governo quanto as características de giro.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Rudder Design and Control",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0033
    // KORT NOZZLES
    // =====================================

    {
        id: "MAN-0033",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Kort Nozzles",

        edital:
            "Controlabilidade — dispositivos propulsivos e manobrabilidade",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Navios equipados com Kort Nozzles (tubulões) apresentam maior eficiência de manobra em:",

        alternativas: {

            A:
                "Altas velocidades de trânsito.",

            B:
                "Baixas velocidades e condições de alta carga no hélice.",

            C:
                "Marcha à ré exclusiva.",

            D:
                "Águas profundas apenas.",

            E:
                "Nenhuma das anteriores."

        },

        resposta: "B",

        comentario:
            "Propulsores em nozzle apresentam vantagem especialmente em condições de elevada carga de empuxo e baixa velocidade, nas quais o conjunto propulsor-tubulão pode gerar maior thrust.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Propulsion and Maneuvering Devices",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0034
    // TACTICAL × STEADY DIAMETER
    // =====================================

    {
        id: "MAN-0034",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Tactical Diameter e Steady Turning Diameter",

        edital:
            "Controlabilidade — curva de giro",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O Tactical Diameter é geralmente maior que o Steady Turning Diameter porque:",

        alternativas: {

            A:
                "O navio perde velocidade durante a curva.",

            B:
                "O ângulo de deriva (β) aumenta até estabilizar.",

            C:
                "O navio percorre uma trajetória transiente antes de atingir o raio constante.",

            D:
                "O efeito do hélice é reduzido pela guinada.",

            E:
                "As alternativas A e C estão corretas."

        },

        resposta: "E",

        comentario:
            "Durante a fase inicial da curva existe um regime transiente antes do estabelecimento da condição de giro permanente. A redução de velocidade durante a evolução também participa da diferença entre os parâmetros da curva.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Turning Maneuver",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0035
    // PMM
    // =====================================

    {
        id: "MAN-0035",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Planar Motion Mechanism",

        edital:
            "Controlabilidade — ensaios hidrodinâmicos e derivadas de manobra",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em testes de modelos cativos (Captive Model Tests), o dispositivo utilizado para medir forças hidrodinâmicas em trajetórias de oscilação impostas é o:",

        alternativas: {

            A:
                "Rotating-Arm.",

            B:
                "Planar Motion Mechanism (PMM).",

            C:
                "Free-running radio controlled model.",

            D:
                "Wind Tunnel.",

            E:
                "GPS Differential sensor."

        },

        resposta: "B",

        comentario:
            "O Planar Motion Mechanism permite impor movimentos oscilatórios controlados ao modelo e medir forças e momentos utilizados na determinação das derivadas hidrodinâmicas de manobra.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Captive Model Tests / PMM",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0036
    // BROACHING
    // =====================================

    {
        id: "MAN-0036",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Broaching",

        edital:
            "Controlabilidade — comportamento do navio em ondas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fenômeno de Broaching (atravessar às ondas) é um risco crítico de controlabilidade que ocorre tipicamente em:",

        alternativas: {

            A:
                "Mares de proa (head seas).",

            B:
                "Mares de popa ou de alheta (following ou quartering seas).",

            C:
                "Condições de porto sem vento.",

            D:
                "Curvas de giro com leme a meio.",

            E:
                "Navios parados em dead-in-the-water."

        },

        resposta: "B",

        comentario:
            "Broaching está associado principalmente a condições de following ou quartering seas, nas quais o navio pode desenvolver uma guinada brusca e difícil de controlar.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Maneuvering in Waves / Broaching",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0037
    // SKEG
    // =====================================

    {
        id: "MAN-0037",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Skeg e estabilidade direcional",

        edital:
            "Controlabilidade — influência dos apêndices",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Qual o efeito de aumentar a área de uma Skeg (bolina de popa) na controlabilidade?",

        alternativas: {

            A:
                "Melhora a capacidade de giro (reduz o diâmetro táctico).",

            B:
                "Melhora a estabilidade direcional, mas prejudica a capacidade de giro.",

            C:
                "Não tem efeito, pois é uma estrutura fixa.",

            D:
                "Aumenta significativamente a velocidade máxima.",

            E:
                "Reduz o efeito Squat."

        },

        resposta: "B",

        comentario:
            "O aumento de área lateral fixa na região de popa tende a aumentar a estabilidade direcional. A contrapartida é maior resistência à mudança de rumo, reduzindo a facilidade de iniciar e manter uma curva apertada.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Effect of Hull Appendages",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0038
    // IMO ADVANCE CRITERION
    // =====================================

    {
        id: "MAN-0038",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Critério IMO — Advance",

        edital:
            "Controlabilidade — padrões de manobrabilidade",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Segundo a norma IMO A.751 referenciada no contexto do PNA, um dos critérios de manobrabilidade é que o Advance em uma curva de giro com 35° de leme não deve exceder:",

        alternativas: {

            A:
                "2,5 comprimentos de navio (L).",

            B:
                "4,5 comprimentos de navio (L).",

            C:
                "5,0 comprimentos de navio (L).",

            D:
                "10,0 comprimentos de navio (L).",

            E:
                "Não há limite quantitativo para o Advance."

        },

        resposta: "B",

        comentario:
            "No critério indicado no material-base, o Advance da manobra de giro não deve exceder 4,5 comprimentos de navio.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Maneuverability Standards",
                pagina:
                    ""
            },
            {
                publicacao:
                    "IMO Resolution A.751 — Interim Standards for Ship Manoeuvrability",
                capitulo:
                    "Turning Ability",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0039
    // HEAD REACH
    // =====================================

    {
        id: "MAN-0039",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Crash Stop — Head Reach",

        edital:
            "Controlabilidade — mudança de velocidade e parada",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O termo Head Reach em uma manobra de parada de emergência (Crash Stop) refere-se a:",

        alternativas: {

            A:
                "Distância percorrida ao longo da trajetória curva.",

            B:
                "Distância percorrida na direção do rumo original do navio.",

            C:
                "Tempo total até a parada completa.",

            D:
                "Ângulo de guinada durante a parada.",

            E:
                "Distância lateral máxima desviada do rumo original."

        },

        resposta: "B",

        comentario:
            "Head Reach é a projeção longitudinal da distância de parada sobre a direção do rumo original. Não deve ser confundida com a distância total percorrida ao longo da trajetória.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Stopping Maneuvers",
                pagina:
                    ""
            }
        ]
    },


    // =====================================
    // MAN-0040
    // TUG ASSISTANCE
    // =====================================

    {
        id: "MAN-0040",

        disciplina: "manobrabilidade",

        assunto: "Controlabilidade",

        topico: "Tug Assistance",

        edital:
            "Controlabilidade — controle de navios em baixa velocidade e águas restritas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O uso de rebocadores (Tug Assistance) no auxílio a manobras de navios de grande porte em canais estreitos visa, tecnicamente:",

        alternativas: {

            A:
                "Apenas economizar combustível do navio principal.",

            B:
                "Compensar a falta de estabilidade direcional inerente do navio em baixas velocidades.",

            C:
                "Aumentar a velocidade de trânsito segura no canal.",

            D:
                "Evitar o efeito Squat.",

            E:
                "Todas as anteriores estão corretas."

        },

        resposta: "B",

        comentario:
            "Em baixas velocidades, as forças produzidas pelo leme e pelo casco podem ser insuficientes para obter a autoridade de controle desejada. Rebocadores fornecem forças e momentos adicionais para controlar a posição e a guinada.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Controllability",
                capitulo:
                    "Chapter 9 — Tug Assistance / Low-Speed Control",
                pagina:
                    ""
            }
        ]
 }

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
