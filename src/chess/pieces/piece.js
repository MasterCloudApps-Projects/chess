import { getPawnMovement } from "../movements/pawnMovement.js";
import { getHorseMovement } from "../movements/horseMovement.js"
import { getRookMovement } from "../movements/rookMovement.js"
import { getBishopMovement } from "../movements/bishopMovement.js"
import { getKingMovement } from "../movements/kingMovement.js"
import { getQueenMovement } from "../movements/queenMovement.js"

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
        _: { type : pieceTypes.empty, call : 'getEmptyPiece' }
}

function createPiece(name, fullName, color, position) {
    let piece = {};
    piece.name = name;
    piece.fullName = fullName;
    piece.color = color;
    piece.position = position;

    piece.performMovement = performMovement;
    piece.getThreatenedPositions = getThreatenedPositions;
    piece.doAfterMovement = doAfterMovement;
    piece.getMovementError = getMovementError;
    piece.isWhite = isWhite;
    piece.isOpposingColor = isOpposingColor;
    piece.isOfColor = isOfColor;
    piece.isEmpty = isEmpty;
    return piece;
}

function performMovement(destination, pieces) {
    return this.movement.move(this.position, destination, pieces);
}

function getThreatenedPositions(pieces) {
    if (this.movement === undefined) return undefined;
    return this.movement.getKillingMovements(this.position, pieces);
}

function doAfterMovement() {
    this.movement.doAfterMovement(this.position);
}

function getMovementError() {
    return this.movement.getErrorMessages();
}

function isWhite() {
    return this.color == pieceTypes.white;
}

function isOfColor(color) {
    return this.color === color;
}

function isOpposingColor(piece) {
    return this.color != piece.color && !piece.isEmpty();
}

function isEmpty() {
    return this.color == pieceTypes.empty;
}

// Constructor/Decorator functions for use on pieceFactory.js, not to be added to piece!
const decorators = {
    decoratePawn: function decoratePawn(pawn) {
        pawn.movement = getPawnMovement();
        pawn.isQueen = false;
        pawn.doAfterMovement = function () {
            this.movement.doAfterMovement(this.position);
            if (!this.isQueen && this.movement.shouldTurnToQueen()) {
                this.movement = getQueenMovement();
                this.name = this.name.replace('P', 'Q');
                this.isQueen = true;
            }
        };
        return pawn;
    },

    decorateRook: function decorateRook(rook) {
        rook.movement = getRookMovement();
        return rook;
    },

    decorateBishop: function decorateBishop(bishop) {
        bishop.movement = getBishopMovement();
        return bishop;
    },

    decorateHorse: function decorateHorse(horse) {
        horse.movement = getHorseMovement();
        return horse;
    },

    decorateQueen: function decorateQueen(queen) {
        queen.movement = getQueenMovement();
        return queen;
    },

    decorateKing: function decorateKing(king) {
        king.movement = getKingMovement();
        return king;
    }
};

export {
    createPiece,
    pieceTypes,
    pieceNames,
    decorators
}
