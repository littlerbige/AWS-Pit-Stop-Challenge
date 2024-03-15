export default class scenario {
    constructor(lapNum, currTyres, weather, tyres) {
        this._lapNum = lapNum;
        this._currTyres = currTyres;
        this._weather = weather;
        this._tyres = tyres;
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

    getTyreByName(name) { 
        this._tyres.forEach(tyre => {
            if(tyre.name == name){
                return tyre;
                exit;
            }
        });
     }
}