

function validateForm() {
	// (Can't use `typeof FileReader === "function"` because apparently
	// it comes back as "object" on some browsers. So just see if it's there
	// at all.)
	if (!window.FileReader) {
		console.log("The file API isn't supported on this browser yet.");
		return false;
	}
	
	console.log('Form submitted!');
	var inpObj = document.getElementById('inputImage');
	if (!inpObj.value) {
		console.log("you didnt enter an image");
	}
	else if (!inpObj.files) {
		console.log("This browser doesn't support the `files` property of file inputs.");
	}
	else if (!inpObj.files[0]) {
		console.log("Please select a file before clicking 'Submit'");
	}
	else {
		file = inpObj.files[0];
		console.log("File " + file.name + " is " + file.size + " bytes in size");
		//if larger than 5Mbytes
		if(file.size > 5120000){
			console.log("the file is larger than 5Mbytes(5,120,000 bytes)!");
		}
		
		displayImage(inpObj);
	}		
	return false;
}

function displayImage(input){
	
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			var img2 = new Image();
			img2.src = e.target.result
			
			var elem2 = document.getElementById('myCanvas2');
			if (!elem2 || !elem2.getContext) {
				console.log("could not get canvas2 element.");
				return;
			}	
			var context2 = elem2.getContext('2d');
			if (!context2 || !context2.getImageData || !context2.putImageData || !context2.drawImage) {
				console.log("could not retrieve canvas2 2D");
				return;
			}
			console.log("cocks2");
			var width2 = img2.naturalWidth; 
			var height2 = img2.naturalHeight; 		
			$('#myCanvas2').attr({
				"width": width2,
				"height": height2
			});
			var x = 0, y = 0;
			context2.drawImage(img2, x, y);
			
		};
		
		reader.readAsDataURL(input.files[0]);
	}
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah')
				.attr('src', e.target.result)
				.width(150)
				.height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}













