// =====================================
// APLICATIVO DE PLANEJAMENTO PSCPP v2.2
// Bridge Trainer PSCPP
//
// v2.2:
//
// - mantém a inicialização aguardando
//   carregarDadosProgresso();
//
// - calcula dinamicamente a semana atual;
//
// - limpa os containers antes de recriar
//   os cards, evitando duplicações;
//
// - mantém a integração com:
//   configuracao-estudo.js
//   calculo-planejamento.js
//   motor-planejamento.js
//   banco-conteudo.js
//   progresso.js
// =====================================


async function inicializarPlanejamento() {


    // =====================================
    // CARREGAR PROGRESSO
    // =====================================

    if (
        typeof carregarDadosProgresso ===
        "function"
    ) {


        await carregarDadosProgresso();


    }
    else {


        console.error(

            "progresso.js não foi carregado antes de " +
            "app-planejamento.js. Inclua " +
            "<script src=\"../js/progresso.js\">" +
            " antes deste arquivo."

        );


    }



    // =====================================
    // CALCULAR INFORMAÇÕES GERAIS
    // =====================================

    const dadosPlanejamento =
        calcularPlanejamento();



    // =====================================
    // GERAR PLANO ESTRATÉGICO
    // =====================================

    const planoEstudo =
        gerarPlanoEstudo();



    // =====================================
    // SEMANA ATUAL
    // =====================================

    const semanaElemento =
        document.getElementById(
            "semana-atual"
        );


    if (semanaElemento) {


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


        const diferencaMilissegundos =

            dataAtual -
            dataInicio;


        let semanaAtual =

            Math.floor(

                diferencaMilissegundos /
                milissegundosPorSemana

            ) + 1;


        if (semanaAtual < 1) {


            semanaAtual = 1;


        }


        if (
            dadosPlanejamento
                .semanasDisponiveis > 0 &&
            semanaAtual >
            dadosPlanejamento
                .semanasDisponiveis
        ) {


            semanaAtual =

                dadosPlanejamento
                    .semanasDisponiveis;


        }


        semanaElemento.textContent =

            "Semana " +
            semanaAtual +
            " de " +
            dadosPlanejamento
                .semanasDisponiveis;


    }



    // =====================================
    // HORAS DISPONÍVEIS
    // =====================================

    const horasElemento =
        document.getElementById(
            "horas-disponiveis"
        );


    if (horasElemento) {


        horasElemento.textContent =

            dadosPlanejamento
                .horasPorSemana +

            " horas / semana";


    }



    // =====================================
    // META DA SEMANA
    // =====================================

    const metaElemento =
        document.getElementById(
            "meta-semana"
        );


    if (metaElemento) {


        if (planoEstudo.length > 0) {


            metaElemento.textContent =

                planoEstudo[0]
                    .disciplina +

                " - " +

                planoEstudo[0]
                    .assunto;


        }
        else {


            metaElemento.textContent =

                "Todos os assuntos concluídos";


        }


    }



    // =====================================
    // DISTRIBUIÇÃO POR DISCIPLINA
    // =====================================

    const distribuicao =
        document.getElementById(
            "distribuicao-carga"
        );


    if (distribuicao) {


        // Evita duplicação de cards
        distribuicao.innerHTML = "";


        const disciplinas = {};


        planoEstudo.forEach(
            item => {


                if (
                    !disciplinas[
                        item.disciplina
                    ]
                ) {


                    disciplinas[
                        item.disciplina
                    ] = {


                        idDisciplina:
                            item.idDisciplina,


                        horas:
                            0


                    };


                }


                disciplinas[
                    item.disciplina
                ].horas +=
                    item.horas;


            }
        );


        Object.keys(
            disciplinas
        ).forEach(
            disciplina => {


                const dadosCard =

                    disciplinas[
                        disciplina
                    ];


                const card =
                    document.createElement(
                        "a"
                    );


                card.className =
                    "card";


                card.href =

                    "../disciplinas/" +
                    dadosCard.idDisciplina +
                    "/index.html";


                const titulo =
                    document.createElement(
                        "h3"
                    );


                titulo.textContent =
                    disciplina;


                const horasPendentes =
                    document.createElement(
                        "p"
                    );


                horasPendentes.textContent =

                    dadosCard.horas +
                    " horas pendentes";


                card.appendChild(
                    titulo
                );


                card.appendChild(
                    horasPendentes
                );


                distribuicao.appendChild(
                    card
                );


            }
        );


    }



    // =====================================
    // PRÓXIMOS ESTUDOS
    // =====================================

    const lista =
        document.getElementById(
            "lista-estudos"
        );


    if (lista) {


        // Evita duplicação de cards
        lista.innerHTML = "";


        planoEstudo
            .slice(
                0,
                10
            )
            .forEach(
                item => {


                    const estudo =
                        document.createElement(
                            "div"
                        );


                    estudo.className =
                        "card";


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


                    const cargaHoraria =
                        document.createElement(
                            "p"
                        );


                    cargaHoraria.textContent =

                        "⏱ " +
                        item.horas +
                        " horas";


                    const prioridade =
                        document.createElement(
                            "p"
                        );


                    prioridade.textContent =

                        "⭐ Prioridade: " +
                        item.prioridade;


                    const linkAula =
                        document.createElement(
                            "a"
                        );


                    linkAula.className =
                        "botao";


                    linkAula.href =

                        "../disciplinas/" +
                        item.idDisciplina +
                        "/" +
                        item.idAssunto +
                        ".html";


                    linkAula.textContent =
                        "Ir para a aula";


                    estudo.appendChild(
                        tituloDisciplina
                    );


                    estudo.appendChild(
                        tituloAssunto
                    );


                    estudo.appendChild(
                        cargaHoraria
                    );


                    estudo.appendChild(
                        prioridade
                    );


                    estudo.appendChild(
                        linkAula
                    );


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


}



// =====================================
// CARREGAMENTO AUTOMÁTICO
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    inicializarPlanejamento

);


// =====================================
// FIM DO APP-PLANEJAMENTO v2.2
// =====================================
