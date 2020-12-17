let startBtn = document.getElementById('startBtn');
let sec = document.getElementById('sec');
const startScreen = document.getElementById('start');
const hsScreen = document.getElementById('highscore');
const q1 = document.getElementById('q1');
const btn = document.getElementsByClassName("option");
let status = document.getElementById('status');

startBtn.addEventListener('click', function(){
    startScreen.classList.add("fade");
    this.disabled = true;
    q1.style.display = "block";
    timer(seconds);
})
for (var i = 0; i < btn.length; i++){
    btn[i].addEventListener("click", function(){
        if (this.id === 'option'){
            status.textContent = "WRONG";
            setTimeout(function(){
                status.textContent = "";
            },3000)
            let seconds = sec.textContent;
            seconds = parseInt(seconds)
            
             seconds--;
             sec.textContent = seconds;            
        }
    })
}
let seconds = 60;
function timer(time){
    seconds = time;
    setInterval(function(){
        seconds--;
        sec.textContent = seconds;
        if (seconds < 10){
            sec.textContent = '0' + seconds; 
        }
        if(seconds === 0){
            hsScreen.style.display = 'block';
            clearInterval();
        }
        console.log(seconds);
    }, 1000);
}

