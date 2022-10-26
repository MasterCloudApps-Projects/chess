import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"

function getKingMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        possibleMovements.push(...getMovements(DirectionEnum.NORTH));
        possibleMovements.push(...getMovements(DirectionEnum.SOUTH));
        possibleMovements.push(...getMovements(DirectionEnum.EAST));
        possibleMovements.push(...getMovements(DirectionEnum.WEST));

        possibleMovements.push(...getMovements(DirectionEnum.NORTHEAST_DIAGONAL));
        possibleMovements.push(...getMovements(DirectionEnum.SOUTHEAST_DIAGONAL));
        possibleMovements.push(...getMovements(DirectionEnum.NORTHWEST_DIAGONAL));
        possibleMovements.push(...getMovements(DirectionEnum.SOUTHWEST_DIAGONAL));
        return possibleMovements;
    }

    function getMovements(direction) {
        let movements = [];
        let nextSquare = moveRule.getCurrentCoordinate().getNextCoordinate(direction);
        if(moveRule.isEmptyCoordinate(nextSquare) || moveRule.isOpposingColor(nextSquare))
            movements.push(nextSquare)
        return movements;
    }

    return {
        ...moveRule,
        ...{
            getPossibleMovements
        }
    }
}

export {
    getKingMoveRule
}
