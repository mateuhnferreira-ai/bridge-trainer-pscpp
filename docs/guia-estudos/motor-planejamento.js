// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.4
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
// 9. Ciclo Pomodoro acumulativo por assunto.
// 10. Continuidade de até 3 Pomodoros.
// 11. Alternância cognitiva após o ciclo.
//
// NOVO NA v3.4:
//
// - ciclo Pomodoro acumulativo;
// - interrupções não zeram 1/3 ou 2/3;
// - o ciclo só reinicia após 3/3;
// - correção da penalidade por mesma disciplina.
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

const MOTOR_LIMITE_PLANO_PADRAO =
    20;


const MOTOR_BLOCOS_POR_CICLO =
    3;


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
        valor ===
        "alta"
    ) {

        return "Alta";

    }


    if (
        valor ===
        "baixa"
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
            dadosDisciplina
                .progresso
        ) || 0;


    const atraso =
        esperado -
        real;


    if (
        atraso <= 0
    ) {

        return 1;

    }


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
// CARREGAR HISTÓRICO POMODORO
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


        return (
            Array.isArray(
                dados
            )
                ? dados
                : []
        );

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
        historico.length ===
        0
    ) {

        return null;

    }


    return (

        historico[
            historico.length -
            1
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
// OBTER BLOCOS COMPLETOS DE UM ASSUNTO
// =====================================
//
// Conta TODOS os blocos completos daquele
// disciplina + aula no histórico.
//
// Interrupções ou estudo de outros assuntos
// NÃO zeram mais a contagem.
// =====================================

function obterBlocosCompletosAssunto(
    idDisciplina,
    idAula
) {

    const historico =
        obterHistoricoPomodoroMotor();


    let total =
        0;


    historico.forEach(
        bloco => {

            if (
                !bloco
            ) {

                return;

            }


            if (
                bloco.disciplina !==
                    idDisciplina ||
                bloco.aula !==
                    idAula
            ) {

                return;

            }


            if (
                blocoPomodoroFoiCompleto(
                    bloco
                )
            ) {

                total++;

            }

        }
    );


    return total;

}


// =====================================
// CALCULAR CICLO ATUAL DO ASSUNTO
// =====================================
//
// Exemplos:
//
// 0 blocos -> 0/3
// 1 bloco   -> 1/3
// 2 blocos -> 2/3
// 3 blocos -> ciclo concluído
// 4 blocos -> novo ciclo 1/3
// 5 blocos -> novo ciclo 2/3
// 6 blocos -> novo ciclo concluído
//
// Portanto:
//
// total % 3
//
// define a posição do ciclo atual.
// =====================================

function calcularPosicaoCicloPomodoro(
    totalBlocosCompletos
) {

    const total =
        Math.max(
            0,
            Number(
                totalBlocosCompletos
            ) || 0
        );


    if (
        total ===
        0
    ) {

        return {

            blocosCompletos:
                0,

            cicloCompleto:
                false,

            ciclosConcluidos:
                0

        };

    }


    const resto =
        total %
        MOTOR_BLOCOS_POR_CICLO;


    const ciclosConcluidos =
        Math.floor(
            total /
            MOTOR_BLOCOS_POR_CICLO
        );


    // =================================
    // EXATAMENTE MÚLTIPLO DE 3
    // =================================
    //
    // Exemplo:
    //
    // 3, 6, 9...
    //
    // O último ciclo foi concluído.
    // Não existe ciclo incompleto ativo.
    // =================================

    if (
        resto ===
        0
    ) {

        return {

            blocosCompletos:
                MOTOR_BLOCOS_POR_CICLO,

            cicloCompleto:
                true,

            ciclosConcluidos:
                ciclosConcluidos

        };

    }


    return {

        blocosCompletos:
            resto,

        cicloCompleto:
            false,

        ciclosConcluidos:
            ciclosConcluidos

    };

}


// =====================================
// ANALISAR CICLO POMODORO DE UM ASSUNTO
// =====================================

function analisarCicloPomodoroAssunto(
    idDisciplina,
    idAula
) {

    if (
        !idDisciplina ||
        !idAula
    ) {

        return {

            disciplina:
                null,

            aula:
                null,

            blocosCompletos:
                0,

            cicloCompleto:
                false,

            ciclosConcluidos:
                0

        };

    }


    const totalBlocos =
        obterBlocosCompletosAssunto(

            idDisciplina,

            idAula

        );


    const posicao =
        calcularPosicaoCicloPomodoro(
            totalBlocos
        );


    return {

        disciplina:
            idDisciplina,

        aula:
            idAula,

        totalBlocosCompletos:
            totalBlocos,

        blocosCompletos:
            posicao.blocosCompletos,

        cicloCompleto:
            posicao.cicloCompleto,

        ciclosConcluidos:
            posicao.ciclosConcluidos

    };

}


// =====================================
// ANALISAR CICLO POMODORO ATUAL
// =====================================
//
// Usa o último assunto efetivamente estudado,
// mas a contagem é acumulativa.
// =====================================

function analisarCicloPomodoroAtual() {

    const ultimoBloco =
        obterUltimoBlocoPomodoroMotor();


    if (
        !ultimoBloco ||
        !ultimoBloco.disciplina ||
        !ultimoBloco.aula
    ) {

        return {

            disciplina:
                null,

            aula:
                null,

            blocosCompletos:
                0,

            cicloCompleto:
                false,

            ciclosConcluidos:
                0

        };

    }


    return analisarCicloPomodoroAssunto(

        ultimoBloco.disciplina,

        ultimoBloco.aula

    );

}


// =====================================
// CALCULAR PRIORIDADE BASE
// =====================================

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


    if (
        percentualConcluido >
            0 &&
        percentualConcluido <
            100
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

    const plano =
        [];


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
                    percentualConcluido >=
                    100
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
        (
            a,
            b
        ) =>

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
        dadosDisciplina
            .assuntos
            .find(

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
            ultimoBloco.segundos ||
            0,

        ultimoBlocoFim:
            ultimoBloco.fim ||
            null

    };

}


// =====================================
// CONTINUIDADE DO CICLO
// =====================================
//
// Agora:
// - 1/3 continua como 1/3 mesmo após interrupção;
// - 2/3 continua como 2/3;
// - 3/3 encerra o ciclo;
// - somente o 4º bloco inicia novo ciclo.
// =====================================

function obterItemDeContinuidade(
    planoBruto
) {

    const ultimoItem =
        obterUltimoItemRealEstudado();


    if (
        !ultimoItem
    ) {

        return null;

    }


    const ciclo =
        analisarCicloPomodoroAssunto(

            ultimoItem.idDisciplina,

            ultimoItem.idAssunto

        );


    // =================================
    // CICLO COMPLETO
    // =================================
    //
    // Não força continuidade.
    // O motor pode alternar normalmente.
    // =================================

    if (
        ciclo.cicloCompleto
    ) {

        return null;

    }


    // Sem qualquer bloco completo,
    // também não há ciclo a preservar.

    if (
        ciclo.blocosCompletos <=
        0
    ) {

        return null;

    }


    const item =
        planoBruto.find(

            candidato =>

                candidato.idDisciplina ===
                    ultimoItem.idDisciplina &&

                candidato.idAssunto ===
                    ultimoItem.idAssunto

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

            ),

        ciclosPomodoroConcluidos:
            ciclo.ciclosConcluidos

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


    if (
        cargaAnterior ===
            "Alta" &&
        cargaAtual ===
            "Alta"
    ) {

        prioridade *=
            MOTOR_PENALIDADE_ALTA_SEGUIDA;

    }


    if (
        cargaAnterior ===
            "Alta" &&
        (
            cargaAtual ===
                "Média" ||
            cargaAtual ===
                "Baixa"
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
//
// CORREÇÃO v3.4:
//
// Evita retorno undefined causado por
// quebra de linha após "return".
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

        return MOTOR_PENALIDADE_MESMA_DISCIPLINA;

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

    let melhor =
        null;


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
                !Number.isFinite(
                    pontuacao
                )
            ) {

                return;

            }


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
            ) /
            100;

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
    // CONTINUIDADE DO CICLO POMODORO
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
        candidatos.length >
            0 &&
        sequencia.length <
            limite
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

        plano.length >
        0

            ? plano[0]
            : null

    );

}


// =====================================
// PRÓXIMOS ESTUDOS
// =====================================

function obterProximosEstudos(
    quantidade =
        3
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
            ciclo.cicloCompleto,

        ciclosConcluidos:
            ciclo.ciclosConcluidos,

        totalBlocosCompletos:
            ciclo.totalBlocosCompletos ||
            0

    };

}


// =====================================
// DIAGNÓSTICO ESTRATÉGICO
// =====================================

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
    "MOTOR DE PLANEJAMENTO PSCPP v3.4 CARREGADO"
);


// =====================================
// FIM MOTOR v3.4
// =====================================
