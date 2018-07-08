"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 首先，我们要创建几个用来存储信息的全局List
exports.routerList = [];
exports.controllerList = [];
exports.parseList = [];
exports.paramList = [];
// 虽说我们要有一个能够创建Router实例的装饰器
// 但是并不会直接去创建，而是在装饰器执行的时候进行一次注册
function Router(basename = '') {
    return (constrcutor) => {
        exports.routerList.push({
            constrcutor,
            basename
        });
    };
}
exports.Router = Router;
// 然后我们在创建对应的Get Post请求监听的装饰器
// 同样的，我们并不打算去修改他的任何属性，只是为了获取函数的引用
function Method(type) {
    return (path) => (target, name, descriptor) => {
        exports.controllerList.push({
            target,
            type,
            path,
            method: name,
            controller: descriptor.value
        });
    };
}
exports.Method = Method;
// 接下来我们还需要用来格式化参数的装饰器
function Parse(type) {
    return (target, name, index) => {
        exports.parseList.push({
            target,
            type,
            method: name,
            index
        });
    };
}
exports.Parse = Parse;
// 以及最后我们要处理的各种参数的获取
function Param(position) {
    return (key) => (target, name, index) => {
        exports.paramList.push({
            target,
            key,
            position,
            method: name,
            index
        });
    };
}
exports.Param = Param;
exports.Body = Param('body');
exports.Header = Param('header');
exports.Cookie = Param('cookie');
exports.Query = Param('query');
exports.Get = Method('get');
exports.Post = Method('post');
//# sourceMappingURL=decorators.js.map