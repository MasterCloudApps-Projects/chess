
function createPieceMoveRule(){

    function updateCurrentPosition() { }

    function getCurrentCoordinate() { }

    function getBoardPieces() { }

    function isEmptyCoordinate() { }

    function isOpposingColor() { }

    function isPossibleMove() { }

    function getAttackMovements() { }

    function getPossibleMovements() { }

    function getNextMoveRule() { }

    function getErrorMessages() {}

    return {
        updateCurrentPosition,
        getCurrentCoordinate,
        getBoardPieces,
        isEmptyCoordinate,
        isOpposingColor,
        isPossibleMove,
        getAttackMovements,
        getPossibleMovements,
        getNextMoveRule,
        getErrorMessages
    }
}

export {
    createPieceMoveRule
}
