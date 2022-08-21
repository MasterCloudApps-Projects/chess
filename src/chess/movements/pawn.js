import { getRow, rowMovement, diagonal, filter } from "./utils/utils.js";

/** Pawn movement validation.
*   Moves forward 1 by 1 execpt:
*    - In the first movement it can move forward 1 or 2
*    - Can eat diagonally
*/

function evaluatePawnMovement(origin, destination, board) {
    let possibleMovements = move(origin, board);
    if(!possibleMovements.includes(destination)){
        //TODO: exception
        console.log("Invalid pawn movement");
    }
}

function move(origin, board) {
    let possibleMovements = [];
    possibleMovements.push(...getFirstMovement(origin, board));
    possibleMovements.push(...getForwardMovement(origin, board));
    let filterMovements = filter(possibleMovements, origin, board);
    filterMovements.push(...getEatingMovement(origin, board));
    return filterMovements;
}

function getFirstMovement(current, board){
    let movements = [];
    if(board.isWhitePiece(current)){
        if(getRow(current) == 2) {
            movements.push(...rowMovement(current, 2, 1));
        }
    } else if(board.isBlackPiece(current)) {
        if(getRow(current) == 7) {
            movements.push(...rowMovement(current, 2, -1));
        }
    }
    return movements;
}

function getForwardMovement(current, board){
    let movements = [];
    if(board.isWhitePiece(current)){
        movements.push(...rowMovement(current, 1, 1));
    } else if(board.isBlackPiece(current)) {
        movements.push(...rowMovement(current, 1, -1));
    }
    return movements;
}

function getEatingMovement(current, board){
    const piece = board.getPiece(current);
    let movements = [];
    let rightDiagonal = [];
    let leftDiagonal = [];

    if(board.isWhitePiece(current)){
        rightDiagonal = diagonal(current, 1, 1, 1);
        leftDiagonal = diagonal(current, 1, 1, -1);
    } else if(board.isBlackPiece(current)) {
        rightDiagonal = diagonal(current, 1, -1, 1);
        leftDiagonal = diagonal(current, 1, -1, -1);
    }

    if(!(board.isEmptySquare(rightDiagonal[0]) && board.getPiece(rightDiagonal[0]).type == piece.type)) {
        movements.push(rightDiagonal[0]);
    }

    if(!(board.isEmptySquare(rightDiagonal[0]) && board.getPiece(rightDiagonal[0]).type == piece.type)) {
        movements.push(leftDiagonal[0]);
    }
    return movements;
}

export {
    move, evaluatePawnMovement
}
