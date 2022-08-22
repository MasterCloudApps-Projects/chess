import { pieceTypes } from '../pieces/piece.js';

function createMovement() {
    let movement = {};

    function getNextSquareNorth() {
        return incrementRow(this.currentPosition);
    }

    function getNextSquareSouth() {
        return decreaseRow(this.currentPosition);
    }

    function getNextSquareEast() {
        return incrementColumn(this.currentPosition);
    }

    function getNextSquareWest() {
        return decreaseColumn(this.currentPosition);
    }

    function getNextNorthEastDiagonal() {
        return checkDiagonal(this.currentPosition, 'getNextSquareNorth', 'getNextSquareEast');
    }

    function getNextNorthWestDiagonal() {
        return checkDiagonal(this.currentPosition, 'getNextSquareNorth', 'getNextSquareWest');
    }

    function getNextSouthEastDiagonal() {
        return checkDiagonal(this.currentPosition, 'getNextSquareSouth', 'getNextSquareEast');
    }

    function getNextSouthWestDiagonal() {
        return checkDiagonal(this.currentPosition, 'getNextSquareSouth', 'getNextSquareWest');
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
    if (getColumn(coordinate) >= columns.length) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) + 1] + getRow(coordinate);
}

function decreaseRow(coordinate) {
    if (getRow(coordinate) <= 0) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) - 1);
}

function decreaseColumn(coordinate) {
    if (getColumn(coordinate) <= 0) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) - 1] + getRow(coordinate);
}

export {
    createMovement,
    getRow,
    getColumn
}
