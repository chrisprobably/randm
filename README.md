# randm
![release](https://github.com/chrisprobably/randm/workflows/release/badge.svg) [![npm](https://img.shields.io/npm/v/randm)](https://www.npmjs.com/package/randm)

Simple random number generator for JS / Node.

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

 * `randm.any()` - returns a random float between 0 and 1
 * `randm.bool()` - returns true or false
 * `randm.between(-10, 10)` - returns a random float between -10 and 10
 * `randm.int.between(2, 10)` - returns a random integer between 2 and 10
 * `randm.oneIn(10)` - one in 10 chance that this returns true, otherwise it returns false
 * `randm.from(['foo', 'bar', 'qux'])` - returns a random value from an array, in this case 'foo', 'bar' or 'qux'
 * `randm.happens(2).outOf(5)` - returns true 2 out of 5 times
 * `randm.percentageChance(95)` - returns true 95% of the time
 * `randm.coinFlip()` - returns `heads` or `tails`

### Dice

 * `randm.diceRoll()` - returns the result of rolling a six-sided die (an integer from 1 to 6)
 * `randm.diceRoll('2d3')` - returns the result of two d3's (three-sided dice). (an integer from 2 to 6)
 * `randm.diceRoll('2d6+1')` - returns the result of two d6's plus a modifier of 1. (an integer from 3 to 13)
 * `randm.diceRollOf('d6').isGreaterThan(4)` - returns true when rolling greater than 4 on a d6 die (in this case 5 or 6 would return true).  
 * `randm.diceRollOf('d6').isGreaterThanOrEqual(4)` - returns true when rolling greater than or equal to 4 on a d6 die (in this case 4, 5 or 6 would return true).  
 * `randm.diceRollOf('d6').isLessThan(4)` - returns true when rolling less than 4 on a d6 die (in this case 1, 2 or 3 would return true).  
 * `randm.diceRollOf('d6').isLessThanOrEqual(4)` - returns true when rolling less than or equal to 4 on a d6 die (in this case 1, 2, 3 or 4 would return true).  
 * `randm.diceRollOf('d6').beats(4)` - `beats()` is a shortcut to `isGreaterThanOrEqual()`.  
 * `randm.diceRollOf('3d6+2').rolls()` - returns an object containing the individual dice rolls and the totals. 
   * Example: `randm.diceRollOf('3d6+2').rolls()`
     ```js
     { 
        rolls: [ 2, 2, 5 ], 
        unmodifiedTotal: 9, 
        modifier: '+2', 
        total: 11 
     }
     ```     
   * Example: `randm.diceRollOf('d6').rolls()`
     ```js
     { 
       rolls: [ 6 ], 
       unmodifiedTotal: 6, 
       modifier: 0, 
       total: 6 
     }
     ```
 * `randm.diceRollOf('3d6+2').roll()` - `roll()` is a synonym of `rolls()`. 
     
 
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
randm.next.from.returns('qux');
randm.diceRoll(); // Will return 4
randm.bool(); // Will return false
randm.from(['foo','bar', 'qux']); // Will return 'qux'
```

#### Mocking diceRollOf()

Internally `randm.diceRollOf().rolls()` uses `randm.int.between()` for each roll, so it can be used to mock the rolls.

Example:

```js
// We'll use 3d6, so mock the three dice rolls
randm.next.int.between.returns(1, 2, 3);
randm.diceRollOf('3d6+2').rolls();
// Result:
// { 
//   rolls: [ 1, 2, 3 ], 
//   unmodifiedTotal: 6, 
//   modifier: '+2', 
//   total: 8 
// }
```



