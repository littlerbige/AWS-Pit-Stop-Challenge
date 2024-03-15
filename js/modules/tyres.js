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