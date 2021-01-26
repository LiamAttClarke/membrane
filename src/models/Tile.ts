/* eslint-disable no-new-func */
import { FUNCTION_HELPERS } from '../constants';

const TILE_PARAMS = ['s', 'i', 'x', 'y', 't'];

export default class Tile {
  name = 'Base Tile';

  author = 'No Author';

  authorLink = 'http://example.com';

  gridX: number;

  gridY: number;

  private fnBody!: string;

  private fn!: Function;

  constructor(gridX: number, gridY: number, functionBody: string) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.functionBody = functionBody;
  }

  get functionBody() {
    return this.fnBody;
  }

  set functionBody(body: string) {
    this.fnBody = body;
    this.fn = new Function(
      ...TILE_PARAMS,
      ...Object.keys(FUNCTION_HELPERS),
      `return ${body}`,
    );
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
    const helperParams = Object.values(FUNCTION_HELPERS);
    return this.fn(s, i, x, y, t, ...helperParams);
  }
}
