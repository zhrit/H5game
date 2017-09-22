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
        _this.timer = new egret.Timer(2000, 0);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.popupFruit, _this);
        _this.timer.start();
        return _this;
    }
    GameContainer.prototype.popupFruit = function () {
        var fruitNum = Math.ceil(Math.random() * 3);
        var fruitArray = [];
        var fruitClassName = [ClassName.APPLE, ClassName.BANANA, ClassName.BASAHA, ClassName.PEACH, ClassName.SANDIA, ClassName.BOOM];
        for (var i = 0; i < fruitNum; i++) {
            var fruitIns = fruitClassName[Math.floor(Math.random() * 6)]();
            fruitArray.push(fruitIns);
            this.addChild(fruitIns);
        }
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=gameContainer.js.map