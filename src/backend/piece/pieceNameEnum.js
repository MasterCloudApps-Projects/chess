import { PieceTypeEnum } from './pieceTypeEnum.js';

function createPieceName(name, color, factoryCall) {
    function getName() {
        return name;
    }

    function getColor() {
        return color;
    }

    function getFactoryCall() {
        return factoryCall;
    }

    return {
        getName,
        getColor,
        getFactoryCall
    }
}

const PieceNameEnum = {
    BR: createPieceName('BR', PieceTypeEnum.black, 'getRook'),
    BH: createPieceName('BH', PieceTypeEnum.black, 'getHorse'),
    BB: createPieceName('BB', PieceTypeEnum.black, 'getBishop'),
    BQ: createPieceName('BQ', PieceTypeEnum.black, 'getQueen'),
    BK: createPieceName('BK', PieceTypeEnum.black, 'getKing'),
    BP: createPieceName('BP', PieceTypeEnum.black, 'getPawn'),
    WR: createPieceName('WR', PieceTypeEnum.white, 'getRook'),
    WH: createPieceName('WH', PieceTypeEnum.white, 'getHorse'),
    WB: createPieceName('WB', PieceTypeEnum.white, 'getBishop'),
    WQ: createPieceName('WQ', PieceTypeEnum.white, 'getQueen'),
    WK: createPieceName('WK', PieceTypeEnum.white, 'getKing'),
    WP: createPieceName('WP', PieceTypeEnum.white, 'getPawn'),
    _: createPieceName('WR', PieceTypeEnum.white, 'getEmptyPiece'),
}

function getKingForColor(color) {
    if (color === PieceTypeEnum.black)
        return 'BK';
    if (color === PieceTypeEnum.white)
        return 'WK';
}

export {
    PieceNameEnum,
    getKingForColor
}
