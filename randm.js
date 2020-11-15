const DIE = /(\d+)?d(\d+)([+|-]\d+)?/;

const isMocked = (mock, funcName) => mock[funcName].returnValues.length > 0;

const mockedValue = (mock, funcName) => mock[funcName].returnValues.shift();

const diceRollDetails = (die) => {
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
};

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
    rolls: () => diceRollDetails(die),
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

const resetMockedReturnValues = (mock) =>
  Object.keys(mock).forEach((prop) => (mock[prop].returnValues = []));

randm.next = {
  int: {},
  reset: () => {
    resetMockedReturnValues(randm.next);
    resetMockedReturnValues(randm.next.int);
  },
};

const addMockingToFunctions = (obj, mock) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "function") {
      const originalFunc = obj[prop];
      mock[prop] = {
        returnValues: [],
        returns: (...vals) => (mock[prop].returnValues = [...vals]),
      };
      obj[prop] = (...args) =>
        isMocked(mock, prop) ? mockedValue(mock, prop) : originalFunc(...args);
    }
  });
};

addMockingToFunctions(randm, randm.next);
addMockingToFunctions(randm.int, randm.next.int);

module.exports = randm;
