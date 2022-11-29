import { getRookMoveRule }  from '../../moveRule/rookMoveRule.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from '../utils//layoutBoard.js';
import { getPossibleCoordiantes } from '../utils/move.js';

let rook;
let middleBoard;

beforeEach(() => {
    rook = getRookMoveRule();
    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WR')).build();
});

describe('Get Possible moves for line', () => {
    test('Possible movements located in the middle in the north direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), rook);
            let expectedCoordinates =  [ 'd5', 'd6', 'd7', 'd8' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the south direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), rook);
            let expectedCoordinates =  [ 'd3', 'd2'];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the east direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), rook);
            let expectedCoordinates =  [ 'e4', 'f4', 'g4', 'h4' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the west direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), rook);
            let expectedCoordinates =  [ 'c4', 'b4', 'a4', ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

