import {createCoordinate} from './coordinate.js';
import { DirectionEnum } from './directionEnum.js';

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

    function getNextSquare(origin, direction){
        return currentPosition.nextSquare(origin, direction);
    }

    function isEmptyCoordinate(destination) {
            return boardPieces[destination].isEmpty();
    }

    function isOpposingColor(destination) {
            return boardPieces[currentPosition.getPosition()].isOpposingColor(boardPieces[destination]);
    }

    return {
        updateCurrentPosition,
        getNextSquare,
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
