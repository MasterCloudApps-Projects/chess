import { getKingMoveRule }  from '../../moveRule/kingMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'

let king;
let middleBoard;
let topBoard;
let bottonBoard;
let rightBoard;
let leftBoard;
let surroundedBoard;
let surroundedOposite;


beforeEach(() => {
    king = getKingMoveRule();

    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WK')).build();
    topBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WK')).build();
    bottonBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WK')).build();
    rightBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WK')).build();
    leftBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WK')).build();
    surroundedBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace(/X/g, 'WK')).build()
    surroundedOposite = boardBuilder().fromPieceLayoutString(layout.surroundedByOpposite.replace('X', 'WK').replace(/Y/g, 'BP')).build();
});

function getPossibleCoordiantes(origin, pieces){
    let possibleCoordinates = [];
    king.updateCurrentPosition(origin, pieces);
    king.getPossibleMovements().forEach(p => possibleCoordinates.push(p.getPosition()));
    return possibleCoordinates;
}
describe('Get Possible Moves', () => {
    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces());
        let expectedCoordinates = ['d5', 'd3', 'e4', 'c4', 'e5', 'c5', 'e3', 'c3'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces());
        let expectedCoordinates = ['b7', 'c8', 'a8', 'c7', 'a7'];
        let notExpectedCoordinates = ['b9', 'a9', 'c9'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces());
        let expectedCoordinates = ['b2', 'a2', 'c2', 'a1', 'c1'];
        let notExpectedCoordinates = ['b0', 'a0', 'c0'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces());
        let expectedCoordinates = ['h4', 'h2', 'g4', 'g2'];
        let notExpectedCoordinates = ['f3', 'f4', 'f2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces());
        let expectedCoordinates = ['a4', 'a2', 'b3', 'b4', 'b2', 'a3'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Not Possible Movements: king is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces());
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: king is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces());
        let expectedCoordinates = ['d3', 'd1', 'e2', 'c2', 'e3', 'c3', 'e1', 'c1'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

//Todo: test pending attack movements, is possible movements

