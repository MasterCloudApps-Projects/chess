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

describe('Get Possible Moves', () => {
    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('d4', middleBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("d5")).toBeTruthy();
        expect(possibleCoordinate.includes("d3")).toBeTruthy();
        expect(possibleCoordinate.includes("e4")).toBeTruthy();
        expect(possibleCoordinate.includes("c4")).toBeTruthy();
        expect(possibleCoordinate.includes("e5")).toBeTruthy();
        expect(possibleCoordinate.includes("c5")).toBeTruthy();
        expect(possibleCoordinate.includes("e3")).toBeTruthy();
        expect(possibleCoordinate.includes("c3")).toBeTruthy();
    });

    test('Get Possibles Movements in the top Test', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('b8', topBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("b9")).toBeFalsy()
        expect(possibleCoordinate.includes("a9")).toBeFalsy();
        expect(possibleCoordinate.includes("c9")).toBeFalsy();
        expect(possibleCoordinate.includes("b7")).toBeTruthy();
        expect(possibleCoordinate.includes("c8")).toBeTruthy();
        expect(possibleCoordinate.includes("a8")).toBeTruthy();
        expect(possibleCoordinate.includes("c7")).toBeTruthy();
        expect(possibleCoordinate.includes("a7")).toBeTruthy();
    });

    test('Get Possibles Movements in the botton Test', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('b1', bottonBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("b0")).toBeFalsy()
        expect(possibleCoordinate.includes("a0")).toBeFalsy();
        expect(possibleCoordinate.includes("c0")).toBeFalsy();
        expect(possibleCoordinate.includes("b2")).toBeTruthy();
        expect(possibleCoordinate.includes("a2")).toBeTruthy();
        expect(possibleCoordinate.includes("c2")).toBeTruthy();
        expect(possibleCoordinate.includes("a1")).toBeTruthy();
        expect(possibleCoordinate.includes("c1")).toBeTruthy();
    });

    test('Get Possibles Movements in the right Test', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('h3', rightBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("f3")).toBeFalsy()
        expect(possibleCoordinate.includes("f4")).toBeFalsy();
        expect(possibleCoordinate.includes("f2")).toBeFalsy();
        expect(possibleCoordinate.includes("h4")).toBeTruthy();
        expect(possibleCoordinate.includes("h2")).toBeTruthy();
        expect(possibleCoordinate.includes("g4")).toBeTruthy();
        expect(possibleCoordinate.includes("g2")).toBeTruthy();
    });

    test('Get Possibles Movements in the left Test', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('a3', leftBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        console.log(possibleCoordinate);
        expect(possibleCoordinate.includes("a4")).toBeTruthy();
        expect(possibleCoordinate.includes("a2")).toBeTruthy();
        expect(possibleCoordinate.includes("b3")).toBeTruthy();
        expect(possibleCoordinate.includes("b4")).toBeTruthy();
        expect(possibleCoordinate.includes("b2")).toBeTruthy();
        expect(possibleCoordinate.includes("a3")).toBeTruthy();
    });

    test('Get Not Possible Movements: king is surrounded', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('d2', surroundedBoard.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: king is surrounded by oposite', () => {
        let possibleCoordinate = [];
        king.updateCurrentPosition('d2', surroundedOposite.getPieces());

        king.getPossibleMovements().forEach(p => possibleCoordinate.push(p.getPosition()));

        expect(possibleCoordinate.includes("d3")).toBeTruthy();
        expect(possibleCoordinate.includes("d1")).toBeTruthy();
        expect(possibleCoordinate.includes("e2")).toBeTruthy();
        expect(possibleCoordinate.includes("c2")).toBeTruthy();
        expect(possibleCoordinate.includes("e3")).toBeTruthy();
        expect(possibleCoordinate.includes("c3")).toBeTruthy();
        expect(possibleCoordinate.includes("e1")).toBeTruthy();
        expect(possibleCoordinate.includes("c1")).toBeTruthy();
    });
});

//Todo: test pending attack movements, is possible movements

