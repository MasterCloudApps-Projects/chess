function getBackendURL(endpoint = '') {
    return 'http://localhost:3000' + endpoint;
}

let movementOriginTemp;

function selectPositionForMovement(positionId) {
    if (movementOriginTemp === undefined) {
        movementOriginTemp = positionId;
        return;
    }
    //TODO: Maybe use a bundler like webpack so que can use axios here
    $.ajax({
        url: getBackendURL('/move'),
        method: 'POST',
        data: JSON.stringify({
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
}

function paintBoardOnHTML(boardData) {
    for (let i = 1; i <= 8; i++) 
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            document.getElementById(currentID).innerHTML = boardData[currentID];
         }
}

function setCellOnClickEvents() {
    $('.cell').each(function(i, cell) {
        cell.onclick = function() { selectPositionForMovement(cell.id) };
    });
}

setCellOnClickEvents();