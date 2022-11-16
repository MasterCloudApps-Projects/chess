import { createStraightLineMoveRule }  from '../../moveRule/straightLineMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';
import { layout } from './utils/layoutBoard.js'
import { getPossibleCoordiantes } from './utils/move.js'

let lineNorth;
let lineSouth;
let lineEast;
let lineWeast;
let lineNortheast;
let lineNorthwest;
let lineSoutheast;
let lineSouthwest;

let middleBoard;
let topBoard;
let bottonBoard;
let rightBoard;
let leftBoard;
let surroundedBoard;
let surroundedOposite;

beforeEach(() => {
    lineNorth = createStraightLineMoveRule([DirectionEnum.NORTH]);
    lineSouth = createStraightLineMoveRule([DirectionEnum.SOUTH]);
    lineEast = createStraightLineMoveRule([DirectionEnum.EAST]);
    lineWeast = createStraightLineMoveRule([DirectionEnum.WEST]);
    lineNortheast = createStraightLineMoveRule([DirectionEnum.NORTHEAST]);
    lineNorthwest = createStraightLineMoveRule([DirectionEnum.NORTHWEST]);
    lineSoutheast = createStraightLineMoveRule([DirectionEnum.SOUTHEAST]);
    lineSouthwest = createStraightLineMoveRule([DirectionEnum.SOUTHWEST]);

    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WQ')).build();
    topBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WQ')).build();
    bottonBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WQ')).build();
    rightBoard = boardBuilder().fromPieceLayoutString(layout.top.replace('X', 'WQ')).build();
    leftBoard = boardBuilder().fromPieceLayoutString(layout.botton.replace('X', 'WQ')).build();
    surroundedBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace(/X/g, 'WQ')).build()
    surroundedOposite = boardBuilder().fromPieceLayoutString(layout.surroundedByOpposite.replace('X', 'WQ').replace(/Y/g, 'BP')).build();
});

describe('Get Possible Moves for Line North', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineNorth);
        let expectedCoordinates =  [ 'd5', 'd6', 'd7', 'd8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'c5', 'e6' ];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineNorth);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineNorth);
        let expectedCoordinates = ['b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'];
        let notExpectedCoordinates = ['c2', 'a2', 'c1', 'a1', 'd1'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineNorth);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineNorth);
        let notExpectedCoordinates = ['c2', 'e2', 'c1', 'a1', 'c3', 'a3'];
        expect(possibleCoordinates.includes('d3')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line South', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineSouth);
        let expectedCoordinates =  [ 'd3', 'd2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'd5', 'c4', 'e4', 'c5', 'e5', 'c3', 'e3'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineSouth);
        let expectedCoordinates = ['b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1'];
        let notExpectedCoordinates = ['c8', 'a8', 'c7', 'a7'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineSouth);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineSouth);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineSouth);
        let notExpectedCoordinates = ['c2', 'e2', 'c1', 'a1', 'c3', 'a3', 'd3'];
        expect(possibleCoordinates.includes('d1')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line East', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineEast);
        let expectedCoordinates =  [ 'e4', 'f4', 'g4', 'h4' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'e3', 'f3', 'g3', 'h3', 'd5', 'd3'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineEast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), lineEast);
        let expectedCoordinates = ['b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'];
        let notExpectedCoordinates = ['a4', 'a2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineEast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineEast);
        let notExpectedCoordinates = ['d1', 'd3', 'c2', 'c3', 'c1', 'e1', 'e3'];
        expect(possibleCoordinates.includes('e2')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line Weat', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineWeast);
        let expectedCoordinates =  [ 'c4', 'b4', 'a4', ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'e4', 'd5', 'd3', 'c5', 'c3', 'e5', 'e3'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });


    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineWeast);
        let expectedCoordinates = ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3'];
        let notExpectedCoordinates = ['h2', 'h1'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), lineWeast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineWeast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineWeast);
        let notExpectedCoordinates = ['d1', 'd3', 'e2', 'c3', 'c1', 'e1', 'e3'];
        expect(possibleCoordinates.includes('c2')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

});

describe('Get Possible Moves for Line Northeast', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineNortheast);
        let expectedCoordinates =  [ 'e5', 'f6', 'g7', 'h8' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'd5', 'd3', 'c4', 'e4', 'e3', 'f3', 'f5'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineNortheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineNortheast);
        let expectedCoordinates = [ 'c2', 'd3', 'e4', 'f5', 'g6', 'h7' ];
        let notExpectedCoordinates = ['a1', 'c1', 'a2', 'b2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineNortheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), lineNortheast);
        let expectedCoordinates =  [ 'b4', 'c5', 'd6', 'e7', 'f8' ];
        let notExpectedCoordinates = ['a4', 'a2', 'b3'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineNortheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineNortheast);
        let notExpectedCoordinates = ['c2', 'e2', 'c1', 'a1', 'c3', 'a3', 'd3'];
        expect(possibleCoordinates.includes('e3')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line Northwest', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineNorthwest);
        let expectedCoordinates = [ 'c5', 'b6', 'a7' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'd5', 'd3', 'c4', 'e4', 'e3', 'f3', 'f5', 'e5'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineNorthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineNorthwest);
        let expectedCoordinates = ['a2'];
        let notExpectedCoordinates = ['a1', 'c1', 'b2', 'c2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineNorthwest);
        let expectedCoordinates =  [ 'g4', 'f5', 'e6', 'd7', 'c8' ];
        let notExpectedCoordinates = ['a4', 'a2', 'b3', 'b4'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), lineNorthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineNorthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineNorthwest);
        let notExpectedCoordinates = ['c2', 'e2', 'c1', 'a1', 'e3', 'a3', 'd3'];
        expect(possibleCoordinates.includes('c3')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line Southeast', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineSoutheast);
        let expectedCoordinates = [ 'e3', 'f2', 'g1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'd5', 'd3', 'c4', 'e4', 'e5', 'f3', 'f5'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineSoutheast);
        let expectedCoordinates = [ 'c7', 'd6', 'e5', 'f4', 'g3', 'h2' ];
        let notExpectedCoordinates = ['a1', 'c1', 'a2', 'b2', 'c2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineSoutheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineSoutheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', leftBoard.getPieces(), lineSoutheast);
        let expectedCoordinates =  [ 'b2', 'c1'];
        let notExpectedCoordinates = ['a4', 'a2', 'b3', 'b4'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineSoutheast);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineSoutheast);
        let notExpectedCoordinates = ['c2', 'e2', 'c1', 'a1', 'c3', 'a3', 'd3', 'e3'];
        expect(possibleCoordinates.includes('e1')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Get Possible Moves for Line Southwest', () => {

    test('Get Possibles Movements in the Middle Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), lineSouthwest);
        let expectedCoordinates = [ 'c3', 'b2', 'a1' ];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        let notExpectedCoordinates =  [ 'd5', 'd3', 'c4', 'e4', 'e3', 'f3', 'f5', 'e5', 'c5'];
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Top Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b8', topBoard.getPieces(), lineSouthwest);
        let expectedCoordinates = [ 'a7' ];
        let notExpectedCoordinates = ['a1', 'c1', 'a2', 'b2', 'c2', 'c7'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Botton Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('b1', bottonBoard.getPieces(), lineSouthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possibles Movements in the Right Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('h3', rightBoard.getPieces(), lineSouthwest);
        let expectedCoordinates = [ 'g2', 'f1' ];
        let notExpectedCoordinates = ['a4', 'a2', 'b3', 'b4'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });

    test('Get Possibles Movements in the Left Test', () => {
        let possibleCoordinates = getPossibleCoordiantes('a3', rightBoard.getPieces(), lineSouthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Not Possible Movements: piece is surrounded', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), lineSouthwest);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Get Possible Movements: piece is surrounded by oposite', () => {
        let possibleCoordinates = getPossibleCoordiantes('d2', surroundedOposite.getPieces(), lineSouthwest);
        let notExpectedCoordinates = ['c2', 'e2', 'c3', 'a1', 'e3', 'a3', 'd3'];
        expect(possibleCoordinates.includes('c1')).toBeTruthy();
        notExpectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeFalsy());
    });
});

describe('Is Possible Moves North', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineNorth.isPossibleMove('d4', 'd6', middleBoard.getPieces())).toBeTruthy();
        expect(lineNorth.isPossibleMove('d4', 'd5', middleBoard.getPieces())).toBeTruthy();

        //In the botton
        expect(lineNorth.isPossibleMove('b1', 'b5', bottonBoard.getPieces())).toBeTruthy();
        expect(lineNorth.isPossibleMove('b1', 'b8', bottonBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineNorth.isPossibleMove('d2', 'd3', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineNorth.isPossibleMove('d4', 'd3', middleBoard.getPieces())).toBeFalsy();
        expect(lineNorth.isPossibleMove('d4', 'd2', middleBoard.getPieces())).toBeFalsy();

        //In the top
        expect(lineNorth.isPossibleMove('b8', 'b7', topBoard.getPieces())).toBeFalsy();
        expect(lineNorth.isPossibleMove('b8', 'b6', topBoard.getPieces())).toBeFalsy();

        //In the right
        expect(lineNorth.isPossibleMove('h3', 'f4', rightBoard.getPieces())).toBeFalsy();
        expect(lineNorth.isPossibleMove('h3', 'f2', rightBoard.getPieces())).toBeFalsy();

        //In the left
        expect(lineNorth.isPossibleMove('a3', 'c3', leftBoard.getPieces())).toBeFalsy();
        expect(lineNorth.isPossibleMove('a3', 'd4', leftBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineNorth.isPossibleMove('d2', 'd3', surroundedBoard.getPieces())).toBeFalsy();
    });
});

describe('Is Possible Moves South', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineSouth.isPossibleMove('d4', 'd3', middleBoard.getPieces())).toBeTruthy();
        expect(lineSouth.isPossibleMove('d4', 'd2', middleBoard.getPieces())).toBeTruthy();

        //In the top
        expect(lineSouth.isPossibleMove('b8', 'b7', topBoard.getPieces())).toBeTruthy();
        expect(lineSouth.isPossibleMove('b8', 'b1', topBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineSouth.isPossibleMove('d2', 'd1', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineSouth.isPossibleMove('d4', 'd5', middleBoard.getPieces())).toBeFalsy();
        expect(lineSouth.isPossibleMove('d4', 'd8', middleBoard.getPieces())).toBeFalsy();

        //In the botton
        expect(lineSouth.isPossibleMove('b1', 'b0', bottonBoard.getPieces())).toBeFalsy();

        //In the right
        expect(lineSouth.isPossibleMove('h3', 'f4', rightBoard.getPieces())).toBeFalsy();
        expect(lineSouth.isPossibleMove('h3', 'f2', rightBoard.getPieces())).toBeFalsy();

        //In the left
        expect(lineSouth.isPossibleMove('a3', 'c3', leftBoard.getPieces())).toBeFalsy();
        expect(lineSouth.isPossibleMove('a3', 'd4', leftBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineSouth.isPossibleMove('d2', 'd1', surroundedBoard.getPieces())).toBeFalsy();
    });
});

describe('Is Possible Moves East', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineEast.isPossibleMove('d4', 'e4', middleBoard.getPieces())).toBeTruthy();
        expect(lineEast.isPossibleMove('d4', 'h4', middleBoard.getPieces())).toBeTruthy();

        //In the left
        expect(lineEast.isPossibleMove('a3', 'b3', leftBoard.getPieces())).toBeTruthy();
        expect(lineEast.isPossibleMove('a3', 'g3', leftBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineEast.isPossibleMove('d2', 'e2', surroundedOposite.getPieces())).toBeTruthy();
    });

        test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineEast.isPossibleMove('d4', 'a4', middleBoard.getPieces())).toBeFalsy();
        expect(lineEast.isPossibleMove('d4', 'c4', middleBoard.getPieces())).toBeFalsy();

        //In the right
        expect(lineEast.isPossibleMove('h3', 'f4', rightBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineEast.isPossibleMove('d2', 'e2', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Is Possible Moves West', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineWeast.isPossibleMove('d4', 'c4', middleBoard.getPieces())).toBeTruthy();
        expect(lineWeast.isPossibleMove('d4', 'a4', middleBoard.getPieces())).toBeTruthy();

        //In the Right
        expect(lineWeast.isPossibleMove('h3', 'a3', rightBoard.getPieces())).toBeTruthy();
        expect(lineWeast.isPossibleMove('h3', 'g3', rightBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineWeast.isPossibleMove('d2', 'c2', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineWeast.isPossibleMove('d4', 'e4', middleBoard.getPieces())).toBeFalsy();
        expect(lineWeast.isPossibleMove('d4', 'h4', middleBoard.getPieces())).toBeFalsy();

        //In the left
        expect(lineWeast.isPossibleMove('a3', 'b3', leftBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineWeast.isPossibleMove('d2', 'c2', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Is Possible Moves Northeast', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineNortheast.isPossibleMove('d4', 'e5', middleBoard.getPieces())).toBeTruthy();
        expect(lineNortheast.isPossibleMove('d4', 'h8', middleBoard.getPieces())).toBeTruthy();

        //In the botton
        expect(lineNortheast.isPossibleMove('b1', 'c2', bottonBoard.getPieces())).toBeTruthy();
        expect(lineNortheast.isPossibleMove('b1', 'g6', bottonBoard.getPieces())).toBeTruthy();

        //In the left
        expect(lineNortheast.isPossibleMove('a3', 'b4', leftBoard.getPieces())).toBeTruthy();
        expect(lineNortheast.isPossibleMove('a3', 'f8', leftBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineNortheast.isPossibleMove('d2', 'e3', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineNortheast.isPossibleMove('d4', 'a1', middleBoard.getPieces())).toBeFalsy();
        expect(lineNortheast.isPossibleMove('d4', 'b2', middleBoard.getPieces())).toBeFalsy();

        //In the top
        expect(lineNortheast.isPossibleMove('b8', 'c7', topBoard.getPieces())).toBeFalsy();
        expect(lineNortheast.isPossibleMove('b8', 'a7', topBoard.getPieces())).toBeFalsy();

        //In the right
        expect(lineNortheast.isPossibleMove('h3', 'f4', rightBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineNortheast.isPossibleMove('d2', 'e3', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Is Possible Moves Northwest', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineNorthwest.isPossibleMove('d4', 'c5', middleBoard.getPieces())).toBeTruthy();
        expect(lineNorthwest.isPossibleMove('d4', 'a7', middleBoard.getPieces())).toBeTruthy();

        //In the botton
        expect(lineNorthwest.isPossibleMove('b1', 'a2', bottonBoard.getPieces())).toBeTruthy();

        //In the Right
        expect(lineNorthwest.isPossibleMove('h3', 'g4', rightBoard.getPieces())).toBeTruthy();
        expect(lineNorthwest.isPossibleMove('h3', 'c8', rightBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineNorthwest.isPossibleMove('d2', 'c3', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineNorthwest.isPossibleMove('d4', 'e4', middleBoard.getPieces())).toBeFalsy();
        expect(lineNorthwest.isPossibleMove('d4', 'h4', middleBoard.getPieces())).toBeFalsy();

        //In the top
        expect(lineNorthwest.isPossibleMove('b8', 'd5', topBoard.getPieces())).toBeFalsy();
        expect(lineNorthwest.isPossibleMove('b8', 'e4', topBoard.getPieces())).toBeFalsy();

        //In the left
        expect(lineNorthwest.isPossibleMove('a3', 'a4', leftBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineNorthwest.isPossibleMove('d2', 'c3', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Is Possible Moves Southeast', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineSoutheast.isPossibleMove('d4', 'e3', middleBoard.getPieces())).toBeTruthy();
        expect(lineSoutheast.isPossibleMove('d4', 'g1', middleBoard.getPieces())).toBeTruthy();

        //In the top
        expect(lineSoutheast.isPossibleMove('b8', 'c7', topBoard.getPieces())).toBeTruthy();
        expect(lineSoutheast.isPossibleMove('b8', 'h2', topBoard.getPieces())).toBeTruthy();

        //In the left
        expect(lineSoutheast.isPossibleMove('a3', 'b2', leftBoard.getPieces())).toBeTruthy();
        expect(lineSoutheast.isPossibleMove('a3', 'c1', leftBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineSoutheast.isPossibleMove('d2', 'e1', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineSoutheast.isPossibleMove('d4', 'a1', middleBoard.getPieces())).toBeFalsy();
        expect(lineSoutheast.isPossibleMove('d4', 'b2', middleBoard.getPieces())).toBeFalsy();

        //In the botton
        expect(lineSoutheast.isPossibleMove('b1', 'c2', bottonBoard.getPieces())).toBeFalsy();
        expect(lineSoutheast.isPossibleMove('b1', 'a2', bottonBoard.getPieces())).toBeFalsy();

        //In the right
        expect(lineSoutheast.isPossibleMove('h3', 'f2', rightBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineSoutheast.isPossibleMove('d2', 'e1', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Is Possible Moves Southwest', () => {

    test('Is Possible Moves ', () => {
        //In the middle
        expect(lineSouthwest.isPossibleMove('d4', 'c3', middleBoard.getPieces())).toBeTruthy();
        expect(lineSouthwest.isPossibleMove('d4', 'a1', middleBoard.getPieces())).toBeTruthy();

        //In the top
        expect(lineSouthwest.isPossibleMove('b8', 'a7', topBoard.getPieces())).toBeTruthy();

        //In the Right
        expect(lineSouthwest.isPossibleMove('h3', 'g2', rightBoard.getPieces())).toBeTruthy();
        expect(lineSouthwest.isPossibleMove('h3', 'f1', rightBoard.getPieces())).toBeTruthy();

        //In the surrounded by oposite'
        expect(lineSouthwest.isPossibleMove('d2', 'c1', surroundedOposite.getPieces())).toBeTruthy();
    });

    test('Is Not Possible Moves', () => {
        //In the middle
        expect(lineSouthwest.isPossibleMove('d4', 'e4', middleBoard.getPieces())).toBeFalsy();
        expect(lineSouthwest.isPossibleMove('d4', 'h4', middleBoard.getPieces())).toBeFalsy();

        //In the botton
        expect(lineSouthwest.isPossibleMove('b1', 'c2', bottonBoard.getPieces())).toBeFalsy();
        expect(lineSouthwest.isPossibleMove('b1', 'a2', bottonBoard.getPieces())).toBeFalsy();

        //In the left
        expect(lineSouthwest.isPossibleMove('a3', 'a4', leftBoard.getPieces())).toBeFalsy();

        //In the surrounded
        expect(lineSouthwest.isPossibleMove('d2', 'c1', surroundedBoard.getPieces())).toBeFalsy();
    });

});

describe('Get Attack Movements', () => {
    test('Get Attack Movements North', () => {
        let moves = lineNorth.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("d3")).toBeTruthy();
    });

    test('Get Not Attack Movements North', () => {
        let moves = lineNorth.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("d3")).toBeFalsy();
    });

    test('Get Attack Movements South', () => {
        let moves = lineSouth.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("d1")).toBeTruthy();
    });

    test('Get Not Attack Movements South', () => {
        let moves = lineSouth.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("d1")).toBeFalsy();
    });

    test('Get Attack Movements East', () => {
        let moves = lineEast.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("e2")).toBeTruthy();
    });

    test('Get Not Attack Movements East', () => {
        let moves = lineEast.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("e2")).toBeFalsy();
    });

    test('Get Attack Movements West', () => {
        let moves = lineWeast.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("c2")).toBeTruthy();
    });

    test('Get Not Attack Movements West', () => {
        let moves = lineWeast.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("c2")).toBeFalsy();
    });

    test('Get Attack Movements Northeast', () => {
        let moves = lineNortheast.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("e3")).toBeTruthy();
    });

    test('Get Not Attack Movements Northeast', () => {
        let moves = lineNortheast.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("e3")).toBeFalsy();
    });

    test('Get Attack Movements Northwest', () => {
        let moves = lineNorthwest.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("c3")).toBeTruthy();
    });

    test('Get Not Attack Movements Northwest', () => {
        let moves = lineNorthwest.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("c3")).toBeFalsy();
    });

    test('Get Attack Movements Southeast', () => {
        let moves = lineSoutheast.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("e1")).toBeTruthy();
    });

    test('Get Not Attack Movements Southeast', () => {
        let moves = lineSoutheast.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("e1")).toBeFalsy();
    });

    test('Get Attack Movements Southwest', () => {
        let moves = lineSouthwest.getAttackMovements('d2', surroundedOposite.getPieces());
        expect(moves.includes("c1")).toBeTruthy();
    });

    test('Get Not Attack Movements Southwest', () => {
        let moves = lineSouthwest.getAttackMovements('d2', surroundedBoard.getPieces());
        expect(moves.includes("c1")).toBeFalsy();
    });

});
