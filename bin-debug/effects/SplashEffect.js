/**
 * 切水果时果汁溅射特效
 */
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
var SplashEffect = (function (_super) {
    __extends(SplashEffect, _super);
    function SplashEffect(splashColor) {
        var _this = _super.call(this) || this;
        _this.splashColor = splashColor;
        _this.start();
        return _this;
    }
    SplashEffect.prototype.start = function () {
        for (var i = 0; i < 10; i++) {
            var radius = Math.random() * 2 + 4;
            var speed = Math.random() * 300 + 200;
            var dir = Math.random() * 360;
            var splashUnit = new Splash(radius, speed, dir, this.splashColor);
            this.addChild(splashUnit);
        }
    };
    return SplashEffect;
}(egret.DisplayObjectContainer));
__reflect(SplashEffect.prototype, "SplashEffect");
var Splash = (function (_super) {
    __extends(Splash, _super);
    function Splash(radius, speed, direction, splashColor) {
        var _this = _super.call(this) || this;
        _this.radius = radius;
        _this.speed = speed;
        _this.direction = direction;
        _this.splashColor = splashColor;
        _this.init();
        _this.initX = _this.x;
        _this.initY = _this.y;
        var tw_splash = egret.Tween.get(_this).to({ scaleX: 0.5, scaleY: 0.5 }, 390).call(function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.updateLocation, this);
        });
        _this.beginTime = egret.getTimer();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.updateLocation, _this);
        return _this;
    }
    Splash.prototype.init = function () {
        this.graphics.beginFill(this.splashColor, 1);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    };
    Splash.prototype.updateLocation = function () {
        this.x = this.initX + this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.cos(this.direction / 57.3);
        this.y = this.initY - this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.sin(this.direction / 57.3);
    };
    return Splash;
}(egret.Shape));
__reflect(Splash.prototype, "Splash");
