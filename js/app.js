//alert(window.innerHeight);        //网页可见区域宽(body)
//alert(window.innerWidth); 

function init() {

	var width = window.innerWidth;
	var height = window.innerHeight; 
	// body...
	//获取当前屏幕宽度
	$(".container").css({
	"width":parseInt(height)*9/16+"px",
	"height":height +"px"
	});

	// $("canvas").css({
	// "width":parseInt(height)*9/16+"px",
	// "height":height +"px"
	// });
	$("canvas").attr({"width" : parseInt(height)*9/16+"px",
					  "height": height +"px"}	
					 );
	//创建舞台
	var stage = new createjs.Stage("gameView");

	//创建菜单场景
	var menu_scene = new createjs.Container();

	var title = new createjs.Text("Match Game", "60px Arial", "#ffffff");
	title.x = 100;
	title.y = 100;
	menu_scene.addChild(title);

	var menu_start = new createjs.Text("Start","40px Arial", "#ffffff");
	menu_start.x = 220;
	menu_start.y = 400;
	
	menu_start.addEventListener("click",function(){
		alert("click!");
		//stage.removeAllChildren();
		stage.removeChild(menu_scene);
		stage.addChild(game_scene);
		stage.update();
	});

	menu_scene.addChild(menu_start);

	//创建游戏场景
	var game_scene = new createjs.Container();

	var timer = new createjs.Text("This is a Timer", "30px Arial", "#ffffff");
	timer.x = 100;
	timer.y = 300;
	game_scene.addChild(timer);

	stage.addChild(menu_scene);
	stage.update();



    

}



