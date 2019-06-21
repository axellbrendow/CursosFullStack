var soma = somar(2, 2);

console.log('soma: ', soma);

var divisao = dividir(soma, 2);

console.log('divisao: ', divisao);

function somar(a, b)
{
    setTimeout(
        () =>
        {
            resolve(a + b);
        },
        10 * 1000
    );
}

function dividir(a, b)
{
    return a / b;
}
