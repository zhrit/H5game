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
 * fruit-banana
 */
var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana() {
        var _this = _super.call(this) || this;
        _this.img.texture = RES.getRes("banana_png");
        _this.img_part1.texture = RES.getRes("banana-2_png");
        _this.img_part2.texture = RES.getRes("banana-1_png");
        _this.initRotation = 90;
        _this.rotationIndex = 1;
        _this.splashColor = null;
        _this.setSize();
        return _this;
    }
    return Banana;
}(BaseFruit));
__reflect(Banana.prototype, "Banana");
//# sourceMappingURL=banana.js.map