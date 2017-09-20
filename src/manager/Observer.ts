/**
 * 观察者
 */

class Observer {
    private _messages;
    private static _instance;

    constructor () {
        this._messages = [];
    }

    public regist (commandKey, fn, content) {
        var fn_con = {
            fn: fn,
            content: content
        };
        if (typeof this._messages[commandKey] === 'undefined') {
            this._messages[commandKey] = [fn_con];
        } else {
            this._messages[commandKey].push(fn_con);
        }
    }

    public fire (commandKey, args) {
        if (!this._messages[commandKey]){
            return;
        }
        var events = {
            commandKey: commandKey,
            args: args || {}
        };
        for (var i = 0; i < this._messages[commandKey].length; i++) {
            this._messages[commandKey][i].fn.call(this._messages[commandKey][i].content, events);
        }
    }

    public remove (commandKey, fn, content) {
        var fn_con = {
            fn: fn,
            content: content
        };
        if (this._messages[commandKey] instanceof Array) {
            for (var i = this._messages[commandKey].length - 1; i >= 0; i--) {
                this._messages[commandKey][i] === fn_con && this._messages[commandKey].splice(i, 1);
            }
        }
    }

    public static getInstance () {
        if (this._instance === undefined) {
            this._instance = new Observer();
        }
        return this._instance;
    }
}