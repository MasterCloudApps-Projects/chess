import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"
import { getQueenMoveRule } from "./queenMoveRule.js"

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

    function nextMoveRule() {
        if(shouldTurnToQueen())
            return getQueenMoveRule();
        return this;
    }

    //TODO: pending to implement for change status isFirstMovement
    function doAfterMovement (currentPosition, pieces) {
        moveRule.updateCurrentPosition(currentPosition, pieces);
        isFirstMovement = false;
    }

    function shouldTurnToQueen () {
        let coordinate = moveRule.getCurrentCoordinate();
        if (isFromNorthSide && coordinate.getRow() <= 2)
            return true;
        if (!isFromNorthSide && coordinate.getRow() >= 7)
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
            doAfterMovement,
            shouldTurnToQueen,
            getAttackMovements,
            nextMoveRule
        }
    };
}

export {
    getPawnMoveRule
}
