window.addEventListener('load', function () {
	var unsorted = [219, 39, 80, 226, 8, 45, 39, 179, 84, 56, 5];
	//first 100 elements from an image.
	var testArray =[224, 223, 226, 001, 224, 224, 226, 002, 223, 223, 225, 003, 
					223, 223, 225, 004, 223, 223, 225, 005, 223, 223, 225, 006, 
					222, 222, 224, 007, 222, 222, 224, 008, 223, 223, 225, 009, 
					223, 223, 225, 010, 223, 223, 225, 011, 225, 225, 227, 012, 
					226, 226, 228, 013, 226, 226, 228, 014, 226, 226, 228, 015, 
					225, 225, 226, 016, 225, 225, 224, 017, 225, 225, 225, 018, 
					225, 225, 225, 019, 224, 224, 224, 020, 223, 224, 224, 021, 
					222, 222, 222, 022, 223, 224, 223, 023, 223, 223, 223, 024, 
					224, 224, 224, 025];
	var newArray = [];
	for(i=0; i<testArray.length; i=i+4){
		//turns 23, 15, 12 into 231512
		newArray.push( [Number('' + testArray[i] + testArray[i+1] + testArray[i+2]),
						testArray[i+3] ])
		
	}
	console.log("horse" + newArray[0][0])
	for(i=0; i<10; i++){
		console.log(newArray[i]);	
	}			
	console.log(heapSort2(newArray));
	for(i=0; i<10; i++){
		console.log(newArray[i]);	
	}	
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
		sortImage(inpObj);
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
			console.log("horse2");
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

//sorts the image into different colours
function sortImage(input){
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			var img2 = new Image();
			img2.src = e.target.result
			
			var elem2 = document.getElementById('myCanvas3');
			if (!elem2 || !elem2.getContext) {
				console.log("could not get canvas2 element.");
				return;
			}	
			var context2 = elem2.getContext('2d');
			if (!context2 || !context2.getImageData || !context2.putImageData || !context2.drawImage) {
				console.log("could not retrieve canvas2 2D");
				return;
			}
			console.log("horse2");
			var width2 = img2.naturalWidth; 
			var height2 = img2.naturalHeight; 		
			$('#myCanvas3').attr({
				"width": width2,
				"height": height2
			});
			var x = 0, y = 0;
			context2.drawImage(img2, x, y);
			
			var imgd = context2.getImageData(x, y, img2.width, img2.height);
			var pix = imgd.data;
			var bleh = [];
			
			for(i=0; i<100; i++){
				bleh.push(pix[i]);
			}
			console.log(bleh);
			
			//first we have to push the first three values together, 
			//and stick each 4th value into a separate array.  the position
			//of the value in the fourth has to be mapped to the first.
			// and sorted too.
			//steps:
			//	1) take the png image data and put it in a different array full of arrays.
			//	the first element in the mini arrays is the RGB values in the 
			//	like this 23, 15, 12 --> 231512 and the second is the alpha value.
			//	then modify the heap sort to sort only the first value in the array,
			//	but move the whole thing.
			
			//pix = heapSort(pix);
			
			/*
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i  ] = 255 - pix[i  ]; // red
				pix[i+1] = 255 - pix[i+1]; // green
				pix[i+2] = 255 - pix[i+2]; // blue
				// i+3 is alpha (the fourth element)
				
			}
			*/
			context2.putImageData(imgd, x, y);
		
		};
		
		reader.readAsDataURL(input.files[0]);
	}
	
}

var quickSort = (function () {

    function partition(array, left, right) {
        var cmp = array[right - 1],
            minEnd = left,
            maxEnd;
        for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (array[maxEnd] <= cmp) {
                swap(array, maxEnd, minEnd);
                minEnd += 1;
            }
        }
        swap(array, minEnd, right - 1);
        return minEnd;
    }

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }

    function quickSort(array, left, right) {
        if (left < right) {
            var p = partition(array, left, right);
            quickSort(array, left, p);
            quickSort(array, p + 1, right);
        }
        return array;
    }

    return function (array) {
        return quickSort(array, 0, array.length);
    };
}());


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
/*
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
*/
/*
function mergeSort(){
	var unsorted = [219, 39, 80, 226, 8, 45, 39, 179, 84, 56, 5];
	var sorted = [];
	var sorted = new Array(unsorted.length).fill(0);
	//sorted.apply(null, Array(unsorted.length)).map(Number.prototype.valueOf,0);
	console.log(unsorted);
	console.log(sorted);
	
	var n = unsorted.length;
	
	
	var left, middle, right;
	
	//go through each bubble, starting with
	//	1, then 2, then, 4, in an 2^x way.
	for(width=1; width < n; width = 2*width){
		//this counts the number of merges that are
		//	needed to be done to the groups.
		for(i=0; i<n; i=i+(2*width)){
			
			//merge two things here:
			/////////////////			
			
			
			
			//divide the total width in two sets for comparison
			//left is the start of set 1, middle-1 is the end of set 2
			//middle is the start of set 2, end is the end of set 2
			left = i;
			middle = i + (width/2);
			right = i + width;
			console.log("width:" + width + " i:" + i +
						" left:" + left + " middle:" + middle + " right:" + right);
			for(j=left; j<right; j++){
				console.log(unsorted[j]);
				
			}
			
			/////////////////
			//end of merge
		}
		
		
		//////////////////
	}
	
	console.log(unsorted);
	console.log(sorted);
	
}
*/
/*
var mergeCounter = 0;
function mergeSort(arr)
{
	
    if (arr.length < 2)
        return arr;
 
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

	if(mergeCounter%100000 == 0){
		console.log("looping: " + mergeCounter);	
	}
	mergeCounter = mergeCounter+1;
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
	
	
    return result;
}
*/
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



/* Heapsort */

function heapSort(array) {
        var size = array.length,
            temp;
        buildMaxHeap(array);
        for (var i = array.length - 1; i > 0; i -= 1) {
            temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            size -= 1;
            heapify(array, 0, size);
			if(i%100000 == 0){
				console.log(i);
			}
        }
        return array;
    }

    function heapify(array, index, heapSize) {
        var left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;

        if (left < heapSize && array[left] > array[index])
            largest = left;

        if (right < heapSize && array[right] > array[largest])
            largest = right;

        if (largest !== index) {
            var temp = array[index];
            array[index] = array[largest];
            array[largest] = temp;
            heapify(array, largest, heapSize);
        }
    }

    function buildMaxHeap(array) {
        for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
            heapify(array, i, array.length);
        }
        return array;
    }


/* Heapsort */
//Modify heapsort to count the item in the first postition
//	in an inner array, but still move the whole array.
function heapSort2(array) {
	var size = array.length,
		temp;
	buildMaxHeap2(array);
	for (var i = array.length - 1; i > 0; i -= 1) {
		temp = array[0];
		array[0] = array[i];
		array[i] = temp;
		size -= 1;
		heapify2(array, 0, size);
		if(i%100000 == 0){
			console.log(i);
		}
	}
	return array;
}

function heapify2(array, index, heapSize) {
	var left = 2 * index + 1,
		right = 2 * index + 2,
		largest = index;

	if (left < heapSize && array[left] > array[index] )
		largest = left;

	if (right < heapSize && array[right] > array[largest])
		largest = right;

	if (largest !== index) {
		var temp = array[index];
		array[index] = array[largest];
		array[largest] = temp;
		heapify2(array, largest, heapSize);
	}
}

function buildMaxHeap2(array) {
	for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
		heapify2(array, i, array.length);
	}
	return array;
}









