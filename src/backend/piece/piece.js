import { PieceColorEnum } from "./pieceColorEnum.js";
import { PieceNameMap } from "./pieceNameMap.js";

function createPiece(pieceAbbreviation, piecePosition, pieceMovementRule) {

    let abbreviation = pieceAbbreviation;
    const color = abbreviation === '_' ? PieceColorEnum.Empty : abbreviation[0] === 'W' ? PieceColorEnum.White : PieceColorEnum.Black;
    let fullName = color === PieceColorEnum.Empty ? 'empty' : color.getLiteral() + ' ' + PieceNameMap[abbreviation[1]];
    let position = piecePosition;
    let movement = pieceMovementRule;

    function getAbbreviation() {
        return abbreviation;
    }

    function setAbbreviation(newAbbreviation) {
        abbreviation = newAbbreviation;
    }

    function getFullName() {
        return fullName;
    }

    function setFullName(newFullName) {
        fullName = newFullName;
    }

    function getPosition() {
        return position;
    }

    function getMovementRule() {
        return movement;
    }

    function setMovementRule(newMovementRule) {
        movement = newMovementRule;
    }

    function setPosition(positionPiece) {
        position = positionPiece;
    }

    function updateCurrentPosition(position, pieces) {
        //let nextMoveRule = movement.nextMoveRule();
        movement.updateCurrentPosition(position, pieces);
        movement = movement.nextMoveRule();
        /**if(nextMoveRule != movement){
            fullName = fullName.replace('pawn', 'queen');
            abbreviation = abbreviation.replace('P', 'Q')
            movement = nextMoveRule;
        }**/
    }

    function isPossibleMove(destination, pieces) {
        return movement.isPossibleMove(position, destination, pieces);
    }

    function getPossibleMovements(pieces) {
        return movement.getPossibleMovements(position, pieces).map(mv => mv.getPosition());
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
        setAbbreviation,
        getFullName,
        setFullName,
        getMovementRule,
        setMovementRule,
        getPosition,
        setPosition,
        isPossibleMove,
        getPossibleMovements,
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
