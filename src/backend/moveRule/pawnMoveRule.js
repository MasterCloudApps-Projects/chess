import { createPieceMoveRule } from "./pieceMoveRule.js";
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

    function doAfterMovement (currentPosition) {
        moveRule.updateCurrentPosition(currentPosition);
        isFirstMovement = false;
    }

    function shouldTurnToQueen () {
        let coordinate = moveRule.getCurrentCoordinate();
        if (isFromNorthSide && coordinate.getRow() <= 1)
            return true;
        if (!isFromNorthSide && coordinate.getRow() >= 8)
            return true;
        return false;
    }

    function getAttackMovements (origin, pieces) {
        moveRule.updateCurrentPosition(origin, pieces);
        return getEatingMovements();
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
            return origin.getNextCoordinate(DirectionEnum.SOUTHEAST_DIAGONAL);
        else
            return origin.getNextCoordinate(DirectionEnum.NORTHEAST_DIAGONAL);
    }

    function getDiagonalLeftSquare(origin) {
        if (isFromNorthSide)
            return origin.getNextCoordinate(DirectionEnum.SOUTHWEST_DIAGONAL);
        else
            return origin.getNextCoordinate(DirectionEnum.NORTHWEST_DIAGONAL);
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
