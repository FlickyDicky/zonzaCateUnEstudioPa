const display = document.querySelector("input[data-display]");
const phoneLog = document.querySelector(".log");
const redialButton = document.querySelector("button[data-redial]");
const displayAndTimer = document.querySelector(".row[data-display-timer]");
const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
let sec = 0;

spanishNumber = /^[89]\d{8}$/; // Phone numbers starting with 8 or 9

// adding the event listener to the keypad
document
    .querySelector(".container")
    .addEventListener("mousedown", function (e) {
        const key = e.target.innerHTML;
        if (key.length !== 1 || isNaN(key)) {
            switch (key) {
                case "R":
                    redial();
                    break;
                case "H":
                    if ( display.value !== "" && sec !== 0) {
                        redialButton.disabled = false;
                        clearInterval(timer);
                        sec = 0;
                        saveNumber();
                        createNewCall();
                        resetCall();
                    }
                    break;
                case "Call":
                    validateNumber(display, "spanishNumber");
                    break;
            }
        } else {
            display.value += key;
        }
    });

function saveNumber() {
    sessionStorage.setItem("number", display.value);
}

//redial function
function redial() {
    if (sessionStorage.getItem("number") !== null) {
        display.classList.remove("valid", "invalid");
        display.value = sessionStorage.getItem("number");
    } else {
        return;
    }
}

// reset call
function resetCall() {
    hoursLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
    secondsLabel.innerHTML = "00";
    display.value = "";
    display.classList.remove("valid");
}

// create a new call
function createNewCall() {
    let newCall = displayAndTimer.cloneNode(true);
    newCall.classList.add("lastCall");
    phoneLog.appendChild(newCall);
}

// validate the number and start the timer if valid
function validateNumber(field) {
    if (spanishNumber.test(field.value)) {
        redialButton.disabled = true;
        field.className = "valid";
        startTimer();
    } else {
        field.className = "invalid";
    }
}

// start timer
function startTimer() {
    timer = setInterval(function () {
        secondsLabel.innerHTML = pad(++sec % 60);
        minutesLabel.innerHTML = pad(parseInt(sec / 60, 10));
        hoursLabel.innerHTML = pad(parseInt(sec / 3600, 10));
    }, 1000);
}

function pad(val) {
    return val > 9 ? val : "0" + val;
}

