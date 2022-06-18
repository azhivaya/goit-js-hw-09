const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
let isActive = false;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {

    if (isActive) {
        return;
    }
    stopBtn.disabled = false;
    if (stopBtn.disabled === false) {
        startBtn.disabled = true;
    }
    isActive = true; 
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopBtn() {
    clearInterval(timerId);
    isActive = false;
    onStopBtnDisabled();
}

function onStopBtnDisabled() {
    stopBtn.disabled = true;
    if (stopBtn.disabled === true) {
        startBtn.disabled = false;
    }
}
function changeBgColor() {
document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
