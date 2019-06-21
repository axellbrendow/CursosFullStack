/*eslint-env browser*/

function checarDadosPaciente(pacienteTr)
{
	if (pacienteTr == null) return;

	var erros = [];

  var nome = pacienteTr.querySelector(".info-nome").textContent;
	var peso = pacienteTr.querySelector(".info-peso").textContent;
	var altura = pacienteTr.querySelector(".info-altura").textContent;
	var gordura = pacienteTr.querySelector(".info-gordura").textContent;
	var tdImc = pacienteTr.querySelector(".info-imc");

	if (nome.length == 0)
	{
		tdImc.textContent = "Nome inválido";
		erros.push("Nome inválido");
	}

	if (peso <= 0 || peso >= 1000 || peso.length == 0)
	{
		tdImc.textContent = "Peso inválido";
		erros.push("Peso inválido");
	}

	if (altura <= 0 || altura >= 3 || altura.length == 0)
	{
		tdImc.textContent = "Altura inválida";
		erros.push("Altura inválida");
	}

	if (gordura.length == 0)
	{
		tdImc.textContent = "Gordura inválida";
		erros.push("Gordura inválida");
	}

	if (erros.length > 0) pacienteTr.classList.add("paciente-invalido");
	else                  pacienteTr.classList.remove("paciente-invalido");

	return erros;
}

function checarDadosDeTodosPacientes()
{
	var pacientes = document.querySelectorAll(".paciente");
	var quantPacientes = pacientes.length;

	for (var i = 0; i < quantPacientes; i++)
	{
		checarDadosPaciente(pacientes[i]); // irá checar os dados de todos os pacientes
	}
}

function criarPacienteTd(nomeDaClasse)
{
	var pacienteTd = document.createElement("td");

	pacienteTd.classList.add(nomeDaClasse);

	return pacienteTd;
}

function criarPacienteTr(paciente)
{
	// cria a linha de tabela para o paciente
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

	// cria e já acrescenta as colunas dessa linha
	pacienteTr.appendChild( criarPacienteTd("info-nome") );
	pacienteTr.appendChild( criarPacienteTd("info-peso") );
	pacienteTr.appendChild( criarPacienteTd("info-altura") );
	pacienteTr.appendChild( criarPacienteTd("info-gordura") );
	pacienteTr.appendChild( criarPacienteTd("info-imc") );

	atualizarDadosPaciente(pacienteTr, paciente);

	return pacienteTr;
}

function atualizarDadoPaciente(pacienteTr, nomeDoDado, novoValor)
{
  	pacienteTr.querySelector(".info-" + nomeDoDado).textContent = novoValor;
}

function atualizarDadosPaciente(pacienteTr, paciente)
{
		atualizarDadoPaciente(pacienteTr, "nome", paciente.nome);
		atualizarDadoPaciente(pacienteTr, "peso", paciente.peso);
		atualizarDadoPaciente(pacienteTr, "altura", paciente.altura);
		atualizarDadoPaciente(pacienteTr, "gordura", paciente.gordura);
		atualizarDadoPaciente(pacienteTr, "imc", paciente.imc);
}

function adicionarPaciente(pacienteTr)
{
  var pacientesTbody = document.querySelector("#tabela-pacientes");

  limparErros();

  var erros = checarDadosPaciente(pacienteTr);

  if (erros.length == 0) // checa se nenhum erro foi encontrado nos dados do paciente
  {
    pacientesTbody.appendChild(pacienteTr); // adiciona o paciente à tabela do site
  }

  else
  {
    exibirMensagensDeErro(erros);
  }
}

function adicionarRemocaoDePacientes()
{
  var pacientesTbody = document.querySelector("#tabela-pacientes");

  pacientesTbody.addEventListener("dblclick", // evento de clique duplo no corpo da tabela
    function(event)
    {
      var pacienteTr = event.target.parentNode; // guarda o parent (pai) do alvo do evento

      pacienteTr.classList.add("fadeOut"); // adiciona uma classe para esmaecimento

      setTimeout
      (
        function()
        {
          pacienteTr.remove(); // remove apos esmaecer ( 500ms )
        }, 500
      );
    }
  );
}

function adicionarFiltragemDePacientes()
{
  var filtroInput = document.querySelector("#filtro-pacientes");

  filtroInput.addEventListener("input", // evento de entrada de dados no campo de filtro
    function()
    {
      var pacientes = Array.from(document.querySelectorAll(".paciente")); // obtém um array de pacientes
      var filtro = filtroInput.value; // obtém o filtro digitado pelo usuário
      var regex = new RegExp(filtro, "i"); // cria uma expressão regular com esse filtro

      var nomePaciente = ""; // essa variável guardará os nomes de cada paciente

      pacientes.forEach // looping no array de pacientes
      (
        function(paciente)
        {
					// guarda o nome do paciente
          nomePaciente = paciente.querySelector(".info-nome").textContent;

					// testa se o nome do paciente casa com o filtro e se o filtro não está vazio
          if (!regex.test(nomePaciente) && filtro.length != 0)
          {
            paciente.classList.add("fadeOut"); // adiciona uma classe para esmaecimento

            setTimeout
            (
              function()
              {
								// após esmaecer, tempo de 500ms, faz com que o elemento não seja renderizado
                paciente.classList.add("nao-renderizar");
              }, 500
            );
          }

          else
          {
            paciente.classList.remove("nao-renderizar"); // volta a renderizar o elemento

            setTimeout
            (
              function()
              {
								// após um pequeno intervalo de 10ms, revitaliza o elemento
                paciente.classList.add("fadeIn");
                paciente.classList.remove("fadeOut");
              }, 10
            );

            setTimeout
            (
              function()
              {
                paciente.classList.remove("fadeIn");
              }, 510
            );
          }
        }
      );
    }
  );
}

function adicionarBuscaDePacientes()
{
	var botaoBuscarPacientes = document.querySelector("#buscar-pacientes");

	botaoBuscarPacientes.addEventListener("click", // evento de clique
		function()
		{
			var httpRequest = new XMLHttpRequest(); // requisitor HTTP

			httpRequest.open("GET", "https://api-pacientes.herokuapp.com/p1acientes");

			httpRequest.addEventListener("load", // evento de carregamento da resposta da requisição

				function()
				{
					if (httpRequest.status == 200) // checa se a requisição foi bem sucedida (código 200)
					{
						// o texto, digitado na notação de objeto JS, é convertido para objeto JS
						var pacientes = JSON.parse(httpRequest.responseText);

						pacientes.forEach
						(
							function(paciente)
							{
								adicionarPaciente( criarPacienteTr(paciente) );
							}
						);

						// obtém o parágrafo responsável por mostrar mensagens de erro de busca
						var erroDeBuscaP = document.querySelector("#erro-de-busca");

						erroDeBuscaP.classList.add("nao-renderizar"); // esconde-o
					}

					else
					{
						// obtém o parágrafo responsável por mostrar mensagens de erro de busca
						var erroDeBuscaP = document.querySelector("#erro-de-busca");

						erroDeBuscaP.classList.remove("nao-renderizar"); // revitaliza-o

						erroDeBuscaP.textContent += httpRequest.status; // adiciona o código de erro ao texto
					}
				}

			);

			httpRequest.send();
		}
	);
}

checarDadosDeTodosPacientes();
adicionarRemocaoDePacientes();
adicionarFiltragemDePacientes();
adicionarBuscaDePacientes();
