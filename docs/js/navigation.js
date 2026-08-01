// Navegação entre páginas do Bridge Trainer PSCPP


// =====================================
// VOLTAR PARA A PÁGINA ANTERIOR
// =====================================
//
// Tenta usar o histórico do navegador. Se não houver
// histórico (ex: página aberta direto de um favorito ou
// de um QR code), usa como alternativa o link de início
// já presente na própria página — o botão flutuante
// ".botao-inicio" ou o link "🏠 Início" da navbar — para
// não depender de caminhos relativos fixos por arquivo.

function voltarPagina() {

    if (window.history.length > 1) {

        window.history.back();

        return;

    }


    const linkAlternativo =
        document.querySelector(".botao-inicio") ||
        document.querySelector(
            'nav.navbar a[href*="index.html"]'
        );


    if (linkAlternativo) {

        window.location.href =
            linkAlternativo.getAttribute("href");

        return;

    }


    // Último recurso, caso a página não possua
    // nenhum link de início identificável
    window.location.href = "index.html";

}


/* =====================================================
   OBSERVAÇÃO

   O controle de conclusão de aulas e tópicos é feito
   inteiramente por progresso.js (chave
   "bridgeTrainerPSCPP_progresso" no localStorage,
   estruturada por disciplina > aula > tópico).

   Este arquivo cuida apenas de navegação entre páginas.
   Não adicione aqui lógica de progresso — isso evita
   ter dois sistemas de progresso conflitando entre si.
===================================================== */
