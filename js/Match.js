

function Match(x,y)
{
	createjs.Shape.call(this);
	this.touch_count = 0;
	this.x = x;
	this.y = y;
	this.rotation = 0;
	this.drawMatch = function(){
		this.graphics.beginFill("#D19835");
		this.graphics.drawRect(-200,-20,400,40);
		//this.graphics.endFill();	
		//alert('x:'+this.x);
	};

	// in this case that means it executes in the scope of the button.
	this.on("mousedown", function (evt) {
		//this.parent.addChild(this);
		// if(this.touch_count==0){
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		// 	this.x1 = evt.stageX;
		// 	this.y1 = evt.stageY;
		// 	this.touch_count ++;
		// }else if(this.touch_count==1)
		// {
		// 	this.x2 = evt.stageX;
		// 	this.y2 = evt.stageY; 
		// 	this.touch_count ++;
		// }

		this.dist = Math.abs(evt.localX) +Math.abs(evt.localY);
		if(this.dist<120)
		{
			this.touch_count = 1;
		}else this.touch_count = 2;

		this.parent.getChildByName("Timer").text = this.touch_count + " x:"+evt.stageX+" y:"+evt.stageY;
		update = true;
	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	this.on("pressmove", function (evt) {
		
		if(this.touch_count==1){
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			// indicate that the stage should be updated on the next tick:
			this.parent.getChildByName("Timer").text = this.touch_count+" x:"+this.x+" y:"+this.y;
			update = true;
		}else if(this.touch_count==2)
		{
			 var x_t = evt.stageX + this.offset.x;
			 var y_t = evt.stageY + this.offset.y;
			
			// var temp =  (this.y2 -this.y1)/Math.sqrt(Math.pow((this.y2 - this.y1),2) + Math.pow((this.x2 - this.x1),2));
			// var temp =  (y_t - this.y)/Math.sqrt(Math.pow((y_t - this.y),2) + Math.pow((x_t - this.x),2));
			var temp =  (evt.stageY - this.y)/Math.sqrt(Math.pow((evt.stageY - this.y),2) + Math.pow((evt.stageX - this.x),2));
			if((evt.stageX - this.x)>0)
			{				
				this.rotation = Math.asin(temp)*180/Math.PI;
			}else  this.rotation = 180 - Math.asin(temp)*180/Math.PI;
			
			this.parent.getChildByName("Timer").text = this.touch_count+"  x:"+evt.stageX+" y:"+evt.stageY +" x0:"+this.x+" y0:"+this.y+"  anger:"+this.rotation;
			update = true;
		}

	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	this.on("pressup", function (evt) {
		this.touch_count =0;
		this.parent.getChildByName("Timer").text = this.touch_count;
		update = true;
		// indicate that the stage should be updated on the next tick:
		//update = true;
	});

	this.drawMatch();

}

Match.prototype = new createjs.Shape();



