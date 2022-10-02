import { PieceTypeEnum } from './pieceTypeEnum.js';

const PieceNameEnum = {
    BR: { type : PieceTypeEnum.black, call : 'getRook' },
    BH: { type : PieceTypeEnum.black, call : 'getHorse' },
    BB: { type : PieceTypeEnum.black, call : 'getBishop' },
    BQ: { type : PieceTypeEnum.black, call : 'getQueen' },
    BK: { type : PieceTypeEnum.black, call : 'getKing' },
    BP: { type : PieceTypeEnum.black, call : 'getPawn' },
    WR: { type : PieceTypeEnum.white, call : 'getRook' },
    WH: { type : PieceTypeEnum.white, call : 'getHorse' },
    WB: { type : PieceTypeEnum.white, call : 'getBishop' },
    WQ: { type : PieceTypeEnum.white, call : 'getQueen' },
    WK: { type : PieceTypeEnum.white, call : 'getKing' },
    WP: { type : PieceTypeEnum.white, call : 'getPawn' },
    _: { type : PieceTypeEnum.empty, call : 'getEmptyPiece' }
}

function getKingForColor(color) {
    if (color === PieceTypeEnum.black)
        return 'BK';
    if (color === PieceTypeEnum.white)
        return 'WK';
}

export {
    PieceNameEnum, getKingForColor
}
