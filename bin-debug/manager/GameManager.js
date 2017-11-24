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
    /**
     * 注册命令
     */
    GameManager.prototype.registObserver = function () {
        Observer.getInstance().regist(Commands.ADD_SCORE, this.addScore, this);
        Observer.getInstance().regist(Commands.ADD_FAILED, this.addFailed, this);
        Observer.getInstance().regist(Commands.GAME_OVER, this.gameOver, this);
    };
    /**
     * 分数加一
     */
    GameManager.prototype.addScore = function () {
        var fruitNewGamePage = FruitNewGamePage.getInstance();
        fruitNewGamePage.scoreCount += 1;
        fruitNewGamePage.gameScore.text = String(fruitNewGamePage.scoreCount);
    };
    /**
     * 失败次数加一
     */
    GameManager.prototype.addFailed = function () {
        var fruitNewGamePage = FruitNewGamePage.getInstance();
        fruitNewGamePage.failedCount += 1;
        if (fruitNewGamePage.failedCount == 1) {
            var tw_gameXF = egret.Tween.get(fruitNewGamePage.gameXF).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.backOut);
        }
        else if (fruitNewGamePage.failedCount == 2) {
            var tw_gameXXF = egret.Tween.get(fruitNewGamePage.gameXXF).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.backOut);
        }
        else if (fruitNewGamePage.failedCount == 3) {
            var tw_gameXXXF = egret.Tween.get(fruitNewGamePage.gameXXXF).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.backOut);
            Observer.getInstance().fire(Commands.GAME_OVER);
        }
    };
    GameManager.prototype.gameOver = function () {
        var gameContainer = GameContainer.getInstance();
        gameContainer.timer.stop();
        this.fruitNewGamePage = FruitNewGamePage.getInstance();
        var tw_gameover = egret.Tween.get(this.fruitNewGamePage.gameover).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500, egret.Ease.backOut);
        this.fruitNewGamePage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quitGamePage, this);
    };
    GameManager.prototype.quitGamePage = function () {
        this.fruitNewGamePage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quitGamePage, this);
        Observer.getInstance().fire(Commands.CLOSE_NEWGAME);
    };
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map