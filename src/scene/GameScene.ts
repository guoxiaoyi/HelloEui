declare function userSession();
class GameScene extends eui.UILayer{
    public constructor(room_config) {
		super();
        this.show(room_config);
	}

    private show(room_config){
        var myGroup = new eui.Group();
        var label:eui.Label = new eui.Label();
        label.text = "创建房间成功";
        label.textAlign = "center";//设置水平对齐方式
        label.verticalAlign = "middle";//设置垂直对齐方式
        myGroup.addChild(label);

        for (let i in room_config.room2) {
            console.log(i)
            console.log(room_config.room2)
            let roomLabel:eui.Label = new eui.Label();
            let _text = {"gameDf" : "底分", "gameGz": "规则", "gameJs" :"局数", "gamePs": "牌型", "peopleNumber": "人数"}[i]
            roomLabel.text = _text + ":" + roomConfig[i]
            myGroup.addChild(roomLabel)
        }

        let notice:eui.Label = new eui.Label();
        notice.text = "场景没有全部删除,需要增加创景管理模块";
        myGroup.addChild(notice);
        this.addChild(myGroup);
        myGroup.layout = new eui.VerticalLayout();
    }

}