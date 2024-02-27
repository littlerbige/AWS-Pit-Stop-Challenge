class scenario {
    constructor(lapNum, currTyres, weather, tyreLife, correctTyre, superBadTyre) {
        this._lapNum = lapNum;
        this._currTyres = currTyres;
        this._weather = weather;
        this._tyreLife = tyreLife;
        this._correctTyre = correctTyre;
        this.__superBadTyre = superBadTyre;
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

    get tyreLife() {
        return this._tyreLife;
    }

    get correctTyre() {
        return this._correctTyre;
    }

    get superBadTyre() {
        return this._superBadTyre;
    }
}

const scenario1 = new scenario(2, "dry", "rainy", "38%", "wet", "dry");
const scenario2 = new scenario(22, "wet", "hot", "77%", "dry", "wet");
const scenario3 = new scenario(15, "cold", "hot", "20%", "dry", "wet");
const scenario4 = new scenario(17, "hot", "dry", "55%", "dry", "dry");
const scenario5 = new scenario(40, "dry", "windy", "11%", "wet", "wet");

const scenarioList = [scenario1, scenario2, scenario3, scenario4, scenario5];

let previousIndex = null;

function randomIndex() {
    i = Math.floor(Math.random() * 5 );
    if ((i !== previousIndex)) {
        return i;
    } else if (i === 4 ) {
        return 3;
    } else if ( i === 0 ){
        return 1;
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
                console.log(conditionValue);
                break;
            case "current-tyres-condition":
                conditionValue = selectedScenario.currTyres;
                break;
            case "weather-condition":
                conditionValue = selectedScenario.weather;
                break;
            case "tyre-life-condition":
                conditionValue = selectedScenario.tyreLife;
                break;
            default:
                conditionValue = "N/A";
        }
        condition.querySelector(".scenario-condition-value").innerText = conditionValue;
    });
}

function updateTyreOptions(){
    //get correct tyre
    //get two random tyres
}

function startGame(){
   const i = randomIndex();
   previousIndex = i;
   updateScenarioRow(scenarioList[i]);
   updateTyreOptions();
   //move to video section
}

const video = document.getElementById("game-video");
const options = {
    // root: document.getElementById("video-section"),
    rootMargin: "0px",
    threshold: 1.0,
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
}

const observer = new IntersectionObserver(callback, options);

observer.observe(video);

