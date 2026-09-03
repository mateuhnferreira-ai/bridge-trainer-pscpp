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
