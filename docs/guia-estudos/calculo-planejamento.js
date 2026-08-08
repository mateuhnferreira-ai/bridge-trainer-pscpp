// =====================================
// CÁLCULO DO PLANEJAMENTO PSCPP v2.0
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Calcular disponibilidade total.
// 2. Identificar a fase atual do plano.
// 3. Calcular horas previstas no conteúdo.
// 4. Estimar horas já cumpridas pelo progresso.
// 5. Calcular horas restantes.
// 6. Calcular semanas úteis restantes.
// 7. Determinar carga semanal necessária.
// 8. Comparar disponibilidade × necessidade.
// 9. Detectar adiantamento ou atraso.
// 10. Produzir diagnóstico de prazo.
//
// IMPORTANTE:
//
// O cálculo NÃO escolhe o próximo assunto.
//
// Ele responde:
//
// "Quanto ainda preciso estudar e
//  em que ritmo preciso avançar?"
//
// O motor-planejamento.js responde:
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


// =====================================
// CRIAR DATA LOCAL SEGURA
// =====================================
//
// Evita diferenças indesejadas de fuso
// ao interpretar datas YYYY-MM-DD.

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


    return dias / 7;

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
// HORAS REAIS POR SEMANA
// =====================================
//
// Aplica a margem de segurança.
//
// Exemplo:
//
// 10 h teóricas × 0,90
// = 9 h consideradas realmente
// disponíveis para o planejamento.

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
// IDENTIFICAR FASE ATUAL
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
// OBTER PROGRESSO DE UMA AULA
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
// ANALISAR CARGA TOTAL DO CONTEÚDO
// =====================================
//
// Usa:
//
// horas previstas × progresso percentual.
//
// Exemplo:
//
// Aula prevista: 20 horas
// Progresso: 25%
//
// Horas equivalentes cumpridas:
// 5 horas
//
// Horas equivalentes restantes:
// 15 horas

function analisarCargaConteudoPlanejamento() {

    let horasPrevistasTotal = 0;

    let horasCumpridasEstimadas = 0;

    let horasRestantesEstimadas = 0;

    let quantidadeAssuntos = 0;

    let assuntosConcluidos = 0;


    const porDisciplina = {};


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        return {

            horasPrevistasTotal: 0,

            horasCumpridasEstimadas: 0,

            horasRestantesEstimadas: 0,

            progressoPonderado: 0,

            quantidadeAssuntos: 0,

            assuntosConcluidos: 0,

            porDisciplina: {}

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


    horasRestantesEstimadas =
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
// CALCULAR PROGRESSO ESPERADO
// =====================================
//
// Mede quanto da fase de conteúdo
// deveria ter transcorrido até hoje.
//
// Não representa nota.
//
// É apenas a curva temporal esperada.

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
// DIAGNOSTICAR SITUAÇÃO DO PRAZO
// =====================================

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
                "O ritmo disponível oferece boa margem para concluir o conteúdo."

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
                "O plano ainda cabe no prazo, mas com pouca margem para imprevistos."

        };

    }


    if (
        razao <= 1.15
    ) {

        return {

            codigo:
                "atraso-moderado",

            status:
                "Ritmo insuficiente",

            nivel:
                "alerta",

            mensagem:
                "Será necessário recuperar carga de estudo para terminar o conteúdo no prazo."

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
            "A disponibilidade configurada é insuficiente para concluir o conteúdo no prazo atual."

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
    // COMPATIBILIDADE COM SISTEMA ANTIGO
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


    const horasSemanaTeoricas =
        calcularHorasSemanaPlanejamento();


    const horasSemanaReais =
        calcularHorasSemanaRealPlanejamento();


    const horasTotaisTeoricas =
        semanasTotais *
        horasSemanaTeoricas;


    // =================================
    // FASE ATUAL
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
    // TEMPO RESTANTE PARA CONTEÚDO
    // =================================

    let dataReferenciaPrazo =
        hoje;


    // Antes do início oficial,
    // usa a própria data inicial.

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
    // CARGA SEMANAL NECESSÁRIA
    // =================================

    let horasNecessariasSemana =
        0;


    if (
        carga.horasRestantesEstimadas >
            0 &&
        semanasRestantesConteudo >
            0
    ) {

        horasNecessariasSemana =

            carga.horasRestantesEstimadas /
            semanasRestantesConteudo;

    }


    // =================================
    // MARGEM SEMANAL
    // =================================

    const margemSemanal =
        horasSemanaReais -
        horasNecessariasSemana;


    // =================================
    // SALDO TOTAL DE HORAS
    // =================================

    const saldoHorasPeriodo =
        horasDisponiveisConteudo -
        carga.horasRestantesEstimadas;


    // =================================
    // PROGRESSO ESPERADO × REAL
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
    // DIAGNÓSTICO
    // =================================

    const diagnostico =
        diagnosticarPrazoPlanejamento(

            horasNecessariasSemana,

            horasSemanaReais,

            carga.horasRestantesEstimadas

        );


    // =================================
    // RITMO NECESSÁRIO
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
        // CAMPOS ANTIGOS
        // Mantidos por compatibilidade
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
        // NOVA CAMADA TEMPORAL
        // =============================

        dataAtual:
            hoje
                .toISOString()
                .slice(
                    0,
                    10
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
        // DISPONIBILIDADE
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
        // CARGA DO PROGRAMA
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
        // RITMO
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
        // PROGRESSO TEMPORAL
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
        // DIAGNÓSTICO
        // =============================

        situacaoPrazo:
            diagnostico.status,


        codigoSituacaoPrazo:
            diagnostico.codigo,


        nivelSituacaoPrazo:
            diagnostico.nivel,


        mensagemSituacaoPrazo:
            diagnostico.mensagem,


        // =============================
        // DETALHAMENTO
        // =============================

        disciplinas:
            carga.porDisciplina

    };

}


// =====================================
// DEBUG OPCIONAL
// =====================================

console.log(
    "CÁLCULO DO PLANEJAMENTO PSCPP v2.0 CARREGADO"
);


// =====================================
// FIM
// =====================================
