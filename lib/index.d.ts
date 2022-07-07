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

/**
 *
 * @param target 目标对象
 *  * 要监听那个对象或者实例化对象
 * @param aspect 切面
 *  * 自定义处理函数
 *  * 可以是一个promise
 *  * 允许有返回值
 *  * 根据通知类型不同，返回值格式也不同
 *    * after 返回数组 即(arguments)
 *    * 返回值将自动注入到原始方法中
 * @param advice 通知类型
 *  * after 执行前通知（允许返回值 值为 数组类型）
 *  * around 环绕通知
 *  * before 执行后通知
 *  * afterReturning 执行后返回前通知 （允许返回值 值为 自定义类型）
 * @param pointCut 切入点
 *  * methods 监听 target 所有方法
 *  * method 监听单个方法，需要在 method中自定义方法名
 * @param method 自定义方法
 *  * pointCut 为 method 时 需要传入
 */
export default function inject<T extends Function | { [K in keyof T]: T[K] }>(
  target: T,
  aspect: Function,
  advice: AdviceType,
  pointCut: PointCutType,
  // @ts-ignore
  method?: keyof T | keyof T["prototype"]
): void;
