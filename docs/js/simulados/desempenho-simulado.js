// =====================================
// DESEMPENHO DOS SIMULADOS PSCPP v1.0
// Bridge Trainer PSCPP
//
// Responsabilidades:
//
// 1. Salvar tentativas permanentemente
// 2. Manter histórico de simulados
// 3. Registrar desempenho por disciplina
// 4. Registrar desempenho por assunto
// 5. Registrar desempenho por tópico
// 6. Registrar questões erradas
// 7. Armazenar tempo total e tempo médio
//
// Este arquivo NÃO controla:
// - progresso de estudo
// - seleção de questões
// - execução visual do simulado
//
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const CHAVE_DESEMPENHO_SIMULADOS_PSCPP =
    "bridgeTrainerPSCPP_desempenhoSimulados";


const VERSAO_DESEMPENHO_SIMULADOS_PSCPP =
    "1.0";


// =====================================
// ESTRUTURA INICIAL
// =====================================

function criarEstruturaInicialDesempenhoSimuladosPSCPP() {

    return {

        versao:
            VERSAO_DESEMPENHO_SIMULADOS_PSCPP,

        ultimaAtualizacao:
            null,

        totalTentativas:
            0,

        totalQuestoesRespondidas:
            0,

        totalAcertos:
            0,

        totalErros:
            0,

        tempoTotalSegundos:
            0,

        historico:
            [],

        disciplinas:
            {},

        assuntos:
            {},

        topicos:
            {},

        questoesErradas:
            {}

    };

}


// =====================================
// CARREGAR DADOS
// =====================================

function carregarDesempenhoSimuladosPSCPP() {

    const salvo =
        localStorage.getItem(
            CHAVE_DESEMPENHO_SIMULADOS_PSCPP
        );


    if (!salvo) {

        return criarEstruturaInicialDesempenhoSimuladosPSCPP();

    }


    try {

        const dados =
            JSON.parse(
                salvo
            );


        if (
            !dados ||
            typeof dados !== "object"
        ) {

            return criarEstruturaInicialDesempenhoSimuladosPSCPP();

        }


        return dados;

    }

    catch (erro) {

        console.error(
            "Erro ao carregar desempenho dos simulados PSCPP:",
            erro
        );


        return criarEstruturaInicialDesempenhoSimuladosPSCPP();

    }

}


// =====================================
// SALVAR DADOS
// =====================================

function salvarDesempenhoSimuladosPSCPP(
    dados
) {

    dados.ultimaAtualizacao =
        new Date().toISOString();


    localStorage.setItem(

        CHAVE_DESEMPENHO_SIMULADOS_PSCPP,

        JSON.stringify(
            dados
        )

    );

}


// =====================================
// GERAR ID DA TENTATIVA
// =====================================

function gerarIdTentativaSimuladoPSCPP() {

    return (

        "SIM-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2, 8)
            .toUpperCase()

    );

}


// =====================================
// CRIAR REGISTRO ESTATÍSTICO
// =====================================

function criarRegistroEstatisticoPSCPP() {

    return {

        tentativas:
            0,

        questoes:
            0,

        acertos:
            0,

        erros:
            0,

        percentual:
            0

    };

}


// =====================================
// ATUALIZAR PERCENTUAL
// =====================================

function atualizarPercentualRegistroPSCPP(
    registro
) {

    if (
        !registro ||
        !registro.questoes
    ) {

        registro.percentual =
            0;

        return;

    }


    registro.percentual =
        Math.round(

            (
                registro.acertos /
                registro.questoes
            ) * 100

        );

}


// =====================================
// GARANTIR REGISTRO
// =====================================

function garantirRegistroDesempenhoPSCPP(
    colecao,
    chave
) {

    if (
        !chave
    ) {

        chave =
            "nao-informado";

    }


    if (
        !colecao[chave]
    ) {

        colecao[chave] =
            criarRegistroEstatisticoPSCPP();

    }


    return colecao[chave];

}


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================

function normalizarIdentificadorDesempenhoPSCPP(
    valor
) {

    if (!valor) {

        return "nao-informado";

    }


    return valor

        .toString()

        .trim()

        .toLowerCase()

        .normalize(
            "NFD"
        )

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[^a-z0-9]+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""

        ) || "nao-informado";

}


// =====================================
// REGISTRAR QUESTÃO ERRADA
// =====================================

function registrarQuestaoErradaPSCPP(
    dados,
    questao
) {

    if (
        !questao ||
        !questao.questaoId
    ) {

        return;

    }


    const id =
        questao.questaoId;


    if (
        !dados.questoesErradas[id]
    ) {

        dados.questoesErradas[id] = {

            questaoId:
                id,

            disciplina:
                questao.disciplina ||
                "",

            assunto:
                questao.assunto ||
                "",

            topico:
                questao.topico ||
                "",

            edital:
                questao.edital ||
                "",

            bibliografia:
                questao.bibliografia ||
                [],

            quantidadeErros:
                0,

            ultimaOcorrencia:
                null

        };

    }


    dados.questoesErradas[id]
        .quantidadeErros++;


    dados.questoesErradas[id]
        .ultimaOcorrencia =
            new Date().toISOString();

}


// =====================================
// REGISTRAR DESEMPENHO DE UMA QUESTÃO
// =====================================

function registrarDesempenhoQuestaoPSCPP(
    dados,
    questao
) {

    if (!questao) {

        return;

    }


    const acertou =
        questao.acertou === true;


    // =================================
    // DISCIPLINA
    // =================================

    const disciplinaId =
        normalizarIdentificadorDesempenhoPSCPP(
            questao.disciplina
        );


    const registroDisciplina =
        garantirRegistroDesempenhoPSCPP(
            dados.disciplinas,
            disciplinaId
        );


    registroDisciplina.questoes++;


    if (acertou) {

        registroDisciplina.acertos++;

    }

    else {

        registroDisciplina.erros++;

    }


    atualizarPercentualRegistroPSCPP(
        registroDisciplina
    );


    // =================================
    // ASSUNTO
    // =================================

    const assuntoId =
        disciplinaId +
        "__" +
        normalizarIdentificadorDesempenhoPSCPP(
            questao.assunto
        );


    const registroAssunto =
        garantirRegistroDesempenhoPSCPP(
            dados.assuntos,
            assuntoId
        );


    registroAssunto.questoes++;


    if (acertou) {

        registroAssunto.acertos++;

    }

    else {

        registroAssunto.erros++;

    }


    atualizarPercentualRegistroPSCPP(
        registroAssunto
    );


    // =================================
    // TÓPICO
    // =================================

    const topicoId =
        disciplinaId +
        "__" +
        normalizarIdentificadorDesempenhoPSCPP(
            questao.assunto
        ) +
        "__" +
        normalizarIdentificadorDesempenhoPSCPP(
            questao.topico
        );


    const registroTopico =
        garantirRegistroDesempenhoPSCPP(
            dados.topicos,
            topicoId
        );


    registroTopico.questoes++;


    if (acertou) {

        registroTopico.acertos++;

    }

    else {

        registroTopico.erros++;

    }


    atualizarPercentualRegistroPSCPP(
        registroTopico
    );


    // =================================
    // BANCO DE ERROS
    // =================================

    if (!acertou) {

        registrarQuestaoErradaPSCPP(
            dados,
            questao
        );

    }

}


// =====================================
// REGISTRAR TENTATIVAS POR DISCIPLINA
// =====================================

function registrarTentativaDisciplinasPSCPP(
    dados,
    disciplinas
) {

    if (
        !Array.isArray(
            disciplinas
        )
    ) {

        return;

    }


    disciplinas.forEach(
        function(disciplina) {

            const disciplinaId =
                normalizarIdentificadorDesempenhoPSCPP(
                    disciplina
                );


            const registro =
                garantirRegistroDesempenhoPSCPP(
                    dados.disciplinas,
                    disciplinaId
                );


            registro.tentativas++;

        }
    );

}


// =====================================
// SALVAR TENTATIVA
// =====================================

function registrarTentativaSimuladoPSCPP(
    tentativa
) {

    if (
        !tentativa ||
        typeof tentativa !== "object"
    ) {

        console.warn(
            "Tentativa inválida para registro."
        );

        return null;

    }


    const dados =
        carregarDesempenhoSimuladosPSCPP();


    const registro = {

        id:
            tentativa.id ||
            gerarIdTentativaSimuladoPSCPP(),

        data:
            tentativa.data ||
            new Date().toISOString(),

        tipo:
            tentativa.tipo ||
            "personalizado",

        disciplinas:
            Array.isArray(
                tentativa.disciplinas
            )
                ? [
                    ...tentativa.disciplinas
                ]
                : [],

        total:
            Number(
                tentativa.total
            ) || 0,

        acertos:
            Number(
                tentativa.acertos
            ) || 0,

        erros:
            Number(
                tentativa.erros
            ) || 0,

        percentual:
            Number(
                tentativa.percentual
            ) || 0,

        tempoTotalSegundos:
            Number(
                tentativa.tempoTotalSegundos
            ) || 0,

        tempoMedioSegundos:
            Number(
                tentativa.tempoMedioSegundos
            ) || 0,

        questoes:
            Array.isArray(
                tentativa.questoes
            )
                ? tentativa.questoes.map(
                    function(questao) {

                        return {

                            questaoId:
                                questao.questaoId ||
                                questao.id ||
                                "",

                            disciplina:
                                questao.disciplina ||
                                "",

                            assunto:
                                questao.assunto ||
                                "",

                            topico:
                                questao.topico ||
                                "",

                            edital:
                                questao.edital ||
                                "",

                            bibliografia:
                                Array.isArray(
                                    questao.bibliografia
                                )
                                    ? questao.bibliografia
                                    : [],

                            respostaUsuario:
                                questao.respostaUsuario ||
                                "",

                            respostaCorreta:
                                questao.respostaCorreta ||
                                "",

                            acertou:
                                questao.acertou === true

                        };

                    }
                )
                : []

    };


    // =================================
    // HISTÓRICO
    // =================================

    dados.historico.push(
        registro
    );


    // =================================
    // TOTAIS GERAIS
    // =================================

    dados.totalTentativas++;


    dados.totalQuestoesRespondidas +=
        registro.total;


    dados.totalAcertos +=
        registro.acertos;


    dados.totalErros +=
        registro.erros;


    dados.tempoTotalSegundos +=
        registro.tempoTotalSegundos;


    // =================================
    // DISCIPLINAS DA TENTATIVA
    // =================================

    registrarTentativaDisciplinasPSCPP(
        dados,
        registro.disciplinas
    );


    // =================================
    // QUESTÕES
    // =================================

    registro.questoes.forEach(
        function(questao) {

            registrarDesempenhoQuestaoPSCPP(
                dados,
                questao
            );

        }
    );


    // =================================
    // SALVAR
    // =================================

    salvarDesempenhoSimuladosPSCPP(
        dados
    );


    console.log(
        "Tentativa PSCPP registrada:",
        registro.id
    );


    return registro;

}


// =====================================
// OBTER HISTÓRICO
// =====================================

function obterHistoricoSimuladosPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    return [
        ...dados.historico
    ].reverse();

}


// =====================================
// OBTER ÚLTIMA TENTATIVA
// =====================================

function obterUltimaTentativaSimuladoPSCPP() {

    const historico =
        obterHistoricoSimuladosPSCPP();


    return historico.length > 0
        ? historico[0]
        : null;

}


// =====================================
// RESUMO GERAL
// =====================================

function obterResumoGeralSimuladosPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    const percentual =
        dados.totalQuestoesRespondidas > 0

            ? Math.round(

                (
                    dados.totalAcertos /
                    dados.totalQuestoesRespondidas
                ) * 100

            )

            : 0;


    const tempoMedioQuestao =
        dados.totalQuestoesRespondidas > 0

            ? Math.round(

                dados.tempoTotalSegundos /
                dados.totalQuestoesRespondidas

            )

            : 0;


    return {

        totalTentativas:
            dados.totalTentativas,

        totalQuestoes:
            dados.totalQuestoesRespondidas,

        totalAcertos:
            dados.totalAcertos,

        totalErros:
            dados.totalErros,

        percentual:
            percentual,

        tempoTotalSegundos:
            dados.tempoTotalSegundos,

        tempoMedioQuestaoSegundos:
            tempoMedioQuestao

    };

}


// =====================================
// DESEMPENHO POR DISCIPLINA
// =====================================

function obterDesempenhoDisciplinasPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    return {
        ...dados.disciplinas
    };

}


// =====================================
// DESEMPENHO POR ASSUNTO
// =====================================

function obterDesempenhoAssuntosPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    return {
        ...dados.assuntos
    };

}


// =====================================
// DESEMPENHO POR TÓPICO
// =====================================

function obterDesempenhoTopicosPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    return {
        ...dados.topicos
    };

}


// =====================================
// QUESTÕES ERRADAS
// =====================================

function obterQuestoesErradasSimuladosPSCPP() {

    const dados =
        carregarDesempenhoSimuladosPSCPP();


    return Object.values(
        dados.questoesErradas
    )

    .sort(
        function(a, b) {

            return (
                b.quantidadeErros -
                a.quantidadeErros
            );

        }
    );

}


// =====================================
// LIMPAR HISTÓRICO
// =====================================

function limparDesempenhoSimuladosPSCPP() {

    localStorage.removeItem(
        CHAVE_DESEMPENHO_SIMULADOS_PSCPP
    );


    console.log(
        "Histórico de simulados PSCPP removido."
    );

}


// =====================================
// LOG
// =====================================

console.log(
    "Desempenho dos Simulados PSCPP v1.0 carregado."
);
