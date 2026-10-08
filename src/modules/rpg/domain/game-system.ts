export enum GameSystem {
  CALL_OF_CTHULHU = 'CALL_OF_CTHULHU',
}

export function isGameSystem(value: unknown): value is GameSystem {
  return Object.values<unknown>(GameSystem).includes(value);
}
