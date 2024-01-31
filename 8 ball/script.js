refresh = document.createElement("div");
refresh.id = "refresh";
happyMsg = document.createElement("p");
happyMsg.classList.add("text-opacity-animation");
happyMsg.innerHTML = "Hello world";
happyMsgBox = document.getElementById("happy-msg");

document.getElementById("ball").addEventListener("click", function () {
  this.classList.toggle("spin-animation");
  this.classList.toggle("no-hover");
  this.removeEventListener("click", arguments.callee);
  this.parentNode.prepend(refresh);
  happyMsgBox.append(happyMsg);
  document.getElementById("refresh").addEventListener("click", function () {
    location.reload();
  });
});
