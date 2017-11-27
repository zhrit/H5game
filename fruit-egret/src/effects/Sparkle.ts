/**
 * 火花特效
 */
class Sparkle extends eui.Component {

    private emission: number;
    private emitterX: number = 60;
    private emitterY: number = 60;

    private sparkleTimer: egret.Timer;

    public constructor (emission) {
        super();

        this.emission = emission;
        this.width = this.emitterX * 2;
        this.height = this.emitterY * 2;
        this.anchorOffsetX = this.emitterX;
        this.anchorOffsetY = this.emitterY;

        this.start();
    }

    /**
     * 设置火花特效的时间驱动
     */
    private start () {
        this.sparkleTimer = new egret.Timer(this.emission, 0);
        this.sparkleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.sparkleTimer.start();
    }

    /**
     * 创建粒子并添加到舞台
     */
    private timerFunc () {
        this.addChild(this.creatParticle());
    }

    private creatParticle () {
        /* 生成火花 */
        var singleParticle: eui.Image = new eui.Image();
        singleParticle.source = "flash_png";
        singleParticle.width = 25;
        singleParticle.height = 7;
        singleParticle.anchorOffsetX = singleParticle.width / 2;
        singleParticle.anchorOffsetY = singleParticle.height / 2;
        singleParticle.x = this.emitterX;
        singleParticle.y = this.emitterY;
        singleParticle.rotation = Math.random() * 360;
        var theta = singleParticle.rotation / 180 * Math.PI;

        /* 为每个火花添加动画，动画执行完毕后从舞台中移除 */
        egret.Tween.get(singleParticle).to({
            x: this.emitterX * (Math.cos(theta) + 1),
            y: this.emitterX * (Math.sin(theta) + 1),
            scaleX: 0.2,
            scaleY: 0.2
        }, (Math.random() - 0.5) * 100 + 400).call(function () {
            this.parent.removeChild(this);
        },singleParticle);

        return singleParticle;
    }
}