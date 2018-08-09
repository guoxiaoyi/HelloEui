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
var PinShiConfig = (function (_super) {
    __extends(PinShiConfig, _super);
    function PinShiConfig(stageW, stageH) {
        var _this = _super.call(this) || this;
        _this.show(stageW, stageH);
        return _this;
        // ROOMCONFIG = {"as": 123}
    }
    PinShiConfig.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    PinShiConfig.prototype.show = function (stageW, stageH) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open("http://ann.baoying1688.com/game/roomConfig", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    };
    PinShiConfig.prototype.onTouch = function (evt) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var startScene = new HallScene(stageW, stageH);
        this.parent.addChild(startScene);
        this.parent.removeChild(this);
    };
    PinShiConfig.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        var configbg = this.createBitmapByName("bg2_png");
        configbg.width = this.stage.stageWidth;
        configbg.height = this.stage.stageHeight;
        this.addChild(configbg);
        var createRoom = this.createBitmapByName("create_png");
        createRoom.width = 512;
        createRoom.height = 632;
        createRoom.scaleX = 1;
        createRoom.x = (this.stage.stageWidth - 512) / 2;
        createRoom.y = (this.stage.stageHeight - 632) / 2;
        this.addChild(createRoom);
        var goBack = this.createBitmapByName("close_png");
        goBack.x = (this.stage.stageWidth - 512) / 2 + 512 - 50;
        goBack.y = (this.stage.stageHeight - 632) / 2 + 10;
        goBack.touchEnabled = true;
        goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(goBack);
        var room_config = JSON.parse(request.response).roomConfig;
        var containerGroup = new eui.Group();
        for (var key in room_config) {
            var configGroup = new eui.Group();
            var configOptionGroup = new eui.Group();
            var config_i18n = new eui.Label();
            var _text = { "gameDf": "底分", "gameGz": "规则", "gameJs": "局数", "gamePs": "牌型", "peopleNumber": "人数" }[key];
            config_i18n.text = _text;
            configGroup.addChild(config_i18n);
            // 选项
            for (var i = 0; i < room_config[key].length; ++i) {
                var rdb = new eui.RadioButton();
                rdb.label = room_config[key][i].text;
                rdb.value = room_config[key][i].key;
                rdb.groupName = key;
                rdb.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
                configOptionGroup.addChild(rdb);
            }
            configOptionGroup.layout = new eui.HorizontalLayout();
            configGroup.addChild(configOptionGroup);
            containerGroup.addChild(configGroup);
            containerGroup.addChild(configOptionGroup);
        }
        this.addChild(containerGroup);
        containerGroup.layout = new eui.VerticalLayout();
        var button = new eui.Button();
        button.width = 100;
        button.height = 40;
        button.label = "Confirm";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        containerGroup.addChild(button);
    };
    PinShiConfig.prototype.onPostIOError = function (event) {
        console.log("post error : " + event);
    };
    PinShiConfig.prototype.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    PinShiConfig.prototype.radioChangeHandler = function (evt) {
        var _params = "";
        _params = _params + evt.target.groupName;
        // egret.log(roomConfig);
    };
    return PinShiConfig;
}(eui.UILayer));
__reflect(PinShiConfig.prototype, "PinShiConfig");
