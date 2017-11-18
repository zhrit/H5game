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
 * 火花特效
 */
var Sparkle = (function (_super) {
    __extends(Sparkle, _super);
    function Sparkle(emission) {
        var _this = _super.call(this) || this;
        _this.emitterX = 60;
        _this.emitterY = 60;
        _this.emission = emission;
        _this.width = _this.emitterX * 2;
        _this.height = _this.emitterY * 2;
        _this.anchorOffsetX = _this.emitterX;
        _this.anchorOffsetY = _this.emitterY;
        _this.start();
        return _this;
    }
    Sparkle.prototype.start = function () {
        this.sparkleTimer = new egret.Timer(this.emission, 0);
        this.sparkleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.sparkleTimer.start();
    };
    Sparkle.prototype.timerFunc = function () {
        // 创建粒子
        this.addChild(this.creatParticle());
        // 粒子运动
        // 删除粒子
    };
    Sparkle.prototype.creatParticle = function () {
        var singleParticle = new eui.Image();
        singleParticle.source = "flash_png";
        singleParticle.width = 25;
        singleParticle.height = 7;
        singleParticle.anchorOffsetX = singleParticle.width / 2;
        singleParticle.anchorOffsetY = singleParticle.height / 2;
        singleParticle.x = this.emitterX;
        singleParticle.y = this.emitterY;
        singleParticle.rotation = Math.random() * 360;
        var theta = singleParticle.rotation / 180 * Math.PI;
        egret.Tween.get(singleParticle).to({
            x: this.emitterX * (Math.cos(theta) + 1),
            y: this.emitterX * (Math.sin(theta) + 1),
            scaleX: 0.2,
            scaleY: 0.2
        }, (Math.random() - 0.5) * 100 + 400).call(function () {
            this.parent.removeChild(this);
        }, singleParticle);
        return singleParticle;
    };
    return Sparkle;
}(eui.Component));
__reflect(Sparkle.prototype, "Sparkle");
