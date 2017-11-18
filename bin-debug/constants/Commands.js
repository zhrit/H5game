/**
 * 命令常量
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Commands = (function () {
    function Commands() {
    }
    // 场景管理
    Commands.OPEN_NEWGAME = 'open_newgame';
    Commands.OPEN_JODO = 'open_jodo';
    Commands.OPEN_QUIT = 'open_quit';
    Commands.CLOSE_NEWGAME = 'close_newgame';
    Commands.CLOSE_JODO = 'close_jodo';
    Commands.CLOSE_QUIT = 'close_quit';
    // 游戏逻辑
    Commands.ADD_SCORE = 'add_score';
    Commands.ADD_FAILED = 'add_failed';
    Commands.GAME_OVER = 'game_over';
    return Commands;
}());
__reflect(Commands.prototype, "Commands");
