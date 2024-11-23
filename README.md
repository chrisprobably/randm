# 🎲 randm

![release](https://github.com/chrisprobably/randm/workflows/release/badge.svg) [![npm](https://img.shields.io/npm/v/randm)](https://www.npmjs.com/package/randm)

Easy to use JS random generator for generating random numbers, dice rolls, dates etc... Small footprint (<1Kb gzipped) library with Typescript support that can be used in a browser or node environment.

## Installation

```
npm install --save randm
```

or

```
yarn add randm
```

## API

### Core

- `randm.any()` - returns a random float between 0 and 1
- `randm.bool()` - returns true or false
- `randm.between(-10, 10)` - returns a random float between -10 and 10
- `randm.int.between(2, 10)` - returns a random integer between 2 and 10
- `randm.oneIn(10)` - one in 10 chance that this returns true, otherwise it returns false
- `randm.from(['foo', 'bar', 'qux'])` - returns a random value from an array, in this case 'foo', 'bar' or 'qux'
- `randm.happens(2).outOf(5)` - returns true 2 out of 5 times
- `randm.percentageChance(95)` - returns true 95% of the time
- `randm.coinFlip()` - returns `heads` or `tails`
- `randm.dateTime()` - returns a random `Date` with the time between epoch and now
- `randm.date.between(new Date(1997, 0, 1), new Date(2000, 0, 1))` - returns a `Date` between January 1st, 1997 and January 1st 2000.

### Dice

- `randm.diceRoll()` - returns the result of rolling a six-sided die (an integer from 1 to 6)
- `randm.diceRoll('2d3')` - returns the result of two d3's (three-sided dice). (an integer from 2 to 6)
- `randm.diceRoll('2d6+1')` - returns the result of two d6's plus a modifier of 1. (an integer from 3 to 13)
- `randm.diceRollOf('d6').isGreaterThan(4)` - returns true when rolling greater than 4 on a d6 die (in this case 5 or 6 would return true).
- `randm.diceRollOf('d6').isGreaterThanOrEqual(4)` - returns true when rolling greater than or equal to 4 on a d6 die (in this case 4, 5 or 6 would return true).
- `randm.diceRollOf('d6').isLessThan(4)` - returns true when rolling less than 4 on a d6 die (in this case 1, 2 or 3 would return true).
- `randm.diceRollOf('d6').isLessThanOrEqual(4)` - returns true when rolling less than or equal to 4 on a d6 die (in this case 1, 2, 3 or 4 would return true).
- `randm.diceRollOf('d6').beats(4)` - `beats()` is a shortcut to `isGreaterThanOrEqual()`.
- `randm.diceRollOf('3d6+2').rolls()` - returns an object containing the individual dice rolls and the totals.
  - Example: `randm.diceRollOf('3d6+2').rolls()`
    ```js
    {
       rolls: [ 2, 2, 5 ],
       unmodifiedTotal: 9,
       modifier: '+2',
       total: 11
    }
    ```
  - Example: `randm.diceRollOf('d6').rolls()`
    ```js
    {
      rolls: [ 6 ],
      unmodifiedTotal: 6,
      modifier: 0,
      total: 6
    }
    ```
- `randm.diceRollOf('3d6+2').roll()` - `roll()` is a synonym of `rolls()`.
- `randm.scatterDie()` - simulates a six-sided die with four faces showing an arrow, and two faces showing a hit marker. It returns an object containing:
  - `direction` - a direction specified as a float from 0 to 359 degrees
  - `isHit` - true if a hit marker was rolled (2 in 6 chance)
  - Example: `randm.scatterDie()`:
    ```js
    {
      direction: 343.17056492532487,
      isHit: true
    }
    ```
- `randm.artilleryDie()` - simulates a six-sided die with the following possible values: 2, 4, 6, 8, 10, or MISS.
  - `randm.artilleryDie.MISS` can be used for comparison
  - Example: `randm.artilleryDie()`:
    ```js
    const artilleryRoll = randm.artilleryDie();
    if (artilleryRoll === randm.artilleryDie.MISS) {
      // handle miss...
    }
    ```

### Bag

Simulates a dice or token bag, where items are drawn from the bag at random.

- `randm.bag(['Fire', 'Advance', 'Rally', 'Down', 'Ambush', 'Run'])` - simulates a bag containing the specified tokens / dice
  - `bag.pick()` - picks an item at random and removes it from the bag
  - `bag.contents()` - returns a copy of the current contents of the bag (note: modifying the returned array will not affect the underlying bag)
  - `bag.put('Rally')` - adds the item `Rally` to the bag
  - `bag.reset()` - resets the bag to its original state e.g. `['Fire', 'Advance', 'Rally', 'Down', 'Ambush', 'Run']`
  - `bag.isEmpty()` - returns `true` if the bag is empty, otherwise `false`
  - Example:
    ```js
    const bag = randm.bag([
      "Fire",
      "Advance",
      "Rally",
      "Down",
      "Ambush",
      "Run",
    ]);
    const pick = bag.pick(); // picks Advance
    const remainingItems = bag.contents(); // ['Fire', 'Rally', 'Down', 'Ambush', 'Run']
    bag.isEmpty(); // false
    while (!bag.isEmpty()) bag.pick();
    bag.isEmpty(); // true
    bag.put("Fire");
    bag.contents(); // ['Fire']
    bag.reset();
    bag.contents(); // ['Fire', 'Advance', 'Rally', 'Down', 'Ambush', 'Run']
    ```

### Mocking

The randm library supports some limited mocking to make testing easier.

#### Mocking the next return value

Example:

```js
// make the next call return 1
randm.next.int.between.returns(1);
randm.int.between(1, 10); // Will return 1
randm.int.between(1, 10); // No longer mocked - this will return a random number between 1 and 10
```

#### Mocking multiple return values in order

Example:

```js
// make the next three calls return 1, 2 and then 3.
randm.next.int.between.returns(1, 2, 3);
randm.int.between(1, 10); // Will return 1
randm.int.between(1, 10); // Will return 2
randm.int.between(1, 10); // Will return 3
randm.int.between(1, 10); // No longer mocked - this will return a random number between 1 and 10
```

#### Resetting mocked values

Example:

```js
// make the next three calls return 1, 2 and then 3.
randm.next.int.between.returns(1, 2, 3);
randm.int.between(1, 10); // Will return 1
randm.next.reset();
randm.int.between(1, 10); // No longer mocked - this will return a random number between 1 and 10
```

#### Mocking other functions

Most functions support the next syntax except `happens()` and `diceRollOf()` - see further down for how to mock `diceRollOf()`.

Example:

```js
randm.next.diceRoll.returns(4);
randm.next.bool.returns(false);
randm.next.from.returns("qux");
randm.diceRoll(); // Will return 4
randm.bool(); // Will return false
randm.from(["foo", "bar", "qux"]); // Will return 'qux'
```

#### Mocking diceRollOf()

Internally `randm.diceRollOf().rolls()` uses `randm.int.between()` for each roll, so it can be used to mock the rolls.

Example:

```js
// We'll use 3d6, so mock the three dice rolls
randm.next.int.between.returns(1, 2, 3);
randm.diceRollOf("3d6+2").rolls();
// Result:
// {
//   rolls: [ 1, 2, 3 ],
//   unmodifiedTotal: 6,
//   modifier: '+2',
//   total: 8
// }
```

### Typescript support

randm comes bundled with a Typescript declaration file, it should be automatically picked up by your IDE. If not, you can find it at `node_modules/randm/randm.d.ts`.

### Thankyou!

Thanks for using randm.
