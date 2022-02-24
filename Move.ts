export default class Move {
    readonly moves: Array<number> = [0, 3, 6, -3];

    private top: number;
    private bottom: number;
    private slice: number;
    private postTop: number;
    private postBottom: number;

    constructor (top: number, bottom: number, slice: number, postTop: number, postBottom: number) {
        this.top = top;
        this.bottom = bottom;
        this.slice = slice;
        this.postTop = postTop;
        this.postBottom = postBottom;
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

    getMoveString(prevSlice: number): Array<number> {
        //console.log("where we at: " + this.top + " " + this.bottom + " " + prevSlice + " " + this.slice + " 227");

        //top move
        let topMove:number = this.moves[this.top];
        if (prevSlice === 0) {
            topMove--;
        }
        if (this.slice === 0) {
            topMove++;
        }
        topMove === 7 ? (topMove = -5) : (topMove);

        //bottom move
        let bottomMove: number = this.moves[this.bottom];
        if (prevSlice === 1) {
            bottomMove++;
        }
        if (this.slice === 1) {
            bottomMove--;
        }
        bottomMove === 7 ? (bottomMove = -5) : (bottomMove);

        if (this.postTop !== -1 && this.postBottom !== -1) {
            //return topMove.toString() + "," + bottomMove.toString() + "/" + this.moves[this.postTop] + "," + this.moves[this.postBottom];
            return [topMove, bottomMove, this.moves[this.postTop], this.moves[this.postBottom]];
        }

        return [topMove, bottomMove];
        //return topMove.toString() + "," + bottomMove.toString() + "/" ;
    }

}