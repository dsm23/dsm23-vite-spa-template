type TypeMap = {
  String: string;
  Number: number;
  Boolean: boolean;
  Array: unknown[];
  Date: Date;
  RegExp: RegExp;
  // oxlint-disable-next-line ban-types, no-unsafe-function-type
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
