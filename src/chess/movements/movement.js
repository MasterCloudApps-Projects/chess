import {columns, rows, getColumn, getRow} from '../coordinate/coordinate.js'

function createMovement() {
    let movement = {};

    movement.updateCurrentPosition = function(currentPosition, boardPieces) {
        this.currentPosition = currentPosition;
        this.boardPieces = boardPieces;
    }

    movement.getNextSquareNorth = function (origin) {
        return incrementRow(origin);
    }

    movement.getNextSquareSouth = function (origin) {
        return decreaseRow(origin);
    }

    movement.getNextSquareEast = function (origin) {
        return incrementColumn(origin);
    }

    movement.getNextSquareWest = function (origin) {
        return decreaseColumn(origin);
    }

    movement.getNextNorthEastDiagonal = function (origin) {
        return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareEast');
    }

    movement.getNextNorthWestDiagonal = function (origin) {
        return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareWest');
    }

    movement.getNextSouthEastDiagonal = function (origin) {
        return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareEast');
    }

    movement.getNextSouthWestDiagonal = function (origin) {
        return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareWest');
    }

    function checkDiagonal (origin, verticalDirection, horizontalDirection) {
        if ((movement[verticalDirection](origin) == origin) || (movement[horizontalDirection](origin) == origin)) return origin;
        return movement[verticalDirection](movement[horizontalDirection](origin));
    }

    movement.goesOutOfBounds = function (directionFunctionName, origin) {
        return this[directionFunctionName](origin) == origin;
    }

    movement.isEmptyCoordinate = function (destination) {
        return this.boardPieces[destination].isEmpty();
    }

    movement.isOpposingColor = function (destination) {
        return this.boardPieces[this.currentPosition].isOpposingColor(this.boardPieces[destination]);
    }

    movement.move = function (origin, destination, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().includes(destination));
    };

    movement.getThreatenedPositions = function(origin, pieces) {
        this.updateCurrentPosition(origin, pieces);
        return this.getPossibleMovements();
    }

    movement.getPossibleMovements = function () {};
    movement.doAfterMovement = function () {};
    movement.getErrorMessages = function () {};

    return movement;
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
    if (getRow(coordinate) <= 1) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) - 1);
}

function decreaseColumn(coordinate) {
    if (columns.indexOf(getColumn(coordinate)) <= 0) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) - 1] + getRow(coordinate).toString();
}

export {
    createMovement
}
