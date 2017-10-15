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
 * fruit-boom
 */
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        var _this = _super.call(this) || this;
        _this.img.texture = RES.getRes("boom_png");
        _this.setSize();
        return _this;
    }
    Boom.prototype.addFailed = function () { };
    Boom.prototype.cutFruit = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cutFruit, this);
        this.cutIndex = true;
        var gameContainer = GameContainer.getInstance();
        gameContainer.timer.stop();
        gameContainer.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gameContainer.collideDetection, gameContainer);
        var boomEffect = new BoomEffect(this);
        boomEffect.x = this.x - 33;
        boomEffect.y = this.y - 34;
        GameContainer.getInstance().addChild(boomEffect);
        GameContainer.getInstance().addChild(this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.freeFalling, this);
        // Observer.getInstance().fire(Commands.GAME_OVER);
    };
    return Boom;
}(BaseFruit));
__reflect(Boom.prototype, "Boom");
//# sourceMappingURL=boom.js.map