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

    function getCurrentPositionString() {
        return currentPosition.getPosition();
    }

    function getCurrentPosition() {
        return currentPosition;
    }

    function getBoardPieces() {
        return boardPieces;
    }

    function isEmptyCoordinate(coordinate) {
        return boardPieces[coordinate.getPosition()].isEmpty();
    }

    function isOpposingColor(destination) {
        return boardPieces[currentPosition.getPosition()]
            .isOpposingColor(boardPieces[destination.getPosition()]);
    }

    return {
        updateCurrentPosition,
        isEmptyCoordinate,
        isOpposingColor,
        getCurrentPosition,
        getCurrentPositionString,
        setCurrentPosition,
        getBoardPieces
    }
}

export {
    createAbstractMoveRule
}
