import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './io/message.js';
import { pieceTypes } from './pieces/pieceType.js';

function initializeGame() {

    let game = {};
    game.play = play;
    game.getBoardResponse = getBoardResponse;

    function createGame(uuid) {
        game.uuid = uuid;
        game.board = boardBuilder().usingInitialPieceDisposition().build();
        game.cpuPlayer = cpuPlayer();
        game.registry = createRegistry(game.board);
        return game;
    }

    function play(movementOrigin, movementDestination){
        if(!this.board.isWhitePiece(movementOrigin))
            return createErrorMessage('Invalid move: Attempting to move a wrong color piece.');

        console.log('Endangered white:' );
        console.log(this.board.getAllAttackpositionsByColor(pieceTypes.black));

        let playerMovement = this.board.performMovement(movementOrigin, movementDestination);

        console.log('Endangered balck:' );
        console.log(this.board.getAllAttackpositionsByColor(pieceTypes.white));

        if(playerMovement) {
            this.cpuPlayer.performRandomMovement(this.board);
            this.registry.register();
            return createMessage();
        }

        return createErrorMessage(this.board.getErrorMessage());
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
