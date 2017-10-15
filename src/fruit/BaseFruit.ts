/**
 * 水果基类
 */
class BaseFruit extends egret.DisplayObjectContainer {
    constructor () {
        super();
        this.init();
    }

    public img: egret.Bitmap;
    public img_part1: egret.Bitmap;
    public img_part2: egret.Bitmap;

    // 初始速度、加速度
    public accelerateX: number;
    public accelerateY: number;
    public accelerateRotate: number;
    public speedX: number;
    public speedY: number;
    public speedRotate: number;

    public initRotation: number;
    public rotationIndex: number;

    // 初始时间
    public beginTime;

    // 初始位置
    public initX: number;
    public initY: number;

    // 是否切开标志
    public cutIndex: boolean;
    private init () {
        this.img = new egret.Bitmap();
        this.img_part1 = new egret.Bitmap();
        this.img_part2 = new egret.Bitmap();
        this.addChild(this.img);

        this.accelerateX = 0;
        this.accelerateY = 700;
        this.accelerateRotate = 0;
        this.speedX = (Math.random() - 0.5) * 180;
        this.speedY = -700;
        this.speedRotate = (Math.random() - 0.5) * 360;

        this.x = this.initX = Math.random() * 400 + 180;
        this.y = this.initY = 530;

        this.addEventListener(egret.Event.ENTER_FRAME,this.freeFalling,this);

        this.beginTime = egret.getTimer();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = false;
    }

    public freeFalling (evt: egret.Event) {
        var now = (egret.getTimer() - this.beginTime) / 1000;
        this.x = this.initX + now * this.speedX;
        this.y = this.speedY * now + 0.5 * this.accelerateY * now * now + this.initY;
        this.img.rotation = now * this.speedRotate;
        if (this.y > 530 && !this.cutIndex) {
            this.addFailed();
            this.cutIndex = true;
        }
    }

    public setSize () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.img.anchorOffsetX = this.img.width / 2;
        this.img.anchorOffsetY = this.img.height / 2;
        this.img_part1.anchorOffsetX = this.img.width / 2;
        this.img_part1.anchorOffsetY = this.img.height / 2;
        this.img_part2.anchorOffsetX = this.img.width / 2;
        this.img_part2.anchorOffsetY = this.img.height / 2;
    }

    public cutFruit () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);

        this.cutIndex = true;

        this.splitEffect();

        this.cutEffect();

        this.addScore();
    }

    public splitBitmap: egret.Bitmap;
    private splitEffect () {
        this.splitBitmap = new egret.Bitmap ();
        this.splitBitmap.texture = RES.getRes("flash_png");
        this.splitBitmap.anchorOffsetX = this.splitBitmap.width / 2;
        this.splitBitmap.anchorOffsetY = this.splitBitmap.height / 2;
        this.splitBitmap.x = this.img.x;
        this.splitBitmap.y = this.img.y;
        this.splitBitmap.scaleX = 0.8;
        this.splitBitmap.scaleY = 0.8;
        this.splitBitmap.alpha = 0;
        this.addChild(this.splitBitmap);
        egret.Tween.get(this.splitBitmap).to({alpha: 1}, 100).to({alpha: 0}, 100).call(function () {
            this.removeChild(this.splitBitmap);
            this.splitBitmap = null;
        }, this);
    }

    private cutEffect() {
        this.removeChild(this.img);
        this.addChild(this.img_part1);
        this.addChild(this.img_part2);
        this.addEventListener(egret.Event.ENTER_FRAME,this.cutFreeFalling,this);
    }

    private cutFreeFalling () {
        this.img_part1.x -= 2;
        this.img_part2.x += 2;
        this.img_part1.rotation -= 2;
        this.img_part2.rotation += 2;
    }

    private addScore () {
        Observer.getInstance().fire(Commands.ADD_SCORE);
    }

    public addFailed () {
        var self = this;
        var loseLogo: egret.Bitmap = new egret.Bitmap();
        loseLogo.texture = RES.getRes('lose_png');
        loseLogo.anchorOffsetX = loseLogo.width / 2;
        loseLogo.anchorOffsetY = loseLogo.height / 2;
        loseLogo.scaleX = 0;
        loseLogo.scaleY = 0;
        loseLogo.x = this.x - this.width / 2;
        loseLogo.y = 430;
        this.parent.addChild(loseLogo);
        var tw_loseLogo = egret.Tween.get(loseLogo).to({scaleX: 1.1, scaleY: 1.1}, 600, egret.Ease.backOut).wait(600).call(function(){
            self.parent.removeChild(loseLogo);
        });
        Observer.getInstance().fire(Commands.ADD_FAILED);
    }
}