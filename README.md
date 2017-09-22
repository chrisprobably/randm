Simple random number generator for JS / Node.

## API

### Core

 * `randm.any()` - returns a random float between 0 and 1
 * `randm.bool()` - returns true or false
 * `randm.between(-10, 10)` - returns a random float between -10 and 10
 * `randm.int.between(2, 10)` - returns a random integer between 2 and 10
 * `randm.oneIn(10)` - one in 10 chance that this returns true, otherwise it returns false
 * `randm.from(['foo', 'bar', 'qux'])` - returns a random value from an array, in this case 'foo', 'bar' or 'qux'
 * `randm.happens(2).outOf(5)` - returns a true 2 out of 5 times
 * `randm.percentageChance(95)` - returns true 95% of the time


### Misc

 * `randm.coinFlip()` - returns `heads` or `tails`
 * `randm.diceRoll()` - returns the result of rolling a six-sided die (an integer from 1 to 6)
 * `randm.diceRoll('2d3')` - returns the result of two d3's (three-sided dice). (an integer from 2 to 6)
 * `randm.diceRoll('2d6+1')` - returns the result of two d6's plus a modifier of 1. (an integer from 3 to 13)
 