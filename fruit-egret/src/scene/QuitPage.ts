/**
 * QUIT界面
 */

class FruitQuitPage extends eui.Component {

    private static _instance;
    public constructor () {
        super();
        this.skinName = "resource/eui_skins/eui/QuitPage.exml";
        this.init();
    }

    public quitInfo;

    private init () {
        // 添加初始动画
        this.addEffects();
        this.addEvents();
    }

    // 添加初始动画
    private addEffects() {
        var duration_quit = 700;

        var tw_quitInfo = egret.Tween.get(this.quitInfo).to({scaleX: 1, scaleY: 1}, duration_quit, egret.Ease.backOut);
    }

    private addEvents () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        Observer.getInstance().fire(Commands.CLOSE_QUIT);
        }, this)
    }

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new FruitQuitPage();
        }
        return this._instance;
    }

    public static destroyInstance() {
        this._instance = undefined;
    }
}