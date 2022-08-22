import { createPiece, pieceTypes } from "./piece.js";
import { getPawnMovement } from "../movements/pawnMovement.js";

function createFactory() {
    let factory = {};

    factory.getEmptyPiece = function (position) {
        return createPiece('_', pieceTypes.empty, position);
    }

    factory.getRook = function (position) {
        return this._getRook(position);
    }
    factory.getHorse = function (position) {
        return this._getHorse(position);
    }
    factory.getBishop = function (position) {
        return this._getBishop(position);
    }
    factory.getQueen = function (position) {
        return this._getQueen(position);
    }
    factory.getKing = function (position) {
        return this._getKing(position);
    }
    factory.getPawn = function (position) {
        let pawn = this._getPawn(position);
        pawn.movement = getPawnMovement();
        return pawn;
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

export {
    createFactory
}
