class Player {
    constructor(name, chipsStyle=null) {
        if (this.constructor === Player) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        if (chipsStyle === null) {
            this.chipsStyle = "default";
        } else {
            this.chipsStyle = chipsStyle;
        }
    }

    pickMove(board) {
        throw new Error("Method 'play()' must be implemented.");
    }

    handleClick(col) {
        console.log("Clicks have no effect during this player's turn ("+this.constructor.name+" "+this.name+").");
    }
}

export default Player;