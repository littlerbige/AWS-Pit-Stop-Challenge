export default class scenario {
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