import { getQueenMoveRule }  from '../../moveRule/queenMoveRule.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from '../utils//layoutBoard.js';
import { getPossibleCoordiantes } from '../utils/move.js';

let queen;
let middleBoard;

beforeEach(() => {
    queen = getQueenMoveRule();
    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WQ')).build();
});

describe('Get Possible moves for line', () => {
        test('Possible movements located in the middle in the north direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'd5', 'd6', 'd7', 'd8' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });

        test('Possible movements located in the middle in the south direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'd3', 'd2'];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });

        test('Possible movements located in the middle in the east direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'e4', 'f4', 'g4', 'h4' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });


        test('Possible movements located in the middle in the west direction test', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'c4', 'b4', 'a4', ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });
});

describe('Get Possible moves for diagonal', () => {
    test('Possible movements located in the middle in the northeast direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'e5', 'f6', 'g7', 'h8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the northwest direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'c5', 'b6', 'a7' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the southeast direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'e3', 'f2', 'g1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });


    test('Possible movements located in the middle in the southwest direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'c3', 'b2', 'a1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});
