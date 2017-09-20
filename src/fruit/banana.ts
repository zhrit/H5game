/**
 * fruit-banana
 */
class Banana extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("banana_png");

        this.setSize();
    }
}