/**
 * 游戏界面
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
var FruitNewGamePage = (function (_super) {
    __extends(FruitNewGamePage, _super);
    function FruitNewGamePage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/eui/NewGamePage.exml";
        _this.init();
        return _this;
    }
    FruitNewGamePage.prototype.init = function () {
        // 添加初始动画
        this.addEffects();
        // 初始化数据
        this.scoreCount = this.failedCount = 0;
        // 添加游戏容器
        this.gameContainer = new GameContainer();
        this.gameContainer.width = this.width;
        this.gameContainer.height = this.height;
        this.addChild(this.gameContainer);
        // 启动游戏管理器
        this.gameManeger = new GameManager();
    };
    // 添加初始动画
    FruitNewGamePage.prototype.addEffects = function () {
        var duration_game = 700;
        var tw_gameX = egret.Tween.get(this.gameX).to({ x: 545 }, duration_game, egret.Ease.backOut);
        var tw_gameXX = egret.Tween.get(this.gameXX).to({ x: 570 }, duration_game, egret.Ease.backOut);
        var tw_gameXXX = egret.Tween.get(this.gameXXX).to({ x: 600 }, duration_game, egret.Ease.backOut);
        var tw_gameScoreIcon = egret.Tween.get(this.gameScoreIcon).to({ x: 11 }, duration_game, egret.Ease.backOut);
        var tw_gameScore = egret.Tween.get(this.gameScore).to({ x: 58 }, duration_game, egret.Ease.backOut);
        var tw_gameBestScore = egret.Tween.get(this.gameBestScore).to({ x: 9 }, duration_game, egret.Ease.backOut);
    };
    FruitNewGamePage.getInstance = function () {
        if (this._instance === undefined) {
            this._instance = new FruitNewGamePage();
        }
        return this._instance;
    };
    FruitNewGamePage.destroyInstance = function () {
        this._instance = undefined;
    };
    return FruitNewGamePage;
}(eui.Component));
__reflect(FruitNewGamePage.prototype, "FruitNewGamePage");
//# sourceMappingURL=NewGamePage.js.map