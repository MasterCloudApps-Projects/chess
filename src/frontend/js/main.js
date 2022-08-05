function getBackendURL(endpoint = '') {
    return 'http://localhost:3000' + endpoint;
}

function selectPositionForMovement(positionId) {
    if (selectPositionForMovement.prototype.movementOrigin === undefined) {
        selectPositionForMovement.prototype.movementOrigin = positionId;
        return;
    }

    $.ajax({
        url: getBackendURL('/move'),
        method: 'POST',
        data: {
            origin: selectPositionForMovement.prototype.movementOrigin,
            destination: positionId
        },
        success: (newBoardData) => {
            selectPositionForMovement.prototype.movementOrigin = undefined;
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
    let letterCells = "abcdefgh";
    for (let i = 1; i <= 8; i++) 
        for (let letter = 0; letter < letterCells.length; letter++) {
            let currentID = letterCells[letter] + i.toString();
            getElementById(currentID).innerHTML = boardData[currentID];
         }
}

function setCellOnClickEvents() {
    $('.cell').each(function(i, cell) {
        cell.onclick = function() { selectPositionForMovement(cell.id) };
    });
}

setCellOnClickEvents();