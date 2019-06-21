const _ = require('lodash');

let games = [
    {
        nome: 'Street Fighter',
        ano: 1990
    },
    {
        nome: 'Mortal Kombat',
        ano: 1991
    },
    {
        nome: 'Top Gear',
        ano: 1992
    },
];

// Tarefa 2

let resultado = games.slice();

function bhaskara(a, b, c)
{
    return new Promise(
        (resolve, reject) =>
        {
            let delta = b * b - 4 * a * c;
            let sqrtDelta = Math.sqrt(delta);
            let x1 = (b + sqrtDelta) / 2 * a;
            let x2 = (b - sqrtDelta) / 2 * a;

            resolve({ x1: x1, x2: x2 });
        }
    )
}

function divisao(a, b)
{
    return new Promise(
        (resolve, reject) =>
        {
            if (b == 0)
            {
                reject('Error: dividing by zero.');
            }

            else
            {
                resolve(a / b);
            }
        }
    )
}

divisao(1, 0).then((divisao)  => { console.log(divisao); } )
.catch( (error) => console.log(error) );

// console.log(_.sortBy(resultado, ['nome']));
// console.log();
// console.log(_.sortBy(resultado, ['ano']));
// console.log();
// console.log(_.reverse(resultado));
// console.log();
// _.remove(resultado, (element) => element.nome == 'Top Gear');
// console.log(resultado);