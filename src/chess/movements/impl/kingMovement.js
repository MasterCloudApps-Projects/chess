import { createPieceMovement } from "../pieceMovement.js";

function getKingMovement() {
    let kingMovement = createPieceMovement();

    kingMovement.getPossibleMovements = function () {
        let possibleMovements = [];
        possibleMovements.push(...this.getMovements('getNextSquareNorth'));
        possibleMovements.push(...this.getMovements('getNextSquareSouth'));
        possibleMovements.push(...this.getMovements('getNextSquareEast'));
        possibleMovements.push(...this.getMovements('getNextSquareWest'));

        possibleMovements.push(...this.getMovements('getNextNorthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthEastDiagonal'));
        possibleMovements.push(...this.getMovements('getNextNorthWestDiagonal'));
        possibleMovements.push(...this.getMovements('getNextSouthWestDiagonal'));
        return possibleMovements;
    }

    kingMovement.getMovements = function (nextCoordinate) {
        let movements = [];
        let origin = this.currentPosition;
        let nextSquare = this[nextCoordinate](origin);
        if(this.isEmptyCoordinate(nextSquare) || this.isOpposingColor(nextSquare))
            movements.push(nextSquare)
        return movements;
    }

    return kingMovement;
}

export {
    getKingMovement
}
