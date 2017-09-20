/**
 * fruit-sandia
 */
class Sandia extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("sandia_png");

        this.setSize();
    }
}