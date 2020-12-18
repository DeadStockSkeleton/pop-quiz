const startBtn = document.getElementById("startBtn");
let time = document.getElementById("timer");
let startScreen = document.getElementById("start");
let btn = document.querySelectorAll("button");
let pages = document.querySelectorAll("#q");
let hs = document.getElementById("hs");
let quiz = document.getElementById('quiz');

function game() {
  let seconds = 80;
  let clock = setInterval(function () {
    seconds--;
    time.textContent = seconds;
    console.log(seconds);

    if (seconds < 10) {
      time.textContent = "0" + seconds;
    }

    if (seconds === 0) {
      clearInterval(clock);
    }
  }, 1000);
}

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function (e) {
    if (this.id === "option") {
      let seconds = parseInt(time.textContent);
      if (time.textContent <= 15) {
        let reduce = 15 - seconds;
      } else {
        let reduce = seconds - 15;
      }
    }
    target = e.target;
    if (target.matches("button") === true) {
      let page = target.parentElement;
      page.remove();

      if (!quiz.childNodes){
          alert("RAN");
      }
    }
  });
}

startBtn.addEventListener("click", function () {
  game();
  startScreen.style.display = "none";
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "block";
  }
});
