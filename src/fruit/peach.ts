/**
 * fruit-peach
 */
class Peach extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("peach_png");

        this.setSize();
    }
}