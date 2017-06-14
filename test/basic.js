var randm = require('../randm')
var t = require('tap')

t.test('generates random number', function (t) {
  const rndNum = randm.any();
  console.log('randm.any()', rndNum);
  t.end()
})

t.test('generates random boolean', function (t) {
  const rndBoolean = randm.bool();
  console.log('randm.bool()', rndBoolean);
  t.type(rndBoolean, 'boolean');
  t.end()
})

t.test('generates coin flip', function (t) {
  const coinFlip = randm.coinFlip();
  console.log('randm.coinFlip()', coinFlip);
  t.type(coinFlip, 'string');
  t.matches(coinFlip, /heads|tails/);
  t.end()
})

t.test('generates a chance, which returns true on a one in N basis', function (t) {
  const chance = randm.oneIn(2);
  t.type(chance, 'boolean');
  console.log('randm.oneIn(2)', chance);
  t.end()
})

t.test('randm.oneIn(1) always returns true', function (t) {
  const chance = randm.oneIn(1);
  t.equal(true, chance);
  t.end()
})

t.test('generates dice roll with a 6-sided die given no arguments', function (t) {
  const diceRoll = randm.diceRoll();
  console.log('randm.diceRoll()', diceRoll);
  t.matches(diceRoll, /[1-6]/);
  t.end()
})

t.test('generates dice roll with the passed die size', function (t) {
  const diceRoll = randm.diceRoll('d3');
  console.log('randm.diceRoll("d3")', diceRoll);
  t.matches(diceRoll, /[1-3]/);
  t.end()
})

t.test('generates dice roll with the passed die size', function (t) {
  const diceRoll = randm.diceRoll('d3');
  console.log('randm.diceRoll("d3")', diceRoll);
  t.matches(diceRoll, /[1-3]/);
  t.end()
})

t.test('generates dice roll with the passed die count and size', function (t) {
  const diceRoll = randm.diceRoll('2d1');
  console.log('randm.diceRoll("2d1")', diceRoll);
  t.equal(2, diceRoll);
  t.end()
})

t.test('generates dice roll with the passed multi-digit die count and size', function (t) {
  const diceRoll = randm.diceRoll('33d1');
  console.log('randm.diceRoll("33d1")', diceRoll);
  t.equal(33, diceRoll);
  t.end()
})

t.test('generates dice roll with a positive modifier', function (t) {
  const diceRoll = randm.diceRoll('d1+1');
  console.log('randm.diceRoll("d1+1")', diceRoll);
  t.equal(2, diceRoll);
  t.end()
})

t.test('generates dice roll with a multi-digit positive modifier', function (t) {
  const diceRoll = randm.diceRoll('d1+22');
  console.log('randm.diceRoll("d1+22")', diceRoll);
  t.equal(23, diceRoll);
  t.end()
})

t.test('generates dice roll for d3+2', function (t) {
  const diceRoll = randm.diceRoll('d3+2');
  console.log('randm.diceRoll("d3+2")', diceRoll);
  t.matches(diceRoll, /[3-5]/);
  t.end()
})

t.test('generates dice roll with a negative modifier', function (t) {
  const diceRoll = randm.diceRoll('d1-1');
  console.log('randm.diceRoll("d1-1")', diceRoll);
  t.equal(0, diceRoll);
  t.end()
})

t.test('generates dice roll with the passed 2d3', function (t) {
  const diceRoll = randm.diceRoll('2d3');
  console.log('randm.diceRoll("2d3")', diceRoll);
  t.matches(diceRoll, /[2-6]/);
  t.end()
})

t.test('throws an error with an incorrect die specifier', function (t) {
  t.throws(() => randm.diceRoll('40'));
  t.end()
})

t.test('generates random number between two values', function (t) {
  t.equal(1, randm.between(1, 1));
  t.equal(-99, randm.between(-99, -99));
  t.equal(0, randm.between(0, 0));

  console.log('randm.between(0, 10)', randm.between(0, 10));
  t.end()
})

t.test('generates random int between two values', function (t) {
  t.equal(1, randm.int.between(1, 1));
  t.equal(-99, randm.int.between(-99, -99));
  t.equal(0, randm.int.between(0, 0));

  console.log('randm.int.between(0, 10)', randm.int.between(0, 10));
  t.end()
})

t.test('random ints are integers', function (t) {
  t.ok(Number.isInteger(randm.int.between(1, 100)));
  t.end()
})

t.test('random negative ints are integers', function (t) {
  t.ok(Number.isInteger(randm.int.between(-100, 0)));
  t.end()
})

