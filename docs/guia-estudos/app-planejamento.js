// =====================================
// APLICATIVO DE PLANEJAMENTO PSCPP v3.2
// Bridge Trainer PSCPP
//
// Integra:
//
// - progresso.js
// - banco-conteudo.js
// - configuracao-estudo.js
// - calculo-planejamento.js
// - motor-planejamento.js
// - histórico analítico do Pomodoro
// - disciplinas.json
//
// Exibe:
//
// 1. Semana atual.
// 2. Fase do planejamento.
// 3. Disponibilidade semanal.
// 4. Ritmo necessário.
// 5. Ritmo REAL de estudo.
// 6. Saldo do ritmo real.
// 7. Tendência de 7 / 14 / 30 dias.
// 8. Margem de capacidade.
// 9. Horas restantes.
// 10. Situação do prazo.
// 11. Situação do ritmo real.
// 12. Progresso real × esperado.
// 13. Distribuição por disciplina.
// 14. Próximos estudos.
// 15. Ciclo Pomodoro.
//
// IMPORTANTE:
//
// Os IDs lógicos vêm do banco de conteúdo
// e do motor.
//
// Os caminhos físicos vêm de:
//
// disciplinas.json
//
// Portanto:
//
// ID lógico ≠ obrigatoriamente nome
// físico do arquivo.
// =====================================


// =====================================
// ESTADO
// =====================================

let ultimoPlanejamentoRenderizado =
    null;


let ultimoPlanoEstudoRenderizado =
    [];


let catalogoDisciplinasPlanejamento =
    null;


// =====================================
// ARREDONDAR
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
// FORMATAR SALDO DE HORAS
// =====================================

function formatarSaldoHorasPlanejamento(
    valor
) {

    const numero =
        arredondarAppPlanejamento(
            valor,
            1
        );


    return (
        (
            numero > 0
                ? "+"
                : ""
        ) +
        numero +
        " h"
    );

}


// =====================================
// CARREGAR CATÁLOGO DE DISCIPLINAS
// =====================================

async function carregarCatalogoDisciplinasPlanejamento() {

    if (
        catalogoDisciplinasPlanejamento
    ) {

        return catalogoDisciplinasPlanejamento;

    }


    try {

        const resposta =
            await fetch(
                "../data/disciplinas.json"
            );


        if (
            !resposta.ok
        ) {

            throw new Error(
                "Não foi possível carregar disciplinas.json"
            );

        }


        catalogoDisciplinasPlanejamento =
            await resposta.json();


        return catalogoDisciplinasPlanejamento;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar catálogo de disciplinas:",
            erro
        );


        return null;

    }

}


// =====================================
// OBTER DISCIPLINA NO CATÁLOGO
// =====================================

function obterDisciplinaCatalogoPlanejamento(
    idDisciplina
) {

    if (
        !catalogoDisciplinasPlanejamento ||
        !Array.isArray(
            catalogoDisciplinasPlanejamento.disciplinas
        )
    ) {

        return null;

    }


    return (
        catalogoDisciplinasPlanejamento
            .disciplinas
            .find(

                disciplina =>
                    disciplina.id ===
                    idDisciplina

            ) ||
        null
    );

}


// =====================================
// RESOLVER CAMINHO DA DISCIPLINA
// =====================================

function resolverCaminhoDisciplinaPlanejamento(
    idDisciplina
) {

    const disciplina =
        obterDisciplinaCatalogoPlanejamento(
            idDisciplina
        );


    if (!disciplina) {

        console.error(
            "Disciplina não encontrada em disciplinas.json:",
            idDisciplina
        );


        return null;

    }


    if (
        !disciplina.pasta
    ) {

        console.error(
            "Pasta da disciplina não definida:",
            idDisciplina
        );


        return null;

    }


    const paginaInicial =
        disciplina.paginaInicial ||
        "index.html";


    return (

        "../disciplinas/" +
        disciplina.pasta +
        "/" +
        paginaInicial

    );

}


// =====================================
// RESOLVER CAMINHO DA AULA
// =====================================

function resolverCaminhoAulaPlanejamento(
    idDisciplina,
    idAula
) {

    const disciplina =
        obterDisciplinaCatalogoPlanejamento(
            idDisciplina
        );


    if (!disciplina) {

        console.error(
            "Disciplina não encontrada em disciplinas.json:",
            idDisciplina
        );


        return null;

    }


    const modulos =
        Array.isArray(
            disciplina.modulos
        )
            ? disciplina.modulos
            : [];


    const modulo =
        modulos.find(

            item =>
                item.id ===
                idAula

        );


    if (!modulo) {

        console.error(
            "Aula não encontrada em disciplinas.json:",
            idDisciplina,
            idAula
        );


        return null;

    }


    if (
        !disciplina.pasta ||
        !modulo.arquivo
    ) {

        console.error(
            "Pasta ou arquivo físico não definido:",
            idDisciplina,
            idAula
        );


        return null;

    }


    return (

        "../disciplinas/" +
        disciplina.pasta +
        "/" +
        modulo.arquivo

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
// CONTAINER DO DASHBOARD
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
// CRIAR CARD
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
// LIMPAR CARDS DINÂMICOS
// =====================================

function limparIndicadoresDinamicosPlanejamento() {

    const ids = [

        "card-fase-planejamento",

        "card-necessidade-semanal",

        "card-ritmo-real",

        "card-saldo-ritmo-real",

        "card-tendencia-ritmo",

        "card-margem-semanal",

        "card-horas-restantes",

        "card-situacao-prazo",

        "card-situacao-ritmo",

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
// DESCRIÇÃO DO RITMO REAL
// =====================================

function obterDescricaoRitmoReal(
    dados
) {

    const horas =
        arredondarAppPlanejamento(
            dados.horasEstudadas7Dias,
            1
        );


    const dias =
        Number(
            dados.diasComEstudo7Dias
        ) || 0;


    return (
        horas +
        " h registradas em " +
        dias +
        (
            dias === 1
                ? " dia de estudo."
                : " dias de estudo."
        )
    );

}


// =====================================
// DESCRIÇÃO DA TENDÊNCIA
// =====================================

function obterDescricaoTendenciaRitmo(
    dados
) {

    const ritmo7 =
        Number(
            dados.ritmoReal7Dias
        ) || 0;


    const ritmo14 =
        Number(
            dados.ritmoReal14Dias
        ) || 0;


    const ritmo30 =
        Number(
            dados.ritmoReal30Dias
        ) || 0;


    if (
        ritmo7 === 0 &&
        ritmo14 === 0 &&
        ritmo30 === 0
    ) {

        return "Aguardando registros de estudo.";

    }


    if (
        ritmo7 >
        ritmo14
    ) {

        return "Tendência recente de aumento do ritmo.";

    }


    if (
        ritmo7 <
        ritmo14
    ) {

        return "O ritmo dos últimos dias caiu em relação à média recente.";

    }


    return "Ritmo recente estável.";

}


// =====================================
// RENDERIZAR DASHBOARD
// =====================================

function renderizarDashboardPlanejamento(
    dadosPlanejamento
) {

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


    const container =
        obterContainerDashboardPlanejamento();


    if (
        !container
    ) {

        return;

    }


    limparIndicadoresDinamicosPlanejamento();


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


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-necessidade-semanal",

            "🎯 Ritmo Necessário",

            formatarHorasPlanejamento(
                dadosPlanejamento
                    .horasNecessariasSemana
            ) +
            " / semana",

            "Carga média necessária para concluir o conteúdo dentro do prazo."

        )

    );


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-ritmo-real",

            "⏱ Ritmo Real",

            formatarHorasPlanejamento(
                dadosPlanejamento
                    .ritmoReal7Dias
            ) +
            " / semana",

            obterDescricaoRitmoReal(
                dadosPlanejamento
            )

        )

    );


    const saldoReal =
        Number(
            dadosPlanejamento
                .saldoRitmoRealSemana
        ) || 0;


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-saldo-ritmo-real",

            "⚖ Saldo do Ritmo",

            formatarSaldoHorasPlanejamento(
                saldoReal
            ) +
            " / semana",

            saldoReal >= 0

                ? "O ritmo real está cobrindo a carga semanal necessária."

                : "Faltam horas de estudo no ritmo atual para acompanhar a meta."

        )

    );


    const textoTendencia =

        "7d: " +
        arredondarAppPlanejamento(
            dadosPlanejamento
                .ritmoReal7Dias,
            1
        ) +
        "h | 14d: " +
        arredondarAppPlanejamento(
            dadosPlanejamento
                .ritmoReal14Dias,
            1
        ) +
        "h | 30d: " +
        arredondarAppPlanejamento(
            dadosPlanejamento
                .ritmoReal30Dias,
            1
        ) +
        "h";


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-tendencia-ritmo",

            "📈 Tendência de Estudo",

            textoTendencia,

            obterDescricaoTendenciaRitmo(
                dadosPlanejamento
            )

        )

    );


    const margem =
        Number(
            dadosPlanejamento
                .margemSemanal
        ) || 0;


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-margem-semanal",

            "🛡 Margem de Capacidade",

            formatarSaldoHorasPlanejamento(
                margem
            ) +
            " / semana",

            margem >= 0

                ? "Sua disponibilidade configurada comporta a carga necessária."

                : "A disponibilidade configurada é menor que a carga exigida."

        )

    );


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


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-situacao-prazo",

            "🚦 Capacidade × Prazo",

            dadosPlanejamento
                .situacaoPrazo ||
            "Indefinida",

            dadosPlanejamento
                .mensagemSituacaoPrazo ||
            ""

        )

    );


    container.appendChild(

        criarCardIndicadorPlanejamento(

            "card-situacao-ritmo",

            "📡 Ritmo Real × Meta",

            dadosPlanejamento
                .situacaoRitmoReal ||
            "Sem dados",

            dadosPlanejamento
                .mensagemSituacaoRitmoReal ||
            ""

        )

    );


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
// META DA SEMANA
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

            " | meta: " +

            arredondarAppPlanejamento(
                dadosPlanejamento
                    .horasNecessariasSemana,
                1
            ) +

            " h/sem";

    }


    metaElemento.textContent =
        texto;

}


// =====================================
// DISTRIBUIÇÃO POR DISCIPLINA
// =====================================

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


            const caminhoDisciplina =
                resolverCaminhoDisciplinaPlanejamento(
                    idDisciplina
                );


            if (
                caminhoDisciplina
            ) {

                card.href =
                    caminhoDisciplina;

            }


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
// CARGA COGNITIVA
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
// LINK PARA AULA
// =====================================

function criarLinkAulaPlanejamento(
    item
) {

    const caminhoAula =
        resolverCaminhoAulaPlanejamento(

            item.idDisciplina,

            item.idAssunto

        );


    if (
        !caminhoAula
    ) {

        return null;

    }


    const link =
        document.createElement(
            "a"
        );


    link.className =
        "botao";


    link.href =
        caminhoAula;


    link.textContent =
        "Ir para a aula";


    return link;

}


// =====================================
// PRÓXIMOS ESTUDOS
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


                const ordem =
                    document.createElement(
                        "p"
                    );


                ordem.textContent =

                    indice === 0
                        ? "🎯 Próximo estudo recomendado"
                        : "Opção " + (indice + 1);


                const tituloDisciplina =
                    document.createElement(
                        "h3"
                    );


                tituloDisciplina.textContent =
                    item.disciplina;


                const tituloAssunto =
                    document.createElement(
                        "p"
                    );


                tituloAssunto.textContent =
                    item.assunto;


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


                const carga =
                    document.createElement(
                        "p"
                    );


                carga.textContent =

                    "Carga cognitiva: " +

                    obterTextoCargaCognitiva(
                        item.cargaCognitiva
                    );


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


                if (
                    item.continuidadePomodoro
                ) {

                    const ciclo =
                        document.createElement(
                            "p"
                        );


                    ciclo.textContent =

                        "🍅 Ciclo atual: " +

                        item
                            .blocosCompletosNoCiclo +

                        " de 3 blocos completos";


                    estudo.appendChild(
                        ciclo
                    );

                }


                const linkAula =
                    criarLinkAulaPlanejamento(
                        item
                    );


                if (
                    linkAula
                ) {

                    estudo.appendChild(
                        linkAula
                    );

                }


                lista.appendChild(
                    estudo
                );

            }
        );


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

    if (
        typeof carregarDadosProgresso ===
        "function"
    ) {

        await carregarDadosProgresso();

    }
    else {

        console.error(
            "progresso.js não foi carregado antes de app-planejamento.js."
        );

    }


    await carregarCatalogoDisciplinasPlanejamento();


    renderizarPlanejamentoCompleto();

}


// =====================================
// ATUALIZAÇÃO APÓS MOTOR/POMODORO
// =====================================

document.addEventListener(

    "planejamentoPSCPPAtualizado",

    function () {

        renderizarPlanejamentoCompleto();

    }

);


// =====================================
// ATUALIZAÇÃO APÓS PROGRESSO
// =====================================

document.addEventListener(

    "progressoPSCPPAtualizado",

    function () {

        renderizarPlanejamentoCompleto();

    }

);


// =====================================
// CARREGAMENTO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    inicializarPlanejamento

);


// =====================================
// DEBUG
// =====================================

console.log(
    "APP-PLANEJAMENTO PSCPP v3.2 CARREGADO"
);


// =====================================
// FIM APP-PLANEJAMENTO v3.2
// =====================================
