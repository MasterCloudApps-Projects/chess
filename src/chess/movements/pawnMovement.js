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
        return getRow(this.currentPosition) >= 5;
    };

    pawnMovement.getErrorMessages = function () {
        return "Invalid pawn movement";
    }

    pawnMovement.getPossibleMovements = function () {
        if (this.isFirstMovement)
            this.isFromNorthSide = this.checkIfFromNorthSide();
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

    pawnMovement.doAfterMovement = function (currentPosition) {
        this.currentPosition = currentPosition;
        this.isFirstMovement = false;
    }

    pawnMovement.shouldTurnToQueen = function () {
        if (this.isFromNorthSide && getRow(this.currentPosition) <= 1)
            return true;
        if (!this.isFromNorthSide && getRow(this.currentPosition) >= 8)
            return true;
        return false;
    }

    pawnMovement.getThreatenedPositions = function(origin, pieces) {
        this.updateCurrentPosition(origin, pieces);
        let movements = [];
        let rightDiagonal = this.getDiagonalRightSquare(this.currentPosition);
        let leftDiagonal = this.getDiagonalLeftSquare(this.currentPosition);
        if (this.isOpposingColor(rightDiagonal) || this.isEmptyCoordinate(rightDiagonal))
            movements.push(rightDiagonal);
        if (this.isOpposingColor(leftDiagonal) || this.isEmptyCoordinate(leftDiagonal))
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
