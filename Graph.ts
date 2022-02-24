import Move from './Move';

// src: https://stackoverflow.com/a/12646864
function shuffleArray(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default class Graph {
    private size: number;
    private adjMatrix: Array<Array<Array<Move>>>;

    constructor () {
        this.size = 0;
        this.adjMatrix = [];
    }

    addEdge(u: number, v: number, w:Move): void {
        this.adjMatrix[u][v] = [w];
        //this.adjMatrix[v][u] = w;
    }

    addMoveToEdge(u: number, v: number, w:Move): void {
        if (this.adjMatrix[u][v] === null) {
            this.adjMatrix[u][v] = [w];
        } else {
            this.adjMatrix[u][v].push(w);
        }
    }

    addVertex(): void {
        this.size++;
        this.adjMatrix.push([]);
        for (let i: number = 0; i < this.size; i++) {
            this.adjMatrix[i][this.size -1 ] = null!;
            this.adjMatrix[this.size-1][i] = null!;
        }
    }

    bfs(u: number, v: number): Array<number> {
        let visited: Array<boolean> = Array(this.size).fill(false);
        let queue: Array<Array<any>> = [[u, [u]]];
        visited[u] = true;

        while (queue.length !== 0) {
            let couple: Array<any> = queue.shift()!;
            let vertex: number = couple[0];
            let path: Array<number> = couple[1];
            visited[vertex] = true;
            let randomQueue: Array<Array<any>> = [];

            for (let i: number = 0; i < this.adjMatrix[vertex].length; i++) {
                if (this.adjMatrix[vertex][i] != null) {
                    if (i == v) {
                        let newPath: Array<number> = [...path];
                        newPath.push(v);
                        return newPath;
                    } else if (visited[i] === false) {
                        visited[i] = true;
                        let newPath: Array<number> = [...path];
                        newPath.push(i);
                        randomQueue.push([i, newPath])
                    }
                }
            }
            randomQueue = shuffleArray(randomQueue);
            queue = queue.concat(randomQueue);
            //console.log(queue);

        }
        return [];
    }

    printMatrix(): void {
        for (let i: number = 0; i < this.size; i++) {
            let row: string = '';
            for (let j: number = 0; j < this.size; j++) {
                if (this.adjMatrix[i][j] !== null) {
                row += "i: " + i + "j: " + j + "\t";
                //row += ` ${this.adjMatrix[i][j].getTop()}`;
                //row += ` ${this.adjMatrix[i][j].getBottom()}`;
                //row += ` ${this.adjMatrix[i][j].getSlice()}`;
                }
            }
            console.log(row);
        }
    }

    getMove(u: number, v: number): Move {
        return this.adjMatrix[u][v][Math.floor(Math.random()*this.adjMatrix[u][v].length)];
    }

}