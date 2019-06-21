/* ----------------------- Definicoes de dados ----------------------- */

var textoASerDigitado = $(".palavras").text(); // obtem o texto a ser digitado

var campoDeDigitacao = $(".campo-de-digitacao"); // obtem o campo de digitacao

var contadorDeCaracteres = $("#contador-de-caracteres"); // obtem o span que contem a quantidade de caracteres digitados
var contadorDePalavras = $("#contador-de-palavras"); // obtem o span que contem a quantidade de palavras digitadas

var tempoParaDigitacao = $("#tempo-para-digitacao"); // obtem o span que contem o tempo restante de digitacao
var tempoInicial = tempoParaDigitacao.text(); // obtem o tempo inicial desse span
var tempoRestante = 0; // guardara' o tempo restante que o usuario tem para digitar

var botaoReiniciar = $("#botao-reiniciar");


/* ----------------------- Funcoes ----------------------- */

function atualizarQuantidadeDePalavrasDoTextoCompleto()
{
    var palavras = textoASerDigitado.split(" "); // obtem as palavras do texto a ser digitado

    $("#numero-de-palavras").text(palavras.length); // acessa o span que contem o numero de palavras e atualiza o numero de palavras
}

function iniciarContadores()
{
    campoDeDigitacao.on("input",

        function()
        {
            var texto = campoDeDigitacao.val(); // obtem o texto digitado pelo usuario

            contadorDeCaracteres.text(texto.length); // atualiza a quantidade de caracteres do contador

            contadorDePalavras.text(texto.split(/\S+/).length - 1); // atualiza a quantidade de palavras do contador
            // /pattern/modifier e' um atalho para expressoes regulares. \S casa com caracteres nao brancos
        }

    );
}

function iniciarAnalisadorDeTexto()
{
    campoDeDigitacao.on("input",

        function()
        {
            var texto = campoDeDigitacao.val(); // obtem o texto digitado pelo usuario

            // checa se o inicio do texto digitado e' igual ao inicio do texto proposto
            if (texto == textoASerDigitado.substr(0, texto.length)) // poderia-se usar a funcao startsWith()
            {
                campoDeDigitacao.addClass("texto-correto");
                campoDeDigitacao.removeClass("texto-incorreto");
            }

            else
            {
                campoDeDigitacao.addClass("texto-incorreto");
                campoDeDigitacao.removeClass("texto-correto");
            }
        }

    );
}

function iniciarCronometro()
{
    campoDeDigitacao.one("focus", // escuta o evento de focus apenas uma vez

        function()
        {
            tempoRestante = tempoInicial; // inicia a contagem do tempo

            botaoReiniciar.attr("disabled", true); // desabilita o botao de reiniciar o jogo

            var cronometroID =
            setInterval // executa uma dada funcao a cada intervalo de tempo
            (
                function()
                {
                    tempoRestante--; // decrementa uma unidade no tempo
                    tempoParaDigitacao.text(tempoRestante); // atualiza o tempo restante

                    if (tempoRestante < 1) // checa se o tempo acabou
                    {
                        finalizarJogo();

                        clearInterval(cronometroID); // termina o ciclo da funcao setInterval
                    }

                }, 1000 // repete a funcao a cada 1000ms (1s)
            );
        }

    );
}

function finalizarJogo()
{
    campoDeDigitacao.attr("disabled", true); // adiciona o atributo disabled 'a area de texto
    campoDeDigitacao.toggleClass("campo-desativado"); // sinaliza visualmente que a caixa de texto foi desativada

    inserirPontuacaoNoPlacar();

    botaoReiniciar.attr("disabled", false); // reabilita o botao de reiniciar do jogo
}

function reiniciarJogo()
{
    campoDeDigitacao.val(""); // reseta o texto digitado
    campoDeDigitacao.attr("disabled", false); // reabilita o campo de digitacao
    campoDeDigitacao.toggleClass("campo-desativado"); // sinaliza visualmente que a caixa de texto foi reativada
    campoDeDigitacao.removeClass("texto-correto"); // remove a borda verde caso exista
    campoDeDigitacao.removeClass("texto-incorreto"); // remove a borda vermelha caso exista

    contadorDeCaracteres.text("0"); // reseta a quantidade de caracteres
    contadorDePalavras.text("0"); // reseta a quantidade de palavras

    tempoParaDigitacao.text(tempoInicial); // atualiza o tempo do cronometro

    iniciarCronometro();
}


/* ----------------------- Main ----------------------- */

$( // $()  -->  atalho para a funcao $(document).ready()

    function()
    {
        atualizarQuantidadeDePalavrasDoTextoCompleto();
        iniciarContadores();
        iniciarAnalisadorDeTexto();
        iniciarCronometro();
        habilitarRemocaoDasPontuacoes();

        botaoReiniciar.click(reiniciarJogo); // click() --> funcao de atalho para o escutador de evento click
    }

);
