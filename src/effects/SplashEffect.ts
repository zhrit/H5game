/**
 * 切水果时果汁溅射特效
 */

class SplashEffect extends egret.DisplayObjectContainer {

    private splashColor;

    public constructor (splashColor) {
        super();

        this.splashColor = splashColor;
        this.start();
    }

    private start() {
        for (var i = 0; i < 10; i++) {
            var radius = Math.random() * 2 + 4;
            var speed = Math.random() * 300 + 200;
            var dir = Math.random() * 360;
            var splashUnit = new Splash(radius, speed, dir, this.splashColor);
            this.addChild(splashUnit);
        }
    }
}

class Splash extends egret.Shape {

    private speed: number;
    private direction: number;
    private splashColor;
    private radius: number;
    private beginTime;
    private initX;
    private initY;

    public constructor (radius, speed, direction, splashColor) {
        super();
        this.radius = radius;
        this.speed = speed;
        this.direction = direction;
        this.splashColor = splashColor;

        this.init();
        this.initX = this.x;
        this.initY = this.y;

        var tw_splash = egret.Tween.get(this).to({scaleX: 0.5, scaleY: 0.5}, 390).call(function () {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.updateLocation,this);
        });

        this.beginTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME,this.updateLocation,this);
    }

    private init () {
        this.graphics.beginFill(this.splashColor, 1);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }

    private updateLocation () {
        this.x = this.initX + this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.cos(this.direction / 57.3);
        this.y = this.initY - this.speed * (egret.getTimer() - this.beginTime) / 1000 * Math.sin(this.direction / 57.3);
    }
}