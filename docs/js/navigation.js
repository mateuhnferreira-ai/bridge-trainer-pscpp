// Navegação entre aulas do Bridge Trainer PSCPP

function concluirAula(idAula) {
    localStorage.setItem(idAula, "concluida");
    atualizarBotao(idAula);
}

function atualizarBotao(idAula) {
    const botao = document.getElementById("btnConcluir");

    if (!botao) return;

    if (localStorage.getItem(idAula) === "concluida") {
        botao.innerHTML = "✅ Aula concluída";
        botao.disabled = true;
    }
}

window.onload = function () {

    const pagina = document.body.dataset.lesson;

    if (pagina) {
        atualizarBotao(pagina);
    }

}
