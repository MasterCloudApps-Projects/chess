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

        if(!this.isValidPlayMovement(movementOrigin))
            return createErrorMessage('Invalid move: Attempting to move a wrong color piece.');

            let playerMovement = this.doPlayMovement(movementOrigin, movementDestination);

            console.log('Is check white:' );
            console.log(this.board.evaluateCheckByColor(pieceTypes.white));

            if(playerMovement) {
                this.cpuPlayer.performRandomMovement(this.board);
                this.registry.register();
                return createMessage();
            }

        return createErrorMessage(this.board.getErrorMessage());
    }

    game.getBoardResponse = function () {
        return createMessage(this.board.getBoardPieceNames());
    }

    game.isValidPlayMovement = function (movementOrigin) {
        return this.board.isWhitePiece(movementOrigin);
    }

    game.doPlayMovement = function (movementOrigin, movementDestination) {
        return this.board.performMovement(movementOrigin, movementDestination);
    }

    return game;
}

export {
    createGame
}
