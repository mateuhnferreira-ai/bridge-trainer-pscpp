// =====================================
// ENGLISH LISTENING ENGINE
// Bridge Trainer PSCPP
// English for Pilots
// Version 1.1
//
// Motor compartilhado por:
// docs/english/listening/
// =====================================


document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // ELEMENTOS
    // =====================================

    const voiceSelect =
        document.getElementById("listening-voice");

    const rateSelect =
        document.getElementById("listening-rate");

    const status =
        document.getElementById("listening-status");


    // =====================================
    // VERIFICAR SUPORTE DO NAVEGADOR
    // =====================================

    if (
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window)
    ) {

        if (status) {

            status.textContent =
                "❌ Audio not supported by this browser.";

        }


        document
            .querySelectorAll("[data-listen]")
            .forEach(function (button) {

                button.disabled = true;

            });


        return;

    }


    const synth =
        window.speechSynthesis;


    let englishVoices = [];


    // =====================================
    // STATUS
    // =====================================

    function atualizarStatus(texto) {

        if (status) {

            status.textContent =
                texto;

        }

    }


    // =====================================
    // CARREGAR VOZES
    // =====================================

    function carregarVozes() {


        const allVoices =
            synth.getVoices();


        englishVoices =
            allVoices.filter(
                function (voice) {

                    if (!voice.lang) {

                        return false;

                    }

                    return voice.lang
                        .toLowerCase()
                        .startsWith("en");

                }
            );


        if (!voiceSelect) {

            return;

        }


        voiceSelect.innerHTML = "";


        // =================================
        // NENHUMA VOZ INGLESA ENCONTRADA
        // =================================

        if (
            englishVoices.length === 0
        ) {

            const option =
                document.createElement("option");


            option.value = "";


            option.textContent =
                "Default English voice";


            voiceSelect.appendChild(
                option
            );


            return;

        }


        // =================================
        // INSERIR VOZES
        // =================================

        englishVoices.forEach(
            function (voice, index) {


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    index;


                option.textContent =
                    voice.name +
                    " — " +
                    voice.lang;


                voiceSelect.appendChild(
                    option
                );


            }
        );


        // =================================
        // PREFERÊNCIA:
        // INGLÊS BRITÂNICO
        // =================================

        const britishIndex =
            englishVoices.findIndex(
                function (voice) {

                    return voice.lang
                        .toLowerCase()
                        .startsWith("en-gb");

                }
            );


        if (
            britishIndex >= 0
        ) {

            voiceSelect.value =
                britishIndex;

        }


    }


    // =====================================
    // PRIMEIRO CARREGAMENTO
    // =====================================

    carregarVozes();


    // Android / Chrome pode carregar
    // as vozes depois da página.

    if (
        "onvoiceschanged"
        in synth
    ) {

        synth.onvoiceschanged =
            carregarVozes;

    }


    // =====================================
    // VELOCIDADE
    // =====================================

    function obterVelocidade() {


        if (!rateSelect) {

            return 0.90;

        }


        const velocidade =
            parseFloat(
                rateSelect.value
            );


        if (
            isNaN(velocidade)
        ) {

            return 0.90;

        }


        return velocidade;

    }


    // =====================================
    // VOZ SELECIONADA
    // =====================================

    function obterVozSelecionada() {


        if (
            !voiceSelect ||
            englishVoices.length === 0
        ) {

            return null;

        }


        const index =
            parseInt(
                voiceSelect.value,
                10
            );


        if (
            isNaN(index) ||
            !englishVoices[index]
        ) {

            return null;

        }


        return englishVoices[index];

    }


    // =====================================
    // EXECUTAR FALA
    // =====================================

    function falar(texto) {


        if (!texto) {

            atualizarStatus(
                "❌ No audio text found."
            );

            return;

        }


        // Cancela fala anterior

        synth.cancel();


        // Alguns navegadores Android
        // podem deixar o mecanismo pausado.

        if (synth.paused) {

            synth.resume();

        }


        const utterance =
            new SpeechSynthesisUtterance(
                texto
            );


        // =================================
        // VOZ
        // =================================

        const voice =
            obterVozSelecionada();


        if (voice) {

            utterance.voice =
                voice;

            utterance.lang =
                voice.lang;

        }

        else {

            utterance.lang =
                "en-US";

        }


        // =================================
        // CONFIGURAÇÕES
        // =================================

        utterance.rate =
            obterVelocidade();


        utterance.pitch =
            1;


        utterance.volume =
            1;


        // =================================
        // EVENTOS
        // =================================

        utterance.onstart =
            function () {

                atualizarStatus(
                    "🔊 Playing..."
                );

            };


        utterance.onend =
            function () {

                atualizarStatus(
                    "✅ Ready."
                );

            };


        utterance.onerror =
            function (event) {

                atualizarStatus(
                    "❌ Audio error: " +
                    event.error
                );

                console.error(
                    "Speech synthesis error:",
                    event
                );

            };


        // =================================
        // EXECUTAR
        // =================================

        synth.speak(
            utterance
        );

    }


    // =====================================
    // BOTÕES DE LISTENING
    // =====================================

    document.addEventListener(
        "click",
        function (event) {


            const button =
                event.target.closest(
                    "[data-listen]"
                );


            if (!button) {

                return;

            }


            event.preventDefault();


            const texto =
                button.getAttribute(
                    "data-text"
                );


            falar(
                texto
            );


        }
    );


    // =====================================
    // SISTEMA DE RESPOSTAS
    // =====================================

    document
        .querySelectorAll(
            ".listening-question"
        )
        .forEach(
            function (question) {


                const respostaCorreta =
                    question.getAttribute(
                        "data-answer"
                    );


                const feedback =
                    question.querySelector(
                        ".listening-feedback"
                    );


                const alternativas =
                    question.querySelectorAll(
                        ".listening-option"
                    );


                alternativas.forEach(
                    function (alternativa) {


                        alternativa.addEventListener(
                            "click",
                            function () {


                                const resposta =
                                    alternativa
                                        .getAttribute(
                                            "data-option"
                                        );


                                if (
                                    resposta ===
                                    respostaCorreta
                                ) {

                                    if (feedback) {

                                        feedback.innerHTML =
                                            "✅ Correct";

                                    }

                                }

                                else {

                                    if (feedback) {

                                        feedback.innerHTML =
                                            "❌ Try again";

                                    }

                                }


                            }
                        );


                    }
                );


            }
        );


    // =====================================
    // PARAR ÁUDIO AO SAIR
    // =====================================

    window.addEventListener(
        "beforeunload",
        function () {

            synth.cancel();

        }
    );


    // =====================================
    // SISTEMA PRONTO
    // =====================================

    atualizarStatus(
        "✅ Audio system ready."
    );


});
