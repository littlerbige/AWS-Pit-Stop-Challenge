import scenario from "./modules/scenario.js";
import tyre from "./modules/tyres.js";

document.getElementById("start-game-btn").addEventListener("click", startGame);
document.getElementById("start-timer-btn").addEventListener("click", startTimer);
document.getElementById("stop-timer-btn").addEventListener("click", stopTimer);
document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("game-video").addEventListener("ended", afterVideo);
document.getElementById("tyre-submit-btn").addEventListener("click", submitTyreSelection);

const tyreBtnArray = document.querySelectorAll(".tyre-btn");
tyreBtnArray.forEach(tyreBtn => {
    tyreBtn.addEventListener("click", getTyrePenalty);
});

const scenario1 = new scenario(2, "S", "Moderate Rain", [new tyre("W",22,5), new tyre("H",70,60), new tyre("M",70,60), new tyre("S",70,60), new tyre("I",44,0)]);
const scenario2 = new scenario(20, "M", "Dry", [new tyre("W",2,60), new tyre("H",53,0), new tyre("M",24,20), new tyre("S",18,25), new tyre("I",5,60)]);
const scenario3 = new scenario(65, "I", "Dry", [new tyre("W",2,60), new tyre("H",53,5), new tyre("M",24,3), new tyre("S",18,0), new tyre("I",5,60)]);
const scenario4 = new scenario(44, "H", "Dry", [new tyre("W",2,60), new tyre("H",53,5), new tyre("M",24,0), new tyre("S",18,20), new tyre("I",5,60)]);
const scenario5 = new scenario(37, "W", "Heavy Rain", [new tyre("W",40,0), new tyre("H",70,60), new tyre("M",70,60), new tyre("S",70,60), new tyre("I",70,25)]);

const scenarioList = [scenario1, scenario2, scenario3, scenario4, scenario5];

let previousIndex = 0;

function randomIndex() {
    // const i = Math.floor(Math.random() * 5 );
    const i = 0;
    console.log("random index:", i);
    if ((i !== previousIndex)) {
        return i;
    } else if (i == 4 ) {
        return 3;
    } else if ( i == 0 ){
        return 1;
    } else {
        return i - 1;
    }
}

function updateScenarioRow(selectedScenario){
    const conditionsArray = document.querySelectorAll(".scenario-condition-wrapper");
    conditionsArray.forEach((condition) => {
        const id = condition.id;
        let conditionValue = null;
        switch (id) {
            case 'lap-number-condition':
                conditionValue = selectedScenario.lapNum;
                break;
            case "current-tyres-condition":
                conditionValue = selectedScenario.currTyres;
                break;
            case "weather-condition":
                conditionValue = selectedScenario.weather;
                break;
            default:
                conditionValue = "N/A";
        }
        condition.querySelector(".scenario-condition-value").innerText = conditionValue;
    });
}

function getTyreSelection(scenarioTyres){
    scenarioTyres.forEach(tyre => {
        let selectedTyreBtn;
        switch (tyre.name) {
            case "W":
                selectedTyreBtn = document.getElementById("tyre-w");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps;
                break;
            case "H":
                selectedTyreBtn = document.getElementById("tyre-h");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps;
                break;
            case "M":
                selectedTyreBtn = document.getElementById("tyre-m");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps;
                break;
            case "S":
                selectedTyreBtn = document.getElementById("tyre-s");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps;
                break;
            case "I":
                selectedTyreBtn = document.getElementById("tyre-i");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps;
                break;
            default:
                break;
        }
    });
}

function startGame(){
   const i = randomIndex();
   console.log("previous index:", previousIndex);
   console.log("index:", i);
   previousIndex = i;
   
   updateScenarioRow(scenarioList[i]);
   getTyreSelection(scenarioList[i].tyres);
   console.log(scenarioList[i]);
}

function playVideo(){
    const video = document.getElementById("game-video");
    const options = {
        rootMargin: "0px",
        threshold: 0.9,
    };
    const callback = (entries) => {
        const videoEntry = entries[0];
        if(!videoEntry.isIntersecting) {
            let videoPromise = videoEntry.target.pause();
            if(videoPromise !== undefined) {
                videoEntry.target.pause();
            }
        } else {
            videoEntry.target.play();
        }
        if(!videoEntry.target.paused){
            document.querySelector('header').classList.add('hidden');
        } else {
            document.querySelector('header').classList.remove('hidden');
        }
    }
    
    const observer = new IntersectionObserver(callback, options);
    
    observer.observe(video);
}
playVideo();

function afterVideo(){
    document.getElementById("tyre-selection-section").scrollIntoView({behavior: "smooth", block: "start"});
    // document.querySelector('header').classList.remove('hidden');
}

let penaltyMS;

function getTyrePenalty(){
    penaltyMS = this.dataset.penalty * 1000;
    const currentSeleccted = document.querySelector(".selected")
    if(currentSeleccted){
        currentSeleccted.classList.remove("selected");
    }
    this.classList.add("selected");
    document.getElementById("tyre-submit-btn").disabled = false;
    document.getElementById("tyre-penalty").children[1].children[0].innerHTML = msToDisplayTime(penaltyMS);
}

function submitTyreSelection(){
    document.getElementById("time-section").scrollIntoView({behavior: "smooth", block: "start"});
}

let startTime;
let timerInterval;
let finalTimeMs;

function startTimer(){
    if(!timerInterval) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 100);
    }
    document.getElementById("start-timer-btn").classList.add('hidden');
    document.getElementById("start-timer-btn").classList.remove('active');
    document.getElementById("stop-timer-btn").classList.remove('hidden');
}

function stopTimer(){
    clearInterval(timerInterval);
    timerInterval = null;

    const totalTimeMs = finalTimeMs + penaltyMS;
    document.getElementById("total-time").children[1].innerHTML = msToDisplayTime(totalTimeMs);

    document.getElementById("stop-timer-btn").classList.remove('active');
    document.getElementById("stop-timer-btn").classList.add('hidden');
    document.getElementById("finish-timer-btn").classList.remove('hidden');
}

function updateTimer(){
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;

    document.getElementById("game-timer").innerHTML = msToDisplayTime(elapsedTime);
    document.getElementById("pit-time").children[1].innerHTML = msToDisplayTime(elapsedTime);
    finalTimeMs = elapsedTime;
}

function msToDisplayTime(msTime){
    let milliseconds = Math.floor(msTime % 1000);
    let seconds = Math.floor(msTime / 1000) % 60;
    let minutes = Math.floor(msTime / 1000 / 60) % 60;

    return pad(minutes) + ":" + pad(seconds) + ":" + padMs(milliseconds);
}

function pad(number){
    return (number < 10 ? "0" : "") + number
}

function padMs(number){
    if(number < 10 ){
        return "00" + number;
    } else if(number < 100) {
        return "0" + number;
    } else {
        return number;
    }
}

function resetGame(){
    const resetScenario = new scenario("N/A", "N/A", "N/A", [new tyre("W","N/A",0), new tyre("H","N/A",0), new tyre("M","N/A",0), new tyre("S","N/A",0), new tyre("I","N/A",0)]);
    updateScenarioRow(resetScenario);
    getTyreSelection(resetScenario.tyres);
    document.getElementById("game-timer").innerHTML = msToDisplayTime(0);
    document.getElementById("pit-time").children[1].innerHTML = msToDisplayTime(0);
    document.getElementById("tyre-penalty").children[1].children[0].innerHTML = msToDisplayTime(0);
    document.getElementById("total-time").children[1].innerHTML = msToDisplayTime(0);

    document.getElementById("finish-timer-btn").classList.add('hidden');
    document.getElementById("start-timer-btn").classList.remove('hidden');
    document.getElementById("start-timer-btn").classList.add('active');
    document.querySelector(".selected").classList.remove('selected');
    scroll(0,0);
}