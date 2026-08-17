// =====================================
// MOTOR DE PLANEJAMENTO PSCPP v3.5
// Bridge Trainer PSCPP
//
// NOVA ARQUITETURA:
//
// O planejamento trabalha com uma
// DUPLA ATIVA DE ESTUDO:
//
// TRILHO PRINCIPAL
// - carga cognitiva Alta
//
// TRILHO SECUNDÁRIO
// - carga cognitiva Média ou Baixa
//
// Os dois assuntos permanecem ativos
// até sua conclusão.
//
// O Pomodoro NÃO escolhe a matéria.
//
// O Pomodoro apenas controla a alternância:
//
// Principal
// 1/3
// 2/3
// 3/3
// ↓
// Secundário
// 1/3
// 2/3
// 3/3
// ↓
// Principal
//
// Quando um assunto chega a 100%:
//
// - somente aquele trilho é substituído;
// - o outro assunto permanece;
// - a substituição considera:
//   sequência didática;
//   assunto iniciado;
//   prioridade estratégica;
//   atraso;
//   prazo;
//   carga cognitiva.
//
// A ordem dos assuntos em
// banco-conteudo.js é considerada
// a sequência didática preferencial.
//
// calculo-planejamento.js responde:
//
// "Em que ritmo estudar?"
//
// motor-planejamento.js responde:
//
// "Qual dos dois assuntos ativos estudar agora?"
// =====================================


// =====================================
// CONFIGURAÇÕES GERAIS
// =====================================

const MOTOR_BLOCOS_POR_CICLO =
    3;


const MOTOR_SEGUNDOS_BLOCO_COMPLETO =
    30 * 60;


const MOTOR_CHAVE_HISTORICO_POMODORO =
    "bridgeTrainerPSCPP_historicoPomodoro";


const MOTOR_CHAVE_DUPLA_ATIVA =
    "bridgeTrainerPSCPP_duplaAtivaPlanejamento";


// =====================================
// PESOS DE PRIORIDADE
// =====================================

const MOTOR_BONUS_ASSUNTO_INICIADO =
    1.35;


const MOTOR_BONUS_DIDATICO_IMEDIATO =
    1.60;


const MOTOR_BONUS_DIDATICO_PROXIMO =
    1.35;


const MOTOR_BONUS_DIDATICO_MESMA_DISCIPLINA =
    1.15;


const MOTOR_BONUS_MAX_ATRASO_DISCIPLINA =
    1.35;


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
// PROGRESSO SEGURO
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
// PESO CONFIGURADO DA DISCIPLINA
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
// DIAGNÓSTICO DO PRAZO
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
            "Motor não conseguiu obter diagnóstico de prazo:",
            erro
        );


        return null;

    }

}


// =====================================
// FATOR GLOBAL DE PRAZO
// =====================================

function obterFatorGlobalPrazo(
    planejamento
) {

    if (!planejamento) {

        return 1;

    }


    return (

        MOTOR_FATOR_PRAZO[
            planejamento.codigoSituacaoPrazo
        ] || 1

    );

}


// =====================================
// ATRASO DA DISCIPLINA
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


    const disciplina =
        planejamento
            .disciplinas[
                idDisciplina
            ];


    if (!disciplina) {

        return 1;

    }


    const esperado =
        Number(
            planejamento.progressoEsperado
        ) || 0;


    const real =
        Number(
            disciplina.progresso
        ) || 0;


    const atraso =
        esperado - real;


    if (
        atraso <= 0
    ) {

        return 1;

    }


    const fator =

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
// HISTÓRICO DO POMODORO
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
            "Não foi possível carregar histórico Pomodoro:",
            erro
        );


        return [];

    }

}


// =====================================
// BLOCO POMODORO COMPLETO
// =====================================

function blocoPomodoroFoiCompleto(
    bloco
) {

    if (!bloco) {

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
// TOTAL DE BLOCOS DE UM ASSUNTO
// =====================================

function obterTotalBlocosCompletosAssunto(
    idDisciplina,
    idAssunto
) {

    const historico =
        obterHistoricoPomodoroMotor();


    let total =
        0;


    historico.forEach(
        bloco => {

            if (
                !bloco ||
                bloco.disciplina !==
                    idDisciplina ||
                bloco.aula !==
                    idAssunto
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


// =====================================================
// PLANO BRUTO
// =====================================================


// =====================================
// PRIORIDADE BASE
// =====================================

function calcularPrioridadeBase(
    idDisciplina,
    dadosDisciplina,
    assunto,
    progresso,
    planejamento
) {

    const pesoDisciplina =
        Number(
            dadosDisciplina.pesoDisciplina
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
    // ASSUNTO JÁ INICIADO
    // =================================

    if (
        progresso > 0 &&
        progresso < 100
    ) {

        prioridade *=
            MOTOR_BONUS_ASSUNTO_INICIADO;

    }


    return prioridade;

}


// =====================================
// GERAR CANDIDATOS
// =====================================

function gerarPlanoBruto() {

    const plano =
        [];


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

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
            (
                assunto,
                indice
            ) => {

                const progresso =
                    obterProgressoSeguro(

                        idDisciplina,

                        assunto.id

                    );


                if (
                    progresso >= 100
                ) {

                    return;

                }


                const prioridadeBase =
                    calcularPrioridadeBase(

                        idDisciplina,

                        dadosDisciplina,

                        assunto,

                        progresso,

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

                    cargaCognitiva:
                        normalizarCargaCognitiva(
                            assunto.cargaCognitiva
                        ),

                    pesoDisciplina:
                        dadosDisciplina
                            .pesoDisciplina || 1,

                    pesoAssunto:
                        assunto.peso || 1,

                    percentualConcluido:
                        progresso,

                    indiceDidatico:
                        indice,

                    prioridadeBase:
                        prioridadeBase,

                    prioridade:
                        prioridadeBase

                });

            }
        );

    }


    return plano;

}


// =====================================================
// SEQUÊNCIA DIDÁTICA
// =====================================================


// =====================================
// LOCALIZAR ÍNDICE DO ASSUNTO
// =====================================

function obterIndiceDidatico(
    idDisciplina,
    idAssunto
) {

    if (
        !conteudoPSCPP ||
        !conteudoPSCPP[
            idDisciplina
        ]
    ) {

        return -1;

    }


    const assuntos =
        conteudoPSCPP[
            idDisciplina
        ].assuntos || [];


    return assuntos.findIndex(

        assunto =>
            assunto.id ===
            idAssunto

    );

}


// =====================================
// FATOR DIDÁTICO
// =====================================
//
// A ordem do banco-conteudo.js é utilizada
// como sequência pedagógica preferencial.
//
// Exemplo:
//
// assunto anterior: índice 5
//
// candidato índice 6
// → forte preferência
//
// candidato índice 7
// → preferência moderada
//
// outro assunto da mesma disciplina
// → pequeno bônus.
// =====================================

function obterFatorDidatico(
    candidato,
    referencia
) {

    if (
        !referencia ||
        candidato.idDisciplina !==
            referencia.idDisciplina
    ) {

        return 1;

    }


    const indiceAnterior =
        obterIndiceDidatico(

            referencia.idDisciplina,

            referencia.idAssunto

        );


    const indiceCandidato =
        obterIndiceDidatico(

            candidato.idDisciplina,

            candidato.idAssunto

        );


    if (
        indiceAnterior < 0 ||
        indiceCandidato < 0
    ) {

        return 1;

    }


    const distancia =
        indiceCandidato -
        indiceAnterior;


    if (
        distancia === 1
    ) {

        return MOTOR_BONUS_DIDATICO_IMEDIATO;

    }


    if (
        distancia === 2
    ) {

        return MOTOR_BONUS_DIDATICO_PROXIMO;

    }


    if (
        distancia > 0
    ) {

        return MOTOR_BONUS_DIDATICO_MESMA_DISCIPLINA;

    }


    return 1;

}


// =====================================
// ESCOLHER MELHOR CANDIDATO
// =====================================

function escolherMelhorCandidato(
    candidatos,
    referencia = null
) {

    if (
        !Array.isArray(
            candidatos
        ) ||
        candidatos.length === 0
    ) {

        return null;

    }


    let melhor =
        null;


    let melhorPontuacao =
        -Infinity;


    candidatos.forEach(
        candidato => {

            let pontuacao =
                candidato.prioridadeBase;


            pontuacao *=
                obterFatorDidatico(

                    candidato,

                    referencia

                );


            if (
                candidato.percentualConcluido > 0 &&
                candidato.percentualConcluido < 100
            ) {

                pontuacao *=
                    MOTOR_BONUS_ASSUNTO_INICIADO;

            }


            if (
                pontuacao >
                melhorPontuacao
            ) {

                melhorPontuacao =
                    pontuacao;


                melhor =
                    candidato;

            }

        }
    );


    if (
        melhor
    ) {

        melhor = {

            ...melhor,

            prioridade:
                Math.round(
                    melhorPontuacao *
                    100
                ) /
                100

        };

    }


    return melhor;

}


// =====================================================
// DUPLA ATIVA
// =====================================================


// =====================================
// ESTRUTURA INICIAL
// =====================================

function criarEstruturaDuplaAtiva() {

    return {

        versao:
            "1.0",

        trilhoAtual:
            "principal",

        principal:
            null,

        secundario:
            null,

        ultimaAtualizacao:
            new Date()
                .toISOString()

    };

}


// =====================================
// CARREGAR DUPLA
// =====================================

function carregarDuplaAtiva() {

    try {

        const salvo =
            localStorage.getItem(
                MOTOR_CHAVE_DUPLA_ATIVA
            );


        if (!salvo) {

            return criarEstruturaDuplaAtiva();

        }


        const dados =
            JSON.parse(
                salvo
            );


        if (
            !dados ||
            typeof dados !==
                "object"
        ) {

            return criarEstruturaDuplaAtiva();

        }


        if (
            dados.trilhoAtual !==
                "principal" &&
            dados.trilhoAtual !==
                "secundario"
        ) {

            dados.trilhoAtual =
                "principal";

        }


        return dados;

    }
    catch (erro) {

        console.warn(
            "Não foi possível carregar a dupla ativa:",
            erro
        );


        return criarEstruturaDuplaAtiva();

    }

}


// =====================================
// SALVAR DUPLA
// =====================================

function salvarDuplaAtiva(
    dupla
) {

    if (!dupla) {

        return;

    }


    dupla.ultimaAtualizacao =
        new Date()
            .toISOString();


    localStorage.setItem(

        MOTOR_CHAVE_DUPLA_ATIVA,

        JSON.stringify(
            dupla
        )

    );

}


// =====================================
// ITEM DA DUPLA AINDA É VÁLIDO?
// =====================================

function itemDuplaEstaDisponivel(
    item,
    planoBruto
) {

    if (
        !item ||
        !Array.isArray(
            planoBruto
        )
    ) {

        return false;

    }


    return planoBruto.some(

        candidato =>

            candidato.idDisciplina ===
                item.idDisciplina &&

            candidato.idAssunto ===
                item.idAssunto

    );

}


// =====================================
// LOCALIZAR ITEM ATUALIZADO
// =====================================

function localizarItemNoPlano(
    item,
    planoBruto
) {

    if (
        !item
    ) {

        return null;

    }


    return (

        planoBruto.find(

            candidato =>

                candidato.idDisciplina ===
                    item.idDisciplina &&

                candidato.idAssunto ===
                    item.idAssunto

        ) ||

        null

    );

}


// =====================================
// CRIAR REGISTRO DO TRILHO
// =====================================

function criarRegistroTrilho(
    item
) {

    if (!item) {

        return null;

    }


    return {

        idDisciplina:
            item.idDisciplina,

        idAssunto:
            item.idAssunto,

        disciplina:
            item.disciplina,

        assunto:
            item.assunto,

        cargaCognitiva:
            item.cargaCognitiva,

        blocosBase:
            obterTotalBlocosCompletosAssunto(

                item.idDisciplina,

                item.idAssunto

            ),

        dataEntrada:
            new Date()
                .toISOString()

    };

}


// =====================================
// CANDIDATOS DO TRILHO PRINCIPAL
// =====================================

function obterCandidatosPrincipais(
    planoBruto
) {

    return planoBruto.filter(

        item =>
            item.cargaCognitiva ===
            "Alta"

    );

}


// =====================================
// CANDIDATOS DO TRILHO SECUNDÁRIO
// =====================================

function obterCandidatosSecundarios(
    planoBruto
) {

    return planoBruto.filter(

        item =>

            item.cargaCognitiva ===
                "Média" ||

            item.cargaCognitiva ===
                "Baixa"

    );

}


// =====================================
// SELECIONAR NOVO PRINCIPAL
// =====================================

function selecionarNovoPrincipal(
    planoBruto,
    referencia = null
) {

    const candidatos =
        obterCandidatosPrincipais(
            planoBruto
        );


    return escolherMelhorCandidato(

        candidatos,

        referencia

    );

}


// =====================================
// SELECIONAR NOVO SECUNDÁRIO
// =====================================

function selecionarNovoSecundario(
    planoBruto,
    referencia = null
) {

    const candidatos =
        obterCandidatosSecundarios(
            planoBruto
        );


    return escolherMelhorCandidato(

        candidatos,

        referencia

    );

}


// =====================================
// GARANTIR DUPLA ATIVA
// =====================================
//
// A dupla só muda se:
//
// - o assunto foi concluído;
// - deixou de existir no banco;
// - ainda não havia sido selecionado.
//
// Caso contrário:
//
// permanece exatamente a mesma.
// =====================================

function garantirDuplaAtiva(
    planoBruto
) {

    const dupla =
        carregarDuplaAtiva();


    // =================================
    // PRINCIPAL
    // =================================

    if (
        !itemDuplaEstaDisponivel(
            dupla.principal,
            planoBruto
        )
    ) {

        const referencia =
            dupla.principal;


        const novoPrincipal =
            selecionarNovoPrincipal(

                planoBruto,

                referencia

            );


        dupla.principal =
            criarRegistroTrilho(
                novoPrincipal
            );

    }


    // =================================
    // SECUNDÁRIO
    // =================================

    if (
        !itemDuplaEstaDisponivel(
            dupla.secundario,
            planoBruto
        )
    ) {

        const referencia =
            dupla.secundario;


        const novoSecundario =
            selecionarNovoSecundario(

                planoBruto,

                referencia

            );


        dupla.secundario =
            criarRegistroTrilho(
                novoSecundario
            );

    }


    // =================================
    // CASO NÃO HAJA MAIS CARGA ALTA
    // =================================

    if (
        !dupla.principal &&
        dupla.secundario
    ) {

        dupla.trilhoAtual =
            "secundario";

    }


    // =================================
    // CASO NÃO HAJA MAIS SECUNDÁRIO
    // =================================

    if (
        !dupla.secundario &&
        dupla.principal
    ) {

        dupla.trilhoAtual =
            "principal";

    }


    salvarDuplaAtiva(
        dupla
    );


    return dupla;

}


// =====================================================
// CONTROLE DO CICLO POMODORO
// =====================================================


// =====================================
// PROGRESSO DO CICLO DO TRILHO
// =====================================

function obterProgressoCicloTrilho(
    trilho
) {

    if (!trilho) {

        return {

            blocos:
                0,

            restante:
                MOTOR_BLOCOS_POR_CICLO,

            completo:
                false

        };

    }


    const totalAtual =
        obterTotalBlocosCompletosAssunto(

            trilho.idDisciplina,

            trilho.idAssunto

        );


    const base =
        Number(
            trilho.blocosBase || 0
        );


    const novosBlocos =
        Math.max(
            0,
            totalAtual - base
        );


    return {

        blocos:
            Math.min(
                MOTOR_BLOCOS_POR_CICLO,
                novosBlocos
            ),

        restante:
            Math.max(

                0,

                MOTOR_BLOCOS_POR_CICLO -
                novosBlocos

            ),

        completo:
            novosBlocos >=
            MOTOR_BLOCOS_POR_CICLO,

        totalAtual:
            totalAtual

    };

}


// =====================================
// ALTERNAR QUANDO CICLO COMPLETA
// =====================================

function sincronizarAlternanciaPomodoro(
    dupla
) {

    if (!dupla) {

        return dupla;

    }


    const trilhoAtual =
        dupla[
            dupla.trilhoAtual
        ];


    if (!trilhoAtual) {

        return dupla;

    }


    const ciclo =
        obterProgressoCicloTrilho(
            trilhoAtual
        );


    if (
        !ciclo.completo
    ) {

        return dupla;

    }


    // =================================
    // CONSUMIR CICLO
    // =================================
    //
    // O histórico continua intacto.
    //
    // Apenas registramos que esses
    // blocos já foram considerados
    // para alternância.
    // =================================

    trilhoAtual.blocosBase =
        ciclo.totalAtual;


    // =================================
    // ALTERNAR
    // =================================

    if (
        dupla.trilhoAtual ===
            "principal" &&
        dupla.secundario
    ) {

        dupla.trilhoAtual =
            "secundario";

    }
    else if (
        dupla.trilhoAtual ===
            "secundario" &&
        dupla.principal
    ) {

        dupla.trilhoAtual =
            "principal";

    }


    salvarDuplaAtiva(
        dupla
    );


    return dupla;

}


// =====================================================
// ESTADO COMPLETO DA DUPLA
// =====================================================

function obterEstadoDuplaAtiva() {

    const planoBruto =
        gerarPlanoBruto();


    const dupla =
        garantirDuplaAtiva(
            planoBruto
        );


    sincronizarAlternanciaPomodoro(
        dupla
    );


    const principal =
        localizarItemNoPlano(

            dupla.principal,

            planoBruto

        );


    const secundario =
        localizarItemNoPlano(

            dupla.secundario,

            planoBruto

        );


    const cicloPrincipal =
        obterProgressoCicloTrilho(
            dupla.principal
        );


    const cicloSecundario =
        obterProgressoCicloTrilho(
            dupla.secundario
        );


    return {

        dupla:
            dupla,

        principal:
            principal,

        secundario:
            secundario,

        trilhoAtual:
            dupla.trilhoAtual,

        cicloPrincipal:
            cicloPrincipal,

        cicloSecundario:
            cicloSecundario

    };

}


// =====================================================
// API DO MOTOR
// =====================================================


// =====================================
// PRÓXIMO ESTUDO
// =====================================

function obterProximoEstudo() {

    const estado =
        obterEstadoDuplaAtiva();


    const trilho =
        estado.trilhoAtual;


    const item =

        trilho ===
            "secundario"

            ? estado.secundario
            : estado.principal;


    if (!item) {

        const alternativo =

            estado.principal ||
            estado.secundario;


        return alternativo || null;

    }


    const ciclo =

        trilho ===
            "secundario"

            ? estado.cicloSecundario
            : estado.cicloPrincipal;


    return {

        ...item,

        trilhoAtivo:
            trilho,

        duplaAtiva:
            true,

        continuidadePomodoro:
            ciclo.blocos > 0,

        blocosCompletosNoCiclo:
            ciclo.blocos,

        blocosRestantesNoCiclo:
            ciclo.restante

    };

}


// =====================================
// OBTER DUPLA DE ESTUDO
// =====================================

function obterDuplaAtivaEstudo() {

    const estado =
        obterEstadoDuplaAtiva();


    return {

        trilhoAtual:
            estado.trilhoAtual,

        principal:
            estado.principal
                ? {

                    ...estado.principal,

                    ciclo:
                        estado.cicloPrincipal

                }
                : null,

        secundario:
            estado.secundario
                ? {

                    ...estado.secundario,

                    ciclo:
                        estado.cicloSecundario

                }
                : null

    };

}


// =====================================
// GERAR PLANO DE ESTUDO
// =====================================
//
// A partir da v3.5:
//
// O plano operacional NÃO lista
// dezenas de assuntos.
//
// Ele apresenta a DUPLA ATIVA.
//
// Isso impede alternância aleatória
// entre várias disciplinas.
// =====================================

function gerarPlanoEstudo(
    limite = 2
) {

    const estado =
        obterEstadoDuplaAtiva();


    const plano =
        [];


    const atual =

        estado.trilhoAtual ===
            "secundario"

            ? estado.secundario
            : estado.principal;


    const outro =

        estado.trilhoAtual ===
            "secundario"

            ? estado.principal
            : estado.secundario;


    if (atual) {

        plano.push({

            ...atual,

            trilhoAtivo:
                estado.trilhoAtual,

            prioridadeAtual:
                true

        });

    }


    if (
        outro &&
        plano.length <
            Math.max(
                1,
                Number(limite) || 2
            )
    ) {

        plano.push({

            ...outro,

            trilhoAtivo:

                estado.trilhoAtual ===
                    "principal"

                    ? "secundario"
                    : "principal",

            prioridadeAtual:
                false

        });

    }


    return plano;

}


// =====================================
// PRÓXIMOS ESTUDOS
// =====================================

function obterProximosEstudos(
    quantidade = 2
) {

    return gerarPlanoEstudo(
        quantidade
    );

}


// =====================================
// SITUAÇÃO DO CICLO POMODORO
// =====================================

function obterSituacaoCicloPomodoro() {

    const estado =
        obterEstadoDuplaAtiva();


    const trilho =
        estado.trilhoAtual;


    const item =

        trilho ===
            "secundario"

            ? estado.secundario
            : estado.principal;


    const ciclo =

        trilho ===
            "secundario"

            ? estado.cicloSecundario
            : estado.cicloPrincipal;


    if (!item) {

        return null;

    }


    return {

        disciplina:
            item.idDisciplina,

        aula:
            item.idAssunto,

        trilho:
            trilho,

        blocosCompletos:
            ciclo.blocos,

        totalBlocos:
            MOTOR_BLOCOS_POR_CICLO,

        blocosRestantes:
            ciclo.restante,

        cicloCompleto:
            ciclo.completo

    };

}


// =====================================
// DIAGNÓSTICO ESTRATÉGICO
// =====================================

function obterDiagnosticoEstrategico() {

    return {

        planejamento:
            obterDiagnosticoPrazoMotor(),

        proximoEstudo:
            obterProximoEstudo(),

        duplaAtiva:
            obterDuplaAtivaEstudo(),

        cicloPomodoro:
            obterSituacaoCicloPomodoro()

    };

}


// =====================================
// RESET MANUAL DA DUPLA
// =====================================
//
// Função de manutenção.
//
// Não interfere no progresso,
// Pomodoro ou revisões.
//
// Pode ser usada no console caso
// precisemos reconstruir a dupla.
// =====================================

function redefinirDuplaAtivaPlanejamento() {

    localStorage.removeItem(
        MOTOR_CHAVE_DUPLA_ATIVA
    );


    const nova =
        obterDuplaAtivaEstudo();


    document.dispatchEvent(

        new CustomEvent(
            "planejamentoPSCPPAtualizado",
            {
                detail:
                    obterDiagnosticoEstrategico()
            }
        )

    );


    return nova;

}


// =====================================
// ATUALIZAÇÃO APÓS POMODORO
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
// ATUALIZAÇÃO APÓS PROGRESSO
// =====================================
//
// Quando uma aula chega a 100%,
// a dupla é reavaliada.
//
// Somente o trilho concluído
// será substituído.
// =====================================

document.addEventListener(

    "progressoPSCPPAtualizado",

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
    "MOTOR DE PLANEJAMENTO PSCPP v3.5 — DUPLA ATIVA CARREGADA"
);


// =====================================
// FIM MOTOR v3.5
// =====================================
