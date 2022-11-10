import { createPieceMoveRule }  from '../../moveRule/pieceMoveRule.js';
import { createCoordinate }  from '../../moveRule/coordinate.js';
import { boardBuilder } from '../boardUtilsTest.js'

let boardPieces;
let piece;

beforeEach(() => {
    piece = createPieceMoveRule();
    boardPieces = boardBuilder(`
        BP-BQ-BP
        _-_-_
        WP-WQ-WP`, 3, "abc").build();
});

//TODO: test function isPossibleMove, getAttackMovements and getPossibleMovements -> children test is possible?

test('testUpadteCurrentPosition', () => {
    piece.updateCurrentPosition('a2', boardPieces.getPieces());
    expect(piece.getCurrentCoordinate().getPosition())
        .toBe(createCoordinate(2, 1).getPosition());
    expect(piece.getBoardPieces()).toBe(boardPieces.getPieces());
});

test('testIsEmptyCoordinate', () => {
    piece.updateCurrentPosition('a2', boardPieces.getPieces());
    expect(piece.isEmptyCoordinate(createCoordinate(2, 2))).toBeTruthy();
});

test('testIsNotEmptyCoordinate', () => {
    piece.updateCurrentPosition('a2', boardPieces.getPieces());
    expect(piece.isEmptyCoordinate(createCoordinate(1, 2))).toBeFalsy();
});

test('testIsOpposingColor', () => {
    piece.updateCurrentPosition('a1', boardPieces.getPieces());
    expect(piece.isOpposingColor(createCoordinate(3, 3))).toBeTruthy();
});

test('testIsNotOpposingColor', () => {
    piece.updateCurrentPosition('a1', boardPieces.getPieces());
    expect(piece.isOpposingColor(createCoordinate(1, 1))).toBeFalsy();
    expect(piece.isOpposingColor(createCoordinate(2, 2))).toBeFalsy();
});
