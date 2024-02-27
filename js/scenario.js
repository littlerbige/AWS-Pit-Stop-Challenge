class scenario {
    constructor(lapNum, currTyres, weather, tyreLife, correctTyre, superBadTyre) {
        this.lapNum = lapNum;
        this.currTyres = currTyres;
        this.weather = weather;
        this.tyreLife = tyreLife;
        this.correctTyre = correctTyre;
        this. superBadTyre = superBadTyre;
    }

    get lapNum() {
        return this.lapNum;
    }

    get currTyres() {
        return this.currTyres;
    }

    get weather() {
        return this.weather;
    }

    get tyreLife() {
        return this.tyreLife;
    }

    get correctTyre() {
        return this.correctTyre;
    }

    get superBadTyre() {
        return this.superBadTyre;
    }
}
export default scenario