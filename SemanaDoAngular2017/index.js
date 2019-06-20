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

// buscar jogo com nome top gear

let resultado = _.sortBy(games, ['nome']);

console.log(resultado);