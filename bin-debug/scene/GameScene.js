var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(room_config) {
        var _this = _super.call(this) || this;
        _this.show(room_config);
        return _this;
    }
    GameScene.prototype.show = function (room_config) {
        var myGroup = new eui.Group();
        var label = new eui.Label();
        label.text = "创建房间成功";
        label.textAlign = "center"; //设置水平对齐方式
        label.verticalAlign = "middle"; //设置垂直对齐方式
        myGroup.addChild(label);
        for (var i in room_config.room2) {
            console.log(i);
            console.log(room_config.room2);
            var roomLabel = new eui.Label();
            var _text = { "gameDf": "底分", "gameGz": "规则", "gameJs": "局数", "gamePs": "牌型", "peopleNumber": "人数" }[i];
            roomLabel.text = _text + ":" + roomConfig[i];
            myGroup.addChild(roomLabel);
        }
        var notice = new eui.Label();
        notice.text = "场景没有全部删除,需要增加创景管理模块";
        myGroup.addChild(notice);
        this.addChild(myGroup);
        myGroup.layout = new eui.VerticalLayout();
    };
    return GameScene;
}(eui.UILayer));
__reflect(GameScene.prototype, "GameScene");
