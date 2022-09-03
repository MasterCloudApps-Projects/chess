import { createPieceMoveRule } from "./pieceMoveRule.js";
import { getRow } from "../coordinate/coordinate.js";

function getPawnMoveRule(isFirstMovement, isFromNorthSide) {
    let moveRule = createPieceMoveRule();
    moveRule.isFirstMovement = isFirstMovement;
    moveRule.isFromNorthSide = isFromNorthSide;

    moveRule.getPossibleMovements = function () {
        let possibleMovements = [];
        possibleMovements.push(...getForwardMovements());
        possibleMovements.push(...getEatingMovements());
        return possibleMovements;
    }

    moveRule.doAfterMovement = function (currentPosition) {
        this.currentPosition = currentPosition;
        this.isFirstMovement = false;
    }

    moveRule.shouldTurnToQueen = function () {
        if (this.isFromNorthSide && getRow(this.currentPosition) <= 1)
            return true;
        if (!this.isFromNorthSide && getRow(this.currentPosition) >= 8)
            return true;
        return false;
    }

    moveRule.attackMovements = function() {
        return getEatingMovements()
    };

    function getForwardMovements() {
        let movements = [];
        let nextSquare = getForwardSquare(moveRule.currentPosition);
        if (moveRule.isEmptyCoordinate(nextSquare)) {
            movements.push(nextSquare);
            if (moveRule.isFirstMovement && moveRule.isEmptyCoordinate(getForwardSquare(nextSquare)))
                movements.push(getForwardSquare(nextSquare));
        }
        return movements;
    }

    function getEatingMovements() {
        let movements = [];
        let rightDiagonal = getDiagonalRightSquare(moveRule.currentPosition);
        let leftDiagonal = getDiagonalLeftSquare(moveRule.currentPosition);
        if (moveRule.isOpposingColor(rightDiagonal))
            movements.push(rightDiagonal);
        if (moveRule.isOpposingColor(leftDiagonal))
            movements.push(leftDiagonal);

        return movements;
    }

    function getForwardSquare(origin) {
        if (moveRule.isFromNorthSide)
            return moveRule.getNextSquareSouth(origin);
        else
            return moveRule.getNextSquareNorth(origin);
    }

    function getDiagonalRightSquare(origin) {
        if (moveRule.isFromNorthSide)
            return moveRule.getNextSouthEastDiagonal(origin);
        else
            return moveRule.getNextNorthEastDiagonal(origin);
    }

    function getDiagonalLeftSquare(origin) {
        if (moveRule.isFromNorthSide)
            return moveRule.getNextSouthWestDiagonal(origin);
        else
            return moveRule.getNextNorthWestDiagonal(origin);
    }

    return moveRule;
}

export {
    getPawnMoveRule
}
