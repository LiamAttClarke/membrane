export default class Tile {
  gridX: number;

  gridY: number;

  constructor(gridX: number, gridY: number) {
    this.gridX = gridX;
    this.gridY = gridY;
  }

  // eval(x: number, y: number, t: number): number {
  //   return Math.sin(((x + 64) * (y + 64)) + t);
  // }

  // eval(x: number, y: number, t: number): number {
  //   return Math.sin(t + x * y - Math.sqrt((x - 7.5) ** 2 + (y - 7.5) ** 2));
  // }

  eval(x: number, y: number, t: number): number {
    return Math.sin(t - Math.sqrt((x - 7.5) ** 2 + (y - 7.5) ** 2));
  }
}
