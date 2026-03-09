// biome-ignore-all lint/complexity/noBannedTypes: biome will be deleted soon

type TypeMap = {
  String: string;
  Number: number;
  Boolean: boolean;
  Array: unknown[];
  Date: Date;
  RegExp: RegExp;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  Function: Function;
  Object: object;
  Null: null;
  Undefined: undefined;
};

const isType =
  <K extends keyof TypeMap>(type: K) =>
  (v: unknown): v is TypeMap[K] =>
    Object.prototype.toString.call(v) === `[object ${type}]`;

export const isFunction = isType("Function");
