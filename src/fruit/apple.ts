/**
 * fruit-apple
 */
class Apple extends BaseFruit {
    constructor () {
        super();
        this.img.texture = RES.getRes("apple_png");

        this.setSize();
    }
}