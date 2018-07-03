var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Test = /** @class */ (function () {
    function Test() {
        this.name = 123;
    }
    Test.prototype.router = function () {
    };
    Object.defineProperty(Test.prototype, "age", {
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    __decorate([
        annotation()
    ], Test.prototype, "router");
    __decorate([
        annotation()
    ], Test.prototype, "name");
    __decorate([
        annotation()
    ], Test.prototype, "age");
    Test = __decorate([
        annotation()
    ], Test);
    return Test;
}());
function annotation() {
    var _this = this;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _this.console.log(args);
    };
}
