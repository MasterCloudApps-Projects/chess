import { createPieceMoveRule } from "./pieceMoveRule.js";

function getKingMoveRule() {
    let moveRule = createPieceMoveRule();

    function getPossibleMovements () {
        let possibleMovements = [];
        possibleMovements.push(...getMovements('getNextSquareNorth'));
        possibleMovements.push(...getMovements('getNextSquareSouth'));
        possibleMovements.push(...getMovements('getNextSquareEast'));
        possibleMovements.push(...getMovements('getNextSquareWest'));

        possibleMovements.push(...getMovements('getNextNorthEastDiagonal'));
        possibleMovements.push(...getMovements('getNextSouthEastDiagonal'));
        possibleMovements.push(...getMovements('getNextNorthWestDiagonal'));
        possibleMovements.push(...getMovements('getNextSouthWestDiagonal'));
        return possibleMovements;
    }

    function getMovements(nextCoordinate) {
        let movements = [];
        let origin = moveRule.getCurrentPosition();
        let nextSquare = moveRule[nextCoordinate](origin);
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
