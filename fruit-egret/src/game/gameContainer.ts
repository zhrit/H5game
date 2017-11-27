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
        // 抛水果
        this.timer = new egret.Timer(2100,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit, this);
        this.timer.start();
        // 设置触摸事件
        egret.setTimeout(function() {
            this.parent.touchEnabled = true;
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.collideDetection, this);
            this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        }, this, 2100);
    }

    /**
     * 抛水果
     */
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

    /**
     * 碰撞检测并添加刀痕
     * @param evt 
     */
    public collideDetection (evt: egret.TouchEvent) {
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

    /**
     * 设置水果切开时闪光的方向
     */
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