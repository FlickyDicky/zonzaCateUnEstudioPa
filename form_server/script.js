const regEx = {
    name: /^[A-Z]/, // Should start with an uppercase letter
    surName: /^[A-Z][a-z]+\s[A-Z][a-z]+$/, // Should start with uppercase letters separated by a space
    idCard: /^[xyz]?\d{8}[a-z]$/i, // Optional 'x', 'y', or 'z' at the beginning, followed by 8 digits and ending with a lowercase letter (case insensitive)
    birthDate: /^([012][0-9]|3[01])\/0[1-9]|1[012]\/\d{4}$/, // Format dd/mm/yyyy
    postalCode: /^([01234][1-9]|5[0-2])\d{3}$/, // Values between 01000 and 52999
    eMail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Basic email validation
    spanishNumber: /^[89]\d{8}$/, // Phone numbers starting with 8 or 9
    mobileNumber: /^[67]\d{8}$/, // Phone numbers starting with 6 or 7
    iban: /^ES\d{22}$/, // Spain format, starting with 'ES' followed by 22 digits
    cardNumber: /^\d{16}$/, // 16 alphanumeric characters
    password: /^[a-zA-Z0-9]{11}[@_\.\-]$/, // Alphanumeric characters and certain symbols, length 11
};

const inputs = document.querySelectorAll("input[data-user]");
const submitButtons = document.querySelectorAll("input[data-submit]");

// attach input events to inputs
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        let userPassword = password.value;
        let repeatedPassword = passwordRepeat.value;

        if (e.currentTarget.name === "passwordRepeat") {
            // validate the repeated password if we are currently targeting it
            validatePassword(userPassword, e.currentTarget.value);
        } else {
            // validate the value against the regex
            validate(e.currentTarget, regEx[e.currentTarget.name]);
            // if we are currently targeting the first instance of password,
            // we want to compare it to the repeatedPassword
            if (
                e.currentTarget.name === "password" &&
                repeatedPassword !== ""
            ) {
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
    submitButtons.forEach((b) => {
        b.disabled = validInputs.length !== 12;
    });
}

// validation function for comparing regex
function validate(field, regex) {
    document.querySelector(".success").innerHTML = "";
    document.querySelector("form").style.borderColor = "rgb(114, 168, 250)";
    if (regex && regex.test && typeof regex.test === "function") {
        if (regex.test(field.value)) {
            field.className = "valid";
        } else {
            field.className = "invalid";
        }
    }
}

// apply success styles
function applySuccesStyles() {
    setTimeout(() => {
        inputs.forEach((input) => {
            input.value = "";
            input.classList.remove("valid");
        });
        document.querySelector(".success").innerHTML =
            "User created succesfully";
        document.querySelector(".success").style.opacity = 1;
        document.querySelector("form").style.borderColor = "green";
    }, 10);
}

// validate password similarities
function validatePassword(password, repeatedPassword) {
    const passwordsMatch = password === repeatedPassword;
    const isLengthValid = repeatedPassword.length !== 0;
    const isValid = passwordsMatch && isLengthValid;
    passwordRepeat.classList.toggle("valid", isValid);
    passwordRepeat.classList.toggle("invalid", !isValid);
}

// Prepare the user object to save and manage the success
function preparedUser() {
    let data = [];
    inputs.forEach((input) => {
        data.push(input.value);
    });
    applySuccesStyles();
    return data;
}

// save the input data to an array and in localStorage
function saveLocal() {
    localStorage.setItem("credentials", JSON.stringify(preparedUser()));
}

// retrieve the data from localStorage
function getUserLocalstorage() {
    let i = 0;
    let data = JSON.parse(localStorage.getItem("credentials"));
    inputs.forEach((input) => {
        input.value = data[i];
        i++;
    });

    // revalidate when retrieving the data
    inputs.forEach((input) => {
        validate(input, regEx[input.name]);
        validatePassword(password.value, passwordRepeat.value);
        enableButton();
    });
}

// Retrieve the data
function insertDataInInput(userData) {
    let i = 0;
    inputs.forEach((input) => {
        input.value = userData[i];
        validate(input, regEx[input.name]);
        i++;
        // revalidate passwords when retrieving the data
        setTimeout(() => {
            validatePassword(password.value, passwordRepeat.value);
            enableButton();
        }, 10);
    });
}

// send request
function sendRequest(request) {
    request.send();
    request.onerror = function () {
        console.log("Connection error");
    };
}

// retrieve the data from our user.json file
function getUserJson() {
    let newRequest = new XMLHttpRequest();
    newRequest.open("GET", "http://etilico.com/user.json");
    newRequest.onload = function () {
        if (newRequest.status >= 200 && newRequest.status < 400) {
            const ourData = JSON.parse(newRequest.responseText);
            let userData = Object.values(ourData[0]);
            insertDataInInput(userData);
        }
    };
    sendRequest(newRequest);
}

// get user from session storage

// retrieve the data from our user.php file
function getUserPhp() {
    let newRequest = new XMLHttpRequest();
    newRequest.open("GET", "http://etilico.com/user.php", true);
    newRequest.onreadystatechange = function () {
        const storedUser = sessionStorage.getItem("userData");

        if (storedUser) {
            const myObj = JSON.parse(storedUser);
            // Use the data as needed
            let userData = Object.values(myObj);

            insertDataInInput(userData);
        } else if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            let userData = Object.values(myObj);
            insertDataInInput(userData);
        }
    };
    sendRequest(newRequest);
}

// post user to php file
function postUserPhp() {
    var newRequest = new XMLHttpRequest();
    newRequest.open("POST", "http://etilico.com/user.php", true);
    let user = "user=" + JSON.stringify(preparedUser());

    //add an HTTP header with setRequestHeader(). Specify the data you want to send in the send() method:
    newRequest.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    newRequest.onload = function () {
        console.log(JSON.stringify(preparedUser()));
        sessionStorage.setItem("userData", JSON.stringify(preparedUser()));
    };

    newRequest.send(user);
}

// get user from userdb.php from a databse
function getUserDb(dni) {
    if (dni == "") {
        document.querySelector(".warning").innerHTML = "You must insert an ID";
        document.querySelector(".warning").style.opacity = 1;
        document.querySelector("form").style.borderColor = "red";
        return;
    }
    document.querySelector(".warning").innerHTML = "";
    document.querySelector("form").style.borderColor = "rgb(114, 168, 250)";
    let newRequest = new XMLHttpRequest();
    newRequest.open("GET", "http://etilico.com/userdb.php?q=" + dni, true);
    newRequest.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const myObj = JSON.parse(this.responseText);
                let userData = Object.values(myObj[0]);
                insertDataInInput(userData);
            } else {
                console.error("Error parsing JSON:", error);
                console.error(
                    "Error: " + this.status + " - " + this.statusText
                );
            }
        }
    };
    sendRequest(newRequest);
}

// Post user to a Database
function postUserDb() {
    var newRequest = new XMLHttpRequest();
    newRequest.open("POST", "http://etilico.com/userdb.php", true);
    let user = "user=" + JSON.stringify(preparedUser());

    //add an HTTP header with setRequestHeader(). Specify the data you want to send in the send() method:
    newRequest.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
    );

    newRequest.onload = function () {
        console.log(this.responseText);
    };

    newRequest.send(user);
}
