/**
 * JODO界面
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
var FruitJodoPage = (function (_super) {
    __extends(FruitJodoPage, _super);
    function FruitJodoPage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/eui/JodoPage.exml";
        _this.init();
        return _this;
    }
    FruitJodoPage.prototype.init = function () {
        // 添加初始动画
        this.addEffects();
        this.addEvents();
    };
    // 添加初始动画
    FruitJodoPage.prototype.addEffects = function () {
        var duration_jodo = 700;
        var tw_jodoInfo = egret.Tween.get(this.jodoInfo).to({ scaleX: 1, scaleY: 1 }, duration_jodo, egret.Ease.backOut);
    };
    FruitJodoPage.prototype.addEvents = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Observer.getInstance().fire(Commands.CLOSE_JODO);
        }, this);
    };
    FruitJodoPage.getInstance = function () {
        if (this._instance === undefined) {
            this._instance = new FruitJodoPage();
        }
        return this._instance;
    };
    FruitJodoPage.destroyInstance = function () {
        this._instance = undefined;
    };
    return FruitJodoPage;
}(eui.Component));
__reflect(FruitJodoPage.prototype, "FruitJodoPage");
