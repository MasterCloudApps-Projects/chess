import { createPieceMoveRule } from "./pieceMoveRule.js";
import { DirectionEnum } from "./directionEnum.js"

function getKingMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        possibleMovements.push(...getMovements(DirectionEnum.north));
        possibleMovements.push(...getMovements(DirectionEnum.south));
        possibleMovements.push(...getMovements(DirectionEnum.east));
        possibleMovements.push(...getMovements(DirectionEnum.west));

        possibleMovements.push(...getMovements(DirectionEnum.northEast));
        possibleMovements.push(...getMovements(DirectionEnum.southEast));
        possibleMovements.push(...getMovements(DirectionEnum.northWest));
        possibleMovements.push(...getMovements(DirectionEnum.southWest));
        return possibleMovements;
    }

    function getMovements(nextCoordinate) {
        let movements = [];
        let origin = moveRule.getCurrentPosition();
        let nextSquare = moveRule.getNextSquare(origin, nextCoordinate);
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
