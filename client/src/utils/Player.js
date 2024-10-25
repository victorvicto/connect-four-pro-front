class Player {
    constructor(name, role) {
        if (this.constructor === Player) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        this.role = role;
        this.opponentRole = role === 'p1' ? 'p2' : 'p1';
    }

    pickMove(board) {
        throw new Error("Method 'play()' must be implemented.");
    }
}

export default Player;