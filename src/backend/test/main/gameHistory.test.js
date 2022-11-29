import { gameHistory }  from '../../main/gameHistory.js';
import { createGame }  from '../../main/game.js';

describe('Find game by id', () => {
    test('Find a game in an empty history test', () => {
        let result = gameHistory.findById(1);
        expect(result).toBe(undefined);
    });

    test('Find a game in a history test', () => {
        let game = createGame(1);
        gameHistory.save(game);
        let result = gameHistory.findById(1);
        expect(result).toBe(game);
    });
});
