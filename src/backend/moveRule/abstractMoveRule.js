import {createCoordinate} from './coordinate.js';

function createAbstractMoveRule() {

    let currentPosition = createCoordinate();
    let boardPieces;

    function updateCurrentPosition(currentPos, boardPieceList) {
        currentPosition.setPosition(currentPos);
        boardPieces = boardPieceList;
    }

    function setCurrentPosition(newPosition) {
        currentPosition.setPosition(newPosition);
    }

    function getCurrentPosition() {
        return currentPosition.getPosition();
    }

    function getBoardPieces() {
        return boardPieces;
    }

    function getNextSquareNorth(origin) {
        return currentPosition.nextRow(origin, +1);
    }

    function getNextSquareSouth(origin)  {
        return currentPosition.nextRow(origin, -1);
    }

    function getNextSquareEast(origin) {
        return currentPosition.nextColumn(origin, +1);
    }

    function getNextSquareWest(origin) {
        return currentPosition.nextColumn(origin, -1);
    }

    function getNextNorthEastDiagonal(origin) {
        return currentPosition.nextDiagonal(origin, +1, +1);
    }

    function getNextNorthWestDiagonal(origin) {
        return currentPosition.nextDiagonal(origin, +1, -1);
    }

    function getNextSouthEastDiagonal(origin) {
        return currentPosition.nextDiagonal(origin, -1, +1);
    }

    function getNextSouthWestDiagonal(origin) {
        return currentPosition.nextDiagonal(origin, -1, -1);
    }

    function goesOutOfBounds(directionFunction, origin) {
            return directionFunction(origin) === origin;
    }

    function isEmptyCoordinate(destination) {
            return boardPieces[destination].isEmpty();
    }

    function isOpposingColor(destination) {
            return boardPieces[currentPosition.getPosition()].isOpposingColor(boardPieces[destination]);
    }

    return {
        updateCurrentPosition,
        getNextSquareNorth,
        getNextSquareEast,
        getNextSquareSouth,
        getNextSquareWest,
        getNextNorthEastDiagonal,
        getNextSouthEastDiagonal,
        getNextSouthWestDiagonal,
        getNextNorthWestDiagonal,
        goesOutOfBounds,
        isEmptyCoordinate,
        isOpposingColor,
        getCurrentPosition,
        setCurrentPosition,
        getBoardPieces
    }
}

export {
    createAbstractMoveRule
}
