import { moveRuleMap } from '../moveRule/moveRuleMap.js';

function createPiece(pieceAbbreviation, pieceFullName, pieceColor, piecePosition, pieceMovement) {
    let abbreviation = pieceAbbreviation;
    let fullName = pieceFullName;
    let color = pieceColor;
    let position = piecePosition;
    let movement = pieceMovement;

    function getAbbreviation() {
        return abbreviation;
    }

    function getFullName() {
        return fullName;
    }

    function getPosition() {
        return position;
    }

    function setPosition(positionPiece) {
        position = positionPiece;
    }


    function updateCurrentPosition(origin, pieces) {
        movement.updateCurrentPosition(origin, pieces);
    }

    function isPossibleMove(destination, pieces) {
        return movement.isPossibleMove(position, destination, pieces);
    }

    function getPossibleMovements(pieces) {
        return movement.getPossibleMovements(position, pieces);
    }

    function doAfterMovement() {
        movement.doAfterMovement(position);
        if(abbreviation.includes('P') && movement.shouldTurnToQueen()){
            transformToQueen();
        }
    }

    function transformToQueen() {
        movement = moveRuleMap.queen();
        fullName = fullName.replace('pawn', 'queen');
        abbreviation = abbreviation.replace('P', 'Q');
    }

    function getAttackPositions(pieces) {
        return movement.getAttackMovements(position, pieces);
    }

    function isWhite() {
        return color.isWhite();
    }

    function isOpposingColor(piece) {
        return !piece.isOfColor(color) && !piece.isEmpty();
    }

    function isOfColor(colorParam) {
        return color === colorParam;
    }

    function isEmpty() {
        return color.isEmpty();
    }

    function getMovementError() {
        return movement.getErrorMessages();
    }

    return {
        getAbbreviation,
        getFullName,
        getPosition,
        setPosition,
        isPossibleMove,
        getPossibleMovements,
        doAfterMovement,
        getAttackPositions,
        isWhite,
        isOpposingColor,
        isOfColor,
        isEmpty,
        getMovementError,
        updateCurrentPosition
    };
}

export {
    createPiece,
}
