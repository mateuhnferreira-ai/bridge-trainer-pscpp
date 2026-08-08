// =====================================
// SISTEMA DE PROGRESSO PSCPP v4.1
// Bridge Trainer PSCPP
//
// Estrutura dinâmica:
//
// Disciplina
// └── Aula
//     ├── Tópico 1
//     ├── Tópico 2
//     └── Tópico N
//
// A quantidade de tópicos é identificada
// automaticamente pelo HTML de cada aula.
// =====================================


// =====================================
// CONFIGURAÇÕES
// =====================================

const CHAVE_PROGRESSO_PSCPP =
    "bridgeTrainerPSCPP_progresso";


let dadosProgresso = null;


// Informações da aula atualmente aberta
let aulaAtual = {

    disciplina: null,

    aula: null

};


// =====================================
// CRIAR ESTRUTURA INICIAL
// =====================================

function criarEstruturaInicialProgresso() {

    return {

        versao: "4.1",

        ultimaAtualizacao: null,

        disciplinas: {}

    };

}


// =====================================
// NORMALIZAR IDENTIFICADORES
// =====================================

function normalizarIdentificador(texto) {

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
// CARREGAR PROGRESSO
// =====================================

async function carregarDadosProgresso() {

    try {

        const progressoSalvo =
            localStorage.getItem(
                CHAVE_PROGRESSO_PSCPP
            );


        if (progressoSalvo) {

            dadosProgresso =
                JSON.parse(
                    progressoSalvo
                );


           prepararEstruturaProgresso();

migrarIdentificadoresAntigosProgresso();


console.log(
    "Progresso carregado do tablet:",
    dadosProgresso
);


            return dadosProgresso;

        }


        dadosProgresso =
            await carregarProgressoInicialJSON();


        prepararEstruturaProgresso();


        salvarDadosProgresso();


        console.log(
            "Estrutura inicial de progresso criada:",
            dadosProgresso
        );


        return dadosProgresso;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar progresso:",
            erro
        );


        dadosProgresso =
            criarEstruturaInicialProgresso();


        return dadosProgresso;

    }

}


// =====================================
// CARREGAR progresso.json
// =====================================

async function carregarProgressoInicialJSON() {

    try {

        const caminhoJSON =
            obterCaminhoProgressoJSON();


        const resposta =
            await fetch(
                caminhoJSON
            );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível carregar progresso.json"
            );

        }


        const dados =
            await resposta.json();


        return dados;

    }
    catch (erro) {

        console.warn(
            "O progresso.json não foi carregado. " +
            "Será criada uma estrutura inicial local.",
            erro
        );


        return criarEstruturaInicialProgresso();

    }

}


// =====================================
// CAMINHO DO progresso.json
// =====================================

function obterCaminhoProgressoJSON() {

    const caminhoAtual =
        window.location.pathname;


    if (
        caminhoAtual.includes(
            "/disciplinas/"
        )
    ) {

        return "../../data/progresso.json";

    }


    if (
        caminhoAtual.includes(
            "/guia-estudos/"
        )
    ) {

        return "../data/progresso.json";

    }


    return "data/progresso.json";

}


// =====================================
// PREPARAR ESTRUTURA
// =====================================

function prepararEstruturaProgresso() {

    if (
        !dadosProgresso ||
        typeof dadosProgresso !== "object"
    ) {

        dadosProgresso =
            criarEstruturaInicialProgresso();

    }


    dadosProgresso.versao =
        "4.1";


    if (
        !dadosProgresso.disciplinas
    ) {

        dadosProgresso.disciplinas = {};

    }

}

// =====================================
// MIGRAÇÕES DE IDENTIFICADORES ANTIGOS
// =====================================
//
// Preserva progresso salvo antes da
// padronização definitiva dos IDs.
//
// Migração atual:
//
// manobrabilidade
// resistencia-navio
//        ↓
// resistencia
//
// Se o destino já possuir dados,
// os tópicos são combinados sem apagar
// progresso existente.
// =====================================

function migrarIdentificadoresAntigosProgresso() {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return false;

    }


    let houveMigracao = false;


    const disciplina =
        dadosProgresso
            .disciplinas[
                "manobrabilidade"
            ];


    if (
        !disciplina ||
        !disciplina.aulas
    ) {

        return false;

    }


    const idAntigo =
        "resistencia-navio";


    const idNovo =
        "resistencia";


    const aulaAntiga =
        disciplina.aulas[
            idAntigo
        ];


    if (!aulaAntiga) {

        return false;

    }


    const aulaNova =
        disciplina.aulas[
            idNovo
        ];


    // =================================
    // DESTINO AINDA NÃO EXISTE
    // =================================

    if (!aulaNova) {

        disciplina.aulas[
            idNovo
        ] = aulaAntiga;


        delete disciplina.aulas[
            idAntigo
        ];


        houveMigracao = true;

    }


    // =================================
    // DESTINO JÁ EXISTE
    // =================================
    //
    // Combina os dados para não perder
    // nada que já tenha sido registrado.

    else {

        if (!aulaNova.topicos) {

            aulaNova.topicos = {};

        }


        const topicosAntigos =
            aulaAntiga.topicos || {};


        Object.entries(
            topicosAntigos
        ).forEach(
            ([idTopico, dadosTopico]) => {

                const atual =
                    aulaNova.topicos[
                        idTopico
                    ];


                if (!atual) {

                    aulaNova.topicos[
                        idTopico
                    ] =
                        dadosTopico;


                    return;

                }


                // Se qualquer versão disser
                // que o tópico foi concluído,
                // preservamos a conclusão.

                if (
                    dadosTopico.concluido === true
                ) {

                    atual.concluido = true;

                }


                // Preserva a data disponível.

                if (
                    !atual.dataConclusao &&
                    dadosTopico.dataConclusao
                ) {

                    atual.dataConclusao =
                        dadosTopico.dataConclusao;

                }

            }
        );


        aulaNova.totalTopicos =
            Math.max(

                aulaNova.totalTopicos || 0,

                aulaAntiga.totalTopicos || 0

            );


        // Se a aula antiga estava concluída,
        // preservamos esse estado até o
        // recálculo definitivo.

        if (
            aulaAntiga.concluida === true
        ) {

            aulaNova.concluida = true;

        }


        aulaNova.progresso =
            Math.max(

                aulaNova.progresso || 0,

                aulaAntiga.progresso || 0

            );


        delete disciplina.aulas[
            idAntigo
        ];


        houveMigracao = true;

    }


    if (houveMigracao) {

        recalcularProgressoAula(
            "manobrabilidade",
            "resistencia"
        );


        recalcularProgressoDisciplina(
            "manobrabilidade"
        );


        salvarDadosProgresso();


        console.log(
            "Migração concluída: " +
            "resistencia-navio → resistencia"
        );

    }


    return houveMigracao;

}
// =====================================
// SALVAR PROGRESSO
// =====================================

function salvarDadosProgresso() {

    prepararEstruturaProgresso();


    dadosProgresso.ultimaAtualizacao =
        new Date().toISOString();


    localStorage.setItem(

        CHAVE_PROGRESSO_PSCPP,

        JSON.stringify(
            dadosProgresso
        )

    );

}


// =====================================
// GARANTIR DISCIPLINA
// =====================================

function garantirDisciplina(
    idDisciplina
) {

    prepararEstruturaProgresso();


    const disciplinaNormalizada =
        normalizarIdentificador(
            idDisciplina
        );


    if (
        !dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ]
    ) {

        dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ] = {

                progresso: 0,

                tempoEstudadoSegundos: 0,

                aulas: {}

            };

    }


    const disciplina =
        dadosProgresso
            .disciplinas[
                disciplinaNormalizada
            ];


    if (!disciplina.aulas) {

        disciplina.aulas = {};

    }


    if (typeof disciplina.tempoEstudadoSegundos !== "number") {

        disciplina.tempoEstudadoSegundos = 0;

    }


    return disciplina;

}


// =====================================
// GARANTIR AULA
// =====================================

function garantirAula(
    idDisciplina,
    idAula
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const aulaNormalizada =
        normalizarIdentificador(
            idAula
        );


    if (
        !disciplina
            .aulas[
                aulaNormalizada
            ]
    ) {

        disciplina
            .aulas[
                aulaNormalizada
            ] = {

                progresso: 0,

                concluida: false,

                totalTopicos: 0,

                topicos: {}

            };

    }


    const aula =
        disciplina
            .aulas[
                aulaNormalizada
            ];


    if (!aula.topicos) {

        aula.topicos = {};

    }


    return aula;

}


// =====================================
// GARANTIR TÓPICO
// =====================================

function garantirTopico(
    idDisciplina,
    idAula,
    idTopico
) {

    const aula =
        garantirAula(
            idDisciplina,
            idAula
        );


    const topicoNormalizado =
        normalizarIdentificador(
            idTopico
        );


    if (
        !aula
            .topicos[
                topicoNormalizado
            ]
    ) {

        aula
            .topicos[
                topicoNormalizado
            ] = {

                concluido: false,

                dataConclusao: null

            };

    }


    return aula
        .topicos[
            topicoNormalizado
        ];

}


// =====================================
// IDENTIFICAR DADOS DA AULA
// =====================================

function identificarAulaAtual() {

    const corpo =
        document.body;


    if (!corpo) {

        return false;

    }


    const disciplina =
        corpo.dataset.disciplina;


    const aula =
        corpo.dataset.aula;


    if (
        !disciplina ||
        !aula
    ) {

        console.warn(
            "A página não possui data-disciplina " +
            "e data-aula no elemento body."
        );


        return false;

    }


    aulaAtual.disciplina =
        normalizarIdentificador(
            disciplina
        );


    aulaAtual.aula =
        normalizarIdentificador(
            aula
        );


    return true;

}


// =====================================
// LOCALIZAR TÓPICOS DA PÁGINA
// =====================================

function obterTopicosDaPagina() {

    return Array.from(

        document.querySelectorAll(
            ".topico-aula"
        )

    );

}


// =====================================
// IDENTIFICAR ID DO TÓPICO
// =====================================

function obterIdDoTopico(
    elementoTopico,
    indice
) {

    let idTopico =
        elementoTopico.dataset.topicoId;


    if (!idTopico) {

        const titulo =
            elementoTopico.querySelector(
                "h2, h3, h4"
            );


        if (titulo) {

            idTopico =
                normalizarIdentificador(
                    titulo.textContent
                );

        }

    }


    if (!idTopico) {

        idTopico =
            "topico-" + (indice + 1);

    }


    idTopico =
        normalizarIdentificador(
            idTopico
        );


    elementoTopico.dataset.topicoId =
        idTopico;


    return idTopico;

}


// =====================================
// REGISTRAR TÓPICOS DA AULA
// =====================================

function registrarTopicosDaAula() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return;

    }


    const topicos =
        obterTopicosDaPagina();


    const aula =
        garantirAula(

            aulaAtual.disciplina,

            aulaAtual.aula

        );


    aula.totalTopicos =
        topicos.length;


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            garantirTopico(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );

        }
    );


    recalcularProgressoAula(

        aulaAtual.disciplina,

        aulaAtual.aula

    );


    salvarDadosProgresso();

}


// =====================================
// VERIFICAR SE TÓPICO FOI ESTUDADO
// =====================================

function topicoFoiEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    const aula =
        normalizarIdentificador(
            idAula
        );


    const topico =
        normalizarIdentificador(
            idTopico
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ].topicos ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ].topicos[
                topico
            ]
    ) {

        return false;

    }


    return Boolean(

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .aulas[
                aula
            ]
            .topicos[
                topico
            ]
            .concluido

    );

}


// =====================================
// MARCAR TÓPICO COMO ESTUDADO
// =====================================

function marcarTopicoComoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const topico =
        garantirTopico(

            idDisciplina,

            idAula,

            idTopico

        );


    topico.concluido = true;


    topico.dataConclusao =
        new Date().toISOString();


    atualizarProgressoCompleto(

        idDisciplina,

        idAula

    );


    atualizarInterfaceAula();

}


// =====================================
// DESMARCAR TÓPICO
// =====================================

function desmarcarTopicoComoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const topico =
        garantirTopico(

            idDisciplina,

            idAula,

            idTopico

        );


    topico.concluido = false;


    topico.dataConclusao = null;


    atualizarProgressoCompleto(

        idDisciplina,

        idAula

    );


    atualizarInterfaceAula();

}


// =====================================
// ALTERNAR ESTADO DO TÓPICO
// =====================================

function alternarTopicoEstudado(
    idDisciplina,
    idAula,
    idTopico
) {

    const concluido =
        topicoFoiEstudado(

            idDisciplina,

            idAula,

            idTopico

        );


    if (concluido) {

        desmarcarTopicoComoEstudado(

            idDisciplina,

            idAula,

            idTopico

        );

    }
    else {

        marcarTopicoComoEstudado(

            idDisciplina,

            idAula,

            idTopico

        );

    }

}


// =====================================
// RECALCULAR PROGRESSO DA AULA
// =====================================

function recalcularProgressoAula(
    idDisciplina,
    idAula
) {

    const aula =
        garantirAula(

            idDisciplina,

            idAula

        );


    const totalTopicos =
        aula.totalTopicos || 0;


    if (totalTopicos === 0) {

        aula.progresso = 0;

        aula.concluida = false;


        return 0;

    }


    const topicosRegistrados =
        Object.values(
            aula.topicos
        );


    const totalConcluidos =
        topicosRegistrados.filter(

            topico =>
                topico.concluido === true

        ).length;


    const percentual =
        Math.round(

            (
                totalConcluidos /
                totalTopicos
            ) * 100

        );


    aula.progresso =
        percentual;


    aula.concluida =
        percentual === 100;


    return percentual;

}


// =====================================
// RECALCULAR PROGRESSO DA DISCIPLINA
// =====================================

function recalcularProgressoDisciplina(
    idDisciplina
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const aulas =
        Object.values(
            disciplina.aulas
        );


    if (aulas.length === 0) {

        disciplina.progresso = 0;


        return 0;

    }


    let somaProgresso = 0;


    aulas.forEach(
        aula => {

            somaProgresso +=
                aula.progresso || 0;

        }
    );


    disciplina.progresso =
        Math.round(

            somaProgresso /
            aulas.length

        );


    return disciplina.progresso;

}


// =====================================
// RECALCULAR TUDO
// =====================================

function atualizarProgressoCompleto(
    idDisciplina,
    idAula
) {

    recalcularProgressoAula(

        idDisciplina,

        idAula

    );


    recalcularProgressoDisciplina(
        idDisciplina
    );


    salvarDadosProgresso();


    dispararEventoProgresso(

        idDisciplina,

        idAula

    );

}


// =====================================
// PROGRESSO DA AULA
// =====================================

function obterProgressoAula(
    idDisciplina,
    idAula
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    const aula =
        normalizarIdentificador(
            idAula
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ] ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ].aulas[
                aula
            ]
    ) {

        return 0;

    }


    return (

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .aulas[
                aula
            ]
            .progresso || 0

    );

}


// =====================================
// PROGRESSO DA DISCIPLINA
// =====================================

function obterProgressoDisciplina(
    idDisciplina
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ]
    ) {

        return 0;

    }


    return (

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .progresso || 0

    );

}


// =====================================
// PROGRESSO GERAL
// =====================================

function calcularProgressoGeral() {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return 0;

    }


    const disciplinas =
        Object.values(
            dadosProgresso.disciplinas
        );


    if (disciplinas.length === 0) {

        return 0;

    }


    let soma = 0;


    disciplinas.forEach(
        disciplina => {

            soma +=
                disciplina.progresso || 0;

        }
    );


    return Math.round(

        soma /
        disciplinas.length

    );

}


// =====================================
// TEMPO DE ESTUDO POR DISCIPLINA
// =====================================
//
// Registro cumulativo de segundos estudados por
// disciplina, alimentado pelo cronômetro (pomodoro.js).
// Usa a mesma estrutura de dados e o mesmo localStorage
// do progresso de tópicos — não é um sistema paralelo.

function adicionarTempoEstudado(
    idDisciplina,
    segundosAdicionais
) {

    if (
        !segundosAdicionais ||
        segundosAdicionais <= 0
    ) {

        return;

    }


    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    disciplina.tempoEstudadoSegundos =

        (disciplina.tempoEstudadoSegundos || 0) +
        segundosAdicionais;


    salvarDadosProgresso();

}


// =====================================
// OBTER TEMPO ESTUDADO DE UMA DISCIPLINA
// =====================================

function obterTempoEstudadoDisciplina(
    idDisciplina
) {

    const disciplina =
        normalizarIdentificador(
            idDisciplina
        );


    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas ||
        !dadosProgresso
            .disciplinas[
                disciplina
            ]
    ) {

        return 0;

    }


    return (

        dadosProgresso
            .disciplinas[
                disciplina
            ]
            .tempoEstudadoSegundos || 0

    );

}


// =====================================
// OBTER TEMPO ESTUDADO TOTAL (TODAS DISCIPLINAS)
// =====================================

function obterTempoEstudadoGeral() {

    if (
        !dadosProgresso ||
        !dadosProgresso.disciplinas
    ) {

        return 0;

    }


    let soma = 0;


    Object.values(
        dadosProgresso.disciplinas
    ).forEach(
        disciplina => {

            soma +=
                disciplina.tempoEstudadoSegundos || 0;

        }
    );


    return soma;

}


// =====================================
// CRIAR CONTROLE DO TÓPICO
// =====================================

function criarControleDoTopico(
    elementoTopico,
    idTopico
) {

    let controle =
        elementoTopico.querySelector(
            ".controle-progresso-topico"
        );


    if (controle) {

        return controle;

    }


    controle =
        document.createElement(
            "div"
        );


    controle.className =
        "controle-progresso-topico";


    const botao =
        document.createElement(
            "button"
        );


    botao.type =
        "button";


    botao.className =
        "botao-topico-estudado";


    botao.dataset.topicoId =
        idTopico;


    botao.setAttribute(
        "aria-pressed",
        "false"
    );


    botao.addEventListener(
        "click",
        function () {

            alternarTopicoEstudado(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );

        }
    );


    controle.appendChild(
        botao
    );


    elementoTopico.appendChild(
        controle
    );


    return controle;

}


// =====================================
// INSERIR BOTÕES AUTOMATICAMENTE
// =====================================

function inserirBotoesDosTopicos() {

    const topicos =
        obterTopicosDaPagina();


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            criarControleDoTopico(

                elementoTopico,

                idTopico

            );

        }
    );

}


// =====================================
// ATUALIZAR BOTÕES DOS TÓPICOS
// =====================================

function atualizarBotoesDosTopicos() {

    const botoes =
        document.querySelectorAll(
            ".botao-topico-estudado"
        );


    botoes.forEach(
        botao => {

            const idTopico =
                botao.dataset.topicoId;


            const concluido =
                topicoFoiEstudado(

                    aulaAtual.disciplina,

                    aulaAtual.aula,

                    idTopico

                );


            if (concluido) {

                botao.textContent =
                    "✓ Tópico estudado";


                botao.classList.add(
                    "topico-concluido"
                );


                botao.setAttribute(
                    "aria-pressed",
                    "true"
                );

            }
            else {

                botao.textContent =
                    "Marcar tópico como estudado";


                botao.classList.remove(
                    "topico-concluido"
                );


                botao.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }
    );

}


// =====================================
// DESTACAR TÓPICOS CONCLUÍDOS
// =====================================

function atualizarEstadoDosTopicos() {

    const topicos =
        obterTopicosDaPagina();


    topicos.forEach(
        (
            elementoTopico,
            indice
        ) => {

            const idTopico =
                obterIdDoTopico(
                    elementoTopico,
                    indice
                );


            const concluido =
                topicoFoiEstudado(

                    aulaAtual.disciplina,

                    aulaAtual.aula,

                    idTopico

                );


            elementoTopico.classList.toggle(

                "topico-estudado",

                concluido

            );

        }
    );

}

// =====================================
// INDICADORES DO CONTEÚDO PROGRAMÁTICO
// =====================================
//
// Os itens do conteúdo programático podem
// possuir:
//
// data-progresso-topico="id-do-topico"
//
// O identificador deve ser exatamente o
// mesmo utilizado em:
//
// data-topico-id="id-do-topico"
//
// A caixa é apenas um indicador visual.
// O estado verdadeiro continua sendo
// controlado pelo sistema de progresso.
// =====================================


// =====================================
// CRIAR INDICADORES
// =====================================

function criarIndicadoresConteudoProgramatico() {

    const itens =
        document.querySelectorAll(
            "[data-progresso-topico]"
        );


    itens.forEach(
        item => {

            let indicador =
                item.querySelector(
                    ".indicador-conteudo-programatico"
                );


            if (indicador) {

                return;

            }


            indicador =
                document.createElement(
                    "span"
                );


            indicador.className =
                "indicador-conteudo-programatico";


            indicador.textContent =
                "□";


            indicador.setAttribute(
                "aria-hidden",
                "true"
            );


            // Pequeno espaçamento entre
            // a caixa e o texto.

            indicador.style.display =
                "inline-block";


            indicador.style.minWidth =
                "1.5em";


            indicador.style.fontWeight =
                "bold";


            item.insertBefore(

                indicador,

                item.firstChild

            );

        }
    );

}


// =====================================
// ATUALIZAR INDICADORES
// =====================================

function atualizarIndicadoresConteudoProgramatico() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return;

    }


    const itens =
        document.querySelectorAll(
            "[data-progresso-topico]"
        );


    itens.forEach(
        item => {

            const idTopico =
                normalizarIdentificador(
                    item.dataset.progressoTopico
                );


            if (!idTopico) {

                return;

            }


            const concluido =
                topicoFoiEstudado(

                    aulaAtual.disciplina,

                    aulaAtual.aula,

                    idTopico

                );


            const indicador =
                item.querySelector(
                    ".indicador-conteudo-programatico"
                );


            if (!indicador) {

                return;

            }


            if (concluido) {

                indicador.textContent =
                    "✓";


                indicador.style.color =
                    "#198754";


                indicador.setAttribute(
                    "aria-label",
                    "Tópico estudado"
                );

            }
            else {

                indicador.textContent =
                    "□";


                indicador.style.color =
                    "";


                indicador.setAttribute(
                    "aria-label",
                    "Tópico não estudado"
                );

            }

        }
    );

}
// =====================================
// ATUALIZAR PROGRESSO VISUAL DA AULA
// =====================================

function atualizarProgressoVisualAula() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return;

    }


    const percentual =
        obterProgressoAula(

            aulaAtual.disciplina,

            aulaAtual.aula

        );


    const barra =
        document.getElementById(
            "barra-progresso-aula"
        );


    const texto =
        document.getElementById(
            "texto-progresso-aula"
        );


    if (barra) {

        barra.style.width =
            percentual + "%";


        barra.setAttribute(
            "aria-valuenow",
            percentual
        );

    }


    if (texto) {

        texto.textContent =
            percentual +
            "% da aula concluída";

    }

}


// =====================================
// ATUALIZAR PROGRESSO GERAL VISUAL
// =====================================

function atualizarProgressoVisualGeral() {

    const percentual =
        calcularProgressoGeral();


    const barra =
        document.getElementById(
            "barra-progresso-geral"
        );


    const texto =
        document.getElementById(
            "texto-progresso-geral"
        );


    if (barra) {

        barra.style.width =
            percentual + "%";


        barra.setAttribute(
            "aria-valuenow",
            percentual
        );

    }


    if (texto) {

        texto.textContent =
            percentual +
            "% concluído";

    }

}

// =====================================
// IDENTIFICAR PÁGINA DE DISCIPLINA
// =====================================

function identificarPaginaDisciplina() {

    const corpo = document.body;

    if (!corpo) {

        return null;

    }


    const tipoPagina =
        corpo.dataset.tipoPagina;


    const disciplina =
        corpo.dataset.disciplina;


    if (
        tipoPagina !== "disciplina" ||
        !disciplina
    ) {

        return null;

    }


    return normalizarIdentificador(
        disciplina
    );

}


// =====================================
// REGISTRAR AULAS DA DISCIPLINA
// =====================================

function registrarAulasDaDisciplina(
    idDisciplina
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const seletor =
        '[data-disciplina="' +
        idDisciplina +
        '"] .card[data-assunto]';


    const cards =
        document.querySelectorAll(
            seletor
        );


    cards.forEach(
        card => {

            const idAula =
                normalizarIdentificador(
                    card.dataset.assunto
                );


            garantirAula(

                idDisciplina,

                idAula

            );

        }
    );


    recalcularProgressoDisciplina(
        idDisciplina
    );


    salvarDadosProgresso();


    return disciplina;

}


// =====================================
// ATUALIZAR CARDS DA DISCIPLINA
// =====================================

function atualizarCardsDaDisciplina(
    idDisciplina
) {

    const seletor =
        '[data-disciplina="' +
        idDisciplina +
        '"] .card[data-assunto]';


    const cards =
        document.querySelectorAll(
            seletor
        );


    cards.forEach(
        card => {

            const idAula =
                normalizarIdentificador(
                    card.dataset.assunto
                );


            const percentual =
                obterProgressoAula(

                    idDisciplina,

                    idAula

                );


            const status =
                card.querySelector(
                    ".status"
                );


            if (!status) {

                return;

            }


            status.classList.remove(

                "pendente",

                "em-estudo",

                "concluido"

            );


            if (percentual >= 100) {

                status.textContent =
                    "✅ Concluído";


                status.classList.add(
                    "concluido"
                );

            }
            else if (percentual > 0) {

                status.textContent =
                    "🟡 Em estudo — " +
                    percentual +
                    "%";


                status.classList.add(
                    "em-estudo"
                );

            }
            else {

                status.textContent =
                    "⬜ Não iniciado";


                status.classList.add(
                    "pendente"
                );

            }

        }
    );

}


// =====================================
// ATUALIZAR BARRA DA DISCIPLINA
// =====================================

function atualizarProgressoVisualDisciplina(
    idDisciplina
) {

    const disciplina =
        garantirDisciplina(
            idDisciplina
        );


    const aulas =
        Object.values(
            disciplina.aulas
        );


    const totalAulas =
        aulas.length;


    const aulasConcluidas =
        aulas.filter(
            aula =>
                aula.concluida === true
        ).length;


    const aulasEmEstudo =
        aulas.filter(
            aula =>
                (
                    aula.progresso || 0
                ) > 0 &&
                aula.concluida !== true
        ).length;


    const percentual =
        recalcularProgressoDisciplina(
            idDisciplina
        );


    const barra =
        document.getElementById(

            "barra-progresso-" +
            idDisciplina

        );


    const resumo =
        document.getElementById(

            "resumo-progresso-" +
            idDisciplina

        );


    const statusGeral =
        document.getElementById(

            "status-geral-" +
            idDisciplina

        );


    if (barra) {

        barra.style.width =
            percentual + "%";


        barra.textContent =
            percentual + "%";


        barra.setAttribute(
            "aria-valuenow",
            percentual
        );

    }


    if (resumo) {

        resumo.textContent =

            aulasConcluidas +
            " de " +
            totalAulas +
            " módulos concluídos";

    }


    if (statusGeral) {

        if (
            totalAulas > 0 &&
            aulasConcluidas === totalAulas
        ) {

            statusGeral.textContent =
                "Disciplina concluída";

        }
        else if (
            aulasConcluidas > 0 ||
            aulasEmEstudo > 0
        ) {

            statusGeral.textContent =

                aulasConcluidas +
                " concluído(s) e " +
                aulasEmEstudo +
                " em estudo";

        }
        else {

            statusGeral.textContent =
                "Nenhum módulo iniciado";

        }

    }


    salvarDadosProgresso();

}


// =====================================
// ATUALIZAR INTERFACE DA DISCIPLINA
// =====================================

function atualizarInterfaceDisciplina(
    idDisciplina
) {

    registrarAulasDaDisciplina(
        idDisciplina
    );


    atualizarCardsDaDisciplina(
        idDisciplina
    );


    atualizarProgressoVisualDisciplina(
        idDisciplina
    );


    atualizarProgressoVisualGeral();

}
// =====================================
// IDENTIFICAR PÁGINA PRINCIPAL
// =====================================

function identificarPaginaPrincipal() {

    const corpo = document.body;

    if (!corpo) {

        return false;

    }

    return corpo.dataset.tipoPagina ===
        "principal";

}


// =====================================
// CRIAR BARRA DE PROGRESSO NO CARD
// =====================================

function criarBarraDisciplina(card, disciplina) {

    let barraExistente = card.querySelector(
        ".progresso-disciplina-card"
    );

    if (barraExistente) {

        return;

    }

    const container =
        document.createElement("div");

    container.className =
        "progresso-disciplina-card";


    container.innerHTML = `

        <div class="barra-progresso">

            <div
                class="progresso"
                id="barra-card-${disciplina}"
                style="width:0%;"
            >

                0%

            </div>

        </div>

        <p
            id="texto-card-${disciplina}"
            style="margin-top:6px;font-size:13px;"
        >

            Progresso: 0%

        </p>

    `;


    const status =
        card.querySelector(".status");


    card.insertBefore(
        container,
        status
    );

}
// =====================================
// ATUALIZAR UM CARD DA DISCIPLINA
// =====================================

function atualizarCardDisciplina(card) {

    const disciplina =
        card.dataset.disciplina;

    if (!disciplina) {

        return;

    }

    garantirDisciplina(disciplina);

    criarBarraDisciplina(
        card,
        disciplina
    );

    const percentual =
        obterProgressoDisciplina(
            disciplina
        );

    const barra =
        document.getElementById(
            "barra-card-" + disciplina
        );

    const texto =
        document.getElementById(
            "texto-card-" + disciplina
        );

    const status =
        document.getElementById(
            "status-disciplina-" + disciplina
        );

    if (barra) {

        barra.style.width =
            percentual + "%";

        barra.textContent =
            percentual + "%";

    }

    if (texto) {

        texto.textContent =
            "Progresso: " +
            percentual +
            "%";

    }

    if (!status) {

        return;

    }

    status.classList.remove(
        "pendente",
        "em-estudo",
        "concluido"
    );

    if (percentual >= 100) {

        status.textContent =
            "✅ Concluído";

        status.classList.add(
            "concluido"
        );

    }
    else if (percentual > 0) {

        status.textContent =
            "🟡 Em estudo";

        status.classList.add(
            "em-estudo"
        );

    }
    else {

        status.textContent =
            "⬜ Não iniciado";

        status.classList.add(
            "pendente"
        );

    }

}



// =====================================
// ATUALIZAR TODOS OS CARDS
// =====================================

function atualizarPaginaPrincipal() {

    const cards =
        document.querySelectorAll(
            ".card[data-disciplina]"
        );

    cards.forEach(card => {

        atualizarCardDisciplina(card);

    });

}
// =====================================
// ATUALIZAR INTERFACE DA AULA
// =====================================

function atualizarInterfaceAula() {

    atualizarBotoesDosTopicos();


    atualizarEstadoDosTopicos();


    atualizarProgressoVisualAula();


    atualizarProgressoVisualGeral();

}


// =====================================
// EVENTO DE ATUALIZAÇÃO
// =====================================

function dispararEventoProgresso(
    idDisciplina,
    idAula
) {

    document.dispatchEvent(

        new CustomEvent(

            "progressoPSCPPAtualizado",

            {

                detail: {

                    disciplina:
                        idDisciplina,

                    aula:
                        idAula,

                    progressoAula:
                        obterProgressoAula(
                            idDisciplina,
                            idAula
                        ),

                    progressoDisciplina:
                        obterProgressoDisciplina(
                            idDisciplina
                        ),

                    progressoGeral:
                        calcularProgressoGeral()

                }

            }

        )

    );

}


// =====================================
// IR AO PRIMEIRO TÓPICO PENDENTE
// =====================================

function localizarPrimeiroTopicoPendente() {

    const topicos =
        obterTopicosDaPagina();


    for (
        let indice = 0;
        indice < topicos.length;
        indice++
    ) {

        const elementoTopico =
            topicos[indice];


        const idTopico =
            obterIdDoTopico(
                elementoTopico,
                indice
            );


        const concluido =
            topicoFoiEstudado(

                aulaAtual.disciplina,

                aulaAtual.aula,

                idTopico

            );


        if (!concluido) {

            return elementoTopico;

        }

    }


    return null;

}


// =====================================
// ROLAR ATÉ ONDE O ESTUDO PAROU
// =====================================

function irParaOndeParei() {

    const primeiroPendente =
        localizarPrimeiroTopicoPendente();


    if (!primeiroPendente) {

        window.alert(
            "Todos os tópicos desta aula já foram estudados."
        );


        return;

    }


    primeiroPendente.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });


    primeiroPendente.classList.add(
        "topico-destacado"
    );


    window.setTimeout(
        function () {

            primeiroPendente.classList.remove(
                "topico-destacado"
            );

        },
        2500
    );

}


// =====================================
// LOCALIZAR ÚLTIMO TÓPICO ESTUDADO
// =====================================
//
// Percorre os tópicos já registrados para a aula atual
// e retorna o elemento HTML do tópico com a data de
// conclusão mais recente. Retorna null se nenhum tópico
// da aula foi estudado ainda.

function localizarUltimoTopicoEstudado() {

    if (
        !aulaAtual.disciplina ||
        !aulaAtual.aula
    ) {

        return null;

    }


    const aula =
        garantirAula(

            aulaAtual.disciplina,

            aulaAtual.aula

        );


    let idUltimoTopico = null;

    let dataUltimoTopico = null;


    Object.entries(
        aula.topicos
    ).forEach(

        ([idTopico, dadosTopico]) => {

            if (
                dadosTopico.concluido &&
                dadosTopico.dataConclusao
            ) {

                const dataAtual =
                    new Date(
                        dadosTopico.dataConclusao
                    );


                if (
                    !dataUltimoTopico ||
                    dataAtual > dataUltimoTopico
                ) {

                    dataUltimoTopico =
                        dataAtual;


                    idUltimoTopico =
                        idTopico;

                }

            }

        }

    );


    if (!idUltimoTopico) {

        return null;

    }


    return document.querySelector(

        '[data-topico-id="' +
        idUltimoTopico +
        '"]'

    );

}


// =====================================
// IR AO ÚLTIMO TÓPICO ESTUDADO
// =====================================

function irParaUltimoTopicoEstudado() {

    const elementoTopico =
        localizarUltimoTopicoEstudado();


    if (!elementoTopico) {

        window.alert(
            "Nenhum tópico desta aula foi estudado ainda."
        );


        return;

    }


    elementoTopico.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });


    elementoTopico.classList.add(
        "topico-destacado"
    );


    window.setTimeout(
        function () {

            elementoTopico.classList.remove(
                "topico-destacado"
            );

        },
        2500
    );

}


// =====================================
// INICIALIZAR AULA
// =====================================

async function inicializarProgressoAula() {

    await carregarDadosProgresso();


    // Página principal
    if (identificarPaginaPrincipal()) {

        atualizarPaginaPrincipal();

        atualizarProgressoVisualGeral();

        return;

    }


    // Página de uma disciplina
    const disciplinaDaPagina =
        identificarPaginaDisciplina();


    if (disciplinaDaPagina) {

        atualizarInterfaceDisciplina(
            disciplinaDaPagina
        );


        return;

    }


    // Página de uma aula
    const aulaIdentificada =
        identificarAulaAtual();


    if (!aulaIdentificada) {

        atualizarProgressoVisualGeral();


        return;

    }


    registrarTopicosDaAula();


    inserirBotoesDosTopicos();


    atualizarInterfaceAula();

}


// =====================================
// LIMPAR TODO O PROGRESSO
// =====================================

function limparTodoProgresso() {

    const confirmar =
        window.confirm(

            "Deseja realmente apagar todo " +
            "o progresso de estudo salvo neste tablet?"

        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        CHAVE_PROGRESSO_PSCPP
    );


    dadosProgresso =
        criarEstruturaInicialProgresso();


    window.location.reload();

}


// =====================================
// CARREGAMENTO AUTOMÁTICO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        inicializarProgressoAula();

    }

);


// =====================================
// FIM DO SISTEMA DE PROGRESSO v4.1
// =====================================
