/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS v4.1

   CAMADA DE COACHING

   Responsabilidades:
   - Próxima aula
   - Meta da semana
   - Última aula estudada
   - Próxima revisão inteligente

   Integração:
   - progresso.js v4.2

   IMPORTANTE:

   progresso.js continua sendo a fonte única
   dos dados de progresso e revisão.

   O app.js apenas apresenta esses dados.
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

let catalogoDisciplinasPSCPP = null;


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================
//
// Função própria para evitar dependência da
// ordem de carregamento entre app.js
// e progresso.js.

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
// CARREGAR CATÁLOGO DE DISCIPLINAS
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

            let tentativas = 0;


            const verificar =
                function () {

                    const progressoDisponivel =

                        typeof dadosProgresso !==
                            "undefined" &&

                        dadosProgresso &&

                        dadosProgresso
                            .disciplinas;


                    if (
                        progressoDisponivel
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

        aula.concluida === true ||

        Number(
            aula.progresso || 0
        ) >= 100

    );

}


// =====================================
// CRIAR CAMINHO PARA AULA
// =====================================

function criarCaminhoAulaApp(
    disciplina,
    modulo
) {

    return (

        "disciplinas/" +

        disciplina.pasta +

        "/" +

        modulo.arquivo

    );

}


// =====================================
// ENCONTRAR PRÓXIMA AULA
// =====================================

function encontrarProximaAulaApp() {

    if (
        !catalogoDisciplinasPSCPP ||
        !Array.isArray(
            catalogoDisciplinasPSCPP
                .disciplinas
        )
    ) {

        return null;

    }


    const disciplinas =
        catalogoDisciplinasPSCPP
            .disciplinas;


    for (
        let i = 0;
        i < disciplinas.length;
        i++
    ) {

        const disciplina =
            disciplinas[i];


        if (
            disciplina.status !==
                "ativo" ||

            !Array.isArray(
                disciplina.modulos
            ) ||

            disciplina.modulos.length ===
                0
        ) {

            continue;

        }


        for (
            let j = 0;
            j < disciplina.modulos.length;
            j++
        ) {

            const modulo =
                disciplina.modulos[j];


            if (
                !aulaConcluidaApp(

                    disciplina.id,

                    modulo.id

                )
            ) {

                return {

                    disciplinaId:
                        disciplina.id,

                    disciplinaNome:
                        disciplina.nome,

                    disciplinaIcone:
                        disciplina.icone ||
                        "📚",

                    aulaId:
                        modulo.id,

                    aulaTitulo:
                        modulo.titulo,

                    arquivo:
                        modulo.arquivo,

                    caminho:
                        criarCaminhoAulaApp(
                            disciplina,
                            modulo
                        )

                };

            }

        }

    }


    return null;

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


    if (!proxima) {

        if (elemento) {

            elemento.textContent =
                "✅ Todas as aulas cadastradas foram concluídas.";

        }


        if (link) {

            link.style.display =
                "none";

        }


        return;

    }


    if (elemento) {

        elemento.textContent =

            proxima.disciplinaIcone +

            " " +

            proxima.aulaTitulo;

    }


    if (link) {

        link.href =
            proxima.caminho;


        link.textContent =
            "Iniciar aula";


        link.style.display =
            "";

    }

}


// =====================================
// META DA SEMANA
// =====================================

function atualizarMetas() {

    const elemento =
        document.getElementById(
            "meta-semana"
        );


    if (!elemento) {

        return;

    }


    const proxima =
        encontrarProximaAulaApp();


    if (!proxima) {

        elemento.textContent =
            "✅ Meta alcançada: todas as aulas cadastradas foram concluídas.";


        return;

    }


    elemento.textContent =

        "Concluir " +

        proxima.aulaTitulo +

        " — " +

        proxima.disciplinaNome +

        ".";

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


    if (!elemento) {

        return;

    }


    const ultima =
        encontrarUltimaAtividadeApp();


    if (!ultima) {

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

    if (!valor) {

        return "—";

    }


    const data =

        valor instanceof Date
            ? valor
            : new Date(valor);


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
//
// A fonte agora é progresso.js v4.2.
//
// O app.js NÃO recalcula datas.

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

    if (!revisao) {

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


    return criarCaminhoAulaApp(

        disciplina,

        modulo

    );

}


// =====================================
// OBTER TÍTULO DA REVISÃO
// =====================================

function obterTituloRevisaoApp(
    revisao
) {

    if (!revisao) {

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
// OBTER NOME DA DISCIPLINA DA REVISÃO
// =====================================

function obterDisciplinaRevisaoApp(
    revisao
) {

    if (!revisao) {

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
// CRIAR ÁREA DE CONTROLES DA REVISÃO
// =====================================
//
// A área é criada automaticamente dentro
// do mesmo card que contém:
//
// #proxima-revisao
//
// Não exige alteração manual do index.html.

function obterOuCriarControlesRevisaoApp(
    elementoRevisao
) {

    if (!elementoRevisao) {

        return null;

    }


    const card =
        elementoRevisao.closest(
            ".card, .widget"
        ) ||
        elementoRevisao.parentElement;


    if (!card) {

        return null;

    }


    let controles =
        card.querySelector(
            "#controles-proxima-revisao"
        );


    if (controles) {

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
// MARCAR REVISÃO COMO REALIZADA HOJE
// =====================================

function registrarRevisaoHojeApp(
    revisao
) {

    if (!revisao) {

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


    if (!resultado) {

        window.alert(
            "Não foi possível registrar a revisão."
        );


        return;

    }


    atualizarCoachingApp();

}


// =====================================
// RENDERIZAR CONTROLES DA REVISÃO
// =====================================

function renderizarControlesRevisaoApp(
    revisao,
    elementoRevisao
) {

    const controles =
        obterOuCriarControlesRevisaoApp(
            elementoRevisao
        );


    if (!controles) {

        return;

    }


    controles.innerHTML =
        "";


    // =================================
    // NÃO EXISTE REVISÃO PROGRAMADA
    // =================================

    if (!revisao) {

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
        caminho !== "#"
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
    // QUADRO DE REVISÕES
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


    if (!elemento) {

        return;

    }


    const revisao =
        encontrarProximaRevisaoApp();


    // =================================
    // NENHUMA AULA EM CICLO
    // =================================

    if (!revisao) {

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
        revisao.status || {};


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
    // CONTEÚDO DO CARD
    // =================================

    elemento.innerHTML = "";


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
    // HISTÓRICO RESUMIDO
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
                totalRevisoes === 1
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
// OUVIR ALTERAÇÃO DO PROGRESSO
// =====================================

document.addEventListener(

    "progressoPSCPPAtualizado",

    function () {

        atualizarCoachingApp();

    }

);


// =====================================
// OUVIR ALTERAÇÃO DE REVISÃO
// =====================================
//
// Ao clicar:
//
// ✅ Revisada hoje
//
// o card muda imediatamente para a
// próxima revisão sem recarregar a página.

document.addEventListener(

    "revisaoPSCPPAtualizada",

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
    "APP.JS v4.1 - COACHING + REVISÕES CARREGADO"
);


/* =====================================================
   FIM APP.JS v4.1
===================================================== */
