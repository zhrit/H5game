/**
 * 场景基类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        return _super.call(this) || this;
    }
    BaseScene.getInstance = function () {
        if (this._instance === undefined) {
            this._instance = new BaseScene();
        }
        return this._instance;
    };
    return BaseScene;
}(eui.Component));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map