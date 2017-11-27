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

    /**
     * 重写切开后的动作
     */
    public cutFruit () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = true;

        var gameContainer = GameContainer.getInstance();
        gameContainer.timer.stop();
        gameContainer.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gameContainer.collideDetection, gameContainer);

        var boomEffect = new BoomEffect(this);
        boomEffect.x = this.x - 33;
        boomEffect.y = this.y - 34;
        GameContainer.getInstance().addChild(boomEffect);
        GameContainer.getInstance().addChild(this);
        
        this.removeEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
    }
}