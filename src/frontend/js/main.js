function getBackendURL(endpoint = '') {
    return 'http://localhost:3000' + endpoint;
}

function initializeGameManagement() {
    let movementOriginTemp;
    let gameUUID;

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
            return;
        }
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
            },
            error: (err) => {
                // Movement wasn't valid (moving empty cell, a not owned piece, other cases)
                // TODO: Show error on HTML
                console.log(err);
            }
        });
    };

    return {
        initializeGame,
        getGameUUID,
        selectPositionForMovement
    };

}

function paintBoardOnHTML(boardData) {
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            document.getElementById(currentID).innerHTML = boardData[currentID];
         }
}

function prepareGameAndClickEvents() {
    let gameManager = initializeGameManagement();
    gameManager.initializeGame();
    $('.cell').each(function(i, cell) {
        cell.onclick = function() { gameManager.selectPositionForMovement(cell.id) };
    });
}

prepareGameAndClickEvents();
