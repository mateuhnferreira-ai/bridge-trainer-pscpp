/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS v4.0

   CAMADA DE COACHING

   Responsabilidades:
   - Próxima aula
   - Meta da semana
   - Última aula estudada
   - Próxima revisão

   IMPORTANTE:
   progresso.js continua sendo a fonte única
   dos dados de progresso.
===================================================== */


// =====================================
// CONFIGURAÇÕES
// =====================================

let catalogoDisciplinasPSCPP = null;


// =====================================
// NORMALIZAR IDENTIFICADOR
// =====================================
//
// Função própria para evitar dependência da ordem
// de carregamento entre app.js e progresso.js.

function normalizarIdApp(texto) {

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
        document.body.dataset.tipoPagina ===
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

    if (catalogoDisciplinasPSCPP) {

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
//
// progresso.js realiza carregamento assíncrono.
// Esta função impede que app.js tente ler os dados
// antes de eles estarem disponíveis.

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
                        dadosProgresso.disciplinas;


                    if (progressoDisponivel) {

                        resolve(true);

                        return;

                    }


                    tentativas++;


                    if (tentativas >= 100) {

                        console.warn(
                            "app.js não conseguiu acessar dadosProgresso."
                        );


                        resolve(false);

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
            catalogoDisciplinasPSCPP.disciplinas
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
        disciplina.modulos.find(
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
//
// Percorre as disciplinas conforme a ordem do
// disciplinas.json e retorna a primeira aula
// ainda não concluída.

function encontrarProximaAulaApp() {

    if (
        !catalogoDisciplinasPSCPP ||
        !Array.isArray(
            catalogoDisciplinasPSCPP.disciplinas
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
            disciplina.status !== "ativo" ||
            !Array.isArray(
                disciplina.modulos
            ) ||
            disciplina.modulos.length === 0
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
                        disciplina.icone || "📚",

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
//
// A primeira versão da meta acompanha a próxima
// aula pendente. Posteriormente o motor estratégico
// e o Pomodoro poderão assumir esta decisão.

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
//
// Procura a dataConclusao mais recente entre
// todos os tópicos de todas as aulas.

function encontrarUltimaAtividadeApp() {

    if (
        typeof dadosProgresso ===
            "undefined" ||
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return null;

    }


    let resultado = null;


    Object.entries(
        dadosProgresso.disciplinas
    ).forEach(

        ([idDisciplina, disciplina]) => {

            if (
                !disciplina ||
                !disciplina.aulas
            ) {

                return;

            }


            Object.entries(
                disciplina.aulas
            ).forEach(

                ([idAula, aula]) => {

                    if (
                        !aula ||
                        !aula.topicos
                    ) {

                        return;

                    }


                    Object.entries(
                        aula.topicos
                    ).forEach(

                        ([idTopico, topico]) => {

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

function formatarDataApp(data) {

    return data.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


// =====================================
// PRÓXIMA REVISÃO
// =====================================
//
// Primeira regra:
// cada tópico estudado gera revisão 1 dia
// após sua conclusão.
//
// Futuramente poderá receber ciclos:
// 1 dia → 7 dias → 30 dias.

function encontrarProximaRevisaoApp() {

    if (
        typeof dadosProgresso ===
            "undefined" ||
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return null;

    }


    let proximaRevisao = null;


    Object.entries(
        dadosProgresso.disciplinas
    ).forEach(

        ([idDisciplina, disciplina]) => {

            if (
                !disciplina ||
                !disciplina.aulas
            ) {

                return;

            }


            Object.entries(
                disciplina.aulas
            ).forEach(

                ([idAula, aula]) => {

                    if (
                        !aula ||
                        !aula.topicos
                    ) {

                        return;

                    }


                    Object.entries(
                        aula.topicos
                    ).forEach(

                        ([idTopico, topico]) => {

                            if (
                                !topico ||
                                !topico.concluido ||
                                !topico.dataConclusao
                            ) {

                                return;

                            }


                            const conclusao =
                                new Date(
                                    topico.dataConclusao
                                );


                            if (
                                Number.isNaN(
                                    conclusao.getTime()
                                )
                            ) {

                                return;

                            }


                            const revisao =
                                new Date(
                                    conclusao
                                );


                            revisao.setDate(
                                revisao.getDate() + 1
                            );


                            if (
                                !proximaRevisao ||
                                revisao <
                                proximaRevisao.data
                            ) {

                                proximaRevisao = {

                                    disciplinaId:
                                        idDisciplina,

                                    aulaId:
                                        idAula,

                                    topicoId:
                                        idTopico,

                                    data:
                                        revisao

                                };

                            }

                        }

                    );

                }

            );

        }

    );


    return proximaRevisao;

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


    if (!revisao) {

        elemento.textContent =
            "Nenhuma revisão programada.";

        return;

    }


    const modulo =
        encontrarModuloCatalogo(
            revisao.disciplinaId,
            revisao.aulaId
        );


    const tituloAula =
        modulo
            ? modulo.titulo
            : revisao.aulaId;


    const hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    const dataRevisao =
        new Date(
            revisao.data
        );


    dataRevisao.setHours(
        0,
        0,
        0,
        0
    );


    if (
        dataRevisao <= hoje
    ) {

        elemento.textContent =
            "🔔 Revisar agora: " +
            tituloAula;

    }
    else {

        elemento.textContent =
            tituloAula +
            " — " +
            formatarDataApp(
                revisao.data
            );

    }

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


        if (!progressoDisponivel) {

            return;

        }


        atualizarCoachingApp();

    }

);


/* =====================================================
   FIM APP.JS v4.0
===================================================== */
