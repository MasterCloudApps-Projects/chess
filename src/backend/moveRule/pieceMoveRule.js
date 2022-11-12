import {createCoordinate} from './coordinate.js';

function createPieceMoveRule(){
    let currentCoordinate = createCoordinate();
    let boardPieces;

    function updateCurrentPosition(currentPosition, boardPieceList) {
        currentCoordinate.setPosition(currentPosition);
        boardPieces = boardPieceList;
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

    function isOpposingColor(coordinate) {
        return boardPieces[currentCoordinate.getPosition()]
            .isOpposingColor(boardPieces[coordinate.getPosition()]);
    }

    // Function overriden on lower child level requires 'this', otherwise calls local empty implementation
    function isPossibleMove (origin, destination, pieces) {
        updateCurrentPosition(origin, pieces);
        return (this.getPossibleMovements().map(mv => mv.getPosition()).includes(destination));
    };

    function getAttackMovements (origin, pieces) {
        updateCurrentPosition(origin, pieces);
        return this.getPossibleMovements().map(mv => mv.getPosition());
    }

    function getPossibleMovements () {};

    function nextMoveRule () {};

    return {
        updateCurrentPosition,
        getCurrentCoordinate,
        getBoardPieces,
        isEmptyCoordinate,
        isOpposingColor,
        isPossibleMove,
        getAttackMovements,
        getPossibleMovements,
        nextMoveRule
    }
}

export {
    createPieceMoveRule
}
