/**
 * fruit-apple
 */
class Apple extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("apple_png");
        this.img_part1.texture = RES.getRes("apple-1_png");
        this.img_part2.texture = RES.getRes("apple-2_png");

        this.initRotation = -45;
        this.rotationIndex = 0;

        this.splashColor = 0x87c310;

        this.setSize();
    }
}