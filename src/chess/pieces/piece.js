const pieceTypes = {
	white: 'white',
	black: 'black',
    empty: 'empty'
}

const pieceNames = {
        BR: { type : pieceTypes.black, call : 'getRook' },
        BH: { type : pieceTypes.black, call : 'getHorse' },
        BB: { type : pieceTypes.black, call : 'getBishop' },
        BQ: { type : pieceTypes.black, call : 'getQueen' },
        BK: { type : pieceTypes.black, call : 'getKing' },
        BP: { type : pieceTypes.black, call : 'getPawn' },
        WR: { type : pieceTypes.white, call : 'getRook' },
        WH: { type : pieceTypes.white, call : 'getHorse' },
        WB: { type : pieceTypes.white, call : 'getBishop' },
        WQ: { type : pieceTypes.white, call : 'getQueen' },
        WK: { type : pieceTypes.white, call : 'getKing' },
        WP: { type : pieceTypes.white, call : 'getPawn' },
        _: { type : null, call : 'getEmptyPiece' }
}

function createPiece(name, color, position) {
    let piece = {};
    piece.color = color;
    piece.name = name;
    piece.position = position;

    piece.performMovement = performMovement;
    piece.getMovementError = getMovementError;
    piece.isWhite = isWhite;
    piece.isOpposingColor = isOpposingColor;
    piece.isOfColor = isOfColor;
    piece.isEmpty = isEmpty;
    return piece;
}

function performMovement(destination, pieces) {
    if (this.movement === undefined) return true; // TODO: Delete once all movement strategies are implemented
    this.movement.updateCurrentPosition(this.position, pieces);
    return this.movement.move(destination);
}

function getMovementError() {
    return this.movement.getErrorMessages();
}

function isWhite() {
    return this.color == pieceTypes.white;
}

function isOfColor(color) {
    return this.color == color;
}

function isOpposingColor(piece) {
    return this.color != piece.color && !piece.isEmpty();
}

function isEmpty() {
    return this.color == pieceTypes.empty;
}

export {
    createPiece,
    pieceTypes,
    pieceNames
}