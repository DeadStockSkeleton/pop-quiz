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
    timer(80);
})

// let seconds = 60;
// function timer(){
    
//     setInterval(function(){
//         seconds--;
//         sec.textContent = seconds;
//         if (seconds < 10){
//             sec.textContent = '0' + seconds; 
//         }
//         if(sec.textContent === '00'){
//             hsScreen.style.display = 'block';
//             clearInterval(this);
//         }
//         console.log(seconds);
//     }, 1000);

//     for (var i = 0; i < btn.length; i++){
//         btn[i].addEventListener("click", function(){
//             if (this.id === 'option'){
//                 status.textContent = "WRONG";
//                 setTimeout(function(){
//                     status.textContent = "";
//                 },3000)

//                 if (sec.textContent >= 15){
//                     let sub = sec.textContent - 15
//                     console.log(sub);
                    
//                 }
//                 else{
//                     let reduce = 15 - seconds;
//                     alert(reduce);
//                 }
                            
//             }
//         })
//     }
// }


function timer(time){
    let seconds = time

    let clock = setInterval(function(){
        seconds--;
        sec.textContent = seconds;
        if (seconds < 10){
            sec.textContent = '0' + seconds;
        }
        if (seconds === 0){
            hsScreen.style.display = 'block';
            clearTimeout(clock);
        }
    }, 1000)

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function (){
            if (this.id === 'option'){
                status.textContent = "WRONG";
                setTimeout (function () {
                    status.textContent = '';
                }, 3000)
    
                let seconds = parseInt(sec.textContent);
                if (seconds >= 15){
                    let reduce = seconds - 15;
                    clearInterval(clock);
                    timer(reduce);
                }
                else{
                    let reduce = 15 - seconds;
                    clearInterval(clock);
                    timer(reduce);
                    
                    
                }
            }
            else{
                status.textContent = "CORRECT";
                setTimeout (function () {
                    status.textContent = '';
                }, 3000)
            }
        })
    
    }
}
