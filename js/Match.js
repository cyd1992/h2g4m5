

function Match(x,y)
{
	createjs.Shape.call(this);
	this.abc = 8;
	this.x = x;
	this.y = y;
	this.drawMatch = function(){
		this.graphics.beginFill("#D19835");
		this.graphics.drawRect(0,0,40,200);
		//this.graphics.endFill();	
		//alert('x:'+this.x);
	};

	// in this case that means it executes in the scope of the button.
	this.on("mousedown", function (evt) {
		//this.parent.addChild(this);
		this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	this.on("pressmove", function (evt) {
		this.x = evt.stageX + this.offset.x;
		this.y = evt.stageY + this.offset.y;
		// indicate that the stage should be updated on the next tick:
		update = true;
	});

	this.drawMatch();

}

Match.prototype = new createjs.Shape();



