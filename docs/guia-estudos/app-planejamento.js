// =====================================
// APLICATIVO DE PLANEJAMENTO PSCPP v3.0
// Bridge Trainer PSCPP
//
// Integra:
//
// - progresso.js
// - banco-conteudo.js
// - configuracao-estudo.js
// - calculo-planejamento.js v2.0
// - motor-planejamento.js v3.3
// - Pomodoro inteligente
//
// Exibe:
//
// 1. Semana atual.
// 2. Fase do planejamento.
// 3. Disponibilidade semanal.
// 4. Necessidade semanal.
// 5. Margem semanal.
// 6. Horas restantes.
// 7. Situação do prazo.
// 8. Progresso real × esperado.
// 9. Distribuição por disciplina.
// 10. Próximos estudos recomendados.
// 11. Ciclo Pomodoro atual.
// =====================================


// =====================================
// ESTADO
// =====================================

let ultimoPlanejamentoRenderizado =
    null;


let ultimoPlanoEstudoRenderizado =
    [];


// =====================================
// ARREDONDAR VALOR
// =====================================

function arredondarAppPlanejamento(
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
// FORMATAR HORAS
// =====================================

function formatarHorasPlanejamento(
    valor
) {

    const numero =
        arredondarAppPlanejamento(
            valor,
            1
        );


    return (
        numero +
        (
            numero === 1
                ? " hora"
                : " horas"
        )
    );

}


// =====================================
// CALCULAR SEMANA ATUAL
// =====================================

function calcularSemanaAtualApp(
    dadosPlanejamento
) {

    const dataInicio =
        new Date(
            dadosPlanejamento
                .dataInicio +
            "T00:00:00"
        );


    const dataAtual =
        new Date();


    const milissegundosPorSemana =

        1000 *
        60 *
        60 *
        24 *
        7;


    const diferenca =
        dataAtual -
        dataInicio;


    let semana =
        Math.floor(
            diferenca /
            milissegundosPorSemana
        ) + 1;


    if (
        semana < 1
    ) {

        semana = 1;

    }


    const totalSemanas =
        Number(
            dadosPlanejamento
                .semanasDisponiveis
        ) || 0;


    if (
        totalSemanas > 0 &&
        semana > totalSemanas
    ) {

        semana =
            totalSemanas;

    }


    return semana;

}


// =====================================
// OBTER CONTAINER DOS CARDS SUPERIORES
// =====================================

function obterContainerDashboardPlanejamento() {

    const dashboard =
        document.querySelector(
            ".dashboard"
        );


    if (
        !dashboard
    ) {

        return null;

    }


    return dashboard.querySelector(
        ".cards"
    );

}


// =====================================
// CRIAR CARD DE INDICADOR
// =====================================

function criarCardIndicadorPlanejamento(
    id,
    titulo,
    valor,
    descricao = ""
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "card";


    card.id =
        id;


    const tituloElemento =
        document.createElement(
            "h3"
        );


    tituloElemento.textContent =
        titulo;


    const valorElemento =
        document.createElement(
            "p"
        );


    valorElemento.className =
        "valor-planejamento";


    valorElemento.textContent =
        valor;


    card.appendChild(
        tituloElemento
    );


    card.appendChild(
        valorElemento
    );


    if (
        descricao
    ) {

        const descricaoElemento =
            document.createElement(
                "p"
            );


        descricaoElemento.textContent =
            descricao;


        card.appendChild(
            descricaoElemento
        );

    }


    return card;

}


// =====================================
// REMOVER INDICADORES DINÂMICOS ANTIGOS
// =====================================

function limparIndicadoresDinamicosPlanejamento() {

    const ids = [

        "card-fase-planejamento",

        "card-necessidade-semanal",

        "card-margem-semanal",

        "card-horas-restantes",

        "card-situacao-prazo",

        "card-progresso-planejamento",

        "card-ciclo-pomodoro"

    ];


    ids.forEach(
        id => {

            const elemento =
                document.getElementById(
                    id
                );


            if (
                elemento
            ) {

                elemento.remove();

            }

        }
    );

}


// =====================================
// RENDERIZAR DASHBOARD
// =====================================

function renderizarDashboardPlanejamento(
    dadosPlanejamento
) {

    // =================================
    // SEMANA ATUAL
    // =================================

    const semanaElemento =
        document.getElementById(
            "semana-atual"
        );


    if (
        semanaElemento
    ) {

        const semanaAtual =
            calcularSemanaAtualApp(
                dadosPlanejamento
            );


        semanaElemento.textContent =

            "Semana " +
            semanaAtual +
            " de " +
            dadosPlanejamento
                .semanasDisponiveis;

    }


    // =================================
    // HORAS DISPONÍVEIS
    // =================================

    const horasElemento =
        document.getElementById(
            "horas-disponiveis"
        );


    if (
        horasElemento
    ) {

        horasElemento.textContent =

            formatarHorasPlanejamento(
                dadosPlanejamento
                    .horasSemanaReais
            ) +
            " / semana";

    }


    // =================================
    // CONTAINER
    // =================================

    const container =
        obterContainerDashboardPlanejamento();


    if (
        !container
    ) {

        return;

    }


    limparIndicadoresDinamicosPlanejamento();


    // =================================
    // FASE ATUAL
    // =================================

    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-fase-planejamento",

            "🧭 Fase Atual",

            dadosPlanejamento
                .nomeFaseAtual ||
            "Planejamento Geral",

            "Fase estratégica atual da preparação."

        )

    );


    // =================================
    // CARGA NECESSÁRIA
    // =================================

    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-necessidade-semanal",

            "🎯 Ritmo Necessário",

            formatarHorasPlanejamento(
                dadosPlanejamento
                    .horasNecessariasSemana
            ) +
            " / semana",

            "Carga mínima média para concluir o conteúdo dentro do prazo."

        )

    );


    // =================================
    // MARGEM SEMANAL
    // =================================

    const margem =
        Number(
            dadosPlanejamento
                .margemSemanal
        ) || 0;


    const textoMargem =

        (
            margem >= 0
                ? "+"
                : ""
        ) +

        arredondarAppPlanejamento(
            margem,
            1
        ) +

        " h / semana";


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-margem-semanal",

            "📈 Margem Semanal",

            textoMargem,

            margem >= 0

                ? "Há margem entre a disponibilidade e a carga necessária."

                : "A carga necessária está acima da disponibilidade configurada."

        )

    );


    // =================================
    // HORAS RESTANTES
    // =================================

    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-horas-restantes",

            "⏳ Conteúdo Restante",

            formatarHorasPlanejamento(
                dadosPlanejamento
                    .horasRestantesConteudo
            ),

            dadosPlanejamento
                .assuntosConcluidos +

            " de " +

            dadosPlanejamento
                .quantidadeAssuntos +

            " assuntos concluídos."

        )

    );


    // =================================
    // SITUAÇÃO DO PRAZO
    // =================================

    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-situacao-prazo",

            "🚦 Situação do Prazo",

            dadosPlanejamento
                .situacaoPrazo ||
            "Indefinida",

            dadosPlanejamento
                .mensagemSituacaoPrazo ||
            ""

        )

    );


    // =================================
    // PROGRESSO REAL × ESPERADO
    // =================================

    const progressoReal =
        arredondarAppPlanejamento(
            dadosPlanejamento
                .progressoReal,
            1
        );


    const progressoEsperado =
        arredondarAppPlanejamento(
            dadosPlanejamento
                .progressoEsperado,
            1
        );


    const desvio =
        arredondarAppPlanejamento(
            dadosPlanejamento
                .desvioProgresso,
            1
        );


    const textoDesvio =

        (
            desvio >= 0
                ? "+"
                : ""
        ) +

        desvio +

        " pontos percentuais";


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-progresso-planejamento",

            "📊 Progresso × Cronograma",

            progressoReal +
            "% real / " +
            progressoEsperado +
            "% esperado",

            "Desvio: " +
            textoDesvio

        )

    );


    // =================================
    // CICLO POMODORO
    // =================================

    if (
        typeof obterSituacaoCicloPomodoro ===
        "function"
    ) {

        const ciclo =
            obterSituacaoCicloPomodoro();


        if (
            ciclo
        ) {

            container.appendChild(

                criarCardIndicadorPlanejamento(

                    "card-ciclo-pomodoro",

                    "🍅 Ciclo Atual",

                    ciclo.blocosCompletos +
                    " de " +
                    ciclo.totalBlocos +
                    " blocos",

                    ciclo.cicloCompleto

                        ? "Ciclo de 1h30 concluído. Alternância liberada."

                        : ciclo.blocosRestantes +
                          " bloco(s) restante(s) antes da alternância."

                )

            );

        }

    }

}


// =====================================
// RENDERIZAR META DA SEMANA
// =====================================

function renderizarMetaPlanejamento(
    planoEstudo,
    dadosPlanejamento
) {

    const metaElemento =
        document.getElementById(
            "meta-semana"
        );


    if (
        !metaElemento
    ) {

        return;

    }


    if (
        planoEstudo.length === 0
    ) {

        metaElemento.textContent =
            "Todos os assuntos concluídos";


        return;

    }


    const primeiro =
        planoEstudo[0];


    let texto =

        primeiro.disciplina +
        " — " +
        primeiro.assunto;


    if (
        primeiro.continuidadePomodoro
    ) {

        texto +=

            " | continuar ciclo (" +

            primeiro
                .blocosCompletosNoCiclo +

            "/3)";

    }


    if (
        dadosPlanejamento &&
        dadosPlanejamento
            .horasNecessariasSemana > 0
    ) {

        texto +=

            " | meta semanal: " +

            arredondarAppPlanejamento(
                dadosPlanejamento
                    .horasNecessariasSemana,
                1
            ) +

            " h";

    }


    metaElemento.textContent =
        texto;

}


// =====================================
// DISTRIBUIÇÃO POR DISCIPLINA
// =====================================
//
// A versão antiga somava as horas nominais
// dos itens presentes no plano.
//
// Agora utilizamos o cálculo real de
// horas restantes por disciplina.

function renderizarDistribuicaoPlanejamento(
    dadosPlanejamento
) {

    const distribuicao =
        document.getElementById(
            "distribuicao-carga"
        );


    if (
        !distribuicao
    ) {

        return;

    }


    distribuicao.innerHTML =
        "";


    const disciplinas =
        dadosPlanejamento
            .disciplinas ||
        {};


    const ids =
        Object.keys(
            disciplinas
        );


    ids.sort(
        (a, b) => {

            const horasA =
                Number(
                    disciplinas[a]
                        .horasRestantes
                ) || 0;


            const horasB =
                Number(
                    disciplinas[b]
                        .horasRestantes
                ) || 0;


            return (
                horasB -
                horasA
            );

        }
    );


    ids.forEach(
        idDisciplina => {

            const dados =
                disciplinas[
                    idDisciplina
                ];


            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "card";


            card.href =

                "../disciplinas/" +
                idDisciplina +
                "/index.html";


            const titulo =
                document.createElement(
                    "h3"
                );


            titulo.textContent =
                dados.nome;


            const progresso =
                document.createElement(
                    "p"
                );


            progresso.textContent =

                "📊 Progresso: " +
                arredondarAppPlanejamento(
                    dados.progresso,
                    1
                ) +
                "%";


            const horas =
                document.createElement(
                    "p"
                );


            horas.textContent =

                "⏳ " +

                formatarHorasPlanejamento(
                    dados.horasRestantes
                ) +

                " restantes";


            const assuntos =
                document.createElement(
                    "p"
                );


            assuntos.textContent =

                "✅ " +
                dados.assuntosConcluidos +
                " de " +
                dados.quantidadeAssuntos +
                " assuntos concluídos";


            card.appendChild(
                titulo
            );


            card.appendChild(
                progresso
            );


            card.appendChild(
                horas
            );


            card.appendChild(
                assuntos
            );


            distribuicao.appendChild(
                card
            );

        }
    );

}


// =====================================
// OBTER TEXTO DA CARGA COGNITIVA
// =====================================

function obterTextoCargaCognitiva(
    carga
) {

    if (
        carga === "Alta"
    ) {

        return "🧠 Alta";

    }


    if (
        carga === "Baixa"
    ) {

        return "🌿 Baixa";

    }


    return "📘 Média";

}


// =====================================
// CRIAR LINK PARA AULA
// =====================================

function criarLinkAulaPlanejamento(
    item
) {

    const link =
        document.createElement(
            "a"
        );


    link.className =
        "botao";


    link.href =

        "../disciplinas/" +
        item.idDisciplina +
        "/" +
        item.idAssunto +
        ".html";


    link.textContent =
        "Ir para a aula";


    return link;

}


// =====================================
// RENDERIZAR PRÓXIMOS ESTUDOS
// =====================================

function renderizarProximosEstudos(
    planoEstudo
) {

    const lista =
        document.getElementById(
            "lista-estudos"
        );


    if (
        !lista
    ) {

        return;

    }


    lista.innerHTML =
        "";


    planoEstudo
        .slice(
            0,
            10
        )
        .forEach(
            (
                item,
                indice
            ) => {

                const estudo =
                    document.createElement(
                        "div"
                    );


                estudo.className =
                    "card";


                // =============================
                // POSIÇÃO
                // =============================

                const ordem =
                    document.createElement(
                        "p"
                    );


                ordem.textContent =

                    indice === 0
                        ? "🎯 Próximo estudo recomendado"
                        : "Opção " + (indice + 1);


                // =============================
                // DISCIPLINA
                // =============================

                const tituloDisciplina =
                    document.createElement(
                        "h3"
                    );


                tituloDisciplina.textContent =
                    item.disciplina;


                // =============================
                // ASSUNTO
                // =============================

                const tituloAssunto =
                    document.createElement(
                        "p"
                    );


                tituloAssunto.textContent =
                    item.assunto;


                // =============================
                // PROGRESSO
                // =============================

                const progresso =
                    document.createElement(
                        "p"
                    );


                progresso.textContent =

                    "📊 Progresso atual: " +

                    arredondarAppPlanejamento(
                        item.percentualConcluido,
                        1
                    ) +

                    "%";


                // =============================
                // CARGA COGNITIVA
                // =============================

                const carga =
                    document.createElement(
                        "p"
                    );


                carga.textContent =

                    "Carga cognitiva: " +

                    obterTextoCargaCognitiva(
                        item.cargaCognitiva
                    );


                // =============================
                // PRIORIDADE
                // =============================

                const prioridade =
                    document.createElement(
                        "p"
                    );


                prioridade.textContent =

                    "⭐ Prioridade estratégica: " +

                    arredondarAppPlanejamento(
                        item.prioridade,
                        2
                    );


                // =============================
                // CONTINUIDADE POMODORO
                // =============================

                if (
                    item.continuidadePomodoro
                ) {

                    const ciclo =
                        document.createElement(
                            "p"
                        );


                    ciclo.textContent =

                        "🍅 Ciclo: " +

                        item
                            .blocosCompletosNoCiclo +

                        " de 3 blocos completos";


                    estudo.appendChild(
                        ciclo
                    );

                }


                // =============================
                // LINK
                // =============================

                const link =
                    criarLinkAulaPlanejamento(
                        item
                    );


                estudo.appendChild(
                    ordem
                );


                estudo.appendChild(
                    tituloDisciplina
                );


                estudo.appendChild(
                    tituloAssunto
                );


                estudo.appendChild(
                    progresso
                );


                estudo.appendChild(
                    carga
                );


                estudo.appendChild(
                    prioridade
                );


                estudo.appendChild(
                    link
                );


                lista.appendChild(
                    estudo
                );

            }
        );


    // =================================
    // NENHUM ASSUNTO PENDENTE
    // =================================

    if (
        planoEstudo.length === 0
    ) {

        const aviso =
            document.createElement(
                "div"
            );


        aviso.className =
            "card";


        aviso.innerHTML = `

            <h3>
            ✅ Planejamento concluído
            </h3>

            <p>
            Todos os assuntos cadastrados
            foram concluídos.
            </p>

        `;


        lista.appendChild(
            aviso
        );

    }

}


// =====================================
// RENDERIZAÇÃO COMPLETA
// =====================================

function renderizarPlanejamentoCompleto() {

    if (
        typeof calcularPlanejamento !==
        "function"
    ) {

        console.error(
            "calculo-planejamento.js não foi carregado."
        );


        return;

    }


    if (
        typeof gerarPlanoEstudo !==
        "function"
    ) {

        console.error(
            "motor-planejamento.js não foi carregado."
        );


        return;

    }


    const dadosPlanejamento =
        calcularPlanejamento();


    const planoEstudo =
        gerarPlanoEstudo();


    ultimoPlanejamentoRenderizado =
        dadosPlanejamento;


    ultimoPlanoEstudoRenderizado =
        planoEstudo;


    renderizarDashboardPlanejamento(
        dadosPlanejamento
    );


    renderizarMetaPlanejamento(
        planoEstudo,
        dadosPlanejamento
    );


    renderizarDistribuicaoPlanejamento(
        dadosPlanejamento
    );


    renderizarProximosEstudos(
        planoEstudo
    );

}


// =====================================
// INICIALIZAÇÃO
// =====================================

async function inicializarPlanejamento() {

    // =================================
    // CARREGAR PROGRESSO
    // =================================

    if (
        typeof carregarDadosProgresso ===
        "function"
    ) {

        await carregarDadosProgresso();

    }
    else {

        console.error(

            "progresso.js não foi carregado antes de " +
            "app-planejamento.js."

        );

    }


    renderizarPlanejamentoCompleto();

}


// =====================================
// ATUALIZAÇÃO APÓS POMODORO
// =====================================
//
// motor-planejamento.js v3.3 dispara
// planejamentoPSCPPAtualizado.
//
// Assim a interface pode reagir sem
// precisar recarregar toda a página.

document.addEventListener(

    "planejamentoPSCPPAtualizado",

    function () {

        renderizarPlanejamentoCompleto();

    }

);


// =====================================
// CARREGAMENTO AUTOMÁTICO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    inicializarPlanejamento

);


// =====================================
// DEBUG
// =====================================

console.log(
    "APP-PLANEJAMENTO PSCPP v3.0 CARREGADO"
);


// =====================================
// FIM APP-PLANEJAMENTO v3.0
// =====================================
