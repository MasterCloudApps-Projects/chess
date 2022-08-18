import { boardBuilder } from './boardBuilder.js';
// import cpu player from ./

function initializeGame() {

    let game = {};
    game.performMovement = performMovement;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        return game;
    }

    function performMovement(movementOrigin, movementDestination) {
        return this.board.performMovement(movementOrigin, movementDestination);
    }

    return {
        createGame
    }
}

export {
    initializeGame
}
