var str, opc;
var M = [[]]; // Message block

function magia(pal, opcion){
    str = pal;
    if(opcion.localeCompare("Encriptar") == 0) caesarShift(pal,2);
    if(opcion.localeCompare("Desencriptar") == 0) caesarShift(pal,-2);
}

function caesarShift(str, amount) {

    if((str.length < 5) || (str.length > 20 )){
    		alert('Palabra entre cinco y veinte caracteres');
    }
    else {
    	// Wrap the amount
    if (amount < 0)
    	return caesarShift(str, amount + 26);

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i ++) {

    	// Get the character we'll be appending
    	var c = str[i];

    	// If it's a letter...
    	if (c.match(/[a-z]/i)) {

    		// Get its code
    		var code = str.charCodeAt(i);

    		// Uppercase letters
    		if ((code >= 65) && (code <= 90))
    			c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

    		// Lowercase letters
    		else if ((code >= 97) && (code <= 122))
    			c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

    	}

    	// Append
    	output += c;
    }
    	document.getElementById("result").innerHTML = output;
    	//return output;
    	
    }
}

/*
horizontalShiftMatrix function:
    - Invokes the whole horizontal shift process of the matrix
*/
function horizontalShiftMatrix() {
    getNumberRowShifts();
}

/* 
getNumberRowShifts function:
    - Calculate the number of shifts of a row "i" according to the value obtained evaluating a polynomial function in "i"
    - Then calls function rowShift to do the proper rowShift
*/
function getNumberRowShifts() {
    var suma;
    for (var i = 0; i < 4; i++) {
        var n;
        if (i % 2 == 0) { // Even
            n = Math.pow(i^2) - 1;
        }
        else { // Odd
            n = Math.poth(i^2) - 3*i + 2;
        }
        rowShift(n, i);
    }
}

/* 
rowShift function:
    - Do the horizontal shift of the row i
        n = number of shifts
        row_index = row index of the matrix to be shifted
*/
function rowShift(n, row_index) {
    var auxM = M;
    if (n > 0) {
        for (var j = 0; j < n; j++) {
            var new_colum_index = (j + n) % 4;
            M[row_index, new_colum_index] = auxM[row_index, j]; 
        }
    }
    else if (n < 0) {
        for (var j = 0; j < n; j++) {
            var new_colum_index = (j + (4-n)) % 4;
            M[row_index, new_colum_index] = auxM[row_index, j]; 
        }
    }
}

/*
    buildMatrix function:
        - Builds the Matrix based on a msg (string)
*/
function buildMatrix(msg) {
    var iM = 0; // row of M
    var auxRow = [];
    for (var i = 0; i  < msg.length; i++) {
        if (i % 3 == 0) { // Each 4 characters adds the array to the M array to form the Matrix
            M[iM].push(auxRow);
            iM++;
            auxRow = []; 
        }
        auxRow.push(msg.charAt(i));
    }
}