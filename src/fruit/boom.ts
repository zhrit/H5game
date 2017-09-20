/**
 * fruit-boom
 */
class Boom extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("boom_png");

        this.setSize();
    }
}