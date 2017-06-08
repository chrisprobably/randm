
const randm = {
  any: () => Math.random(),
  bool: () => !!randm.int.between(0, 1),
  coinFlip: () => randm.bool() ? 'heads' : 'tails',  
  between: (x, y) => (randm.any() * (y - x)) + x
};

randm.int = {
  between: (x, y) => Math.round(randm.any() * (y - x)) + x
};

module.exports = randm;
