(function() {

		var Game = function() {
			this.falcon = new Falcon();
			this.tree = new Tree();
			// this.track = new Track();
		    this.engine = new Engine();
		    this.engineButton = new EngineButton();
		    this.prestageLights = new PrestageLights();
		    this.stageLights = new StageLights();

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
			console.log(stageArray);
		};

		var Lines = function() {
			var stagerLoc = document.getElementById("stager"),
				startLoc = document.getElementById("start"),
				finishLoc = document.getElementById("finish");

			stagerRect = stagerLoc.getBoundingClientRect();		// ClientRect {height: 150, width: 20, left: 252.5, bottom: 568, right: 272.5…}
			startRect = startLoc.getBoundingClientRect();		// ClientRect {height: 150, width: 20, left: 386.5, bottom: 568, right: 406.5…}
			finishRect = finishLoc.getBoundingClientRect();		// ClientRect {height: 150, width: 20, left: 1380.5, bottom: 568, right: 1400.5…}

			console.log(stagerRect);
			console.log(startRect);
			console.log(finishRect);
		};
		
		new Lines();
		
		 
		 

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
	        		if (falcon.style.left >= "700px") {
		        		self.stageLights.yellowOn();
		        }
	      		}
	      		if (engine.power === "on" && event.keyCode === 37) {
	        	self.falcon.backup();
	      		}
	      		
	    	});
		};

		PrestageLights.prototype.yellowOn = function() {
			var prestageArray = Array.prototype.slice.call(this.$el);
			prestageArray.forEach(function(x) {
				x.style.backgroundColor = "yellow";
				console.log(x);
			});
		};

		StageLights.prototype.yellowOn = function() {
			var stageArray = Array.prototype.slice.call(this.$el);
			stageArray.forEach(function(x) {
				x.style.backgroundColor = "yellow";
			});
		};

		Falcon.prototype.advance = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) + 10 + "px";
  		};

  		Falcon.prototype.backup = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) - 1 + "px";
  		};

		var g = new Game();
  	})();