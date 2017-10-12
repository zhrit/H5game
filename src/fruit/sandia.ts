/**
 * fruit-sandia
 */
class Sandia extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("sandia_png");
        this.img_part1.texture = RES.getRes("sandia-1_png");
        this.img_part2.texture = RES.getRes("sandia-2_png");

        this.initRotation = 85;
        this.rotationIndex = 1;

        this.setSize();
    }
}