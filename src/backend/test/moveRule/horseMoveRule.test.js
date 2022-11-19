import { getHorseMoveRule }  from '../../moveRule/horseMoveRule.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { layout } from '../utils//layoutBoard.js';
import { getPossibleCoordiantes } from '../utils/move.js';

let horse;
let middleBoard;
let surroundedBoard;
let surroundedEnemiesBoard;
let circleBoard;
let circleEnemiesBoard;

beforeEach(() => {
    horse = getHorseMoveRule();

    middleBoard = boardBuilder().fromPieceLayoutString(layout.middle.replace('X', 'WH')).build();
    surroundedBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'WH').replace(/Y/g, 'WP')).build();
    surroundedEnemiesBoard = boardBuilder().fromPieceLayoutString(layout.surrounded.replace('X', 'WH').replace(/Y/g, 'BP')).build();
    circleBoard = boardBuilder().fromPieceLayoutString(layout.circle.replace('X', 'WH').replace(/Y/g, 'WP')).build();
    circleEnemiesBoard = boardBuilder().fromPieceLayoutString(layout.circle.replace('X', 'WH').replace(/Y/g, 'BP')).build();
});


//Test isPossibleMove, getAttackMovements and getPossibleMovements are performed in the child classes

describe('Get Possible moves', () => {
    test('Possibles movements in the Middle test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', middleBoard.getPieces(), horse);
        let expectedCoordinates = ['f5', 'e6', 'b5','c6', 'f3', 'e2', 'b3', 'c2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });

    test('Possibles movements surrounded test', () => {
        let coordinatesSurroundedEnemies = getPossibleCoordiantes('d2', surroundedEnemiesBoard.getPieces(), horse);
        let coordinatesSurrounded = getPossibleCoordiantes('d2', surroundedBoard.getPieces(), horse);
        let expectedCoordinates = [ 'f3', 'e4', 'b3', 'c4', 'f1', 'b1' ];
        expectedCoordinates.forEach(c => expect(coordinatesSurroundedEnemies.includes(c)).toBeTruthy());
        expectedCoordinates.forEach(c => expect(coordinatesSurrounded.includes(c)).toBeTruthy());
    });

    test('Not Possible movements: allies in attack position test', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', circleBoard.getPieces(), horse);
        expect(possibleCoordinates.length === 0).toBeTruthy();
    });

    test('Possible movements: enemies in attack position', () => {
        let possibleCoordinates = getPossibleCoordiantes('d4', circleEnemiesBoard.getPieces(), horse);
        let expectedCoordinates = ['f5', 'e6', 'b5', 'c6', 'f3', 'e2', 'b3', 'c2'];
        expectedCoordinates.forEach(c => expect(possibleCoordinates.includes(c)).toBeTruthy());
    });
});

describe('Possible moves', () => {
    test('Is possible moves test', () => {
        //In the middle
        expect(horse.isPossibleMove('d4', 'f5', middleBoard.getPieces())).toBeTruthy();
        expect(horse.isPossibleMove('d4', 'c2', middleBoard.getPieces())).toBeTruthy();

        //Sourrounded
        expect(horse.isPossibleMove('d2', 'f3', surroundedBoard.getPieces())).toBeTruthy();
        expect(horse.isPossibleMove('d2', 'b1', surroundedBoard.getPieces())).toBeTruthy();

        //Sourrounded by enemies
        expect(horse.isPossibleMove('d2', 'f3', surroundedEnemiesBoard.getPieces())).toBeTruthy();
        expect(horse.isPossibleMove('d2', 'b1', surroundedEnemiesBoard.getPieces())).toBeTruthy();

        //Enemies in attack position
        expect(horse.isPossibleMove('d4', 'f5', circleEnemiesBoard.getPieces())).toBeTruthy();
        expect(horse.isPossibleMove('d4', 'c2', circleEnemiesBoard.getPieces())).toBeTruthy();
    });

    test('Is not possible moves test', () => {
        //In the middle
        expect(horse.isPossibleMove('d4', 'b2', middleBoard.getPieces())).toBeFalsy();
        expect(horse.isPossibleMove('d4', 'f2', middleBoard.getPieces())).toBeFalsy();

        //Sourrounded
        expect(horse.isPossibleMove('d2', 'b2', surroundedBoard.getPieces())).toBeFalsy();
        expect(horse.isPossibleMove('d2', 'f2', surroundedBoard.getPieces())).toBeFalsy();

        //Sourrounded by enemies
        expect(horse.isPossibleMove('d2', 'b2', surroundedEnemiesBoard.getPieces())).toBeFalsy();
        expect(horse.isPossibleMove('d2', 'f2', surroundedEnemiesBoard.getPieces())).toBeFalsy();

        //Allies in attack position
        expect(horse.isPossibleMove('d4', 'f5', circleBoard.getPieces())).toBeFalsy();
        expect(horse.isPossibleMove('d4', 'c2', circleBoard.getPieces())).toBeFalsy();
    });
});

describe('Get attack movements', () => {
    test('There are attack movements test', () => {
        let moves = horse.getAttackMovements('d4', circleEnemiesBoard.getPieces());
        expect(moves.includes("f5")).toBeTruthy();
        expect(moves.includes("e6")).toBeTruthy();
        expect(moves.includes("b5")).toBeTruthy();
        expect(moves.includes("c6")).toBeTruthy();
        expect(moves.includes("f3")).toBeTruthy();
        expect(moves.includes("e2")).toBeTruthy();
        expect(moves.includes("b3")).toBeTruthy();
        expect(moves.includes("c2")).toBeTruthy();
    });

    test('No attack movements test', () => {
        let moves = horse.getAttackMovements('d4', circleBoard.getPieces());
        expect(moves).toStrictEqual([]);
    });
});
