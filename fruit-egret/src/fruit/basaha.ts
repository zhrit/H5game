/**
 * fruit-basaha
 */
class Basaha extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("basaha_png");
        this.img_part1.texture = RES.getRes("basaha-1_png");
        this.img_part2.texture = RES.getRes("basaha-2_png");

        this.initRotation = 45;
        this.rotationIndex = 1;

        this.splashColor = 0xff0000;

        this.setSize();
    }
}