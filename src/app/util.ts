/**
 * Helper function for exhaustive type checking. Calling this
 * function indicates to the compiler that a branch of e.g. a
 * switch statement should never be reached.
 */
export function assertUnreachable(x: never, msg: string): never {
  throw new Error(`${msg} ${JSON.stringify(x)}`);
}
