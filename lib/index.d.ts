type AdviceType = "before" | "after" | "around" | "afterReturning";
type PointCutType = "methods" | "method";
type MethodType = "get" | "post" | "put" | "delete";

export function getMethods<T>(obj: T): string[];

export function replaceMethod<
  T extends Function["prototype"] | { [K in keyof T]: T[K] }
>(
  target: T,
  // @ts-ignore
  method: keyof T | keyof T["prototype"],
  aspect: Function,
  advice: AdviceType
): void | unknown;
export default function inject<T extends Function | { [K in keyof T]: T[K] }>(
  target: T,
  aspect: Function,
  advice: AdviceType,
  pointCut: PointCutType,
  // @ts-ignore
  method?: keyof T | keyof T["prototype"]
): void;
