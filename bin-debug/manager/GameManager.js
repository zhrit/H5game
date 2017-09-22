/**
 * 游戏管理类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
        this.registObserver();
    }
    GameManager.prototype.registObserver = function () {
        Observer.getInstance().regist(Commands.ADD_SCORE, this.addScore, this);
        Observer.getInstance().regist(Commands.ADD_FAILED, this.addFailed, this);
        Observer.getInstance().regist(Commands.GAME_OVER, this.gameOver, this);
    };
    GameManager.prototype.addScore = function () {
        var fruitNewGamePage = FruitNewGamePage.getInstance();
        fruitNewGamePage.scoreCount += 1;
        fruitNewGamePage.gameScore.text = String(fruitNewGamePage.scoreCount);
    };
    GameManager.prototype.addFailed = function () { };
    GameManager.prototype.gameOver = function () { };
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map