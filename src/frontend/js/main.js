function getBackendURL(endpoint = '') {
    return 'http://localhost:3000' + endpoint;
}

function initializeGameManagement() {
    let movementOriginTemp;
    let gameUUID;
    let temporalSelectionColor = '#CDFAFA';

    function initializeGame() {
        gameUUID = crypto.randomUUID()
        $.ajax({
            url: getBackendURL('/game'),
            method: 'POST',
            data: JSON.stringify({
                gameUUID: gameUUID
            }),
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                console.log('Game successfully initialized');
                paintBoardOnHTML(data);
            },
            error: (err) => {
                console.log('Error initializing game, trying again...');
                gameUUID = undefined;
                setTimeout(() => {initializeGame()}, 1500);
            }
        });
    }

    function getGameUUID() {
        return gameUUID;
    }

    function selectPositionForMovement(positionId) {
        if (gameUUID === undefined)
            return;
        if (movementOriginTemp === undefined) {
            movementOriginTemp = positionId;
            paintSelectedBoardTile(temporalSelectionColor, positionId);
            return;
        }
        removeBoardTilePaint(movementOriginTemp);

        $.ajax({
            url: getBackendURL('/move'),
            method: 'POST',
            data: JSON.stringify({
                gameUUID: gameUUID,
                movementOrigin: movementOriginTemp,
                movementDestination: positionId
            }),
            contentType: 'application/json; charset=utf-8',
            success: (newBoardData) => {
                movementOriginTemp = undefined;
                paintBoardOnHTML(newBoardData);
                paintErrorsOnHTML([]);
            },
            error: (err) => {
                // Movement wasn't valid (moving empty cell, a not owned piece, other cases)
                // TODO: Show error on HTML
                console.log(err.responseJSON);
                movementOriginTemp = undefined;
                paintErrorsOnHTML([err.responseJSON.errorMessage]);
            }
        });
    };

    function undo(){
        if (gameUUID === undefined)
            return;
        $.ajax({
            url: getBackendURL('/undo'),
            method: 'POST',
            data: JSON.stringify({
                gameUUID: gameUUID
            }),
            contentType: 'application/json; charset=utf-8',
            success: (newBoardData) => {
                paintBoardOnHTML(newBoardData);
                paintErrorsOnHTML([]);
            },
            error: (err) => {
                console.log(err.responseJSON);
                paintErrorsOnHTML(err.responseJSON);
            }
        });
    };

    function redo(){
        if (gameUUID === undefined)
            return;
        $.ajax({
            url: getBackendURL('/redo'),
            method: 'POST',
            data: JSON.stringify({
                gameUUID: gameUUID
            }),
            contentType: 'application/json; charset=utf-8',
            success: (newBoardData) => {
                paintBoardOnHTML(newBoardData);
                paintErrorsOnHTML([]);
            },
            error: (err) => {
                console.log(err.responseJSON);
                paintErrorsOnHTML(err.responseJSON);
            }
        });
    };

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
            if (boardData[currentID] != '_')
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
