/**
 * 动画特效
 */
var Effects;
(function (Effects) {
    /**
     * 上下浮动
     * @obj显示对象
     * @dur一次动画时间
     * @loop是否循环
     */
    function floatUpdown(obj, dur, loop) {
        var onComplete_floatUpdown = function () {
            var objY = obj.y;
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut).call(onComplete_floatUpdown, this);
        };
        var objY = obj.y;
        if (loop) {
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut).call(onComplete_floatUpdown, this);
        }
        else {
            egret.Tween.get(obj).to({ y: objY + 10 }, dur / 2, egret.Ease.circIn).to({ y: objY }, dur / 2, egret.Ease.circOut);
        }
    }
    Effects.floatUpdown = floatUpdown;
    /**
     * 旋转
     * @obj显示对象
     * @dur一次动画时间
     * @loop是否循环
     * @direction方向true顺flase逆
     */
    function rotate(obj, dur, loop, direction) {
        var dir = direction ? 1 : -1;
        var onComplete_rotate = function () {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: 360 * dir }, dur).call(onComplete_rotate, this);
        };
        if (loop) {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: 360 * dir }, dur).call(onComplete_rotate, this);
        }
        else {
            obj.rotation = 0;
            egret.Tween.get(obj).to({ rotation: 360 * dir }, dur);
        }
    }
    Effects.rotate = rotate;
})(Effects || (Effects = {}));
//# sourceMappingURL=Effects.js.map