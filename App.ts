import Case from './Case';
import Graph from './Graph';
import Move from './Move';

let solved: Case = new Case([1, 2, 3, 4], [], [1, 2, 3, 4], []);
// 1,0/-4,-1/
let kitekite1 = solved.slice(0);
let kitekite2 = solved.slice(1);

let visitedCases: Array<Case> = [solved, kitekite1, kitekite2];
let queue: Array<Case> = [kitekite1, kitekite2];
let graph: Graph = new Graph();
graph.addVertex();
graph.addVertex();
graph.addVertex();
graph.addEdge(0, 1, new Move(0, 0 , 0));
graph.addEdge(0, 2, new Move(0, 0 , 1));

while (queue.length !== 0) {
  let currentCase: Case = queue.shift()!;
  /*
  console.log("CURRENT");
  currentCase.print();
  */

  let currentCaseIndex: number = -1;
  visitedCases.every((eachCase, id) => {
      if (eachCase.equals(currentCase)) {
          currentCaseIndex = id;
          return false;
      }
      return true;
  })

  for (let i: number = 0; i < 4; i++) {
    for (let j: number = 0; j < 4; j++) {
      for (let s: number = 0; s < 2; s++) {
        if (!(i === 0 && j === 0) && !(i === 2 && j === 2)) {
          let newCase: Case = currentCase.audf(i, j).slice(s);

          /*
          console.log("bitch i caught the case");
          visitedCases.forEach(eachCase => eachCase.print());
          console.log("newcase: ");
          newCase.print();
          */

          let index: number = -1;
          let offset: Array<number> = null!;
          visitedCases.every((eachCase, id) => {
              offset = eachCase.equals(newCase);
              if (offset) {
                  index = id;
                  return false;
              }
              return true;
          })

          if (index === -1) {
            visitedCases.push(newCase);
            graph.addVertex();
            graph.addEdge(visitedCases.indexOf(currentCase), visitedCases.length-1, new Move(i, j, s));
            queue.push(newCase);
          } 
          /*
          else {
            console.log("first move: " + offset[0] + " second: " + offset[1]);
            console.log("first move2: " + i + " second2: " + j);
            let newTopMove: number = i + offset[0];
            let newBottomMove: number = j + offset[1];
            newTopMove > 3 ? (newTopMove -= 4) : (newTopMove);
            newBottomMove > 3 ? (newBottomMove -= 4) : (newBottomMove);
            console.log("first move3: " + newTopMove + " second3: " + newBottomMove);
            graph.addEdge(visitedCases.indexOf(currentCase), index, new Move(newTopMove, newBottomMove, s));
          }
          */
        }
      }
    }
  }
}

//console.log(visitedCases.length);
console.log("lfg");
//visitedCases.forEach((eachCase, id) => {console.log(id); eachCase.print()});
console.log(visitedCases.length);
visitedCases[230].print();
const sol: Array<number> = graph.bfs(0,230);
console.log(sol);
sol.forEach(el => visitedCases[el].print());

let prevSlice: number = -1;
for (let i: number = 0; i < sol.length - 1; i++) {
  let moveseq: Move = graph.getMove(sol[i], sol[i+1]);
  let moveStr = moveseq.getMoveString(prevSlice);
  prevSlice = moveseq.getSlice();
  console.log(moveStr);
}


console.log("hello victim");
console.log(visitedCases[209].print());


//graph.printMatrix();
