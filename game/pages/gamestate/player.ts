export class Player {
    private id: string;
    private name: string;
    private type: string;
    private score: number;

    constructor(
        id: string,
        name: string,
        type: string,
        score: number
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.score = score;
    }

    getId() : string {
        return this.id;
    }

    getName() : string {
        return this.name;
    }

    getType() : string {
        return this.type;
    }
    
    getScore() : number {
        return this.score;
    }
}