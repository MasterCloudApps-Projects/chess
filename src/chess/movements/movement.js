import { pieceTypes } from '../pieces/piece.js';

function createMovement() {
    let movement = {};

    function getNextSquareNorth(origin) {
        return incrementRow(origin);
    }

    function getNextSquareSouth(origin) {
        return decreaseRow(origin);
    }

    function getNextSquareEast(origin) {
        return incrementColumn(origin);
    }

    function getNextSquareWest(origin) {
        return decreaseColumn(origin);
    }

    function getNextNorthEastDiagonal(origin) {
        return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareEast');
    }

    function getNextNorthWestDiagonal(origin) {
        return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareWest');
    }

    function getNextSouthEastDiagonal(origin) {
        return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareEast');
    }

    function getNextSouthWestDiagonal(origin) {
        return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareWest');
    }

    function checkDiagonal(origin, verticalDirection, horizontalDirection) {
        if ((movement[verticalDirection](origin) == origin) || (movement[horizontalDirection](origin) == origin)) return origin;
        return movement[verticalDirection](movement[horizontalDirection](origin));
    }

    function isEmptyCoordinate(destination) {
        return this.boardPieces[destination].color == pieceTypes.empty;
    }

    function isOpposingColor(destination) {
        return this.boardPieces[destination].color != this.boardPieces[this.currentPosition].color && !this.isEmptyCoordinate(destination);
    }

    movement.getNextSquareNorth = getNextSquareNorth;
    movement.getNextSquareSouth = getNextSquareSouth;
    movement.getNextSquareEast = getNextSquareEast;
    movement.getNextSquareWest = getNextSquareWest;
    movement.getNextNorthEastDiagonal = getNextNorthEastDiagonal;
    movement.getNextNorthWestDiagonal = getNextNorthWestDiagonal;
    movement.getNextSouthEastDiagonal = getNextSouthEastDiagonal;
    movement.getNextSouthWestDiagonal = getNextSouthWestDiagonal;
    movement.isEmptyCoordinate = isEmptyCoordinate;
    movement.isOpposingColor = isOpposingColor;
    movement.move = move;

    function move(destination) {}
    function getPossibleMovements() {}

    movement.move = move;
    movement.getPossibleMovements = getPossibleMovements;

    return movement;
}

const columns = "abcdefgh";
const rows = "12345678";

function getRow(coordinate){
    return coordinate.slice(1, 2);
}

function getColumn(coordinate){
    return coordinate.slice(0, 1);
}

function incrementRow(coordinate) {
    if (getRow(coordinate) >= rows.length) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) + 1);
}

function incrementColumn(coordinate) {
    if (columns.indexOf(getColumn(coordinate)) >= columns.length-1) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) + 1] + getRow(coordinate).toString();
}

function decreaseRow(coordinate) {
    if (getRow(coordinate) <= 0) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) - 1);
}

function decreaseColumn(coordinate) {
    if (columns.indexOf(getColumn(coordinate)) <= 0) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) - 1] + getRow(coordinate).toString();
}

export {
    createMovement,
    getRow,
    getColumn
}
