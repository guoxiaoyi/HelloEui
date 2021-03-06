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
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene(stageW, stageH) {
        var _this = _super.call(this) || this;
        _this.show(stageW, stageH);
        return _this;
    }
    HallScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    HallScene.prototype.show = function (stageW, stageH) {
        var sky = this.createBitmapByName("bg_jpg");
        sky.width = stageW;
        sky.height = stageH;
        this.addChild(sky);
        // 头像背景
        var avatar_bg = this.createBitmapByName("avatarbg_jpg");
        avatar_bg.width = stageW;
        avatar_bg.height = 140;
        avatar_bg.x = 0;
        avatar_bg.y = 0;
        this.addChild(avatar_bg);
        // 头像
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        imageLoader.load(userSession().url);
        var userName = new egret.TextField();
        userName.text = userSession().name;
        userName.size = 25;
        userName.x = 140;
        userName.y = 48;
        this.addChild(userName);
        var balancebg = this.createBitmapByName("balancbg_png");
        balancebg.x = stageW - 170;
        balancebg.y = 41;
        this.addChild(balancebg);
        var balance = this.createBitmapByName("balance_png");
        balance.x = stageW - 180;
        balance.y = 23;
        this.addChild(balance);
        var userAccount = new egret.TextField();
        userAccount.text = userSession().balance;
        userAccount.size = 28;
        userAccount.x = stageW - 105;
        userAccount.textAlign = egret.HorizontalAlign.RIGHT;
        userAccount.y = 55;
        this.addChild(userAccount);
        var userId = new egret.TextField();
        userId.text = "ID:" + userSession().openId;
        userId.size = 25;
        userId.x = 140;
        userId.y = 90;
        this.addChild(userId);
        var img = new egret.Bitmap();
        img.texture = RES.getRes("game1_png");
        img.width = 678;
        img.height = 298;
        img.scaleX = 0.9;
        img.scaleY = 0.9;
        img.x = 15;
        img.y = 180;
        this.addChild(img);
        var button_a = this.createBitmapByName("button_png");
        button_a.x = 350;
        button_a.y = 347;
        button_a.touchEnabled = true;
        this.addChild(button_a);
        // 拼十点击事件
        button_a.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        button_a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        button_a.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    HallScene.prototype.touchBegin = function (evt) {
        // evt.currentTarget.scaleX = 0.8
        var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.4; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 10; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 10; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 10; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        evt.currentTarget.filters = [glowFilter];
    };
    HallScene.prototype.onTouch = function (evt) {
        // this.soundChannel.stop();
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var pinshiconfig = new PinShiConfig(stageW, stageH);
        this.parent.addChild(pinshiconfig);
        pinshiconfig.touchEnabled = true;
        // this.parent.removeChild(this);
    };
    HallScene.prototype.onMove = function (evt) {
        evt.currentTarget.filters = [];
    };
    HallScene.prototype.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        var bitmap = new egret.Bitmap(texture);
        bitmap.width = 100;
        bitmap.height = 100;
        bitmap.x = 20;
        bitmap.y = 20;
        this.addChild(bitmap);
    };
    return HallScene;
}(eui.UILayer));
__reflect(HallScene.prototype, "HallScene");
