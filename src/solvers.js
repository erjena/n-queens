/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/


window.findNRooksSolution = function (n) {
  var tempN = n;
  var matrix = new Board({ n: n });
  var count = 0;
  var placePiece = function (tempN) {
    if (tempN <= 0) {
      var solution = matrix.rows();
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }
    if (count > (n * n - 1)) {
      return;
    }
    var index = getIndex(count, n);
    matrix.togglePiece(index.row, index.column);
    if (!matrix.hasAnyRowConflicts() && !matrix.hasAnyColConflicts()) {
      count++;
      tempN--;
      return placePiece(tempN);
    } else {
      matrix.togglePiece(index.row, index.column);
      count++;
      return placePiece(tempN);
    }
  };
  return placePiece(tempN);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var matrix = new Board({ n: n });
  var solutionCount = 0;
  var colVisited = {}; 

  for (let j = 0; j < n; j++) {
    colVisited[j] = false;
  }

  var solve = function (rowStart) {
    if (rowStart === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      matrix.togglePiece(rowStart, i);
      if (!colVisited[i]) {
        colVisited[i] = true;
        solve(rowStart + 1);
        colVisited[i] = false;
      }
      matrix.togglePiece(rowStart, i);
    }
  }
  solve(0);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var matrix = new Board({ n: n });
  var solution;
  var numOfQueens = 0;
  var done = false;
  var diagonalMajor = {};
  var diagonalMinor = {};

  if (n === 2 || n === 3) {
    return matrix.rows();
  }
  
  for (let i = -n + 1; i <= n - 1; i++) {
    diagonalMajor[i] = false;
  }

  for (let i = 0; i <= 2 * n - 2; i++) {
    diagonalMinor[i] = false;
  }

  var colVisited = {}; 
  for (let j = 0; j < n; j++) {
    colVisited[j] = false;
  }

  var findQueens = function (rowStart) {
    if (done) {
      return;
    }
    if (rowStart === n) {
      if (numOfQueens === n) {
        solution = matrix.rows();
        done = true;
      }
      return;
    }

    for (var i = 0; i < n; i++) {
      
      matrix.togglePiece(rowStart, i);
      let maj = matrix._getFirstRowColumnIndexForMajorDiagonalOn(rowStart, i);
      let minor = matrix._getFirstRowColumnIndexForMinorDiagonalOn(rowStart, i);
      if (!colVisited[i] && !diagonalMajor[maj] && !diagonalMinor[minor]) {
        numOfQueens++;
        colVisited[i] = true;
        diagonalMajor[maj] = true;
        diagonalMinor[minor] = true;
        findQueens(rowStart + 1);
        numOfQueens--;
        diagonalMajor[maj] = false;
        diagonalMinor[minor] = false;
        colVisited[i] = false;
      }
      if (!done) {
        matrix.togglePiece(rowStart, i);
      } else {
        break;
      }
    }
  }
  findQueens(0);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var matrix = new Board({ n: n });
  var solutionCount = 0;

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var colVisited = {}; 
  for (let j = 0; j < n; j++) {
    colVisited[j] = false;
  }

  var solve = function (rowStart) {
    if (rowStart === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      matrix.togglePiece(rowStart, i);
      if (!colVisited[i] && !matrix.hasAnyMajorDiagonalConflicts() && !matrix.hasAnyMinorDiagonalConflicts()) {
        colVisited[i] = true;
        solve(rowStart + 1);
        colVisited[i] = false;
      }
      matrix.togglePiece(rowStart, i);
    }
  }
  solve(0);
  return solutionCount;
};


var getIndex = function (count, n) {
  var index = {};
  index.row = Math.floor(count / n);
  index.column = count % n;

  return index;
};