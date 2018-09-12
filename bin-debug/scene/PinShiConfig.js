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
var roomConfig = {};
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
        request.open("http://154.48.225.93/game/roomConfig", egret.HttpMethod.POST);
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
        var brief = new eui.Label();
        brief.text = "创建房间,游戏未进行，不消耗房卡";
        brief.textColor = 0xf8e0ac;
        brief.size = 20;
        brief.width = 512;
        brief.height = 51;
        brief.x = (this.stage.stageWidth - 512) / 2;
        brief.y = (this.stage.stageHeight - 632) / 2 + 117;
        brief.textAlign = "center";
        brief.verticalAlign = "middle";
        this.addChild(brief);
        var goBack = this.createBitmapByName("close_png");
        goBack.x = (this.stage.stageWidth - 512) / 2 + 512 - 50;
        goBack.y = (this.stage.stageHeight - 632) / 2 + 10;
        goBack.touchEnabled = true;
        goBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(goBack);
        var button_enter = new eui.Image();
        button_enter.source = "button_enter_png";
        button_enter.width = 178;
        button_enter.height = 71;
        button_enter.x = (this.stage.stageWidth - 178) / 2;
        button_enter.y = (this.stage.stageHeight - 632) / 2 + 632 - 98;
        button_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
        this.addChild(button_enter);
        var room_config = JSON.parse(request.response).roomConfig;
        var containerGroup = new eui.Group();
        for (var key in room_config) {
            var configGroup = new eui.Group();
            var configOptionGroup = new eui.Group();
            var OptionGroup = new eui.Group();
            var config_i18n = new eui.Label();
            var _text = { "gameDf": "底分", "gameGz": "规则", "gameJs": "局数", "gamePs": "牌型", "peopleNumber": "人数" }[key];
            config_i18n.text = _text;
            config_i18n.size = 20;
            configGroup.addChild(config_i18n);
            // 选项
            for (var i = 0; i < room_config[key].length; ++i) {
                var rdb = new eui.RadioButton();
                rdb.label = room_config[key][i].text;
                rdb.value = room_config[key][i].key;
                rdb.groupName = key;
                rdb.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
                if (i == 0) {
                    rdb.selected = true;
                    roomConfig[key] = room_config[key][i].key;
                }
                configOptionGroup.addChild(rdb);
            }
            configOptionGroup.layout = new eui.VerticalLayout();
            OptionGroup.addChild(configGroup);
            OptionGroup.addChild(configOptionGroup);
            OptionGroup.layout = new eui.HorizontalLayout();
            // containerGroup.addChild(configGroup);
            containerGroup.addChild(OptionGroup);
        }
        this.addChild(containerGroup);
        containerGroup.layout = new eui.VerticalLayout();
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 380;
        myScroller.height = 336;
        myScroller.x = (this.stage.stageWidth - 380) / 2;
        myScroller.y = (this.stage.stageHeight - 632) / 2 + 180;
        //设置viewport
        myScroller.viewport = containerGroup;
        this.addChild(myScroller);
    };
    PinShiConfig.prototype.onPostIOError = function (event) {
        console.log("post error : " + event);
    };
    PinShiConfig.prototype.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    PinShiConfig.prototype.btnTouchHandler = function (event) {
        var str = "";
        for (var i in roomConfig) {
            str = str + i + "=" + roomConfig[i] + "&";
        }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open("http://154.48.225.93/game/createRoom", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log(str.substr(0, str.length - 1));
        request.send(str.substr(0, str.length - 1));
        request.addEventListener(egret.Event.COMPLETE, this.onCreateRommComplete, this);
    };
    PinShiConfig.prototype.onCreateRommComplete = function (event) {
        var result = event.currentTarget;
        var _params = JSON.parse(result.response);
        if (_params.result == "200") {
            var game_scene = new GameScene(_params);
            this.parent.addChild(game_scene);
            // game_scene.touchEnabled = true;
            this.parent.removeChild(this);
        }
    };
    PinShiConfig.prototype.radioChangeHandler = function (evt) {
        roomConfig[evt.target.groupName] = evt.target.value;
    };
    return PinShiConfig;
}(eui.UILayer));
__reflect(PinShiConfig.prototype, "PinShiConfig");
