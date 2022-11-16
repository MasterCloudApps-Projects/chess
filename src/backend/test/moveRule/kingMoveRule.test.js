import { getKingMoveRule }  from '../../moveRule/kingMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from './utils/layoutBoard.js'
import { getPossibleCoordiantes } from './utils/move.js'

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

describe('Get Possible Moves', () => {
    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), king);
        let expectedCoordinates = ['d5', 'd3', 'e4', 'c4', 'e5', 'c5', 'e3', 'c3'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Possibles Movements in the top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), king);
        let expectedCoordinates = ['b7', 'c8', 'a8', 'c7', 'a7'];
        let notExpectedCoordinates = ['b9', 'a9', 'c9'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), king);
        let expectedCoordinates = ['b2', 'a2', 'c2', 'a1', 'c1'];
        let notExpectedCoordinates = ['b0', 'a0', 'c0'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), king);
        let expectedCoordinates = ['h4', 'h2', 'g4', 'g2'];
        let notExpectedCoordinates = ['f3', 'f4', 'f2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), king);
        let expectedCoordinates = ['a4', 'a2', 'b3', 'b4', 'b2', 'a3'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Get Not Possible Movements: king is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), king);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: king is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), king);
        let expectedCoordinates = ['d3', 'd1', 'e2', 'c2', 'e3', 'c3', 'e1', 'c1'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

describe('Is Possible Moves', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(king.isPossibleMove('d4', 'c4', middleBoard.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('d4', 'e5', middleBoard.getPieces())).toBeTruthy();

        //In the top
        expect(king.isPossibleMove('b8', 'b7', topBoard.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('b8', 'a8', topBoard.getPieces())).toBeTruthy();

        //In the botton
        expect(king.isPossibleMove('b1', 'b2', bottonBoard.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('b1', 'a1', bottonBoard.getPieces())).toBeTruthy();

        //In the right
        expect(king.isPossibleMove('h3', 'h2', rightBoard.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('h3', 'g4', rightBoard.getPieces())).toBeTruthy();

        //In the left
        expect(king.isPossibleMove('a3', 'a2', leftBoard.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('a3', 'b4', leftBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(king.isPossibleMove('d2', 'c2', surroundedOposite.getPieces())).toBeTruthy();
        expect(king.isPossibleMove('d2', 'e1', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(king.isPossibleMove('d4', 'a4', middleBoard.getPieces())).toBeFalsy();
        expect(king.isPossibleMove('d4', 'g2', middleBoard.getPieces())).toBeFalsy();

        //In the top
        expect(king.isPossibleMove('b8', 'a9', topBoard.getPieces())).toBeFalsy();
        expect(king.isPossibleMove('b8', 'c9', topBoard.getPieces())).toBeFalsy();

        //In the botton
        expect(king.isPossibleMove('b1', 'a0', bottonBoard.getPieces())).toBeFalsy();
        expect(king.isPossibleMove('b1', 'b0', bottonBoard.getPieces())).toBeFalsy();

        //In the right
        expect(king.isPossibleMove('h3', 'f4', rightBoard.getPieces())).toBeFalsy();
        expect(king.isPossibleMove('h3', 'f2', rightBoard.getPieces())).toBeFalsy();

        //In the left
        expect(king.isPossibleMove('a3', 'c3', leftBoard.getPieces())).toBeFalsy();
        expect(king.isPossibleMove('a3', 'd4', leftBoard.getPieces())).toBeFalsy();
    });
});

describe('Get Attack Movements', () => {
    test('Get Attack Movements Test', () => {
        let moves = king.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("d3")).toBeTruthy();
        expect(moves.includes("c3")).toBeTruthy();
    });

    test('Get Not Attack Movements Test', () => {
        let moves = king.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });
});

