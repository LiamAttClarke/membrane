export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(min, n), max);
}

export function roundToNearest(x: number, increment = 1): number {
  return Math.round(x / increment) * increment;
}
