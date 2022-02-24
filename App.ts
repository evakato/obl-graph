import Case from './Case';
import Graph from './Graph';
import Move from './Move';

function postMoveTweak(move: number) {
  if (move === 1) {
    return 3;
  } else if (move === 3) {
    return 1;
  } 
  return move;
}

function sumMoveTweak(move: number): number {
  if (move > 6 && move < 12) {
    return -1*(12 - move);
  } else if (move >= 12) {
    return move - 12;
  } else if (move < -6 && move > -12) {
    return 12 - (move*-1);
  } else if (move <= -12) {
    return move + 12;
  }
  return move;
}

function getSquareMove(offset: number): Array<number> {
  if (offset === 0) {
    return [-1, 0];
  }
  return [0, 1];
}

function squareOut(offset: number, preArr: Array<number>): Array<number> {
  if (offset === 0) {
    preArr[2]--;
  } else {
    preArr[3]++; 
    preArr[3] === 7 ? (preArr[3] = -5) : (preArr[3]);
  }
  return preArr;
}

let solved: Case = new Case([1, 2, 3, 4], [], [1, 2, 3, 4], []);
// 1,0/-4,-1/
let kitekite1 = solved.slice(0);
let kitekite2 = solved.slice(1);
let gem_raxe: Case = new Case([1,2,3], [1], [2,3], [1,3]);
let spill_spill: Case = new Case([1,3,4], [1,2], [1], [2,3]);

let visitedCases: Array<Case> = [solved, kitekite1, kitekite2];
let queue: Array<Case> = [kitekite1, kitekite2];
let graph: Graph = new Graph();
graph.addVertex();
graph.addVertex();
graph.addVertex();
graph.addEdge(0, 1, new Move(0, 0 , 0, -1, -1));
graph.addEdge(0, 2, new Move(0, 0 , 1, -1, -1));

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
            graph.addEdge(visitedCases.indexOf(currentCase), visitedCases.length-1, new Move(i, j, s, -1, -1));
            queue.push(newCase);
          }
          else {
            let postI: number = postMoveTweak(offset[0]);
            let postJ: number = postMoveTweak(offset[1]);
            graph.addMoveToEdge(visitedCases.indexOf(currentCase), index, new Move(i, j, s, postI, postJ));
          }

        }
      }
    }
  }
}

//console.log(visitedCases.length);
//visitedCases.forEach((eachCase, id) => {console.log(id); eachCase.print()});
console.log(visitedCases.length);

let correctIndex: number = -1;
visitedCases.forEach((eachCase, i) => {
  if (eachCase.equals(gem_raxe)) {
      correctIndex = i;
  }
})

function getMoveSequence(graphSol: Array<number>): Array<Array<number>> {
  let finalSol: Array<Array<number>> = [];
  let prevSlice: number = -1;
  for (let i: number = 0; i < graphSol.length - 1; i++) {
    let moveseq: Move = graph.getMove(graphSol[i], graphSol[i+1]);
    //console.log(moveseq.getMoveString(prevSlice));
    finalSol.push(moveseq.getMoveString(prevSlice));
    if (i === graphSol.length - 2) {
      if (finalSol[finalSol.length -1].length === 2) {
        finalSol[finalSol.length-1] = finalSol[finalSol.length-1].concat(getSquareMove(moveseq.getSlice()));
      } else {
        finalSol[finalSol.length -1] = squareOut(moveseq.getSlice(), finalSol[finalSol.length-1]);
      }
    }
    prevSlice = moveseq.getSlice();
  }

  return finalSol;

}

//visitedCases[correctIndex].print();
//if specified case is found
if (correctIndex !== -1) {
  let finalSol: Array<Array<number>> = [];
  const randomState: number = Math.floor(Math.random()*100 + 234);
  visitedCases[randomState].print();

  const graphSol: Array<number> = graph.bfs(0,randomState);
  const moveSequence: Array<Array<number>> = getMoveSequence(graphSol);
  moveSequence.forEach(el => console.log(el));

  console.log("");
  const graphSol2: Array<number> = graph.bfs(randomState, correctIndex);
  const moveSequence2: Array<Array<number>> = getMoveSequence(graphSol2);
  moveSequence2.forEach(el => console.log(el));
  console.log("");

  finalSol = moveSequence.concat(moveSequence2);
  let finalString: string = "";
  let topOffset: number = 0;
  let bottomOffset: number = 0;
  for (let i = 0; i < finalSol.length; i++) {
    console.log(finalSol[i]);
    let finalTopMove: number = finalSol[i][0] + topOffset;
    let finalBottomMove: number = finalSol[i][1] + bottomOffset;
    finalTopMove = sumMoveTweak(finalTopMove);
    finalBottomMove = sumMoveTweak(finalBottomMove);

    finalString += finalTopMove + "," + finalBottomMove + "/";
    if (finalSol[i].length > 2) {
      topOffset = finalSol[i][2];
      bottomOffset = finalSol[i][3];
    } else {
      topOffset = 0;
      bottomOffset = 0;
    }
  }
  finalString += topOffset + "," + bottomOffset;

  console.log(finalString);
}


//graph.printMatrix();
