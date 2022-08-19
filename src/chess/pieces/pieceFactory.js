function createFactory() {
    let factory = {};

    function getEmptyPiece() {
        return '_';
    }

    function getRook() {
        // TODO: Factory method so parent class can inject strategy movements
        let rook = this._getRook();
        //rook.movement = strategies.getRookMovement;
        return rook;
    }
    function getHorse() {
        return this._getHorse();
    }
    function getBishop() {
        return this._getBishop();
    }
    function getQueen() {
        return this._getQueen();
    }
    function getKing() {
        return this._getKing();
    }
    function getPawn() {
        return this._getPawn();
    }

    factory.getEmptyPiece = getEmptyPiece;
    factory.getRook = getRook;
    factory.getHorse = getHorse;
    factory.getBishop = getBishop;
    factory.getQueen = getQueen;
    factory.getKing = getKing;
    factory.getPawn = getPawn;

    function factoryMethodGetRook() {};
    function factoryMethodGetHorse() {};
    function factoryMethodGetBishop() {};
    function factoryMethodGetQueen() {};
    function factoryMethodGetKing() {};
    function factoryMethodGetPawn() {};

    // Functions to Override on child modules
    factory._getRook = factoryMethodGetRook;
    factory._getHorse = factoryMethodGetHorse;
    factory._getBishop = factoryMethodGetBishop;
    factory._getQueen = factoryMethodGetQueen;
    factory._getKing = factoryMethodGetKing;
    factory._getPawn = factoryMethodGetPawn;

    return factory;
}

const pieceNames = {
        BR: { isWhite : false, call : 'getRook' },
        BH: { isWhite : false, call : 'getHorse' },
        BB: { isWhite : false, call : 'getBishop' },
        BQ: { isWhite : false, call : 'getQueen' },
        BK: { isWhite : false, call : 'getKing' },
        BP: { isWhite : false, call : 'getPawn' },
        WR: { isWhite : true, call : 'getRook' },
        WH: { isWhite : true, call : 'getHorse' },
        WB: { isWhite : true, call : 'getBishop' },
        WQ: { isWhite : true, call : 'getQueen' },
        WK: { isWhite : true, call : 'getKing' },
        WP: { isWhite : true, call : 'getPawn' },
        _: { isWhite : false, call : 'getEmptyPiece' }
}

export {
    createFactory,
    pieceNames
}
