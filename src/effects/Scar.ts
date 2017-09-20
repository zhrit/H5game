/**
 *刀痕 
 */

class Scar extends eui.Component {

    private scarImage: eui.Image;

    public constructor () {
        super();

        this.init();
    }

    private init() {
        this.scarImage = new eui.Image();
        this.scarImage.source = "smoke_png";
        this.scarImage.anchorOffsetX = this.scarImage.width / 2;
        this.scarImage.anchorOffsetY = this.scarImage.height / 2;
        this.addChild(this.scarImage);
    }
}