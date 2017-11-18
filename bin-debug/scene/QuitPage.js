/**
 * QUIT界面
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
var FruitQuitPage = (function (_super) {
    __extends(FruitQuitPage, _super);
    function FruitQuitPage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/eui/QuitPage.exml";
        _this.init();
        return _this;
    }
    FruitQuitPage.prototype.init = function () {
        // 添加初始动画
        this.addEffects();
        this.addEvents();
    };
    // 添加初始动画
    FruitQuitPage.prototype.addEffects = function () {
        var duration_quit = 700;
        var tw_quitInfo = egret.Tween.get(this.quitInfo).to({ scaleX: 1, scaleY: 1 }, duration_quit, egret.Ease.backOut);
    };
    FruitQuitPage.prototype.addEvents = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Observer.getInstance().fire(Commands.CLOSE_QUIT);
        }, this);
    };
    FruitQuitPage.getInstance = function () {
        if (this._instance === undefined) {
            this._instance = new FruitQuitPage();
        }
        return this._instance;
    };
    FruitQuitPage.destroyInstance = function () {
        this._instance = undefined;
    };
    return FruitQuitPage;
}(eui.Component));
__reflect(FruitQuitPage.prototype, "FruitQuitPage");
