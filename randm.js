const DIE = /(\d+)?d(\d+)([+|-]\d+)?/;

const isMocked = (funcName) => randm.next[funcName].returnValues.length > 0;

const mockedValue = (funcName) => randm.next[funcName].returnValues.pop();

const randm = {
  any: () => Math.random(),
  bool: () => !!randm.int.between(0, 1),
  coinFlip: () => (randm.bool() ? "heads" : "tails"),
  diceRoll: (die) =>
    die ? randm.customDiceRoll(die) : randm.int.between(1, 6),
  diceRollBeats: (target) => randm.diceRoll() >= target,
  diceRollOf: (die) => ({
    beats: (target) => randm.diceRollOf(die).isGreaterThanOrEqual(target),
    isGreaterThan: (target) => randm.diceRoll(die) > target,
    isGreaterThanOrEqual: (target) => randm.diceRoll(die) >= target,
    isLessThan: (target) => randm.diceRoll(die) < target,
    isLessThanOrEqual: (target) => randm.diceRoll(die) <= target,
    rolls: () => {
      if (!DIE.test(die))
        throw new Error("Invalid die specifier, try one of these: d6, d3, 2d4");
      const rolls = [];
      const [, count = 1, size, modifier = 0] = DIE.exec(die);
      for (let i = 0; i < count; i++) {
        rolls.push(randm.int.between(1, size));
      }
      const unmodifiedTotal = rolls.reduce((sum, roll) => sum + roll);
      return {
        rolls,
        unmodifiedTotal,
        modifier,
        total: unmodifiedTotal + parseInt(modifier),
      };
    },
  }),
  between: (x, y) => randm.any() * (y - x) + x,
  oneIn: (n) => randm.int.between(1, n) === n,
  from: (arry) => arry[randm.int.between(0, arry.length - 1)],
  happens: (times) => ({
    outOf: (total) =>
      Array.from(Array(times).keys()).includes(randm.int.between(0, total - 1)),
  }),
  percentageChance: (percentage) =>
    randm.happens(Math.abs(percentage)).outOf(100),
  customDiceRoll: (die) => randm.diceRollOf(die).rolls().total,
};

randm.int = {
  between: (x, y) => Math.round(randm.any() * (y - x)) + x,
};

randm.next = {};

Object.keys(randm).forEach((prop) => {
  if (typeof randm[prop] === "function") {
    const originalFunc = randm[prop];
    randm.next[prop] = {
      returnValues: [],
      returns: (val) => (randm.next[prop].returnValues = [val]),
    };
    randm[prop] = (...args) =>
      isMocked(prop) ? mockedValue(prop) : originalFunc(...args);
  }
});

module.exports = randm;
