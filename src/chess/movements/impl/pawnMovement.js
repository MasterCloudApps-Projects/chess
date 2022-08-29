import { createPieceMovement } from "../pieceMovement.js";
import { getRow } from '../../coordinate/coordinate.js'

function getPawnMovement() {
    let pawnMovement = createPieceMovement();

    pawnMovement.isFirstMovement = true;

    pawnMovement.checkIfFromNorthSide = function () {
        if (this.isFirstMovement)
            this.isFromNorthSide = getRow(this.currentPosition) >= 5;
        return this.isFromNorthSide;
    };

    pawnMovement.getPossibleMovements = function () {
        this.checkIfFromNorthSide();
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

    pawnMovement.attackMovements = function() {
        return this.getEatingMovements()
    };

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
