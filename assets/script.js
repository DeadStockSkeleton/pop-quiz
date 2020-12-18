const startBtn = document.getElementById("startBtn");
let time = document.getElementById("timer");
let startScreen = document.getElementById("start");
let btn = document.querySelectorAll("button");
let pages = document.querySelectorAll("#q");
let hs = document.getElementById("hs");
let quiz = document.getElementById('quiz');
let initInp = document.getElementById('initials');
let scoreList = document.getElementById('scoreList');
let count = 0;
let scores = [];
let users = [];

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
  
        count++;
        console.log(count);
        if (count === 5){
          hs.style.display = 'block';
          getScore();
          clearInterval(clock);
        }
      }
    });
  }
  
}

initInp.addEventListener('keyup', function (e) {
  let key = e.key
  if (key === 'Enter') {
    if(this.value === ''){
      alert("Invalid Name");
    }
    else {
      let userName = this.value;
      users.push(userName);
      storeName();
      this.value = '';
      render();
    }
  }
})

function render(){
  for (let i = 0; i < users.length; i++) {
    let li = document.createElement('li');
    li.textContent = users[i] + '-' + time.textContent;
    scoreList.prepend(li);

  }
}

function getScore(){
  let score = time.textContent;
  scores.push(score);
  storeScore();
  
}

function storeScore(){
  localStorage.setItem("userScore", JSON.stringify(scores));
}

function storeName(){
  localStorage.setItem("userName", JSON.stringify(users));
}



startBtn.addEventListener("click", function () {
  game();
  startScreen.style.display = "none";
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "block";
  }
});
