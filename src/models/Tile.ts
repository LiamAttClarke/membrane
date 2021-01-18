export default class Tile {
  name = 'Base Tile';

  author = 'No Author';

  authorLink = 'http://example.com';

  gridX: number;

  gridY: number;

  constructor(gridX: number, gridY: number) {
    this.gridX = gridX;
    this.gridY = gridY;
  }

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
  evaluate(s: number, i: number, x: number, y: number, t: number): number {
    return Math.sin(t);
  }
}
