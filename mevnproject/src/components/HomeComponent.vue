<template>
  <div class="container">
  <!-- Intro page to application -->
    <h1>Grapher</h1>
    <form @submit.prevent="init()">
    	<div class="form-row">
          <div class="col">
          	<label for="d">X Min, Max</label>
              <input ref="d" id="d" class="form-control" placeholder="Pos real #" required>
          </div>
          <div class="col">
          	<label for="r">Y Min, Max</label>
              <input ref="r" id="r" class="form-control" placeholder="Pos real #" required>
          </div>
          
          <div class="col">
          	<label for="cb">Count</label>
              <input ref="cb" id="cb" class="form-control" placeholder="Pos real #, MUST BE FACTOR" required>
          </div>
        </div>
        <br/>
    	<div class="text-center">
    		<button type="submit" class="btn btn-dark">Generate (bigger domains and ranges may take time):</button>
      	</div>
    </form>
    <div id="game" style="display: block; text-align: center;">
	    <canvas id="background" width="538" height="392" style="top: 100px;
            left: 0px;
            border: none;
            z-index: 1;
            width: 660px;
            height: 460px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding-top: 15px;">
	        Your browser does not support canvas. Please try again with a different browser.
	    </canvas>
	</div>
  </div>
 </template>
 
<script>
	export default {
		data(){
	      return {
	        Post: {},
	        Posts: []
	      }
	    },
	    created() {
		    let uri = 'http://localhost:4000/Posts';
	        this.axios.get(uri).then(response => {
	          this.Posts = response.data;
	        });
	    },
	    methods: {
			init() {
				if (parseFloat(this.$refs.d.value)%parseFloat(this.$refs.cb.value) == 0 &&
	    			parseFloat(this.$refs.r.value)%parseFloat(this.$refs.cb.value) == 0){
	    			// var dmin = parseFloat(this.$refs.d_min.value);
					// var dmax = parseFloat(this.$refs.d_max.value);
					// var rmin = parseFloat(this.$refs.r_min.value);
					// var rmax = parseFloat(this.$refs.r_max.value);
					var d = parseFloat(this.$refs.d.value);
					var r = parseFloat(this.$refs.r.value);
					var cb = parseFloat(this.$refs.cb.value);
					var canvas = document.getElementById('background');
					var context = canvas.getContext('2d');
			        //var width = game.bgCanvas.width;
			        context.fillStyle = "#000000";
			        context.fillRect(0,0,538,392);
			        // context.fillText("Text", width-80, 25);
			        // music.play();
			        context.fillStyle = "#ffffff";
			        // var spanX = Math.abs(dmin) + Math.abs(dmax);
			        var spanX = Math.abs(d)*2;
			        var cbScreenX = cb;
			        // var cbScreenX = 538/spanX;
			        // var spanY = Math.abs(rmin) + Math.abs(rmax);
			       	var spanY = Math.abs(r)*2;
			        var cbScreenY = cb;
			        // var cbScreenY = 392/spanY;
			        let xi = -1*d;
			        let xx = 0;
			        for (var ii = 1; ii<=(2*d/cb+1); ii++){
				        context.fillText(xi, xx, 392/2+10);
				        xx += 538/((d/cb)*2);
				        xi += cb;
			        	if (xi == 0){
			        		let yi = r;
						    let yy = 0;
						    for (var jj = 1; jj<=(2*r/cb+1); jj++){
						        context.fillText(yi, 538/2+10, yy);
						        yy += 392/((r/cb)*2);
							    yi -= cb;
							}
			        	}
			        }
			        // }
			        context.strokeStyle = "#ffffff";
			        context.beginPath(); 
					// Staring point 
					context.moveTo(538/2,392);
					// End point 
					context.lineTo(538/2,0);
					// Make the line visible
					context.stroke();
					context.beginPath(); 
					context.moveTo(0,392/2);
					context.lineTo(538,392/2);
					context.stroke();
			        for (var i = 0; i<this.Posts.length; i++){
			        	var randomCol = Math.round(Math.random()*10);
			        	var colour;
			        	if (randomCol==0){
			        		colour = "#a83232";
			        	} else if (randomCol==1){
			        		colour = "#a86932";
			        	} else if (randomCol==2){
			        		colour = "#a89e32";
			        	} else if (randomCol==3){
			        		colour = "#51a832";
			        	} else if (randomCol==4){
			        		colour = "#32a85b";
			        	} else if (randomCol==5){
			        		colour = "#32a4a8";
			        	} else if (randomCol==6){
			        		colour = "#3273a8";
			        	} else if (randomCol==7){
			        		colour = "#3248a8";
			        	} else if (randomCol==8){
			        		colour = "#6932a8";
			        	} else if (randomCol==9){
			        		colour = "#a632a8";
			        	} else {
			        		colour = "#a8324e";
			        	}
			        	context.fillStyle = colour;
			        	// plot(this.Posts[i]);
			        	var post = this.Posts[i];
			        	var type = post.type;
						var a = post.a;
						var b = post.b;
						var c = post.c;
						var m = post.m;
						// var factor = r/d; // vertical stretch
						// var transY = 392-r; // add transY to Y yielded from original fnct
						// var transX = 538-d; // wherever there is an x, put x - transX
						let xPos = 0
						for (var x = -1*d; x<=d; x++){
							if (type === "Linear"){
							    	var y = m*x + b;
							    	if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} else if (type === "Quadratic"){
									var y = a*x*x + b*x + c;
									if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} else if (type === "Power"){
									var y = a*Math.pow(x,b);
									if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} else if (type === "Exponential"){
									var y = a*Math.pow(b,x);
									if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} else if (type === "Log"){
									var y = a*Math.log(x) + b;
									if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} else {
									var y = a*Math.sin(b*x+c);
									if (xPos == 0){
							    		if (y<0){
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
							    	} else {
								    	if (y<0){
									    	context.lineTo(xPos, y + (538/y - r/y));
									    	context.moveTo(xPos, y + (538/y - r/y));
									    } else {
									   		context.lineTo(xPos, y - (538/y - r/y));
									   		context.moveTo(xPos, y - (538/y - r/y));
									   	}
									}
							} 
							context.stroke();
							xPos += 538/(d*2);	
							//xPos++;
						}
						// let xCalc = 0;
				  //       let xxx = 0;
				  //       let yyy = 0;
				  //       for (var iii = 1; iii<=(2*d/cb+1); iii++){
					 //        if (type === "Linear"){
						// 	    //let yyy = 0;
						// 	    //for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 	    	var y = m*xCalc + b;
						// 	        context.fillRect(y, xxx, yyy, 1);
						// 		//}
						// 	} else if (type === "Quadratic"){
						// 		// let yyy = 0;
						// 	 //    for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 			var y = a*xCalc*xCalc + b*xCalc + c;
						// 	        context.fillRect(y, xxx, yyy, 1);
						// 		//}
						// 	} else if (type === "Power"){
						// 		// let yyy = 0;
						// 	 //    for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 			var y = a*Math.pow(xxx,b);
						// 	        context.fillRect(y, xxx, yyy, 1);
						// 		//}
						// 	} else if (type === "Exponential"){
						// 		// let yyy = 0;
						// 	 //    for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 			var y = a*Math.pow(b,xCalc);
						// 	        context.fillRect(y, xxx, yyy, 1);
						// 		//}
						// 	} else if (type === "Log"){
						// 		// let yyy = 0;
						// 	 //    for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 			var y = a*Math.log(xCalc) + b;
						// 	        context.fillRect(y, xxx, yyy, 1);
						// 		//}
						// 	} else {
						// 		// let yyy = 0;
						// 	 //    for (var jjj = 1; jjj<=(2*r/cb+1); jjj++){
						// 			var y = a*Math.sin(b*xCalc+c);
						// 	        context.fillRect(y, xxx, yyy, 1); 
						// 		//}
						// 	} 
						// 	yyy += 392/((r/cb)*2);	
						// 	xxx += 538/((d/cb)*2);	
						// 	xCalc++;		        	
				  //       }


						// if (type === "Linear"){
						// 	for (var x = 0; x<538; x+=0.01){
						// 		var y = factor*(m*(x-transX) + b) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } else if (type === "Quadratic"){
						// 	for (var x = 0; x<538; x+=0.01){
						// 		var y = factor*(a*(x-transX)*(x-transX) + b*(x-transX) + c) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } else if (type === "Power"){
						// 	for (var x = 0; x<538; x+=0.01){
						// 		var y = factor*(a*Math.pow((x-transX),b)) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } else if (type === "Exponential"){
						// 	for (var x = 0; x<538; x+=0.01){
						// 		var y = factor*(a*Math.pow(b,(x-transX))) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } else if (type === "Log"){
						// 	for (var x = 0; x<538; x+=0.01){
						// 		var y = factor*(a*Math.log((x-transX)) + b) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } else {
						// 	for (var x = 0; x<538; x++){
						// 		var y = factor*(a*Math.sin(b*(x-transX)+c)) + transY;
						// 		context.fillRect(x,392-y-15,1,1);
						// 	}
						// } 
			        }
	    		} else {
	    			alert("Your count number is not a factor of both your selected domain and range. Please select a different count number.");
	    		}
			}
	    }
	}
	// var music = new Audio ("genie'slamp.mp3");
</script>