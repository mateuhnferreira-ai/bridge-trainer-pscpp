/* =====================================================
   BRIDGE TRAINER PSCPP
   APP.JS
===================================================== */

document.addEventListener("DOMContentLoaded", iniciarDashboard);

function iniciarDashboard() {

    carregarProgresso();

}

/* =====================================================
   PROGRESSO GERAL
===================================================== */

function carregarProgresso() {

    // Temporário
    // No futuro estes dados virão do progresso do usuário.

    const disciplinas = [

        0, // Arte Naval
        0, // Controlabilidade
        0, // Navegação
        0, // Meteorologia
        0, // Regulamentação
        0, // Comunicações
        0  // Inglês

    ];

    atualizarDashboard(disciplinas);

}

/* =====================================================
   DASHBOARD
===================================================== */

function atualizarDashboard(lista) {

    let soma = 0;

    lista.forEach(valor => {

        soma += valor;

    });

    const media = Math.round(soma / lista.length);

    const barra = document.getElementById("progresso-geral");

    const texto = document.getElementById("porcentagem-geral");

    barra.style.width = media + "%";

    texto.textContent = media + "%";

    atualizarMiniBarras(lista);

}

/* =====================================================
   BARRAS DAS DISCIPLINAS
===================================================== */

function atualizarMiniBarras(lista) {

    const barras = document.querySelectorAll(".mini-progresso");

    const textos = document.querySelectorAll(".card span");

    barras.forEach((barra, indice) => {

        barra.style.width = lista[indice] + "%";

        textos[indice].textContent = lista[indice] + "%";

    });

}

/* =====================================================
   FUNÇÕES FUTURAS
===================================================== */

// salvar progresso

function salvarProgresso() {

}

// carregar JSON

function carregarJSON() {

}

// atualizar metas

function atualizarMetas() {

}

// última aula

function ultimaAula() {

}

// revisões

function revisar() {

}
