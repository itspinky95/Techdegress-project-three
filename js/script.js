console.log(`This is a test`);
// Create a variable to reference the “Name” <input type="text"> element and log the variable out to the console to ensure the correct element is being referenced.
const nameInput = document.getElementById(`name`);
console.log(nameInput);
// Use the variable and the .focus() method to add the focus state to the element.
nameInput.focus();
