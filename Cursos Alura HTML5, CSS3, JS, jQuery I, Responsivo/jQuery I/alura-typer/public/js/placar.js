var contadorDePalavras = $("#contador-de-palavras"); // obtem o span que contem a quantidade de palavras digitadas

function criarLinhaDePontuacaoDoJogador(nomeJogador, quantPalavras)
{
    var linhaJogador = $("<tr>");

    var colunaNomeJogador = $("<td>").text(nomeJogador);
    var colunaQuantPalavras = $("<td>").text(quantPalavras);
    var colunaRemover = $("<td>");

    var botaoRemover = $("<a>").attr("id", "botao-remover");
    var iconeBotao = $("<i>").addClass("small").addClass("material-icons").text("delete");

    botaoRemover.append(iconeBotao);
    colunaRemover.append(botaoRemover);

    linhaJogador.append(colunaNomeJogador);
    linhaJogador.append(colunaQuantPalavras);
    linhaJogador.append(colunaRemover);

    botaoRemover.click(removerPontuacao);

    return linhaJogador;
}

function inserirPontuacaoNoPlacar()
{
    // obtem o tbody da tabela placar
    var tabelaTbody = $(".placar").find("tbody"); // A funcao find() busca entre os descendentes do elemento

    var jogador = "Douglas"; // obtem o nome do jogador
    var quantPalavras = contadorDePalavras.text(); // obtem a quantidade de palavras que o jogador conseguiu

    tabelaTbody.prepend(criarLinhaDePontuacaoDoJogador(jogador, quantPalavras)); // adiciona o codigo HTML no inicio do corpo da tabela
    // tambem existe a funcao append() que adicionaria o codigo no fim do corpo da tabela
}

function removerPontuacao(event)
{
    event.preventDefault();
    
    var linhaJogador = $(this).parent().parent(); // a funcao parent() retorna o pai de um objeto jQuery
    // a funcao jQuery() ($) tambem recebe elementos HTML e os transforma em objetos jQuery
    
    linhaJogador.fadeOut(600); // esmaece ate' sumir em 600ms
    
    setTimeout
    (
        function()
        {
            linhaJogador.remove();
            
        }, 600 // apos 600ms, remove a linha
    );
}

function habilitarRemocaoDasPontuacoes()
{
    $(".botao-remover").click(removerPontuacao);
}