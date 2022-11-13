import { getHorseMoveRule }  from '../../moveRule/horseMoveRule.js';
import { boardBuilder } from '../boardBuilderTest.js'

let horse;
let board

beforeEach(() => {
    board = boardBuilder(`
        _-_-_-_
        _-_-_-_
        WH-_-_-_`, 3, "abcd").build();
    horse = getHorseMoveRule();

});

describe('Moves', () => {

    test('Get Possible Movements Test', () => {
        horse.updateCurrentPosition('b3', board.getPieces());
        let moves = horse.getPossibleMovements()
        expect(moves).toBe();
    });
});

//Test isPossibleMove, getAttackMovements and getPossibleMovements are performed in the child classes
