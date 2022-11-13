import { createPieceMoveRule }  from '../../moveRule/pieceMoveRule.js';
import { createCoordinate }  from '../../moveRule/coordinate.js';
import { boardBuilder } from '../boardBuilderTest.js'

let boardPieces;
let piece;

//A smaller test board is used to control all cases. The BoardBuilder.js is not used,
//because it creates with PieceBuilder.js which has the dimensions defined inside the class.
beforeEach(() => {
    piece = createPieceMoveRule();
    boardPieces = boardBuilder(`
        BP-BQ-BP
        _-_-_
        WP-WQ-WP`, 3, "abc").build();
});

describe('Access / modification', () => {
    test('Update Current Position Test', () => {
        piece.updateCurrentPosition('a2', boardPieces.getPieces());
        expect(piece.getCurrentCoordinate().getPosition()).toBe(createCoordinate(2, 1).getPosition());
        expect(piece.getBoardPieces()).toBe(boardPieces.getPieces());
    });
});

describe('Coordinate identification', () => {
    test('Is Empty Coordinate Test', () => {
        piece.updateCurrentPosition('a2', boardPieces.getPieces());
        expect(piece.isEmptyCoordinate(createCoordinate(2, 2))).toBeTruthy();
    });

    test('Is Not Empty Coordinate Test', () => {
        piece.updateCurrentPosition('a2', boardPieces.getPieces());
        expect(piece.isEmptyCoordinate(createCoordinate(1, 2))).toBeFalsy();
    });

    test('Is Opposing Color Test', () => {
        piece.updateCurrentPosition('a1', boardPieces.getPieces());
        expect(piece.isOpposingColor(createCoordinate(3, 3))).toBeTruthy();
    });

    test('Is Opposing Color Test', () => {
        piece.updateCurrentPosition('a1', boardPieces.getPieces());
        expect(piece.isOpposingColor(createCoordinate(1, 1))).toBeFalsy();
        expect(piece.isOpposingColor(createCoordinate(2, 2))).toBeFalsy();
    });
});

describe('Next Move Rule', () => {
    test('Get Next Move Rule', () => {
        let result = piece.getNextMoveRule('PW');
        expect(result.moveRule).toBe(piece);
        expect(result.abbreviation).toBe('PW');
    });
});

//Test isPossibleMove, getAttackMovements and getPossibleMovements are performed in the child classes
