/**
 * 游戏管理类
 */

class GameManager {
    constructor () {
        this.registObserver();
    }

    private registObserver () {
        Observer.getInstance().regist(Commands.ADD_SCORE, this.addScore, this);
        Observer.getInstance().regist(Commands.ADD_FAILED, this.addFailed, this);
        Observer.getInstance().regist(Commands.GAME_OVER, this.gameOver, this);
    }

    private addScore () {
        var fruitNewGamePage = FruitNewGamePage.getInstance();
        fruitNewGamePage.scoreCount += 1;
        fruitNewGamePage.gameScore.text = String(fruitNewGamePage.scoreCount);
    }
    private addFailed () {}
    private gameOver () {}
}