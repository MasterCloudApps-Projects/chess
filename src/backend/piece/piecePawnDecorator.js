import { createPiece } from './piece.js';
import { moveRuleMap } from '../moveRule/moveRuleMap.js';

function createDecoratedPawnPiece(color, position) {
    const pawnFirstPositions = { B : '7', W : '2' };

    let piece = createPiece(
        color.getAbbreviation()+'P',
        color.getLiteral()+' pawn',
        color,
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
