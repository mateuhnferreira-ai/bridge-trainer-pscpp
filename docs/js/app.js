/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS v4.2

   CAMADA DE COACHING

   Responsabilidades:

   - Próximo estudo estratégico
   - Meta da semana estratégica
   - Última aula estudada
   - Próxima revisão inteligente

   Integração:

   - progresso.js v4.2
   - banco-conteudo.js
   - configuracao-estudo.js
   - calculo-planejamento.js
   - motor-planejamento.js v3.4

   ARQUITETURA:

   progresso.js
        ↓
   banco-conteudo.js
        ↓
   configuracao-estudo.js
        ↓
   calculo-planejamento.js
        ↓
   motor-planejamento.js
        ↓
   app.js

   IMPORTANTE:

   progresso.js continua sendo a fonte única
   dos dados de progresso e revisão.

   motor-planejamento.js passa a ser a fonte
   única da decisão:

   "O que estudar agora?"

   Assim:

   - Página Principal
   - Guia de Estudos
   - Planejamento

   podem utilizar a mesma recomendação estratégica.
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

let catalogoDisciplinasPSCPP =
    null;


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================

function normalizarIdApp(
    texto
) {

    if (!texto) {

        return "";

    }


    return texto

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
// VERIFICAR PÁGINA PRINCIPAL
// =====================================

function appEstaNaPaginaPrincipal() {

    return Boolean(

        document.body &&

        document.body
            .dataset
            .tipoPagina ===
            "principal"

    );

}


// =====================================
// CAMINHO DO disciplinas.json
// =====================================

function obterCaminhoDisciplinasJSONApp() {

    const caminho =
        window.location.pathname;


    if (
        caminho.includes(
            "/disciplinas/"
        )
    ) {

        return "../../data/disciplinas.json";

    }


    if (
        caminho.includes(
            "/guia-estudos/"
        ) ||
        caminho.includes(
            "/desempenho/"
        ) ||
        caminho.includes(
            "/revisoes/"
        )
    ) {

        return "../data/disciplinas.json";

    }


    return "data/disciplinas.json";

}


// =====================================
// CARREGAR CATÁLOGO
// =====================================

async function carregarCatalogoDisciplinasApp() {

    if (
        catalogoDisciplinasPSCPP
    ) {

        return catalogoDisciplinasPSCPP;

    }


    try {

        const resposta =
            await fetch(
                obterCaminhoDisciplinasJSONApp()
            );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível carregar disciplinas.json"
            );

        }


        catalogoDisciplinasPSCPP =
            await resposta.json();


        return catalogoDisciplinasPSCPP;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar disciplinas.json:",
            erro
        );


        return null;

    }

}


// =====================================
// AGUARDAR progresso.js
// =====================================

function aguardarDadosProgressoApp() {

    return new Promise(
        resolve => {

            let tentativas =
                0;


            const verificar =
                function () {

                    const disponivel =

                        typeof dadosProgresso !==
                            "undefined" &&

                        dadosProgresso &&

                        dadosProgresso
                            .disciplinas;


                    if (
                        disponivel
                    ) {

                        resolve(
                            true
                        );


                        return;

                    }


                    tentativas++;


                    if (
                        tentativas >=
                        100
                    ) {

                        console.warn(
                            "app.js não conseguiu acessar dadosProgresso."
                        );


                        resolve(
                            false
                        );


                        return;

                    }


                    window.setTimeout(

                        verificar,

                        50

                    );

                };


            verificar();

        }
    );

}


// =====================================
// LOCALIZAR DISCIPLINA NO CATÁLOGO
// =====================================

function encontrarDisciplinaCatalogo(
    idDisciplina
) {

    if (
        !catalogoDisciplinasPSCPP ||
        !Array.isArray(
            catalogoDisciplinasPSCPP
                .disciplinas
        )
    ) {

        return null;

    }


    const idNormalizado =
        normalizarIdApp(
            idDisciplina
        );


    return (

        catalogoDisciplinasPSCPP
            .disciplinas
            .find(
                disciplina =>

                    normalizarIdApp(
                        disciplina.id
                    ) ===
                    idNormalizado

            ) ||

        null

    );

}


// =====================================
// LOCALIZAR MÓDULO NO CATÁLOGO
// =====================================

function encontrarModuloCatalogo(
    idDisciplina,
    idAula
) {

    const disciplina =
        encontrarDisciplinaCatalogo(
            idDisciplina
        );


    if (
        !disciplina ||
        !Array.isArray(
            disciplina.modulos
        )
    ) {

        return null;

    }


    const aulaNormalizada =
        normalizarIdApp(
            idAula
        );


    return (

        disciplina
            .modulos
            .find(
                modulo =>

                    normalizarIdApp(
                        modulo.id
                    ) ===
                    aulaNormalizada

            ) ||

        null

    );

}


// =====================================
// OBTER DADOS DE UMA AULA SALVA
// =====================================

function obterAulaSalvaApp(
    idDisciplina,
    idAula
) {

    if (
        typeof dadosProgresso ===
            "undefined" ||
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return null;

    }


    const disciplina =
        normalizarIdApp(
            idDisciplina
        );


    const aula =
        normalizarIdApp(
            idAula
        );


    const dadosDisciplina =
        dadosProgresso
            .disciplinas[
                disciplina
            ];


    if (
        !dadosDisciplina ||
        !dadosDisciplina.aulas
    ) {

        return null;

    }


    return (

        dadosDisciplina
            .aulas[
                aula
            ] ||

        null

    );

}


// =====================================
// AULA ESTÁ CONCLUÍDA?
// =====================================

function aulaConcluidaApp(
    idDisciplina,
    idAula
) {

    const aula =
        obterAulaSalvaApp(
            idDisciplina,
            idAula
        );


    if (!aula) {

        return false;

    }


    return (

        aula.concluida ===
            true ||

        Number(
            aula.progresso ||
            0
        ) >=
            100

    );

}


// =====================================
// CRIAR CAMINHO PARA AULA
// =====================================

function criarCaminhoAulaApp(
    disciplina,
    modulo
) {

    if (
        !disciplina ||
        !modulo ||
        !disciplina.pasta ||
        !modulo.arquivo
    ) {

        return null;

    }


    return (

        "disciplinas/" +

        disciplina.pasta +

        "/" +

        modulo.arquivo

    );

}


// =====================================================
// PRÓXIMO ESTUDO ESTRATÉGICO
// =====================================================
//
// A partir da v4.2:
//
// A HOME NÃO ESCOLHE MAIS SOZINHA
// QUAL AULA DEVE SER ESTUDADA.
//
// A decisão vem exclusivamente de:
//
// motor-planejamento.js
//
// através de:
//
// obterProximoEstudo()
//
// Portanto:
//
// Planejamento
// Home
// Guia
//
// podem utilizar a mesma decisão.
// =====================================================

function encontrarProximaAulaApp() {

    // =================================
    // MOTOR ESTRATÉGICO
    // =================================

    if (
        typeof obterProximoEstudo !==
        "function"
    ) {

        console.warn(
            "Motor de planejamento não disponível."
        );


        return null;

    }


    let proximo =
        null;


    try {

        proximo =
            obterProximoEstudo();

    }
    catch (erro) {

        console.error(
            "Erro ao consultar o motor de planejamento:",
            erro
        );


        return null;

    }


    if (
        !proximo
    ) {

        return null;

    }


    // =================================
    // CATÁLOGO
    // =================================

    const disciplina =
        encontrarDisciplinaCatalogo(
            proximo.idDisciplina
        );


    const modulo =
        encontrarModuloCatalogo(

            proximo.idDisciplina,

            proximo.idAssunto

        );


    // =================================
    // CAMINHO DA AULA
    // =================================

    const caminho =
        (
            disciplina &&
            modulo
        )
            ? criarCaminhoAulaApp(
                disciplina,
                modulo
            )
            : null;


    // =================================
    // RESULTADO PADRONIZADO
    // =================================

    return {

        disciplinaId:
            proximo.idDisciplina,

        disciplinaNome:
            proximo.disciplina,

        disciplinaIcone:
            disciplina
                ?.icone ||
            "📚",

        aulaId:
            proximo.idAssunto,

        aulaTitulo:
            proximo.assunto,

        arquivo:
            modulo
                ?.arquivo ||
            null,

        caminho:
            caminho,

        percentualConcluido:
            Number(
                proximo
                    .percentualConcluido ||
                0
            ),

        prioridade:
            Number(

                proximo.prioridade ||

                proximo.prioridadeBase ||

                0

            ),

        cargaCognitiva:
            proximo
                .cargaCognitiva ||
            "Média",

        continuidadePomodoro:
            proximo
                .continuidadePomodoro ===
            true,

        blocosCompletosNoCiclo:
            Number(
                proximo
                    .blocosCompletosNoCiclo ||
                0
            ),

        blocosRestantesNoCiclo:
            Number(
                proximo
                    .blocosRestantesNoCiclo ||
                0
            ),

        ciclosPomodoroConcluidos:
            Number(
                proximo
                    .ciclosPomodoroConcluidos ||
                0
            )

    };

}


// =====================================
// ATUALIZAR PRÓXIMA AULA
// =====================================

function atualizarProximaAulaApp() {

    const elemento =
        document.getElementById(
            "proxima-aula"
        );


    const link =
        document.getElementById(
            "link-proxima-aula"
        );


    if (
        !elemento &&
        !link
    ) {

        return;

    }


    const proxima =
        encontrarProximaAulaApp();


    // =================================
    // CONTEÚDO CONCLUÍDO
    // =================================

    if (
        !proxima
    ) {

        if (
            elemento
        ) {

            elemento.textContent =
                "✅ Todo o conteúdo cadastrado foi concluído.";

        }


        if (
            link
        ) {

            link.style.display =
                "none";

        }


        return;

    }


    // =================================
    // TEXTO
    // =================================

    if (
        elemento
    ) {

        elemento.textContent =

            proxima.disciplinaIcone +

            " " +

            proxima.aulaTitulo;

    }


    // =================================
    // LINK
    // =================================

    if (
        link
    ) {

        if (
            proxima.caminho
        ) {

            link.href =
                proxima.caminho;


            link.textContent =

                proxima
                    .percentualConcluido >
                0

                    ? "Continuar aula"
                    : "Iniciar aula";


            link.style.display =
                "";

        }
        else {

            link.style.display =
                "none";


            console.warn(
                "O assunto recomendado pelo motor não foi localizado em disciplinas.json:",
                proxima.disciplinaId,
                proxima.aulaId
            );

        }

    }

}


// =====================================
// META DA SEMANA
// =====================================
//
// A meta utiliza EXATAMENTE a mesma
// recomendação estratégica utilizada
// pela Próxima Aula.
// =====================================

function atualizarMetas() {

    const elemento =
        document.getElementById(
            "meta-semana"
        );


    if (
        !elemento
    ) {

        return;

    }


    const proxima =
        encontrarProximaAulaApp();


    if (
        !proxima
    ) {

        elemento.textContent =
            "✅ Todo o conteúdo cadastrado foi concluído.";


        return;

    }


    let texto =

        "Priorizar " +

        proxima.aulaTitulo +

        " — " +

        proxima.disciplinaNome;


    // =================================
    // CICLO POMODORO INCOMPLETO
    // =================================

    if (
        proxima.continuidadePomodoro
    ) {

        texto +=

            " | ciclo Pomodoro " +

            proxima
                .blocosCompletosNoCiclo +

            "/3";

    }


    texto +=
        ".";


    elemento.textContent =
        texto;

}


// =====================================
// LOCALIZAR ÚLTIMA ATIVIDADE
// =====================================

function encontrarUltimaAtividadeApp() {

    if (
        typeof dadosProgresso ===
            "undefined" ||
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return null;

    }


    let resultado =
        null;


    Object.entries(
        dadosProgresso.disciplinas
    ).forEach(

        (
            [
                idDisciplina,
                disciplina
            ]
        ) => {

            if (
                !disciplina ||
                !disciplina.aulas
            ) {

                return;

            }


            Object.entries(
                disciplina.aulas
            ).forEach(

                (
                    [
                        idAula,
                        aula
                    ]
                ) => {

                    if (
                        !aula ||
                        !aula.topicos
                    ) {

                        return;

                    }


                    Object.entries(
                        aula.topicos
                    ).forEach(

                        (
                            [
                                idTopico,
                                topico
                            ]
                        ) => {

                            if (
                                !topico ||
                                !topico.concluido ||
                                !topico.dataConclusao
                            ) {

                                return;

                            }


                            const data =
                                new Date(
                                    topico.dataConclusao
                                );


                            if (
                                Number.isNaN(
                                    data.getTime()
                                )
                            ) {

                                return;

                            }


                            if (
                                !resultado ||
                                data >
                                    resultado.data
                            ) {

                                resultado = {

                                    disciplinaId:
                                        idDisciplina,

                                    aulaId:
                                        idAula,

                                    topicoId:
                                        idTopico,

                                    data:
                                        data

                                };

                            }

                        }

                    );

                }

            );

        }

    );


    return resultado;

}


// =====================================
// ÚLTIMA AULA ESTUDADA
// =====================================

function ultimaAula() {

    const elemento =
        document.getElementById(
            "ultima-aula"
        );


    if (
        !elemento
    ) {

        return;

    }


    const ultima =
        encontrarUltimaAtividadeApp();


    if (
        !ultima
    ) {

        elemento.textContent =
            "Nenhuma aula registrada.";


        return;

    }


    const disciplina =
        encontrarDisciplinaCatalogo(
            ultima.disciplinaId
        );


    const modulo =
        encontrarModuloCatalogo(

            ultima.disciplinaId,

            ultima.aulaId

        );


    const nomeDisciplina =

        disciplina
            ? disciplina.nome
            : ultima.disciplinaId;


    const nomeAula =

        modulo
            ? modulo.titulo
            : ultima.aulaId;


    elemento.textContent =

        nomeAula +

        " — " +

        nomeDisciplina;

}


// =====================================
// FORMATAR DATA
// =====================================

function formatarDataApp(
    valor
) {

    if (
        !valor
    ) {

        return "—";

    }


    const data =

        valor instanceof Date

            ? valor
            : new Date(
                valor
            );


    if (
        Number.isNaN(
            data.getTime()
        )
    ) {

        return "—";

    }


    return data.toLocaleDateString(

        "pt-BR",

        {

            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"

        }

    );

}


// =====================================================
// SISTEMA DE REVISÃO
// =====================================================


// =====================================
// OBTER PRÓXIMA REVISÃO
// =====================================

function encontrarProximaRevisaoApp() {

    if (
        typeof obterProximaRevisaoPSCPP ===
        "function"
    ) {

        return obterProximaRevisaoPSCPP();

    }


    console.warn(
        "obterProximaRevisaoPSCPP() não está disponível."
    );


    return null;

}


// =====================================
// CRIAR CAMINHO DA REVISÃO
// =====================================

function criarCaminhoRevisaoApp(
    revisao
) {

    if (
        !revisao
    ) {

        return "#";

    }


    const disciplina =
        encontrarDisciplinaCatalogo(
            revisao.idDisciplina
        );


    const modulo =
        encontrarModuloCatalogo(

            revisao.idDisciplina,

            revisao.idAula

        );


    if (
        !disciplina ||
        !modulo
    ) {

        return "#";

    }


    return (

        criarCaminhoAulaApp(

            disciplina,

            modulo

        ) ||

        "#"

    );

}


// =====================================
// TÍTULO DA REVISÃO
// =====================================

function obterTituloRevisaoApp(
    revisao
) {

    if (
        !revisao
    ) {

        return "";

    }


    const modulo =
        encontrarModuloCatalogo(

            revisao.idDisciplina,

            revisao.idAula

        );


    if (
        modulo &&
        modulo.titulo
    ) {

        return modulo.titulo;

    }


    return revisao.idAula;

}


// =====================================
// DISCIPLINA DA REVISÃO
// =====================================

function obterDisciplinaRevisaoApp(
    revisao
) {

    if (
        !revisao
    ) {

        return "";

    }


    const disciplina =
        encontrarDisciplinaCatalogo(
            revisao.idDisciplina
        );


    if (
        disciplina &&
        disciplina.nome
    ) {

        return disciplina.nome;

    }


    return revisao.idDisciplina;

}


// =====================================
// ÁREA DE CONTROLES DA REVISÃO
// =====================================

function obterOuCriarControlesRevisaoApp(
    elementoRevisao
) {

    if (
        !elementoRevisao
    ) {

        return null;

    }


    const card =

        elementoRevisao.closest(
            ".card, .widget"
        ) ||

        elementoRevisao
            .parentElement;


    if (
        !card
    ) {

        return null;

    }


    let controles =
        card.querySelector(
            "#controles-proxima-revisao"
        );


    if (
        controles
    ) {

        return controles;

    }


    controles =
        document.createElement(
            "div"
        );


    controles.id =
        "controles-proxima-revisao";


    controles.style.marginTop =
        "12px";


    controles.style.display =
        "flex";


    controles.style.flexWrap =
        "wrap";


    controles.style.gap =
        "8px";


    card.appendChild(
        controles
    );


    return controles;

}


// =====================================
// REGISTRAR REVISÃO HOJE
// =====================================

function registrarRevisaoHojeApp(
    revisao
) {

    if (
        !revisao
    ) {

        return;

    }


    if (
        typeof marcarAulaRevisadaHoje !==
        "function"
    ) {

        console.error(
            "marcarAulaRevisadaHoje() não está disponível."
        );


        return;

    }


    const resultado =
        marcarAulaRevisadaHoje(

            revisao.idDisciplina,

            revisao.idAula

        );


    if (
        !resultado
    ) {

        window.alert(
            "Não foi possível registrar a revisão."
        );


        return;

    }


    atualizarCoachingApp();

}


// =====================================
// CONTROLES DA REVISÃO
// =====================================

function renderizarControlesRevisaoApp(
    revisao,
    elementoRevisao
) {

    const controles =
        obterOuCriarControlesRevisaoApp(
            elementoRevisao
        );


    if (
        !controles
    ) {

        return;

    }


    controles.innerHTML =
        "";


    // =================================
    // SEM REVISÃO
    // =================================

    if (
        !revisao
    ) {

        const quadro =
            document.createElement(
                "a"
            );


        quadro.href =
            "revisoes/index.html";


        quadro.className =
            "botao";


        quadro.textContent =
            "📋 Quadro de Revisões";


        controles.appendChild(
            quadro
        );


        return;

    }


    // =================================
    // ABRIR AULA
    // =================================

    const caminho =
        criarCaminhoRevisaoApp(
            revisao
        );


    if (
        caminho !==
        "#"
    ) {

        const abrir =
            document.createElement(
                "a"
            );


        abrir.href =
            caminho;


        abrir.className =
            "botao";


        abrir.textContent =
            "📖 Revisar agora";


        controles.appendChild(
            abrir
        );

    }


    // =================================
    // REVISADA HOJE
    // =================================

    const revisadaHoje =
        document.createElement(
            "button"
        );


    revisadaHoje.type =
        "button";


    revisadaHoje.className =
        "botao";


    revisadaHoje.textContent =
        "✅ Revisada hoje";


    revisadaHoje.addEventListener(

        "click",

        function () {

            registrarRevisaoHojeApp(
                revisao
            );

        }

    );


    controles.appendChild(
        revisadaHoje
    );


    // =================================
    // QUADRO
    // =================================

    const quadro =
        document.createElement(
            "a"
        );


    quadro.href =
        "revisoes/index.html";


    quadro.className =
        "botao";


    quadro.textContent =
        "📋 Quadro de Revisões";


    controles.appendChild(
        quadro
    );

}


// =====================================
// ATUALIZAR PRÓXIMA REVISÃO
// =====================================

function revisar() {

    const elemento =
        document.getElementById(
            "proxima-revisao"
        );


    if (
        !elemento
    ) {

        return;

    }


    const revisao =
        encontrarProximaRevisaoApp();


    // =================================
    // NENHUMA REVISÃO
    // =================================

    if (
        !revisao
    ) {

        elemento.innerHTML =
            "Nenhuma revisão programada.";


        renderizarControlesRevisaoApp(

            null,

            elemento

        );


        return;

    }


    const tituloAula =
        obterTituloRevisaoApp(
            revisao
        );


    const nomeDisciplina =
        obterDisciplinaRevisaoApp(
            revisao
        );


    const status =
        revisao.status ||
        {};


    const icone =
        status.icone ||
        "🔔";


    const textoStatus =
        status.texto ||
        "Revisão programada";


    const data =
        formatarDataApp(
            revisao.proximaRevisao
        );


    const totalRevisoes =
        Number(
            revisao.totalRevisoes ||
            0
        );


    // =================================
    // LIMPAR
    // =================================

    elemento.innerHTML =
        "";


    // =================================
    // STATUS
    // =================================

    const linhaStatus =
        document.createElement(
            "strong"
        );


    linhaStatus.textContent =

        icone +

        " " +

        textoStatus;


    elemento.appendChild(
        linhaStatus
    );


    elemento.appendChild(
        document.createElement(
            "br"
        )
    );


    // =================================
    // AULA
    // =================================

    const linhaAula =
        document.createElement(
            "span"
        );


    linhaAula.textContent =
        tituloAula;


    elemento.appendChild(
        linhaAula
    );


    elemento.appendChild(
        document.createElement(
            "br"
        )
    );


    // =================================
    // DISCIPLINA
    // =================================

    const linhaDisciplina =
        document.createElement(
            "small"
        );


    linhaDisciplina.textContent =
        nomeDisciplina;


    elemento.appendChild(
        linhaDisciplina
    );


    elemento.appendChild(
        document.createElement(
            "br"
        )
    );


    // =================================
    // DATA
    // =================================

    const linhaData =
        document.createElement(
            "small"
        );


    if (
        status.codigo ===
        "vencida"
    ) {

        linhaData.textContent =
            "Prevista para: " +
            data;

    }
    else {

        linhaData.textContent =
            "Próxima revisão: " +
            data;

    }


    elemento.appendChild(
        linhaData
    );


    // =================================
    // HISTÓRICO
    // =================================

    if (
        totalRevisoes >
        0
    ) {

        elemento.appendChild(
            document.createElement(
                "br"
            )
        );


        const historico =
            document.createElement(
                "small"
            );


        historico.textContent =

            totalRevisoes +

            (
                totalRevisoes ===
                1

                    ? " revisão realizada"
                    : " revisões realizadas"
            );


        elemento.appendChild(
            historico
        );

    }


    renderizarControlesRevisaoApp(

        revisao,

        elemento

    );

}


// =====================================
// ATUALIZAR COACHING COMPLETO
// =====================================

function atualizarCoachingApp() {

    if (
        !appEstaNaPaginaPrincipal()
    ) {

        return;

    }


    atualizarProximaAulaApp();


    atualizarMetas();


    ultimaAula();


    revisar();

}


// =====================================
// ALTERAÇÃO DO PROGRESSO
// =====================================

document.addEventListener(

    "progressoPSCPPAtualizado",

    function () {

        atualizarCoachingApp();

    }

);


// =====================================
// ALTERAÇÃO DE REVISÃO
// =====================================

document.addEventListener(

    "revisaoPSCPPAtualizada",

    function () {

        atualizarCoachingApp();

    }

);


// =====================================
// ALTERAÇÃO DO PLANEJAMENTO / POMODORO
// =====================================
//
// motor-planejamento.js dispara este evento
// quando um novo bloco Pomodoro é registrado.
//
// Assim a Home passa a reagir imediatamente
// à nova decisão estratégica.
// =====================================

document.addEventListener(

    "planejamentoPSCPPAtualizado",

    function () {

        atualizarCoachingApp();

    }

);


// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    async function () {

        if (
            !appEstaNaPaginaPrincipal()
        ) {

            return;

        }


        await carregarCatalogoDisciplinasApp();


        const progressoDisponivel =
            await aguardarDadosProgressoApp();


        if (
            !progressoDisponivel
        ) {

            return;

        }


        atualizarCoachingApp();

    }

);


// =====================================
// DEBUG
// =====================================

console.log(
    "APP.JS v4.2 — COACHING ESTRATÉGICO CARREGADO"
);


/* =====================================================
   FIM APP.JS v4.2
===================================================== */
