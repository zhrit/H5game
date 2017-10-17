/**
 * 游戏逻辑
 */

class GameContainer extends egret.DisplayObjectContainer {

    private static _instance;
    private timer: egret.Timer;
    private fruitNum: number;
    private fruitArray;

    constructor () {
        super();
        this.init();
    }

    private init() {
        // var bg: egret.Bitmap = new egret.Bitmap();
        // bg.x = bg.y = 0;
        // bg.width = this.width;
        // bg.height = this.height;
        // bg.alpha = 0;
        // bg.touchEnabled = true;
        // this.addChild(bg);
        //抛水果
        this.timer = new egret.Timer(2100,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit, this);
        this.timer.start();
        //设置触摸事件
        egret.setTimeout(function() {
            this.parent.touchEnabled = true;
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.collideDetection, this);
            this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        }, this, 2100);
    }

    private popupFruit () {
        this.fruitNum = Math.ceil(Math.random() * 3);
        this.fruitArray = [];
        var fruitClassName = [ClassName.APPLE, ClassName.BANANA, ClassName.BASAHA, ClassName.PEACH, ClassName.SANDIA, ClassName.BOOM];
        for (var i = 0; i < this.fruitNum; i++) {
            var fruitIns = fruitClassName[Math.floor(Math.random() * 6)]();
            this.fruitArray.push(fruitIns);
            this.addChild(fruitIns);
        }
    }

    private prePointX: number = -1;
    private prePointY: number = -1;

    private moveEnd () {
        this.prePointX = -1;
        this.prePointY = -1;
    }
    public collideDetection (evt: egret.TouchEvent) {
        //刀痕
        if (this.prePointX > 0 && this.prePointY > 0) {
            var len = Math.floor(Math.sqrt((this.prePointY - evt.stageY) * (this.prePointY - evt.stageY) + (this.prePointX - evt.stageX) * (this.prePointX - evt.stageX)));
            var theta = Math.atan((evt.stageY - this.prePointY) / (evt.stageX - this.prePointX)) * 57.3;
            if (this.prePointX > evt.stageX) {
                var scar = new egret.Shape();
                scar.graphics.lineStyle(8, 0xdddec5);
                scar.graphics.moveTo(0, 0);
                scar.graphics.lineTo(len, 0);
                scar.graphics.endFill();
            } else {
                var scar = new egret.Shape();
                scar.graphics.lineStyle(9, 0xdddec5);
                scar.graphics.moveTo(0, 0);
                scar.graphics.lineTo(-len, 0);
                scar.graphics.endFill();
            }
            scar.x = evt.stageX;
            scar.y = evt.stageY;
            scar.anchorOffsetX = 4.5;
            scar.rotation = theta;
            this.parent.addChild(scar);
            var tw_scar = egret.Tween.get(scar).to({scaleY: 0}, 300).call(function () {
                this.parent.removeChild(scar);
                scar = null;
            });
        }
        for (var i = 0; i < this.fruitNum; i++) {
            if (!this.fruitArray[i].cutIndex) {
                var isCollid = this.fruitArray[i].hitTestPoint(evt.stageX, evt.stageY, true);
                if (isCollid) {
                    this.fruitArray[i].cutFruit();
                    this.setSplitRotation(evt.stageX, evt.stageY, this.fruitArray[i]);
                }
            }
        }
        this.prePointX = evt.stageX;
        this.prePointY = evt.stageY;
    }

    private setSplitRotation(curX, curY, fruit) {
        if (!fruit.splitBitmap) {
            return;
        }
        if (this.prePointX == -1) {
            fruit.splitBitmap.rotation = 0;
        } else if (this.prePointX == curX) {
            fruit.splitBitmap.rotation = 90;
        } else {
            fruit.splitBitmap.rotation = Math.atan((curY - this.prePointY) / (curX - this.prePointX)) * 57.3;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation = fruit.initRotation + fruit.splitBitmap.rotation;
        if ( fruit.splitBitmap.rotation < 0) {
            fruit.img_part1.rotation = fruit.img_part2.rotation += 180;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation += 180 * fruit.rotationIndex;
    }

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new GameContainer();
        }
        return this._instance;
    }

    public static destroyInstance() {
        this._instance = undefined;
    }
}