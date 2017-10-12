/**
 * fruit-peach
 */
class Peach extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("peach_png");
        this.img_part1.texture = RES.getRes("peach-1_png");
        this.img_part2.texture = RES.getRes("peach-2_png");

        this.initRotation = -45;
        this.rotationIndex = 0;

        this.setSize();
    }
}