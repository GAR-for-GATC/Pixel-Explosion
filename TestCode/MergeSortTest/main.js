window.addEventListener('load', function () {
	mergeSort();
});
//Next get pixel data into an array holding arrays of different
//	pixel colour data.  
//	The write functions to sort these by different parameters.

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

//This function needs to sort all the colour 
//	pixels into the array of arrays.
//Bottom-Up mergesort algorithm.  instead of 
//	recursively calling the merge and sort function, 
//	the whole array will be divided up into pairs,
//	then those two are sorted, then the next two,
//	until the end is reached.  Then groups of
//	4 are compared and the first two are merged
//	with the second two, and this continues to the 
//	end, and goes on until the whole list is sorted.
function mergeSort(){
	var unsorted = [219, 39, 80, 226, 8, 45, 39, 179, 84, 56];
	var sorted = [];
	
	//if 1, then the length is odd.
	var isOdd = unsorted.length % 2;
	
	//calculate the number of times a merge will have to happen.
	//	2^n items will result in n merges.  if there's 2 items, then
	//	a merge will happen once, if 4 items, a merge will occur twice
	//	if the number is off, find how many merges there should be.
	// #items = 2^n, so do (items)^.5 = n, or the number of merges that
	//	there should be - 1.  if the number has a decimal, there should
	//	be another merge.  
	var n = Math.floor(Math.sqrt(unsorted.length)) + 1; //this is the number of merges that need to be done.
	
	//this tells how many items should be gotten at a time.
	//	will increase by 2^n each iteration
	var merge = 1;
	
	//this is used to count the position in the array
	var counter = 0;
	
	//variables used for merging.
	var left, right;
	
	for(i=0; i<n; i++){
		console.log("Big loop " + Math.pow(2, merge));
		//loop through the array.  The number of times it
		//	goes through an array is determined by the bubble
		//	being compared.
		for(j=0; j<unsorted.length; j = j+Math.pow(2, merge)){
			//for each item in the bubble, compare them and then 
			//re-arrange them.
			
			for(k=0; k<Math.pow(2, merge); k++){				
				///////////
				//Merge goes here
				left = counter;
				//if the right-most end is less than the max length of
				//	the array
				if((counter + Math.pow(2, merge)) < unsorted.length){
					right = counter + Math.pow(2, merge);
				}
				else{
					right = unsorted.length - counter;
				}
				
				console.log(k +" counter: " + counter + " left: " + left + " right: " + right);
				//
				///////////
				counter = counter + 1;
				if(counter >= unsorted.length){
					break;
				}
			}
			
			
		}
		
		counter = 0; //reset counter
		merge = merge+1;
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













