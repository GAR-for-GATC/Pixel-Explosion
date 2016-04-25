	

window.addEventListener('load', function () {
	// Get the canvas element.
	var elem = document.getElementById('myCanvas');

	if (!elem || !elem.getContext) {
		console.log("could not get canvas element.");
		return;
	}
	// Get the canvas 2d context.
	var context = elem.getContext('2d');
	if (!context || !context.drawImage) {
		console.log("could not retrieve canvas 2D");
		return;
	}
	// Create a new image.
	var img = new Image();
	
	// Once it's loaded draw the image on the canvas.
	img.addEventListener('load', function () {
		var width = img.naturalWidth; // this will get the width of the image
		var height = img.naturalHeight; // 
		
		$('#myCanvas').attr({
			"width": width,
			"height": height
		});
		
		// Original resolution: x, y.
		//context.drawImage(this, 0, 0);

		// Now resize the image: x, y, w, h.
		// Five arguments: the element, destination (x,y) coordinates, and destination
		// width and height (if you want to resize the source image).		
		context.drawImage(this, 0, 0, width, height);

		// Crop and resize the image: sx, sy, sw, sh, dx, dy, dw, dh.
		// Nine arguments: the element, source (x,y) coordinates, source width and
		// height (for cropping), destination (x,y) coordinates, and destination width
		// and height (resize).
		//context.drawImage(this, 8, 20, 140, 50, 0, 150, 350, 70);
	}, false);

	img.src = 'test1.jpg';
	
	
	///////////////////////////////////////////
	//Now draw a different image and get data from it, 
	//	invert the color.
	//	To prevent tainted canvas error, run on xampp
	/*
	var img2 = document.getElementById("myPic");
			var c = document.getElementById("myCanvas2");
		var ctx = c.getContext("2d");	
		
		ctx.drawImage(img2, 0, 0);
		var imgData = ctx.getImageData(0, 0, c.width, c.height);
		// invert colors
		var i;
		for (i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i] = 255 - imgData.data[i];
			imgData.data[i+1] = 255 - imgData.data[i+1];
			imgData.data[i+2] = 255 - imgData.data[i+2];
			imgData.data[i+3] = 255;
		}
		ctx.putImageData(imgData, 0, 0);
	*/
	/*
	//canvas resize has to happen first
	var width2 = img2.naturalWidth; 
	var height2 = img2.naturalHeight; 		
	$('#myCanvas2').attr({
		"width": width2,
		"height": height2
	}, function(){

		
	});	
	*/
	
	
	//Doesnt work because of tainted canvas error.x
	
	var elem2 = document.getElementById('myCanvas2');
	if (!elem || !elem.getContext) {
		console.log("could not get canvas2 element.");
		return;
	}
	
	
	var context2 = elem2.getContext('2d');
	if (!context2 || !context2.getImageData || !context2.putImageData || !context2.drawImage) {
		console.log("could not retrieve canvas2 2D");
		return;
	}
	// Create a new image.
	var img2 = new Image();
	//var img2 = document.getElementById('myPic');
	
	
	//var myImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	//window.location.href = myImage;
	
	//this will count the number of pixels
	var counter = 0;
	
	img2.addEventListener('load', function () {
		//Change the canvas to the image width and height
		var width2 = img2.naturalWidth; // this will get the width of the image
		var height2 = img2.naturalHeight; // 		
		$('#myCanvas2').attr({
			"width": width2,
			"height": height2
		});		
		var x = 0, y = 0;
		
		// Draw the image on canvas.
		context2.drawImage(this, x, y);
		
		
		
		// Get the pixels.
		//	This part wont work because of a tainted canvas 
		// error.  
		var imgd = context2.getImageData(x, y, this.width, this.height);
		var pix = imgd.data;
		
		
		
		// Loop over each pixel and invert the color.
		for (var i = 0, n = pix.length; i < n; i += 4) {
			pix[i  ] = 255 - pix[i  ]; // red
			pix[i+1] = 255 - pix[i+1]; // green
			pix[i+2] = 255 - pix[i+2]; // blue
			// i+3 is alpha (the fourth element)
			counter = counter + 1;
		}
		//console.log(counter);
		// Draw the ImageData object.
		context2.putImageData(imgd, x, y);
		
		//update the number of pixels
		$('#pixNumber').text(counter);
		console.log(counter);
	
		
	}, false);
	img2.src = 'test2.jpg';	
	//img2.src = document.getElementById('myPic').src;
	
}, false);



















