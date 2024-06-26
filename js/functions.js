// Register the service worker
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
      // Try to register the service worker.
      try {
        // Capture the registration for later use, if needed
        let reg;
  
        // Use ES Module version of our Service Worker in development
        if (import.meta.env?.DEV) {
          reg = await navigator.serviceWorker.register('/service-worker.js', {
            type: 'module',
          });
        } else {
          // In production, use the normal service worker registration
          reg = await navigator.serviceWorker.register('/service-worker.js');
        }
  
        console.log('Service worker registered! 😎', reg);
      } catch (err) {
        console.log('😥 Service worker registration failed: ', err);
      }
    });
  }

//import scenario from "./modules/scenario.js";
//import tyre from "./modules/tyres.js";

class scenario {
    constructor(lapNum, currTyres, weather, tyres, correctMessage, incorrectMessage) {
        this._lapNum = lapNum;
        this._currTyres = currTyres;
        this._weather = weather;
        this._tyres = tyres;
        this._correctMessage = correctMessage;
        this._incorrectMessage = incorrectMessage;
    }

    get lapNum() {
        return this._lapNum;
    }

    get currTyres() {
        return this._currTyres;
    }

    get weather() {
        return this._weather;
    }

    get tyres() {
        return this._tyres;
    }

    get correctMessage() {
        return this._correctMessage;
    }

    get incorrectMessage() {
        return this._incorrectMessage;
    }

    getTyreByName(name) { 
        this._tyres.forEach(tyre => {
            if(tyre.name == name){
                return tyre;
                exit;
            }
        });
     }
}

export default class tyre {
    constructor(name, laps, penalty){
        this._name = name;
        this._laps = laps;
        this._penalty = penalty;
    }

    get name(){
        return this._name;
    }

    get laps(){
        return this._laps;
    }

    get penalty(){
        return this._penalty;
    }
}

document.getElementById("start-game-btn").addEventListener("click", startGame);
document.getElementById("start-timer-btn").addEventListener("click", startTimer);
document.getElementById("stop-timer-btn").addEventListener("click", stopTimer);
document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("game-video").addEventListener("ended", afterVideo);
document.getElementById("tyre-submit-btn").addEventListener("click", submitTyreSelection);
document.getElementById("tyre-next-btn").addEventListener("click", TyreNextBtn);

const tyreBtnArray = document.querySelectorAll(".tyre-btn");
tyreBtnArray.forEach(tyreBtn => {
    tyreBtn.addEventListener("click", getTyrePenalty);
});

const scenario1 = new scenario(2, "Soft", "Moderate Rain", [new tyre("W",22,3), new tyre("H",70,20), new tyre("M",70,20), new tyre("S",70,20), new tyre("I",44,0)], '<p>Well done for choosing the right tyre! The intermediate is the safest choice in this situation. With moderate rain none of the slick tyres would yield any performance and putting the wet on would clear the water but is more than likely to be slower than the intermediate.</p>', '<p>The intermediate is the safest choice in this situation. With moderate rain none of the slick tyres would yield any performance and putting the wet on would clear the water but is more than likely to be slower than the intermediate.</p>');
const scenario2 = new scenario(20, "Medium", "Dry", [new tyre("W",2,20), new tyre("H",53,0), new tyre("M",24,6), new tyre("S",18,8), new tyre("I",5,20)],'<p>Well done for choosing the right tyre! The Hard compound would be the optimum choice as it could get you to the end of the race without needing another stop.</p><p>The regulations also state you need to run two different tyre compounds throughout a dry race so it gives you the best strategy option over the course of the race depending on unforseen circumstances such as a safety car.</p>', '<p>The Hard compound would be the optimum choice as it could get you to the end of the race without needing another stop.</p><p>The regulations also state you need to run two different tyre compounds throughout a dry race so it gives you the best strategy option over the course of the race depending on unforseen circumstances such as a safety car.</p>');
const scenario3 = new scenario(65, "Inter", "Dry", [new tyre("W",2,20), new tyre("H",53,3), new tyre("M",24,1), new tyre("S",18,0), new tyre("I",5,20)], '<p>Well done for choosing the right tyre! The soft is the optimum selction due to the weather being dry and only 5 laps remaining in the race. In this scenario you want the fastest tyre as durability is not an important factor with 5 laps remaining.</p>','<p>The soft is the optimum selction due to the weather being dry and only 5 laps remaining in the race. In this scenario you want the fastest tyre as durability is not an important  factor with 5 laps remaining.</p>');
const scenario4 = new scenario(44, "Hard", "Dry", [new tyre("W",2,20), new tyre("H",53,3), new tyre("M",24,0), new tyre("S",18,6), new tyre("I",5,20)],'<p>Well done for choosing the right tyre! This was a tough decision and a bit of a gamble between the medium and the hard. The medium will yield the best performance for the last stint of the race but may drop off two laps to the end. We know the hard will go the distance but being the slower tyre it may not get you the win and in racing sometimes you just have to take a risk for the ultimate reward!</p>', '<p>This was a tough decision and a bit of a gamble between the medium and the hard. The medium will yield the best performance for the last stint of the race but may drop off two laps to the end. We know the hard will go the distance but being the slower tyre it may not get you the win and in racing sometimes you just have to take a risk for the ultimate reward!</p>');
const scenario5 = new scenario(37, "Wet", "Heavy Rain", [new tyre("W",40,0), new tyre("H",70,20), new tyre("M",70,20), new tyre("S",70,20), new tyre("I",70,8)],"<p>Well done for choosing the right tyre! When it rains all slick tyres are off the table, the driver would have very little control over the car with no grooves cut into the tyres to disperse the standing water. With wet races, there isn't a need to run more than one compound and the intermediate although clear some water is not designed to clear a heavilly soaked track.</p>","When it rains all slick tyres are off the table, the driver would have very little control over the car with no grooves cut into the tyres to disperse the standing water. With wet races, there isn't a need to run more than one compound and the intermediate although clear some water is not designed to clear a heavilly soaked track.");

const scenarioList = [scenario1, scenario2, scenario3, scenario4, scenario5];

let previousIndex = 0;

function randomIndex() {
    const i = Math.floor(Math.random() * 5 );
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
                const weatherIcons = document.querySelectorAll('.weather-icon');
                weatherIcons.forEach(icon =>{
                    icon.classList.add('hidden');
                });
                switch(conditionValue) {
                    case 'Dry':
                        document.getElementById("dry-weather-icon").classList.remove("hidden");
                        break;
                    case 'Moderate Rain':
                        document.getElementById("moderate-rain-weather-icon").classList.remove("hidden");
                        break;
                    case 'Heavy Rain':
                        document.getElementById("heavy-rain-weather-icon").classList.remove("hidden");
                        break;
                }
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
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps  + " Laps";
                break;
            case "H":
                selectedTyreBtn = document.getElementById("tyre-h");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps  + " Laps";
                break;
            case "M":
                selectedTyreBtn = document.getElementById("tyre-m");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps  + " Laps";
                break;
            case "S":
                selectedTyreBtn = document.getElementById("tyre-s");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps  + " Laps";
                break;
            case "I":
                selectedTyreBtn = document.getElementById("tyre-i");
                selectedTyreBtn.dataset.penalty = tyre.penalty;
                selectedTyreBtn.querySelector(".laps-given").innerHTML = tyre.laps + " Laps";
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
    const selectedTyre = document.querySelector(".tyre-btn.selected");
    if(selectedTyre.dataset.penalty != 0){
        const message = scenarioList[previousIndex].incorrectMessage;
        document.getElementById("message-container").innerHTML = message;
        document.getElementById("message-container").dataset.answer = "incorrect";
    } else {
        const message = scenarioList[previousIndex].correctMessage;
        document.getElementById("message-container").innerHTML = message;
        document.getElementById("message-container").dataset.answer = "correct";

    }
    document.getElementById("message-container").classList.remove('hidden');
    document.getElementById("tyre-next-btn").classList.remove("hidden");
    document.getElementById("tyre-submit-btn").classList.add("hidden");
    const tyreBtnArray = document.querySelectorAll(".tyre-btn");
    tyreBtnArray.forEach(tyre => {
            tyre.disabled = true;
    });
}

function TyreNextBtn(){
    document.getElementById("time-section").scrollIntoView({behavior: "smooth", block: "start"});
}

let startTime;
let timerInterval;
let finalTimeMs;

function startTimer(){
    if(!timerInterval) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1);
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
    document.getElementById('tyre-submit-btn').disabled = true;
    document.getElementById("message-container").classList.add('hidden');
    document.getElementById("message-container").dataset.answer ='incorrect';
    document.getElementById("tyre-next-btn").classList.add("hidden");
    document.getElementById("tyre-submit-btn").classList.remove("hidden");
    const tyreBtnArray = document.querySelectorAll(".tyre-btn");
    tyreBtnArray.forEach(tyre => {
            tyre.disabled = false;
    });
    scroll(0,0);
}