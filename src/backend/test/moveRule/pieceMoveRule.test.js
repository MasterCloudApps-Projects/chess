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
        WP-WQ-WP
        `).build();
});

test('testUpadteCurrentPosition', () => {
    piece.updateCurrentPosition('a2', boardPieces.getPieces());
    expect(piece.getCurrentCoordinate().getPosition())
        .toBe(createCoordinate(2, 1).getPosition());
});
