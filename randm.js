const DIE = /(\d+)?d(\d+)([+|-]\d+)?/;

const randm = {
  any: () => Math.random(),
  bool: () => !!randm.int.between(0, 1),
  coinFlip: () => randm.bool() ? 'heads' : 'tails',  
  diceRoll: (die) => die ? randm.customDiceRoll(die) : randm.int.between(1, 6),
  between: (x, y) => (randm.any() * (y - x)) + x,
  oneIn: (n) => randm.int.between(1, n) === n,
  from: (arry) => arry[randm.int.between(0, arry.length-1)],
  customDiceRoll: (die) => {
  	if (! DIE.test(die)) throw new Error('Invalid die specifier, try one of these: d6, d3, 2d4');
  	const [ , count = 1, size, modifier = 0 ] = DIE.exec(die);
  	let total = 0;
  	for (let i = 0; i < count; i++) {
  		total += randm.int.between(1, size)
  	}
  	return total + parseInt(modifier);
  }
};

randm.int = {
  between: (x, y) => Math.round(randm.any() * (y - x)) + x
};

module.exports = randm;
