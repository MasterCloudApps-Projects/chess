import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './io/message.js';
import { pieceTypes } from './pieces/pieceType.js';

function initializeGame() {

    let game = {};
    game.play = play;
    game.getBoardResponse = getBoardResponse;
    game.isValidPlayMovement = isValidPlayMovement;
    game.doPlayMovement = doPlayMovement;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        game.cpuPlayer = cpuPlayer();
        game.registry = createRegistry(game.board);
        return game;
    }

    function play(movementOrigin, movementDestination){

        console.log('Is check black:' );
        console.log(this.board.isCheckByColor(pieceTypes.black));

        if(!this.isValidPlayMovement(movementOrigin))
            return createErrorMessage('Invalid move: Attempting to move a wrong color piece.');

            let playerMovement = this.doPlayMovement(movementOrigin, movementDestination);

            console.log('Is check white:' );
            console.log(this.board.isCheckByColor(pieceTypes.white));

            if(playerMovement) {
                this.cpuPlayer.performRandomMovement(this.board);
                this.registry.register();
                return createMessage();
            }

        return createErrorMessage(this.board.getErrorMessage());
    }

    function doPlayMovement(movementOrigin, movementDestination){
        return this.board.performMovement(movementOrigin, movementDestination);
    }

    function isValidPlayMovement(movementOrigin) {
        return this.board.isWhitePiece(movementOrigin);
    }

    function getBoardResponse() {
        return createMessage(this.board.getBoardPieceNames());
    }

    return {
        createGame
    }
}

export {
    initializeGame
}
