import { createPieceMoveRule } from "./pieceMoveRule.js";
import { getQueenMoveRule } from "./queenMoveRule.js"
import { DirectionEnum } from "./directionEnum.js"

function getPawnMoveRule(isFirstMovementP, isFromNorthSideP) {
    let moveRule = createPieceMoveRule();
    let isFirstMovement = isFirstMovementP;
    let isFromNorthSide = isFromNorthSideP;

    function getPossibleMovements () {
        let possibleMovements = [];
        possibleMovements.push(...getForwardMovements());
        possibleMovements.push(...getEatingMovements());
        return possibleMovements;
    }

    function getNextMoveRule(currentAbbreviation) {
        isFirstMovement = false;
        if (shouldTurnToQueen())
            return { moveRule: getQueenMoveRule(), abbreviation: 'Q' }
        else
            return { moveRule: this, abbreviation: currentAbbreviation }
    }

    function shouldTurnToQueen () {
        let coordinate = moveRule.getCurrentCoordinate();
        if (isFromNorthSide && coordinate.getRow() <= 1)
            return true;
        if (!isFromNorthSide && isFromNorthSide === false && coordinate.getRow() >= 8)
            return true;
        return false;
    }

    function getAttackMovements (position, pieces) {
        moveRule.updateCurrentPosition(position, pieces);
        return getEatingMovements().map(mv => mv.getPosition());
    }

    function getForwardMovements() {
        let movements = [];
        let nextSquare = getForwardSquare(moveRule.getCurrentCoordinate());
        if (moveRule.isEmptyCoordinate(nextSquare)) {
            movements.push(nextSquare);
            if (isFirstMovement && moveRule.isEmptyCoordinate(getForwardSquare(nextSquare)))
                movements.push(getForwardSquare(nextSquare));
        }
        return movements;
    }

    function getEatingMovements() {
        let movements = [];
        let rightDiagonal = getDiagonalRightSquare(moveRule.getCurrentCoordinate());
        let leftDiagonal = getDiagonalLeftSquare(moveRule.getCurrentCoordinate());
        if (moveRule.isOpposingColor(rightDiagonal))
            movements.push(rightDiagonal);
        if (moveRule.isOpposingColor(leftDiagonal))
            movements.push(leftDiagonal);
        return movements;
    }

    function getForwardSquare(originCoordinate) {
        if (isFromNorthSide)
            return originCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        else
            return originCoordinate.getNextCoordinate(DirectionEnum.NORTH);
    }

    function getDiagonalRightSquare(origin) {
        if (isFromNorthSide)
            return origin.getNextCoordinate(DirectionEnum.SOUTHEAST);
        else
            return origin.getNextCoordinate(DirectionEnum.NORTHEAST);
    }

    function getDiagonalLeftSquare(origin) {
        if (isFromNorthSide)
            return origin.getNextCoordinate(DirectionEnum.SOUTHWEST);
        else
            return origin.getNextCoordinate(DirectionEnum.NORTHWEST);
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements,
            getAttackMovements,
            getNextMoveRule
        }
    };
}

export {
    getPawnMoveRule
}
