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
 * 爆炸发光特效
 */
var BoomEffect = (function (_super) {
    __extends(BoomEffect, _super);
    function BoomEffect(fruitObj) {
        var _this = _super.call(this) || this;
        _this.lightNum = 8; //光线数量
        _this.lightRotation = []; //光线的角度
        _this.lightRotationOrder = []; //光线出现的顺序
        _this.index = 0;
        _this.lightArray = [];
        _this.fruitObj = fruitObj;
        _this.init();
        _this.getLightRotation();
        _this.getOrder();
        _this.addBoomSound();
        _this.addLight();
        _this.addWhiteBg();
        return _this;
    }
    /**
     * 初始化
     */
    BoomEffect.prototype.init = function () {
        this.width = 1280;
        this.height = 960;
        this.anchorOffsetX = 640;
        this.anchorOffsetY = 480;
    };
    /**
     * 随机获取爆炸光线的角度
     */
    BoomEffect.prototype.getLightRotation = function () {
        var lightGap = 360 / this.lightNum;
        for (var i = 0; i < this.lightNum; i++) {
            this.lightRotation.push(Math.random() * lightGap * 0.5 + lightGap * 0.25 + lightGap * i);
        }
    };
    /**
     * 添加爆炸音效
     */
    BoomEffect.prototype.addBoomSound = function () {
        var soundBoom = RES.getRes("boom_mp3");
        var channelBoom = soundBoom.play(0, 1);
    };
    /**
     * 随机设置爆炸光线出现的先后顺序
     */
    BoomEffect.prototype.getOrder = function () {
        var lightRotationCopy = [];
        for (var i = 0; i < this.lightNum; i++) {
            lightRotationCopy.push(this.lightRotation[i]);
        }
        for (var i = 8; i > 0; i--) {
            var order = Math.floor(Math.random() * i);
            this.lightRotationOrder.push(lightRotationCopy[order]);
            lightRotationCopy.splice(order, 1);
        }
    };
    /**
     * 将爆炸光线添加到舞台
     */
    BoomEffect.prototype.addLight = function () {
        if (this.timer) {
            egret.clearTimeout(this.timer);
        }
        if (this.index < this.lightNum) {
            var boomLight = this.createLight();
            boomLight.rotation = this.lightRotationOrder[this.index++];
            this.lightArray.push(boomLight);
            this.addChild(boomLight);
            this.timer = egret.setTimeout(this.addLight, this, 200);
        }
    };
    /**
     * 用shape画梯形模拟爆炸光线
     */
    BoomEffect.prototype.createLight = function () {
        var boomLight = new egret.Shape();
        boomLight.graphics.beginFill(0xffffe9, 1);
        boomLight.graphics.moveTo(0, 17);
        boomLight.graphics.lineTo(640, 0);
        boomLight.graphics.lineTo(640, 40);
        boomLight.graphics.lineTo(0, 23);
        boomLight.graphics.endFill();
        boomLight.anchorOffsetX = 0;
        boomLight.anchorOffsetY = 20;
        boomLight.x = 640;
        boomLight.y = 480;
        return boomLight;
    };
    /**
     * 爆炸光线出现完毕后的闪光效果（屏幕全白闪一下）
     */
    BoomEffect.prototype.addWhiteBg = function () {
        var whiteBg = new egret.Shape();
        whiteBg.graphics.beginFill(0xffffff, 1);
        whiteBg.graphics.drawRect(0, 0, 640, 480);
        whiteBg.graphics.endFill();
        egret.setTimeout(function () {
            this.stage.addChild(whiteBg);
            var tw_whiteBg = egret.Tween.get(whiteBg).to({ alpha: 0 }, 3000).call(function () {
                this.stage.removeChild(whiteBg);
                Observer.getInstance().fire(Commands.GAME_OVER);
            });
            for (var i = 0; i < this.lightNum; i++) {
                this.removeChild(this.lightArray[i]);
            }
            GameContainer.getInstance().removeChild(this.fruitObj);
        }, this, (this.lightNum) * 200);
    };
    return BoomEffect;
}(egret.DisplayObjectContainer));
__reflect(BoomEffect.prototype, "BoomEffect");
//# sourceMappingURL=BoomEffect.js.map