var randm = require("../randm");
var t = require("tap");

t.beforeEach(() => {
  randm.next.reset();
});

t.test("generates random number", function (t) {
  const rndNum = randm.any();
  console.log("randm.any()", rndNum);
  t.end();
});

t.test("generates random boolean", function (t) {
  const rndBoolean = randm.bool();
  console.log("randm.bool()", rndBoolean);
  t.type(rndBoolean, "boolean");
  t.end();
});

t.test("generates coin flip", function (t) {
  let coinFlip = randm.coinFlip();
  console.log("randm.coinFlip()", coinFlip);
  randm.next.bool.returns(true);
  t.type(coinFlip, "string");
  t.equal(coinFlip, "heads");
  randm.next.bool.returns(false);
  coinFlip = randm.coinFlip();
  t.type(coinFlip, "string");
  t.equal(coinFlip, "tails");
  t.end();
});

t.test(
  "generates a chance, which returns true on a one in N basis",
  function (t) {
    const chance = randm.oneIn(2);
    t.type(chance, "boolean");
    console.log("randm.oneIn(2)", chance);
    t.end();
  }
);

t.test("randm.oneIn(1) always returns true", function (t) {
  const chance = randm.oneIn(1);
  t.equal(true, chance);
  t.end();
});

t.test(
  "randm.artilleryDie() returns one of 2, 4, 6, 8, 10, or MISS",
  function (t) {
    const val = randm.artilleryDie();
    t.match(val, /2|4|6|8|10|MISS/);
    t.end();
  }
);

t.test("randm.artilleryDie.MISS is equal to a string of 'MISS'", function (t) {
  console.log("randm.artilleryDie()", randm.artilleryDie());
  t.equal(randm.artilleryDie.MISS, "MISS");
  t.end();
});

t.test(
  "randm.scatterDie() returns a direction from 0 to 359 degrees and a boolean isHit result",
  function (t) {
    const { direction, isHit } = randm.scatterDie();
    console.log("randm.scatterDie()", randm.scatterDie());
    t.ok(direction >= 0 && direction <= 359);
    t.type(isHit, "boolean");
    t.end();
  }
);

t.test(
  "generates dice roll with a 6-sided die given no arguments",
  function (t) {
    const diceRoll = randm.diceRoll();
    console.log("randm.diceRoll()", diceRoll);
    t.match(diceRoll, /[1-6]/);
    t.end();
  }
);

t.test("generates dice roll with the passed die size", function (t) {
  const diceRoll = randm.diceRoll("d3");
  console.log('randm.diceRoll("d3")', diceRoll);
  t.match(diceRoll, /[1-3]/);
  t.end();
});

t.test("generates dice roll with the passed die size", function (t) {
  const diceRoll = randm.diceRoll("d3");
  console.log('randm.diceRoll("d3")', diceRoll);
  t.match(diceRoll, /[1-3]/);
  t.end();
});

t.test("generates dice roll with the passed die count and size", function (t) {
  const diceRoll = randm.diceRoll("2d1");
  console.log('randm.diceRoll("2d1")', diceRoll);
  t.equal(2, diceRoll);
  t.end();
});

t.test(
  "generates dice roll with the passed multi-digit die count and size",
  function (t) {
    const diceRoll = randm.diceRoll("33d1");
    console.log('randm.diceRoll("33d1")', diceRoll);
    t.equal(33, diceRoll);
    t.end();
  }
);

t.test("generates dice roll with a positive modifier", function (t) {
  const diceRoll = randm.diceRoll("d1+1");
  console.log('randm.diceRoll("d1+1")', diceRoll);
  t.equal(2, diceRoll);
  t.end();
});

t.test(
  "generates dice roll with a multi-digit positive modifier",
  function (t) {
    const diceRoll = randm.diceRoll("d1+22");
    console.log('randm.diceRoll("d1+22")', diceRoll);
    t.equal(23, diceRoll);
    t.end();
  }
);

t.test("generates dice roll for d3+2", function (t) {
  const diceRoll = randm.diceRoll("d3+2");
  console.log('randm.diceRoll("d3+2")', diceRoll);
  t.match(diceRoll, /[3-5]/);
  t.end();
});

t.test("generates dice roll with a negative modifier", function (t) {
  const diceRoll = randm.diceRoll("d1-1");
  console.log('randm.diceRoll("d1-1")', diceRoll);
  t.equal(0, diceRoll);
  t.end();
});

t.test("generates dice roll with the passed 2d3", function (t) {
  const diceRoll = randm.diceRoll("2d3");
  console.log('randm.diceRoll("2d3")', diceRoll);
  t.match(diceRoll, /[2-6]/);
  t.end();
});

t.test("throws an error with an incorrect die specifier", function (t) {
  t.throws(() => randm.diceRoll("40"));
  t.end();
});

t.test("generates random number between two values", function (t) {
  t.equal(1, randm.between(1, 1));
  t.equal(-99, randm.between(-99, -99));
  t.equal(0, randm.between(0, 0));

  console.log("randm.between(0, 10)", randm.between(0, 10));
  t.end();
});

t.test("generates random int between two values", function (t) {
  t.equal(1, randm.int.between(1, 1));
  t.equal(-99, randm.int.between(-99, -99));
  t.equal(0, randm.int.between(0, 0));

  console.log("randm.int.between(0, 10)", randm.int.between(0, 10));
  t.end();
});

t.test("random ints are integers", function (t) {
  t.ok(Number.isInteger(randm.int.between(1, 100)));
  t.end();
});

t.test("random negative ints are integers", function (t) {
  t.ok(Number.isInteger(randm.int.between(-100, 0)));
  t.end();
});

t.test("chooses a random value from an array", function (t) {
  const val = randm.from(["foo", "bar", "qux"]);
  console.log("randm.from(['foo', 'bar', 'qux'])", val);
  t.type(val, "string");
  t.match(val, /foo|bar|qux/);
  t.end();
});

t.test("chooses a random number from an array", function (t) {
  const val = randm.from([88, 626, 954]);
  t.type(val, "number");
  t.match(val, /88|626|954/);
  t.end();
});

t.test(
  "always returns the same value when calling from on a single element array",
  function (t) {
    const val = randm.from(["narnia"]);
    t.equal(val, "narnia");
    t.end();
  }
);

t.test("happens one out of one is always true", function (t) {
  const val = randm.happens(1).outOf(1);
  t.equal(val, true);
  t.end();
});

t.test("happens zero out of ten is always false", function (t) {
  const val = randm.happens(0).outOf(10);
  t.equal(val, false);
  t.end();
});

t.test("perecentageChance of 100% always returns true", function (t) {
  const val = randm.percentageChance(100);
  t.equal(val, true);
  t.end();
});

t.test("perecentageChance of 0% always returns false", function (t) {
  const val = randm.percentageChance(0);
  t.equal(val, false);
  t.end();
});

t.test(
  "randm.next.int.between sets the next randm.int.between result",
  function (t) {
    randm.next.int.between.returns(33);
    const val = randm.int.between(5, 8);
    t.equal(val, 33);
    t.end();
  }
);

t.test("next sets the next diceRoll result", function (t) {
  randm.next.diceRoll.returns(3);
  const val = randm.diceRoll();
  t.equal(val, 3);
  t.end();
});

t.test(
  "next sets the next diceRoll result but does not affect the subsequent one",
  function (t) {
    randm.next.diceRoll.returns(99);
    t.equal(randm.diceRoll(), 99);
    const subsequentRoll = randm.diceRoll();
    t.not(randm.diceRoll(), 99);
    t.ok(subsequentRoll >= 1 && subsequentRoll <= 6);
    t.end();
  }
);

t.test(
  "next sets the next diceRoll results in order when passed a list of arguments",
  function (t) {
    randm.next.diceRoll.returns(100, 200, 300);
    t.equal(randm.diceRoll(), 100);
    t.equal(randm.diceRoll(), 200);
    t.equal(randm.diceRoll(), 300);
    t.end();
  }
);

t.test(
  "next sets the next diceRoll results when passed multiple arguments but does not affect the subsequent one",
  function (t) {
    randm.next.diceRoll.returns(100, 200, 300);
    t.equal(randm.diceRoll(), 100);
    t.equal(randm.diceRoll(), 200);
    t.equal(randm.diceRoll(), 300);
    const subsequentRoll = randm.diceRoll();
    t.ok(subsequentRoll >= 1 && subsequentRoll <= 6);
    t.end();
  }
);

t.test("calling returns overwrites the previous return value", function (t) {
  randm.next.diceRoll.returns(99);
  randm.next.diceRoll.returns(101);
  t.equal(randm.diceRoll(), 101);
  const subsequentRoll = randm.diceRoll();
  t.ok(subsequentRoll >= 1 && subsequentRoll <= 6);
  t.end();
});

t.test("next sets the next any result", function (t) {
  randm.next.any.returns(0.12345);
  const val = randm.any();
  t.equal(val, 0.12345);
  t.end();
});

t.test("next sets the next bool result as false", function (t) {
  randm.next.bool.returns(false);
  const val = randm.bool();
  t.equal(val, false);
  t.end();
});

t.test("next sets the next bool result as true", function (t) {
  randm.next.bool.returns(true);
  const val = randm.bool();
  t.equal(val, true);
  t.end();
});

t.test("next sets the next coinFlip result as tails", function (t) {
  randm.next.coinFlip.returns("tails");
  const val = randm.coinFlip();
  t.equal(val, "tails");
  t.end();
});

t.test("next sets the next coinFlip result as heads", function (t) {
  randm.next.coinFlip.returns("heads");
  const val = randm.coinFlip();
  t.equal(val, "heads");
  t.end();
});

t.test("next sets the next between result", function (t) {
  randm.next.between.returns(5);
  const val = randm.between(1, 4);
  t.equal(val, 5);
  t.end();
});

t.test(
  "diceRollBeats returns true when a diceRoll is equal or greater than the passed value",
  function (t) {
    t.ok(randm.diceRollBeats(1));
    console.log("randm.diceRollBeats(4)", randm.diceRollBeats(4));
    t.end();
  }
);

t.test(
  "diceRollBeats returns false when a diceRoll is not equal or greater than the passed value",
  function (t) {
    t.notOk(randm.diceRollBeats(7));
    t.end();
  }
);

t.test(
  "diceRollOf().isGreaterThanOrEqual() returns true when a diceRoll of the passed die count is equal or greater than the target",
  function (t) {
    t.ok(randm.diceRollOf("d3+6").isGreaterThanOrEqual(7));
    console.log(
      "randm.diceRollOf('3d6').isGreaterThanOrEqual(4)",
      randm.diceRollOf("3d6").isGreaterThanOrEqual(4)
    );
    t.end();
  }
);

t.test(
  "diceRollOf().isGreaterThanOrEqual() returns false when a diceRoll of the passed die count is not equal or greater than the target",
  function (t) {
    t.notOk(randm.diceRollOf("d1").isGreaterThanOrEqual(2));
    t.end();
  }
);

t.test(
  "diceRollOf().beats() returns true when a diceRoll of the passed die count is equal or greater than the target",
  function (t) {
    t.ok(randm.diceRollOf("d3+6").beats(7));
    console.log(
      "randm.diceRollOf('3d6').beats(4)",
      randm.diceRollOf("3d6").beats(4)
    );
    t.end();
  }
);

t.test(
  "diceRollOf().beats() returns false when a diceRoll of the passed die count is not equal or greater than the target",
  function (t) {
    t.notOk(randm.diceRollOf("d1").beats(2));
    t.end();
  }
);

t.test(
  "diceRollOf().isGreaterThan() returns true when a diceRoll of the passed die count is greater than the target",
  function (t) {
    t.ok(randm.diceRollOf("d3+6").isGreaterThan(6));
    console.log(
      "randm.diceRollOf('3d6').isGreaterThan(4)",
      randm.diceRollOf("3d6").isGreaterThan(4)
    );
    t.end();
  }
);

t.test(
  "diceRollOf().isGreaterThan() returns false when a diceRoll of the passed die count is not greater than the target",
  function (t) {
    t.notOk(randm.diceRollOf("d1").isGreaterThan(1));
    t.end();
  }
);

t.test(
  "diceRollOf().isLessThan() returns true when a diceRoll of the passed die count is less than the target",
  function (t) {
    t.ok(randm.diceRollOf("d6").isLessThan(7));
    console.log(
      "randm.diceRollOf('d6').isLessThan(4)",
      randm.diceRollOf("d6").isLessThan(4)
    );
    t.end();
  }
);

t.test(
  "diceRollOf().isLessThan() returns false when a diceRoll of the passed die count is not less than the target",
  function (t) {
    t.notOk(randm.diceRollOf("3d6+2").isLessThan(5));
    t.end();
  }
);

t.test(
  "diceRollOf().isLessThanOrEqual() returns true when a diceRoll of the passed die count is less than or equal to the target",
  function (t) {
    t.ok(randm.diceRollOf("d1").isLessThanOrEqual(1));
    console.log(
      "randm.diceRollOf('d6').isLessThanOrEqual(4)",
      randm.diceRollOf("d6").isLessThanOrEqual(4)
    );
    t.end();
  }
);

t.test(
  "diceRollOf().isLessThanOrEqual() returns false when a diceRoll of the passed die count is not less than or equal to the target",
  function (t) {
    t.notOk(randm.diceRollOf("3d6+2").isLessThanOrEqual(6));
    t.end();
  }
);

t.test(
  "diceRollOf().rolls() returns an object containing the total and the individual dice rolls",
  function (t) {
    randm.next.int.between.returns(3);
    const { total, rolls } = randm.diceRollOf("d6+2").rolls();
    t.equal(total, 5);
    t.same(rolls, [3]);
    console.log(
      'randm.diceRollOf("3d6+2").rolls()',
      randm.diceRollOf("3d6+2").rolls()
    );
    t.end();
  }
);

t.test(
  "diceRollOf().roll() is a synonym of diceRollOf().rolls()",
  function (t) {
    const { total: rollsTotal } = randm.diceRollOf("d1+2").rolls();
    const { total: rollTotal } = randm.diceRollOf("d1+2").roll();
    t.equal(rollsTotal, rollTotal);
    t.end();
  }
);

t.test(
  "diceRollOf().rolls() returns an object containing the total and the individual dice rolls with multiple die",
  function (t) {
    randm.next.int.between.returns(1, 2, 3);
    const { total, rolls } = randm.diceRollOf("3d6+2").rolls();
    t.equal(total, 8);
    t.same(rolls, [1, 2, 3]);
    t.end();
  }
);

t.test(
  "diceRollOf().rolls() returns an object containing the total and the individual dice rolls with multiple die and no modifier",
  function (t) {
    randm.next.int.between.returns(2, 3);
    const { total, rolls } = randm.diceRollOf("2d3").rolls();
    t.equal(total, 5);
    t.same(rolls, [2, 3]);
    t.end();
  }
);

t.test(
  "diceRollOf().rolls() returns an object containing the modifier",
  function (t) {
    randm.next.int.between.returns(2, 3);
    const { modifier } = randm.diceRollOf("d6+8").rolls();
    t.equal(modifier, "+8");
    t.end();
  }
);

t.test(
  "diceRollOf().rolls() returns an object containing the unmodified total",
  function (t) {
    randm.next.int.between.returns(3, 4);
    const { unmodifiedTotal, modifier, total } = randm
      .diceRollOf("2d6+1")
      .rolls();
    t.equal(unmodifiedTotal, 7);
    t.equal(modifier, "+1");
    t.equal(total, 8);
    t.end();
  }
);

t.test(
  "randm.next.reset() clears any mocked values from randm.int.between",
  function (t) {
    randm.next.int.between.returns(99);
    randm.next.reset();
    const val = randm.int.between(22, 22);
    t.equal(val, 22);
    t.end();
  }
);

t.test(
  "randm.next.reset() clears any mocked values from randm.diceRoll",
  function (t) {
    randm.next.diceRoll.returns(99);
    randm.next.reset();
    const val = randm.diceRoll("d1");
    t.equal(val, 1);
    t.end();
  }
);

t.test(
  "randm.next.reset() clears multiple mocked values from randm.diceRoll",
  function (t) {
    randm.next.diceRoll.returns(99, 100, 101);
    randm.next.reset();
    const val = randm.diceRoll("d1");
    t.equal(val, 1);
    t.end();
  }
);

t.test("randm.next can be used after a randm.next.reset()", function (t) {
  randm.next.diceRoll.returns(99);
  randm.next.reset();
  randm.next.diceRoll.returns(101);

  const val = randm.diceRoll("d1");
  t.equal(val, 101);
  t.end();
});
