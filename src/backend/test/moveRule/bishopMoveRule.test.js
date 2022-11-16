import { getBishopMoveRule }  from '../../moveRule/bishopMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'
import { getPossibleCoordiantes } from './utils/move.js'

let bishop;
let middleBoard;

beforeEach(() => {
    bishop = getBishopMoveRule();
    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WB')).build();
});

describe('Get Possible Moves for Diagonal', () => {

    test('Get Possibles Movements in the Middle Test Northeast', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'e5', 'f6', 'g7', 'h8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the Middle Test Northwest', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'c5', 'b6', 'a7' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the Middle Test Southeast', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'e3', 'f2', 'g1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });


    test('Get Possibles Movements in the Middle Test Southwest', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), bishop);
        let expectedCoordinates =  [ 'c3', 'b2', 'a1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

