/* =====================================================
   BRIDGE TRAINER PSCPP
   POMODORO.JS v3.1

   Ciclo:
   - 30 minutos de estudo
   - 10 minutos de pausa

   Funções:

   - contador de estudo
   - pausa automática
   - apito nas transições
   - tempo cumulativo por disciplina
   - registro por aula
   - histórico detalhado de blocos
   - identificação do último bloco estudado
   - evento para atualização do planejamento

   NOVO v3.1:

   - resumo diário permanente
   - horas reais por dia
   - horas reais por disciplina
   - consulta de ritmo em 7, 14 e 30 dias
   - média diária
   - ritmo semanal equivalente
   - quantidade de dias efetivamente estudados
   - migração automática do histórico v3.0
     para o resumo diário
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

const POMODORO_DURACAO_ESTUDO_SEGUNDOS =
    30 * 60;


const POMODORO_DURACAO_PAUSA_SEGUNDOS =
    10 * 60;


// Histórico detalhado

const CHAVE_HISTORICO_POMODORO =
    "bridgeTrainerPSCPP_historicoPomodoro";


// Resumo diário permanente

const CHAVE_RESUMO_DIARIO_POMODORO =
    "bridgeTrainerPSCPP_resumoDiarioPomodoro";


// Mantemos somente os últimos blocos
// detalhados.
//
// O resumo diário NÃO possui este limite.

const POMODORO_MAX_HISTORICO =
    500;


// =====================================
// ESTADO
// =====================================

let pomodoroRodando =
    false;


// "estudo" ou "pausa"

let pomodoroFase =
    "estudo";


let pomodoroSegundosFaseAtual =
    0;


let pomodoroSegundosEstudoNaoSalvos =
    0;


let pomodoroSegundosSessaoEstudoTotal =
    0;


let pomodoroIntervalId =
    null;


// Data/hora do início do bloco atual

let pomodoroInicioBloco =
    null;


// Tempo acumulado no bloco atual

let pomodoroSegundosBlocoAtual =
    0;


// =====================================
// IDENTIFICAR DISCIPLINA
// =====================================

function obterDisciplinaDoPomodoro() {

    if (!document.body) {

        return null;

    }


    return (
        document.body.dataset.disciplina ||
        null
    );

}


// =====================================
// IDENTIFICAR AULA
// =====================================

function obterAulaDoPomodoro() {

    if (!document.body) {

        return null;

    }


    return (
        document.body.dataset.aula ||
        null
    );

}


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================

function normalizarIdPomodoro(
    valor
) {

    if (!valor) {

        return null;

    }


    if (
        typeof normalizarIdentificador ===
        "function"
    ) {

        return normalizarIdentificador(
            valor
        );

    }


    return valor
        .toString()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );

}


// =====================================
// OBTER CONTEXTO
// =====================================

function obterContextoPomodoro() {

    return {

        disciplina:
            normalizarIdPomodoro(
                obterDisciplinaDoPomodoro()
            ),

        aula:
            normalizarIdPomodoro(
                obterAulaDoPomodoro()
            )

    };

}


// =====================================
// DATA LOCAL YYYY-MM-DD
// =====================================
//
// Não utiliza toISOString().slice(0,10),
// porque isso poderia mudar o dia por
// causa do fuso horário.

function obterDataLocalPomodoro(
    data = new Date()
) {

    const objetoData =
        data instanceof Date
            ? data
            : new Date(data);


    if (
        Number.isNaN(
            objetoData.getTime()
        )
    ) {

        return null;

    }


    const ano =
        objetoData.getFullYear();


    const mes =
        String(
            objetoData.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );


    const dia =
        String(
            objetoData.getDate()
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
// TOCAR APITO
// =====================================

function tocarApitoPomodoro(
    tipo
) {

    try {

        const contexto =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        const frequencias =
            (
                tipo === "retorno"
            )
                ? [
                    660,
                    880,
                    1046
                ]
                : [
                    1046,
                    880,
                    660
                ];


        frequencias.forEach(
            (
                frequencia,
                indice
            ) => {

                const oscilador =
                    contexto
                        .createOscillator();


                const ganho =
                    contexto
                        .createGain();


                oscilador.type =
                    "square";


                oscilador
                    .frequency
                    .value =
                    frequencia;


                const inicio =
                    contexto.currentTime +
                    indice * 0.3;


                const fim =
                    inicio + 0.25;


                ganho.gain
                    .setValueAtTime(
                        0.15,
                        inicio
                    );


                ganho.gain
                    .exponentialRampToValueAtTime(
                        0.001,
                        fim
                    );


                oscilador.connect(
                    ganho
                );


                ganho.connect(
                    contexto.destination
                );


                oscilador.start(
                    inicio
                );


                oscilador.stop(
                    fim
                );

            }
        );

    }
    catch (erro) {

        console.warn(
            "Não foi possível tocar o apito:",
            erro
        );

    }

}


// =====================================
// FORMATAR TEMPO
// =====================================

function formatarTempoPomodoro(
    segundosTotais
) {

    const total =
        Math.max(
            0,
            Math.floor(
                segundosTotais
            )
        );


    const horas =
        Math.floor(
            total / 3600
        );


    const minutos =
        Math.floor(
            (
                total % 3600
            ) /
            60
        );


    const segundos =
        total % 60;


    const doisDigitos =
        numero =>
            String(
                numero
            )
            .padStart(
                2,
                "0"
            );


    if (
        horas > 0
    ) {

        return (
            horas +
            ":" +
            doisDigitos(
                minutos
            ) +
            ":" +
            doisDigitos(
                segundos
            )
        );

    }


    return (
        doisDigitos(
            minutos
        ) +
        ":" +
        doisDigitos(
            segundos
        )
    );

}


// =====================================
// CARREGAR HISTÓRICO DETALHADO
// =====================================

function carregarHistoricoPomodoro() {

    try {

        const salvo =
            localStorage.getItem(
                CHAVE_HISTORICO_POMODORO
            );


        if (!salvo) {

            return [];

        }


        const dados =
            JSON.parse(
                salvo
            );


        return Array.isArray(
            dados
        )
            ? dados
            : [];

    }
    catch (erro) {

        console.warn(
            "Erro ao carregar histórico Pomodoro:",
            erro
        );


        return [];

    }

}


// =====================================
// SALVAR HISTÓRICO DETALHADO
// =====================================

function salvarHistoricoPomodoro(
    historico
) {

    try {

        let dados =
            Array.isArray(
                historico
            )
                ? historico
                : [];


        if (
            dados.length >
            POMODORO_MAX_HISTORICO
        ) {

            dados =
                dados.slice(
                    -POMODORO_MAX_HISTORICO
                );

        }


        localStorage.setItem(

            CHAVE_HISTORICO_POMODORO,

            JSON.stringify(
                dados
            )

        );

    }
    catch (erro) {

        console.warn(
            "Erro ao salvar histórico Pomodoro:",
            erro
        );

    }

}


// =====================================
// CRIAR RESUMO DIÁRIO INICIAL
// =====================================

function criarResumoDiarioInicialPomodoro() {

    return {

        versao:
            "1.0",

        ultimaAtualizacao:
            null,

        dias:
            {}

    };

}


// =====================================
// CARREGAR RESUMO DIÁRIO
// =====================================

function carregarResumoDiarioPomodoro() {

    try {

        const salvo =
            localStorage.getItem(
                CHAVE_RESUMO_DIARIO_POMODORO
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
            typeof dados !== "object"
        ) {

            return null;

        }


        if (!dados.dias) {

            dados.dias = {};

        }


        return dados;

    }
    catch (erro) {

        console.warn(
            "Erro ao carregar resumo diário Pomodoro:",
            erro
        );


        return null;

    }

}


// =====================================
// SALVAR RESUMO DIÁRIO
// =====================================

function salvarResumoDiarioPomodoro(
    resumo
) {

    try {

        if (
            !resumo ||
            typeof resumo !== "object"
        ) {

            return;

        }


        resumo.versao =
            "1.0";


        resumo.ultimaAtualizacao =
            new Date()
                .toISOString();


        localStorage.setItem(

            CHAVE_RESUMO_DIARIO_POMODORO,

            JSON.stringify(
                resumo
            )

        );

    }
    catch (erro) {

        console.warn(
            "Erro ao salvar resumo diário Pomodoro:",
            erro
        );

    }

}


// =====================================
// GARANTIR REGISTRO DO DIA
// =====================================

function garantirDiaResumoPomodoro(
    resumo,
    data
) {

    if (
        !resumo.dias[
            data
        ]
    ) {

        resumo.dias[
            data
        ] = {

            segundosTotal:
                0,

            blocos:
                0,

            blocosCompletos:
                0,

            disciplinas:
                {}

        };

    }


    return resumo.dias[
        data
    ];

}


// =====================================
// GARANTIR DISCIPLINA NO DIA
// =====================================

function garantirDisciplinaResumoPomodoro(
    dia,
    idDisciplina
) {

    if (
        !dia.disciplinas[
            idDisciplina
        ]
    ) {

        dia.disciplinas[
            idDisciplina
        ] = {

            segundos:
                0,

            blocos:
                0,

            blocosCompletos:
                0,

            aulas:
                {}

        };

    }


    return dia.disciplinas[
        idDisciplina
    ];

}


// =====================================
// SOMAR BLOCO AO RESUMO DIÁRIO
// =====================================

function adicionarBlocoAoResumoDiarioPomodoro(
    resumo,
    bloco
) {

    if (
        !resumo ||
        !bloco ||
        !bloco.disciplina ||
        !bloco.segundos
    ) {

        return;

    }


    const segundos =
        Math.max(
            0,
            Number(
                bloco.segundos
            ) || 0
        );


    if (
        segundos <= 0
    ) {

        return;

    }


    const data =
        obterDataLocalPomodoro(
            bloco.fim ||
            bloco.inicio ||
            new Date()
        );


    if (!data) {

        return;

    }


    const dia =
        garantirDiaResumoPomodoro(
            resumo,
            data
        );


    const disciplina =
        garantirDisciplinaResumoPomodoro(

            dia,

            bloco.disciplina

        );


    const blocoCompleto =

        bloco.motivo ===
            "bloco-concluido" &&

        segundos >=
            POMODORO_DURACAO_ESTUDO_SEGUNDOS;


    // =============================
    // TOTAL DO DIA
    // =============================

    dia.segundosTotal +=
        segundos;


    dia.blocos++;


    if (
        blocoCompleto
    ) {

        dia.blocosCompletos++;

    }


    // =============================
    // TOTAL DA DISCIPLINA
    // =============================

    disciplina.segundos +=
        segundos;


    disciplina.blocos++;


    if (
        blocoCompleto
    ) {

        disciplina.blocosCompletos++;

    }


    // =============================
    // TOTAL DA AULA
    // =============================

    if (
        bloco.aula
    ) {

        if (
            !disciplina.aulas[
                bloco.aula
            ]
        ) {

            disciplina.aulas[
                bloco.aula
            ] = {

                segundos:
                    0,

                blocos:
                    0,

                blocosCompletos:
                    0

            };

        }


        const aula =
            disciplina.aulas[
                bloco.aula
            ];


        aula.segundos +=
            segundos;


        aula.blocos++;


        if (
            blocoCompleto
        ) {

            aula.blocosCompletos++;

        }

    }

}


// =====================================
// REGISTRAR BLOCO NO RESUMO DIÁRIO
// =====================================

function registrarBlocoResumoDiarioPomodoro(
    bloco
) {

    let resumo =
        carregarResumoDiarioPomodoro();


    if (!resumo) {

        resumo =
            criarResumoDiarioInicialPomodoro();

    }


    adicionarBlocoAoResumoDiarioPomodoro(

        resumo,

        bloco

    );


    salvarResumoDiarioPomodoro(
        resumo
    );

}


// =====================================
// MIGRAR HISTÓRICO v3.0
// PARA RESUMO DIÁRIO
// =====================================
//
// Executada apenas quando ainda não
// existe um resumo diário.
//
// Assim os blocos antigos disponíveis
// no histórico detalhado não são perdidos.
//
// Não ocorre duplicação porque, depois
// da primeira criação, o resumo passa a
// existir no localStorage.

function migrarHistoricoParaResumoDiarioPomodoro() {

    const existente =
        carregarResumoDiarioPomodoro();


    if (
        existente
    ) {

        return existente;

    }


    const resumo =
        criarResumoDiarioInicialPomodoro();


    const historico =
        carregarHistoricoPomodoro();


    historico.forEach(
        bloco => {

            adicionarBlocoAoResumoDiarioPomodoro(

                resumo,

                bloco

            );

        }
    );


    salvarResumoDiarioPomodoro(
        resumo
    );


    console.log(

        "Resumo diário Pomodoro criado a partir de " +
        historico.length +
        " bloco(s) do histórico existente."

    );


    return resumo;

}


// =====================================
// REGISTRAR BLOCO DE ESTUDO
// =====================================

function registrarBlocoPomodoro(
    segundos,
    motivo = "registro"
) {

    if (
        !segundos ||
        segundos <= 0
    ) {

        return null;

    }


    const contexto =
        obterContextoPomodoro();


    if (
        !contexto.disciplina
    ) {

        console.warn(
            "Bloco Pomodoro não registrado: " +
            "data-disciplina ausente."
        );


        return null;

    }


    const fim =
        new Date();


    const inicio =
        pomodoroInicioBloco
            ? new Date(
                pomodoroInicioBloco
            )
            : new Date(
                fim.getTime() -
                segundos * 1000
            );


    const bloco = {

        id:
            "pomodoro-" +
            fim.getTime(),

        disciplina:
            contexto.disciplina,

        aula:
            contexto.aula,

        segundos:
            Math.floor(
                segundos
            ),

        inicio:
            inicio.toISOString(),

        fim:
            fim.toISOString(),

        motivo:
            motivo

    };


    // =============================
    // HISTÓRICO DETALHADO
    // =============================

    const historico =
        carregarHistoricoPomodoro();


    historico.push(
        bloco
    );


    salvarHistoricoPomodoro(
        historico
    );


    // =============================
    // RESUMO DIÁRIO PERMANENTE
    // =============================

    registrarBlocoResumoDiarioPomodoro(
        bloco
    );


    // =============================
    // EVENTO
    // =============================

    document.dispatchEvent(

        new CustomEvent(

            "pomodoroPSCPPBlocoRegistrado",

            {

                detail:
                    bloco

            }

        )

    );


    return bloco;

}


// =====================================
// OBTER ÚLTIMO BLOCO
// =====================================

function obterUltimoBlocoPomodoro() {

    const historico =
        carregarHistoricoPomodoro();


    if (
        historico.length === 0
    ) {

        return null;

    }


    return (
        historico[
            historico.length - 1
        ] ||
        null
    );

}


// =====================================
// OBTER ÚLTIMOS BLOCOS
// =====================================

function obterUltimosBlocosPomodoro(
    quantidade = 10
) {

    const historico =
        carregarHistoricoPomodoro();


    return historico.slice(

        -Math.max(
            1,
            quantidade
        )

    );

}


// =====================================
// TEMPO POR AULA NO HISTÓRICO
// =====================================

function obterTempoEstudadoAulaPomodoro(
    idDisciplina,
    idAula
) {

    const disciplina =
        normalizarIdPomodoro(
            idDisciplina
        );


    const aula =
        normalizarIdPomodoro(
            idAula
        );


    let total =
        0;


    carregarHistoricoPomodoro()
        .forEach(
            bloco => {

                if (
                    bloco.disciplina ===
                        disciplina &&
                    bloco.aula ===
                        aula
                ) {

                    total +=
                        Number(
                            bloco.segundos
                        ) || 0;

                }

            }
        );


    return total;

}


// =====================================
// CRIAR DATA DE INÍCIO DO PERÍODO
// =====================================

function obterInicioPeriodoPomodoro(
    dias
) {

    const quantidadeDias =
        Math.max(
            1,
            Number(
                dias
            ) || 1
        );


    const inicio =
        new Date();


    inicio.setHours(
        0,
        0,
        0,
        0
    );


    inicio.setDate(

        inicio.getDate() -
        (
            quantidadeDias -
            1
        )

    );


    return inicio;

}


// =====================================
// CONVERTER YYYY-MM-DD EM DATA LOCAL
// =====================================

function converterDataResumoPomodoro(
    valor
) {

    const partes =
        String(
            valor || ""
        )
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
// OBTER RESUMO DE UM PERÍODO
// =====================================
//
// Exemplos:
//
// obterResumoPeriodoPomodoro(7)
// obterResumoPeriodoPomodoro(14)
// obterResumoPeriodoPomodoro(30)
//
// Retorna:
//
// - horas totais
// - média diária
// - ritmo semanal equivalente
// - dias estudados
// - disciplinas estudadas
// - blocos completos
// - distribuição do tempo

function obterResumoPeriodoPomodoro(
    dias = 7
) {

    const quantidadeDias =
        Math.max(
            1,
            Number(
                dias
            ) || 1
        );


    const resumo =
        carregarResumoDiarioPomodoro();


    const resultado = {

        periodoDias:
            quantidadeDias,

        segundosTotal:
            0,

        horasTotal:
            0,

        diasComEstudo:
            0,

        mediaHorasPorDia:
            0,

        mediaHorasPorDiaEstudado:
            0,

        ritmoSemanalHoras:
            0,

        blocos:
            0,

        blocosCompletos:
            0,

        disciplinas:
            {}

    };


    if (
        !resumo ||
        !resumo.dias
    ) {

        return resultado;

    }


    const inicio =
        obterInicioPeriodoPomodoro(
            quantidadeDias
        );


    const hoje =
        new Date();


    hoje.setHours(
        23,
        59,
        59,
        999
    );


    Object.entries(
        resumo.dias
    ).forEach(

        ([dataTexto, dia]) => {

            const data =
                converterDataResumoPomodoro(
                    dataTexto
                );


            if (
                !data ||
                data < inicio ||
                data > hoje
            ) {

                return;

            }


            const segundosDia =
                Number(
                    dia.segundosTotal
                ) || 0;


            if (
                segundosDia > 0
            ) {

                resultado
                    .diasComEstudo++;

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
                                    0,

                                blocos:
                                    0,

                                blocosCompletos:
                                    0

                            };

                    }


                    const destino =
                        resultado
                            .disciplinas[
                                idDisciplina
                            ];


                    destino.segundos +=
                        Number(
                            dadosDisciplina
                                .segundos
                        ) || 0;


                    destino.blocos +=
                        Number(
                            dadosDisciplina
                                .blocos
                        ) || 0;


                    destino.blocosCompletos +=
                        Number(
                            dadosDisciplina
                                .blocosCompletos
                        ) || 0;

                }

            );

        }

    );


    // =================================
    // CONVERSÕES
    // =================================

    resultado.horasTotal =

        resultado.segundosTotal /
        3600;


    resultado.mediaHorasPorDia =

        resultado.horasTotal /
        quantidadeDias;


    if (
        resultado.diasComEstudo > 0
    ) {

        resultado.mediaHorasPorDiaEstudado =

            resultado.horasTotal /
            resultado.diasComEstudo;

    }


    // Ritmo semanal equivalente:
    //
    // média diária do período × 7.

    resultado.ritmoSemanalHoras =

        resultado.mediaHorasPorDia *
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
// RITMO REAL DOS ÚLTIMOS 7 DIAS
// =====================================

function obterRitmoSemanalRealPomodoro() {

    return (
        obterResumoPeriodoPomodoro(
            7
        )
        .ritmoSemanalHoras
    );

}


// =====================================
// RITMO DOS ÚLTIMOS 14 DIAS
// =====================================

function obterRitmo14DiasPomodoro() {

    return (
        obterResumoPeriodoPomodoro(
            14
        )
        .ritmoSemanalHoras
    );

}


// =====================================
// RITMO DOS ÚLTIMOS 30 DIAS
// =====================================

function obterRitmo30DiasPomodoro() {

    return (
        obterResumoPeriodoPomodoro(
            30
        )
        .ritmoSemanalHoras
    );

}


// =====================================
// TEMPO TOTAL DO RESUMO DIÁRIO
// =====================================

function obterTempoTotalResumoPomodoro() {

    const resumo =
        carregarResumoDiarioPomodoro();


    if (
        !resumo ||
        !resumo.dias
    ) {

        return 0;

    }


    let total =
        0;


    Object.values(
        resumo.dias
    ).forEach(
        dia => {

            total +=
                Number(
                    dia.segundosTotal
                ) || 0;

        }
    );


    return total;

}


// =====================================
// TEMPO TOTAL DE UMA DISCIPLINA
// NO RESUMO DIÁRIO
// =====================================

function obterTempoDisciplinaResumoPomodoro(
    idDisciplina
) {

    const disciplinaAlvo =
        normalizarIdPomodoro(
            idDisciplina
        );


    if (
        !disciplinaAlvo
    ) {

        return 0;

    }


    const resumo =
        carregarResumoDiarioPomodoro();


    if (
        !resumo ||
        !resumo.dias
    ) {

        return 0;

    }


    let total =
        0;


    Object.values(
        resumo.dias
    ).forEach(
        dia => {

            const disciplina =
                dia.disciplinas
                    ?.[
                        disciplinaAlvo
                    ];


            if (
                disciplina
            ) {

                total +=
                    Number(
                        disciplina.segundos
                    ) || 0;

            }

        }
    );


    return total;

}


// =====================================
// ATUALIZAR DISPLAY
// =====================================

function atualizarDisplayPomodoro() {

    const displayFase =
        document.getElementById(
            "pomodoro-fase"
        );


    const displayRestante =
        document.getElementById(
            "pomodoro-restante"
        );


    const displaySessao =
        document.getElementById(
            "pomodoro-sessao"
        );


    const displayCumulativo =
        document.getElementById(
            "pomodoro-cumulativo"
        );


    if (
        displayFase
    ) {

        displayFase.textContent =

            (
                pomodoroFase ===
                "estudo"
            )
                ? "📖 Estudo"
                : "☕ Pausa";

    }


    if (
        displayRestante
    ) {

        const duracaoFase =

            (
                pomodoroFase ===
                "estudo"
            )
                ? POMODORO_DURACAO_ESTUDO_SEGUNDOS
                : POMODORO_DURACAO_PAUSA_SEGUNDOS;


        const restante =
            duracaoFase -
            pomodoroSegundosFaseAtual;


        displayRestante.textContent =
            formatarTempoPomodoro(
                restante
            );

    }


    if (
        displaySessao
    ) {

        displaySessao.textContent =
            formatarTempoPomodoro(
                pomodoroSegundosSessaoEstudoTotal
            );

    }


    if (
        displayCumulativo
    ) {

        const idDisciplina =
            obterDisciplinaDoPomodoro();


        const totalSegundos =

            (
                idDisciplina &&
                typeof obterTempoEstudadoDisciplina ===
                    "function"
            )
                ? obterTempoEstudadoDisciplina(
                    idDisciplina
                )
                : 0;


        displayCumulativo.textContent =
            formatarTempoPomodoro(
                totalSegundos
            );

    }

}


// =====================================
// INICIAR NOVO BLOCO
// =====================================

function iniciarNovoBlocoPomodoro() {

    pomodoroInicioBloco =
        new Date()
            .toISOString();


    pomodoroSegundosBlocoAtual =
        0;

}


// =====================================
// FINALIZAR BLOCO
// =====================================

function finalizarBlocoAtualPomodoro(
    motivo
) {

    if (
        pomodoroSegundosBlocoAtual <= 0
    ) {

        pomodoroInicioBloco =
            null;


        return;

    }


    registrarBlocoPomodoro(

        pomodoroSegundosBlocoAtual,

        motivo

    );


    pomodoroSegundosBlocoAtual =
        0;


    pomodoroInicioBloco =
        null;

}


// =====================================
// TICK
// =====================================

function tickPomodoro() {

    pomodoroSegundosFaseAtual++;


    if (
        pomodoroFase ===
        "estudo"
    ) {

        pomodoroSegundosEstudoNaoSalvos++;

        pomodoroSegundosSessaoEstudoTotal++;

        pomodoroSegundosBlocoAtual++;


        if (
            pomodoroSegundosFaseAtual >=
            POMODORO_DURACAO_ESTUDO_SEGUNDOS
        ) {

            tocarApitoPomodoro(
                "pausa"
            );


            salvarTempoAcumuladoPomodoro();


            finalizarBlocoAtualPomodoro(
                "bloco-concluido"
            );


            pomodoroFase =
                "pausa";


            pomodoroSegundosFaseAtual =
                0;

        }

    }
    else {

        if (
            pomodoroSegundosFaseAtual >=
            POMODORO_DURACAO_PAUSA_SEGUNDOS
        ) {

            tocarApitoPomodoro(
                "retorno"
            );


            pomodoroFase =
                "estudo";


            pomodoroSegundosFaseAtual =
                0;


            iniciarNovoBlocoPomodoro();

        }

    }


    atualizarDisplayPomodoro();

}


// =====================================
// INICIAR
// =====================================

function iniciarPomodoro() {

    if (
        pomodoroRodando
    ) {

        return;

    }


    pomodoroRodando =
        true;


    if (
        pomodoroFase ===
            "estudo" &&
        !pomodoroInicioBloco
    ) {

        iniciarNovoBlocoPomodoro();

    }


    pomodoroIntervalId =
        setInterval(
            tickPomodoro,
            1000
        );


    atualizarBotoesPomodoro();

}


// =====================================
// PAUSAR
// =====================================

function pausarPomodoro() {

    if (
        !pomodoroRodando
    ) {

        return;

    }


    pomodoroRodando =
        false;


    clearInterval(
        pomodoroIntervalId
    );


    pomodoroIntervalId =
        null;


    salvarTempoAcumuladoPomodoro();


    if (
        pomodoroFase ===
        "estudo"
    ) {

        finalizarBlocoAtualPomodoro(
            "pausa-manual"
        );

    }


    atualizarBotoesPomodoro();

}


// =====================================
// ZERAR SESSÃO
// =====================================

function zerarPomodoro() {

    pausarPomodoro();


    pomodoroFase =
        "estudo";


    pomodoroSegundosFaseAtual =
        0;


    pomodoroSegundosEstudoNaoSalvos =
        0;


    pomodoroSegundosSessaoEstudoTotal =
        0;


    pomodoroSegundosBlocoAtual =
        0;


    pomodoroInicioBloco =
        null;


    atualizarDisplayPomodoro();

}


// =====================================
// SALVAR TEMPO CUMULATIVO
// =====================================

function salvarTempoAcumuladoPomodoro() {

    const idDisciplina =
        obterDisciplinaDoPomodoro();


    if (
        !idDisciplina
    ) {

        console.warn(
            "Não foi possível identificar " +
            "a disciplina desta página."
        );


        return;

    }


    if (
        pomodoroSegundosEstudoNaoSalvos <= 0
    ) {

        return;

    }


    if (
        typeof adicionarTempoEstudado ===
        "function"
    ) {

        adicionarTempoEstudado(

            idDisciplina,

            pomodoroSegundosEstudoNaoSalvos

        );

    }


    pomodoroSegundosEstudoNaoSalvos =
        0;


    atualizarDisplayPomodoro();

}


// =====================================
// ATUALIZAR BOTÕES
// =====================================

function atualizarBotoesPomodoro() {

    const botaoIniciar =
        document.getElementById(
            "pomodoro-btn-start"
        );


    const botaoPausar =
        document.getElementById(
            "pomodoro-btn-pause"
        );


    if (
        botaoIniciar
    ) {

        botaoIniciar.disabled =
            pomodoroRodando;

    }


    if (
        botaoPausar
    ) {

        botaoPausar.disabled =
            !pomodoroRodando;

    }

}


// =====================================
// SALVAR AO SAIR DA PÁGINA
// =====================================

window.addEventListener(

    "beforeunload",

    function () {

        if (
            !pomodoroRodando
        ) {

            return;

        }


        salvarTempoAcumuladoPomodoro();


        if (
            pomodoroFase ===
            "estudo"
        ) {

            finalizarBlocoAtualPomodoro(
                "saida-da-pagina"
            );

        }

    }

);


// =====================================
// INICIALIZAÇÃO
// =====================================

async function inicializarPomodoro() {

    if (
        typeof carregarDadosProgresso ===
        "function"
    ) {

        await carregarDadosProgresso();

    }


    // Cria o novo resumo permanente.
    //
    // Se já houver histórico do v3.0,
    // ele é importado automaticamente.

    migrarHistoricoParaResumoDiarioPomodoro();


    atualizarBotoesPomodoro();

    atualizarDisplayPomodoro();

}


// =====================================
// CARREGAMENTO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    inicializarPomodoro

);


// =====================================
// DEBUG
// =====================================

console.log(
    "POMODORO.JS v3.1 CARREGADO"
);


/* =====================================================
   FIM POMODORO.JS v3.1
===================================================== */
