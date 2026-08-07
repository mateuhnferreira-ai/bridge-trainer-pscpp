/* =====================================================
   BRIDGE TRAINER PSCPP
   POMODORO.JS v3.0

   Ciclo:
   - 30 minutos de estudo
   - 10 minutos de pausa

   Funções:
   - contador de estudo
   - pausa automática
   - apito nas transições
   - tempo cumulativo por disciplina
   - registro por aula
   - histórico de blocos Pomodoro
   - identificação do último bloco estudado
   - evento para o motor recalcular o próximo estudo
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

const POMODORO_DURACAO_ESTUDO_SEGUNDOS =
    30 * 60;

const POMODORO_DURACAO_PAUSA_SEGUNDOS =
    10 * 60;


// Histórico dos blocos Pomodoro

const CHAVE_HISTORICO_POMODORO =
    "bridgeTrainerPSCPP_historicoPomodoro";


// Limite para evitar crescimento indefinido
// do localStorage.

const POMODORO_MAX_HISTORICO =
    500;


// =====================================
// ESTADO
// =====================================

let pomodoroRodando = false;


// "estudo" ou "pausa"

let pomodoroFase =
    "estudo";


// Tempo transcorrido na fase atual

let pomodoroSegundosFaseAtual =
    0;


// Tempo de estudo ainda não enviado
// para progresso.js

let pomodoroSegundosEstudoNaoSalvos =
    0;


// Tempo de estudo acumulado apenas
// durante a sessão atual

let pomodoroSegundosSessaoEstudoTotal =
    0;


let pomodoroIntervalId =
    null;


// Data/hora em que começou o bloco
// atualmente em andamento.

let pomodoroInicioBloco =
    null;


// Quantidade acumulada desde o último
// registro de bloco no histórico.

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
//
// Usa normalizarIdentificador() do
// progresso.js quando disponível.

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
// OBTER CONTEXTO ATUAL
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
// TOCAR APITO
// =====================================
//
// "pausa"   -> descendente
// "retorno" -> ascendente

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
                tipo ===
                "retorno"
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
                total %
                3600
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


    if (horas > 0) {

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
// CARREGAR HISTÓRICO
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


        if (
            !Array.isArray(
                dados
            )
        ) {

            return [];

        }


        return dados;

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
// SALVAR HISTÓRICO
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


    const historico =
        carregarHistoricoPomodoro();


    historico.push(
        bloco
    );


    salvarHistoricoPomodoro(
        historico
    );


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


    let total = 0;


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
                        bloco.segundos ||
                        0;

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


    if (displayFase) {

        displayFase.textContent =

            (
                pomodoroFase ===
                "estudo"
            )
                ? "📖 Estudo"
                : "☕ Pausa";

    }


    if (displayRestante) {

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


    if (displaySessao) {

        displaySessao.textContent =
            formatarTempoPomodoro(
                pomodoroSegundosSessaoEstudoTotal
            );

    }


    if (displayCumulativo) {

        const idDisciplina =
            obterDisciplinaDoPomodoro();


        const totalSegundos =

            (
                idDisciplina &&
                typeof
                    obterTempoEstudadoDisciplina ===
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
// FINALIZAR BLOCO ATUAL
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


    if (botaoIniciar) {

        botaoIniciar.disabled =
            pomodoroRodando;

    }


    if (botaoPausar) {

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


/* =====================================================
   FIM POMODORO.JS v3.0
===================================================== */
