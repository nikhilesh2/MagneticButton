$(document).ready(function(){
	$('.reset').click(function(){
		$('.target').css("top","40%");
		$('.target').css("left","50%");
		$("#text").text("Press the Button for a Surprise!");
	});

	$('.target').click(function(){
		$("#text").text("April Fools!");
	});
	
	var timeout = null;
	var prev_distance;
	var prevCursorX;
	var prevCursorY;
	var prev_distance;
	document.onmousemove = function(e){
    	cursorX = e.pageX;
    	cursorY = e.pageY;
   
   		clearTimeout(timeout);
		timeout = setTimeout(function() {
        	prevCursorX = e.pageX
        	prevCursorY = e.pageY
        	
        	prev_distance = getDistance(prevCursorX, prevCursorY);
        			
    	}, 0);
    	relocate();
    	
    	if(cursorX != prevCursorX && cursorY != prevCursorY){
    		var new_distance = getDistance(cursorX, cursorY);
    		
    		if(new_distance < prev_distance){
  
    			moveButton(new_distance);
    		}
    		
    	}
	}
	
	
	//Moves the button
	function moveButton(distance){
		
		//Get x and y direction of the cursor
		var x_direction = getX();
		var y_direction = getY();
		
		var multiplier = getMultiplier(distance); //Retrieve speed multiplier

		//Move the button based off mouse movement and multiplier
		$('.target').css("top", '+=' + y_direction * multiplier);
		$('.target').css("left", '+=' + x_direction * multiplier);
		
		checkBoundaries();
		
	}
	//Gen
	function getMultiplier(distance){
		var w = Math.max(document.documentElement.clientWidth);
		var h = Math.max(document.documentElement.clientHeight);
		
		var multiplier = Math.pow(w * h, 1.5);
		
		return multiplier/Math.pow(distance, 4);
	}

	//Get x pointer translation
	function getX(){
		return ((cursorX - prevCursorX));
	}
	//Get y pointer translation
	function getY(){
		return ((cursorY - prevCursorY));
	}

	//Get distance between pointer and button
	function getDistance(mouseX, mouseY){
		 return Math.floor(Math.sqrt(Math.pow(mouseX - ($('.target').offset().left+($('.target').width()/2)), 2) + Math.pow(mouseY - ($('.target').offset().top+($('.target').height()/2)), 2)));
	}
	
	
	//Check if button exceedes boundaries and relocate if true
	function checkBoundaries(){
		var w = Math.max(document.documentElement.clientWidth);
		var h = Math.max(document.documentElement.clientHeight);
		
		var d = $(document).scrollTop();
		p = $('.target').position();
    	
    	 if (p.top > h + d){ 	
        	$('.target').css("top", '-=' + window.innerHeight);
    	}else if( p.top < 0){
    		$('.target').css("top", '+=' + window.innerHeight);
    	}
    	
    	
    	if (p.left < 0 ){
    		
        	$('.target').css("left", '+=' + window.innerWidth);
   		}else if(p.left > w){
   			$('.target').css("left", '-=' + window.innerWidth);
   		}


	}
	//Reset button to original position if no mouse movement
	function relocate(){
		timeout = setTimeout(function() {
        	
        	$( ".target" ).animate({
    				top: "40%",
    				left: "50%"
    			}, 100);	
    	}, 500);
	}

});