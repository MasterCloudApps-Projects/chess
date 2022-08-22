import { createMovement, getRow } from "./movement.js";

/** Pawn movement strategy.
*   Moves forward 1 by 1 except:
*    - Only during the first movement it can move forward 1 or 2 positions.
*    - Can eat diagonally.
*/

let pawnMovement = createMovement();
pawnMovement.isFirstMovement = true;
pawnMovement.isFromNorthSide = function () {
    return getRow(this.currentPosition) == 7;
};

pawnMovement.move = function (destination) {
    if (this.isFirstMovement)
        this.isFromNorthSide = this.isFromNorthSide();

    let possibleMovements = this.getPossibleMovements();
    if(!possibleMovements.includes(destination))
        console.log("Invalid pawn movement"); //TODO: exception
    else {
        this.isFirstMovement = false;
        return true;
    }
}

pawnMovement.getPossibleMovements = function () {
    let possibleMovements = [];
    possibleMovements.push(...this.getForwardMovements());
    possibleMovements.push(...this.getEatingMovements());
    return possibleMovements;
}

pawnMovement.getForwardMovements = function () {
    let movements = [];
    let nextSquare = this.getForwardSquare();

    if (this.isEmptyCoordinate(nextSquare)) {
        movements.push(nextSquare);
        if (this.isFirstMovement && this.isEmptyCoordinate(this.getForwardSquare(nextSquare)))
            movements.push(this.getForwardSquare(nextSquare));
    }
    return movements;
}

pawnMovement.getEatingMovements = function () {
    let movements = [];
    let rightDiagonal = this.getDiagonalRightSquare();
    let leftDiagonal = this.getDiagonalLeftSquare();

    if (this.isOpposingColor(rightDiagonal))
        movements.push(rightDiagonal);
    if (this.isOpposingColor(leftDiagonal))
        movements.push(leftDiagonal);

    return movements;
}

pawnMovement.getForwardSquare = function () {
    if (this.isFromNorthSide)
        return this.getNextSquareSouth();
    else
        return this.getNextSquareNorth();
}

pawnMovement.getDiagonalRightSquare = function () {
    if (this.isFromNorthSide)
        return this.getNextSouthEastDiagonal();
    else
        return this.getNextNorthEastDiagonal();
}

pawnMovement.getDiagonalLeftSquare = function () {
    if (this.isFromNorthSide)
        return this.getNextSouthWestDiagonal();
    else
        return this.getNextNorthWestDiagonal();
}

export {
    pawnMovement
}
