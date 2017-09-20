/**
 * 主界面
 */

class FruitHomePage extends eui.Component {

    private static _instance;
    public constructor () {
        super();
        this.skinName = "resource/eui_skins/eui/HomePage.exml";
        this.init();
    }

    public headerBg: eui.Image;
    public headerTitle: eui.Image;
    public headerSubTitle: eui.Image;
    public headerTip: eui.Image;

    public contentDojo: eui.Image;
    public ringDojo: eui.Image;
    public contentNewGame: eui.Image;
    public ringNewGame: eui.Image;
    public contentQuit: eui.Image;
    public ringQuit: eui.Image;
    public contentTip: eui.Image;

    private init () {
        // 添加初始动画
        this.addEffects();
        this.addEvents();
    }

    // 添加初始动画
    private addEffects() {
        // 动画时间
        var duration_headerBg = 700;
        var duration_headerTitle = 1000;
        var duration_headerTip = 200;
        var duration_content = 300;

        // 添加动画
        // headerEffect
        var tw_headerBgtween = egret.Tween.get(this.headerBg).to({y: 0}, duration_headerBg, egret.Ease.circOut);
        var tw_headerTitle = egret.Tween.get(this.headerTitle).to({y: 0}, duration_headerBg, egret.Ease.circOut);
        egret.setTimeout(function () {
            var tw_headerSubTitle = egret.Tween.get(this.headerSubTitle).to({y: 40}, duration_headerTitle, egret.Ease.elasticOut);
        }, this, duration_headerBg);
        egret.setTimeout(function () {
            var tw_headerTip = egret.Tween.get(this.headerTip).to({x: 0, y: 127}, duration_headerTip, egret.Ease.circOut);
        }, this, duration_headerBg + duration_headerTitle - duration_headerTip);

        // contentEffect
        egret.setTimeout(function () {
            var tw_ringDojo = egret.Tween.get(this.ringDojo).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_contentDojo = egret.Tween.get(this.contentDojo).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_contentNewGame = egret.Tween.get(this.contentNewGame).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_ringNewGame = egret.Tween.get(this.ringNewGame).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_contentQuit = egret.Tween.get(this.contentQuit).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_ringQuit = egret.Tween.get(this.ringQuit).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
            var tw_contentTip = egret.Tween.get(this.contentTip).to({scaleX: 1, scaleY: 1}, duration_content, egret.Ease.circOut);
        }, this, duration_headerBg + duration_headerTitle);

        // newEffect
        egret.setTimeout(function () {
            Effects.floatUpdown(this.contentTip, 500, true);
            Effects.rotate(this.ringDojo, 32000, true, false);
            Effects.rotate(this.contentDojo, 24000, true, false);
            Effects.rotate(this.ringNewGame, 30000, true, false);
            Effects.rotate(this.contentNewGame, 15000, true, false);
            Effects.rotate(this.ringQuit, 20000, true, true);
            var sparkle = new Sparkle(30);
            sparkle.x = this.contentQuit.x - this.contentQuit.width / 2 + 5;
            sparkle.y = this.contentQuit.y - this.contentQuit.height /2 + 5;
            this.addChild(sparkle);
        }, this, duration_headerBg + duration_headerTitle + duration_content);
    }

    private addEvents() {
        this.contentNewGame.touchEnabled = true;
        this.contentNewGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Observer.getInstance().fire(Commands.OPEN_NEWGAME);
        }, this)

        this.contentDojo.touchEnabled = true;
        this.contentDojo.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Observer.getInstance().fire(Commands.OPEN_JODO);
        }, this)

        this.contentQuit.touchEnabled = true;
        this.contentQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Observer.getInstance().fire(Commands.OPEN_QUIT);
        }, this)
    }

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new FruitHomePage();
        }
        return this._instance;
    }

    public static destroyInstance() {
        this._instance = undefined;
    }
}