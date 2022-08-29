import { createPieceMovement } from "../pieceMovement.js";
import { getRow } from '../../coordinate/coordinate.js'

function getPawnMovement() {
    let pawnMovement = createPieceMovement();
    pawnMovement.isFirstMovement = true;

    pawnMovement.getPossibleMovements = function () {
        this.checkIfFromNorthSide();
        let possibleMovements = [];
        possibleMovements.push(...getForwardMovements());
        possibleMovements.push(...getEatingMovements());
        return possibleMovements;
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
        return getEatingMovements()
    };

    pawnMovement.checkIfFromNorthSide = function () {
        if (pawnMovement.isFirstMovement)
            pawnMovement.isFromNorthSide = getRow(pawnMovement.currentPosition) >= 5;
        return pawnMovement.isFromNorthSide;
    }

    function getForwardMovements() {
        let movements = [];
        let nextSquare = getForwardSquare(pawnMovement.currentPosition);
        if (pawnMovement.isEmptyCoordinate(nextSquare)) {
            movements.push(nextSquare);
            if (pawnMovement.isFirstMovement && pawnMovement.isEmptyCoordinate(getForwardSquare(nextSquare)))
                movements.push(getForwardSquare(nextSquare));
        }
        return movements;
    }

    function getEatingMovements() {
        let movements = [];
        let rightDiagonal = getDiagonalRightSquare(pawnMovement.currentPosition);
        let leftDiagonal = getDiagonalLeftSquare(pawnMovement.currentPosition);
        if (pawnMovement.isOpposingColor(rightDiagonal))
            movements.push(rightDiagonal);
        if (pawnMovement.isOpposingColor(leftDiagonal))
            movements.push(leftDiagonal);

        return movements;
    }

    function getForwardSquare(origin) {
        if (pawnMovement.isFromNorthSide)
            return pawnMovement.getNextSquareSouth(origin);
        else
            return pawnMovement.getNextSquareNorth(origin);
    }

    function getDiagonalRightSquare(origin) {
        if (pawnMovement.isFromNorthSide)
            return pawnMovement.getNextSouthEastDiagonal(origin);
        else
            return pawnMovement.getNextNorthEastDiagonal(origin);
    }

    function getDiagonalLeftSquare(origin) {
        if (pawnMovement.isFromNorthSide)
            return pawnMovement.getNextSouthWestDiagonal(origin);
        else
            return pawnMovement.getNextNorthWestDiagonal(origin);
    }

    return pawnMovement;
}

export {
    getPawnMovement
}
