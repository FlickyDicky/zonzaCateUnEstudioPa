refresh = document.createElement("div");
refresh.id = "refresh";
happyMsg = document.createElement("p");
happyMsg.classList.add("text-opacity-animation");
happyMsgBox = document.getElementById("happy-msg");

document.getElementById("ball").addEventListener("click", function () {
    showQuote();
    happyMsg.innerHTML = "";

    this.classList.toggle("spin-animation");
    this.classList.toggle("no-hover");
    this.removeEventListener("click", arguments.callee);
    this.parentNode.prepend(refresh);
    happyMsgBox.append(happyMsg);
    document.getElementById("refresh").addEventListener("click", function () {
        location.reload();
    });
});

// Run the showQuote function when the page is loaded
window.onload = showQuote;

// showQuote function to show random quote from API
function showQuote() {
    fetch("https://api.adviceslip.com/advice")
        .then((response) => response.json())
        .then((data) => data.slip)
        .then((data) => {
            happyMsg.innerHTML = data.advice;
        })
        .catch((error) => {
            alert(`Error ${error}`);
        });
}
