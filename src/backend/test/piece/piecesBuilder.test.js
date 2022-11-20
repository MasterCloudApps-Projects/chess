import { piecesBuilder, getPiece } from "../../piece/piecesBuilder.js";
import { layout } from "../utils/layoutBoard.js";

describe('Piece builder', () => {
    test('Build an empty board test', () => {
        let layoutEmpty = layout.empty.trim().split('\n').join('-').split('-');
        let allPosition = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
                           'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
                           'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
                           'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
                           'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
                           'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
                           'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
                           'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
        let result = piecesBuilder(layoutEmpty).buildFromLayout();
        allPosition.forEach(p => expect(result[p].isEmpty()).toBeTruthy());
    });

    test('Build a board with each type of piece test', () => {
        let layoutWithAllPieces = layout.allTypePieces.trim().split('\n').join('-').split('-');
        let positions = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8'];
        let pieces = ['WP', 'WR', 'WH', 'WB', 'WK', 'WQ', 'BP', 'BR', 'BH', 'BB', 'BK', 'BQ'];
        let result = piecesBuilder(layoutWithAllPieces).buildFromLayout();
        for (var i = 0; i < positions.length; i++) {
            expect(result[positions[i]].getAbbreviation()).toBe(pieces[i]);
          }
    });
});

describe('Get piece', () => {
    test('Get piece empty test', () => {
        let result = getPiece('_', 'a1');
        expect(result.isEmpty()).toBeTruthy();
        expect(result.getFullName()).toBe('empty');
        expect(result.getMovementRule()).toBe(undefined);
        expect(result.getPosition()).toBe('a1');
    });

    test('Get piece empty test', () => {
        let result = getPiece('WP', 'b2');
        expect(result.isEmpty()).toBeFalsy();
        expect(result.getFullName()).toBe('white pawn');
        expect(result.isWhite()).toBeTruthy();
        expect(result.getPosition()).toBe('b2');
    });

    test('Get piece empty test', () => {
        let result = getPiece('BP', 'b7');
        expect(result.isEmpty()).toBeFalsy();
        expect(result.getFullName()).toBe('black pawn');
        expect(result.isWhite()).toBeFalsy();
        expect(result.getPosition()).toBe('b7');
    });
});
