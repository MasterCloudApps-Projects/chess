import {createCoordinate} from './coordinate.js';

function createAbstractMoveRule() {

    let currentCoordinate = createCoordinate();
    let boardPieces;

    function updateCurrentPosition(currentPos, boardPieceList) {
        currentCoordinate.setPosition(currentPos);
        boardPieces = boardPieceList;
    }

    function getCurrentCoordinatePosition() {
        return currentCoordinate.getPosition();
    }

    function getCurrentCoordinate() {
        return currentCoordinate;
    }

    function getBoardPieces() {
        return boardPieces;
    }

    function isEmptyCoordinate(coordinate) {
        return boardPieces[coordinate.getPosition()].isEmpty();
    }

    function isOpposingColor(destination) {
        return boardPieces[currentCoordinate.getPosition()]
            .isOpposingColor(boardPieces[destination.getPosition()]);
    }

    return {
        updateCurrentPosition,
        isEmptyCoordinate,
        isOpposingColor,
        getCurrentCoordinate,
        getCurrentCoordinatePosition,
        getBoardPieces
    }
}

export {
    createAbstractMoveRule
}
