// =====================================
// MOTOR DE SIMULADOS PSCPP v1.2
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Preparar simulados personalizados
// 2. Reunir questões das disciplinas
// 3. Eliminar questões duplicadas
// 4. Distribuir questões entre disciplinas
// 5. Aplicar peso histórico das provas anteriores
// 6. Aplicar peso histórico por assunto
// 7. Embaralhar simulados personalizados
// 8. Carregar provas anteriores
// 9. Preservar a ordem original das provas
//
// =====================================
//
// ESTRATÉGIA DO SIMULADO PERSONALIZADO:
//
// Disciplinas selecionadas
//        ↓
// Bancos individuais
//        ↓
// Frequência histórica nas provas
//        ↓
// Distribuição proporcional
//        ↓
// Peso histórico dos assuntos
//        ↓
// Sorteio sem repetição
//        ↓
// Redistribuição de vagas excedentes
//        ↓
// Embaralhamento final
//
// =====================================
//
// IMPORTANTE:
//
// O peso histórico NÃO representa peso oficial
// atribuído pela DPC.
//
// Trata-se de um índice estratégico calculado
// a partir da frequência observada nas provas
// anteriores cadastradas no aplicativo.
//
// =====================================


// =====================================
// ESTADO DO SIMULADO
// =====================================

let simuladoAtualPSCPP = {

    configuracao: null,

    questoes: [],

    iniciado: false,

    finalizado: false,

    provaAnterior: null,

    distribuicao: null

};


// =====================================
// CONFIGURAÇÃO DOS PESOS
// =====================================
//
// PESO_BASE_DISCIPLINA:
//
// Garante que uma disciplina selecionada
// continue tendo possibilidade de participação
// mesmo se ainda não aparecer nas provas
// históricas atualmente carregadas.
//
// PESO_BASE_ASSUNTO:
//
// Impede que assuntos sem ocorrência histórica
// tenham probabilidade zero.
//
// =====================================

const PESO_BASE_DISCIPLINA_PSCPP = 1;

const PESO_BASE_ASSUNTO_PSCPP = 1;


// =====================================
// NORMALIZAR TEXTO
// =====================================

function normalizarTextoMotorPSCPP(texto) {

    if (!texto) {

        return "";

    }


    return texto

        .toString()

        .trim()

        .toLowerCase()

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


// =====================================
// EMBARALHAR QUESTÕES
// =====================================

function embaralharQuestoesPSCPP(lista) {

    const copia = [...lista];


    for (

        let i = copia.length - 1;

        i > 0;

        i--

    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );


        const temporario = copia[i];

        copia[i] = copia[j];

        copia[j] = temporario;

    }


    return copia;

}


// =====================================
// OBTER QUESTÕES POR DISCIPLINA
// =====================================

function obterQuestoesPorDisciplinaPSCPP(
    disciplinaId
) {

    switch (disciplinaId) {


        case "arte-naval":

            if (
                typeof obterQuestoesArteNavalPSCPP ===
                "function"
            ) {

                return obterQuestoesArteNavalPSCPP();

            }

            break;


        case "manobrabilidade":

            if (
                typeof obterQuestoesManobrabilidadePSCPP ===
                "function"
            ) {

                return obterQuestoesManobrabilidadePSCPP();

            }

            break;


        case "conhecimentos-gerais":

            if (
                typeof obterQuestoesConhecimentosGeraisPSCPP ===
                "function"
            ) {

                return obterQuestoesConhecimentosGeraisPSCPP();

            }

            break;


        case "regulamentacao":

            if (
                typeof obterQuestoesRegulamentacaoPSCPP ===
                "function"
            ) {

                return obterQuestoesRegulamentacaoPSCPP();

            }

            break;


        case "meteorologia":

            if (
                typeof obterQuestoesMeteorologiaPSCPP ===
                "function"
            ) {

                return obterQuestoesMeteorologiaPSCPP();

            }

            break;


        case "navegacao":

            if (
                typeof obterQuestoesNavegacaoPSCPP ===
                "function"
            ) {

                return obterQuestoesNavegacaoPSCPP();

            }

            break;

    }


    return [];

}


// =====================================
// REUNIR QUESTÕES DAS DISCIPLINAS
// =====================================

function reunirQuestoesDisciplinasPSCPP(
    disciplinas
) {

    let banco = [];


    if (!Array.isArray(disciplinas)) {

        return banco;

    }


    disciplinas.forEach(

        function(disciplinaId) {

            const questoes =
                obterQuestoesPorDisciplinaPSCPP(
                    disciplinaId
                );


            banco = banco.concat(
                questoes
            );

        }

    );


    return banco;

}


// =====================================
// REMOVER QUESTÕES DUPLICADAS
// =====================================

function removerQuestoesDuplicadasPSCPP(
    questoes
) {

    const mapa = new Map();


    questoes.forEach(

        function(questao) {

            if (
                !questao ||
                !questao.id
            ) {

                return;

            }


            if (
                !mapa.has(
                    questao.id
                )
            ) {

                mapa.set(
                    questao.id,
                    questao
                );

            }

        }

    );


    return Array.from(
        mapa.values()
    );

}


// =====================================
// OBTER TODAS AS QUESTÕES HISTÓRICAS
// DAS PROVAS ANTERIORES CARREGADAS
// =====================================
//
// Conforme novas provas sejam adicionadas,
// basta que seus getters existam.
//
// O motor passa a incorporá-las
// automaticamente.
//
// =====================================

function obterQuestoesHistoricasPSCPP() {

    let historico = [];


    // =====================================
    // PROVA 2006
    // =====================================

    if (
        typeof obterQuestoesProva2006PSCPP ===
        "function"
    ) {

        historico = historico.concat(
            obterQuestoesProva2006PSCPP()
        );

    }


    // =====================================
    // PROVA 2008
    // =====================================

    if (
        typeof obterQuestoesProva2008PSCPP ===
        "function"
    ) {

        historico = historico.concat(
            obterQuestoesProva2008PSCPP()
        );

    }


    // =====================================
    // PROVA 2011
    // =====================================

    if (
        typeof obterQuestoesProva2011PSCPP ===
        "function"
    ) {

        historico = historico.concat(
            obterQuestoesProva2011PSCPP()
        );

    }


    // =====================================
    // PROVA 2012
    // =====================================

    if (
        typeof obterQuestoesProva2012PSCPP ===
        "function"
    ) {

        historico = historico.concat(
            obterQuestoesProva2012PSCPP()
        );

    }


    return removerQuestoesDuplicadasPSCPP(
        historico
    );

}


// =====================================
// CONTAR FREQUÊNCIA HISTÓRICA
// POR DISCIPLINA
// =====================================

function calcularFrequenciaHistoricaDisciplinasPSCPP() {

    const frequencias = {};


    const questoesHistoricas =
        obterQuestoesHistoricasPSCPP();


    questoesHistoricas.forEach(

        function(questao) {

            if (
                !questao ||
                !questao.disciplina
            ) {

                return;

            }


            const disciplina =
                questao.disciplina;


            if (
                !frequencias[
                    disciplina
                ]
            ) {

                frequencias[
                    disciplina
                ] = 0;

            }


            frequencias[
                disciplina
            ]++;

        }

    );


    return frequencias;

}


// =====================================
// CONTAR FREQUÊNCIA HISTÓRICA
// DOS ASSUNTOS POR DISCIPLINA
// =====================================

function calcularFrequenciaHistoricaAssuntosPSCPP(
    disciplinaId
) {

    const frequencias = {};


    const questoesHistoricas =
        obterQuestoesHistoricasPSCPP();


    questoesHistoricas.forEach(

        function(questao) {

            if (
                !questao ||
                questao.disciplina !==
                    disciplinaId
            ) {

                return;

            }


            const assunto =
                normalizarTextoMotorPSCPP(
                    questao.assunto
                );


            if (!assunto) {

                return;

            }


            if (
                !frequencias[
                    assunto
                ]
            ) {

                frequencias[
                    assunto
                ] = 0;

            }


            frequencias[
                assunto
            ]++;

        }

    );


    return frequencias;

}


// =====================================
// OBTER PESO HISTÓRICO
// DE UMA DISCIPLINA
// =====================================

function obterPesoHistoricoDisciplinaPSCPP(
    disciplinaId,
    frequencias
) {

    const ocorrencias =
        Number(
            frequencias[
                disciplinaId
            ] || 0
        );


    return (
        ocorrencias +
        PESO_BASE_DISCIPLINA_PSCPP
    );

}


// =====================================
// DISTRIBUIR QUANTIDADE
// ENTRE DISCIPLINAS
// =====================================
//
// Regras:
//
// 1. Toda disciplina selecionada e com
//    questões disponíveis recebe ao menos
//    uma questão.
//
// 2. O restante é distribuído conforme
//    o peso histórico.
//
// 3. O algoritmo respeita o tamanho
//    disponível de cada banco.
//
// 4. Sobras são redistribuídas.
//
// =====================================

function calcularDistribuicaoDisciplinasPSCPP(
    disciplinas,
    quantidade
) {

    const frequencias =
        calcularFrequenciaHistoricaDisciplinasPSCPP();


    const disciplinasValidas = [];


    disciplinas.forEach(

        function(disciplinaId) {

            const banco =
                removerQuestoesDuplicadasPSCPP(
                    obterQuestoesPorDisciplinaPSCPP(
                        disciplinaId
                    )
                );


            if (
                banco.length > 0
            ) {

                disciplinasValidas.push({

                    id:
                        disciplinaId,

                    disponiveis:
                        banco.length,

                    peso:
                        obterPesoHistoricoDisciplinaPSCPP(
                            disciplinaId,
                            frequencias
                        ),

                    quantidade:
                        0,

                    resto:
                        0

                });

            }

        }

    );


    if (
        disciplinasValidas.length === 0
    ) {

        return [];

    }


    // =====================================
    // PRIMEIRO:
    // garantir presença mínima
    // =====================================

    let restante =
        quantidade;


    if (
        quantidade >=
        disciplinasValidas.length
    ) {

        disciplinasValidas.forEach(

            function(item) {

                item.quantidade = 1;

                restante--;

            }

        );

    }


    // =====================================
    // SOMA DOS PESOS
    // =====================================

    const somaPesos =
        disciplinasValidas.reduce(

            function(total, item) {

                return total +
                    item.peso;

            },

            0

        );


    // =====================================
    // DISTRIBUIÇÃO PROPORCIONAL
    // =====================================

    if (
        restante > 0 &&
        somaPesos > 0
    ) {

        disciplinasValidas.forEach(

            function(item) {

                const capacidade =
                    item.disponiveis -
                    item.quantidade;


                if (
                    capacidade <= 0
                ) {

                    return;

                }


                const quotaExata =
                    restante *
                    (
                        item.peso /
                        somaPesos
                    );


                const quotaInteira =
                    Math.floor(
                        quotaExata
                    );


                const adicionar =
                    Math.min(
                        quotaInteira,
                        capacidade
                    );


                item.quantidade +=
                    adicionar;


                item.resto =
                    quotaExata -
                    quotaInteira;

            }

        );

    }


    // =====================================
    // CALCULAR QUANTO JÁ FOI ALOCADO
    // =====================================

    let totalAlocado =
        disciplinasValidas.reduce(

            function(total, item) {

                return total +
                    item.quantidade;

            },

            0

        );


    // =====================================
    // DISTRIBUIR VAGAS RESTANTES
    //
    // Maior resto proporcional primeiro.
    // Em empate, maior peso histórico.
    // =====================================

    while (
        totalAlocado <
        quantidade
    ) {

        const candidatas =
            disciplinasValidas

                .filter(

                    function(item) {

                        return (
                            item.quantidade <
                            item.disponiveis
                        );

                    }

                )

                .sort(

                    function(a, b) {

                        if (
                            b.resto !==
                            a.resto
                        ) {

                            return (
                                b.resto -
                                a.resto
                            );

                        }


                        return (
                            b.peso -
                            a.peso
                        );

                    }

                );


        if (
            candidatas.length === 0
        ) {

            break;

        }


        const escolhida =
            candidatas[0];


        escolhida.quantidade++;

        escolhida.resto = 0;

        totalAlocado++;

    }


    return disciplinasValidas;

}


// =====================================
// CALCULAR PESO DE UMA QUESTÃO
// PELO ASSUNTO HISTÓRICO
// =====================================

function calcularPesoQuestaoPSCPP(
    questao,
    frequenciasAssuntos
) {

    const assunto =
        normalizarTextoMotorPSCPP(
            questao.assunto
        );


    const ocorrencias =
        assunto
            ? Number(
                frequenciasAssuntos[
                    assunto
                ] || 0
            )
            : 0;


    return (
        PESO_BASE_ASSUNTO_PSCPP +
        ocorrencias
    );

}


// =====================================
// SORTEIO PONDERADO SEM REPETIÇÃO
// =====================================
//
// Cada questão recebe peso:
//
// 1 + frequência histórica do assunto.
//
// Depois de escolhida, a questão sai
// do conjunto e não pode repetir.
//
// =====================================

function selecionarQuestoesPonderadasPSCPP(
    banco,
    quantidade,
    disciplinaId
) {

    const disponiveis =
        removerQuestoesDuplicadasPSCPP(
            banco
        );


    const frequenciasAssuntos =
        calcularFrequenciaHistoricaAssuntosPSCPP(
            disciplinaId
        );


    const selecionadas = [];


    while (
        selecionadas.length <
            quantidade &&
        disponiveis.length > 0
    ) {

        const pesos =
            disponiveis.map(

                function(questao) {

                    return calcularPesoQuestaoPSCPP(
                        questao,
                        frequenciasAssuntos
                    );

                }

            );


        const pesoTotal =
            pesos.reduce(

                function(total, peso) {

                    return total + peso;

                },

                0

            );


        if (
            pesoTotal <= 0
        ) {

            const restante =
                embaralharQuestoesPSCPP(
                    disponiveis
                );


            while (
                selecionadas.length <
                    quantidade &&
                restante.length > 0
            ) {

                selecionadas.push(
                    restante.shift()
                );

            }


            break;

        }


        let sorteio =
            Math.random() *
            pesoTotal;


        let indiceEscolhido =
            disponiveis.length - 1;


        for (
            let i = 0;
            i < disponiveis.length;
            i++
        ) {

            sorteio -=
                pesos[i];


            if (
                sorteio <= 0
            ) {

                indiceEscolhido = i;

                break;

            }

        }


        const escolhida =
            disponiveis.splice(
                indiceEscolhido,
                1
            )[0];


        selecionadas.push(
            escolhida
        );

    }


    return selecionadas;

}


// =====================================
// SELECIONAR QUESTÕES
// SIMULADO PERSONALIZADO PONDERADO
// =====================================

function selecionarQuestoesSimuladoPSCPP(
    disciplinas,
    quantidade
) {

    const distribuicao =
        calcularDistribuicaoDisciplinasPSCPP(
            disciplinas,
            quantidade
        );


    let selecionadas = [];


    distribuicao.forEach(

        function(item) {

            const bancoDisciplina =
                obterQuestoesPorDisciplinaPSCPP(
                    item.id
                );


            const escolhidas =
                selecionarQuestoesPonderadasPSCPP(

                    bancoDisciplina,

                    item.quantidade,

                    item.id

                );


            selecionadas =
                selecionadas.concat(
                    escolhidas
                );

        }

    );


    selecionadas =
        removerQuestoesDuplicadasPSCPP(
            selecionadas
        );


    // =====================================
    // SEGURANÇA:
    //
    // Caso alguma inconsistência externa
    // tenha feito a seleção ficar menor
    // que a quantidade solicitada,
    // completar usando apenas as
    // disciplinas selecionadas.
    // =====================================

    if (
        selecionadas.length <
        quantidade
    ) {

        let bancoComplementar =
            reunirQuestoesDisciplinasPSCPP(
                disciplinas
            );


        bancoComplementar =
            removerQuestoesDuplicadasPSCPP(
                bancoComplementar
            );


        const idsSelecionados =
            new Set(

                selecionadas.map(

                    function(questao) {

                        return questao.id;

                    }

                )

            );


        bancoComplementar =
            bancoComplementar.filter(

                function(questao) {

                    return !idsSelecionados.has(
                        questao.id
                    );

                }

            );


        bancoComplementar =
            embaralharQuestoesPSCPP(
                bancoComplementar
            );


        while (
            selecionadas.length <
                quantidade &&
            bancoComplementar.length > 0
        ) {

            selecionadas.push(
                bancoComplementar.shift()
            );

        }

    }


    // =====================================
    // EMBARALHAMENTO FINAL
    //
    // A distribuição permanece,
    // mas as disciplinas não aparecem
    // agrupadas visualmente.
    // =====================================

    return {

        questoes:
            embaralharQuestoesPSCPP(
                selecionadas
            )
            .slice(
                0,
                quantidade
            ),

        distribuicao:
            distribuicao.map(

                function(item) {

                    return {

                        disciplina:
                            item.id,

                        quantidade:
                            item.quantidade,

                        disponiveis:
                            item.disponiveis,

                        pesoHistorico:
                            item.peso

                    };

                }

            )

    };

}


// =====================================
// PROVAS ANTERIORES DISPONÍVEIS
// =====================================

function obterProvasAnterioresDisponiveisPSCPP() {

    const provas = [];


    if (
        typeof obterQuestoesProva2006PSCPP ===
        "function"
    ) {

        provas.push({

            id: "prova-2006",

            ano: 2006,

            nome:
                "Prova Escrita PSCPP — 2006",

            total:
                obterQuestoesProva2006PSCPP()
                    .length

        });

    }


    if (
        typeof obterQuestoesProva2008PSCPP ===
        "function"
    ) {

        provas.push({

            id: "prova-2008",

            ano: 2008,

            nome:
                "Prova Escrita PSCPP — 2008",

            total:
                obterQuestoesProva2008PSCPP()
                    .length

        });

    }


    if (
        typeof obterQuestoesProva2011PSCPP ===
        "function"
    ) {

        provas.push({

            id: "prova-2011",

            ano: 2011,

            nome:
                "Prova Escrita PSCPP — 2011",

            total:
                obterQuestoesProva2011PSCPP()
                    .length

        });

    }


    if (
        typeof obterQuestoesProva2012PSCPP ===
        "function"
    ) {

        provas.push({

            id: "prova-2012",

            ano: 2012,

            nome:
                "Prova Escrita PSCPP — 2012",

            total:
                obterQuestoesProva2012PSCPP()
                    .length

        });

    }


    return provas;

}


// =====================================
// NORMALIZAR ID DA PROVA
// =====================================

function normalizarIdProvaAnteriorPSCPP(
    provaId
) {

    if (!provaId) {

        return "";

    }


    const id = provaId
        .toString()
        .trim()
        .toLowerCase();


    if (
        id === "2006" ||
        id === "prova2006" ||
        id === "prova-2006" ||
        id === "pscpp-2006"
    ) {

        return "prova-2006";

    }


    if (
        id === "2008" ||
        id === "prova2008" ||
        id === "prova-2008" ||
        id === "pscpp-2008"
    ) {

        return "prova-2008";

    }


    if (
        id === "2011" ||
        id === "prova2011" ||
        id === "prova-2011" ||
        id === "pscpp-2011"
    ) {

        return "prova-2011";

    }


    if (
        id === "2012" ||
        id === "prova2012" ||
        id === "prova-2012" ||
        id === "pscpp-2012"
    ) {

        return "prova-2012";

    }


    return id;

}


// =====================================
// OBTER QUESTÕES DE PROVA ANTERIOR
// =====================================

function obterQuestoesProvaAnteriorPSCPP(
    provaId
) {

    const idNormalizado =
        normalizarIdProvaAnteriorPSCPP(
            provaId
        );


    switch (idNormalizado) {


        // =====================================
        // PROVA 2006
        // =====================================

        case "prova-2006":

            if (
                typeof obterQuestoesProva2006PSCPP ===
                "function"
            ) {

                return obterQuestoesProva2006PSCPP();

            }

            break;


        // =====================================
        // PROVA 2008
        // =====================================

        case "prova-2008":

            if (
                typeof obterQuestoesProva2008PSCPP ===
                "function"
            ) {

                return obterQuestoesProva2008PSCPP();

            }

            break;


        // =====================================
        // PROVA 2011
        // =====================================

        case "prova-2011":

            if (
                typeof obterQuestoesProva2011PSCPP ===
                "function"
            ) {

                return obterQuestoesProva2011PSCPP();

            }

            break;


        // =====================================
        // PROVA 2012
        // =====================================

        case "prova-2012":

            if (
                typeof obterQuestoesProva2012PSCPP ===
                "function"
            ) {

                return obterQuestoesProva2012PSCPP();

            }

            break;

    }


    return [];

}


// =====================================
// OBTER DADOS DA PROVA ANTERIOR
// =====================================

function obterDadosProvaAnteriorPSCPP(
    provaId
) {

    const idNormalizado =
        normalizarIdProvaAnteriorPSCPP(
            provaId
        );


    switch (idNormalizado) {


        case "prova-2006":

            if (
                typeof obterDadosProva2006PSCPP ===
                "function"
            ) {

                return obterDadosProva2006PSCPP();

            }


            return {

                id:
                    "prova-2006",

                nome:
                    "Prova Escrita PSCPP — 2006",

                ano:
                    2006,

                origem:
                    "prova-anterior",

                questoes:
                    obterQuestoesProvaAnteriorPSCPP(
                        idNormalizado
                    )

            };


        case "prova-2008":

            if (
                typeof obterDadosProva2008PSCPP ===
                "function"
            ) {

                return obterDadosProva2008PSCPP();

            }


            return {

                id:
                    "prova-2008",

                nome:
                    "Prova Escrita PSCPP — 2008",

                ano:
                    2008,

                origem:
                    "prova-anterior",

                questoes:
                    obterQuestoesProvaAnteriorPSCPP(
                        idNormalizado
                    )

            };


        case "prova-2011":

            if (
                typeof obterDadosProva2011PSCPP ===
                "function"
            ) {

                return obterDadosProva2011PSCPP();

            }


            return {

                id:
                    "prova-2011",

                nome:
                    "Prova Escrita PSCPP — 2011",

                ano:
                    2011,

                origem:
                    "prova-anterior",

                questoes:
                    obterQuestoesProvaAnteriorPSCPP(
                        idNormalizado
                    )

            };


        case "prova-2012":

            if (
                typeof obterDadosProva2012PSCPP ===
                "function"
            ) {

                return obterDadosProva2012PSCPP();

            }


            return {

                id:
                    "prova-2012",

                nome:
                    "Prova Escrita PSCPP — 2012",

                ano:
                    2012,

                origem:
                    "prova-anterior",

                questoes:
                    obterQuestoesProvaAnteriorPSCPP(
                        idNormalizado
                    )

            };

    }


    return null;

}


// =====================================
// PREPARAR PROVA ANTERIOR
// =====================================

function prepararProvaAnteriorPSCPP(
    configuracao
) {

    const provaId =
        normalizarIdProvaAnteriorPSCPP(
            configuracao.provaAnterior
        );


    if (!provaId) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma prova anterior foi selecionada."

        };

    }


    const questoes =
        obterQuestoesProvaAnteriorPSCPP(
            provaId
        );


    if (
        !questoes ||
        questoes.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "A prova selecionada não está disponível ou seu arquivo de questões não foi carregado."

        };

    }


    const dadosProva =
        obterDadosProvaAnteriorPSCPP(
            provaId
        );


    // =====================================
    // NÃO EMBARALHAR
    //
    // A ordem oficial da prova deve ser
    // preservada integralmente.
    // =====================================

    const questoesOrdenadas =
        [...questoes].sort(

            function(a, b) {

                const numeroA =
                    Number(
                        a.numeroOriginal
                    ) || 0;


                const numeroB =
                    Number(
                        b.numeroOriginal
                    ) || 0;


                return numeroA - numeroB;

            }

        );


    simuladoAtualPSCPP = {

        configuracao:
            configuracao,

        questoes:
            questoesOrdenadas,

        iniciado:
            false,

        finalizado:
            false,

        provaAnterior: {

            id:
                provaId,

            nome:
                dadosProva
                    ? dadosProva.nome
                    : provaId,

            ano:
                dadosProva
                    ? dadosProva.ano
                    : null,

            total:
                questoesOrdenadas.length

        },

        distribuicao:
            null

    };


    return {

        sucesso: true,

        tipo:
            "prova-anterior",

        mensagem:
            "Prova anterior preparada com sucesso.",

        total:
            questoesOrdenadas.length,

        questoes:
            [...questoesOrdenadas],

        provaAnterior:
            simuladoAtualPSCPP
                .provaAnterior

    };

}


// =====================================
// PREPARAR SIMULADO PERSONALIZADO
// =====================================

function prepararSimuladoPersonalizadoPSCPP(
    configuracao
) {

    const disciplinas =
        Array.isArray(
            configuracao.disciplinas
        )
            ? configuracao.disciplinas
            : [];


    const quantidade =
        Number(
            configuracao.quantidade
        );


    if (
        disciplinas.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma disciplina foi selecionada."

        };

    }


    if (
        !quantidade ||
        quantidade <= 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "A quantidade de questões é inválida."

        };

    }


    const banco =
        reunirQuestoesDisciplinasPSCPP(
            disciplinas
        );


    const bancoSemDuplicadas =
        removerQuestoesDuplicadasPSCPP(
            banco
        );


    if (
        bancoSemDuplicadas.length === 0
    ) {

        return {

            sucesso: false,

            mensagem:
                "Não há questões disponíveis nas disciplinas selecionadas."

        };

    }


    if (
        bancoSemDuplicadas.length <
        quantidade
    ) {

        return {

            sucesso: false,

            mensagem:
                "O banco possui apenas " +
                bancoSemDuplicadas.length +
                " questões disponíveis para as disciplinas selecionadas, mas foram solicitadas " +
                quantidade +
                " questões."

        };

    }


    // =====================================
    // NOVO MOTOR PONDERADO
    // =====================================

    const resultadoSelecao =
        selecionarQuestoesSimuladoPSCPP(

            disciplinas,

            quantidade

        );


    const questoesSelecionadas =
        resultadoSelecao.questoes;


    if (
        questoesSelecionadas.length !==
        quantidade
    ) {

        return {

            sucesso: false,

            mensagem:
                "Não foi possível montar o simulado com a quantidade solicitada."

        };

    }


    simuladoAtualPSCPP = {

        configuracao:
            configuracao,

        questoes:
            questoesSelecionadas,

        iniciado:
            false,

        finalizado:
            false,

        provaAnterior:
            null,

        distribuicao:
            resultadoSelecao
                .distribuicao

    };


    return {

        sucesso: true,

        tipo:
            "personalizado",

        mensagem:
            "Simulado preparado com sucesso.",

        total:
            questoesSelecionadas.length,

        questoes:
            [...questoesSelecionadas],

        distribuicao:
            resultadoSelecao
                .distribuicao

    };

}


// =====================================
// PREPARAR SIMULADO
// FUNÇÃO PRINCIPAL
// =====================================

function prepararSimuladoPSCPP() {

    if (
        typeof carregarConfiguracaoSimuladoPSCPP !==
        "function"
    ) {

        return {

            sucesso: false,

            mensagem:
                "O sistema de configuração do simulado não foi carregado."

        };

    }


    const configuracao =
        carregarConfiguracaoSimuladoPSCPP();


    if (!configuracao) {

        return {

            sucesso: false,

            mensagem:
                "Nenhuma configuração de simulado foi encontrada."

        };

    }


    if (
        typeof validarConfiguracaoSimuladoPSCPP ===
        "function"
    ) {

        const validacao =
            validarConfiguracaoSimuladoPSCPP(
                configuracao
            );


        if (
            validacao &&
            validacao.valido === false
        ) {

            return {

                sucesso: false,

                mensagem:
                    validacao.mensagem ||
                    "A configuração do simulado é inválida."

            };

        }

    }


    // =====================================
    // PROVA ANTERIOR
    // =====================================

    if (
        configuracao.tipo ===
        "prova-anterior"
    ) {

        return prepararProvaAnteriorPSCPP(
            configuracao
        );

    }


    // =====================================
    // SIMULADO PERSONALIZADO
    // =====================================

    return prepararSimuladoPersonalizadoPSCPP(
        configuracao
    );

}


// =====================================
// OBTER ESTADO ATUAL
// =====================================

function obterSimuladoAtualPSCPP() {

    return {

        configuracao:
            simuladoAtualPSCPP
                .configuracao,

        questoes:
            [
                ...simuladoAtualPSCPP
                    .questoes
            ],

        iniciado:
            simuladoAtualPSCPP
                .iniciado,

        finalizado:
            simuladoAtualPSCPP
                .finalizado,

        provaAnterior:
            simuladoAtualPSCPP
                .provaAnterior
                ? {
                    ...simuladoAtualPSCPP
                        .provaAnterior
                }
                : null,

        distribuicao:
            simuladoAtualPSCPP
                .distribuicao
                ? simuladoAtualPSCPP
                    .distribuicao
                    .map(
                        function(item) {

                            return {
                                ...item
                            };

                        }
                    )
                : null

    };

}


// =====================================
// OBTER QUESTÕES DO SIMULADO ATUAL
// =====================================

function obterQuestoesSimuladoAtualPSCPP() {

    return [
        ...simuladoAtualPSCPP.questoes
    ];

}


// =====================================
// OBTER QUANTIDADE DE QUESTÕES
// =====================================

function obterQuantidadeQuestoesSimuladoAtualPSCPP() {

    return simuladoAtualPSCPP
        .questoes
        .length;

}


// =====================================
// OBTER DISTRIBUIÇÃO DO SIMULADO
// =====================================

function obterDistribuicaoSimuladoAtualPSCPP() {

    if (
        !simuladoAtualPSCPP
            .distribuicao
    ) {

        return [];

    }


    return simuladoAtualPSCPP
        .distribuicao
        .map(

            function(item) {

                return {
                    ...item
                };

            }

        );

}


// =====================================
// MARCAR COMO INICIADO
// =====================================

function marcarSimuladoComoIniciadoPSCPP() {

    simuladoAtualPSCPP.iniciado =
        true;


    return true;

}


// =====================================
// MARCAR COMO FINALIZADO
// =====================================

function marcarSimuladoComoFinalizadoPSCPP() {

    simuladoAtualPSCPP.finalizado =
        true;


    return true;

}


// =====================================
// IDENTIFICAR PROVA ANTERIOR
// =====================================

function simuladoAtualEhProvaAnteriorPSCPP() {

    return !!(
        simuladoAtualPSCPP &&
        simuladoAtualPSCPP.configuracao &&
        simuladoAtualPSCPP
            .configuracao
            .tipo ===
            "prova-anterior"
    );

}


// =====================================
// OBTER PROVA ANTERIOR ATUAL
// =====================================

function obterProvaAnteriorAtualPSCPP() {

    if (
        !simuladoAtualPSCPP
            .provaAnterior
    ) {

        return null;

    }


    return {

        ...simuladoAtualPSCPP
            .provaAnterior

    };

}


// =====================================
// LOG DE DISTRIBUIÇÃO
// =====================================

function exibirDistribuicaoSimuladoPSCPP() {

    const distribuicao =
        obterDistribuicaoSimuladoAtualPSCPP();


    if (
        distribuicao.length === 0
    ) {

        console.log(
            "Simulado sem distribuição personalizada."
        );

        return;

    }


    console.log(
        "Distribuição estratégica do simulado:"
    );


    distribuicao.forEach(

        function(item) {

            console.log(
                item.disciplina +
                ": " +
                item.quantidade +
                " questões | peso histórico: " +
                item.pesoHistorico
            );

        }

    );

}


// =====================================
// LOG DE CARREGAMENTO
// =====================================

console.log(
    "Motor de Simulados PSCPP v1.2 carregado."
);
