// =====================================
// BRIDGE TRAINER PSCPP
// MÓDULO DE PUBLICAÇÕES
// =====================================


// Publicações cadastradas no aplicativo

const publicacoesPSCPP = {

    pnaVolumeIII: {
        titulo: "PNA Volume III",
        subtitulo: "Motions in Waves and Controllability",
        arquivoSelecionado: null
    },

    navalShiphandling: {
        titulo: "Naval Shiphandling",
        subtitulo: "Shiphandling Principles and Practice",
        arquivoSelecionado: null
    },

    arteNaval: {
        titulo: "Arte Naval",
        subtitulo: "Fundamentos de construção e operação naval",
        arquivoSelecionado: null
    },

    normam201: {
        titulo: "NORMAM-201/DPC",
        subtitulo: "Embarcações Empregadas na Navegação de Mar Aberto",
        arquivoSelecionado: null
    },

    normam204: {
        titulo: "NORMAM-204/DPC",
        subtitulo: "Tráfego e Permanência de Embarcações",
        arquivoSelecionado: null
    },

    normam224: {
        titulo: "NORMAM-224/DPC",
        subtitulo: "Normas da Autoridade Marítima",
        arquivoSelecionado: null
    }

};


// =====================================
// SELECIONAR PUBLICAÇÃO NO DISPOSITIVO
// =====================================

function selecionarPublicacao(codigoPublicacao) {

    const publicacao = publicacoesPSCPP[codigoPublicacao];

    if (!publicacao) {

        alert("Publicação não cadastrada.");

        return;

    }


    const seletor = document.createElement("input");

    seletor.type = "file";

    seletor.accept = "application/pdf,.pdf";

    seletor.style.display = "none";


    seletor.addEventListener("change", function (evento) {

        const arquivo = evento.target.files[0];


        if (!arquivo) {

            return;

        }


        const nomeArquivo =
            arquivo.name.toLowerCase();


        if (
            arquivo.type !== "application/pdf" &&
            !nomeArquivo.endsWith(".pdf")
        ) {

            alert("Selecione um arquivo no formato PDF.");

            return;

        }


        publicacao.arquivoSelecionado = arquivo;


        abrirArquivoPublicacao(
            arquivo,
            publicacao.titulo
        );


        document.body.removeChild(seletor);

    });


    document.body.appendChild(seletor);

    seletor.click();

}


// =====================================
// ABRIR PUBLICAÇÃO
// =====================================

function abrirArquivoPublicacao(
    arquivo,
    tituloPublicacao
) {

    const enderecoTemporario =
        URL.createObjectURL(arquivo);


    const novaAba =
        window.open(
            enderecoTemporario,
            "_blank"
        );


    if (!novaAba) {

        alert(
            "O navegador bloqueou a abertura da publicação. " +
            "Permita a abertura de novas abas para o Bridge Trainer."
        );

        URL.revokeObjectURL(
            enderecoTemporario
        );

        return;

    }


    novaAba.document.title =
        tituloPublicacao;


    setTimeout(function () {

        URL.revokeObjectURL(
            enderecoTemporario
        );

    }, 300000);

}


// =====================================
// ABRIR NOVAMENTE PUBLICAÇÃO SELECIONADA
// =====================================

function abrirPublicacao(codigoPublicacao) {

    const publicacao =
        publicacoesPSCPP[codigoPublicacao];


    if (!publicacao) {

        alert("Publicação não cadastrada.");

        return;

    }


    if (!publicacao.arquivoSelecionado) {

        selecionarPublicacao(
            codigoPublicacao
        );

        return;

    }


    abrirArquivoPublicacao(
        publicacao.arquivoSelecionado,
        publicacao.titulo
    );

                             }
