/**
 * 场景基类
 */

class BaseScene extends eui.Component {
    constructor () {
        super();
    }

    private static _instance;

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new BaseScene();
        }
        return this._instance;
    }
}