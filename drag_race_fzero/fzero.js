(function() {

		var Game = function() {
			this.falcon = new Falcon();
			// this.tree = new Tree();
			// this.track = new Track();
		    this.engine = new Engine();
		    this.engineButton = new EngineButton();

		    this.attachListeners();
		};

		var Engine = function() {
			this.$el = document.getElementById("engine");
			this.power = "off";
			console.log(this.$el);
		};

		var EngineButton = function() {
			this.$el = document.getElementById("engineButton");
			console.log(this.$el);
		};

		var Falcon = function() {
			this.$el = document.getElementById("falcon");
    		this.$el.style.left = "0px";
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
	    		}
	      		if (engine.power === "on" && event.keyCode === 39) {
	        	self.falcon.advance();
	      		}
	      		if (engine.power === "on" && event.keyCode === 37) {
	        	self.falcon.backup();
	      		}
	    	});
		};

		Falcon.prototype.advance = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) + 20 + "px";
  		};

  		Falcon.prototype.backup = function() {
    		// this should move the car across the screen 1px at a time
    		this.$el.style.left = parseInt(this.$el.style.left, 10) - 20 + "px";
  		};

		var g = new Game();
  	})();