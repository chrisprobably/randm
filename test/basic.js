var randm = require('../randm')
var t = require('tap')

t.test('generates random number', function (t) {
  const rndNum = randm.any();
  console.log('rndm.any()', rndNum);
  t.end()
})

t.test('generates random boolean', function (t) {
  const rndBoolean = randm.bool();
  console.log('rndm.bool()', rndBoolean);
  t.type(rndBoolean, 'boolean');
  t.end()
})

t.test('generates coin flip', function (t) {
  const coinFlip = randm.coinFlip();
  console.log('rndm.coinFlip()', coinFlip);
  t.type(coinFlip, 'string');
  t.matches(coinFlip, /heads|tails/);
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

