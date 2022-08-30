import { createPieceMovement } from "../pieceMovement.js";

function getKingMovement() {
    let kingMovement = createPieceMovement();

    kingMovement.getPossibleMovements = function () {
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
        let origin = kingMovement.currentPosition;
        let nextSquare = kingMovement[nextCoordinate](origin);
        if(kingMovement.isEmptyCoordinate(nextSquare) || kingMovement.isOpposingColor(nextSquare))
            movements.push(nextSquare)
        return movements;
    }

    return kingMovement;
}

export {
    getKingMovement
}
