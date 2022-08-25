import { createPiece, pieceTypes, decorators } from "./piece.js";


function createFactory() {
    let factory = {};

    factory.getEmptyPiece = getEmptyPiece;

    factory.getRook = function (position) {
        let rook = this._getRook(position);
        return decorators.decorateRook(rook);
    }

    factory.getHorse = function (position) {
        let horse = this._getHorse(position);
        return decorators.decorateHorse(horse);
    }

    factory.getBishop = function (position) {
        let bishop = this._getBishop(position);
        return decorators.decorateBishop(bishop);
    }

    factory.getQueen = function (position) {
        let queen = this._getQueen(position);
        return decorators.decorateQueen(queen);
    }

    factory.getKing = function (position) {
        let king = this._getKing(position);
        return decorators.decorateKing(king);
    }

    factory.getPawn = function (position) {
        let pawn = this._getPawn(position);
        return decorators.decoratePawn(pawn);
    }

    function factoryMethodGetRook(position) {};
    function factoryMethodGetHorse(position) {};
    function factoryMethodGetBishop(position) {};
    function factoryMethodGetQueen(position) {};
    function factoryMethodGetKing(position) {};
    function factoryMethodGetPawn(position) {};

    // Functions to Override on child modules
    factory._getRook = factoryMethodGetRook;
    factory._getHorse = factoryMethodGetHorse;
    factory._getBishop = factoryMethodGetBishop;
    factory._getQueen = factoryMethodGetQueen;
    factory._getKing = factoryMethodGetKing;
    factory._getPawn = factoryMethodGetPawn;

    return factory;
}

function getEmptyPiece (position) {
    return createPiece('_', 'empty', pieceTypes.empty, position);
}

export {
    createFactory, getEmptyPiece
}
