import { createPiece, pieceTypes } from "./piece.js";
import { pawnMovement } from "../movements/pawnMovement.js";

function createFactory() {
    let factory = {};

    function getEmptyPiece(position) {
        return createPiece('_', pieceTypes.empty, position);
    }

    function getRook(position) {
        // TODO: Factory method so parent class can inject strategy movements
        let rook = this._getRook(position);
        //rook.movement = strategies.getRookMovement;
        return rook;
    }
    function getHorse(position) {
        return this._getHorse(position);
    }
    function getBishop(position) {
        return this._getBishop(position);
    }
    function getQueen(position) {
        return this._getQueen(position);
    }
    function getKing(position) {
        return this._getKing(position);
    }
    function getPawn(position) {
        let pawn = this._getPawn(position);
        pawn.movement = pawnMovement;
        return pawn;
    }

    factory.getEmptyPiece = getEmptyPiece;
    factory.getRook = getRook;
    factory.getHorse = getHorse;
    factory.getBishop = getBishop;
    factory.getQueen = getQueen;
    factory.getKing = getKing;
    factory.getPawn = getPawn;

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
