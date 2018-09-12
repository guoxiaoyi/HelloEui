
const roomConfig = {}
class PinShiConfig extends eui.UILayer{
    public constructor(stageW,stageH) {
        super();
        this.show(stageW,stageH);
        // ROOMCONFIG = {"as": 123}
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private show(stageW,stageH){


        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open("http://154.48.225.93/game/roomConfig",egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);

    }
    private onTouch( evt:egret.TouchEvent){
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let startScene = new HallScene(stageW,stageH);
        this.parent.addChild(startScene);
        this.parent.removeChild(this);
    }
    private onPostComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        let configbg = this.createBitmapByName("bg2_png");
        configbg.width = this.stage.stageWidth;
        configbg.height = this.stage.stageHeight;
        this.addChild(configbg);


        let createRoom = this.createBitmapByName("create_png");
        createRoom.width = 512;
        createRoom.height = 632;
        createRoom.scaleX = 1;
        createRoom.x = (this.stage.stageWidth - 512)/2;
        createRoom.y = (this.stage.stageHeight - 632)/2;
        this.addChild(createRoom);

        let brief = new eui.Label();
        brief.text = "创建房间,游戏未进行，不消耗房卡";
        brief.textColor = 0xf8e0ac;
        brief.size = 20;
        brief.width = 512;
        brief.height = 51;
        brief.x = (this.stage.stageWidth - 512)/2;
        brief.y = (this.stage.stageHeight - 632)/2 + 117;
        brief.textAlign = "center";
        brief.verticalAlign = "middle";
        this.addChild(brief)


        let goBack = this.createBitmapByName("close_png");
        goBack.x = (this.stage.stageWidth - 512)/2 + 512 - 50;
        goBack.y = (this.stage.stageHeight - 632)/2 + 10;
        goBack.touchEnabled = true;
        goBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.addChild(goBack);

        let button_enter = new  eui.Image();
        button_enter.source = "button_enter_png";
        button_enter.width = 178;
        button_enter.height = 71;
        button_enter.x = (this.stage.stageWidth - 178)/2;
        button_enter.y = (this.stage.stageHeight - 632)/2 + 632 - 98;
        button_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTouchHandler,this);
        this.addChild(button_enter);


        var room_config = JSON.parse(request.response).roomConfig
        var containerGroup = new eui.Group();

        for (var key in room_config) {
            let configGroup = new eui.Group();
            let configOptionGroup = new eui.Group();
            let OptionGroup = new eui.Group();

            let config_i18n = new eui.Label();
            let _text = {"gameDf" : "底分", "gameGz": "规则", "gameJs" :"局数", "gamePs": "牌型", "peopleNumber": "人数"}[key]
            config_i18n.text = _text;
            config_i18n.size = 20;
            configGroup.addChild(config_i18n)
            // 选项
            for (var i = 0; i < room_config[key].length; ++i) {
                let rdb: eui.RadioButton = new eui.RadioButton();
                rdb.label = room_config[key][i].text;
                rdb.value = room_config[key][i].key;
                rdb.groupName = key;
                rdb.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
                if (i == 0 ) {
                    rdb.selected = true
                    roomConfig[key] = room_config[key][i].key
                }
                configOptionGroup.addChild(rdb)
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
        myScroller.x = (this.stage.stageWidth - 380)/2;
        myScroller.y = (this.stage.stageHeight - 632)/2 + 180;
        //设置viewport
        myScroller.viewport = containerGroup;
        this.addChild(myScroller);

    }
    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
    }
    private onPostProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
    private btnTouchHandler(event:egret.TouchEvent):void {

        let str = ""
        for (let i in roomConfig) {
            str = str + i + "=" + roomConfig[i] + "&"
        }

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open("http://154.48.225.93/game/createRoom",egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log(str.substr(0,str.length-1))
        request.send(str.substr(0,str.length-1));
        request.addEventListener(egret.Event.COMPLETE,this.onCreateRommComplete,this);
    }
    private onCreateRommComplete(event:egret.TouchEvent):void{
        let result =  <egret.HttpRequest>event.currentTarget
        let _params = JSON.parse(result.response)
        if (_params.result == "200") {
            let game_scene = new GameScene(_params);
            this.parent.addChild(game_scene);
            // game_scene.touchEnabled = true;
            this.parent.removeChild(this);
        }
    }
    private radioChangeHandler(evt:eui.UIEvent):void {
        roomConfig[evt.target.groupName] = evt.target.value
    }
}