/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var tempN = n;
  var matrix = new Board({n: n});
  var count = 0;
  var placePiece = function(tempN) {
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
      return placePiece(tempN)
    }
  }
  return placePiece(tempN);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({n: n});

  var recursivePlacePiece = function(tempN, startCount) {
    if (tempN === 0) {
      solutionCount++;
      return;
    }
    if (startCount > (n * n -1)) {
      return;
    }
    var index = getIndex(startCount, n);
    matrix.togglePiece(index.row, index.column);
    if (!matrix.hasAnyRowConflicts() && !matrix.hasAnyColConflicts()) {
      recursivePlacePiece(tempN-1, startCount+1);
    }
    matrix.togglePiece(index.row, index.column);
    recursivePlacePiece(tempN, startCount+1);

  }
  recursivePlacePiece(n, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var matrix = new Board({n: n});
  var solution;
  var done = false;
  var numOfQueens = 0;

  var numPiecess;

  var recursivePlacePiece = function(tempN, startCount) {
    numPiecess = _.reduce(matrix.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);

    if (done) {
      return;
    }
    if (tempN <= 0) {
      solution = matrix.rows();
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      done = true;
      return;
    }
    if (startCount > (n * n -1)) {
      if (numPiecess > numOfQueens) {
        solution = matrix.rows();
      }
      return;
    }
    var index = getIndex(startCount, n);
    matrix.togglePiece(index.row, index.column);
    if (!matrix.hasAnyRowConflicts() && !matrix.hasAnyColConflicts() &&
        !matrix.hasAnyMajorDiagonalConflicts() && !matrix.hasAnyMinorDiagonalConflicts()) {
      recursivePlacePiece(tempN-1, startCount+1);
    }
    if (!done) {
      matrix.togglePiece(index.row, index.column);
      recursivePlacePiece(tempN, startCount+1);
    }
  }
  recursivePlacePiece(n, 0);

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({n: n});

  var recursivePlacePiece = function(tempN, startCount) {
    if (tempN === 0) {
      solutionCount++;
      return;
    }
    if (startCount > (n * n -1)) {
      return;
    }
    var index = getIndex(startCount, n);
    matrix.togglePiece(index.row, index.column);
    if (!matrix.hasAnyRowConflicts() && !matrix.hasAnyColConflicts() &&
    !matrix.hasAnyMajorDiagonalConflicts() && !matrix.hasAnyMinorDiagonalConflicts()) {
      recursivePlacePiece(tempN-1, startCount+1);
    }
    matrix.togglePiece(index.row, index.column);
    recursivePlacePiece(tempN, startCount+1);

  }
  recursivePlacePiece(n, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


var getIndex = function(count, n) {
  var index = {};
  index.row = Math.floor(count / n);
  index.column = count % n;

  return index;
}