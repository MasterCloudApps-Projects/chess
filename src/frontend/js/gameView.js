import { boardView } from './boardView.js';
import { turn } from './turn.js';
import { http } from './restClient.js';

function createGameView() {
    let movementOriginTemp;
    let gameUUID;
    let temporalSelectionColor = '#CDFAFA';

    async function initializeGame() {
        gameUUID = crypto.randomUUID();
        const resMsg = await http('/game', 'POST', {gameUUID: gameUUID});
        if(resMsg.error){
            console.log('Error initializing game, trying again...');
            gameUUID = undefined;
            setTimeout(() => {initializeGame()}, 1500);
        }
        else{
            console.log('Game successfully initialized');
            boardView.setPieces(resMsg.data);
        }
        updateUndoRedo();
    }

    function getGameUUID() {
        return gameUUID;
    }

    async function selectPositionForMovement(positionId) {
        if (gameUUID === undefined)
            return;
        if (movementOriginTemp === undefined) {
            movementOriginTemp = positionId;
            boardView.paintSelectedBoardTile(temporalSelectionColor, positionId);
            return;
        }
        boardView.removeBoardTilePaint(movementOriginTemp);
        const resMsg = await http('/move', 'POST', {
            gameUUID: gameUUID,
            movementOrigin: movementOriginTemp,
            movementDestination: positionId
        });
        if(resMsg.error){
            console.log(resMsg.errorMessage);
            boardView.paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            boardView.setPieces(resMsg.data);
            boardView.paintErrorsOnHTML([]);
            turn.next();
        }
        movementOriginTemp = undefined;
        updateUndoRedo();
        return resMsg.error;
    };

    async function undo(){
        if (gameUUID === undefined)
            return;
        const resMsg = await http('/undo', 'POST', {
            gameUUID: gameUUID
        });
        if(resMsg.error){
                console.log(resMsg.errorMessage);
                boardView.paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            boardView.setPieces(resMsg.data);
            boardView.paintErrorsOnHTML([]);
        }
        updateUndoRedo();
    };

    async function redo(){
        if (gameUUID === undefined)
            return;
        const resMsg = await http('/redo', 'POST', {
            gameUUID: gameUUID
        });
        if(resMsg.error){
                console.log(resMsg.errorMessage);
                boardView.paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            boardView.setPieces(resMsg.data);
            boardView.paintErrorsOnHTML([]);
        }
        updateUndoRedo();
    };

    async function updateUndoRedo(){
        if (gameUUID === undefined)
            return;
        const resMsg = await http('/undoableRedoable', 'POST', {
            gameUUID: gameUUID
        });
        if(resMsg.error){
                console.log(resMsg.errorMessage);
                boardView.paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            boardView.updateUndoRedoDisplay(resMsg.data.isUndoable, resMsg.data.isRedoable);
        }
    }

    return {
        initializeGame,
        getGameUUID,
        selectPositionForMovement,
        undo,
        redo
    };
}

export {
    createGameView
}
