export function getDecimalPlaces(n: number): number {
  const str = n.toString();
  return str.split('.')[1].length;
}
