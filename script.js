let hours = 0, minutes = 0, seconds = 0;
let timerInterval;
const beep = document.getElementById('beep');
let soundEnabled = false;

function updateDisplay() {
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}

// Funzione per fare beep multipli
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
        // Beep 3 volte se zero
        if(hours === 0 && minutes === 0 && seconds === 0){
            clearInterval(timerInterval);
            playBeep(3, 300);
            return;
        }

        // Beep negli ultimi 5 secondi (1 beep per secondo)
        if(hours === 0 && minutes === 0 && seconds <= 5 && seconds > 0){
            playBeep(1, 0);
        }

        // Decremento del timer
        if(seconds === 0){
            if(minutes === 0){
                if(hours > 0){ hours--; minutes = 59; seconds = 59; }
            } else { minutes--; seconds = 59; }
        } else { seconds--; }

        updateDisplay();
    },1000);
}

// Start con sblocco audio
document.getElementById('start-btn').addEventListener('click', () => {
    if(!soundEnabled){
        beep.play().then(() => { beep.pause(); beep.currentTime = 0; });
        soundEnabled = true;
    }
    startTimer();
});

document.getElementById('stop-btn').addEventListener('click', () => { clearInterval(timerInterval); });
document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    hours=0; minutes=0; seconds=0;
    updateDisplay();
});
