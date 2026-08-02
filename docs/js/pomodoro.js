/* =====================================================
   BRIDGE TRAINER PSCPP
   POMODORO.JS v2.0
   Ciclo de 30 minutos de estudo + 10 minutos de pausa,
   com apito nas transições e contador cumulativo de
   horas de ESTUDO (a pausa não conta) por disciplina
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

const POMODORO_DURACAO_ESTUDO_SEGUNDOS = 30 * 60;

const POMODORO_DURACAO_PAUSA_SEGUNDOS = 10 * 60;


let pomodoroRodando = false;

// "estudo" ou "pausa"
let pomodoroFase = "estudo";

// segundos decorridos na fase atual (zera a cada troca de fase)
let pomodoroSegundosFaseAtual = 0;

// segundos de ESTUDO ainda não somados ao total cumulativo
let pomodoroSegundosEstudoNaoSalvos = 0;

// segundos de ESTUDO acumulados nesta sessão (só exibição)
let pomodoroSegundosSessaoEstudoTotal = 0;

let pomodoroIntervalId = null;


// =====================================
// TOCAR APITO (SINTETIZADO, SEM ARQUIVO DE ÁUDIO)
// =====================================
//
// tipo "pausa": apito descendente (hora de parar)
// tipo "retorno": apito ascendente (hora de voltar a estudar)

function tocarApitoPomodoro(tipo) {

    try {

        const contexto =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        const frequencias =
            (tipo === "retorno")
                ? [660, 880, 1046]
                : [1046, 880, 660];


        frequencias.forEach(
            (frequencia, indice) => {

                const oscilador =
                    contexto.createOscillator();


                const ganho =
                    contexto.createGain();


                oscilador.type =
                    "square";


                oscilador.frequency.value =
                    frequencia;


                const inicio =
                    contexto.currentTime +
                    indice * 0.3;


                const fim =
                    inicio + 0.25;


                ganho.gain.setValueAtTime(
                    0.15,
                    inicio
                );


                ganho.gain.exponentialRampToValueAtTime(
                    0.001,
                    fim
                );


                oscilador.connect(ganho);

                ganho.connect(
                    contexto.destination
                );


                oscilador.start(inicio);

                oscilador.stop(fim);

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
// FORMATAR TEMPO (mm:ss OU h:mm:ss)
// =====================================

function formatarTempoPomodoro(segundosTotais) {

    const total =
        Math.max(0, Math.floor(segundosTotais));


    const horas =
        Math.floor(total / 3600);


    const minutos =
        Math.floor(
            (total % 3600) / 60
        );


    const segundos =
        total % 60;


    const doisDigitos =
        numero => String(numero).padStart(2, "0");


    if (horas > 0) {

        return (

            horas + ":" +
            doisDigitos(minutos) + ":" +
            doisDigitos(segundos)

        );

    }


    return (

        doisDigitos(minutos) + ":" +
        doisDigitos(segundos)

    );

}


// =====================================
// IDENTIFICAR A DISCIPLINA DO CRONÔMETRO
// =====================================
//
// Usa data-disciplina do <body> da página atual.
// Páginas de aula já têm esse atributo. Se a página não
// tiver, o cronômetro ainda funciona para contar a
// sessão, mas não consegue salvar o tempo cumulativo.

function obterDisciplinaDoPomodoro() {

    return (
        document.body.dataset.disciplina ||
        null
    );

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

            (pomodoroFase === "estudo")
                ? "📖 Estudo"
                : "☕ Pausa";

    }


    if (displayRestante) {

        const duracaoFase =

            (pomodoroFase === "estudo")
                ? POMODORO_DURACAO_ESTUDO_SEGUNDOS
                : POMODORO_DURACAO_PAUSA_SEGUNDOS;


        const restante =
            duracaoFase - pomodoroSegundosFaseAtual;


        displayRestante.textContent =
            formatarTempoPomodoro(restante);

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
                typeof obterTempoEstudadoDisciplina === "function"
            )
                ? obterTempoEstudadoDisciplina(idDisciplina)
                : 0;


        displayCumulativo.textContent =
            formatarTempoPomodoro(
                totalSegundos
            );

    }

}


// =====================================
// TICK (RODA A CADA SEGUNDO)
// =====================================

function tickPomodoro() {

    pomodoroSegundosFaseAtual++;


    if (pomodoroFase === "estudo") {

        pomodoroSegundosEstudoNaoSalvos++;

        pomodoroSegundosSessaoEstudoTotal++;


        if (
            pomodoroSegundosFaseAtual >=
            POMODORO_DURACAO_ESTUDO_SEGUNDOS
        ) {

            tocarApitoPomodoro("pausa");


            // Salva o bloco de estudo concluído no
            // total cumulativo da disciplina antes de
            // entrar na pausa
            salvarTempoAcumuladoPomodoro();


            pomodoroFase = "pausa";

            pomodoroSegundosFaseAtual = 0;

        }

    }
    else {

        if (
            pomodoroSegundosFaseAtual >=
            POMODORO_DURACAO_PAUSA_SEGUNDOS
        ) {

            tocarApitoPomodoro("retorno");


            pomodoroFase = "estudo";

            pomodoroSegundosFaseAtual = 0;

        }

    }


    atualizarDisplayPomodoro();

}


// =====================================
// INICIAR
// =====================================

function iniciarPomodoro() {

    if (pomodoroRodando) {

        return;

    }


    pomodoroRodando = true;


    pomodoroIntervalId =
        setInterval(
            tickPomodoro,
            1000
        );


    atualizarBotoesPomodoro();

}


// =====================================
// PAUSAR (E SALVAR O TEMPO DE ESTUDO PENDENTE)
// =====================================

function pausarPomodoro() {

    if (!pomodoroRodando) {

        return;

    }


    pomodoroRodando = false;


    clearInterval(
        pomodoroIntervalId
    );


    salvarTempoAcumuladoPomodoro();


    atualizarBotoesPomodoro();

}


// =====================================
// ZERAR SESSÃO ATUAL
// =====================================
//
// Zera o ciclo inteiro (fase, contadores de sessão).
// Não afeta o total cumulativo já salvo da disciplina.

function zerarPomodoro() {

    pausarPomodoro();


    pomodoroFase = "estudo";

    pomodoroSegundosFaseAtual = 0;

    pomodoroSegundosEstudoNaoSalvos = 0;

    pomodoroSegundosSessaoEstudoTotal = 0;


    atualizarDisplayPomodoro();

}


// =====================================
// SALVAR TEMPO DE ESTUDO PENDENTE NO TOTAL DA DISCIPLINA
// =====================================
//
// Só soma tempo de ESTUDO — a pausa nunca é contada no
// cumulativo. Chamada automaticamente a cada transição
// para pausa, ao clicar em Pausar, e ao sair da página.

function salvarTempoAcumuladoPomodoro() {

    const idDisciplina =
        obterDisciplinaDoPomodoro();


    if (!idDisciplina) {

        console.warn(
            "Não foi possível identificar a disciplina " +
            "desta página (data-disciplina ausente no " +
            "<body>). O tempo desta sessão não foi salvo."
        );


        return;

    }


    if (pomodoroSegundosEstudoNaoSalvos <= 0) {

        return;

    }


    if (typeof adicionarTempoEstudado === "function") {

        adicionarTempoEstudado(
            idDisciplina,
            pomodoroSegundosEstudoNaoSalvos
        );

    }


    pomodoroSegundosEstudoNaoSalvos = 0;


    atualizarDisplayPomodoro();

}


// =====================================
// ATUALIZAR ESTADO DOS BOTÕES
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
//
// Evita perder tempo de estudo já decorrido caso o
// usuário navegue para outra página sem apertar Pausar.

window.addEventListener(
    "beforeunload",
    function () {

        if (pomodoroRodando) {

            salvarTempoAcumuladoPomodoro();

        }

    }
);


// =====================================
// INICIALIZAÇÃO
// =====================================
//
// Espera carregarDadosProgresso() (progresso.js) para
// exibir o total cumulativo correto assim que a página
// abre.

async function inicializarPomodoro() {

    if (typeof carregarDadosProgresso === "function") {

        await carregarDadosProgresso();

    }


    atualizarBotoesPomodoro();

    atualizarDisplayPomodoro();

}


document.addEventListener(
    "DOMContentLoaded",
    inicializarPomodoro
);


/* =====================================================
   FIM POMODORO.JS v2.0
===================================================== */

