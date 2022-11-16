import { getQueenMoveRule }  from '../../moveRule/queenMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'
import { getPossibleCoordiantes } from './utils/move.js'

let queen;
let middleBoard;

beforeEach(() => {
    queen = getQueenMoveRule();
    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WQ')).build();
});

describe('Get Possible Moves for Line', () => {

    describe('Get Possible Moves for Diagonal', () => {

        test('Get Possibles Movements in the Middle Test North', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'd5', 'd6', 'd7', 'd8' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });

        test('Get Possibles Movements in the Middle Test South', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'd3', 'd2'];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });

        test('Get Possibles Movements in the Middle Test East', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'e4', 'f4', 'g4', 'h4' ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });


        test('Get Possibles Movements in the Middle Test Weast', () => {
            let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
            let expectedCoordinates =  [ 'c4', 'b4', 'a4', ];
            expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        });
    });
});

describe('Get Possible Moves for Diagonal', () => {

    test('Get Possibles Movements in the Middle Test Northeast', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'e5', 'f6', 'g7', 'h8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the Middle Test Northwest', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'c5', 'b6', 'a7' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the Middle Test Southeast', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'e3', 'f2', 'g1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });


    test('Get Possibles Movements in the Middle Test Southwest', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), queen);
        let expectedCoordinates =  [ 'c3', 'b2', 'a1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});
