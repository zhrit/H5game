/**
 * 游戏逻辑
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
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        _this.moveCount = 0; //记录鼠标移动事件触发次数
        _this.hasThrow = false; //是否触发挥刀音效
        _this.prePointX = -1;
        _this.prePointY = -1;
        _this.init();
        return _this;
    }
    GameContainer.prototype.init = function () {
        //抛水果
        this.timer = new egret.Timer(2100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit, this);
        this.timer.start();
        //设置触摸事件
        egret.setTimeout(function () {
            this.parent.touchEnabled = true;
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.collideDetection, this);
            this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        }, this, 2100);
    };
    /**
     * 抛水果
     */
    GameContainer.prototype.popupFruit = function () {
        this.fruitNum = Math.ceil(Math.random() * 3);
        this.fruitArray = [];
        var fruitClassName = [ClassName.APPLE, ClassName.BANANA, ClassName.BASAHA, ClassName.PEACH, ClassName.SANDIA, ClassName.BOOM];
        for (var i = 0; i < this.fruitNum; i++) {
            var fruitIns = fruitClassName[Math.floor(Math.random() * 6)]();
            this.fruitArray.push(fruitIns);
            this.addChild(fruitIns);
        }
    };
    GameContainer.prototype.moveEnd = function () {
        this.prePointX = -1;
        this.prePointY = -1;
        this.moveCount = 0;
        this.hasThrow = false;
    };
    /**
     * 碰撞检测并添加刀痕
     * @param evt
     */
    GameContainer.prototype.collideDetection = function (evt) {
        this.moveCount++;
        if (!this.hasThrow && this.moveCount > 10) {
            var soundThrow = RES.getRes("throw_mp3");
            var channelThrow = soundThrow.play(0, 1);
            this.hasThrow = true;
        }
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
            }
            else {
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
            var tw_scar = egret.Tween.get(scar).to({ scaleY: 0 }, 300).call(function () {
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
    };
    GameContainer.prototype.setSplitRotation = function (curX, curY, fruit) {
        if (!fruit.splitBitmap) {
            return;
        }
        if (this.prePointX == -1) {
            fruit.splitBitmap.rotation = 0;
        }
        else if (this.prePointX == curX) {
            fruit.splitBitmap.rotation = 90;
        }
        else {
            fruit.splitBitmap.rotation = Math.atan((curY - this.prePointY) / (curX - this.prePointX)) * 57.3;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation = fruit.initRotation + fruit.splitBitmap.rotation;
        if (fruit.splitBitmap.rotation < 0) {
            fruit.img_part1.rotation = fruit.img_part2.rotation += 180;
        }
        fruit.img_part1.rotation = fruit.img_part2.rotation += 180 * fruit.rotationIndex;
    };
    GameContainer.getInstance = function () {
        if (this._instance === undefined) {
            this._instance = new GameContainer();
        }
        return this._instance;
    };
    GameContainer.destroyInstance = function () {
        this._instance = undefined;
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=gameContainer.js.map