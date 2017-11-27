/**
 *刀痕 
 */

class Scar {
    private static _instance;

    private moveCount: number = 0;     //记录鼠标移动事件触发次数
    private hasThrow: boolean = false; //是否触发挥刀音效

    //上一次mousemove事件是的触摸点位置
    private prePointX: number = -1;
    private prePointY: number = -1;

    private thisObj: egret.DisplayObjectContainer;

    constructor (thisObj) {
        this.thisObj = thisObj;
        thisObj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.addScar, this);
        thisObj.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
    }

    /**
     * 添加刀痕方法
     */
    public addScar (evt: egret.TouchEvent) {
        /**
         * 添加音效
         */
        this.moveCount++;
        if (!this.hasThrow && this.moveCount > 10) {
            var soundThrow: egret.Sound = RES.getRes("throw_mp3");
            var channelThrow = soundThrow.play(0, 1);
            this.hasThrow = true;
        }

        /**
         * 添加刀痕
         */
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
            this.thisObj.addChild(scar);
            var thatObj = this.thisObj; 
            var tw_scar = egret.Tween.get(scar).to({scaleY: 0}, 300).call(function () {
                thatObj.removeChild(scar);
                scar = null;
            });
        }
        this.prePointX = evt.stageX;
        this.prePointY = evt.stageY;
    }

    /**
     * 抬起手之后的处理
     */

    private moveEnd () {
        this.prePointX = -1;
        this.prePointY = -1;
        this.moveCount = 0;
        this.hasThrow = false;
    }


    public static getInstance (thisObj) {
        if (this._instance === undefined) {
            this._instance = new Scar(thisObj);
        }
        return this._instance;
    }

    public static destroyInstance() {
        this._instance = undefined;
    }
}