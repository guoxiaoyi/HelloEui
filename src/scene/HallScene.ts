declare function userSession();
class HallScene extends eui.UILayer{
    public constructor(stageW,stageH) {
		super();
        this.show(stageW,stageH);
	}
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private show(stageW,stageH){
        let sky = this.createBitmapByName("bg_jpg");
        sky.width = stageW;
        sky.height = stageH;
        this.addChild(sky);




        // 头像背景
        let avatar_bg = this.createBitmapByName("avatarbg_jpg");
        avatar_bg.width = stageW;
        avatar_bg.height = 140;
        avatar_bg.x = 0;
        avatar_bg.y = 0;
        this.addChild(avatar_bg);

        // 头像
        var imageLoader:egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
        imageLoader.load(userSession().url);




        // let avatar = this.createBitmapByName("avatar_jpg");

        // this.addChild(avatar);



        var userName:egret.TextField = new egret.TextField();
        userName.text =  userSession().name;
        userName.size = 25;
        userName.x = 140;
        userName.y = 48;
        this.addChild(userName);




        let balancebg = this.createBitmapByName("balancbg_png");
        balancebg.x = stageW - 170;
        balancebg.y = 41;
        this.addChild(balancebg)

        let balance = this.createBitmapByName("balance_png");
        balance.x = stageW - 180;
        balance.y = 23;
        this.addChild(balance)

        var userAccount:egret.TextField = new egret.TextField();
        userAccount.text = userSession().balance;
        userAccount.size = 28;
        userAccount.x = stageW - 105;
        userAccount.textAlign = egret.HorizontalAlign.RIGHT;
        userAccount.y = 55;
        this.addChild(userAccount);


        var userId:egret.TextField = new egret.TextField();
        userId.text = "ID:"+ userSession().openId;
        userId.size = 25;
        userId.x = 140;
        userId.y = 90;
        this.addChild(userId);








        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;

        // // //设置为 POST 请求
        // // request.open("http://httpbin.org/post",egret.HttpMethod.POST);
        // // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // // request.send();
        // // request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        // // request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        // // request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
        // // // console.log(callJsFunc("a"))


        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("game1_png");
        img.width = 678;
        img.height = 298;
        img.scaleX = 0.9;
        img.scaleY = 0.9;
        // img.height = 298;
        img.x = 15;
        img.y = 180;
        this.addChild(img);


        let button_a = this.createBitmapByName("button_png");
        button_a.x = 350;
        button_a.y = 347;
        button_a.touchEnabled = true;
        this.addChild(button_a)
        // 拼十点击事件
        button_a.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this)
        button_a.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        button_a.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        // var button = new eui.Button();
        // button.x = 350;
        // button.y = 347;
        // button.skinName = "resource/game/ButtonSkin.exml";
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTouchHandler,this);

    }
    private touchBegin(evt:egret.TouchEvent){
        // evt.currentTarget.scaleX = 0.8
        var color:number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.4;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX:number = 10;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 10;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 10;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
            strength, quality, inner, knockout );
        evt.currentTarget.filters = [ glowFilter ];

    }
    private onTouch( evt:egret.TouchEvent){
        // this.soundChannel.stop();

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight
        let pinshiconfig = new PinShiConfig(stageW,stageH);
        this.parent.addChild(pinshiconfig);
        pinshiconfig.touchEnabled = true;
        // this.parent.removeChild(this);

    }
    private onMove( evt:egret.TouchEvent){
        evt.currentTarget.filters = [  ];
    }
    private loadCompleteHandler(event:egret.Event):void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        var bitmap:egret.Bitmap = new egret.Bitmap(texture);
        bitmap.width = 100;
        bitmap.height = 100;
        bitmap.x = 20;
        bitmap.y = 20;
        this.addChild(bitmap);
    }


}