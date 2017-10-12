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
        _this.prePointX = -1;
        _this.prePointY = -1;
        _this.init();
        return _this;
    }
    GameContainer.prototype.init = function () {
        // var bg: egret.Bitmap = new egret.Bitmap();
        // bg.x = bg.y = 0;
        // bg.width = this.width;
        // bg.height = this.height;
        // bg.alpha = 0;
        // bg.touchEnabled = true;
        // this.addChild(bg);
        //抛水果
        this.timer = new egret.Timer(2100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.popupFruit, this);
        this.timer.start();
        //设置触摸事件
        egret.setTimeout(function () {
            this.parent.touchEnabled = true;
            this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.collideDetection, this);
        }, this, 2100);
    };
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
    GameContainer.prototype.collideDetection = function (evt) {
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