/**
 * 游戏逻辑
 */

class GameContainer extends egret.DisplayObjectContainer {

    private static _instance;
    private timer: egret.Timer;

    constructor () {
        super();
        this.timer = new egret.Timer(2100,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit,this);
        this.timer.start();
    }

    private popupFruit () {
        var fruitNum = Math.ceil(Math.random() * 3);
        var fruitArray = [];
        var fruitClassName = [ClassName.APPLE, ClassName.BANANA, ClassName.BASAHA, ClassName.PEACH, ClassName.SANDIA, ClassName.BOOM];
        for (var i = 0; i < fruitNum; i++) {
            var fruitIns = fruitClassName[Math.floor(Math.random() * 6)]();
            fruitArray.push(fruitIns);
            this.addChild(fruitIns);
        }
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