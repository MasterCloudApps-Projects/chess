import { http } from './restClient.js';

function initializeGameManagement() {
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
            paintBoardOnHTML(resMsg.data);
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
            paintSelectedBoardTile(temporalSelectionColor, positionId);
            return;
        }
        removeBoardTilePaint(movementOriginTemp);
        const resMsg = await http('/move', 'POST', {
            gameUUID: gameUUID,
            movementOrigin: movementOriginTemp,
            movementDestination: positionId
        });
        if(resMsg.error){
                console.log(resMsg.errorMessage);
                paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            paintBoardOnHTML(resMsg.data);
            paintErrorsOnHTML([]);
        }
        movementOriginTemp = undefined;
        updateUndoRedo();
    };

    async function undo(){
        if (gameUUID === undefined)
            return;
        const resMsg = await http('/undo', 'POST', {
            gameUUID: gameUUID
        });
        if(resMsg.error){
                console.log(resMsg.errorMessage);
                paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            paintBoardOnHTML(resMsg.data);
            paintErrorsOnHTML([]);
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
                paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            paintBoardOnHTML(resMsg.data);
            paintErrorsOnHTML([]);
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
                paintErrorsOnHTML([resMsg.errorMessage]);
        }
        else{
            updateUndoRedoDisplay(resMsg.data.isUndoable, resMsg.data.isRedoable);
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

function paintBoardOnHTML(boardData) {
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            document.getElementById(currentID).innerHTML = "";
            if (boardData[currentID] !== '_')
                document.getElementById(currentID).innerHTML = "<img class='piece' src='./icons/" + boardData[currentID] + ".png' />";
         }
}

function paintSelectedBoardTile(color, tileID) {
    document.getElementById(tileID).style = 'background-color: ' + color + ' !important;';
}

function removeBoardTilePaint(tileID) {
    document.getElementById(tileID).style = '';
}

function paintErrorsOnHTML(errorArray) {
    let errorHTML = '';
    for (let i in errorArray) {
        errorHTML += "<span class='errorMessage'>" + errorArray[i] + "</span><br>";
    }
    document.getElementById('errorMessages').innerHTML = errorHTML;
}

function updateUndoRedoDisplay(undo, redo){
    document.querySelector('.undo').style.visibility = undo ? 'visible' : 'hidden';
    document.querySelector('.redo').style.visibility = redo ? 'visible' : 'hidden';
}

function prepareGameAndClickEvents() {
    let gameManager = initializeGameManagement();
    gameManager.initializeGame();
    $('.cell').each(function(i, cell) {
        cell.onclick = function() { gameManager.selectPositionForMovement(cell.id) };
    });
    $('.undo').each(function(i, btn){
        btn.onclick = function(){
            gameManager.undo();
        }
    });
    $('.redo').each(function(i, btn){
        btn.onclick = function(){
            gameManager.redo();
        }
    });
}

prepareGameAndClickEvents();
