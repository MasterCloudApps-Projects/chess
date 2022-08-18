function addBoardFunctionality(board) {
    board.performMovement = performMovement;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    for (let i = 1; i <= 8; i++)
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let currentID = "abcdefgh"[letter] + i.toString();
            this.pieces[currentID] = "WR";
         }
    return this.pieces;
}

export {
    addBoardFunctionality
}
