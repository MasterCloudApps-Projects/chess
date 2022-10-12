import { createPieceMoveRule } from "./pieceMoveRule.js";
import { createCoordinate } from "./coordinate.js";
import { DirectionEnum} from "./directionEnum.js"

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
        moveRule.setCurrentPosition(currentPosition);
        isFirstMovement = false;
    }

    function shouldTurnToQueen () {
        let coordinate = createCoordinate();
        if (isFromNorthSide && coordinate.getRow(moveRule.getCurrentPosition()) <= 1)
            return true;
        if (!isFromNorthSide && coordinate.getRow(moveRule.getCurrentPosition()) >= 8)
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
            return moveRule.getNextSquare(origin, DirectionEnum.south);
        else
            return moveRule.getNextSquare(origin, DirectionEnum.north);
    }

    function getDiagonalRightSquare(origin) {
        if (isFromNorthSide)
            return moveRule.getNextSquare(origin, DirectionEnum.southEast);
        else
            return moveRule.getNextSquare(origin, DirectionEnum.northEast);
    }

    function getDiagonalLeftSquare(origin) {
        if (isFromNorthSide)
            return moveRule.getNextSquare(origin, DirectionEnum.southEast);
        else
            return moveRule.getNextSquare(origin, DirectionEnum.northWest);
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
