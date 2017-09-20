/**
 *刀痕
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
var Scar = (function (_super) {
    __extends(Scar, _super);
    function Scar() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Scar.prototype.init = function () {
        this.scarImage = new eui.Image();
        this.scarImage.source = "smoke_png";
        this.scarImage.anchorOffsetX = this.scarImage.width / 2;
        this.scarImage.anchorOffsetY = this.scarImage.height / 2;
        this.addChild(this.scarImage);
    };
    return Scar;
}(eui.Component));
__reflect(Scar.prototype, "Scar");
//# sourceMappingURL=Scar.js.map