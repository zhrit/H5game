/**
 * fruit-banana
 */
class Banana extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("banana_png");
        this.img_part1.texture = RES.getRes("banana-2_png");
        this.img_part2.texture = RES.getRes("banana-1_png");

        this.initRotation = 90;
        this.rotationIndex = 1;

        this.splashColor = null;

        this.setSize();
    }
}