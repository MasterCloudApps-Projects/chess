const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function getRow(square){
    return square.slice(1, 2);
}

function getColumn(square){
    return square.slice(0, 1);
}

function getIndexColumn(square){
    return columns.indexOf(getColumn(square));
}

//flowValue {1, -1}
function rowMovement(square, total, flowValue){
    let movements = [];
    let currentColumn = getColumn(square);
    let row = parseInt(getRow(square));
   for (let i=1; i <= total; i++){
        row = row + flowValue;
        movements.push(currentColumn + row);
    }
    return movements;
}

//flow rightDiagonal c:+1 r:+1
//flow rightDownDiagonal c:+1 r:-1
//flow leftDiagonal c:-1 r:+1
//flow leftDiagonal c:-1 r:-1
function diagonal(square, total, flowRow, flowColumn){
    let movements = [];
    let column = getIndexColumn(square);
    let row = parseInt(getRow(square));
   for (let i=1; i <= total; i++){
    if (columns.length > column + 1 && column - 1 >= 0) {
        column = column + flowColumn;
        row = row + flowRow;
        movements.push(columns[column] + row);
    }
  }
    return movements;
}

function filter(possibleMovements, current, board){
    let movements = [];
    for (let i=1; i <= possibleMovements.length; i++){
        if(possibleMovements[i] && board.getPieceColor(possibleMovements[i]) != board.getPieceColor(current)) {
            movements.push(possibleMovements[i]);
        }
    }
    return movements;
}

export {
    getRow, rowMovement, diagonal, filter
}
