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
const restart = document.getElementById('restart');
const clear = document.getElementById('clear');
let count = 0;
let scores = [];
let users = [];

init();

function game() {
  let seconds = 80;
  let clock = setInterval(function timer() {
    seconds--;
    time.textContent = seconds;
    console.log(seconds);

    if (seconds === 0) {
      clearInterval(clock);
    }
  }, 1000);
  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (e) {
      if (this.id === "option") {
        let seconds = parseInt(time.textContent);
        seconds = seconds -= 20;
        clearInterval(clock);
        clock = setInterval(function () {
          seconds--;
          time.textContent = seconds;
          console.log(seconds);

          if (seconds <= 0) {
            clearInterval(clock);
            hs.style.display = "block";
            time.textContent = 0;
            alert("Times Up!")
            for (let i = 0; i < pages.length; i++) {
              pages[i].style.display = "none";
            }
         
          }
        }, 1000);
        status.textContent = "WRONG";
        status.style.color = 'red';
        setTimeout(function(){
          status.textContent = "";
        }, 1500)
      }
      else if (this.id === "answer"){
        status.textContent = "CORRECT";
        status.style.color = 'green';
        setTimeout(function(){
          status.textContent = "";
        }, 1500)
      }
      else{
        return 0;
      }
      target = e.target;
      if (target.matches("button") === true) {
        let page = target.parentElement;
        page.remove();

        count++;
        console.log(count);
        if (count === 5) {
          hs.style.display = "block";
          clearInterval(clock);
          
        }
      }
    });
  }
}

restart.addEventListener('click', function() {
  location.reload();
})

initInp.addEventListener("keyup", function (e) {
  let key = e.key;
  if (key === "Enter") {
    if (this.value === "") {
      alert("Invalid Name");
    } else {
      let userName = this.value + ' - ' + time.textContent;
      users.push(userName);
      storeName();
      this.value = "";
      this.disabled = true;
      render();
      

    }
  }
});

function render() {
  scoreList.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let li = document.createElement("li");
    li.textContent = users[i];
    scoreList.prepend(li);
    
  }
  
}



function storeName() {
  localStorage.setItem("userName", JSON.stringify(users));
}

startBtn.addEventListener("click", function () {
  game();
  startScreen.style.display = "none";
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "block";
  }
});

function init(){
  time.textContent = 80;
  var storedN = JSON.parse(localStorage.getItem('userName'));
  var storedS = JSON.parse(localStorage.getItem('userScore'));

    if (storedN !== null){
      users = storedN;
    }
      
    
    clear.addEventListener('click', function() {
      scoreList.innerHTML = "";
      localStorage.clear();
    })
  
    


  render();
}
