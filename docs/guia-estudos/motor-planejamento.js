// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.3
// Bridge Trainer PSCPP
//
// CAMADAS CONSIDERADAS:
//
// 1. Peso da disciplina.
// 2. Peso do assunto.
// 3. Peso estratégico configurado.
// 4. Progresso real.
// 5. Prazo global.
// 6. Atraso relativo da disciplina.
// 7. Carga cognitiva.
// 8. Histórico real do Pomodoro.
// 9. Continuidade de até 3 Pomodoros.
// 10. Alternância cognitiva após o ciclo.
//
// O motor responde:
//
// "O que estudar agora?"
//
// calculo-planejamento.js responde:
//
// "Em que ritmo preciso avançar?"
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const MOTOR_LIMITE_PLANO_PADRAO = 20;

const MOTOR_BLOCOS_POR_CICLO = 3;

const MOTOR_SEGUNDOS_BLOCO_COMPLETO =
    30 * 60;

const MOTOR_CHAVE_HISTORICO_POMODORO =
    "bridgeTrainerPSCPP_historicoPomodoro";


// Continuidade normal

const MOTOR_BONUS_ASSUNTO_INICIADO =
    1.15;


// Carga cognitiva

const MOTOR_PENALIDADE_ALTA_SEGUIDA =
    0.55;

const MOTOR_BONUS_RECUPERACAO =
    1.25;

const MOTOR_PENALIDADE_MESMA_DISCIPLINA =
    0.92;


// =====================================
// PRESSÃO DE PRAZO
// =====================================
//
// Multiplicadores globais.
//
// Eles não escolhem a disciplina diretamente.
// Apenas tornam o motor mais agressivo quando
// o planejamento começa a ficar apertado.

const MOTOR_FATOR_PRAZO = {

    "conteudo-concluido":
        1,

    "confortavel":
        1,

    "adequado":
        1.03,

    "limite":
        1.08,

    "atraso-moderado":
        1.15,

    "risco-alto":
        1.25,

    "sem-disponibilidade":
        1

};


// Máximo bônus individual aplicado
// a uma disciplina atrasada.

const MOTOR_BONUS_MAX_ATRASO_DISCIPLINA =
    1.35;


// =====================================
// OBTER PROGRESSO SEGURO
// =====================================

function obterProgressoSeguro(
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


    if (
        !Number.isFinite(
            progresso
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            100,
            progresso
        )
    );

}


// =====================================
// OBTER PESO DA CONFIGURAÇÃO
// =====================================
//
// IMPORTANTE:
//
// Agora utilizamos diretamente
// o ID estável da disciplina.
//
// Exemplo:
//
// manobrabilidade
// arte-naval
// navegacao
// regulamentacao

function obterPesoConfiguracao(
    idDisciplina
) {

    if (
        typeof configuracaoEstudo ===
            "undefined" ||
        !configuracaoEstudo ||
        !configuracaoEstudo.pesosPrioridade
    ) {

        return 1;

    }


    return (

        configuracaoEstudo
            .pesosPrioridade[
                idDisciplina
            ] || 1

    );

}


// =====================================
// NORMALIZAR CARGA COGNITIVA
// =====================================

function normalizarCargaCognitiva(
    carga
) {

    const valor =
        String(
            carga || "Média"
        )
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );


    if (
        valor === "alta"
    ) {

        return "Alta";

    }


    if (
        valor === "baixa"
    ) {

        return "Baixa";

    }


    return "Média";

}


// =====================================
// OBTER DIAGNÓSTICO DE PRAZO
// =====================================

function obterDiagnosticoPrazoMotor() {

    if (
        typeof calcularPlanejamento !==
        "function"
    ) {

        return null;

    }


    try {

        return calcularPlanejamento();

    }
    catch (erro) {

        console.warn(
            "Motor não conseguiu obter " +
            "o diagnóstico de prazo:",
            erro
        );


        return null;

    }

}


// =====================================
// PRESSÃO GLOBAL DE PRAZO
// =====================================

function obterFatorGlobalPrazo(
    planejamento
) {

    if (
        !planejamento
    ) {

        return 1;

    }


    const codigo =
        planejamento
            .codigoSituacaoPrazo;


    return (

        MOTOR_FATOR_PRAZO[
            codigo
        ] || 1

    );

}


// =====================================
// BÔNUS POR ATRASO DA DISCIPLINA
// =====================================
//
// Compara:
//
// progresso esperado geral
//
// com
//
// progresso ponderado da disciplina.
//
// Exemplo:
//
// Esperado hoje: 30%
// Manobrabilidade: 18%
//
// Defasagem = 12 pontos.
//
// A disciplina recebe pequeno reforço.
//
// O bônus é limitado para impedir que
// uma única disciplina domine o plano.

function obterFatorAtrasoDisciplina(
    idDisciplina,
    planejamento
) {

    if (
        !planejamento ||
        !planejamento.disciplinas
    ) {

        return 1;

    }


    const dadosDisciplina =
        planejamento
            .disciplinas[
                idDisciplina
            ];


    if (
        !dadosDisciplina
    ) {

        return 1;

    }


    const esperado =
        Number(
            planejamento
                .progressoEsperado
        ) || 0;


    const real =
        Number(
            dadosDisciplina.progresso
        ) || 0;


    const atraso =
        esperado - real;


    // Disciplina não está atrasada.

    if (
        atraso <= 0
    ) {

        return 1;

    }


    // Cada 10 pontos percentuais
    // de atraso gera aproximadamente
    // 5% de bônus.

    let fator =
        1 +
        (
            atraso /
            10
        ) *
        0.05;


    return Math.min(

        MOTOR_BONUS_MAX_ATRASO_DISCIPLINA,

        fator

    );

}


// =====================================
// CARREGAR HISTÓRICO DO POMODORO
// =====================================

function obterHistoricoPomodoroMotor() {

    if (
        typeof carregarHistoricoPomodoro ===
        "function"
    ) {

        const historico =
            carregarHistoricoPomodoro();


        if (
            Array.isArray(
                historico
            )
        ) {

            return historico;

        }

    }


    try {

        const salvo =
            localStorage.getItem(
                MOTOR_CHAVE_HISTORICO_POMODORO
            );


        if (
            !salvo
        ) {

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
            "Não foi possível ler o histórico Pomodoro:",
            erro
        );


        return [];

    }

}


// =====================================
// OBTER ÚLTIMO BLOCO
// =====================================

function obterUltimoBlocoPomodoroMotor() {

    if (
        typeof obterUltimoBlocoPomodoro ===
        "function"
    ) {

        const bloco =
            obterUltimoBlocoPomodoro();


        if (
            bloco
        ) {

            return bloco;

        }

    }


    const historico =
        obterHistoricoPomodoroMotor();


    if (
        historico.length === 0
    ) {

        return null;

    }


    return (
        historico[
            historico.length - 1
        ] || null
    );

}


// =====================================
// VERIFICAR BLOCO COMPLETO
// =====================================

function blocoPomodoroFoiCompleto(
    bloco
) {

    if (
        !bloco
    ) {

        return false;

    }


    return (

        bloco.motivo ===
            "bloco-concluido" &&

        Number(
            bloco.segundos || 0
        ) >=
            MOTOR_SEGUNDOS_BLOCO_COMPLETO

    );

}


// =====================================
// ANALISAR CICLO POMODORO
// =====================================

function analisarCicloPomodoroAtual() {

    const historico =
        obterHistoricoPomodoroMotor();


    if (
        historico.length === 0
    ) {

        return {

            disciplina: null,

            aula: null,

            blocosCompletos: 0,

            cicloCompleto: false

        };

    }


    const ultimoBloco =
        historico[
            historico.length - 1
        ];


    if (
        !ultimoBloco ||
        !ultimoBloco.disciplina ||
        !ultimoBloco.aula
    ) {

        return {

            disciplina: null,

            aula: null,

            blocosCompletos: 0,

            cicloCompleto: false

        };

    }


    const disciplinaAlvo =
        ultimoBloco.disciplina;


    const aulaAlvo =
        ultimoBloco.aula;


    let blocosCompletos = 0;


    for (
        let indice =
            historico.length - 1;

        indice >= 0;

        indice--
    ) {

        const bloco =
            historico[
                indice
            ];


        if (
            !bloco
        ) {

            continue;

        }


        if (
            bloco.disciplina !==
                disciplinaAlvo ||
            bloco.aula !==
                aulaAlvo
        ) {

            break;

        }


        if (
            blocoPomodoroFoiCompleto(
                bloco
            )
        ) {

            blocosCompletos++;

        }

    }


    return {

        disciplina:
            disciplinaAlvo,

        aula:
            aulaAlvo,

        blocosCompletos:
            blocosCompletos,

        cicloCompleto:
            blocosCompletos >=
            MOTOR_BLOCOS_POR_CICLO

    };

}


// =====================================
// CALCULAR PRIORIDADE BASE
// =====================================
//
// Agora recebe explicitamente:
//
// idDisciplina
//
// Isso corrige o problema existente
// no v3.2.

function calcularPrioridadeBase(
    idDisciplina,
    dadosDisciplina,
    assunto,
    percentualConcluido,
    planejamento
) {

    const pesoDisciplina =
        Number(
            dadosDisciplina
                .pesoDisciplina
        ) || 1;


    const pesoAssunto =
        Number(
            assunto.peso
        ) || 1;


    const pesoConfiguracao =
        obterPesoConfiguracao(
            idDisciplina
        );


    const fatorAtraso =
        obterFatorAtrasoDisciplina(

            idDisciplina,

            planejamento

        );


    const fatorPrazo =
        obterFatorGlobalPrazo(
            planejamento
        );


    let prioridade =

        pesoDisciplina *
        pesoAssunto *
        pesoConfiguracao *
        fatorAtraso *
        fatorPrazo;


    // =================================
    // CONTINUIDADE PEDAGÓGICA
    // =================================

    if (
        percentualConcluido > 0 &&
        percentualConcluido < 100
    ) {

        prioridade *=
            MOTOR_BONUS_ASSUNTO_INICIADO;

    }


    return prioridade;

}


// =====================================
// GERAR PLANO BRUTO
// =====================================

function gerarPlanoBruto() {

    const plano = [];


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        console.warn(
            "conteudoPSCPP não está disponível."
        );


        return plano;

    }


    // Calculado apenas uma vez por
    // geração do plano.

    const planejamento =
        obterDiagnosticoPrazoMotor();


    for (
        const idDisciplina
        in conteudoPSCPP
    ) {

        const dadosDisciplina =
            conteudoPSCPP[
                idDisciplina
            ];


        const assuntos =
            Array.isArray(
                dadosDisciplina.assuntos
            )
                ? dadosDisciplina.assuntos
                : [];


        assuntos.forEach(
            assunto => {

                const percentualConcluido =
                    obterProgressoSeguro(

                        idDisciplina,

                        assunto.id

                    );


                if (
                    percentualConcluido >= 100
                ) {

                    return;

                }


                const prioridadeBase =
                    calcularPrioridadeBase(

                        idDisciplina,

                        dadosDisciplina,

                        assunto,

                        percentualConcluido,

                        planejamento

                    );


                const fatorAtrasoDisciplina =
                    obterFatorAtrasoDisciplina(

                        idDisciplina,

                        planejamento

                    );


                plano.push({

                    idDisciplina:
                        idDisciplina,

                    idAssunto:
                        assunto.id,

                    disciplina:
                        dadosDisciplina.nome,

                    assunto:
                        assunto.nome,

                    horas:
                        assunto.horas || 0,

                    importancia:
                        assunto.importancia ||
                        "Média",

                    pesoDisciplina:
                        dadosDisciplina
                            .pesoDisciplina || 1,

                    pesoAssunto:
                        assunto.peso || 1,

                    pesoConfiguracao:
                        obterPesoConfiguracao(
                            idDisciplina
                        ),

                    cargaCognitiva:
                        normalizarCargaCognitiva(
                            assunto.cargaCognitiva
                        ),

                    prioridadeBase:
                        prioridadeBase,

                    prioridade:
                        prioridadeBase,

                    percentualConcluido:
                        percentualConcluido,

                    fatorAtrasoDisciplina:
                        fatorAtrasoDisciplina,

                    situacaoPrazo:
                        planejamento
                            ?.codigoSituacaoPrazo ||
                        null

                });

            }
        );

    }


    plano.sort(
        (a, b) =>
            b.prioridadeBase -
            a.prioridadeBase
    );


    return plano;

}


// =====================================
// ÚLTIMO ITEM REAL ESTUDADO
// =====================================

function obterUltimoItemRealEstudado() {

    const ultimoBloco =
        obterUltimoBlocoPomodoroMotor();


    if (
        !ultimoBloco ||
        !ultimoBloco.disciplina ||
        !ultimoBloco.aula
    ) {

        return null;

    }


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        return null;

    }


    const dadosDisciplina =
        conteudoPSCPP[
            ultimoBloco.disciplina
        ];


    if (
        !dadosDisciplina ||
        !Array.isArray(
            dadosDisciplina.assuntos
        )
    ) {

        return null;

    }


    const assunto =
        dadosDisciplina.assuntos.find(

            item =>
                item.id ===
                ultimoBloco.aula

        );


    if (
        !assunto
    ) {

        return null;

    }


    return {

        idDisciplina:
            ultimoBloco.disciplina,

        idAssunto:
            assunto.id,

        disciplina:
            dadosDisciplina.nome,

        assunto:
            assunto.nome,

        cargaCognitiva:
            normalizarCargaCognitiva(
                assunto.cargaCognitiva
            ),

        ultimoBlocoSegundos:
            ultimoBloco.segundos || 0,

        ultimoBlocoFim:
            ultimoBloco.fim || null

    };

}


// =====================================
// CONTINUIDADE DO CICLO
// =====================================

function obterItemDeContinuidade(
    planoBruto
) {

    const ciclo =
        analisarCicloPomodoroAtual();


    if (
        !ciclo.disciplina ||
        !ciclo.aula
    ) {

        return null;

    }


    if (
        ciclo.cicloCompleto
    ) {

        return null;

    }


    const item =
        planoBruto.find(

            candidato =>

                candidato.idDisciplina ===
                    ciclo.disciplina &&

                candidato.idAssunto ===
                    ciclo.aula

        );


    if (
        !item
    ) {

        return null;

    }


    return {

        ...item,

        continuidadePomodoro:
            true,

        blocosCompletosNoCiclo:
            ciclo.blocosCompletos,

        blocosRestantesNoCiclo:
            Math.max(

                0,

                MOTOR_BLOCOS_POR_CICLO -
                ciclo.blocosCompletos

            )

    };

}


// =====================================
// PRIORIDADE CONTEXTUAL
// =====================================

function calcularPrioridadeContextual(
    item,
    ultimoItem
) {

    let prioridade =
        item.prioridadeBase;


    if (
        !ultimoItem
    ) {

        return prioridade;

    }


    const cargaAtual =
        normalizarCargaCognitiva(
            item.cargaCognitiva
        );


    const cargaAnterior =
        normalizarCargaCognitiva(
            ultimoItem.cargaCognitiva
        );


    // Alta -> Alta

    if (
        cargaAnterior === "Alta" &&
        cargaAtual === "Alta"
    ) {

        prioridade *=
            MOTOR_PENALIDADE_ALTA_SEGUIDA;

    }


    // Alta -> Média/Baixa

    if (
        cargaAnterior === "Alta" &&
        (
            cargaAtual === "Média" ||
            cargaAtual === "Baixa"
        )
    ) {

        prioridade *=
            MOTOR_BONUS_RECUPERACAO;

    }


    return prioridade;

}


// =====================================
// PENALIDADE POR MESMA DISCIPLINA
// =====================================

function calcularPenalidadeDisciplina(
    item,
    ultimoItem
) {

    if (
        !ultimoItem
    ) {

        return 1;

    }


    if (
        item.idDisciplina ===
        ultimoItem.idDisciplina
    ) {

        return
            MOTOR_PENALIDADE_MESMA_DISCIPLINA;

    }


    return 1;

}


// =====================================
// ESCOLHER PRÓXIMO ITEM
// =====================================

function escolherProximoItem(
    candidatos,
    ultimoItem
) {

    let melhor = null;

    let melhorPontuacao =
        -Infinity;


    candidatos.forEach(
        item => {

            let pontuacao =
                calcularPrioridadeContextual(

                    item,

                    ultimoItem

                );


            pontuacao *=
                calcularPenalidadeDisciplina(

                    item,

                    ultimoItem

                );


            if (
                pontuacao >
                melhorPontuacao
            ) {

                melhorPontuacao =
                    pontuacao;

                melhor =
                    item;

            }

        }
    );


    if (
        melhor
    ) {

        melhor.prioridade =
            Math.round(
                melhorPontuacao *
                100
            ) / 100;

    }


    return melhor;

}


// =====================================
// GERAR SEQUÊNCIA
// =====================================

function gerarSequenciaEquilibrada(
    planoBruto,
    limite
) {

    const candidatos =
        [
            ...planoBruto
        ];


    const sequencia =
        [];


    let ultimoItem =
        obterUltimoItemRealEstudado();


    // =================================
    // CONTINUIDADE DOS 3 POMODOROS
    // =================================

    const continuidade =
        obterItemDeContinuidade(
            candidatos
        );


    if (
        continuidade &&
        limite > 0
    ) {

        sequencia.push(
            continuidade
        );


        const indice =
            candidatos.findIndex(

                item =>

                    item.idDisciplina ===
                        continuidade.idDisciplina &&

                    item.idAssunto ===
                        continuidade.idAssunto

            );


        if (
            indice >= 0
        ) {

            candidatos.splice(
                indice,
                1
            );

        }


        ultimoItem =
            continuidade;

    }


    // =================================
    // SEQUÊNCIA ESTRATÉGICA
    // =================================

    while (
        candidatos.length > 0 &&
        sequencia.length < limite
    ) {

        const escolhido =
            escolherProximoItem(

                candidatos,

                ultimoItem

            );


        if (
            !escolhido
        ) {

            break;

        }


        sequencia.push(
            escolhido
        );


        const indice =
            candidatos.indexOf(
                escolhido
            );


        if (
            indice >= 0
        ) {

            candidatos.splice(
                indice,
                1
            );

        }


        ultimoItem =
            escolhido;

    }


    return sequencia;

}


// =====================================
// GERAR PLANO
// =====================================

function gerarPlanoEstudo(
    limite =
        MOTOR_LIMITE_PLANO_PADRAO
) {

    const planoBruto =
        gerarPlanoBruto();


    return gerarSequenciaEquilibrada(

        planoBruto,

        limite

    );

}


// =====================================
// PRÓXIMO ESTUDO
// =====================================

function obterProximoEstudo() {

    const plano =
        gerarPlanoEstudo(
            1
        );


    return (
        plano.length > 0
            ? plano[0]
            : null
    );

}


// =====================================
// PRÓXIMOS ESTUDOS
// =====================================

function obterProximosEstudos(
    quantidade = 3
) {

    const quantidadeSegura =
        Math.max(

            1,

            Number(
                quantidade
            ) || 1

        );


    return gerarPlanoEstudo(
        quantidadeSegura
    );

}


// =====================================
// SITUAÇÃO DO CICLO POMODORO
// =====================================

function obterSituacaoCicloPomodoro() {

    const ciclo =
        analisarCicloPomodoroAtual();


    if (
        !ciclo.disciplina ||
        !ciclo.aula
    ) {

        return null;

    }


    return {

        disciplina:
            ciclo.disciplina,

        aula:
            ciclo.aula,

        blocosCompletos:
            ciclo.blocosCompletos,

        totalBlocos:
            MOTOR_BLOCOS_POR_CICLO,

        blocosRestantes:
            Math.max(

                0,

                MOTOR_BLOCOS_POR_CICLO -
                ciclo.blocosCompletos

            ),

        cicloCompleto:
            ciclo.cicloCompleto

    };

}


// =====================================
// DIAGNÓSTICO ESTRATÉGICO
// =====================================
//
// Disponibiliza uma visão unificada
// para a futura interface/coaching.

function obterDiagnosticoEstrategico() {

    const planejamento =
        obterDiagnosticoPrazoMotor();


    const proximo =
        obterProximoEstudo();


    const ciclo =
        obterSituacaoCicloPomodoro();


    return {

        planejamento:
            planejamento,

        proximoEstudo:
            proximo,

        cicloPomodoro:
            ciclo

    };

}


// =====================================
// RECALCULAR APÓS POMODORO
// =====================================

document.addEventListener(

    "pomodoroPSCPPBlocoRegistrado",

    function () {

        const diagnostico =
            obterDiagnosticoEstrategico();


        document.dispatchEvent(

            new CustomEvent(

                "planejamentoPSCPPAtualizado",

                {

                    detail:
                        diagnostico

                }

            )

        );

    }

);


// =====================================
// DEBUG
// =====================================

console.log(
    "MOTOR DE PLANEJAMENTO PSCPP v3.3 CARREGADO"
);


// =====================================
// FIM MOTOR v3.3
// =====================================
