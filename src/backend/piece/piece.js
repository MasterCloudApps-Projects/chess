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
        movement.updateCurrentPosition(position, pieces);
    }

    function isPossibleMove(destination, pieces) {
        let res = movement.isPossibleMove(position, destination, pieces);
        if (res) {
            updateCurrentPosition(destination, pieces);
            let nextMoveRule = movement.getNextMoveRule(abbreviation[1]);
            movement = nextMoveRule.moveRule;
            abbreviation = abbreviation[0] + nextMoveRule.abbreviation;
            fullName = color.getLiteral() + ' ' + PieceNameMap[abbreviation[1]]
        }
        return res;
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
