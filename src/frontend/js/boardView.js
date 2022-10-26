const boardView = createBoardView();

function createBoardView() {
    let pieces;

    function setPieces(piecesParam) {
        pieces = piecesParam;
        paintBoardOnHTML();
    }

    function paintBoardOnHTML() {
        for(const prop in pieces){
            if(pieces[prop] === "_"){
                document.getElementById(prop).innerHTML = "";
                continue;
            }
            document.getElementById(prop).innerHTML = "<img class='piece' src='./icons/" + pieces[prop] + ".png' />";
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

    return {
        setPieces,
        paintBoardOnHTML,
        paintSelectedBoardTile,
        removeBoardTilePaint,
        paintErrorsOnHTML,
        updateUndoRedoDisplay
    }
}

export {
    boardView
}
