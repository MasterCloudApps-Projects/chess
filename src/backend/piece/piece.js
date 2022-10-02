import { PieceTypeEnum } from './pieceTypeEnum.js';
import { moveRules } from '../moveRule/moveRules.js';

function createPiece(pieceName, pieceFullName, pieceColor, piecePosition, pieceMovement) {
    let name = pieceName;
    let fullName = pieceFullName;
    let color = pieceColor;
    let position = piecePosition;
    let movement = pieceMovement;

    function getName() {
        return name;
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
        if(name.includes('P') && movement.shouldTurnToQueen()){
            transformToQueen();
        }
    }

    function transformToQueen() {
        movement = moveRules.getQueenMoveRule();
        fullName = fullName.replace('pawn', 'queen');
        name = name.replace('P', 'Q');
    }

    function getAttackPositions(pieces) {
        return movement.getAttackMovements(position, pieces);
    }

    function isWhite() {
        return color === PieceTypeEnum.white;
    }

    function isOpposingColor(piece) {
        return !piece.isOfColor(color) && !piece.isEmpty();
    }

    function isOfColor(colorParam) {
        return color === colorParam;
    }

    function isEmpty() {
        return color === PieceTypeEnum.empty;
    }

    function getMovementError() {
        return movement.getErrorMessages();
    }

    return {
        getName,
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
