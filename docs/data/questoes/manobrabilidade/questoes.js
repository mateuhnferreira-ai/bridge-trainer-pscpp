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

    // =====================================
    // MAN-0041
    // SEMELHANÇA DE FROUDE
    // =====================================

    {
        id: "MAN-0041",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Semelhança de Froude — velocidade de modelo",

        edital:
            "Resistência do Navio — ensaios de modelos e leis de semelhança",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Um navio de 250 metros de comprimento deve operar a uma velocidade de serviço de 16 nós. Um modelo em escala λ = 25 é testado em um tanque de provas. Para garantir a semelhança de Froude (Fn), a velocidade do modelo (VM) deve ser:",

        alternativas: {

            A: "0,64 nós.",

            B: "3,20 nós.",

            C: "4,00 nós.",

            D: "0,32 nós.",

            E: "1,60 nós."

        },

        resposta: "B",

        comentario:
            "Pela semelhança de Froude, VM = VS/√λ. Portanto, VM = 16/√25 = 16/5 = 3,20 nós.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Model Testing and Froude Scaling",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0042
    // DECOMPOSIÇÃO DA RESISTÊNCIA
    // =====================================

    {
        id: "MAN-0042",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência friccional e residual",

        edital:
            "Resistência do Navio — decomposição da resistência total",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre a decomposição clássica da resistência total (RT = RF + RR), é correto afirmar que:",

        alternativas: {

            A:
                "A resistência residual (RR) é composta exclusivamente pela resistência de formação de ondas (RW).",

            B:
                "A resistência de fricção (RF) depende primordialmente do Número de Froude, por envolver a gravidade.",

            C:
                "A resistência residual (RR) inclui a resistência de ondas e componentes viscosos de pressão (forma).",

            D:
                "O coeficiente de resistência total (CT) aumenta proporcionalmente ao Número de Reynolds (Rn).",

            E:
                "A resistência de fricção independe da área de superfície molhada (S)."

        },

        resposta: "C",

        comentario:
            "Na decomposição clássica, a resistência residual corresponde ao que permanece da resistência total após a retirada da parcela friccional de referência. Ela não deve ser tratada simplesmente como sinônimo de resistência de formação de ondas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Components of Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0043
    // VELOCIDADE CRÍTICA EM ÁGUAS RASAS
    // =====================================

    {
        id: "MAN-0043",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Velocidade crítica em águas rasas",

        edital:
            "Resistência do Navio — efeitos de águas rasas e restritas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Durante uma manobra em canal de acesso com profundidade crítica, o Prático observa um aumento súbito na resistência e no squat. De acordo com a teoria de escoamento em águas rasas, a velocidade crítica de onda é definida por:",

        alternativas: {

            A: "V = √(g · L).",

            B: "V = √(g · h).",

            C: "V = √(2g · h).",

            D: "V = √(g / h).",

            E: "V = √(L / h)."

        },

        resposta: "B",

        comentario:
            "Para ondas longas em águas rasas, a velocidade característica é √(gh). A condição crítica corresponde a um número de Froude baseado na profundidade próximo da unidade.",

        bibliografia: [
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Shallow Water",

                pagina: ""
            },
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Shallow-Water Effects",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0044
    // POTÊNCIA EFETIVA
    // =====================================

    {
        id: "MAN-0044",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Potência efetiva",

        edital:
            "Resistência do Navio — relação entre resistência, velocidade e potência",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A potência efetiva (PE) necessária para que um navio vença uma resistência total de 1.000 kN à velocidade de 10 m/s é de:",

        alternativas: {

            A: "100 kW.",

            B: "1.000 kW.",

            C: "10.000 kW.",

            D: "5.000 kW.",

            E: "20.000 kW."

        },

        resposta: "C",

        comentario:
            "PE = RT × V. Como 1.000 kN = 1.000.000 N, PE = 1.000.000 × 10 = 10.000.000 W = 10.000 kW.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Resistance and Effective Power",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0045
    // FATOR DE FORMA
    // =====================================

    {
        id: "MAN-0045",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Fator de forma",

        edital:
            "Resistência do Navio — resistência viscosa e fator de forma",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fator de forma (k) é utilizado no método ITTC-1957 para:",

        alternativas: {

            A:
                "Corrigir a resistência de ondas para efeitos de escala.",

            B:
                "Representar o aumento da resistência viscosa devido à forma tridimensional do casco em relação a uma placa plana.",

            C:
                "Calcular a resistência do ar nas obras mortas.",

            D:
                "Ajustar a velocidade do modelo para o Número de Reynolds do navio.",

            E:
                "Compensar a perda de empuxo (thrust deduction)."

        },

        resposta: "B",

        comentario:
            "O fator (1+k) representa o acréscimo da resistência viscosa associado aos efeitos tridimensionais da forma do casco em comparação com a resistência friccional de uma placa plana equivalente.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Form Factor",

                pagina: ""
            },
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0046
    // NÚMERO DE REYNOLDS
    // =====================================

    {
        id: "MAN-0046",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Número de Reynolds",

        edital:
            "Resistência do Navio — efeitos viscosos",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em relação ao Número de Reynolds (Rn), é correto afirmar que ele representa a razão entre:",

        alternativas: {

            A:
                "Forças de inércia e forças gravitacionais.",

            B:
                "Forças de pressão e forças viscosas.",

            C:
                "Forças de inércia e forças viscosas.",

            D:
                "Forças de gravidade e forças de tensão superficial.",

            E:
                "Velocidade do navio e velocidade do som na água."

        },

        resposta: "C",

        comentario:
            "O Número de Reynolds expressa a relação entre os efeitos de inércia e os efeitos viscosos do escoamento e é fundamental na análise da resistência friccional.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Reynolds Number and Frictional Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0047
    // ESCALA DE FORÇA
    // =====================================

    {
        id: "MAN-0047",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Escala da resistência residual",

        edital:
            "Resistência do Navio — ensaios de modelos e transposição de escala",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Considere um navio e seu modelo (λ = 100). Se a força de resistência residual medida no modelo é de 10 N, a força de resistência residual do navio, em água de mesma densidade, será:",

        alternativas: {

            A: "1.000 N.",

            B: "100.000 N.",

            C: "1.000.000 N.",

            D: "10.000.000 N.",

            E: "10.000 N."

        },

        resposta: "D",

        comentario:
            "Sob semelhança de Froude e mesma densidade, a força residual escala com λ³. Assim, RS/RM = 100³ = 1.000.000 e RS = 10 × 1.000.000 = 10.000.000 N.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Model-Ship Correlation",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0048
    // FOULING
    // =====================================

    {
        id: "MAN-0048",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Rugosidade e incrustação do casco",

        edital:
            "Resistência do Navio — resistência friccional e rugosidade",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Um navio cargueiro apresenta incrustação severa no casco após longo período fundeado. Hidrodinamicamente, isso resulta em:",

        alternativas: {

            A:
                "Redução do Número de Froude.",

            B:
                "Aumento da tensão de cisalhamento e, consequentemente, da resistência friccional.",

            C:
                "Redução da resistência de ondas por amortecimento.",

            D:
                "Aumento da velocidade crítica em águas rasas.",

            E:
                "Redução da camada-limite na popa."

        },

        resposta: "B",

        comentario:
            "O aumento da rugosidade superficial provocado por fouling eleva o arrasto de cisalhamento e, consequentemente, a resistência friccional do casco.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Surface Roughness and Friction",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0049
    // KELVIN WAVE PATTERN
    // =====================================

    {
        id: "MAN-0049",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Sistema de ondas de Kelvin",

        edital:
            "Resistência do Navio — formação de ondas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O sistema de ondas de Kelvin gerado por um navio avançando em águas profundas é contido em um setor cujo semi-ângulo de abertura é de aproximadamente:",

        alternativas: {

            A: "10° 15'.",

            B: "19° 28'.",

            C: "35° 00'.",

            D: "45° 00'.",

            E: "90° 00'."

        },

        resposta: "B",

        comentario:
            "O padrão clássico de Kelvin apresenta um semiângulo aproximadamente igual a 19°28' em relação à direção de avanço.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave Pattern",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0050
    // BULBO DE PROA
    // =====================================

    {
        id: "MAN-0050",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Bulbous Bow",

        edital:
            "Resistência do Navio — interferência dos sistemas de ondas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre o bulbo de proa, assinale a alternativa tecnicamente precisa:",

        alternativas: {

            A:
                "O bulbo sempre reduz a resistência total, independente da velocidade do navio.",

            B:
                "O bulbo reduz a resistência de ondas por criar uma interferência destrutiva com o sistema de ondas da proa.",

            C:
                "O bulbo atua aumentando a resistência friccional para estabilizar o fluxo.",

            D:
                "Em baixas velocidades (Fn < 0.1), o bulbo é o fator principal de redução de RT.",

            E:
                "O bulbo elimina a formação da esteira viscosa."

        },

        resposta: "B",

        comentario:
            "Um bulbo adequadamente projetado pode produzir um sistema de ondas cuja interferência com o sistema gerado pelo casco reduz a resistência de formação de ondas na faixa de velocidade para a qual foi projetado.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave Interference and Bulbous Bow",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0051
    // ESCALA DE POTÊNCIA
    // =====================================

    {
        id: "MAN-0051",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Escala da potência efetiva",

        edital:
            "Resistência do Navio — leis de semelhança",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A lei de semelhança de Froude exige que o modelo seja testado em uma velocidade correspondente à do navio. Se a razão de escala é λ, a razão entre a potência efetiva do navio (PES) e a do modelo (PEM) é:",

        alternativas: {

            A: "λ³.",

            B: "λ^3,5.",

            C: "λ^0,5.",

            D: "λ².",

            E: "λ^2,5."

        },

        resposta: "B",

        comentario:
            "Sob semelhança de Froude, a força escala com λ³ e a velocidade com √λ. Como potência é força multiplicada pela velocidade, a razão de potência é λ³ × λ^0,5 = λ^3,5.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Model Scaling",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0052
    // FLOW SEPARATION
    // =====================================

    {
        id: "MAN-0052",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Separação do escoamento",

        edital:
            "Resistência do Navio — resistência viscosa de pressão",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A separação do escoamento na popa de navios de formas cheias, como petroleiros VLCC, causa:",

        alternativas: {

            A:
                "Aumento da recuperação de pressão na popa.",

            B:
                "Redução da resistência viscosa de pressão.",

            C:
                "Aumento da resistência viscosa de pressão (forma).",

            D:
                "Redução do coeficiente de bloco (CB).",

            E:
                "Extinção da esteira nominal."

        },

        resposta: "C",

        comentario:
            "A separação do escoamento prejudica a recuperação de pressão na região de popa e aumenta a componente viscosa de pressão da resistência.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Viscous Pressure Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0053
    // HUMPS E HOLLOWS
    // =====================================

    {
        id: "MAN-0053",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Humps e Hollows",

        edital:
            "Resistência do Navio — interferência de ondas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fenômeno de Humps e Hollows na curva de resistência de ondas deve-se a:",

        alternativas: {

            A:
                "Variações na viscosidade da água com a temperatura.",

            B:
                "Interferência construtiva e destrutiva entre os sistemas de ondas de proa e popa.",

            C:
                "Mudança do regime laminar para turbulento.",

            D:
                "Efeito de águas restritas no canal.",

            E:
                "Alteração no passo do hélice."

        },

        resposta: "B",

        comentario:
            "A interferência entre os sistemas de ondas produzidos em diferentes regiões do casco pode reforçar ou reduzir a elevação da superfície, originando humps e hollows na curva de resistência.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave-Making Humps and Hollows",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0054
    // RESISTÊNCIA DE APÊNDICES
    // =====================================

    {
        id: "MAN-0054",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Resistência de apêndices",

        edital:
            "Resistência do Navio — apêndices",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A resistência de apêndices, como leme, pés-de-galinha e quilhas de balanço, é geralmente tratada como uma parcela da:",

        alternativas: {

            A: "Resistência de ondas.",

            B: "Resistência viscosa.",

            C: "Resistência do ar.",

            D: "Resistência residual apenas.",

            E: "Resistência de squat."

        },

        resposta: "B",

        comentario:
            "Os apêndices apresentam área molhada própria e produzem efeitos de cisalhamento e pressão. Sua contribuição é, portanto, predominantemente associada à resistência viscosa.",

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
    // MAN-0055
    // ITTC-1957
    // =====================================

    {
        id: "MAN-0055",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "ITTC-1957 Friction Line",

        edital:
            "Resistência do Navio — coeficiente de resistência friccional",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A linha ITTC-1957 define o coeficiente de fricção (CF) pela fórmula:",

        alternativas: {

            A:
                "CF = 0,075 / (log10 Rn - 2)².",

            B:
                "CF = 1,327 / √Rn.",

            C:
                "CF = 0,455 / (log10 Rn)^2,58.",

            D:
                "CF = RF / (ρ · S · V).",

            E:
                "CF = 0,075 / (log10 Fn - 2)²."

        },

        resposta: "A",

        comentario:
            "A ITTC-1957 Model-Ship Correlation Line utiliza CF = 0,075/(log10 Rn - 2)².",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; ITTC-1957 Model-Ship Correlation Line",

                pagina: ""
            },
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Resistance and Propulsion",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0056
    // VELOCIDADE ATRAVÉS DA ÁGUA
    // =====================================

    {
        id: "MAN-0056",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Velocidade relativa à água",

        edital:
            "Resistência do Navio — aplicação operacional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "De acordo com os princípios de manobra, ao navegar contra uma correnteza de 2 nós, um navio que mantém 10 nós de velocidade no fundo experimentará uma resistência baseada em qual velocidade?",

        alternativas: {

            A: "10 nós.",

            B: "8 nós.",

            C: "12 nós.",

            D: "2 nós.",

            E: "10,2 nós."

        },

        resposta: "C",

        comentario:
            "As forças hidrodinâmicas dependem da velocidade do navio relativamente à água. Para manter 10 nós sobre o fundo contra uma corrente de 2 nós, a velocidade através da água é 12 nós.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",

                capitulo:
                    "Shiphandling Forces — Speed Through the Water",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0057
    // NO-SLIP CONDITION
    // =====================================

    {
        id: "MAN-0057",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "No-slip condition",

        edital:
            "Resistência do Navio — escoamento viscoso e camada-limite",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A condição de não-deslizamento (no-slip condition) implica que:",

        alternativas: {

            A:
                "A água desliza sem atrito sobre o casco.",

            B:
                "A velocidade relativa da partícula de fluido em contato com o casco é zero.",

            C:
                "A camada-limite tem espessura infinita.",

            D:
                "A resistência de ondas é nula.",

            E:
                "O escoamento é puramente potencial (ideal)."

        },

        resposta: "B",

        comentario:
            "Para um fluido viscoso junto a uma superfície sólida, a velocidade do fluido na interface acompanha a velocidade da superfície. No referencial do casco, a velocidade relativa na parede é zero.",

        bibliografia: [
            {
                publicacao:
                    "Ship Resistance and Flow",

                capitulo:
                    "Viscous Flow and Boundary Layer",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0058
    // RESISTÊNCIA DO AR
    // =====================================

    {
        id: "MAN-0058",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Air Resistance Correction",

        edital:
            "Resistência do Navio — resistência aerodinâmica",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A resistência do ar (RAA) é calculada utilizando a área projetada das obras mortas. Em relação ao coeficiente CAA na escala navio-modelo, é correto afirmar:",

        alternativas: {

            A:
                "Ele é medido no modelo e multiplicado por λ³.",

            B:
                "Ele é desprezado no modelo e adicionado como correção no cálculo do navio real.",

            C:
                "Ele depende linearmente do Número de Froude.",

            D:
                "Ele é maior em navios carregados do que em navios em lastro.",

            E:
                "Ele substitui a margem de correlação (CA)."

        },

        resposta: "B",

        comentario:
            "A contribuição aerodinâmica do navio real não é reproduzida diretamente pelo ensaio hidrodinâmico do modelo submerso equivalente e é introduzida separadamente na correlação para o navio.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Air Resistance Correction",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0059
    // COMPRIMENTO DE ONDA EM ÁGUAS RASAS
    // =====================================

    {
        id: "MAN-0059",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Ondas em águas rasas",

        edital:
            "Resistência do Navio — efeitos da profundidade",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A profundidade da água afeta a resistência de ondas. Em águas rasas, o comprimento das ondas produzidas pelo navio para uma mesma velocidade, comparado às águas profundas, tende a ser:",

        alternativas: {

            A: "Maior.",

            B: "Igual.",

            C: "Menor.",

            D: "Independente da profundidade.",

            E: "Nulo."

        },

        resposta: "A",

        comentario:
            "Na abordagem utilizada pelas fontes de manobrabilidade do projeto e já cobrada em prova oficial do PSCPP, as ondas produzidas pelo navio em águas rasas tendem a apresentar maior comprimento para a mesma velocidade do navio.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture",

                capitulo:
                    "Resistance in Shallow Water",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0060
    // NAVIOS DE FORMAS CHEIAS
    // =====================================

    {
        id: "MAN-0060",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Formas cheias e resistência viscosa",

        edital:
            "Resistência do Navio — influência da forma do casco",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Um navio petroleiro possui formas muito cheias (CB alto). Para este navio, a parcela dominante da resistência total em velocidade de serviço é a:",

        alternativas: {

            A:
                "Resistência de ondas.",

            B:
                "Resistência viscosa (fricção e forma).",

            C:
                "Resistência aerodinâmica.",

            D:
                "Resistência de apêndices.",

            E:
                "Resistência de indução."

        },

        resposta: "B",

        comentario:
            "Em navios relativamente lentos e de formas cheias, as componentes viscosas — fricção e resistência viscosa de pressão — podem representar a maior parcela da resistência total.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Components of Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0061
    // MÉTODO DE FROUDE
    // =====================================

    {
        id: "MAN-0061",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Hipótese de Froude",

        edital:
            "Resistência do Navio — ensaios de modelos",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O coeficiente de resistência residual (CR) é obtido experimentalmente subtraindo-se o coeficiente de fricção calculado (CF) do coeficiente de resistência total medido (CT). Este procedimento baseia-se na hipótese de:",

        alternativas: {

            A: "Reynolds.",

            B: "Bernoulli.",

            C: "Froude.",

            D: "Michell.",

            E: "Taylor."

        },

        resposta: "C",

        comentario:
            "O método clássico de Froude separa a resistência em uma componente friccional calculada e uma resistência residual obtida a partir dos resultados do modelo.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Froude's Method",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0062
    // CAMADA-LIMITE
    // =====================================

    {
        id: "MAN-0062",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Desenvolvimento da camada-limite",

        edital:
            "Resistência do Navio — escoamento viscoso",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A espessura da camada-limite viscosa ao longo do comprimento do navio:",

        alternativas: {

            A:
                "Diminui da proa para a popa.",

            B:
                "Mantém-se constante.",

            C:
                "Aumenta da proa para a popa.",

            D:
                "É independente do comprimento.",

            E:
                "Só existe na região do hélice."

        },

        resposta: "C",

        comentario:
            "A camada-limite desenvolve-se a partir da região de vante e sua espessura aumenta progressivamente no sentido da popa.",

        bibliografia: [
            {
                publicacao:
                    "Ship Resistance and Flow",

                capitulo:
                    "Boundary-Layer Development",

                pagina: ""
            },
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Boundary Layer",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0063
    // FROUDE DE PROFUNDIDADE
    // =====================================

    {
        id: "MAN-0063",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Depth Froude Number",

        edital:
            "Resistência do Navio — águas rasas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O Número de Froude baseado na profundidade (Fnh) é expresso por:",

        alternativas: {

            A: "V / √(g · L).",

            B: "V / √(g · h).",

            C: "V² / (g · h).",

            D: "h / √(g · V).",

            E: "g · h / V²."

        },

        resposta: "B",

        comentario:
            "O número de Froude de profundidade relaciona a velocidade do navio à velocidade característica das ondas longas em profundidade h: Fnh = V/√(gh).",

        bibliografia: [
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Shallow Water",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0064
    // FROUDE E RESISTÊNCIA DE ONDAS
    // =====================================

    {
        id: "MAN-0064",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Número de Froude elevado",

        edital:
            "Resistência do Navio — resistência de formação de ondas",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Quando o Número de Froude (Fn) de um navio de deslocamento ultrapassa aproximadamente 0,40, observa-se:",

        alternativas: {

            A:
                "Redução drástica na resistência total.",

            B:
                "O aparecimento necessário de um Hollow na curva de resistência.",

            C:
                "Um aumento acentuado da importância da resistência de ondas.",

            D:
                "A estabilização do sistema de ondas de popa.",

            E:
                "A predominância do Número de Reynolds sobre o de Froude."

        },

        resposta: "C",

        comentario:
            "Em números de Froude elevados para um casco de deslocamento, a resistência associada à geração de ondas cresce fortemente e pode tornar-se uma parcela dominante do aumento da resistência total.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave-Making Resistance and Froude Number",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0065
    // SPC
    // =====================================

    {
        id: "MAN-0065",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Self-Polishing Copolymer coatings",

        edital:
            "Resistência do Navio — rugosidade do casco",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O uso de tintas autopolimerizáveis ou autopolimentantes (SPC) visa reduzir a resistência ao longo do tempo por meio da:",

        alternativas: {

            A:
                "Eliminação do sistema de ondas de Kelvin.",

            B:
                "Redução da rugosidade média do casco pelo desgaste controlado da tinta.",

            C:
                "Aumento da viscosidade cinemática da água próxima ao casco.",

            D:
                "Alteração do ponto de separação do escoamento na proa.",

            E:
                "Redução da área de superfície molhada."

        },

        resposta: "B",

        comentario:
            "Sistemas SPC promovem renovação controlada da superfície do revestimento, ajudando a manter uma superfície hidrodinamicamente mais favorável e a limitar o aumento de resistência associado à rugosidade e incrustação.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Hull Roughness and Coatings",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0066
    // RESISTÊNCIA VISCOSA DE PRESSÃO
    // =====================================

    {
        id: "MAN-0066",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Viscous Pressure Resistance",

        edital:
            "Resistência do Navio — resistência de forma",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A resistência viscosa de pressão, também associada à resistência de forma, é causada por:",

        alternativas: {

            A:
                "Atrito tangencial isoladamente.",

            B:
                "Diferença de pressão entre proa e popa associada aos efeitos viscosos e ao desenvolvimento da camada-limite.",

            C:
                "Energia dissipada exclusivamente na crista da onda de proa.",

            D:
                "Movimento lateral do navio (deriva).",

            E:
                "Vento atuando nas superestruturas."

        },

        resposta: "B",

        comentario:
            "Os efeitos viscosos modificam a distribuição e a recuperação de pressão ao redor do casco. A diferença resultante entre as contribuições de pressão de vante e de ré produz a resistência viscosa de pressão.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Viscous Pressure Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0067
    // BLOCKAGE EFFECT
    // =====================================

    {
        id: "MAN-0067",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Blockage Effect",

        edital:
            "Resistência do Navio — canais e águas restritas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em um canal restrito, o efeito de bloqueio (blockage effect) tende a:",

        alternativas: {

            A:
                "Diminuir a resistência total.",

            B:
                "Aumentar a velocidade crítica de Froude.",

            C:
                "Aumentar a velocidade do escoamento ao redor do casco, elevando a resistência.",

            D:
                "Reduzir o squat.",

            E:
                "Manter a resistência idêntica à de mar aberto."

        },

        resposta: "C",

        comentario:
            "A restrição da seção disponível para o escoamento força a água a acelerar ao redor do casco. Isso altera o campo de pressão, aumenta os efeitos de águas restritas e pode elevar significativamente a resistência.",

        bibliografia: [
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion; Restricted and Shallow Water",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0068
    // WAVE BREAKING RESISTANCE
    // =====================================

    {
        id: "MAN-0068",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Wave Breaking Resistance",

        edital:
            "Resistência do Navio — resistência de quebra de ondas",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A resistência de quebra de ondas (wave breaking resistance) ocorre principalmente em:",

        alternativas: {

            A:
                "Navios muito finos a baixas velocidades.",

            B:
                "Navios com formas de proa muito rombudas (blunt bows).",

            C:
                "Navios navegando em marcha à ré.",

            D:
                "Submarinos em imersão profunda.",

            E:
                "Tanques de provas com modelos em escala reduzida (λ > 100)."

        },

        resposta: "B",

        comentario:
            "Formas de proa muito cheias ou rombudas podem produzir forte elevação e quebra local da superfície livre, originando uma componente adicional de resistência associada ao wave breaking.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance; Wave-Breaking Resistance",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0069
    // CADEIA DE POTÊNCIAS
    // =====================================

    {
        id: "MAN-0069",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Potência efetiva e potência indicada",

        edital:
            "Resistência do Navio — potência e eficiência propulsiva",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A potência indicada (PI) difere da potência efetiva (PE) por considerar:",

        alternativas: {

            A:
                "Apenas a resistência de ondas.",

            B:
                "As perdas e rendimentos existentes entre a potência desenvolvida no motor e a potência efetivamente utilizada para vencer a resistência do casco.",

            C:
                "Apenas a resistência viscosa.",

            D:
                "A influência do bulbo de proa.",

            E:
                "A correção de águas rasas."

        },

        resposta: "B",

        comentario:
            "A potência efetiva é PE = RT·V e representa a potência necessária para vencer a resistência do casco. A potência indicada situa-se na origem da cadeia propulsiva, de modo que entre PI e PE intervêm perdas mecânicas e eficiências do sistema propulsivo.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Resistance, Propulsion and Propulsive Efficiency",

                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0070
    // RESISTÊNCIA × VELOCIDADE
    // =====================================

    {
        id: "MAN-0070",

        disciplina: "manobrabilidade",

        assunto: "Resistência do Navio",

        topico: "Influência da velocidade",

        edital:
            "Resistência do Navio — comportamento da resistência com a velocidade",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O Prático, ao solicitar A Toda Força em um canal estreito, deve estar ciente de que a resistência total cresce, em termos gerais, com:",

        alternativas: {

            A:
                "O logaritmo da velocidade.",

            B:
                "Aproximadamente o quadrado da velocidade para importantes parcelas viscosas, enquanto a resistência associada à formação de ondas pode crescer de maneira ainda mais acentuada em determinadas faixas.",

            C:
                "A raiz quadrada da velocidade.",

            D:
                "Inversamente à velocidade.",

            E:
                "De forma necessariamente linear com a rotação do hélice."

        },

        resposta: "B",

        comentario:
            "A resistência não possui uma única lei de potência válida para todas as parcelas e velocidades. A resistência viscosa apresenta forte dependência da velocidade, aproximadamente quadrática em muitas análises práticas, enquanto a componente de ondas pode crescer muito rapidamente em determinadas faixas de número de Froude. Em águas restritas, os efeitos de profundidade e bloqueio podem agravar ainda mais esse aumento.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II: Resistance, Propulsion and Vibration",

                capitulo:
                    "Chapter V — Resistance",

                pagina: ""
            },
            {
                publicacao:
                    "Practical Ship Hydrodynamics — 2nd Edition",

                capitulo:
                    "Chapter 3 — Resistance and Propulsion",

                pagina: ""
            }
        ]
    }

    // =====================================
    // MAN-0071
    // PASSO E RAZÃO DE PASSO
    // =====================================

    {
        id: "MAN-0071",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Passo do propulsor e razão P/D",

        edital:
            "Propulsão — geometria e características dos propulsores",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O passo de um propulsor (P) é definido como a distância que o hélice avançaria em uma revolução em um meio sólido. Sobre a razão de passo (P/D), assinale a alternativa correta:",

        alternativas: {

            A:
                "Um aumento no passo, mantendo o diâmetro constante, invariavelmente aumenta a eficiência em baixas velocidades de avanço.",

            B:
                "O passo geométrico é medido na face da pá, enquanto o passo efetivo considera o ângulo de ataque de portância nula.",

            C:
                "Em hélices de passo controlável (CPP), o passo é fixado para a velocidade de cruzeiro e não pode ser alterado sob carga.",

            D:
                "O passo médio é geralmente calculado no raio de 0,2R, onde a carga de empuxo é máxima.",

            E:
                "A razão de passo não influencia o aparecimento da cavitação de dorso (back cavitation)."

        },

        resposta: "B",

        comentario:
            "O passo geométrico decorre da geometria da pá. O passo efetivo considera a condição aerodinâmica/hidrodinâmica correspondente ao ângulo de ataque de sustentação nula.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0072
    // ÁREAS DO PROPULSOR
    // =====================================

    {
        id: "MAN-0072",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Developed Area Ratio — DAR",

        edital:
            "Propulsão — geometria dos propulsores",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A Razão de Área Desenvolvida (DAR) é um parâmetro fundamental no projeto de hélices. Sobre as definições de área, é correto afirmar que:",

        alternativas: {

            A:
                "A área projetada (AP) é sempre maior que a área desenvolvida (AD).",

            B:
                "A área desenvolvida (AD) é a projeção da face das pás em um plano transversal ao eixo.",

            C:
                "A área de disco (A0) é a área total das faces das pás multiplicada pelo número de pás.",

            D:
                "A área desenvolvida é a área real da superfície da pá se esta fosse desenrolada em um plano.",

            E:
                "O coeficiente DAR é inversamente proporcional ao risco de cavitação por erosão."

        },

        resposta: "D",

        comentario:
            "A developed area corresponde à área obtida quando a superfície helicoidal das pás é desenvolvida ou desenrolada em um plano.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0073
    // SEMELHANÇA E ROTAÇÃO
    // =====================================

    {
        id: "MAN-0073",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Escala de rotação do propulsor",

        edital:
            "Propulsão — ensaios de modelos e semelhança",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Considere um propulsor e seu modelo em escala λ. Para garantir a semelhança de Froude em testes de águas abertas (open water), a relação entre as rotações do navio (nS) e do modelo (nM) deve ser:",

        alternativas: {

            A:
                "nS = nM × √λ.",

            B:
                "nS = nM / √λ.",

            C:
                "nS = nM / λ.",

            D:
                "nS = nM × λ^(1/3).",

            E:
                "nS = nM."

        },

        resposta: "B",

        comentario:
            "Pela semelhança de Froude, VS/VM = √λ. Como a grandeza característica nD deve acompanhar a escala de velocidade e DS/DM = λ, resulta nS = nM/√λ.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0074
    // COEFICIENTE DE AVANÇO
    // =====================================

    {
        id: "MAN-0074",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Advance Coefficient — J",

        edital:
            "Propulsão — curvas características do propulsor",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Os coeficientes adimensionais de Empuxo (KT) e Torque (KQ) são expressos em função do Coeficiente de Avanço (J). A definição correta de J é:",

        alternativas: {

            A:
                "J = V / (n · D).",

            B:
                "J = VA / (n · D).",

            C:
                "J = n · D / VA.",

            D:
                "J = P / D.",

            E:
                "J = RT / (ρ · n² · D⁴)."

        },

        resposta: "B",

        comentario:
            "O advance coefficient utiliza a velocidade de avanço efetivamente encontrada pelo hélice, VA, e é definido por J = VA/(nD).",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0075
    // SKEW
    // =====================================

    {
        id: "MAN-0075",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Propeller Skew",

        edital:
            "Propulsão — geometria das pás",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre o efeito de Skew, inclinação lateral das pás no plano do disco, assinale a alternativa tecnicamente precisa:",

        alternativas: {

            A:
                "O skew é utilizado primordialmente para aumentar o empuxo máximo do hélice.",

            B:
                "Pás com alto skew tendem a reduzir as flutuações de pressão induzidas pelo hélice no casco, diminuindo vibrações.",

            C:
                "O skew reduz a eficiência do hélice em marcha à ré de forma mais severa que o rake.",

            D:
                "O uso de skew elimina a necessidade de controle do número de Reynolds em modelos.",

            E:
                "Hélices com skew nulo são imunes à cavitação de vórtice de ponta."

        },

        resposta: "B",

        comentario:
            "O skew distribui no tempo a passagem das diferentes regiões da pá através de campos de esteira não uniformes, contribuindo para reduzir pulsações de pressão e vibração.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0076
    // EFICIÊNCIA DE CASCO
    // =====================================

    {
        id: "MAN-0076",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Hull Efficiency",

        edital:
            "Propulsão — interação casco-propulsor",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A Eficiência de Casco (ηH) relaciona a potência efetiva (PE) com a potência de empuxo (PT). É correto afirmar que:",

        alternativas: {

            A:
                "ηH = (1 - w) / (1 - t).",

            B:
                "A eficiência de casco é sempre menor que a unidade devido às perdas viscosas.",

            C:
                "ηH = (1 - t) / (1 - w), podendo ser maior que 1 devido à recuperação de energia da esteira.",

            D:
                "O coeficiente de dedução de empuxo (t) é sempre igual à fração de esteira (w).",

            E:
                "A eficiência de casco independe da forma da popa do navio."

        },

        resposta: "C",

        comentario:
            "A hull efficiency é dada por ηH = (1-t)/(1-w). Como não representa uma eficiência termodinâmica isolada, seu valor pode ser superior à unidade.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0077
    // FRAÇÃO DE ESTEIRA
    // =====================================

    {
        id: "MAN-0077",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Wake Fraction",

        edital:
            "Propulsão — interação casco-propulsor e esteira",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A fração de esteira de Taylor (w) para um navio de um único eixo é influenciada por três componentes principais. São eles:",

        alternativas: {

            A:
                "Esteira de fricção, esteira de ondas e esteira de corrente.",

            B:
                "Esteira de fricção, esteira potencial (forma) e esteira de ondas.",

            C:
                "Esteira de apêndices, esteira aerodinâmica e esteira de turbulência.",

            D:
                "Esteira nominal, esteira efetiva e esteira de torque.",

            E:
                "Esteira de proa, esteira de ombro e esteira de popa."

        },

        resposta: "B",

        comentario:
            "Na decomposição apresentada, a esteira resulta das contribuições de fricção, efeitos potenciais associados à forma do casco e componentes relacionadas ao sistema de ondas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0078
    // THRUST DEDUCTION
    // =====================================

    {
        id: "MAN-0078",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Thrust Deduction Factor",

        edital:
            "Propulsão — interação casco-propulsor",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O Coeficiente de Dedução de Empuxo (t) representa:",

        alternativas: {

            A:
                "O aumento da resistência do casco devido à sucção do hélice na região da popa.",

            B:
                "A perda de potência mecânica nos mancais de escora.",

            C:
                "A redução da velocidade de avanço devido à viscosidade.",

            D:
                "A diferença entre o passo geométrico e o passo real.",

            E:
                "O efeito da cavitação no torque do motor."

        },

        resposta: "A",

        comentario:
            "A operação do hélice modifica o campo de pressão na popa e aumenta a resistência aparente do casco. Essa interação é representada pelo thrust deduction factor.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0079
    // POTÊNCIA ENTREGUE
    // =====================================

    {
        id: "MAN-0079",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Delivered Power — PD",

        edital:
            "Propulsão — cadeia de potências",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A Potência Entregue ao Propulsor (PD) é definida como:",

        alternativas: {

            A:
                "A potência medida no freio do motor principal (PB).",

            B:
                "A potência útil para vencer a resistência do casco (PE).",

            C:
                "A potência efetivamente aplicada ao hélice, após as perdas de transmissão e mancais.",

            D:
                "O produto da resistência total pela velocidade do navio.",

            E:
                "A potência indicada nos cilindros do motor (PI)."

        },

        resposta: "C",

        comentario:
            "Delivered power é a potência efetivamente disponibilizada ao propulsor depois das perdas existentes entre a máquina e o hélice.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0080
    // ESCORREGAMENTO APARENTE
    // =====================================

    {
        id: "MAN-0080",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Apparent Slip",

        edital:
            "Propulsão — passo, rotação e velocidade",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Durante uma prova de mar, observa-se que o escorregamento aparente (sA) é negativo. Hidrodinamicamente, isso indica que:",

        alternativas: {

            A:
                "O hélice está cavitando severamente.",

            B:
                "O navio está sendo auxiliado por uma corrente favorável ou vento de popa.",

            C:
                "O passo do hélice é insuficiente para a velocidade de serviço.",

            D:
                "Há uma obstrução no fluxo de entrada do propulsor.",

            E:
                "O motor está operando acima da rotação de projeto."

        },

        resposta: "B",

        comentario:
            "O apparent slip pode assumir valor negativo quando a velocidade observada do navio excede a velocidade geométrica correspondente ao produto passo × rotação, situação possível quando há auxílio ambiental.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0081
    // NÚMERO DE CAVITAÇÃO
    // =====================================

    {
        id: "MAN-0081",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Cavitation Number",

        edital:
            "Propulsão — cavitação",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A cavitação ocorre quando a pressão local no fluido cai abaixo da pressão de vapor (pV). O número de cavitação (σ) é inversamente proporcional a:",

        alternativas: {

            A:
                "Velocidade de avanço ao quadrado (V²).",

            B:
                "Pressão estática na profundidade do eixo.",

            C:
                "Diâmetro do hélice.",

            D:
                "Área de superfície molhada.",

            E:
                "Coeficiente de bloco (CB)."

        },

        resposta: "A",

        comentario:
            "O número de cavitação possui pressão dinâmica no denominador, proporcional a ρV²/2. Assim, para as demais grandezas constantes, seu valor diminui com o aumento do quadrado da velocidade.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0082
    // BURRILL
    // =====================================

    {
        id: "MAN-0082",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Burrill Cavitation Diagram",

        edital:
            "Propulsão — cavitação e carregamento das pás",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O diagrama de Burrill é amplamente utilizado na praticagem e engenharia naval para:",

        alternativas: {

            A:
                "Estimar o diâmetro ótimo do hélice.",

            B:
                "Prever a ocorrência de cavitação de dorso com base na carga por unidade de área.",

            C:
                "Calcular a potência efetiva em águas rasas.",

            D:
                "Determinar o ângulo de skew necessário para reduzir vibrações.",

            E:
                "Avaliar a eficiência do leme no rastro do hélice."

        },

        resposta: "B",

        comentario:
            "O diagrama de Burrill relaciona condições de carregamento do propulsor e cavitação, sendo utilizado como método de avaliação da susceptibilidade à cavitação das pás.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0083
    // AZIPOD
    // =====================================

    {
        id: "MAN-0083",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Azipod — operação",

        edital:
            "Propulsão — propulsores azimutais e manobra",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre o sistema de propulsão Azipod, assinale a alternativa correta:",

        alternativas: {

            A:
                "Azipods sempre operam no modo pulling, com hélice à vante do pod, para máxima eficiência.",

            B:
                "No modo bicycle, os pods são colocados em oposição a 90 graus para frenagem súbita.",

            C:
                "O uso de controle por computador (joystick) é recomendado pela boa marinharia durante toda a aproximação do cais até o contato com as defensas.",

            D:
                "A regra de um comprimento de navio sugere mudar do controle automático para o manual ao se aproximar de perigos ou berços.",

            E:
                "Azipods eliminam a necessidade de qualquer interação com rebocadores, independentemente do vento."

        },

        resposta: "D",

        comentario:
            "A orientação operacional fornecida considera prudente a transição para controle manual antes da fase de aproximação próxima a perigos ou ao berço.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0084
    // TIP VORTEX CAVITATION
    // =====================================

    {
        id: "MAN-0084",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Tip Vortex Cavitation",

        edital:
            "Propulsão — tipos de cavitação",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A cavitação por vórtice de ponta (tip vortex cavitation) caracteriza-se por:",

        alternativas: {

            A:
                "Formar-se no bordo de ataque da pá sob altas cargas.",

            B:
                "Ser a forma mais destrutiva de cavitação por erosão.",

            C:
                "Originar-se nas extremidades das pás e estender-se pelo rastro como um filamento espiral.",

            D:
                "Ocorrer apenas em velocidades de avanço nulas (bolardo).",

            E:
                "Ser eliminada pelo uso de proas bulbosas."

        },

        resposta: "C",

        comentario:
            "O tip vortex é gerado pela circulação na extremidade da pá e pode apresentar cavitação na forma de um núcleo espiralado que prossegue para jusante no escoamento.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0085
    // EFICIÊNCIA ROTATIVA RELATIVA
    // =====================================

    {
        id: "MAN-0085",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Relative Rotative Efficiency",

        edital:
            "Propulsão — eficiência propulsiva",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A Eficiência Rotativa Relativa (ηR) é a razão entre a eficiência do hélice operando atrás do casco e sua eficiência em águas abertas. Para navios de um único eixo, seu valor típico é:",

        alternativas: {

            A:
                "Entre 0,50 e 0,60.",

            B:
                "Exatamente 1,00 em todas as condições.",

            C:
                "Geralmente entre 1,00 e 1,07.",

            D:
                "Menor que 0,90 devido à turbulência.",

            E:
                "Independente do Número de Reynolds."

        },

        resposta: "C",

        comentario:
            "Para navios de um único eixo, a eficiência rotativa relativa pode assumir valores ligeiramente superiores à unidade em razão das características do campo de esteira no qual o hélice opera.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0086
    // RIGHT-HAND PROPELLER ASTERN
    // =====================================

    {
        id: "MAN-0086",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Efeito transversal — máquina a ré",

        edital:
            "Propulsão — efeitos operacionais do propulsor",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Um navio equipado com hélice de passo fixo de rotação direita (right-hand) dá marcha à ré. A tendência imediata da proa é:",

        alternativas: {

            A:
                "Cair para boreste.",

            B:
                "Cair para bombordo.",

            C:
                "Manter o rumo devido ao efeito do leme.",

            D:
                "Guinar violentamente para bombordo apenas se o calado for reduzido.",

            E:
                "Subir em relação à linha d'água devido ao squat."

        },

        resposta: "A",

        comentario:
            "No comportamento clássico do right-handed fixed-pitch propeller em máquina a ré, o efeito transversal tende a deslocar a popa para bombordo e, consequentemente, a proa para boreste.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0087
    // CPP
    // =====================================

    {
        id: "MAN-0087",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Controllable Pitch Propeller",

        edital:
            "Propulsão — hélices de passo controlável",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Hélices de passo controlável (CPP) apresentam uma característica peculiar durante a manobra:",

        alternativas: {

            A:
                "O motor deve ser parado e reiniciado para inverter a marcha.",

            B:
                "A rotação do hélice (RPM) geralmente permanece alta e constante, alterando-se apenas o ângulo das pás.",

            C:
                "Eles são mais eficientes em marcha à ré do que os hélices de passo fixo (FPP).",

            D:
                "Não sofrem efeito de corrente de descarga (discharge current) sobre o leme.",

            E:
                "O efeito de guinada para bombordo em marcha à ré é mais pronunciado que no FPP."

        },

        resposta: "B",

        comentario:
            "Uma CPP permite alterar o sentido e a intensidade do empuxo modificando o passo das pás sem necessariamente inverter a rotação do eixo.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0088
    // PILOT CARD
    // =====================================

    {
        id: "MAN-0088",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Pilot Card — dados de máquina",

        edital:
            "Propulsão — informações de manobra disponíveis ao Prático",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Segundo a NORMAM-311 e os princípios de intercâmbio Piloto-Comandante (IMO A.960), o cartão de pilotagem (Pilot Card) deve conter:",

        alternativas: {

            A:
                "A curva ITTC-1957 de fricção do navio.",

            B:
                "A tabela de rotações (RPM) por velocidade para diversas condições de carregamento.",

            C:
                "A pressão de vapor da água do porto.",

            D:
                "O número de Reynolds crítico para o hélice.",

            E:
                "A potência indicada (PI) de cada cilindro."

        },

        resposta: "B",

        comentario:
            "O Pilot Card reúne informações relevantes para a condução segura da manobra, incluindo dados de máquinas e relações entre ordens, rotações e velocidades do navio.",

        bibliografia: [
            {
                publicacao:
                    "IMO Resolution A.960 — Recommendations on Training and Certification and on Operational Procedures for Maritime Pilots",
                capitulo: "",
                pagina: ""
            },
            {
                publicacao:
                    "NORMAM-311",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0089
    // PULLING WATER
    // =====================================

    {
        id: "MAN-0089",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Pulling Water em águas restritas",

        edital:
            "Propulsão — comportamento operacional em canais restritos",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O fenômeno de pulling water, descrito em canais restritos, está associado a:",

        alternativas: {

            A:
                "Um aumento na eficiência do hélice devido ao confinamento.",

            B:
                "Uma redução súbita na resistência residual.",

            C:
                "Um aumento no rastro, vibrações severas e alteração no padrão de ondas na popa.",

            D:
                "Uma melhora na autoridade do leme.",

            E:
                "À estabilização do squat."

        },

        resposta: "C",

        comentario:
            "A expressão operacional pulling water descreve a forte demanda de fluxo ao redor e sob o casco em condições restritas, podendo estar associada a mudanças perceptíveis na esteira, ondas e vibrações.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0090
    // TWIN SCREW
    // =====================================

    {
        id: "MAN-0090",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Twin-Screw Maneuvering",

        edital:
            "Propulsão — manobra com dois eixos",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Em navios de dois eixos (twin-screw), para realizar um giro sobre o próprio eixo para boreste, o Prático deve:",

        alternativas: {

            A:
                "Colocar o motor de boreste à frente e o de bombordo atrás.",

            B:
                "Colocar o motor de bombordo à frente e o de boreste atrás.",

            C:
                "Colocar ambos os motores à frente com leme a bombordo.",

            D:
                "Usar apenas o motor de boreste à ré.",

            E:
                "Aguardar a ação da esteira potencial."

        },

        resposta: "B",

        comentario:
            "Com bombordo adiante e boreste atrás, as forças longitudinais opostas produzem um momento de guinada para boreste com reduzido avanço longitudinal resultante.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0091
    // ADVANCE VELOCITY
    // =====================================

    {
        id: "MAN-0091",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Advance Velocity and Wake",

        edital:
            "Propulsão — wake fraction",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "The advance velocity (VA) of a propeller is usually lower than the ship's speed (V) due to the wake effect. The relationship is expressed as:",

        alternativas: {

            A:
                "VA = V(1 + w).",

            B:
                "VA = V / (1 - w).",

            C:
                "VA = V(1 - w).",

            D:
                "VA = V · t.",

            E:
                "VA = V · ηH."

        },

        resposta: "C",

        comentario:
            "Using the Taylor wake fraction, the effective advance velocity at the propeller is VA = V(1-w).",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0092
    // CAVITATION INCEPTION
    // =====================================

    {
        id: "MAN-0092",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Cavitation Inception",

        edital:
            "Propulsão — cavitação",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Which of the following describes the cavitation inception?",

        alternativas: {

            A:
                "The moment when bubbles collapse on the blade's leading edge.",

            B:
                "The condition where the local pressure equals the fluid's vapor pressure.",

            C:
                "The increase in noise and vibration due to flow separation.",

            D:
                "The point where thrust breakdown occurs.",

            E:
                "The maximum speed a ship can achieve without wave making."

        },

        resposta: "B",

        comentario:
            "Cavitation inception occurs when the local pressure reaches the vapor-pressure condition and vapor cavities begin to form.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0093
    // CPP — ENGLISH
    // =====================================

    {
        id: "MAN-0093",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Controllable Pitch Propeller",

        edital:
            "Propulsão — CPP",

        dificuldade: "facil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "In Controllable Pitch Propeller (CPP) vessels, the propeller blades:",

        alternativas: {

            A:
                "Are welded to the hub to prevent vibration.",

            B:
                "Can be rotated to change the pitch angle without reversing the shaft rotation.",

            C:
                "Must always be stopped before engaging a tug.",

            D:
                "Are designed to eliminate the thrust deduction factor.",

            E:
                "Operate exclusively under laminar flow conditions."

        },

        resposta: "B",

        comentario:
            "A CPP changes thrust by rotating the blades about their own axes, allowing pitch reversal without reversing the normal direction of shaft rotation.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0094
    // PROPELLER WASH
    // =====================================

    {
        id: "MAN-0094",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Propeller Wash / Quickwater",

        edital:
            "Propulsão — aplicação operacional",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "The term propeller wash (or quickwater) is operationally used by pilots to:",

        alternativas: {

            A:
                "Measure the ship's draft in real-time.",

            B:
                "Estimate speed through the water when electronic logs are unavailable.",

            C:
                "Reduce the impact of bank suction.",

            D:
                "Clean the hull's surface from biofouling.",

            E:
                "Signal the engine room to increase fuel consumption."

        },

        resposta: "B",

        comentario:
            "Observation of propeller wash or quickwater relative to the ship may provide an operational indication of movement through the surrounding water.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0095
    // RIGHT-HAND PROPELLER AHEAD
    // =====================================

    {
        id: "MAN-0095",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Transverse Thrust — Ahead",

        edital:
            "Propulsão — efeito transversal do hélice",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A right-handed fixed pitch propeller moving ahead creates a transverse force (paddle wheel effect) that tends to:",

        alternativas: {

            A:
                "Push the stern to starboard and the bow to port.",

            B:
                "Push the stern to port and the bow to starboard.",

            C:
                "Sink the bow deeper into the water.",

            D:
                "Increase the hull's resistance by 20%.",

            E:
                "Cancel the rudder's effectiveness."

        },

        resposta: "A",

        comentario:
            "For the conventional right-handed fixed-pitch propeller behavior stated in the source material, the transverse effect ahead tends to move the stern to starboard and the bow to port.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0096
    // PROPELLER LOADING
    // =====================================

    {
        id: "MAN-0096",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Propeller Loading Coefficient",

        edital:
            "Propulsão — teoria do propulsor",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "O coeficiente de carga do hélice (CTh), definido por T / (0,5 · ρ · A0 · VA²), é um indicador de:",

        alternativas: {

            A:
                "Eficiência mecânica dos eixos.",

            B:
                "Grau de carregamento do disco; quanto maior o CTh, menor a eficiência ideal do hélice.",

            C:
                "Espessura da camada limite na popa.",

            D:
                "Ângulo de rake necessário.",

            E:
                "Rugosidade das pás."

        },

        resposta: "B",

        comentario:
            "O thrust loading coefficient representa a intensidade com que o disco propulsor está carregado. Em teoria ideal, cargas de disco mais elevadas exigem maior aceleração do escoamento e estão associadas a menor eficiência propulsiva ideal.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0097
    // CIRCULATION THEORY
    // =====================================

    {
        id: "MAN-0097",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Circulation / Lifting-Line Theory",

        edital:
            "Propulsão — teorias do propulsor",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A teoria de Circulação, ou teoria de linha sustentadora, aplicada a hélices:",

        alternativas: {

            A:
                "Considera o hélice como um disco atuador que gera saltos de pressão.",

            B:
                "Baseia-se na lei de Kutta-Joukowski para calcular a portância em seções de pás como aerofólios.",

            C:
                "Ignora os efeitos da viscosidade e da esteira.",

            D:
                "É utilizada apenas para propulsores Voith-Schneider.",

            E:
                "Assume que o fluido é compressível."

        },

        resposta: "B",

        comentario:
            "A lifting-line ou circulation theory representa as pás por elementos sustentadores e utiliza os conceitos de circulação e a relação de Kutta-Joukowski para determinar forças hidrodinâmicas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0098
    // REBOCADORES E PROPULSÃO
    // =====================================

    {
        id: "MAN-0098",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Propulsor, leme e assistência de rebocadores",

        edital:
            "Propulsão — aplicação operacional em manobra",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Sobre o uso de rebocadores em conjunto com propulsores, a marinharia profissional dita que:",

        alternativas: {

            A:
                "Rebocadores devem ser mantidos em cabos curtos quando o hélice estiver em A Toda Força para evitar o rastro.",

            B:
                "O uso do hélice à frente melhora a eficácia do leme, auxiliando o trabalho dos rebocadores na proa.",

            C:
                "Rebocadores de popa nunca devem trabalhar no rastro do hélice do navio.",

            D:
                "A potência do hélice deve ser sempre superior à soma das forças dos rebocadores.",

            E:
                "O Prático deve ignorar o escoamento do propulsor ao dar ordens aos rebocadores."

        },

        resposta: "B",

        comentario:
            "Uma aplicação de máquina à frente aumenta o fluxo sobre o leme, podendo elevar significativamente a força lateral produzida por ele e complementar as forças fornecidas pelos rebocadores durante a manobra.",

        bibliografia: [
            {
                publicacao:
                    "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0099
    // SHAFT POWER
    // =====================================

    {
        id: "MAN-0099",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Shaft Power",

        edital:
            "Propulsão — medição de potência",

        dificuldade: "media",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "A Potência de Eixo (PS) é medida:",

        alternativas: {

            A:
                "No acoplamento do motor.",

            B:
                "Através de um torcímetro localizado no eixo o mais próximo possível do hélice.",

            C:
                "Pela pressão média indicada nos cilindros.",

            D:
                "Somando-se a resistência friccional ao empuxo.",

            E:
                "Pela velocidade de rotação do hélice no vácuo."

        },

        resposta: "B",

        comentario:
            "A potência transmitida pelo eixo é determinada a partir do torque e da velocidade angular, sendo o torque medido por instrumentação instalada na linha de eixo.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0100
    // RECUPERAÇÃO DE ENERGIA ROTACIONAL
    // =====================================

    {
        id: "MAN-0100",

        disciplina: "manobrabilidade",

        assunto: "Propulsão",

        topico: "Energy Recovery — Rudder",

        edital:
            "Propulsão — interação hélice-leme",

        dificuldade: "dificil",

        tipo: "multipla-escolha",

        origem: "banco",

        enunciado:
            "Qual apêndice de popa é frequentemente projetado para recuperar parte da energia rotacional deixada pelo hélice na esteira?",

        alternativas: {

            A:
                "Quilha de balanço.",

            B:
                "Leme, especialmente rudders tipo twisted ou com características de recuperação de energia.",

            C:
                "Bossagens de eixo.",

            D:
                "Anodos de sacrifício.",

            E:
                "Pés de galinha em V."

        },

        resposta: "B",

        comentario:
            "O leme situado diretamente no escoamento do propulsor pode ser projetado para aproveitar parte da componente rotacional da esteira, convertendo-a em força útil e reduzindo perdas energéticas.",

        bibliografia: [
            {
                publicacao:
                    "Principles of Naval Architecture — Volume II",
                capitulo: "",
                pagina: ""
            }
        ]
    }
    // =====================================
    // MAN-0101
    // VELOCIDADE NO LEME
    // =====================================

    {
        id: "MAN-0101",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Propeller Race e velocidade no leme",
        edital: "Lemes — interação hélice-leme",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "De acordo com os princípios de escoamento em apêndices, o leme operando no rastro (race) de um hélice em carga experimenta uma velocidade de fluxo (VR) que é, tipicamente:",

        alternativas: {
            A: "10% menor que a velocidade do navio devido ao efeito de esteira (wake).",
            B: "Igual à velocidade do navio no fundo (SOG).",
            C: "Aproximadamente 10% maior que a velocidade do navio devido à aceleração do fluxo pelo hélice.",
            D: "Independente da carga do hélice, baseando-se apenas no Número de Froude.",
            E: "Reduzida à metade quando o navio inicia uma guinada brusca."
        },

        resposta: "C",

        comentario:
            "A descarga do hélice acelera o escoamento que incide sobre o leme, aumentando a velocidade efetiva local e, consequentemente, a força hidrodinâmica disponível. O valor numérico aproximado indicado nesta questão deverá ser confrontado posteriormente com a referência específica utilizada.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            },
            {
                publicacao: "Practical Ship Hydrodynamics",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0102
    // TRIM E ESTABILIDADE DIRECIONAL
    // =====================================

    {
        id: "MAN-0102",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Trim e estabilidade direcional",
        edital: "Lemes — estabilidade direcional e governo",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Sobre a estabilidade direcional e o efeito do trim, assinale a alternativa correta:",

        alternativas: {
            A: "Um navio trimado pela proa apresenta maior estabilidade direcional e exige menos leme para manter o rumo.",
            B: "O trim pela popa desloca o centro de pressão hidrodinâmico para vante do centro de gravidade, tornando o navio instável.",
            C: "Navios com grandes coeficientes de bloco (CB) tendem a ser inerentemente estáveis, independentemente do trim.",
            D: "Um navio trimado pela proa torna-se 'cranky' (instável), exigindo grandes ângulos de leme por períodos prolongados para sustar uma guinada.",
            E: "O aumento do calado em águas profundas invariavelmente reduz a autoridade do leme."
        },

        resposta: "D",

        comentario:
            "O trim pela proa pode reduzir a estabilidade direcional e tornar o navio mais suscetível a desenvolver ou manter uma guinada, exigindo maior intervenção do leme para controlar o movimento.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0103
    // PERFIS NACA
    // =====================================

    {
        id: "MAN-0103",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Perfis NACA aplicados a lemes",
        edital: "Lemes — geometria e perfis hidrodinâmicos",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Ao projetar lemes para navios que operam em amplas faixas de ângulos de ataque, como rebocadores e navios de manobra restrita, a série de perfis NACA preferível é:",

        alternativas: {
            A: "Série 63, por possuir o menor arrasto em ângulos de ataque nulos.",
            B: "Série 65, devido à sua cavitação tardia em altas velocidades.",
            C: "Série de 4 dígitos, como NACA 0012, por apresentar elevado coeficiente de sustentação máxima antes do stall.",
            D: "Perfil em cunha, ideal para regimes subcríticos de escoamento.",
            E: "Perfis assimétricos, para compensar o torque do hélice em marchas à ré."
        },

        resposta: "C",

        comentario:
            "Perfis simétricos da série NACA de quatro dígitos são tradicionalmente empregados em aplicações de lemes e apresentam comportamento adequado em uma ampla faixa de ângulos de ataque.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            },
            {
                publicacao: "Principles of Yacht Design — Lars Larsson",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0104
    // STALL
    // =====================================

    {
        id: "MAN-0104",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Stall do leme",
        edital: "Lemes — separação do escoamento e perda de sustentação",
        dificuldade: "facil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O fenômeno de perda súbita de sustentação do leme devido à separação do escoamento no dorso da pá é tecnicamente denominado:",

        alternativas: {
            A: "Cavitação por vórtice de ponta.",
            B: "Ventilação superficial.",
            C: "Stall (Estol).",
            D: "Efeito de escala (Scale effect).",
            E: "Dedução de empuxo (Thrust deduction)."
        },

        resposta: "C",

        comentario:
            "Stall é a perda acentuada de sustentação causada pela separação do escoamento sobre o perfil quando o ângulo de ataque ultrapassa determinada faixa.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0105
    // PILOT CARD
    // =====================================

    {
        id: "MAN-0105",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Pilot Card — sistema de governo",
        edital: "Lemes — informações de manobra",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Segundo a Resolução IMO A.960 e os procedimentos de intercâmbio Piloto-Comandante, as informações sobre o leme contidas no Pilot Card devem incluir:",

        alternativas: {
            A: "O tempo de reversão do motor principal.",
            B: "A pressão máxima de trabalho das bombas da máquina do leme.",
            C: "O tipo de leme e a velocidade de resposta (hard-over to hard-over).",
            D: "O coeficiente de viscosidade cinemática da água de projeto.",
            E: "O diagrama de Burrill para cavitação das pás."
        },

        resposta: "C",

        comentario:
            "O Pilot Card deve fornecer ao Prático informações relevantes sobre as características de manobra e governo do navio. A atribuição normativa específica desta formulação será objeto de conferência direta na documentação IMO aplicável.",

        bibliografia: [
            {
                publicacao: "IMO Resolution A.960",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0106
    // BALANCED SPADE RUDDER
    // =====================================

    {
        id: "MAN-0106",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Balanced Spade Rudder",
        edital: "Lemes — tipos e limitações operacionais",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Em navios equipados com lemes compensados (balanced spade rudders), o Prático deve estar alerta para o fato de que:",

        alternativas: {
            A: "Eles são imunes ao stall em grandes ângulos de leme.",
            B: "O uso de ângulos superiores a 35° pode causar turbulência severa e perda de eficácia de governo.",
            C: "A compensação elimina a necessidade de energia na máquina do leme.",
            D: "Eles aumentam a estabilidade direcional de navios trimados pela proa.",
            E: "O centro de pressão desses lemes situa-se sempre à ré da madre."
        },

        resposta: "B",

        comentario:
            "Ângulos muito elevados podem provocar separação significativa do escoamento e reduzir o ganho adicional de força lateral, podendo ocorrer stall dependendo do perfil e das condições de escoamento.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0107
    // INDUCED RESISTANCE
    // =====================================

    {
        id: "MAN-0107",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Induced Resistance",
        edital: "Lemes — sustentação e resistência induzida",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A resistência induzida (induced resistance) em um leme ocorre devido:",

        alternativas: {
            A: "Ao atrito tangencial da água com a superfície da pá.",
            B: "À geração de sustentação (lift) que produz vórtices de extremidade.",
            C: "À rugosidade excessiva causada por incrustações.",
            D: "À diferença de temperatura entre as faces do leme.",
            E: "Exclusivamente ao impacto frontal da água na madre."
        },

        resposta: "B",

        comentario:
            "A diferença de pressão necessária à produção de lift gera escoamento tridimensional nas extremidades do leme e vórtices de ponta, produzindo resistência induzida.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0108
    // TWIN-SCREW / SINGLE RUDDER
    // =====================================

    {
        id: "MAN-0108",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Twin-Screw com leme central",
        edital: "Lemes — governo em baixa velocidade",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Um navio de dois eixos e um único leme central (twin-screw, single rudder) navega a velocidades muito baixas. Para melhorar a autoridade do leme sem ganhar excessivo seguimento, a técnica recomendada é:",

        alternativas: {
            A: "Manter ambos os motores à frente em RPM constante.",
            B: "Parar os motores e permitir que o fluxo natural da esteira atue no leme.",
            C: "Dar kicks de máquina à frente, utilizando apenas o motor de bombordo para guinar para boreste.",
            D: "Usar o motor de boreste à ré e o de bombordo à frente, mantendo o leme a meio.",
            E: "Reduzir o ângulo de leme para evitar o efeito de ventilação."
        },

        resposta: "B",

        comentario:
            "Gabarito mantido conforme o conjunto fornecido. Esta questão deverá ser confrontada diretamente com o trecho correspondente de Shiphandling for the Mariner, pois sua aplicação depende fortemente da configuração geométrica dos hélices em relação ao leme central.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0109
    // ÁGUAS RASAS
    // =====================================

    {
        id: "MAN-0109",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Governo em águas rasas",
        edital: "Lemes — influência da profundidade",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Sobre o efeito de águas rasas (shallow water) no governo, assinale a alternativa tecnicamente correta:",

        alternativas: {
            A: "O navio torna-se sempre mais instável e difícil de controlar.",
            B: "O raio de giro diminui significativamente devido ao efeito Bernoulli.",
            C: "A estabilidade direcional melhora, mas o raio de giro pode aumentar significativamente em relação ao valor em águas profundas.",
            D: "O leme perde eficácia total quando a folga abaixo da quilha (UKC) é menor que 10%.",
            E: "O efeito de smelling the bottom impede qualquer resposta ao leme."
        },

        resposta: "C",

        comentario:
            "A restrição vertical do escoamento tende a aumentar a estabilidade direcional do casco, fazendo-o resistir mais à mudança de rumo. Consequentemente, a resposta de giro pode tornar-se mais lenta e o diâmetro de giro aumentar.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0110
    // ASPECT RATIO
    // =====================================

    {
        id: "MAN-0110",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Aspect Ratio",
        edital: "Lemes — geometria e eficiência",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A teoria de linha sustentadora (lifting line theory) aplicada ao leme demonstra que o aumento da razão de aspecto (aspect ratio) resulta em:",

        alternativas: {
            A: "Maior arrasto induzido para a mesma sustentação.",
            B: "Redução da inclinação da curva de sustentação.",
            C: "Aumento da sustentação para um mesmo ângulo de ataque, melhorando a eficiência do leme.",
            D: "Antecipação do stall para ângulos menores de 5°.",
            E: "Eliminação da camada limite viscosa."
        },

        resposta: "C",

        comentario:
            "Uma maior aspect ratio reduz relativamente os efeitos tridimensionais de extremidade, elevando a eficiência hidrodinâmica do leme e reduzindo a componente induzida para condições comparáveis.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0111
    // QUICKWATER
    // =====================================

    {
        id: "MAN-0111",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Quickwater em seguimento a ré",
        edital: "Lemes — efeitos operacionais do propulsor",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "According to Shiphandling for the Mariner, when a ship is going astern and moving at approximately 2 knots, the propeller wash (quickwater) typically starts to:",

        alternativas: {
            A: "Stay far behind the transom.",
            B: "Move up the starboard side of the ship.",
            C: "Reach the bow area immediately.",
            D: "Create a vacuum that improves rudder effectiveness.",
            E: "Disappear due to the wake fraction."
        },

        resposta: "B",

        comentario:
            "According to the operational description supplied, the quickwater becomes visible moving forward along the starboard side as the vessel develops sternway.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0112
    // NEGATIVE DIRECTIONAL STABILITY
    // =====================================

    {
        id: "MAN-0112",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Negative Directional Stability",
        edital: "Lemes — estabilidade direcional",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A ship with negative directional stability is characterized by:",

        alternativas: {
            A: "Returning to its original heading when the rudder is put amidships.",
            B: "Increasing its rate of turn even after the rudder is returned to the midship position.",
            C: "Having the net pressure point located well aft of the center of gravity.",
            D: "Being unaffected by changes in trim or draft.",
            E: "Requiring smaller rudder angles than a stable ship to check a swing."
        },

        resposta: "B",

        comentario:
            "A directionally unstable ship tends to continue or develop the yawing motion after the control input is removed, requiring corrective rudder to check the swing.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0113
    // RUDDER LIFT
    // =====================================

    {
        id: "MAN-0113",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Rudder Lift",
        edital: "Lemes — geração de força lateral",
        dificuldade: "facil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "The lifting effect of a rudder is primarily a result of:",

        alternativas: {
            A: "Tangential shear stresses on the blade surface.",
            B: "Pressure differences between the leeward (low pressure) and windward (high pressure) sides.",
            C: "The weight of the rudder acting against the water density.",
            D: "Air bubbles trapped in the boundary layer.",
            E: "The rotation of the propeller shaft itself."
        },

        resposta: "B",

        comentario:
            "The dominant lateral force is generated by the pressure difference between the two sides of the hydrodynamic profile.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0114
    // BANK EFFECT
    // =====================================

    {
        id: "MAN-0114",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Bank Cushion e Bank Suction",
        edital: "Lemes — governo em canais estreitos",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "When maneuvering in a narrow channel with a bank on the starboard side, the combination of bank suction on the quarter and bank cushion on the bow tends to:",

        alternativas: {
            A: "Push the ship bodily away from the bank.",
            B: "Sheer the ship's bow toward the bank.",
            C: "Sheer the ship's bow away from the bank and pull the stern toward it.",
            D: "Increase the speed through the water by 20%.",
            E: "Neutralize the rudder's authority completely."
        },

        resposta: "C",

        comentario:
            "Bank cushion tends to repel the bow from the nearby bank, while bank suction draws the stern or quarter toward the bank, producing a yawing moment away from it.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0115
    // MASTER/PILOT EXCHANGE
    // =====================================

    {
        id: "MAN-0115",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Master/Pilot Exchange",
        edital: "Lemes — informações de manobra",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "IMO Resolution A.960 states that the Master/Pilot Exchange should include a review of the Pilot Card, which must contain:",

        alternativas: {
            A: "The ship's current fuel consumption.",
            B: "Maneuvering characteristics such as turning circles and stopping distances.",
            C: "The names of all engine room staff.",
            D: "The history of previous port calls.",
            E: "The specific gravity of the hull's steel."
        },

        resposta: "B",

        comentario:
            "The Master/Pilot information exchange must provide the pilot with relevant information concerning the ship's maneuvering characteristics and limitations.",

        bibliografia: [
            {
                publicacao: "IMO Resolution A.960",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0116
    // VISCOSIDADE E STALL
    // =====================================

    {
        id: "MAN-0116",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Coeficiente de sustentação e stall",
        edital: "Lemes — comportamento hidrodinâmico",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O coeficiente de sustentação (CL) de um leme em escoamento ideal é uma função linear do ângulo de ataque (α). No entanto, em um fluido real, a viscosidade causa:",

        alternativas: {
            A: "O aumento infinito do CL.",
            B: "A redução da inclinação da curva de sustentação e a ocorrência do stall em ângulos elevados.",
            C: "A inversão da força de sustentação para ângulos maiores que 10°.",
            D: "O desaparecimento da resistência induzida.",
            E: "O deslocamento do centro de pressão para o bordo de ataque."
        },

        resposta: "B",

        comentario:
            "Os efeitos viscosos limitam a resposta real do perfil. Em ângulos elevados ocorre separação do escoamento, culminando no stall e na redução do lift.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0117
    // CRABBING
    // =====================================

    {
        id: "MAN-0117",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Twin-Rudder Crabbing",
        edital: "Lemes — aplicações especiais de governo",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Navios de passageiros modernos com dois eixos e dois lemes (twin-rudder) podem realizar manobras laterais sem auxílio de rebocadores ao:",

        alternativas: {
            A: "Colocar ambos os motores à frente e leme a meio.",
            B: "Usar um motor à frente e outro atrás, com os lemes em ângulos adequados para produzir forças laterais resultantes (crabbing).",
            C: "Manter os lemes sempre em ângulos menores que 5°.",
            D: "Desligar o sistema de automação e usar apenas o leme manual de emergência.",
            E: "Esperar a ação do vento para empurrar o navio lateralmente."
        },

        resposta: "B",

        comentario:
            "Em determinadas configurações twin-screw/twin-rudder, a combinação coordenada de empuxos longitudinais opostos e forças laterais dos lemes permite produzir uma resultante predominantemente transversal.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0118
    // STEERING GEAR — 28 s
    // =====================================

    {
        id: "MAN-0118",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Desempenho da máquina do leme",
        edital: "Lemes — sistema de governo e requisitos de desempenho",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "De acordo com os requisitos internacionais aplicáveis ao sistema principal de governo, a máquina do leme deve ser capaz de levar o leme de 35° de um bordo a 30° do outro bordo, nas condições especificadas pela norma, em no máximo:",

        alternativas: {
            A: "15 segundos.",
            B: "28 segundos.",
            C: "45 segundos.",
            D: "60 segundos.",
            E: "10 segundos."
        },

        resposta: "B",

        comentario:
            "O requisito clássico do SOLAS para o sistema principal de governo estabelece o movimento de 35° de um bordo para 30° do outro em até 28 segundos, nas condições de carregamento e velocidade determinadas pela regra.",

        bibliografia: [
            {
                publicacao: "SOLAS",
                capitulo: "Chapter II-1 — Steering Gear",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0119
    // SKEG
    // =====================================

    {
        id: "MAN-0119",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Skeg",
        edital: "Lemes — apêndices de estabilidade direcional",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O uso de skeg à vante do leme tem como principal objetivo:",

        alternativas: {
            A: "Reduzir o arrasto friccional do casco.",
            B: "Aumentar a estabilidade direcional do navio e proporcionar suporte ou proteção estrutural na região do leme.",
            C: "Facilitar a ventilação das pás do hélice.",
            D: "Substituir a necessidade de máquina do leme.",
            E: "Aumentar a velocidade crítica em águas rasas."
        },

        resposta: "B",

        comentario:
            "O skeg atua como uma superfície vertical fixa que contribui para a estabilidade direcional e pode desempenhar funções estruturais e de proteção na região de popa.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0120
    // ENGINE KICK
    // =====================================

    {
        id: "MAN-0120",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Engine Kick e autoridade do leme",
        edital: "Lemes — governo em baixa velocidade",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Durante uma manobra de backing and filling, o Prático nota que a eficácia do leme diminui à medida que o navio perde seguimento à vante. Para recuperar o swing sem ganhar muita velocidade à vante, ele deve:",

        alternativas: {
            A: "Manter o motor em Slow Ahead continuamente.",
            B: "Usar o motor em Half Astern com o leme para o bordo oposto.",
            C: "Dar um kick de máquina à frente com leme todo carregado e, assim que o swing for restabelecido, reduzir ou parar o motor.",
            D: "Aumentar o calado de vante via tanques de lastro.",
            E: "Solicitar que o rebocador empurre a proa na direção oposta ao giro."
        },

        resposta: "C",

        comentario:
            "Um curto engine kick à frente aumenta rapidamente o propeller race sobre o leme e produz força lateral elevada sem necessariamente permitir que o navio desenvolva grande seguimento à vante.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0121
    // CENTRO DE PRESSÃO
    // =====================================

    {
        id: "MAN-0121",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Centro de pressão",
        edital: "Lemes — forças e momentos hidrodinâmicos",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O centro aerodinâmico de um perfil simétrico convencional em regime subcrítico situa-se aproximadamente a qual distância do bordo de ataque?",

        alternativas: {
            A: "50% da corda.",
            B: "100% da corda, no bordo de fuga.",
            C: "25% da corda.",
            D: "Na linha da madre, independentemente do formato.",
            E: "No topo da pá, próximo à superfície livre."
        },

        resposta: "C",

        comentario:
            "Para perfis convencionais em escoamento subsônico ou incompressível, o centro aerodinâmico situa-se aproximadamente a um quarto da corda. Deve-se distinguir esse conceito da posição variável do centro de pressão.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0122
    // RUDDER BALANCE
    // =====================================

    {
        id: "MAN-0122",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Rudder Balance",
        edital: "Lemes — lemes compensados",
        dificuldade: "facil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A compensação de um leme (rudder balance) refere-se a:",

        alternativas: {
            A: "O uso de pesos de chumbo para equilibrar o leme estaticamente.",
            B: "A área da pá situada à vante da madre, visando reduzir o torque necessário para girar o leme.",
            C: "O alinhamento do leme com o plano de simetria do hélice.",
            D: "A correção do erro de agulha magnética pelo timoneiro.",
            E: "O aumento da área do leme para compensar o trim pela proa."
        },

        resposta: "B",

        comentario:
            "Ao posicionar parte da área do leme à vante do eixo de rotação, parte do momento hidrodinâmico atua no sentido de reduzir o torque requerido da máquina do leme.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0123
    // LEME COM MÁQUINA A RÉ
    // =====================================

    {
        id: "MAN-0123",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Eficácia do leme com máquina a ré",
        edital: "Lemes — governo com seguimento a ré",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Qual o efeito do hélice em marcha à ré sobre a eficácia do leme de um navio de um único eixo (single-screw)?",

        alternativas: {
            A: "Aumenta a eficácia devido à aspiração de água.",
            B: "O leme torna-se pouco eficaz até que o navio desenvolva seguimento à ré suficiente, pois a descarga principal do hélice em marcha à ré é dirigida para vante e não incide sobre o leme como ocorre com máquina à frente.",
            C: "O fluxo de descarga do hélice bate no leme e melhora a guinada para boreste.",
            D: "Reduz a resistência de ondas na popa.",
            E: "Estabiliza o navio, eliminando a tendência de girar para bombordo."
        },

        resposta: "B",

        comentario:
            "Com máquina à ré, o propeller race é dirigido para vante. Assim, o leme localizado atrás do hélice deixa de receber a forte descarga que o torna particularmente eficaz quando a máquina está à frente. Sua autoridade cresce novamente quando existe sternway suficiente.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0124
    // VENTILAÇÃO
    // =====================================

    {
        id: "MAN-0124",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Ventilação do leme",
        edital: "Lemes — perda de eficiência",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O fenômeno de ventilação do leme ocorre frequentemente quando:",

        alternativas: {
            A: "O navio navega em águas muito profundas.",
            B: "O leme está operando próximo à superfície livre e aspira ar, reduzindo drasticamente a força lateral.",
            C: "A temperatura da água excede 30°C.",
            D: "O número de Reynolds é inferior a 100.",
            E: "O casco está excessivamente rugoso."
        },

        resposta: "B",

        comentario:
            "Ventilação ocorre quando ar atmosférico alcança a superfície de baixa pressão do apêndice. Ela é distinta de cavitação, que envolve vaporização do próprio líquido.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0125
    // WILLIAMSON TURN
    // =====================================

    {
        id: "MAN-0125",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Williamson Turn",
        edital: "Lemes — aplicação operacional em manobras de emergência",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Em uma manobra de emergência do tipo Williamson Turn, segundo a aplicação específica indicada no material de Shiphandling utilizado na elaboração desta questão, o momento para inverter o leme de hard-over para o bordo oposto em um navio de grande porte e instável ocorre quando a proa variou:",

        alternativas: {
            A: "60° do rumo original.",
            B: "Aproximadamente 35° do rumo original.",
            C: "90° do rumo original.",
            D: "Assim que o objeto cair na água.",
            E: "Somente após o navio parar totalmente o seguimento."
        },

        resposta: "B",

        comentario:
            "Gabarito mantido conforme o material fornecido. Como procedimentos de Williamson Turn podem ser apresentados com referências angulares distintas conforme navio, fonte e técnica empregada, esta questão permanece marcada para conferência textual direta em Shiphandling for the Mariner.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0126
    // FORÇA NORMAL DO LEME
    // =====================================

    {
        id: "MAN-0126",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Normal Force",
        edital: "Lemes — força hidrodinâmica",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A força total exercida sobre o leme (Normal Force) é proporcional a:",

        alternativas: {
            A: "Velocidade do fluxo ao cubo (V³).",
            B: "Logaritmo da área da pá.",
            C: "Quadrado da velocidade do fluxo (V²) e à área da pá.",
            D: "Raiz quadrada do Número de Froude.",
            E: "Apenas ao ângulo de inclinação do navio (Heel)."
        },

        resposta: "C",

        comentario:
            "As forças hidrodinâmicas sobre o leme seguem a forma geral F = 0,5·ρ·S·V²·C. Portanto, para coeficiente e densidade dados, a força varia com a área e com o quadrado da velocidade incidente.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0127
    // SCHILLING / FLAP RUDDER
    // =====================================

    {
        id: "MAN-0127",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Schilling e Flap Rudders",
        edital: "Lemes — lemes de alta sustentação",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "O uso de lemes do tipo Schilling ou com flap, como o Becker, permite:",

        alternativas: {
            A: "Operar apenas em velocidades superiores a 20 nós.",
            B: "Gerar grandes forças laterais mesmo em ângulos de ataque nulos.",
            C: "Obter maior deflexão efetiva do escoamento e elevada sustentação em baixas velocidades, facilitando manobras em portos.",
            D: "Reduzir a resistência viscosa do casco para zero.",
            E: "Dispensar o uso de motores propulsores."
        },

        resposta: "C",

        comentario:
            "Lemes de alta sustentação utilizam geometrias especiais ou flaps para produzir maior deflexão do escoamento e forças laterais elevadas, sendo particularmente úteis em operações de baixa velocidade.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            },
            {
                publicacao: "Tug Use in Port",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0128
    // CPP E LEME
    // =====================================

    {
        id: "MAN-0128",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "CPP e eficácia do leme",
        edital: "Lemes — interação entre sistema propulsivo e governo",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Qual a influência do hélice de passo controlável (CPP) na manobra com leme, comparado ao hélice de passo fixo (FPP)?",

        alternativas: {
            A: "O CPP é necessariamente mais previsível em marcha à ré.",
            B: "O CPP pode manter elevada rotação do propulsor mesmo com pequeno ou nulo empuxo longitudinal, modificando significativamente o escoamento na região do leme.",
            C: "O CPP exige que o motor pare para inverter a rotação.",
            D: "O leme perde toda a eficácia no CPP quando em passo zero.",
            E: "Não há diferença técnica entre os dois sistemas para o Prático."
        },

        resposta: "B",

        comentario:
            "Nos sistemas CPP, a rotação do eixo pode permanecer elevada enquanto o empuxo é controlado pelo passo. Isso cria condições de escoamento na popa diferentes das de um FPP e exige atenção do Prático à interação hélice-leme.",

        bibliografia: [
            {
                publicacao: "Shiphandling for the Mariner — 5th Edition",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0129
    // CAMADA LIMITE DO LEME
    // =====================================

    {
        id: "MAN-0129",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Boundary Layer e separação",
        edital: "Lemes — escoamento viscoso sobre a pá",
        dificuldade: "media",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "A espessura da camada limite sobre a pá do leme afeta:",

        alternativas: {
            A: "Apenas a cor do leme.",
            B: "A pressão estática interna da madre.",
            C: "O arrasto friccional e o comportamento de separação do escoamento, influenciando o ângulo de stall.",
            D: "O Número de Weber da carena.",
            E: "A profundidade crítica da onda."
        },

        resposta: "C",

        comentario:
            "A evolução da boundary layer afeta tanto o cisalhamento superficial quanto a capacidade do escoamento de permanecer aderido ao perfil. A separação da camada limite está diretamente relacionada ao stall.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            }
        ]
    },


    // =====================================
    // MAN-0130
    // LOW ASPECT RATIO / SHALLOW WATER
    // =====================================

    {
        id: "MAN-0130",
        disciplina: "manobrabilidade",
        assunto: "Lemes",
        topico: "Razão de aspecto e águas rasas",
        edital: "Lemes — geometria aplicada a restrições de calado",
        dificuldade: "dificil",
        tipo: "multipla-escolha",
        origem: "banco",

        enunciado:
            "Um leme com baixa razão de aspecto, curto e largo, pode ser utilizado em navios com forte restrição de calado porque:",

        alternativas: {
            A: "Permite limitar a profundidade física do leme e, segundo a abordagem indicada na fonte utilizada para esta questão, a proximidade de superfícies adjacentes pode modificar os efeitos de extremidade.",
            B: "Reduz a resistência de ondas a zero.",
            C: "Aumenta necessariamente a velocidade de serviço do navio.",
            D: "Elimina a esteira potencial.",
            E: "Sua única vantagem é ser mais barato de fabricar."
        },

        resposta: "A",

        comentario:
            "A limitação de profundidade disponível condiciona o span do leme. O argumento específico de mirror-image effect apresentado no material fornecido deverá ser confrontado diretamente com PNA/Larsson antes de esta questão receber status de validação bibliográfica definitiva.",

        bibliografia: [
            {
                publicacao: "Principles of Naval Architecture",
                capitulo: "",
                pagina: ""
            },
            {
                publicacao: "Principles of Yacht Design — Lars Larsson",
                capitulo: "",
                pagina: ""
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
