// Get references to HTML elements
const screen = document.getElementById("screen");
const capLockKey = document.getElementById("capLock");
const shiftKey = document.getElementById("shift");
const altGrKey = document.getElementById("altGr");

// Initialize state variables
let isShift = false;
let isAltGr = false;
let isCapLock = false;

// Add event listener to the keyboard element
document.querySelector(".keyboard").addEventListener("mousedown", function (e) {
  if (e.target.className === "key") {

    // Handle different key presses
    switch (e.target.innerText) {
      case "Shift":
        if (!isShift) {
          isShift = true;
          shiftKey.style.background = "#a1a1a1";
        }
        break;
      case "AltGr":
        if (!isAltGr) {
          isAltGr = true;
          altGrKey.style.background = "#a1a1a1";
        }
        break;
      case "Backspace":
        // Remove the last character from the screen
        screen.innerText = screen.innerText.slice(0, -1);
        break;
      case "TAB":
        // Add four non-breaking spaces to the screen
        screen.innerText += "\xa0\xa0\xa0\xa0";
        break;
      case "Enter":
        // Add a line break to the screen
        screen.innerText += "\n";
        break;
      case "Space":
        // Add a non-breaking space to the screen
        screen.innerText += "\xa0";
        break;
      case "Ctrl":
        // Handle Ctrl key (not implemented)
        break;
      case "Alt":
        // Handle Alt key (not implemented)
        break;
      case "Caps Lock":
        // Toggle the Caps Lock state and change background color
        if (!isCapLock) {
          isCapLock = true;
          capLockKey.style.background = "#a1a1a1";
        } else {
          isCapLock = false;
          capLockKey.style.background = "";
        }
        break;
      default:
        // Handle other keys
        if (isShift) {
          // If Shift is pressed, add the uppercase version of the key to the screen
          screen.innerText += e.target.innerText[0].toUpperCase();
          isShift = false;
          shiftKey.style.background = "";
        } else if (isAltGr && e.target.innerText.length > 3) {
          // If AltGr is pressed and the key has more than 3 characters, add the last character to the screen
          screen.innerText += e.target.innerText.slice(-1);
          isAltGr = false;
          altGrKey.style.background = "";
        } else {
          // For regular keys
          if (e.target.innerText.length > 2) {
            // If the key has more than 2 characters, add the second character to the screen
            screen.innerText += e.target.textContent[1];
          } else {
            // If Caps Lock is on, add the uppercase version of the key; otherwise, add the lowercase version
            if (isCapLock) {
              screen.innerText += e.target.innerText[0].toUpperCase();
            } else {
              screen.innerText += e.target.innerText[0];
            }
          }
        }
        break;
    }
  }
  });

// Add a global keydown event listener to handle keyboard input
window.addEventListener("keydown", function (event) {
  const key = event.key; 

  // Handle different key presses
  switch (key) {
    case "Backspace":
      // Remove the last character from the screen
      screen.innerText = screen.innerText.slice(0, -1);
      break;
    case "Tab":
      // Prevent the default Tab behavior and add four non-breaking spaces to the screen
      event.preventDefault();
      screen.innerText += "\xa0\xa0\xa0\xa0";
      break;
    case "Enter":
      // Add a line break to the screen
      screen.innerText += "\n";
      break;
    case " ":
      // Add a non-breaking space to the screen
      screen.innerText += "\xa0";
      break;
    default:
      // Handle other printable characters
      if (key.length === 1) {
        // Add the key to the screen if it is a single character
        screen.innerText += key;
      }
      break;
  }
});

