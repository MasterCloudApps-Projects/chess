function createPiece(pieceAbbreviation, pieceFullName, pieceColor, piecePosition, pieceMovementRule) {
    let abbreviation = pieceAbbreviation;
    let fullName = pieceFullName;
    let color = pieceColor;
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
        fullName = newFullName
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

    function updateCurrentPosition(origin, pieces) {
        movement.updateCurrentPosition(origin, pieces);
    }

    function isPossibleMove(destination, pieces) {
        return movement.isPossibleMove(position, destination, pieces);
    }

    function getPossibleMovements(pieces) {
        return movement.getPossibleMovements(position, pieces);
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
