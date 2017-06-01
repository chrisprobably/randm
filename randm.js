
const randm = {
  any: () => Math.random(),
  between: (x, y) => (randm.any() * (y - x)) + x
};

randm.int = {
  between: (x, y) => Math.round(randm.any() * (y - x)) + x
};

module.exports = randm;
