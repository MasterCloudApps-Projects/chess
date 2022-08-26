import {incrementColumn, incrementRow, decreaseColumn, decreaseRow} from '../coordinate/coordinate.js'

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

    return movement;
}

export {
    createMovement
}
