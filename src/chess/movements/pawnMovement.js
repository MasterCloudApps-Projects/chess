import { createMovement, getRow } from "./movement.js";

/** Pawn movement strategy.
*   Moves forward 1 by 1 except:
*    - Only during the first movement it can move forward 1 or 2 positions.
*    - Can eat diagonally.
*/

function getPawnMovement() {
    let pawnMovement = createMovement();
    pawnMovement.isFirstMovement = true;
    pawnMovement.checkIfFromNorthSide = function () {
        return getRow(this.currentPosition) == 7;
    };

    pawnMovement.move = function (destination) {
        if (this.isFirstMovement)
            this.isFromNorthSide = this.checkIfFromNorthSide();

        let possibleMovements = this.getPossibleMovements();
        if(!possibleMovements.includes(destination)) {
            console.log("Invalid pawn movement"); //TODO: exception
            return false;
        } else {
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
        let nextSquare = this.getForwardSquare(this.currentPosition);
        if (this.isEmptyCoordinate(nextSquare)) {
            movements.push(nextSquare);
            if (this.isFirstMovement && this.isEmptyCoordinate(this.getForwardSquare(nextSquare)))
                movements.push(this.getForwardSquare(nextSquare));
        }
        return movements;
    }

    pawnMovement.getEatingMovements = function () {
        let movements = [];
        let rightDiagonal = this.getDiagonalRightSquare(this.currentPosition);
        let leftDiagonal = this.getDiagonalLeftSquare(this.currentPosition);
        if (this.isOpposingColor(rightDiagonal))
            movements.push(rightDiagonal);
        if (this.isOpposingColor(leftDiagonal))
            movements.push(leftDiagonal);

        return movements;
    }

    pawnMovement.getForwardSquare = function (origin) {
        if (this.isFromNorthSide)
            return this.getNextSquareSouth(origin);
        else
            return this.getNextSquareNorth(origin);
    }

    pawnMovement.getDiagonalRightSquare = function (origin) {
        if (this.isFromNorthSide)
            return this.getNextSouthEastDiagonal(origin);
        else
            return this.getNextNorthEastDiagonal(origin);
    }

    pawnMovement.getDiagonalLeftSquare = function (origin) {
        if (this.isFromNorthSide)
            return this.getNextSouthWestDiagonal(origin);
        else
            return this.getNextNorthWestDiagonal(origin);
    }

    return pawnMovement;
}
export {
    getPawnMovement
}
