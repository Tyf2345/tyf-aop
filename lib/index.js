var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    target[method] = function (..._res) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = _res;
            if (["before", "around"].includes(advice)) {
                args = (yield aspect.apply(target, args)) || args;
            }
            let originReturnValue = yield originValue.apply(target, args);
            if (["after", "around"].includes(advice)) {
                aspect.apply(target, args);
            }
            if (["afterReturning"].includes(advice)) {
                return ((yield aspect.apply(target, [originReturnValue])) || originReturnValue);
            }
            else {
                return originReturnValue;
            }
        });
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
