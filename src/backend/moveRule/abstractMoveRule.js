import {createCoordinate} from './coordinate.js';

function createAbstractMoveRule() {

    let currentPosition = createCoordinate();
    let boardPieces;

    function checkDiagonal(origin, verticalDirection, horizontalDirection) {
        if ((verticalDirection(origin) === origin) || (horizontalDirection(origin) === origin)) return origin;
        return verticalDirection(horizontalDirection(origin));
    }

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
        return currentPosition.incrementRow(origin);
    }

    function getNextSquareSouth(origin)  {
        return currentPosition.decreaseRow(origin);
    }

    function getNextSquareEast(origin) {
        return currentPosition.incrementColumn(origin);
    }

    function getNextSquareWest(origin) {
        return currentPosition.decreaseColumn(origin);
    }

    function getNextNorthEastDiagonal(origin) {
        return checkDiagonal(origin, getNextSquareNorth, getNextSquareEast);
    }

    function getNextNorthWestDiagonal(origin) {
            return checkDiagonal(origin, getNextSquareNorth, getNextSquareWest);
    }

    function getNextSouthEastDiagonal(origin) {
            return checkDiagonal(origin, getNextSquareSouth, getNextSquareEast);
    }

    function getNextSouthWestDiagonal(origin) {
            return checkDiagonal(origin, getNextSquareSouth, getNextSquareWest);
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
