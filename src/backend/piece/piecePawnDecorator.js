import { createPiece } from './piece.js';
import { moveRuleMap } from '../moveRule/moveRuleMap.js';
import { PieceColorEnum } from "./pieceColorEnum.js";

function createDecoratedPawnPiece(abbreviation, position) {
    const pawnFirstPositions = { B : '7', W : '2' };
    const color = abbreviation[0] === 'W' ? PieceColorEnum.White : PieceColorEnum.Black;

    let piece = createPiece(
        abbreviation,
        position,
        moveRuleMap.pawn(
            position.includes(pawnFirstPositions[color.getAbbreviation()]), !color.isWhite()));
    piece.isQueen = false;

    function isPossibleMove(destination, pieces) {
        let isItPossible = piece.isPossibleMove(destination, pieces);
        if (isItPossible && !piece.isQueen)
            doAfterMovement(destination, pieces);
        return isItPossible;
    }

    function doAfterMovement(newPosition, pieces) {
        piece.getMovementRule().doAfterMovement(newPosition, pieces);
        if(piece.getMovementRule().shouldTurnToQueen())
            transformToQueen();
    }

    function transformToQueen() {
        piece.setMovementRule(moveRuleMap.queen());
        piece.setFullName(piece.getFullName().replace('pawn', 'queen'));
        piece.setAbbreviation(piece.getAbbreviation().replace('P', 'Q'));
        piece.isQueen = true;
    }

    return {
        ...piece,
        ... {
            isPossibleMove
        }
    }
}

export {
    createDecoratedPawnPiece
}
