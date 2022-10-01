import { pieceTypes } from './pieceType.js';

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
    _: { type : pieceTypes.empty, call : 'getEmptyPiece' }
}

function getKingForColor(color) {
    if (color === pieceTypes.black.name)
        return 'BK';
    if (color === pieceTypes.white.name)
        return 'WK';
}

export {
    pieceNames, getKingForColor
}
