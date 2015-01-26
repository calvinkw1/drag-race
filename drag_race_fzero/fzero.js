(function() {
		var Game = function() {
			this.falcon = new Falcon();
			this.tree = new Tree();
			// this.track = new Track();
		    this.engine = new Engine();
		    this.engineButton = new EngineButton();
		    this.prestageLights = new PrestageLights();
		    this.stageLights = new StageLights();
		    this.redLights = new RedLights();
		    this.treeCountStart = new TreeCountStart();

		    this.attachListeners();
		};

		var Engine = function() {
			this.$el = document.getElementById("engine");
			this.power = "off";
		};

		var EngineButton = function() {
			this.$el = document.getElementById("engineButton");
		};

		var Falcon = function() {
			this.$el = document.getElementById("falcon");
    		this.$el.style.left = "0px";
		};

		var Tree = function() {
			this.$el = document.getElementById("tree");
		};
		var PrestageLights = function() {
			this.$el = document.getElementsByClassName("prestageLights");
			var prestageArray = Array.prototype.slice.call(this.$el);
			};

		var StageLights = function() {
			this.$el = document.getElementsByClassName("stageLights");
			var stageArray = Array.prototype.slice.call(this.$el);
		};

		var RedLights = function() {
			this.$el = document.getElementsByClassName("redLights");
			var redArray = Array.prototype.slice.call(this.$el);
			faultLights = "off";
		};

		var TreeCountStart = function() {
			// this.$el1 = document.getElementsByClassName("countdown1");
			// this.$el2 = document.getElementsByClassName("countdown2");
			// this.$el3 = document.getElementsByClassName("countdown3");
			// this.$el4 = document.getElementsByClassName("go");
			// var count1Array = Array.prototype.slice.call(this.$el1);
			// var count2Array = Array.prototype.slice.call(this.$el2);
			// var count3Array = Array.prototype.slice.call(this.$el3);
			// var goArray = Array.prototype.slice.call(this.$el4);

			this.$el = document.getElementsByClassName("bigCircles");
			var circlesArray = Array.prototype.slice.call(this.$el);
		};

	  	Game.prototype.attachListeners = function() {
	    	var self = this;
	    	// listen for user input, specifically
	    	// for the user pressing the right arrow key
	    	window.addEventListener('keydown', function(event) { //try attaching this to the track to see if it'll prevent movement outside the box
	      		if (event.keyCode === 13) {
	    			engine.power = "on";
	    			console.log("vroom");
	    			engineButton.src="http://f.alldiz.net/psd/web/button/button-medium-green-spring-round-3d-website-free-steel-ring-psd.png";
	    			self.prestageLights.yellowOn();
	    		}
	      		if (engine.power === "on" && event.keyCode === 39) {
	        		self.falcon.advance();
	        		if (falcon.style.left === parseInt("140px", 10) + "px") {
		        		self.stageLights.yellowOn();
		        	}
		        	if (falcon.style.left === parseInt("180px", 10) + "px" && greenLight === "off") {
		        		self.redLights.redOn();
		        		alert("No cheating Falcon! You're better than that!");
		        		falcon.style.left = "0px";
		        		self.treeCountStart.resetLights();
		        	}
	      		}
	      		if (engine.power === "on" && event.keyCode === 37) {
		        	self.falcon.backup();
		      		if (falcon.style.left === parseInt("170px", 10) + "px") {
		        		self.redLights.redOff();
		        	}
		      	}
	      		if (event.keyCode === 32) {
		      			self.treeCountStart.startCountdown();
		      			console.log("keypress registered, function activated");
	      		}
	      		if (falcon.style.left === parseInt("1250px", 10) + "px") {
	      			alert("Winner!"); // keeps alerting on any keypress.. why?
	      			engine.power = "off";
	      			falcon.style.left = "0px"; // moved falcon element back to left 0 to avoid staying on the winner alert coordinate.
	      		}
	    	});
		};

		PrestageLights.prototype.yellowOn = function() {
			var prestageArray = Array.prototype.slice.call(this.$el);
			prestageArray.forEach(function(x) {
				x.style.backgroundColor = "yellow";
			});
		};

		var isStaged = false;
		StageLights.prototype.yellowOn = function() {
			var stageArray = Array.prototype.slice.call(this.$el);
			stageArray.forEach(function(x) {
				x.style.backgroundColor = "yellow";
				isStaged = true;
			});
		};

		RedLights.prototype.redOn = function() {
			var redArray = Array.prototype.slice.call(this.$el);
			redArray.forEach(function(x) {
				x.style.backgroundColor = "#ff0000";
				faultLights = "on";
				
			});
			console.log(faultLights);
		};

		var faultLights = "off";
		RedLights.prototype.redOff = function() {
			var redArray = Array.prototype.slice.call(this.$el);
			redArray.forEach(function(x) {
				x.style.backgroundColor = "";
				// this.faultLights = "off";
				
			});
			console.log(faultLights);
		};

		var greenLight = "off";
		TreeCountStart.prototype.startCountdown = function() {
			var counter = 1;
			function startCountdown() {
				if (counter <= 3 && faultLights === "off" && isStaged){
            		console.log([counter]);
		            document.getElementById("left"+[counter]).style.backgroundColor = "yellow";
		            document.getElementById("right"+[counter]).style.backgroundColor = "yellow";    
			        counter++;
    			} else  if (counter <= 4 && faultLights === "off" && isStaged) {
		            console.log([counter]);
		            document.getElementById("left"+[counter]).style.backgroundColor = "#00ffa7";
		            document.getElementById("right"+[counter]).style.backgroundColor = "#00ffa7";    
			        counter++;
					greenLight = "on";
    			} else {
        			console.log("break");
			        stopCount();
				}
			}
			function  startTree(){
			intervalID = setInterval(startCountdown, 1000);
			}

			function stopCount(){
			    clearInterval(intervalID);
			}

			function resetLights() {
				if (counter <= 4){
            		console.log([counter]);
		            document.getElementById("left"+[counter]).style.backgroundColor = "yellow";
		            document.getElementById("right"+[counter]).style.backgroundColor = "yellow";    
			        counter++;
				}
			}

			startTree();
		};

		Falcon.prototype.advance = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) + 10 + "px";

  		};

  		Falcon.prototype.backup = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) - 10 + "px";
  		};

		var g = new Game();
  	})();