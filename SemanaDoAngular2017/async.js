console.log('loading...');

somar(2, 2).then(
    (soma) =>
    {
        console.log('soma = ' + soma);

        dividir(soma, 2).then(
            (divisao) =>
            {
                console.log('done.');
                console.log('divisao = ' + divisao);
            }
        )
        .catch(
            (erro) =>
            {
                console.log(erro);
            }
        );
    }
);

function somar(a, b)
{
    return new Promise(
        (resolve, reject) =>
        {
            setTimeout(
                () =>
                {
                    resolve(a + b);
                },
                5 * 1000
            );
        }
    );
}

function dividir(a, b)
{
    return new Promise(
        (resolve, reject) =>
        {
            let result = a / b;

            if (result <= 2)
            {
                reject('Resultado incorreto');
            }

            else
            {
                resolve(a / b);
            }
        }
    );
}
