/*eslint-env browser*/

function calcularImc(peso, altura)
{
	var imc = peso / (altura * altura);
	
	return imc.toFixed(2);
}

function atualizarImc(pacienteTr, peso, altura)
{
    if (typeof peso === "undefined")
    {
        peso = pacienteTr.querySelector(".info-peso").textContent;
    }

    if (typeof altura === "undefined")
    {
        altura = pacienteTr.querySelector(".info-altura").textContent;
    }

    pacienteTr.querySelector(".info-imc").textContent = calcularImc(peso, altura);
}

function atualizarImcDeTodos()
{
    var pacientes = document.querySelectorAll(".paciente");
    var quantPacientes = pacientes.length;

    for (var i = 0; i < quantPacientes; i++)
    {
        atualizarImc(pacientes[i]);
    }
}

atualizarImcDeTodos();
