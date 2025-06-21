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

class Bag {
  constructor(contents) {
    this._contents = contents?.length > 0 ? [...contents] : [];
    this._original = [...this._contents];
  }
  put(item) {
    this._contents.push(item);
  }
  pick() {
    if (this._contents?.length > 0) {
      const index = randm.int.between(0, this._contents.length - 1);
      return this._contents.splice(index, 1)[0];
    }
    throw new Error("Cannot pick from an empty bag");
  }
  contents() {
    return [...this._contents];
  }
  isEmpty() {
    return this._contents?.length === 0;
  }
  reset() {
    this._contents = [...this._original];
  }
}

const randm = {
  any: () => Math.random(),
  bool: () => !!randm.int.between(0, 1),
  coinFlip: () => (randm.bool() ? "heads" : "tails"),
  dateTime: () => new Date(randm.int.between(0, Date.now())),
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
    roll: () => randm.diceRollOf(die).rolls(),
  }),
  artilleryDie: () => randm.from([2, 4, 6, 8, 10, randm.artilleryDie.MISS]),
  scatterDie: () => ({
    direction: randm.between(0, 359),
    isHit: randm.oneIn(3),
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
  bag: (contents) => new Bag(contents),
  shuffle: (arry) => {
    let cpy;
    try {
      cpy = [...arry];
    } catch (e) {
      return arry;
    }
    for (let i = cpy.length - 1; i > 0; i--) {
      const j = randm.int.between(0, i);
      [cpy[i], cpy[j]] = [cpy[j], cpy[i]];
    }
    return cpy;
  },
};

randm.int = { between: (x, y) => Math.round(randm.any() * (y - x)) + x };

randm.date = {
  between: (x, y) => new Date(randm.int.between(x.getTime(), y.getTime())),
};

const resetMockedReturnValues = (mock) =>
  Object.keys(mock).forEach((prop) => (mock[prop].returnValues = []));

randm.next = {
  int: {},
  bag: {},
  reset: () => {
    resetMockedReturnValues(randm.next);
    resetMockedReturnValues(randm.next.int);
    resetMockedReturnValues(randm.next.bag);
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

const addMockingToFunctionsFromClass = (classPrototype, mock) => {
  Object.getOwnPropertyNames(classPrototype).forEach((prop) => {
    if (typeof classPrototype[prop] === "function" && prop !== "constructor") {
      const originalFunc = classPrototype[prop];
      mock[prop] = {
        returnValues: [],
        returns: (...vals) => (mock[prop].returnValues = [...vals]),
      };
      classPrototype[prop] = function (...args) {
        return isMocked(mock, prop)
          ? mockedValue(mock, prop)
          : originalFunc.apply(this, args);
      };
    }
  });
};

addMockingToFunctions(randm, randm.next);
addMockingToFunctions(randm.int, randm.next.int);
addMockingToFunctionsFromClass(Bag.prototype, randm.next.bag);

randm.artilleryDie.MISS = "MISS";

module.exports = randm;
