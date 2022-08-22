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
    let piece = {
        color: color,
        name: name,
        position: position
    };
    piece.performMovement = performMovement;
    piece.isWhite = isWhite;
    piece.isEmpty = isEmpty;
    return piece;
}

function performMovement(destination, pieces) {
    this.movement.move(destination, pieces);
}

function isWhite() {
    return this.color == pieceTypes.white;
}

function isEmpty() {
    return this.color == pieceTypes.empty;
}

export {
    createPiece,
    pieceTypes,
    pieceNames
}
