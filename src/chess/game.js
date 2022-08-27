import { boardBuilder } from './boardBuilder.js';
import { cpuPlayer } from './players/cpuPlayer.js';
import { createRegistry } from './registry.js';
import { createMessage, createErrorMessage } from './io/message.js';
import { pieceTypes } from './pieces/pieceType.js';
import { checkType } from './checkType.js';


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
        let checkStatus = this.board.getCheckByColor(pieceTypes.black);
        console.log('Is check black: ' + checkStatus.status); //PENDING evaluate checkMate

        //TODO: end game
        if(checkType.checkMate == checkStatus){
            game.result = 'CPU player is the winner';
        } else {
            const playerTurn = doPlayerTurn(this.board, movementOrigin, movementDestination, checkStatus);
            if(playerTurn.error) return playerTurn;
            checkStatus = this.board.getCheckByColor(pieceTypes.white);
            console.log('Is check white: ' + checkStatus.status);

            if(checkType.checkMate == checkStatus){
                game.result = 'You are the winner';
            } else {
                this.cpuPlayer.performRandomMovement(this.board, checkStatus);
            }
        }

        this.registry.register();
        return createMessage();
    }

    game.getBoardResponse = function () {
        return createMessage(this.board.getBoardPieceNames());
    }

    return game;
}

function doPlayerTurn(board, origin, destionation, check){
    const invalidMovement = isInvalidMovement(board, origin, destionation, check);
    if (invalidMovement) return createErrorMessage(invalidMovement);
    return playMovement(board, origin, destionation);
}

function isInvalidMovement(board, origin, destionation, check) {
    if(!isValidColorMovement(board, origin))
        return createErrorMessage('Invalid move: Attempting to move a wrong color piece.');

    //TODO: PENDING TO DO movementToGetOutOfCheck
    if(checkType.check == check /*&& check.getOutOfCheck*/
        /*&& check.getOutOfCheck.icludes(movementDestination)*/)
        return createErrorMessage('Invalid move: Must get out of check');
}

function isValidColorMovement(board, origin) {
    return board.isWhitePiece(origin);
}

function playMovement(board, origin, destionation) {
    const performMovement = board.performMovement(origin, destionation);
    if(!performMovement) return createErrorMessage(board.getErrorMessage());
    return performMovement;
}

export {
    createGame
}
