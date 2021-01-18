import Tile from '../src/models/Tile';

// Math Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
const {
  abs,    // abs(x)    - Returns the absolute value of x.
  ceil,   // ceil(x)   - Returns the smallest integer greater than or equal to x.
  floor,  // floor(x)  - Returns the largest integer less than or equal to x.
  min,    // min(a, b) - Returns the smallest of zero or more numbers.
  max,    // max(a, b) - Returns the largest of zero or more numbers.
  pow,    // pow(b, e) - Returns base b to the exponent power e (that is, b^e).
  random, // random()  - Returns a random number between 0 and 1.
  round,  // round(x)  - Returns the value of the number x rounded to the nearest integer.
  sign,   // sign(x)   - Returns the sign of the x, indicating whether x is positive, negative, or zero.
  sin,    // sin(x)    - Returns the sine of x.
  cos,    // cos(x)    - Returns the cosine of x.
  sqrt,   // sqrt(x)   - Returns the positive square root of x.
} = Math;

export default class CustomTile extends Tile {

  // Name of the your tile
  name = 'Example Tile';

  // Your full name or screen name
  author = 'Your Name';

  // Optional link to your site.
  // Set to '' to skip sharing a link.
  authorLink = 'http://example.com';

  /**
   * Function that returns a value for each cell within a tile.
   * @param {number} s Number of cells wide/tall.
   * @param {number} i Index of the cell within the tile.
   *                   Increases by one from left-to-right and top-to-bottom.
   * @param {number} x X coordinate of the cell from the top-left corner of the tile
   * @param {number} y Y coordinate of the cell from the top-left corner of the tile
   * @param {number} t Time in seconds. Use this value to create animations.
   * @returns {number} A value between -1 and 1. Values will be clamped within this range.
   */
  evaluate(s, i, x, y, t) {
    return sin(t + x * y - sqrt(pow((x - 7.5), 2) + pow((y - 7.5), 2)));
  }

}
