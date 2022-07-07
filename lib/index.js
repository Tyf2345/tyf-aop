function getMethods(obj) {
    const keys = Object.keys(obj);
    return ((
    // @ts-ignore
    keys.some(item => typeof obj[item] === "function")
        ? keys
        : Object.getOwnPropertyNames(Object.getPrototypeOf(obj))).filter(
    // @ts-ignore
    (item) => typeof obj[item] === "function"));
}
function replaceMethod(target, 
// @ts-ignore
method, aspect, advice) {
    // @ts-ignore
    const originValue = target[method];
    // @ts-ignore
    target[method] = async function (..._res) {
        let args = _res;
        if (["before", "around"].includes(advice)) {
            args = (await aspect.apply(target, args)) || args;
        }
        let originReturnValue = await originValue.apply(target, args);
        if (["after", "around"].includes(advice)) {
            aspect.apply(target, args);
        }
        if (["afterReturning"].includes(advice)) {
            return ((await aspect.apply(target, [originReturnValue])) || originReturnValue);
        }
        else {
            return originReturnValue;
        }
    };
}
function inject(target, aspect, advice, pointCut, 
// @ts-ignore
method) {
    if (typeof target === "object") {
        if (!(target instanceof Function) && !(target instanceof Array)) {
            if (pointCut === "method") {
                if (method) {
                    replaceMethod(target, method, aspect, advice);
                }
                else {
                    throw new Error("方法不能为空");
                }
            }
            else {
                const methods = getMethods(target);
                methods.forEach((method) => {
                    replaceMethod(target, method, aspect, advice);
                });
            }
        }
        else {
            throw new Error("参数 target 必须为 对象 或者 实例化对象，当前类型为" +
                Array.isArray(target)
                ? "数组"
                : "函数");
        }
    }
    else {
        throw new Error("参数 target 必须为 对象 或者 实例化对象，当前类型为" + typeof target);
    }
}
export default inject;
