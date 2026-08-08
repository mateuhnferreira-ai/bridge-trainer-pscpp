// =====================================
// CÁLCULO DO PLANEJAMENTO PSCPP v2.1
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Calcular disponibilidade total.
// 2. Identificar a fase atual.
// 3. Calcular carga prevista.
// 4. Estimar carga cumprida pelo progresso.
// 5. Calcular carga restante.
// 6. Calcular semanas restantes.
// 7. Determinar ritmo semanal necessário.
// 8. Comparar capacidade × necessidade.
// 9. Ler ritmo REAL do Pomodoro.
// 10. Analisar últimos 7, 14 e 30 dias.
// 11. Detectar tendência real de estudo.
// 12. Produzir diagnóstico de prazo.
//
// PRINCÍPIO:
//
// PROGRESSO PEDAGÓGICO
//        +
// PRAZO
//        +
// CAPACIDADE DISPONÍVEL
//        +
// RITMO REAL DE ESTUDO
//        ↓
// DIAGNÓSTICO DA PREPARAÇÃO
//
// Este arquivo responde:
//
// "Quanto preciso avançar e meu ritmo
//  atual é suficiente?"
//
// motor-planejamento.js responde:
//
// "O que devo estudar agora?"
// =====================================


// =====================================
// CONSTANTES
// =====================================

const PLANEJAMENTO_MS_DIA =
    1000 * 60 * 60 * 24;


const PLANEJAMENTO_MS_SEMANA =
    PLANEJAMENTO_MS_DIA * 7;


// Mesmo localStorage utilizado
// pelo pomodoro.js v3.1.

const PLANEJAMENTO_CHAVE_RESUMO_POMODORO =
    "bridgeTrainerPSCPP_resumoDiarioPomodoro";


// =====================================
// CRIAR DATA LOCAL SEGURA
// =====================================

function criarDataPlanejamento(
    valor
) {

    if (!valor) {

        return null;

    }


    const partes =
        String(valor)
            .split("-")
            .map(Number);


    if (
        partes.length !== 3 ||
        partes.some(
            numero =>
                !Number.isFinite(numero)
        )
    ) {

        return null;

    }


    return new Date(

        partes[0],

        partes[1] - 1,

        partes[2],

        0,
        0,
        0,
        0

    );

}


// =====================================
// OBTER DATA DE HOJE
// =====================================

function obterHojePlanejamento() {

    const hoje =
        new Date();


    return new Date(

        hoje.getFullYear(),

        hoje.getMonth(),

        hoje.getDate(),

        0,
        0,
        0,
        0

    );

}


// =====================================
// FORMATAR DATA LOCAL
// =====================================

function formatarDataLocalPlanejamento(
    data
) {

    if (
        !(data instanceof Date) ||
        Number.isNaN(
            data.getTime()
        )
    ) {

        return null;

    }


    const ano =
        data.getFullYear();


    const mes =
        String(
            data.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );


    const dia =
        String(
            data.getDate()
        )
        .padStart(
            2,
            "0"
        );


    return (
        ano +
        "-" +
        mes +
        "-" +
        dia
    );

}


// =====================================
// LIMITAR NÚMERO
// =====================================

function limitarNumeroPlanejamento(
    valor,
    minimo,
    maximo
) {

    const numero =
        Number(valor);


    if (
        !Number.isFinite(numero)
    ) {

        return minimo;

    }


    return Math.min(

        maximo,

        Math.max(
            minimo,
            numero
        )

    );

}


// =====================================
// ARREDONDAR
// =====================================

function arredondarPlanejamento(
    valor,
    casas = 1
) {

    const numero =
        Number(valor);


    if (
        !Number.isFinite(numero)
    ) {

        return 0;

    }


    const fator =
        Math.pow(
            10,
            casas
        );


    return (
        Math.round(
            numero * fator
        ) /
        fator
    );

}


// =====================================
// DIFERENÇA EM DIAS
// =====================================

function diferencaDiasPlanejamento(
    inicio,
    fim
) {

    if (
        !inicio ||
        !fim
    ) {

        return 0;

    }


    return Math.max(

        0,

        Math.ceil(
            (
                fim.getTime() -
                inicio.getTime()
            ) /
            PLANEJAMENTO_MS_DIA
        )

    );

}


// =====================================
// DIFERENÇA EM SEMANAS
// =====================================

function diferencaSemanasPlanejamento(
    inicio,
    fim
) {

    const dias =
        diferencaDiasPlanejamento(
            inicio,
            fim
        );


    return (
        dias / 7
    );

}


// =====================================
// HORAS DISPONÍVEIS POR SEMANA
// =====================================

function calcularHorasSemanaPlanejamento() {

    const horasPorDia =
        Number(
            configuracaoEstudo.horasPorDia
        ) || 0;


    const diasPorSemana =
        Array.isArray(
            configuracaoEstudo.diasEstudo
        )
            ? configuracaoEstudo
                .diasEstudo.length
            : 0;


    return (
        horasPorDia *
        diasPorSemana
    );

}


// =====================================
// CAPACIDADE SEMANAL REALISTA
// =====================================
//
// Aplica o fator de segurança.
//
// Exemplo:
//
// 10 h disponíveis
// × 0,90
// = 9 h consideradas pelo plano.

function calcularHorasSemanaRealPlanejamento() {

    const horasTeoricas =
        calcularHorasSemanaPlanejamento();


    const fator =
        limitarNumeroPlanejamento(

            configuracaoEstudo
                .fatorDisponibilidadeReal ??
                1,

            0,

            1

        );


    return (
        horasTeoricas *
        fator
    );

}


// =====================================
// IDENTIFICAR FASE
// =====================================

function identificarFasePlanejamento(
    dataReferencia =
        obterHojePlanejamento()
) {

    if (
        !configuracaoEstudo.fases
    ) {

        return "geral";

    }


    const fases =
        configuracaoEstudo.fases;


    const inicioConteudo =
        criarDataPlanejamento(
            fases.conteudo?.inicio
        );


    const fimConteudo =
        criarDataPlanejamento(
            fases.conteudo?.fim
        );


    const inicioConsolidacao =
        criarDataPlanejamento(
            fases.consolidacao?.inicio
        );


    const fimConsolidacao =
        criarDataPlanejamento(
            fases.consolidacao?.fim
        );


    const inicioRetaFinal =
        criarDataPlanejamento(
            fases.retaFinal?.inicio
        );


    const fimRetaFinal =
        criarDataPlanejamento(
            fases.retaFinal?.fim
        );


    if (
        inicioConteudo &&
        dataReferencia <
            inicioConteudo
    ) {

        return "preparacao";

    }


    if (
        inicioConteudo &&
        fimConteudo &&
        dataReferencia >=
            inicioConteudo &&
        dataReferencia <=
            fimConteudo
    ) {

        return "conteudo";

    }


    if (
        inicioConsolidacao &&
        fimConsolidacao &&
        dataReferencia >=
            inicioConsolidacao &&
        dataReferencia <=
            fimConsolidacao
    ) {

        return "consolidacao";

    }


    if (
        inicioRetaFinal &&
        fimRetaFinal &&
        dataReferencia >=
            inicioRetaFinal &&
        dataReferencia <=
            fimRetaFinal
    ) {

        return "reta-final";

    }


    if (
        fimRetaFinal &&
        dataReferencia >
            fimRetaFinal
    ) {

        return "encerrado";

    }


    return "transicao";

}


// =====================================
// NOME DA FASE
// =====================================

function obterNomeFasePlanejamento(
    fase
) {

    const nomes = {

        "preparacao":
            "Preparação",

        "conteudo":
            "Conteúdo",

        "consolidacao":
            "Consolidação",

        "reta-final":
            "Reta Final",

        "encerrado":
            "Encerrado",

        "transicao":
            "Transição",

        "geral":
            "Planejamento Geral"

    };


    return (
        nomes[fase] ||
        fase
    );

}


// =====================================
// PROGRESSO DE UMA AULA
// =====================================

function obterProgressoAulaPlanejamento(
    idDisciplina,
    idAssunto
) {

    if (
        typeof obterProgressoAula !==
        "function"
    ) {

        return 0;

    }


    const progresso =
        Number(
            obterProgressoAula(
                idDisciplina,
                idAssunto
            )
        );


    return limitarNumeroPlanejamento(

        progresso,

        0,

        100

    );

}


// =====================================
// ANALISAR CARGA DO CONTEÚDO
// =====================================

function analisarCargaConteudoPlanejamento() {

    let horasPrevistasTotal =
        0;


    let horasCumpridasEstimadas =
        0;


    let quantidadeAssuntos =
        0;


    let assuntosConcluidos =
        0;


    const porDisciplina =
        {};


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        return {

            horasPrevistasTotal:
                0,

            horasCumpridasEstimadas:
                0,

            horasRestantesEstimadas:
                0,

            progressoPonderado:
                0,

            quantidadeAssuntos:
                0,

            assuntosConcluidos:
                0,

            porDisciplina:
                {}

        };

    }


    for (
        const idDisciplina
        in conteudoPSCPP
    ) {

        const disciplina =
            conteudoPSCPP[
                idDisciplina
            ];


        const assuntos =
            Array.isArray(
                disciplina.assuntos
            )
                ? disciplina.assuntos
                : [];


        let horasPrevistasDisciplina =
            0;


        let horasCumpridasDisciplina =
            0;


        let assuntosConcluidosDisciplina =
            0;


        assuntos.forEach(
            assunto => {

                const horas =
                    Math.max(

                        0,

                        Number(
                            assunto.horas
                        ) || 0

                    );


                const progresso =
                    obterProgressoAulaPlanejamento(

                        idDisciplina,

                        assunto.id

                    );


                const horasCumpridas =
                    horas *
                    (
                        progresso /
                        100
                    );


                horasPrevistasTotal +=
                    horas;


                horasCumpridasEstimadas +=
                    horasCumpridas;


                horasPrevistasDisciplina +=
                    horas;


                horasCumpridasDisciplina +=
                    horasCumpridas;


                quantidadeAssuntos++;


                if (
                    progresso >= 100
                ) {

                    assuntosConcluidos++;

                    assuntosConcluidosDisciplina++;

                }

            }
        );


        const horasRestantesDisciplina =
            Math.max(

                0,

                horasPrevistasDisciplina -
                horasCumpridasDisciplina

            );


        const progressoDisciplina =
            horasPrevistasDisciplina > 0

                ? (
                    horasCumpridasDisciplina /
                    horasPrevistasDisciplina
                ) * 100

                : 0;


        porDisciplina[
            idDisciplina
        ] = {

            nome:
                disciplina.nome,

            horasPrevistas:
                arredondarPlanejamento(
                    horasPrevistasDisciplina,
                    1
                ),

            horasCumpridas:
                arredondarPlanejamento(
                    horasCumpridasDisciplina,
                    1
                ),

            horasRestantes:
                arredondarPlanejamento(
                    horasRestantesDisciplina,
                    1
                ),

            progresso:
                arredondarPlanejamento(
                    progressoDisciplina,
                    1
                ),

            quantidadeAssuntos:
                assuntos.length,

            assuntosConcluidos:
                assuntosConcluidosDisciplina

        };

    }


    const horasRestantesEstimadas =
        Math.max(

            0,

            horasPrevistasTotal -
            horasCumpridasEstimadas

        );


    const progressoPonderado =
        horasPrevistasTotal > 0

            ? (
                horasCumpridasEstimadas /
                horasPrevistasTotal
            ) * 100

            : 0;


    return {

        horasPrevistasTotal:
            arredondarPlanejamento(
                horasPrevistasTotal,
                1
            ),

        horasCumpridasEstimadas:
            arredondarPlanejamento(
                horasCumpridasEstimadas,
                1
            ),

        horasRestantesEstimadas:
            arredondarPlanejamento(
                horasRestantesEstimadas,
                1
            ),

        progressoPonderado:
            arredondarPlanejamento(
                progressoPonderado,
                1
            ),

        quantidadeAssuntos:
            quantidadeAssuntos,

        assuntosConcluidos:
            assuntosConcluidos,

        porDisciplina:
            porDisciplina

    };

}


// =====================================
// PROGRESSO ESPERADO
// =====================================

function calcularProgressoEsperadoPlanejamento(
    hoje
) {

    if (
        !configuracaoEstudo.fases ||
        !configuracaoEstudo
            .fases.conteudo
    ) {

        return 0;

    }


    const inicioConteudo =
        criarDataPlanejamento(
            configuracaoEstudo
                .fases
                .conteudo
                .inicio
        );


    const fimConteudo =
        criarDataPlanejamento(
            configuracaoEstudo
                .fases
                .conteudo
                .fim
        );


    if (
        !inicioConteudo ||
        !fimConteudo
    ) {

        return 0;

    }


    if (
        hoje <= inicioConteudo
    ) {

        return 0;

    }


    if (
        hoje >= fimConteudo
    ) {

        return 100;

    }


    const duracaoTotal =
        fimConteudo.getTime() -
        inicioConteudo.getTime();


    const transcorrido =
        hoje.getTime() -
        inicioConteudo.getTime();


    if (
        duracaoTotal <= 0
    ) {

        return 100;

    }


    return limitarNumeroPlanejamento(

        (
            transcorrido /
            duracaoTotal
        ) * 100,

        0,

        100

    );

}


// =====================================
// CARREGAR RESUMO DO POMODORO
// =====================================
//
// O planejamento NÃO precisa carregar
// pomodoro.js.
//
// Ele lê diretamente o resumo permanente
// criado pelo Pomodoro v3.1.

function carregarResumoPomodoroPlanejamento() {

    try {

        const salvo =
            localStorage.getItem(
                PLANEJAMENTO_CHAVE_RESUMO_POMODORO
            );


        if (!salvo) {

            return null;

        }


        const dados =
            JSON.parse(
                salvo
            );


        if (
            !dados ||
            typeof dados !== "object" ||
            !dados.dias
        ) {

            return null;

        }


        return dados;

    }
    catch (erro) {

        console.warn(
            "Planejamento não conseguiu ler " +
            "o resumo do Pomodoro:",
            erro
        );


        return null;

    }

}


// =====================================
// ANALISAR RITMO REAL
// =====================================
//
// Considera somente dias posteriores ao
// início oficial da preparação.
//
// Isso evita penalizar o usuário porque
// uma janela de 7 ou 30 dias contém dias
// anteriores ao início do plano.
//
// Exemplo:
//
// início oficial: 03/08
// hoje: 08/08
//
// período solicitado: 7 dias
//
// o cálculo utilizará somente os dias
// efetivamente disponíveis desde 03/08.

function analisarRitmoRealPlanejamento(
    periodoDias,
    hoje
) {

    const resultado = {

        periodoDias:
            periodoDias,

        diasConsiderados:
            0,

        diasComEstudo:
            0,

        segundosTotal:
            0,

        horasTotal:
            0,

        mediaHorasDia:
            0,

        mediaHorasDiaEstudado:
            0,

        ritmoSemanal:
            0,

        blocos:
            0,

        blocosCompletos:
            0,

        disciplinas:
            {}

    };


    const resumo =
        carregarResumoPomodoroPlanejamento();


    if (
        !resumo ||
        !resumo.dias
    ) {

        return resultado;

    }


    const inicioOficial =
        criarDataPlanejamento(
            configuracaoEstudo.inicio
        );


    const inicioJanela =
        new Date(
            hoje
        );


    inicioJanela.setDate(

        inicioJanela.getDate() -
        (
            periodoDias -
            1
        )

    );


    inicioJanela.setHours(
        0,
        0,
        0,
        0
    );


    let inicioConsiderado =
        inicioJanela;


    if (
        inicioOficial &&
        inicioOficial >
            inicioConsiderado
    ) {

        inicioConsiderado =
            inicioOficial;

    }


    resultado.diasConsiderados =
        Math.max(

            1,

            diferencaDiasPlanejamento(

                inicioConsiderado,

                hoje

            ) + 1

        );


    Object.entries(
        resumo.dias
    ).forEach(

        ([dataTexto, dia]) => {

            const data =
                criarDataPlanejamento(
                    dataTexto
                );


            if (
                !data ||
                data <
                    inicioConsiderado ||
                data >
                    hoje
            ) {

                return;

            }


            const segundosDia =
                Math.max(

                    0,

                    Number(
                        dia.segundosTotal
                    ) || 0

                );


            if (
                segundosDia > 0
            ) {

                resultado.diasComEstudo++;

            }


            resultado.segundosTotal +=
                segundosDia;


            resultado.blocos +=
                Number(
                    dia.blocos
                ) || 0;


            resultado.blocosCompletos +=
                Number(
                    dia.blocosCompletos
                ) || 0;


            const disciplinas =
                dia.disciplinas ||
                {};


            Object.entries(
                disciplinas
            ).forEach(

                ([
                    idDisciplina,
                    dadosDisciplina
                ]) => {

                    if (
                        !resultado
                            .disciplinas[
                                idDisciplina
                            ]
                    ) {

                        resultado
                            .disciplinas[
                                idDisciplina
                            ] = {

                                segundos:
                                    0,

                                horas:
                                    0

                            };

                    }


                    resultado
                        .disciplinas[
                            idDisciplina
                        ]
                        .segundos +=

                        Number(
                            dadosDisciplina
                                .segundos
                        ) || 0;

                }

            );

        }

    );


    resultado.horasTotal =
        resultado.segundosTotal /
        3600;


    resultado.mediaHorasDia =

        resultado.horasTotal /
        resultado.diasConsiderados;


    if (
        resultado.diasComEstudo > 0
    ) {

        resultado.mediaHorasDiaEstudado =

            resultado.horasTotal /
            resultado.diasComEstudo;

    }


    // Converte a média observada
    // para equivalente semanal.

    resultado.ritmoSemanal =

        resultado.mediaHorasDia *
        7;


    Object.values(
        resultado.disciplinas
    ).forEach(
        disciplina => {

            disciplina.horas =

                disciplina.segundos /
                3600;

        }
    );


    return resultado;

}


// =====================================
// DIAGNOSTICAR CAPACIDADE
// =====================================
//
// Pergunta:
//
// "Com minha disponibilidade configurada,
// é matematicamente possível terminar?"

function diagnosticarPrazoPlanejamento(
    cargaNecessariaSemana,
    cargaDisponivelSemana,
    horasRestantes
) {

    if (
        horasRestantes <= 0
    ) {

        return {

            codigo:
                "conteudo-concluido",

            status:
                "Concluído",

            nivel:
                "excelente",

            mensagem:
                "Todo o conteúdo previsto foi concluído."

        };

    }


    if (
        cargaDisponivelSemana <= 0
    ) {

        return {

            codigo:
                "sem-disponibilidade",

            status:
                "Sem disponibilidade",

            nivel:
                "critico",

            mensagem:
                "Não há horas semanais disponíveis configuradas."

        };

    }


    const razao =
        cargaNecessariaSemana /
        cargaDisponivelSemana;


    if (
        razao <= 0.75
    ) {

        return {

            codigo:
                "confortavel",

            status:
                "Dentro do prazo",

            nivel:
                "confortavel",

            mensagem:
                "A disponibilidade oferece boa margem para concluir o conteúdo."

        };

    }


    if (
        razao <= 0.95
    ) {

        return {

            codigo:
                "adequado",

            status:
                "Dentro do prazo",

            nivel:
                "adequado",

            mensagem:
                "A disponibilidade atual é suficiente para cumprir o planejamento."

        };

    }


    if (
        razao <= 1
    ) {

        return {

            codigo:
                "limite",

            status:
                "Margem pequena",

            nivel:
                "atencao",

            mensagem:
                "O planejamento cabe no prazo, mas com pouca margem para imprevistos."

        };

    }


    if (
        razao <= 1.15
    ) {

        return {

            codigo:
                "atraso-moderado",

            status:
                "Capacidade insuficiente",

            nivel:
                "alerta",

            mensagem:
                "Será necessário aumentar a disponibilidade para concluir o conteúdo no prazo."

        };

    }


    return {

        codigo:
            "risco-alto",

        status:
            "Risco de prazo",

        nivel:
            "critico",

        mensagem:
            "A disponibilidade configurada é insuficiente para o prazo atual."

    };

}


// =====================================
// DIAGNOSTICAR RITMO REAL
// =====================================
//
// Pergunta:
//
// "No ritmo que estou REALMENTE estudando,
// estou acompanhando o ritmo necessário?"

function diagnosticarRitmoRealPlanejamento(
    ritmoReal,
    ritmoNecessario,
    diasConsiderados
) {

    if (
        ritmoNecessario <= 0
    ) {

        return {

            codigo:
                "sem-meta",

            status:
                "Sem meta de ritmo",

            nivel:
                "neutro",

            mensagem:
                "Não há carga semanal pendente para comparação."

        };

    }


    // No início da preparação ainda existe
    // pouca amostra para afirmar tendência.

    if (
        diasConsiderados < 3
    ) {

        return {

            codigo:
                "dados-iniciais",

            status:
                "Coletando dados",

            nivel:
                "neutro",

            mensagem:
                "Ainda há poucos dias de estudo registrados para avaliar o ritmo real."

        };

    }


    const razao =
        ritmoReal /
        ritmoNecessario;


    if (
        razao >= 1.20
    ) {

        return {

            codigo:
                "acima-do-ritmo",

            status:
                "Acima do ritmo",

            nivel:
                "excelente",

            mensagem:
                "O ritmo real de estudo está acima do necessário."

        };

    }


    if (
        razao >= 1.00
    ) {

        return {

            codigo:
                "no-ritmo",

            status:
                "No ritmo",

            nivel:
                "adequado",

            mensagem:
                "O ritmo real de estudo é suficiente para acompanhar o planejamento."

        };

    }


    if (
        razao >= 0.85
    ) {

        return {

            codigo:
                "ligeiramente-abaixo",

            status:
                "Pouco abaixo do ritmo",

            nivel:
                "atencao",

            mensagem:
                "O ritmo observado está ligeiramente abaixo do necessário."

        };

    }


    if (
        razao >= 0.65
    ) {

        return {

            codigo:
                "abaixo-do-ritmo",

            status:
                "Abaixo do ritmo",

            nivel:
                "alerta",

            mensagem:
                "O ritmo real está abaixo do necessário e merece correção."

        };

    }


    return {

        codigo:
            "ritmo-critico",

        status:
            "Ritmo insuficiente",

        nivel:
            "critico",

        mensagem:
            "O ritmo real está significativamente abaixo da carga necessária."

    };

}


// =====================================
// CALCULAR PLANEJAMENTO
// =====================================

function calcularPlanejamento() {

    const hoje =
        obterHojePlanejamento();


    const inicio =
        criarDataPlanejamento(
            configuracaoEstudo.inicio
        );


    const prova =
        criarDataPlanejamento(
            configuracaoEstudo.prova
        );


    const fimConteudo =
        criarDataPlanejamento(

            configuracaoEstudo
                .fases
                ?.conteudo
                ?.fim ||

            configuracaoEstudo.prova

        );


    // =================================
    // PERÍODO TOTAL
    // =================================

    const semanasTotais =
        (
            inicio &&
            prova
        )
            ? diferencaSemanasPlanejamento(
                inicio,
                prova
            )
            : 0;


    // =================================
    // CAPACIDADE
    // =================================

    const horasSemanaTeoricas =
        calcularHorasSemanaPlanejamento();


    const horasSemanaReais =
        calcularHorasSemanaRealPlanejamento();


    const horasTotaisTeoricas =
        semanasTotais *
        horasSemanaTeoricas;


    // =================================
    // FASE
    // =================================

    const faseAtual =
        identificarFasePlanejamento(
            hoje
        );


    // =================================
    // CARGA DO CONTEÚDO
    // =================================

    const carga =
        analisarCargaConteudoPlanejamento();


    // =================================
    // PRAZO DA FASE DE CONTEÚDO
    // =================================

    let dataReferenciaPrazo =
        hoje;


    if (
        inicio &&
        hoje < inicio
    ) {

        dataReferenciaPrazo =
            inicio;

    }


    const semanasRestantesConteudo =
        (
            fimConteudo &&
            dataReferenciaPrazo <
                fimConteudo
        )
            ? diferencaSemanasPlanejamento(

                dataReferenciaPrazo,

                fimConteudo

            )
            : 0;


    const horasDisponiveisConteudo =
        semanasRestantesConteudo *
        horasSemanaReais;


    // =================================
    // RITMO NECESSÁRIO
    // =================================

    let horasNecessariasSemana =
        0;


    if (
        carga.horasRestantesEstimadas > 0 &&
        semanasRestantesConteudo > 0
    ) {

        horasNecessariasSemana =

            carga.horasRestantesEstimadas /
            semanasRestantesConteudo;

    }


    // =================================
    // MARGEM TEÓRICA
    // =================================

    const margemSemanal =
        horasSemanaReais -
        horasNecessariasSemana;


    const saldoHorasPeriodo =
        horasDisponiveisConteudo -
        carga.horasRestantesEstimadas;


    // =================================
    // PROGRESSO TEMPORAL
    // =================================

    const progressoEsperado =
        calcularProgressoEsperadoPlanejamento(
            hoje
        );


    const progressoReal =
        carga.progressoPonderado;


    const desvioProgresso =
        progressoReal -
        progressoEsperado;


    // =================================
    // RITMO REAL — POMODORO
    // =================================

    const ritmo7 =
        analisarRitmoRealPlanejamento(
            7,
            hoje
        );


    const ritmo14 =
        analisarRitmoRealPlanejamento(
            14,
            hoje
        );


    const ritmo30 =
        analisarRitmoRealPlanejamento(
            30,
            hoje
        );


    // O período de 7 dias representa
    // a situação mais recente.

    const ritmoSemanalAtual =
        ritmo7.ritmoSemanal;


    // 14 dias dá maior estabilidade.

    const ritmoSemanal14Dias =
        ritmo14.ritmoSemanal;


    // 30 dias mede tendência estrutural.

    const ritmoSemanal30Dias =
        ritmo30.ritmoSemanal;


    // =================================
    // SALDO DO RITMO REAL
    // =================================

    const saldoRitmoRealSemana =

        ritmoSemanalAtual -
        horasNecessariasSemana;


    // =================================
    // TAXA DE CUMPRIMENTO DA META
    // =================================

    let percentualMetaRitmo =
        0;


    if (
        horasNecessariasSemana > 0
    ) {

        percentualMetaRitmo =

            (
                ritmoSemanalAtual /
                horasNecessariasSemana
            ) *
            100;

    }


    // =================================
    // DIAGNÓSTICO DE CAPACIDADE
    // =================================

    const diagnosticoPrazo =
        diagnosticarPrazoPlanejamento(

            horasNecessariasSemana,

            horasSemanaReais,

            carga.horasRestantesEstimadas

        );


    // =================================
    // DIAGNÓSTICO DO RITMO REAL
    // =================================

    const diagnosticoRitmo =
        diagnosticarRitmoRealPlanejamento(

            ritmoSemanalAtual,

            horasNecessariasSemana,

            ritmo7.diasConsiderados

        );


    // =================================
    // % DA DISPONIBILIDADE NECESSÁRIA
    // =================================

    let percentualDisponibilidadeNecessaria =
        0;


    if (
        horasSemanaReais > 0
    ) {

        percentualDisponibilidadeNecessaria =

            (
                horasNecessariasSemana /
                horasSemanaReais
            ) *
            100;

    }


    // =================================
    // RESULTADO
    // =================================

    return {


        // =============================
        // COMPATIBILIDADE
        // =============================

        semanasDisponiveis:
            Math.max(
                0,
                Math.floor(
                    semanasTotais
                )
            ),


        horasPorSemana:
            arredondarPlanejamento(
                horasSemanaTeoricas,
                1
            ),


        horasTotais:
            arredondarPlanejamento(
                horasTotaisTeoricas,
                1
            ),


        dataInicio:
            configuracaoEstudo.inicio,


        dataProva:
            configuracaoEstudo.prova,


        // =============================
        // TEMPORAL
        // =============================

        dataAtual:
            formatarDataLocalPlanejamento(
                hoje
            ),


        faseAtual:
            faseAtual,


        nomeFaseAtual:
            obterNomeFasePlanejamento(
                faseAtual
            ),


        dataFimConteudo:
            configuracaoEstudo
                .fases
                ?.conteudo
                ?.fim ||
            configuracaoEstudo.prova,


        semanasRestantesConteudo:
            arredondarPlanejamento(
                semanasRestantesConteudo,
                1
            ),


        // =============================
        // CAPACIDADE
        // =============================

        horasSemanaTeoricas:
            arredondarPlanejamento(
                horasSemanaTeoricas,
                1
            ),


        horasSemanaReais:
            arredondarPlanejamento(
                horasSemanaReais,
                1
            ),


        horasDisponiveisConteudo:
            arredondarPlanejamento(
                horasDisponiveisConteudo,
                1
            ),


        // =============================
        // CONTEÚDO
        // =============================

        horasPrevistasConteudo:
            carga.horasPrevistasTotal,


        horasCumpridasEstimadas:
            carga.horasCumpridasEstimadas,


        horasRestantesConteudo:
            carga.horasRestantesEstimadas,


        quantidadeAssuntos:
            carga.quantidadeAssuntos,


        assuntosConcluidos:
            carga.assuntosConcluidos,


        // =============================
        // RITMO NECESSÁRIO
        // =============================

        horasNecessariasSemana:
            arredondarPlanejamento(
                horasNecessariasSemana,
                1
            ),


        margemSemanal:
            arredondarPlanejamento(
                margemSemanal,
                1
            ),


        saldoHorasPeriodo:
            arredondarPlanejamento(
                saldoHorasPeriodo,
                1
            ),


        percentualDisponibilidadeNecessaria:
            arredondarPlanejamento(
                percentualDisponibilidadeNecessaria,
                1
            ),


        // =============================
        // RITMO REAL
        // =============================

        ritmoReal7Dias:
            arredondarPlanejamento(
                ritmoSemanalAtual,
                1
            ),


        ritmoReal14Dias:
            arredondarPlanejamento(
                ritmoSemanal14Dias,
                1
            ),


        ritmoReal30Dias:
            arredondarPlanejamento(
                ritmoSemanal30Dias,
                1
            ),


        horasEstudadas7Dias:
            arredondarPlanejamento(
                ritmo7.horasTotal,
                1
            ),


        horasEstudadas14Dias:
            arredondarPlanejamento(
                ritmo14.horasTotal,
                1
            ),


        horasEstudadas30Dias:
            arredondarPlanejamento(
                ritmo30.horasTotal,
                1
            ),


        diasComEstudo7Dias:
            ritmo7.diasComEstudo,


        diasComEstudo14Dias:
            ritmo14.diasComEstudo,


        diasComEstudo30Dias:
            ritmo30.diasComEstudo,


        diasConsideradosRitmo7:
            ritmo7.diasConsiderados,


        mediaHorasDia7:
            arredondarPlanejamento(
                ritmo7.mediaHorasDia,
                2
            ),


        mediaHorasDiaEstudado7:
            arredondarPlanejamento(
                ritmo7.mediaHorasDiaEstudado,
                2
            ),


        blocosPomodoro7Dias:
            ritmo7.blocos,


        blocosCompletos7Dias:
            ritmo7.blocosCompletos,


        saldoRitmoRealSemana:
            arredondarPlanejamento(
                saldoRitmoRealSemana,
                1
            ),


        percentualMetaRitmo:
            arredondarPlanejamento(
                percentualMetaRitmo,
                1
            ),


        // =============================
        // PROGRESSO
        // =============================

        progressoEsperado:
            arredondarPlanejamento(
                progressoEsperado,
                1
            ),


        progressoReal:
            arredondarPlanejamento(
                progressoReal,
                1
            ),


        desvioProgresso:
            arredondarPlanejamento(
                desvioProgresso,
                1
            ),


        // =============================
        // DIAGNÓSTICO DE CAPACIDADE
        // =============================
        //
        // Mantemos estes nomes para
        // compatibilidade com o motor v3.3.

        situacaoPrazo:
            diagnosticoPrazo.status,


        codigoSituacaoPrazo:
            diagnosticoPrazo.codigo,


        nivelSituacaoPrazo:
            diagnosticoPrazo.nivel,


        mensagemSituacaoPrazo:
            diagnosticoPrazo.mensagem,


        // =============================
        // DIAGNÓSTICO DO RITMO REAL
        // =============================

        situacaoRitmoReal:
            diagnosticoRitmo.status,


        codigoSituacaoRitmoReal:
            diagnosticoRitmo.codigo,


        nivelSituacaoRitmoReal:
            diagnosticoRitmo.nivel,


        mensagemSituacaoRitmoReal:
            diagnosticoRitmo.mensagem,


        // =============================
        // DETALHES DE RITMO
        // =============================

        ritmoDetalhado: {

            ultimos7Dias:
                ritmo7,

            ultimos14Dias:
                ritmo14,

            ultimos30Dias:
                ritmo30

        },


        // =============================
        // DISCIPLINAS
        // =============================

        disciplinas:
            carga.porDisciplina

    };

}


// =====================================
// DEBUG
// =====================================

console.log(
    "CÁLCULO DO PLANEJAMENTO PSCPP v2.1 CARREGADO"
);


// =====================================
// FIM
// =====================================
