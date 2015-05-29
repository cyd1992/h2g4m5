//alert(window.innerHeight);        //网页可见区域宽(body)
//alert(window.innerWidth); 

//创建舞台
//$.noConflict();

var stage = new createjs.Stage("gameView");
var menu_scene,game_scene;
var update = true;

function init() {

	var width = window.innerWidth;
	var height =window.innerHeight;
	alert(width +"  "+ height); 
	// body...
	//获取当前屏幕宽度
	$(".container").css({
	"width": width+"px",
	"height":height +"px"
	});
	$("canvas").attr({"width" : width+"px",
					  "height": height +"px"}	
					 );

	menu_scene = new MenuScene();
	stage.addChild(menu_scene);
	//stage.update();
	createjs.Touch.enable(stage);
	update = true;


}

//创建菜单场景
function MenuScene()
{
	createjs.Container.call(this);

	var title = new createjs.Text("Match Game", "60px Arial", "#ffffff");
	title.x = 100;
	title.y = 100;

	this.addChild(title);

	var menu_start = new createjs.Text("Start","100px Arial", "#ffffff");
	menu_start.x = 220;
	menu_start.y = 400;
	
	menu_start.addEventListener("click",function(){
	   // alert("click!");
		stage.removeAllChildren();
		stage.addChild(new GameScene());
		// stage.update();
		update = true;
	});

	this.addChild(menu_start);
}

MenuScene.prototype = new createjs.Container();
menu_scene = new MenuScene();

//创建主游戏场景
function GameScene(){
	createjs.Container.call(this);

	var timer = new createjs.Text("This is a Timer", "30px Arial", "#ffffff");
	timer.x = 100;
	timer.y = 300;
	timer.name = "Timer";
	this.addChild(timer);

	var match = new Match(400,200);
	//match.drawMatch();
	this.addChild(match);

}

GameScene.prototype = new createjs.Container();
//game_scene = new GameScene();

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
     // Actions carried out each tick (aka frame)
     // 
     if (update) {
			update = false; // only update once
			stage.update();
	}
 }