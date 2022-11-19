import { createPieceMoveRule }  from '../../moveRule/pieceMoveRule.js';
import { createCoordinate }  from '../../moveRule/coordinate.js';
import { boardBuilder } from '../utils/boardBuilderTest.js';

let board;
let piece;

//A smaller test board is used to control all cases. The BoardBuilder.js is not used,
//because it creates with PieceBuilder.js which has the dimensions defined inside the class.
beforeEach(() => {
    piece = createPieceMoveRule();
    board = boardBuilder(`
        BP-BQ-BP
        _-_-_
        WP-WQ-WP`, 3, "abc").build();
});

describe('Access / modification', () => {
    test('Update current position test', () => {
        piece.updateCurrentPosition('a2', board.getPieces());
        expect(piece.getCurrentCoordinate().getPosition()).toBe(createCoordinate(2, 1).getPosition());
        expect(piece.getBoardPieces()).toBe(board.getPieces());
    });
});

describe('Identify what is in the coordinates', () => {
    test('Is empty coordinate test', () => {
        piece.updateCurrentPosition('a2', board.getPieces());
        expect(piece.isEmptyCoordinate(createCoordinate(2, 2))).toBeTruthy();
    });

    test('Is not empty coordinate test', () => {
        piece.updateCurrentPosition('a2', board.getPieces());
        expect(piece.isEmptyCoordinate(createCoordinate(1, 2))).toBeFalsy();
    });

    test('Is opposing color test', () => {
        piece.updateCurrentPosition('a1', board.getPieces());
        expect(piece.isOpposingColor(createCoordinate(3, 3))).toBeTruthy();
    });

    test('Is not opposing color test', () => {
        piece.updateCurrentPosition('a1', board.getPieces());
        expect(piece.isOpposingColor(createCoordinate(1, 1))).toBeFalsy();
        expect(piece.isOpposingColor(createCoordinate(2, 2))).toBeFalsy();
    });
});

describe('next move rule', () => {
    test('next movement is the same test', () => {
        let result = piece.getNextMoveRule('P');
        expect(result.moveRule).toBe(piece);
        expect(result.abbreviation).toBe('P');
    });
});

//Test isPossibleMove, getAttackMovements, getPossibleMovements are performed in the child classes
