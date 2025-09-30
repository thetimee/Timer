let hours = 0, minutes = 0, seconds = 0;
let timerInterval;
const beep = document.getElementById('beep');
let soundEnabled = false;

function updateDisplay() {
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}

function playBeep(times=1, interval=300){
    let count = 0;
    function beepOnce(){
        beep.currentTime = 0;
        beep.play().catch(e => console.log(e));
        count++;
        if(count < times){
            setTimeout(beepOnce, interval);
        }
    }
    beepOnce();
}

function startTimer() {
    if(timerInterval) clearInterval(timerInterval);
    let inputH = parseInt(document.getElementById('input-hours').value) || 0;
    let inputM = parseInt(document.getElementById('input-minutes').value) || 0;
    let inputS = parseInt(document.getElementById('input-seconds').value) || 0;
    hours = inputH; minutes = inputM; seconds = inputS;
    updateDisplay();

    timerInterval = setInterval(() => {
        if(hours === 0 && minutes === 0 && seconds === 0){
            clearInterval(timerInterval);
            // Beep 3 volte a zero
            playBeep(3, 300);
            return;
        }

        if(seconds === 0){
            if(minutes === 0){
                if(hours > 0){ hours--; minutes = 59; seconds = 59; }
            } else { minutes--;
