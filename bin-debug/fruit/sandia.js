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
 * fruit-sandia
 */
var Sandia = (function (_super) {
    __extends(Sandia, _super);
    function Sandia() {
        var _this = _super.call(this) || this;
        _this.img.texture = RES.getRes("sandia_png");
        _this.img_part1.texture = RES.getRes("sandia-1_png");
        _this.img_part2.texture = RES.getRes("sandia-2_png");
        _this.initRotation = 85;
        _this.rotationIndex = 1;
        _this.setSize();
        return _this;
    }
    return Sandia;
}(BaseFruit));
__reflect(Sandia.prototype, "Sandia");
//# sourceMappingURL=sandia.js.map