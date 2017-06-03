	var str, opc, pal;
	var output = "";
	var c="";
	//var M = new Array(4) ; // Message block

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


