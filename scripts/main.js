/**
    Game Tools
    v0.1 - 05-11-2021
    Opal Games - Design and Development
    screen: 600px x 600px
    requirements: JS, require.js
**/

console.log('game tools');

require.config({
    baseUrl: 'scripts/og',
    paths: {
        'util': 'ogUtil',
        'dice': 'ogDice',
        'board': 'ogBoard',
    }
});

requirejs(
    [
        'util',
        'dice',
        'board'
    ],
    function(
        util,
        dice,
        board
    ){


        /**
        * Game Tools Demo
        */

        /**
        * Dice Demo
        */
        let diceGroup1 = {
            sides : 100,
            count : 2,
            modifier : 0
        }

        let values = [];
        let value = 0;

        value = dice.rollDice(diceGroup1);
        console.log(value);
        values.push( value );

        value = dice.rollDice(diceGroup1);
        console.log(value);
        values.push( value );

        let total = dice.calculateTotal(values);
        console.log(total);


        /**
        * Board Demo
        */
        let boardState = board.boardFactory(10,10);
        console.table(boardState);
    }
);
