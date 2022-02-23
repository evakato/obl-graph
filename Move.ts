export default class Move {
    private top: number;
    private bottom: number;
    private slice: number

    constructor (top: number, bottom: number, slice: number) {
        this.top = top;
        this.bottom = bottom;
        this.slice = slice;
    }

    getTop(): number {
        return this.top;
    }

    getBottom(): number {
        return this.bottom;
    }

    getSlice(): number {
        return this.slice;
    }

    getMoveString(prevSlice: number): string {
        let topMove:number = 0;
        let bottomMove: number = 0;
        console.log("where we at: " + this.top + " " + this.bottom + " " + prevSlice + " " + this.slice);

        //top move
        if (prevSlice === 0) {
            topMove--;
        }
        topMove += this.top*3;
        if (topMove > 6) {
            topMove = 6-topMove;
        }
        if (this.slice === 0) {
            topMove++;
        }
        
        //bottom move
        if (prevSlice === 1) {
            bottomMove++;
        }
        bottomMove += this.bottom*3;
        if (bottomMove > 6) {
            bottomMove -= 12;
        }
        if (this.slice === 1) {
            bottomMove--;
        }

        return topMove.toString() + "," + bottomMove.toString() + "/" ;
    }

}