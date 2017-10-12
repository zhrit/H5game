/**
 * fruit-boom
 */
class Boom extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("boom_png");

        this.setSize();
    }

    public addFailed () {}

    public cutFruit () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = true;

        var gameContainer = GameContainer.getInstance();
        gameContainer.timer.stop();
        gameContainer.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gameContainer.collideDetection, gameContainer);

        this.removeEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
        Observer.getInstance().fire(Commands.GAME_OVER);
    }
}