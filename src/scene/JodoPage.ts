/**
 * JODO界面
 */

class FruitJodoPage extends eui.Component {

    private static _instance;
    public constructor () {
        super();
        this.skinName = "resource/eui_skins/eui/JodoPage.exml";
        this.init();
    }

    public jodoInfo;

    private init () {
        // 添加初始动画
        this.addEffects();
        this.addEvents();
    }

    // 添加初始动画
    private addEffects() {
        var duration_jodo = 700;

        var tw_jodoInfo = egret.Tween.get(this.jodoInfo).to({scaleX: 1, scaleY: 1}, duration_jodo, egret.Ease.backOut);
    }

    private addEvents () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        Observer.getInstance().fire(Commands.CLOSE_JODO);
        }, this)
    }

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new FruitJodoPage();
        }
        return this._instance;
    }

    public static destroyInstance() {
        this._instance = undefined;
    }
}