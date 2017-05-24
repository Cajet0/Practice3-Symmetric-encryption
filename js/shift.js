	var str, opc;

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
