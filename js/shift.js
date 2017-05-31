/////////////// REMINDER ///////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANY DIRECTLY COPY YOU MAKE OF AN OBJECT WILL BE A REFERENCE TO THE OBJECT, SO THINK BEFORE PROGRAM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var str, opc;
var M = []; // Message block
var auxM = [] ; // Copy of matrix M to make the horizonal shift

/*function magia(pal, opcion){
    str = pal;
    if(opcion.localeCompare("Encriptar") == 0) caesarShift(pal, 2);
    if(opcion.localeCompare("Desencriptar") == 0) caesarShift(pal, -2);
}*/

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
    - Calculate the number of shifts of a row "i" according to the value obtained evaluating a specific polynomial function in "i" depending on if its odd or even
    - Then calls function rowShift to do the proper rowShift
*/
function getNumberRowShifts() {
    for (var i = 0; i < 4; i++) {
        var n;
        if (i % 2 == 0) { // Even
            n = Math.pow(i, 2) - 1;
            //console.log("even");
        }
        else { // Odd
            n = Math.pow(i, 2) - 3*i + 2;
            //console.log("odd");
        }
        //console.log("soy"+ n);
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
    if (n > 0) {
        for (var j = 0; j < 4; j++) {
            var new_colum_index = (j + n) % 4;
            //console.log("n>0 " + new_colum_index);
            //console.log(M);
            //console.log(row_index);
            M[row_index][new_colum_index] = auxM[row_index][j]; 
        }
    }
    else if (n < 0) {
        for (var j = 0; j < 4; j++) {
            var new_colum_index = (j + (4+n)) % 4;
            //console.log("n<0"+ " "+ new_colum_index);
            M[row_index][new_colum_index] = auxM[row_index][j]; 
        }
    }
}

/*
    buildMatrix function:
        - Builds the Matrix based on a msg (string)
*/
function buildMatrix(msg) {
    var msgIndex = 0;
    for(var i = 0; i < 4; i++) {
        M[i] = [];
        for(var j=0; j < 4; j++) {
            if (msgIndex < msg.length) {
                M[i][j] = msg.charAt(msgIndex);
            }
            else {
                M[i][j] = " ";
            }
            msgIndex++;
        }
    }
    for (var i = 0; i<4; i++) {
        auxM[i] = [];
        for (var j = 0; j < 4; j++) {
            auxM[i][j] = M[i][j];
        }
    }
    console.log(auxM);
}

/* transpuesta function:
    - Builds the transposed matrix based on the matrix M
*/
function transpuesta(matrix) {
    var transp = new Array(4);
    // create the matrix
    for(var i=0; i<4; i++) {
        transp[i] = new Array(4);
    }
    // fill the matrix
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            transp[i][j] = matrix[j][i];
        }
    }
    M = transp;
}

//buildMatrix("hola a todos"); // Creates matrix
buildMatrix("jesus oliver dan");
horizontalShiftMatrix();
//transpuesta(M);
console.log(M);
console.log(auxM);