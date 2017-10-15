/**
 * 爆炸发光特效
 */
class BoomEffect extends egret.DisplayObjectContainer {

    private lightNum: number = 8;
    private lightRotation: number[] = [];
    private lightRotationOrder: number[] = [];
    private lightArray: egret.Shape[];
    private timer;
    private fruitObj;

    private index: number;

    public constructor (fruitObj) {
        super();

        this.index = 0;
        this.lightArray = [];
        this.fruitObj = fruitObj;

        this.init();
        this.getLightRotation();
        this.getOrder();
        this.addLight();
        this.addWhiteBg();
    }

    private init () {
        this.width = 1280;
        this.height = 960;
        this.anchorOffsetX = 640;
        this.anchorOffsetY = 480;
    }

    private getLightRotation () {
        var lightGap = 360 / this.lightNum;
        for (var i = 0; i < this.lightNum; i++) {
            this.lightRotation.push(Math.random() * lightGap * 0.5 + lightGap * 0.25 + lightGap * i);
        }
    }

    private getOrder () {
        var lightRotationCopy:number[] = [];
        for (var i = 0; i < this.lightNum; i++) {
            lightRotationCopy.push(this.lightRotation[i]);
        }

        for (var i = 8; i > 0; i--) {
            var order = Math.floor(Math.random() * i);
            this.lightRotationOrder.push(lightRotationCopy[order]);
            lightRotationCopy.splice(order, 1);
        }
    }

    private addLight () {
        if (this.timer) {
            egret.clearTimeout(this.timer);
        }
        if (this.index < this.lightNum) {
            var boomLight = this.createLight();
            boomLight.rotation = this.lightRotationOrder[this.index++];
            this.lightArray.push(boomLight);
            this.addChild(boomLight);
            this.timer = egret.setTimeout(this.addLight, this, 200);
        }
    }

    private createLight () {
        var boomLight: egret.Shape = new egret.Shape();
        boomLight.graphics.beginFill(0xffffe9, 1);
        boomLight.graphics.moveTo(0, 17);
        boomLight.graphics.lineTo(640, 0);
        boomLight.graphics.lineTo(640, 40);
        boomLight.graphics.lineTo(0, 23);
        boomLight.graphics.endFill();
        boomLight.anchorOffsetX = 0;
        boomLight.anchorOffsetY = 20;
        boomLight.x = 640;
        boomLight.y = 480;
        return boomLight;
    }

    private addWhiteBg () {
        var whiteBg: egret.Shape = new egret.Shape();
        whiteBg.graphics.beginFill(0xffffff, 1);
        whiteBg.graphics.drawRect(0, 0, 640, 480);
        whiteBg.graphics.endFill();
        egret.setTimeout(function () {
            this.stage.addChild(whiteBg);
            var tw_whiteBg = egret.Tween.get(whiteBg).to({alpha: 0}, 3000).call(function () {
                this.stage.removeChild(whiteBg);
                Observer.getInstance().fire(Commands.GAME_OVER);
            });
            for (var i = 0; i < this.lightNum; i++) {
                this.removeChild(this.lightArray[i]);
            }
            GameContainer.getInstance().removeChild(this.fruitObj);
        }, this, (this.lightNum) * 200)
    }
}