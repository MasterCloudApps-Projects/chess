import { createStraightLineMoveRule }  from '../../moveRule/straightLineMoveRule';
import { boardBuilder } from '../../main/boardBuilder.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';
import { layout } from './utils/layoutBoard.js'


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
    lineNorthwest = createStraightLineMoveRule([DirectionEnum.NORTHEAST]);
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
        let expectedCoordinates =  [ 'd3', 'd2', 'd2'];
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
        console.log(possibleCoordinates);
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

function getPossibleCoordiantes(origin, pieces, piece){
    let possibleCoordinates = [];
    piece.updateCurrentPosition(origin, pieces);
    piece.getPossibleMovements().forEach(p => possibleCoordinates.push(p.getPosition()));
    return possibleCoordinates;
}
