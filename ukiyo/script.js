let dropDownButton = document.querySelector(".dropdown-button");
let dropDownMenu = document.querySelector(".dropdown-menu");
let productCard = document.querySelectorAll(".card");
let forms = document.querySelectorAll("form");

// Event listeners for the dropdown menu
dropDownButton.addEventListener("click", function () {
    if (dropDownMenu.style.display === "none") {
        dropDownMenu.style.display = "block";
    } else {
        dropDownMenu.style.display = "none";
    }
});

$(document).ready(function () {
    let $carousel = $(".product-carousel");
    let $carouselItems = $carousel.children().toArray();
    let currentIndex = 0;
    let intervalId;

    // Event listeners for the carousel
    $carousel.on("mouseover", stopCarousel);
    $carousel.on("mouseout", startCarousel);

    function startCarousel() {
        intervalId = setInterval(function () {
            currentIndex = (currentIndex + 1) % $carouselItems.length;
            let newTransform = "translateX(-" + currentIndex * 100 + "%)";
            $carouselItems.forEach(function (item) {
                $(item).css("transform", newTransform);
            });
        }, 2000);
    }

    function stopCarousel() {
        clearInterval(intervalId);
    }
    // Start the carousel initially
    startCarousel();

    $(".product-card").on("click", function () {
        // Code to execute when a product card is clicked
    });
});

//prevent form submission
forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });
});

// select the login inputs to validate them via regex

// Name
// uppercase letter and rest is lowercase
const nameRegex = /^[A-Z][a-z]+$/;
// ID (national identification number)
const idRegex = /^\d{8}[a-zA-Z]$/;
// E-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Bank Account
const bankAccountRegex = /^\d{16}$/;
// Phone Number
const phoneNumberRegex = /^[67]\d{8}$/;

let loginInputs = document.querySelectorAll("input[type='text']");
let validateBtn = document.querySelector("button");
validateBtn.disabled = true;

//function to compare regex with input value
function validateInput(input, regex) {
    if (regex.test(input.value)) {
        input.style.border = "2px solid green";
    } else {
        input.style.border = "2px solid red";
    }
    
}

loginInputs.forEach((input) => {
    input.addEventListener("input", function () {
        if (input.id === "name") {
            validateInput(input, nameRegex);
        } else if (input.id === "id") {
            validateInput(input, idRegex);
        } else if (input.id === "email") {
            validateInput(input, emailRegex);
        } else if (input.id === "bankAccount") {
            validateInput(input, bankAccountRegex);
        } else if (input.id === "phoneNumber") {
            validateInput(input, phoneNumberRegex);
        }
        validateForm();
    });
});

//function to validate the form
function validateForm() {
    // Assume all inputs are invalid initially
    let allInputsValid = false;

    // Check each input
    loginInputs.forEach((input) => {
        // If any input is invalid, set the flag to true
        if (input.style.border !== "2px solid green") {
            allInputsValid = true;
        }
    });

    // Enable or disable the submit button based on the flag
    validateBtn.disabled = allInputsValid;
}
