import Case from './Case';
import Move from './Move';

export default class Graph {
    private size: number;
    private adjMatrix: Array<Array<Move>>;

    constructor () {
        this.size = 0;
        this.adjMatrix = [];
    }

    addEdge(u: number, v: number, w:Move): void {
        this.adjMatrix[u][v] = w;
        this.adjMatrix[v][u] = w;
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

            for (let i: number = 0; i < this.adjMatrix[vertex].length; i++) {
                if (this.adjMatrix[vertex][i] != null) {
                    if (i == v) {
                        let newPath: Array<number> = [...path];
                        newPath.push(v);
                        return newPath;
                    }
                    if (visited[i] === false) {
                        visited[i] = true;
                        let newPath: Array<number> = [...path];
                        newPath.push(i);
                        queue.push([i, newPath])
                    }
                }
            }

        }
        return [];
    }

    printMatrix(): void {
        for (let i: number = 0; i < this.size; i++) {
            let row: string = '';
            for (let j: number = 0; j < this.size; j++) {
                if (this.adjMatrix[i][j] !== null) {
                row += "i: " + i + "j: " + j;
                row += ` ${this.adjMatrix[i][j].getTop()}`;
                row += ` ${this.adjMatrix[i][j].getBottom()}`;
                row += ` ${this.adjMatrix[i][j].getSlice()}`;
                }
            }
            console.log(row);
        }
    }

    getMove(u: number, v: number): Move {
        return this.adjMatrix[u][v];
    }

}