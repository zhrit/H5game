/**
 * 水果基类
 */
class BaseFruit extends egret.DisplayObjectContainer {
    constructor () {
        super();
        this.init();
    }

    public img: egret.Bitmap;

    // 初始速度、加速度
    public accelerateX: number;
    public accelerateY: number;
    public accelerateRotate: number;
    public speedX: number;
    public speedY: number;
    public speedRotate: number;

    // 初始时间
    public beginTime;

    // 初始位置
    public initX: number;
    public initY: number;

    // 是否切开标志
    public cutIndex: boolean;
    private init () {
        this.img = new egret.Bitmap();
        this.addChild(this.img);

        this.accelerateX = 0;
        this.accelerateY = 700;
        this.accelerateRotate = 0;
        this.speedX = (Math.random() - 0.5) * 180;
        this.speedY = -700;
        this.speedRotate = (Math.random() - 0.5) * 360;

        this.x = this.initX = Math.random() * 400 + 120;
        this.y = this.initY = 530;

        this.addEventListener(egret.Event.ENTER_FRAME,this.freeFalling,this);

        this.beginTime = egret.getTimer();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = false;
    }

    private freeFalling (evt: egret.Event) {
        var now = (egret.getTimer() - this.beginTime) / 1000;
        this.x = this.initX + now * this.speedX;
        this.y = this.speedY * now + 0.5 * this.accelerateY * now * now + this.initY;
        this.rotation = now * this.speedRotate;
        if (this.y > 530 && !this.cutIndex) {
            this.addFailed();
            this.cutIndex = true;
        }
    }

    public setSize () {
        this.width = this.img.width;
        this.height = this.img.height;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    private cutFruit () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = true;

        this.splitEffect();

        this.addScore();
    }

    private splitEffect () {
        var splitBitmap: egret.Bitmap = new egret.Bitmap ();
        splitBitmap.texture = RES.getRes("flash_png");
        splitBitmap.anchorOffsetX = splitBitmap.width / 2;
        splitBitmap.anchorOffsetY = splitBitmap.height / 2;
        splitBitmap.x = this.x;
        splitBitmap.y = this.y;
        splitBitmap.alpha = 0;
        this.parent.addChild(splitBitmap);
        egret.Tween.get(splitBitmap).to({alpha: 1}, 100).to({alpha: 0}, 100).call(function () {
            this.parent.removeChild(splitBitmap);
            splitBitmap = null;
        }, this);
    }

    private addScore () {
        Observer.getInstance().fire(Commands.ADD_SCORE);
    }

    private addFailed () {
        Observer.getInstance().fire(Commands.ADD_FAILED);
    }
}