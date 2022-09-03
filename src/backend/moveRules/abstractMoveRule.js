import {incrementColumn, incrementRow, decreaseColumn, decreaseRow} from '../coordinate/coordinate.js';
import { moveRules } from './MoveRuleEnum.js';

function createAbstractMoveRule() {
    //TODO:
    function checkDiagonal (origin, verticalDirection, horizontalDirection) {
        if ((moveRules[verticalDirection](origin) === origin) || (moveRules[horizontalDirection](origin) === origin)) return origin;
        return moveRules[verticalDirection](moveRules[horizontalDirection](origin));
    }

    let moveRules = {
        updateCurrentPosition: function(currentPosition, boardPieces) {
            this.currentPosition = currentPosition;
            this.boardPieces = boardPieces;
        },
        getNextSquareNorth: function (origin) {
            return incrementRow(origin);
        },
        getNextSquareSouth: function (origin) {
            return decreaseRow(origin);
        },
        getNextSquareEast: function (origin) {
            return incrementColumn(origin);
        },
        getNextSquareWest: function (origin) {
            return decreaseColumn(origin);
        },
        getNextNorthEastDiagonal: function (origin) {
            return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareEast');
        },
        getNextNorthWestDiagonal: function (origin) {
            return checkDiagonal(origin, 'getNextSquareNorth', 'getNextSquareWest');
        },
        getNextSouthEastDiagonal: function (origin) {
            return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareEast');
        },
        getNextSouthWestDiagonal: function (origin) {
            return checkDiagonal(origin, 'getNextSquareSouth', 'getNextSquareWest');
        },
        goesOutOfBounds: function (directionFunctionName, origin) {
            return this[directionFunctionName](origin) === origin;
        },
        isEmptyCoordinate: function (destination) {
            return this.boardPieces[destination].isEmpty();
        },
        isOpposingColor: function (destination) {
            return this.boardPieces[this.currentPosition].isOpposingColor(this.boardPieces[destination]);
        }
    };

    return moveRules;
}

export {
    createAbstractMoveRule
}
