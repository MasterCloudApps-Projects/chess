import { getBishopMoveRule }  from '../../moveRule/bishopMoveRule.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from '../utils//layoutBoard.js';
import { getPossibleCoordiantes } from '../utils/move.js';

let bishop;
let middleBoard;

beforeEach(() => {
    bishop = getBishopMoveRule();
    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WB')).build();
});

describe('Get Possible moves for diagonal', () => {
    test('Possible movements located in the middle in the northeast direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'e5', 'f6', 'g7', 'h8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the northwest direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'c5', 'b6', 'a7' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the southeast direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'e3', 'f2', 'g1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possible movements located in the middle in the southwest direction test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'c3', 'b2', 'a1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

