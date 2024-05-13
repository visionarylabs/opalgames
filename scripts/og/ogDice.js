/**
    Game Tools
    v0.1 - 05-11-2021
    Opal Games - Design and Development
    screen: 600px x 600px
    requirements: JS, require.js
**/

export default{

    /**
     * Roll the dice.
     * @param {Object} options - Options for dice rolling.
     * @param {number} options.sides - The number of sides on the dice.
     * @param {number} [options.count=1] - The number of times to roll the dice (default: 1).
     * @param {number} [options.modifier=0] - A modifier to apply to each roll (default: 0).
     * @returns {number} The total value of the rolls.
     */
    rollDice : function( options ){
        //Object destructuring
        const { sides, count = 1, modifier = 0 } = options;
        let value = 0;
        for(let i=0;i<count;i++){
            value += Math.floor( Math.random() * sides ) + 1 + modifier;
        }
        return value;
    },

    /**
     * Calculate the total sum of numbers in an array.
     * @param {number[]} list - The array of numbers to sum.
     * @returns {number} The total sum of numbers.
     * @throws {Error} Throws an error if the input is not an array.
     */
    calculateTotal : function(list){
        if (!Array.isArray(list)) {
            throw new Error('Input is not an array');
        }
        let sum = 0;
        list.forEach(number => {
            sum += number;
        });
        return sum;
    }

};
