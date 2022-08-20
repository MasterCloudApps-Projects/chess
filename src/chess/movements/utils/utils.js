
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

//flow c:+1 r:+1
function rightDiagonal(square, total){
    let movements = [];
    let column = getIndexColumn(square);
    let row = parseInt(getRow(square));
   for (let i=1; i <= total; i++){
    if (columns.length > column + 1) {
        column = column + 1; //+1
        row = row + 1;
        movements.push(columns[column] + row);
    }
  }
    return movements;
}

//flow  c:-1 r:+1
function leftDiagonal(square, total){
    let movements = [];
    let column = getIndexColumn(square);
    let row = parseInt(getRow(square));
   for (let i=1; i <= total; i++){
    if (column - 1 >= 0) {
        column = column - 1; //-1
        row = row + 1;
        movements.push(columns[column] + row);
    }
  }
    return movements;
}

export {
    getRow, rowMovement, rightDiagonal, leftDiagonal
}
