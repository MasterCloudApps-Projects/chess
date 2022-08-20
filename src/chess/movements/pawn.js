import { getRow, rowMovement, rightDiagonal, leftDiagonal } from "./utils/utils.js";

/** Pawn movement validation.
*   Moves forward 1 by 1 execpt:
*    - In the first movement it can move forward 1 or 2
*    - Can eat diagonally
*/

function evaluate(origin, destination, board) {
    if(!(validFirstMovement(origin, destination, board) || validForward(origin, destination, board) || validEating(origin, board))){
        //TODO: exception
        console.log("Invalid pawn movement");
    }
}

function validForward(current, destination, board){
    let movements = rowMovement(current, 1, 1);
    return movements.includes(destination) && board.isEmptySquare(destination);
}

function validEating(current, destination, board){
    if(board.isBlackPiece(destination)){
        return rightDiagonal(current, 1).includes(destination) || leftDiagonal(current, 1).includes(destination);
    }
    return false;
}

function validFirstMovement(current, destination, board){
    if(getRow(current) == 2) {
        let movements = rowMovement(current, 2, 1);
        return movements.includes(destination) && board.isEmptySquare(destination);
    }
    return false;
}

export {
    evaluate
}
