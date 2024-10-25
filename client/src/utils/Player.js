class Player {
    constructor(name, begins=false) {
        if (this.constructor === Player) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        this.role = begins ? 'p1' : 'p2';
        this.opponentRole = begins ? 'p2' : 'p1';
    }

    pickMove(board) {
        throw new Error("Method 'play()' must be implemented.");
    }
}

export default Player;