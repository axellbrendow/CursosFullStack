/*eslint-env browser*/

function exibirMensagensDeErro(erros)
{
    var ul = document.querySelector("#mensagens-erro");

    erros.forEach
    (
        function(erro)
        {
            var li = document.createElement("li");
            li.textContent = erro;

            ul.appendChild(li);
        }
    );
}

function limparErros()
{
    var errosLi = Array.from(document.querySelector("#mensagens-erro").children);

    errosLi.forEach
    (
        function(erroLi)
        {
            erroLi.textContent = "";
        }
    );

    /*
    Outra alternativa de código para essa função seria:

    // estipula que o código HTML interno (inner) a esse elemento deve ser "" (vazio)
    document.querySelector("#mensagens-erro").innerHTML = "";
    */
}

function obterPacienteDoForm(formulario)
{
	var paciente =
	{
		nome: formulario.nome.value,
		peso: formulario.peso.value,
		altura: formulario.altura.value,
		gordura: formulario.gordura.value,
		imc: calcularImc(formulario.peso.value, formulario.altura.value)
	}

	return paciente;
}

/* ------------------------------ Mudança do evento padrão do botão de adicionar ------------------------------ */

var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", // evento de clique no botão
	function (event)
	{
		event.preventDefault();

		var form = document.querySelector("#form-adicionar"); // obtém o formulário

		var paciente = obterPacienteDoForm(form); // extrai os dados do formulário e retorna um objeto paciente

		var pacienteTr = criarPacienteTr(paciente); // cria uma linha de tabela com os dados do paciente

		adicionarPaciente(pacienteTr); // adiciona a linha de tabela à tabela do site

		form.reset();
	}
);
