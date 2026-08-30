// =====================================
// GUIA DE ESTUDOS PSCPP
// PAINEL DE CONTROLE INTELIGENTE v5.1
// Bridge Trainer PSCPP
//
// Integra:
//
// - progresso.js
// - banco-conteudo.js
// - configuracao-estudo.js
// - motor-planejamento.js
// - disciplinas.json
//
// RESPONSABILIDADES:
//
// 1. Exibir visão geral dos estudos.
// 2. Calcular progresso estratégico.
// 3. Mostrar carga estimada.
// 4. Mostrar assuntos concluídos.
// 5. Consultar o MESMO motor do Planejamento
//    para determinar o Próximo Foco.
// 6. Gerar automaticamente os cards do
//    conteúdo programático.
// 7. Resolver caminhos físicos das aulas
//    através de disciplinas.json.
//
// IMPORTANTE:
//
// O Guia NÃO possui motor próprio
// de recomendação.
//
// A decisão estratégica vem de:
//
// obterProximoEstudo()
//
// do motor-planejamento.js.
//
// Os IDs lógicos vêm do banco de conteúdo
// e do motor.
//
// Os caminhos físicos vêm de:
//
// disciplinas.json
//
// Assim:
//
// Guia de Estudos
// Planejamento
//
// passam a trabalhar com os mesmos IDs,
// sem pressupor que:
//
// ID lógico = nome físico do arquivo.
// =====================================


console.log(
    "APP GUIA PSCPP v5.1 CARREGADO"
);


// =====================================
// VARIÁVEIS PRINCIPAIS
// =====================================

let totalDisciplinas = 0;

let totalAssuntos = 0;

let totalHoras = 0;

let assuntosConcluidos = 0;

let horasConcluidas = 0;


// Controle estratégico de progresso

let pesoTotal = 0;

let pesoConcluido = 0;


// =====================================
// CATÁLOGO FÍSICO DAS DISCIPLINAS
// =====================================
//
// Fonte única para:
//
// - pasta física da disciplina;
// - arquivo físico da aula.
//
// Os IDs lógicos continuam vindo do
// banco-conteudo.js e do motor.

let catalogoDisciplinasGuia = null;


// =====================================
// ÍCONES DAS DISCIPLINAS
// =====================================

const iconesDisciplinasGuia = {

    manobrabilidade:
        "🚢",

    "arte-naval":
        "⚓",

    navegacao:
        "🧭",

    meteorologia:
        "🌦",

    regulamentacao:
        "📜",

    comunicacoes:
        "📡",

    "conhecimentos-gerais":
        "🌍"

};


// =====================================
// STATUS REAL DE UM ASSUNTO
// =====================================

function obterStatusRealDoAssunto(
    idDisciplina,
    assunto
) {

    if (
        typeof obterProgressoAula !==
        "function"
    ) {

        return "Não iniciado";

    }


    const percentual =
        Number(

            obterProgressoAula(

                idDisciplina,

                assunto.id

            )

        ) || 0;


    if (
        percentual >= 100
    ) {

        return "Concluído";

    }


    if (
        percentual > 0
    ) {

        return "Em estudo";

    }


    return "Não iniciado";

}


// =====================================
// OBTER PROGRESSO REAL DO ASSUNTO
// =====================================

function obterPercentualRealAssuntoGuia(
    idDisciplina,
    assunto
) {

    if (
        typeof obterProgressoAula !==
        "function"
    ) {

        return 0;

    }


    return Math.max(

        0,

        Math.min(

            100,

            Number(

                obterProgressoAula(

                    idDisciplina,

                    assunto.id

                )

            ) || 0

        )

    );

}


// =====================================
// PROCESSAMENTO DO BANCO DE CONTEÚDO
// =====================================

function processarConteudo() {

    if (
        typeof conteudoPSCPP ===
        "undefined" ||
        !conteudoPSCPP
    ) {

        console.error(
            "Banco de conteúdo PSCPP não encontrado."
        );


        return;

    }


    // Reiniciar acumuladores

    totalDisciplinas = 0;

    totalAssuntos = 0;

    totalHoras = 0;

    assuntosConcluidos = 0;

    horasConcluidas = 0;

    pesoTotal = 0;

    pesoConcluido = 0;


    totalDisciplinas =
        Object.keys(
            conteudoPSCPP
        ).length;


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

                totalAssuntos++;


                const horas =
                    Number(
                        assunto.horas
                    ) || 0;


                totalHoras +=
                    horas;


                const pesoAssunto =

                    horas *

                    (
                        Number(
                            assunto.peso
                        ) || 1
                    );


                pesoTotal +=
                    pesoAssunto;


                const percentual =
                    obterPercentualRealAssuntoGuia(

                        idDisciplina,

                        assunto

                    );


                if (
                    percentual >= 100
                ) {

                    assuntosConcluidos++;

                }


                // =================================
                // HORAS EQUIVALENTES CONCLUÍDAS
                // =================================
                //
                // Uma aula parcialmente concluída
                // contribui proporcionalmente.

                horasConcluidas +=

                    horas *

                    (
                        percentual /
                        100
                    );


                pesoConcluido +=

                    pesoAssunto *

                    (
                        percentual /
                        100
                    );

            }
        );

    }

}


// =====================================
// CÁLCULO DO PROGRESSO ESTRATÉGICO
// =====================================

function calcularProgressoEstrategico() {

    if (
        pesoTotal <= 0
    ) {

        return 0;

    }


    return Math.round(

        (
            pesoConcluido /
            pesoTotal
        ) *
        100

    );

}


// =====================================
// ARREDONDAR HORAS
// =====================================

function arredondarHorasGuia(
    valor
) {

    const numero =
        Number(valor) || 0;


    return (
        Math.round(
            numero * 10
        ) /
        10
    );

}


// =====================================
// ATUALIZAR ELEMENTO HTML
// =====================================

function atualizarElemento(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (
        elemento
    ) {

        elemento.textContent =
            valor;

    }

}


// =====================================
// CARREGAR CATÁLOGO DE DISCIPLINAS
// =====================================

async function carregarCatalogoDisciplinasGuia() {

    if (
        catalogoDisciplinasGuia
    ) {

        return catalogoDisciplinasGuia;

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


        catalogoDisciplinasGuia =
            await resposta.json();


        return catalogoDisciplinasGuia;

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

function obterDisciplinaCatalogoGuia(
    idDisciplina
) {

    if (
        !catalogoDisciplinasGuia ||
        !Array.isArray(
            catalogoDisciplinasGuia.disciplinas
        )
    ) {

        return null;

    }


    return (
        catalogoDisciplinasGuia
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
// RESOLVER CAMINHO FÍSICO DA DISCIPLINA
// =====================================

function resolverCaminhoDisciplinaGuia(
    idDisciplina
) {

    const disciplina =
        obterDisciplinaCatalogoGuia(
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
            "Pasta da disciplina não definida em disciplinas.json:",
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
// RESOLVER CAMINHO FÍSICO DA AULA
// =====================================

function resolverCaminhoAulaGuia(
    idDisciplina,
    idAula
) {

    const disciplina =
        obterDisciplinaCatalogoGuia(
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


// =====================================================
// PRÓXIMO FOCO
// =====================================================


// =====================================
// OBTER PRÓXIMO FOCO DO MOTOR
// =====================================
//
// O Guia NÃO calcula prioridade.
//
// Ele consulta:
//
// motor-planejamento.js
//
// através de:
//
// obterProximoEstudo()

function obterProximoFocoGuia() {

    if (
        typeof obterProximoEstudo !==
        "function"
    ) {

        console.error(
            "motor-planejamento.js não está disponível."
        );


        return null;

    }


    return obterProximoEstudo();

}


// =====================================
// CRIAR PAINEL INTELIGENTE
// =====================================

function criarPainelInteligente() {

    const progresso =
        calcularProgressoEstrategico();


    const dashboard =
        document.querySelector(
            ".dashboard"
        );


    if (
        !dashboard
    ) {

        return;

    }


    const cards =
        dashboard.querySelector(
            ".cards"
        );


    if (
        !cards
    ) {

        return;

    }


    // =================================
    // REMOVER CARDS DINÂMICOS ANTIGOS
    // =================================

    const paineisAntigos =
        cards.querySelectorAll(
            "[data-painel-inteligente]"
        );


    paineisAntigos.forEach(
        painel => {

            painel.remove();

        }
    );


    // =================================
    // PROGRESSO ESTRATÉGICO
    // =================================

    const progressoBox =
        document.createElement(
            "div"
        );


    progressoBox.className =
        "card";


    progressoBox.dataset
        .painelInteligente =
        "progresso";


    progressoBox.innerHTML = `

        <h3>
        📈 Progresso Estratégico
        </h3>

        <p>
        ${progresso}% concluído
        </p>

        <p>
        ${assuntosConcluidos}
        de
        ${totalAssuntos}
        assuntos
        </p>

        <p>
        ${arredondarHorasGuia(
            horasConcluidas
        )}h equivalentes concluídas
        </p>

    `;


    cards.appendChild(
        progressoBox
    );


    // =================================
    // PRÓXIMO FOCO
    // =================================

    const focoBox =
        document.createElement(
            "div"
        );


    focoBox.className =
        "card";


    focoBox.dataset
        .painelInteligente =
        "foco";


    const proximo =
        obterProximoFocoGuia();


    if (
        proximo
    ) {

        const icone =

            iconesDisciplinasGuia[
                proximo.idDisciplina
            ] ||

            "🎯";


        let textoCiclo =
            "";


        if (
            proximo.continuidadePomodoro
        ) {

            textoCiclo = `

                <p>
                🍅 Ciclo:
                ${proximo.blocosCompletosNoCiclo}
                de
                3 blocos completos
                </p>

            `;

        }


        let textoCarga =
            "";


        if (
            proximo.cargaCognitiva
        ) {

            textoCarga = `

                <p>
                Carga cognitiva:
                ${proximo.cargaCognitiva}
                </p>

            `;

        }


        focoBox.innerHTML = `

            <h3>
            🎯 Próximo Foco
            </h3>

            <p>
            <strong>
            ${icone}
            ${proximo.disciplina}
            </strong>
            </p>

            <p>
            ${proximo.assunto}
            </p>

            ${textoCarga}

            ${textoCiclo}

        `;


        // =================================
        // LINK PARA A AULA
        // =================================

        const caminhoAula =
            resolverCaminhoAulaGuia(

                proximo.idDisciplina,

                proximo.idAssunto

            );


        if (
            caminhoAula
        ) {

            const link =
                document.createElement(
                    "a"
                );


            link.href =
                caminhoAula;


            link.textContent =
                "Ir para a aula";


            focoBox.appendChild(
                link
            );

        }

    }
    else {

        focoBox.innerHTML = `

            <h3>
            🎯 Próximo Foco
            </h3>

            <p>
            ✅ Todos os assuntos cadastrados
            foram concluídos.
            </p>

        `;

    }


    cards.appendChild(
        focoBox
    );

}


// =====================================================
// CONTEÚDO PROGRAMÁTICO DINÂMICO
// =====================================================


// =====================================
// CRIAR STATUS DO ASSUNTO
// =====================================

function obterIconeStatusAssuntoGuia(
    status
) {

    if (
        status ===
        "Concluído"
    ) {

        return "✅";

    }


    if (
        status ===
        "Em estudo"
    ) {

        return "🟡";

    }


    return "⬜";

}


// =====================================
// CRIAR CARD DE DISCIPLINA
// =====================================

function criarCardDisciplinaGuia(
    idDisciplina,
    dadosDisciplina
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "card";


    const titulo =
        document.createElement(
            "h3"
        );


    const icone =

        iconesDisciplinasGuia[
            idDisciplina
        ] ||

        "📚";


    titulo.textContent =

        icone +

        " " +

        dadosDisciplina.nome;


    card.appendChild(
        titulo
    );


    // =================================
    // LISTA DE ASSUNTOS
    // =================================

    const lista =
        document.createElement(
            "ul"
        );


    const assuntos =
        Array.isArray(
            dadosDisciplina.assuntos
        )
            ? dadosDisciplina.assuntos
            : [];


    assuntos.forEach(
        assunto => {

            const item =
                document.createElement(
                    "li"
                );


            const status =
                obterStatusRealDoAssunto(

                    idDisciplina,

                    assunto

                );


            const iconeStatus =
                obterIconeStatusAssuntoGuia(
                    status
                );


            item.textContent =

                iconeStatus +

                " " +

                assunto.nome;


            lista.appendChild(
                item
            );

        }
    );


    card.appendChild(
        lista
    );


    // =================================
    // LINK DA DISCIPLINA
    // =================================

    const caminhoDisciplina =
        resolverCaminhoDisciplinaGuia(
            idDisciplina
        );


    if (
        caminhoDisciplina
    ) {

        const link =
            document.createElement(
                "a"
            );


        link.href =
            caminhoDisciplina;


        link.textContent =
            "Acessar disciplina";


        card.appendChild(
            link
        );

    }


    return card;

}


// =====================================
// RENDERIZAR CONTEÚDO PROGRAMÁTICO
// =====================================

function renderizarConteudoProgramaticoGuia() {

    const container =
        document.getElementById(
            "conteudo-programatico-guia"
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        "";


    if (
        typeof conteudoPSCPP ===
            "undefined" ||
        !conteudoPSCPP
    ) {

        return;

    }


    Object.entries(
        conteudoPSCPP
    ).forEach(

        (
            [
                idDisciplina,
                dadosDisciplina
            ]
        ) => {

            const card =
                criarCardDisciplinaGuia(

                    idDisciplina,

                    dadosDisciplina

                );


            container.appendChild(
                card
            );

        }

    );

}


// =====================================
// ATUALIZAR TODO O GUIA
// =====================================

function atualizarGuiaCompleto() {

    processarConteudo();


    atualizarElemento(
        "total-disciplinas",
        totalDisciplinas
    );


    atualizarElemento(
        "total-assuntos",
        totalAssuntos
    );


    atualizarElemento(
        "total-horas",
        arredondarHorasGuia(
            totalHoras
        ) +
        " horas"
    );


    criarPainelInteligente();


    renderizarConteudoProgramaticoGuia();

}


// =====================================
// INICIALIZAÇÃO
// =====================================

async function inicializarGuiaDeEstudos() {

    if (
        typeof carregarDadosProgresso !==
        "function"
    ) {

        console.error(
            "progresso.js não foi carregado antes de app-guia.js."
        );


        return;

    }


    if (
        typeof conteudoPSCPP ===
        "undefined"
    ) {

        console.error(
            "banco-conteudo.js não foi carregado antes de app-guia.js."
        );


        return;

    }


    await carregarDadosProgresso();


    await carregarCatalogoDisciplinasGuia();


    atualizarGuiaCompleto();

}


// =====================================
// ATUALIZAR APÓS ALTERAÇÃO DO PROGRESSO
// =====================================

document.addEventListener(

    "progressoPSCPPAtualizado",

    function () {

        atualizarGuiaCompleto();

    }

);


// =====================================
// ATUALIZAR APÓS NOVO BLOCO POMODORO
// =====================================

document.addEventListener(

    "planejamentoPSCPPAtualizado",

    function () {

        atualizarGuiaCompleto();

    }

);


// =====================================
// CARREGAMENTO AUTOMÁTICO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    inicializarGuiaDeEstudos

);


// =====================================
// FIM APP-GUIA v5.1
// =====================================
