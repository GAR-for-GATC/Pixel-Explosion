

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
		
		
		
	}		
	return false;
}






