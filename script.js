const VALID_LOWERCASE_CHARACTERS = Array.from("abcdefghijklmnopqrstuvwxyz");
const VALID_UPPERCASE_CHARACTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const VALID_NUMERIC_CHARACTERS = Array.from("1234567890");
const VALID_SPECIAL_CHARACTERS = Array.from(" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~");

function getPasswordLength()
{
	const DOM_PASSWORD_LENGTH = document.getElementById("password-length");

	const value = DOM_PASSWORD_LENGTH.value;
	if(value === '')
		return NaN;
	return Number(value);
}

function getPasswordSettings()
{
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
}

function verifySettings(settings)
{
	const entries = Object.entries(settings);
	for(let i = 0; i < entries.length; ++i)
	{
		if(entries[i][1])
			return true;
	}
	return false;
}

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

function generatePassword() 
{
	const passwordSettings = getPasswordSettings();
	if(!verifySettings(passwordSettings))
	{
		throw 1;
	}

	const passwordLength = getPasswordLength();
	if(typeof passwordLength !== "number" || isNaN(passwordLength))
	{
		throw 2;
	}

	const CHARSET = getCharset(passwordSettings);
	const CHAR_ARRAY = [];
	for(let i = 0; i < passwordLength; ++i)
	{
		let char = CHARSET[Math.floor(Math.random() * CHARSET.length)];
		CHAR_ARRAY[i] = char;
	}

	return CHAR_ARRAY.join("");
}

document.querySelector("#generate").addEventListener("click",
	function()
	{
		try
		{
			const password = generatePassword();
			document.querySelector("#password").value = password;
		}
		catch(e)
		{
			if(e === 2)
				window.alert("You must input a password length."); //handle
			else if(e === 1)
				window.alert("You must select at least one character set."); //handle
		}
	});