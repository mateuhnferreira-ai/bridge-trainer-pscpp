// Navegação entre aulas do Bridge Trainer PSCPP


// =====================================
// VOLTAR PARA A PÁGINA ANTERIOR
// =====================================

function voltarPagina() {

    window.history.back();

}


// =====================================
// CONCLUIR AULA
// =====================================

function concluirAula(idAula) {

    localStorage.setItem(idAula, "concluida");

    atualizarBotao(idAula);

}


// =====================================
// ATUALIZAR BOTÃO DE CONCLUSÃO
// =====================================

function atualizarBotao(idAula) {

    const botao =
        document.getElementById("btnConcluir");

    if (!botao) return;

    if (
        localStorage.getItem(idAula) ===
        "concluida"
    ) {

        botao.innerHTML =
            "✅ Aula concluída";

        botao.disabled = true;

    }

}


// =====================================
// INICIALIZAÇÃO
// =====================================

window.addEventListener(
    "load",
    function () {

        const pagina =
            document.body.dataset.lesson;

        if (pagina) {

            atualizarBotao(pagina);

        }

    }
);
