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
    }

    private freeFalling (evt: egret.Event) {
        var now = (egret.getTimer() - this.beginTime) / 1000;
        this.x = this.initX + now * this.speedX;
        this.y = this.speedY * now + 0.5 * this.accelerateY * now * now + this.initY;
        this.rotation = now * this.speedRotate;
    }

    public setSize () {
        this.width = this.img.width;
        this.height = this.img.height;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
}