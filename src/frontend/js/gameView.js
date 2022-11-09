import { boardView } from './boardView.js';
import { turn } from './turn.js';
import { restClient } from './restClient.js';

function createGameView() {
    let movementOriginTemp;
    let gameUUID;
    let temporalSelectionColor = '#CDFAFA';
    let status;

    async function initializeGame() {
        gameUUID = crypto.randomUUID();
        const resMsg = await restClient.http('', 'POST', {gameUUID: gameUUID});
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
        const error = await move(movementOriginTemp, positionId);
        movementOriginTemp = undefined;
        if(error !== undefined) {
            return;
        }
        await updateStatus();
        updateUndoRedo();
        turn.next();
    };

    async function move(origin, destination) {
        const resMsg = await restClient.http(`/${gameUUID}/move`, 'POST', {
            movementOrigin: origin,
            movementDestination: destination,
            color: turn.get()
        });
        if(resMsg.error){
            console.log(resMsg.errorMessage);
            boardView.paintErrorsOnHTML([resMsg.errorMessage]);
            return resMsg.error;
        }
        boardView.setPieces(resMsg.data);
        boardView.paintErrorsOnHTML([]);
    }

    async function updateStatus() {
        const res = await restClient.http(`/${gameUUID}/status`, 'GET');
        status = res.data.status;
        if (status === "finished") {
            console.log("End game");
            boardView.paintFinishedStatus();
        }
    }

    function getCurrentStatus() {
        return status;
    }

    async function undo(){
        if (gameUUID === undefined)
            return;
        const resMsg = await restClient.http(`/${gameUUID}/undo`, 'POST');
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
        const resMsg = await restClient.http(`/${gameUUID}/redo`, 'POST');
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
        const resMsg = await restClient.http(`/${gameUUID}/undoableRedoable`, 'GET');
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
        getCurrentStatus,
        undo,
        redo
    };
}

export {
    createGameView
}
