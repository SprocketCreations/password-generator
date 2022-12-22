// These are the characters used in the password generation
// They are divided into 4 arrays, 1 for each selectable group
const VALID_LOWERCASE_CHARACTERS = Array.from("abcdefghijklmnopqrstuvwxyz");
const VALID_UPPERCASE_CHARACTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const VALID_NUMERIC_CHARACTERS = Array.from("1234567890");
const VALID_SPECIAL_CHARACTERS = Array.from(" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");

// This returns the user's required password length via the DOM
// If the user enters nothing, it returns NaN, so isNan can be used
// to verify output.
function getPasswordLength()
{
	/** 
	const DOM_PASSWORD_LENGTH = document.getElementById("password-length");

	const value = DOM_PASSWORD_LENGTH.value;
	if(value === '')
		return NaN;
	return Number(value);
	/**/

	let response;
	do {
		response = prompt("Please enter your password length:\n(must be between 8 and 128)");
		response = Number(response);
	} while(isNaN(response) || response < 8 || response > 128);

	return response;
}

// Returns an object with 4 bools dictating the user's required charsets
function getPasswordSettings()
{
	/**
	const DOM_INCLUDE_LOWERCASE = document.getElementById("include-lowercase");
	const DOM_INCLUDE_UPPERCASE = document.getElementById("include-uppercase");
	const DOM_INCLUDE_NUMERIC = document.getElementById("include-numeric");
	const DOM_INCLUDE_SPECIAL = document.getElementById("include-special");

	const settings = {};

	settings.lowercase = DOM_INCLUDE_LOWERCASE.checked;
	settings.uppercase = DOM_INCLUDE_UPPERCASE.checked;
	settings.numeric = DOM_INCLUDE_NUMERIC.checked;
	settings.special = DOM_INCLUDE_SPECIAL.checked;

	return settings;
	/**/

	const settings = {};

	while(true) {
		settings.lowercase = confirm("Would you like lowercase characters in your password?\nOk = Yes, Cancel = No");
		settings.uppercase = confirm("Would you like uppercase characters in your password?\nOk = Yes, Cancel = No");
		settings.numeric = confirm("Would you like numeric characters in your password?\nOk = Yes, Cancel = No");
		settings.special = confirm("Would you like special characters in your password?\nOk = Yes, Cancel = No");

		if(verifySettings(settings))
			break;
		
		alert("Please select at least one character group.");
	}

	return settings;
}

// Returns false if no charsets have been required
function verifySettings(settings)
{
	//Object.entries returns an array of pairs...
	const entries = Object.entries(settings);
	for(let i = 0; i < entries.length; ++i)
	{
		//...So we need to access the value with [1]
		if(entries[i][1])
			return true;
	}
	return false;
}

// Merges the charsets from the top of this file
// into one charset according to the user's
// required character sets
function getCharset(settings)
{
	let charset = [];

	if(settings.lowercase)
		charset = charset.concat(VALID_LOWERCASE_CHARACTERS);
	if(settings.uppercase)
		charset = charset.concat(VALID_UPPERCASE_CHARACTERS);
	if(settings.numeric)
		charset = charset.concat(VALID_NUMERIC_CHARACTERS);
	if(settings.special)
		charset = charset.concat(VALID_SPECIAL_CHARACTERS);

	return charset;
}

// Generates a password according to the user's settings
// Throws 1 if the user has invalid password settings
// Throws 2 if the user has given an invalid length
function generatePassword() 
{
	const passwordSettings = getPasswordSettings();
	const passwordLength = getPasswordLength();
	
	const CHARSET = getCharset(passwordSettings);
	const CHAR_ARRAY = [];
	//For each character in our new password:
	for(let i = 0; i < passwordLength; ++i)
	{
		//Pick a random character from the charset.
		let char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
		CHAR_ARRAY[i] = char;
	}

	return CHAR_ARRAY.join("");
}

// Creates an event listener on the submit button
// that fills the output field with the generated password
// or displays an alert if an issue is encountered.
document.querySelector("#generate").addEventListener("click",
	function()
	{
		const password = generatePassword();
		document.querySelector("#password").value = password;
		
	});