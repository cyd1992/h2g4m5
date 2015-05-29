

function Match(x,y)
{
	createjs.Shape.call(this);
	this.touch_count = 0;
	this.x = x;
	this.y = y;
	this.rotation = 0;
	this.drawMatch = function(){
		this.graphics.beginFill("#D19835");
		this.graphics.drawRect(-200,-200,400,400);
		//this.graphics.endFill();	
		//alert('x:'+this.x);
	};

	// in this case that means it executes in the scope of the button.
	this.on("mousedown", function (evt) {
		//this.parent.addChild(this);
		if(this.touch_count==0){
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
			this.x1 = evt.stageX;
			this.y1 = evt.stageY;
			this.touch_count ++;
		}else if(this.touch_count==1)
		{
			this.x2 = evt.stageX;
			this.y2 = evt.stageY; 
			this.touch_count ++;
		}
		this.parent.getChildByName("Timer").text = this.touch_count + " x:"+evt.localX+" y:"+evt.localY;
		update = true;
	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	this.on("pressmove", function (evt) {
		
		if(this.touch_count==1){
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			// indicate that the stage should be updated on the next tick:
			this.parent.getChildByName("Timer").text = this.touch_count+"  offset:"+evt.stageY;
			update = true;
		}else if(this.touch_count==2)
		{
			if(Math.abs(this.y1 - evt.stageY)<10)
			{
				this.y1 = evt.stageY;
				this.x1 = evt.stageX;
			}else if(Math.abs(this.y2 - evt.stageY)<10)
			{
				this.y2 = evt.stageY;
				this.x2 = evt.stageX;
			}

			var temp =  (this.y2 -this.y1)/Math.sqrt(Math.pow((this.y2 - this.y1),2) + Math.pow((this.x2 - this.x1),2));
			//alert('anger:'+ Math.asin(temp)*180/Math.PI);
			this.rotation = Math.asin(temp)*180/Math.PI;
			this.parent.getChildByName("Timer").text = this.touch_count+"  anger:"+Math.acos(temp)*180/Math.PI;
			update = true;
		}

	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	this.on("pressup", function (evt) {
		this.touch_count --;
		this.parent.getChildByName("Timer").text = this.touch_count;
		update = true;
		// indicate that the stage should be updated on the next tick:
		//update = true;
	});

	this.drawMatch();

}

Match.prototype = new createjs.Shape();



