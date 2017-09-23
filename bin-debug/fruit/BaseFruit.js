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
/**
 * 水果基类
 */
var BaseFruit = (function (_super) {
    __extends(BaseFruit, _super);
    function BaseFruit() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BaseFruit.prototype.init = function () {
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
        this.addEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
        this.beginTime = egret.getTimer();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);
        this.cutIndex = false;
    };
    BaseFruit.prototype.freeFalling = function (evt) {
        var now = (egret.getTimer() - this.beginTime) / 1000;
        this.x = this.initX + now * this.speedX;
        this.y = this.speedY * now + 0.5 * this.accelerateY * now * now + this.initY;
        this.rotation = now * this.speedRotate;
        if (this.y > 530 && !this.cutIndex) {
            this.addFailed();
            this.cutIndex = true;
        }
    };
    BaseFruit.prototype.setSize = function () {
        this.width = this.img.width;
        this.height = this.img.height;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    BaseFruit.prototype.cutFruit = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);
        this.cutIndex = true;
        this.splitEffect();
        this.addScore();
    };
    BaseFruit.prototype.splitEffect = function () {
        var splitBitmap = new egret.Bitmap();
        splitBitmap.texture = RES.getRes("flash_png");
        splitBitmap.anchorOffsetX = splitBitmap.width / 2;
        splitBitmap.anchorOffsetY = splitBitmap.height / 2;
        splitBitmap.x = this.x;
        splitBitmap.y = this.y;
        splitBitmap.alpha = 0;
        this.parent.addChild(splitBitmap);
        egret.Tween.get(splitBitmap).to({ alpha: 1 }, 100).to({ alpha: 0 }, 100).call(function () {
            this.parent.removeChild(splitBitmap);
            splitBitmap = null;
        }, this);
    };
    BaseFruit.prototype.addScore = function () {
        Observer.getInstance().fire(Commands.ADD_SCORE);
    };
    BaseFruit.prototype.addFailed = function () {
        Observer.getInstance().fire(Commands.ADD_FAILED);
    };
    return BaseFruit;
}(egret.DisplayObjectContainer));
__reflect(BaseFruit.prototype, "BaseFruit");
//# sourceMappingURL=BaseFruit.js.map