
function generatePassword() 
{
	const passwordSettings = getPasswordSettings();


	return "test";
}

document.querySelector("#generate").addEventListener("click",
	function()
	{
		const password = generatePassword();
		document.querySelector("#password").value = password;
	});