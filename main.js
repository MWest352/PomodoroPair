const displayTimer = document.getElementById('timer');
const stopBtn = document.querySelector('.stop-timer')
const startBtn = document.querySelector('.start-timer')

const timerButtons = document.querySelectorAll('.timer-buttons > button');
const sessionButtons = document.querySelectorAll('.session > div > input');

let workMinutes = 25;
let breakMinutes = 5;

let seconds = workMinutes * 60;

let testbool = true;

/*Checks on status of switch and passses through variables*/
function switchClock() {
  seconds = (testbool ? workMinutes : breakMinutes) * 60;
  timer(seconds);
}

let interval;

displayTimer.textContent = `${Math.floor(seconds / 60)}:00`;

function timer(s) {
  interval = setInterval(() => { 
    const minutes = Math.floor(s / 60);
    let secondsLeft = s % 60;
    
    displayTimer.textContent = `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
    document.title = `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
    
    s--;
    seconds--; // added

    if (s < 0) {
      testbool = !testbool
      clearInterval(interval);
      switchClock();
    }
  }, 1000);
}

function stopTimer(event) {
  clearInterval(interval);
}

timerButtons.forEach(button => button.addEventListener('click', event => {
  (event.target.textContent == "Start") ? timer(seconds) : stopTimer(event);
}));

sessionButtons.forEach(button => button.addEventListener('click', () => {
  if(button.parentNode.id == "work") {
    button.parentNode.children[3].innerText = button.value == "+" ?  ++workMinutes : --workMinutes;
    displayTimer.textContent = `${Math.floor((workMinutes * 60) / 60)}:00`;
    seconds = (testbool ? workMinutes : breakMinutes) * 60;
  } else {
    button.parentNode.children[3].innerText = button.value == "+" ?  ++breakMinutes : --breakMinutes;
  }
}));