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

    private start () {
        this.sparkleTimer = new egret.Timer(this.emission, 0);
        this.sparkleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.sparkleTimer.start();
    }

    private timerFunc () {
        // 创建粒子
        this.addChild(this.creatParticle());
        // 粒子运动
        // 删除粒子
    }

    private creatParticle () {
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