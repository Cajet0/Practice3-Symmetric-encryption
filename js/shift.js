/////////////// REMINDER ///////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANY DIRECTLY COPY YOU MAKE OF AN OBJECT WILL BE A REFERENCE TO THE OBJECT, SO THINK BEFORE PROGRAM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var str, opc, pal;
var output = "";
var c="";
var M = []; // Message block
var auxM = [] ; // Copy of matrix M to make the horizonal shift

function borra(){
    document.getElementById("palabra").value = "";
    $("#result").text("Result Here");
    var M = [];
    for(var i=0; i<4; i++) {
        M[i] = new Array(4);
    }
    output = "";
}

function magia(){
    var M = [];
    for(var i=0; i<4; i++) {
        M[i] = new Array(4);
    }
    output = "";
    str = document.getElementById('palabra').value;
    opc = document.getElementById('opcion').value;

    if(opc == "Encrypt") 
        {
            //alert("Encriptar");
            //caesarShift(str,2);
            //CICLO FOR PARA RECORRER LA PALABRA
            for(var i =0; i < str.length ; i++){
                if(i%2 != 0){
                    //alert(str.charAt(i));
                    //alert("Position : "+parseInt(i/4)+","+parseInt(i%4))
                    var sum = parseInt(i/4) + parseInt(i%4); 					//SUMA RENGLON´+ COLUMNA
                    //alert("Par Suma: "+sum);
                    var tamaño = Math.pow(sum,2) - 2*sum; 						//FUNCION POLINOMIAL DEFINIDA PREVIAMENTE
                    //alert("Par TamShift: " +tamaño);
                    var x = caesarShift(str.charAt(i),parseInt(tamaño%15)); 	//MANDAS LLAMAR EL CAESAR SHIFT
                    //alert("Par char ya encriptado:"+x);
                    M[parseInt(i/4)][parseInt(i%4)] = x 						//Asignas el character ya coificado a la matriz
                }
                else{
                    //alert(str.charAt(i));
                    //alert("Position : "+parseInt(i/4)+","+parseInt(i%4))
                    var sum = parseInt(i/4) + parseInt(i%4);					//SUMA RENGLON´+ COLUMNA
                    //alert("Impar Suma: " +sum);
                    var tamaño = Math.pow(sum,2) - 3*sum + 2;					//FUNCION POLINOMIAL DEFINIDA PREVIAMENTE
                    //alert("Impar TamShift: "+tamaño);
                    var y = caesarShift(str.charAt(i),parseInt(tamaño%15));		//MANDAS LLAMAR EL CAESAR SHIFT
                    //alert("Impar char ya encriptado: "+y);
                    M[parseInt(i/4)][parseInt(i%4)] = y;						//Asignas el character ya coificado a la matriz
                }
            }
            alert("Array: "+M);
    }
    if(opc == "Decrypt") 
        {

        }

    $("#result").text(output);
}

/**
The function receives  a letter and gets the Ascii number asociated to that character, then made the change (shift)
based on the amount parameter.
**/

function caesarShift(str, amount) {
    // Get its code
    c="";
    var code = str.charCodeAt(0);
    //alert("Char en numero "+ code);
    //alert("Amount Caesar Shift: "+amount);
            if ((code >= 32) && (code <= 64))
            c = String.fromCharCode(((code - 32 + amount) % 33) + 32);	

            // Uppercase letters
             if ((code >= 65) && (code <= 90))
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

            // More Characters
             if ((code >= 91) && (code <= 96))
                c = String.fromCharCode(((code - 91 + amount) % 6) + 91);

            // Lowercase letters
             if ((code >= 97) && (code <= 122))
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

    //alert("Codigo ya encriptado: "+c)
    output += c;

    return c;
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
    for (var i = 0; i<4; i++) {
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

/*
//buildMatrix("hola a todos"); // Creates matrix
buildMatrix("jesus oliver dan");
horizontalShiftMatrix();
//transpuesta(M);
console.log(M);
console.log(auxM);
*/