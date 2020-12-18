const startBtn = document.getElementById("startBtn");
let time = document.getElementById("timer");
let startScreen = document.getElementById("start");
let btn = document.querySelectorAll("button");
let pages = document.querySelectorAll("#q");
let hs = document.getElementById("hs");
let quiz = document.getElementById("quiz");
let initInp = document.getElementById("initials");
let scoreList = document.getElementById("scoreList");
let status = document.getElementById("status");
const restart = document.getElementById("restart");
const clear = document.getElementById("clear");
let count = 0;
let scores = [];
let users = [];

init();

function game() {
  //start the timer at 80
  let seconds = 80;
  //setInterval for timer
  let clock = setInterval(function timer() {
    //reduce timer by 1
    seconds--;
    //override text content with timer value
    time.textContent = seconds;

    // if timer hits 0
    if (seconds === 0) {
      //stop timer
      clearInterval(clock);
    }
  }, 1000);
  //loop through all buttons for click event
  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (e) {
      //if button id is option
      if (this.id === "option") {
        let seconds = parseInt(time.textContent);
        //reduce timer by 20 seconds
        seconds = seconds -= 20;
        //reset timer & start timer back up with new value
        clearInterval(clock);
        clock = setInterval(function () {
          seconds--;
          time.textContent = seconds;
          console.log(seconds);
          //to deal with negatives, if 0 is greater than or equal to seconds
          if (seconds <= 0) {
            clearInterval(clock);
            //display score div
            hs.style.display = "block";
            time.textContent = 0;
            alert("Times Up!");
            for (let i = 0; i < pages.length; i++) {
              pages[i].style.display = "none";
            }
          }
        }, 1000);
        //display 'WRONG' if id=option
        status.textContent = "WRONG";
        status.style.color = "red";
        setTimeout(function () {
          status.textContent = "";
        }, 1500);
        //else if btn id=answer...
      } else if (this.id === "answer") {
        //then display "CORRECT"
        status.textContent = "CORRECT";
        status.style.color = "green";
        setTimeout(function () {
          status.textContent = "";
        }, 1500);
      } else {
        return 0;
      }
      //get event target
      target = e.target;
      //if target is a button...
      if (target.matches("button") === true) {
        //then remove div
        let page = target.parentElement;
        page.remove();

        //to keep track of questions, I made an count variable
        count++;
        //if count hits 5, then thats the end, so display score div and stop timer
        if (count === 5) {
          hs.style.display = "block";
          clearInterval(clock);
        }
      }
    });
  }
}

//restart refreshes window
restart.addEventListener("click", function () {
  location.reload();
});

//onkeyup in input element...
initInp.addEventListener("keyup", function (e) {
  let key = e.key;
  //keyup is enter
  if (key === "Enter") {
    //if value is empty, then its invalid
    if (this.value === "") {
      alert("Invalid Name");
      //else push name to array and store it
    } else {
      let userName = this.value.trim() + " - " + time.textContent;
      users.push(userName);
      storeName();
      this.value = "";
      this.disabled = true;
      render();
    }
  }
});

function render() {
  //clear score list html
  scoreList.innerHTML = "";
  //loop through the users array
  for (let i = 0; i < users.length; i++) {
    //create li element
    let li = document.createElement("li");
    //put array content in li
    li.textContent = users[i];
    //prepend li to score list
    scoreList.prepend(li);
  }
}

function storeName() {
  //store name input
  localStorage.setItem("userName", JSON.stringify(users));
}

startBtn.addEventListener("click", function () {
  game();
  startScreen.style.display = "none";
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "block";
  }
});

function init() {
  time.textContent = 80;
  var storedN = JSON.parse(localStorage.getItem("userName"));

  if (storedN !== null) {
    users = storedN;
  }

  clear.addEventListener("click", function () {
    scoreList.innerHTML = "";
    localStorage.clear();
  });

  render();
}
