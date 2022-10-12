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

    //TODO: pending refactor
    function getNextSquare(origin, direction){
        if(direction.isDiagonal())
            return currentPosition.nextDiagonal(origin, direction.getRow(),  direction.getColumn());
        else if(direction.isColumn())
            return currentPosition.nextColumn(origin, direction.getColumn());
        return currentPosition.nextRow(origin, direction.getRow());
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
