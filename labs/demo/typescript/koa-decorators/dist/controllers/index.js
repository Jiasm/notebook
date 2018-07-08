"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
let default_1 = class default_1 {
    index(id) {
        return {
            code: 200,
            id,
            type: typeof id
        };
    }
    about(id) {
        return {
            code: 200,
            id,
            type: typeof id
        };
    }
};
__decorate([
    decorators_1.Get('/'),
    __param(0, decorators_1.Parse('number')), __param(0, decorators_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "index", null);
__decorate([
    decorators_1.Get('/about'),
    __param(0, decorators_1.Parse('string')), __param(0, decorators_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "about", null);
default_1 = __decorate([
    decorators_1.Router('')
], default_1);
exports.default = default_1;
//# sourceMappingURL=index.js.map