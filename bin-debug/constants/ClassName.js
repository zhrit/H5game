/**
 * 类名常量
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClassName = (function () {
    function ClassName() {
    }
    // 水果类名
    ClassName.APPLE = function () { return new Apple(); };
    ClassName.BANANA = function () { return new Banana(); };
    ClassName.BASAHA = function () { return new Basaha(); };
    ClassName.PEACH = function () { return new Peach(); };
    ClassName.SANDIA = function () { return new Sandia(); };
    ClassName.BOOM = function () { return new Boom(); };
    return ClassName;
}());
__reflect(ClassName.prototype, "ClassName");
//# sourceMappingURL=ClassName.js.map