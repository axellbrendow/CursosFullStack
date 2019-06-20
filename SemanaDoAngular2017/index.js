// const _ = require('lodash');

// let games = [
//     {
//         nome: 'Street Fighter',
//         ano: 1990
//     },
//     {
//         nome: 'Mortal Kombat',
//         ano: 1991
//     },
//     {
//         nome: 'Top Gear',
//         ano: 1992
//     },
// ];

// // Tarefa 1

// let resultado = games.slice();

// console.log(_.sortBy(resultado, ['nome']));
// console.log();
// console.log(_.sortBy(resultado, ['ano']));
// console.log();
// console.log(_.reverse(resultado));
// console.log();
// _.remove(resultado, (element) => element.nome == 'Top Gear');
// console.log(resultado);

var soma = somar(2, 2);

console.log('soma: ', soma);

var divisao = dividir(soma, 2);

console.log('divisao: ', divisao);

function somar(a, b)
{
    setTimeout(
    () =>
    {
        return a + b;
    },
    10 * 1000);
}

function dividir(a, b)
{
    return a / b;
}