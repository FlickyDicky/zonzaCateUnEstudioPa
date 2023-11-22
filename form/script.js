const regEx = {
    name: /^[A-Z]/, // Should start with an uppercase letter
    surName: /^[A-Z][a-z]+\s[A-Z][a-z]+$/, // Should start with uppercase letters separated by a space
    idCard: /^[xyz]?\d{8}[a-z]$/i, // Optional 'x', 'y', or 'z' at the beginning, followed by 8 digits and ending with a lowercase letter (case insensitive)
    birthDate: /^([012][1-9]|3[01])\/[01][12]\/\d{4}$/, // Format dd/mm/yyyy
    postalCode: /^([01234][1-9]|5[0-2])\d{3}$/, // Values between 01000 and 52999
    eMail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email validation
    spanishNumber: /^[89]\d{8}$/, // Phone numbers starting with 8 or 9
    mobileNumber: /^[67]\d{8}$/, // Phone numbers starting with 6 or 7
    iban: /^ES\d{22}$/, // Spain format, starting with 'ES' followed by 22 digits
    cardNumber: /^\d{16}$/, // 16 alphanumeric characters
    password: /^[a-zA-Z0-9]{11}[@_\.\-]$/ // Alphanumeric characters and certain symbols, length 11
};


const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

// attach input events to inputs
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        let userPassword = password.value;
        let repeatedPassword = passwordRepeat.value;
        
        if (e.currentTarget.name === "passwordRepeat") {
            // validate the repeated password if we are currently targeting it
            validatePassword(userPassword, e.currentTarget.value);
        } 
        else {
            // validate the value against the regex
            validate(e.currentTarget, regEx[e.currentTarget.name]);
            // if we are currently targeting the first instance of password,
            // we want to compare it to the repeatedPassword
            if (e.currentTarget.name === "password" && repeatedPassword !== "") {
                validatePassword(repeatedPassword, e.currentTarget.value);
            }
        }
        // check if we can enable the button
        enableButton();
    });
});

// get valid fields, to disable button or enable the button
function enableButton() {
    const validInputs = document.querySelectorAll("input[class='valid']");
    submitCredentials.disabled = validInputs.length !== 12;
}

// validation function for comparing regex
function validate(field, regex){

    if(regex.test(field.value)){
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }

}

// validate password similarities
function validatePassword(password, repeatedPassword) {
    const passwordsMatch = password === repeatedPassword;
    const isLengthValid = repeatedPassword.length !== 0;
    const isValid = passwordsMatch && isLengthValid;
    passwordRepeat.classList.toggle('valid', isValid);
    passwordRepeat.classList.toggle('invalid', !isValid);
    
}

// save the input data to an array and in localStorage
function save() {
    let data = [];
    inputs.forEach(input => {
        data.push(input.value);
    });
    localStorage.setItem("credentials", JSON.stringify(data));
}


// retrieve the data from localStorage
function getUser() {
    let i = 0;
    let data = JSON.parse(localStorage.getItem("credentials"));
    inputs.forEach(input => {
        input.value = data[i];
        i++;
    });

    // revalidate when retrieving the data
    inputs.forEach(input => {
        validate(input, regEx[input.name]);
        validatePassword(password.value, passwordRepeat.value);
        enableButton();
    });
}