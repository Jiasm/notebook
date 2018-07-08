"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_compose_1 = __importDefault(require("koa-compose"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
require("./controllers/index");
require("./controllers/detail");
const decorators_1 = require("./decorators");
const routers = [];
// 遍历所有添加了装饰器的Class，并创建对应的Router对象
decorators_1.routerList.forEach(item => {
    let { basename, constrcutor } = item;
    let router = new koa_router_1.default({
        prefix: basename
    });
    decorators_1.controllerList
        .filter(i => i.target === constrcutor.prototype)
        .forEach((controller) => {
        router[controller.type](controller.path, async (ctx, next) => {
            let args = [];
            // 获取当前函数对应的参数获取
            decorators_1.paramList
                .filter((param) => param.target === constrcutor.prototype &&
                param.method === controller.method)
                .map((param) => {
                let { index, key } = param;
                switch (param.position) {
                    case 'body':
                        args[index] = ctx.request.body[key];
                        break;
                    case 'header':
                        args[index] = ctx.headers[key];
                        break;
                    case 'cookie':
                        args[index] = ctx.cookies.get(key);
                        break;
                    case 'query':
                        args[index] = ctx.query[key];
                        break;
                }
            });
            // 获取当前函数对应的参数格式化
            decorators_1.parseList
                .filter((parse) => parse.target === constrcutor.prototype &&
                parse.method === controller.method)
                .map((parse) => {
                let { index } = parse;
                switch (parse.type) {
                    case 'number':
                        args[index] = Number(args[index]);
                        break;
                    case 'string':
                        args[index] = String(args[index]);
                        break;
                    case 'boolean':
                        args[index] = String(args[index]) === 'true';
                        break;
                }
            });
            // 调用实际的函数，处理业务逻辑
            let results = controller.controller(...args);
            ctx.body = results;
        });
    });
    routers.push(router.routes());
});
const app = new koa_1.default();
app.use(koa_bodyparser_1.default());
app.use(koa_compose_1.default(routers));
app.listen(12306, () => console.log('server run as http://127.0.0.1:12306'));
//# sourceMappingURL=index.js.map