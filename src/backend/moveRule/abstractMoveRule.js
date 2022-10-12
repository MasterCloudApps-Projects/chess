import {incrementColumn, incrementRow, decreaseColumn, decreaseRow} from './coordinate.js';

function createAbstractMoveRule() {

    let currentPosition, boardPieces;

    function checkDiagonal (origin, verticalDirection, horizontalDirection) {
        if ((verticalDirection(origin) === origin) || (horizontalDirection(origin) === origin)) return origin;
        return verticalDirection(horizontalDirection(origin));
    }

    function updateCurrentPosition(currentPos, boardPieceList) {
        currentPosition = currentPos;
        boardPieces = boardPieceList;
    }

    function setCurrentPosition(newPosition) {
        currentPosition = newPosition;
    }

    function getCurrentPosition() {
        return currentPosition;
    }

    function getBoardPieces() {
        return boardPieces;
    }

    function getNextSquareNorth (origin) {
        return incrementRow(origin);
    }

    function getNextSquareSouth(origin)  {
        return decreaseRow(origin);
    }

    function getNextSquareEast (origin) {
        return incrementColumn(origin);
    }

    function getNextSquareWest (origin) {
        return decreaseColumn(origin);
    }

    function getNextNorthEastDiagonal(origin) {
        return checkDiagonal(origin, getNextSquareNorth, getNextSquareEast);
    }

    function getNextNorthWestDiagonal (origin) {
            return checkDiagonal(origin, getNextSquareNorth, getNextSquareWest);
    }

    function getNextSouthEastDiagonal (origin) {
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

    function isOpposingColor (destination) {
            return boardPieces[currentPosition].isOpposingColor(boardPieces[destination]);
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
