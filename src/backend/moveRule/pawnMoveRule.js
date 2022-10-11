import { createPieceMoveRule } from "./pieceMoveRule.js";
import { getRow } from "./coordinate.js";

function getPawnMoveRule(isFirstMovement, isFromNorthSide) {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        possibleMovements.push(...getForwardMovements());
        possibleMovements.push(...getEatingMovements());
        return possibleMovements;
    }

    function doAfterMovement (currentPosition) {
        moveRule.setCurrentPosition(currentPosition);
        isFirstMovement = false;
    }

    function shouldTurnToQueen () {
        if (isFromNorthSide && getRow(moveRule.getCurrentPosition()) <= 1)
            return true;
        if (!isFromNorthSide && getRow(moveRule.getCurrentPosition()) >= 8)
            return true;
        return false;
    }

    function getAttackMovements (origin, pieces) {
        moveRule.updateCurrentPosition(origin, pieces);
        return getEatingMovements();
    }

    function getForwardMovements() {
        let movements = [];
        let nextSquare = getForwardSquare(moveRule.getCurrentPosition());
        if (moveRule.isEmptyCoordinate(nextSquare)) {
            movements.push(nextSquare);
            if (isFirstMovement && moveRule.isEmptyCoordinate(getForwardSquare(nextSquare)))
                movements.push(getForwardSquare(nextSquare));
        }
        return movements;
    }

    function getEatingMovements() {
        let movements = [];
        let rightDiagonal = getDiagonalRightSquare(moveRule.getCurrentPosition());
        let leftDiagonal = getDiagonalLeftSquare(moveRule.getCurrentPosition());
        if (moveRule.isOpposingColor(rightDiagonal))
            movements.push(rightDiagonal);
        if (moveRule.isOpposingColor(leftDiagonal))
            movements.push(leftDiagonal);

        return movements;
    }

    function getForwardSquare(origin) {
        if (isFromNorthSide)
            return moveRule.getNextSquareSouth(origin);
        else
            return moveRule.getNextSquareNorth(origin);
    }

    function getDiagonalRightSquare(origin) {
        if (isFromNorthSide)
            return moveRule.getNextSouthEastDiagonal(origin);
        else
            return moveRule.getNextNorthEastDiagonal(origin);
    }

    function getDiagonalLeftSquare(origin) {
        if (isFromNorthSide)
            return moveRule.getNextSouthWestDiagonal(origin);
        else
            return moveRule.getNextNorthWestDiagonal(origin);
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements,
            doAfterMovement,
            shouldTurnToQueen,
            getAttackMovements
        }
    };
}

export {
    getPawnMoveRule
}
