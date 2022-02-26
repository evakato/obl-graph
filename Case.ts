//import {isEqArray } from './isEqArray';

export default class Case {
    private tc: Array<number>;
    private bc: Array<number>;
    private te: Array<number>;
    private be: Array<number>;
    //private optimal: number;

    constructor (tc: Array<number>, bc: Array<number>, te: Array<number>, be: Array<number>) {
        this.tc = tc;
        this.bc = bc;
        this.te = te;
        this.be = be;
    }

    gettc(): Array<number> { return this.tc };
    getbc(): Array<number> { return this.bc };
    gette(): Array<number> { return this.te };
    getbe(): Array<number> { return this.be };

    audf(u: number, d: number): Case {
        let topPos: Array<Array<number>> = this.topMove(u);
        let bottomPos: Array<Array<number>> = this.bottomMove(d);
        return new Case(topPos[0], bottomPos[0], topPos[1], bottomPos[1]);
    }

    // offset: 0 when 1,0; 1 when -1,0
    slice(offset: number): Case {
        let newtc: Array<number> = [];
        let newbc: Array<number> = [];
        let newte: Array<number> = [];
        let newbe: Array<number> = [];
        // corners
        if (this.tc.includes(1)) newtc.push(1);
        if (this.tc.includes(2)) newtc.push(2);
        if (this.tc.includes(3)) newbc.push(1);
        if (this.tc.includes(4)) newbc.push(2);
        if (this.bc.includes(1)) newtc.push(3);
        if (this.bc.includes(2)) newtc.push(4);
        if (this.bc.includes(3)) newbc.push(3);
        if (this.bc.includes(4)) newbc.push(4);
        //edges
        if (this.te.includes(2)) newte.push(2);
        if (this.te.includes(4)) newbe.push(2);
        if (this.be.includes(2)) newte.push(4);
        if (this.be.includes(4)) newbe.push(4);
        if (offset === 0) {
            if (this.te.includes(1)) newte.push(1);
            if (this.te.includes(3)) newbe.push(1);
            if (this.be.includes(1)) newte.push(3);
            if (this.be.includes(3)) newbe.push(3);
        } else {
            if (this.te.includes(1)) newbe.push(3);
            if (this.te.includes(3)) newte.push(3);
            if (this.be.includes(1)) newbe.push(1);
            if (this.be.includes(3)) newte.push(1);
        }
        return new Case(newtc, newbc, newte, newbe);
    }

    equals(other: Case): Array<number> {
        if (this.tc.length != other.gettc().length || this.bc.length != other.getbc().length || this.te.length != other.gette().length || this.be.length != other.getbe().length) {
            return null!;
        }
        let topMove: number = -1;
        // 1 = U, 2 = U2, 3 = U'
        for (let move: number = 0; move <= 3; move++) {
            let newState: Array<Array<number>> = this.topMove(move);
            if (this.arrayEquals(newState[0], other.gettc()) && this.arrayEquals(newState[1], other.gette())) {
                topMove = move;
                break;
            }
        }
        if (topMove === -1) return null!;

        let bottomMove: number = -1;
        for (let move: number = 0; move <= 3; move++) {
            let newState: Array<Array<number>> = this.bottomMove(move);
            if (this.arrayEquals(newState[0], other.getbc()) && this.arrayEquals(newState[1], other.getbe())) {
                bottomMove = move;
                break;
            }
        }
        if (bottomMove === -1) return null!;

        return [topMove, bottomMove];
    }

    arrayEquals(a: Array<number>, b: Array<number>): boolean {
        a = a.sort();
        b = b.sort();
        return a.every((val, index) => val === b[index]);
    }

    //move: 1, 2, or 3 (U, U2, U')
    topMove(move: number): Array<Array<number>> {
        let newtc: Array<number> = [];
        let newte: Array<number> = [];
        this.tc.forEach((pos, i) => {
            let newPos: number = pos + move;
            if (newPos > 4) newPos = newPos - 4;
            newtc.push(newPos);
        });
        this.te.forEach((pos, i) => {
            let newPos: number = pos + move;
            if (newPos > 4) newPos = newPos - 4;
            newte.push(newPos);
        });
        return [newtc, newte];
    }

    bottomMove(move: number): Array<Array<number>> {
        let newbc: Array<number> = [];
        let newbe: Array<number> = [];
        this.bc.forEach((pos, i) => {
            let newPos: number = pos + move;
            if (newPos > 4) newPos = newPos - 4;
            newbc.push(newPos);
        });
        this.be.forEach((pos, i) => {
            let newPos: number = pos + move;
            if (newPos > 4) newPos = newPos - 4;
            newbe.push(newPos);
        });
        return [newbc, newbe];
    }

    print():void {
        console.log("Case ~~~")
        console.log("Corners: top- " + this.tc + " bottom- " + this.bc + "");
        console.log("Edges: top- " + this.te + " bottom- " + this.be + "\n");
    }
}


