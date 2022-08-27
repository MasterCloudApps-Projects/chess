import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './io/message.js';
import { pieceTypes } from './pieces/pieceType.js';


function createGame(uuid) {
    let game = initializeGame();
    game.uuid = uuid;
    game.board = boardBuilder().usingInitialPieceDisposition().build();
    game.cpuPlayer = cpuPlayer();
    game.registry = createRegistry(game.board);
    return game;
}

function initializeGame() {
    let game = {};

    game.play = function(movementOrigin, movementDestination){
        console.log('Is check black:' ); //PENDING evaluate checkMate
        console.log(this.board.evaluateCheckByColor(pieceTypes.black));

        this.board.whiteMove(movementOrigin, movementDestination);

        console.log('Is check white:' );
        console.log(this.board.evaluateCheckByColor(pieceTypes.white));

        if(this.board.hasError()) {
            return createErrorMessage(this.board.getErrorMessage());
        }

        this.cpuPlayer.performRandomMovement(this.board);
        this.registry.register();
        return createMessage();
    }

    game.getBoardResponse = function () {
        return createMessage(this.board.getBoardPieceNames());
    }

    return game;
}

export {
    createGame
}
