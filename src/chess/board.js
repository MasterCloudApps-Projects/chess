function addBoardFunctionality(board) {
    board.performMovement = performMovement;
    return board;
}

function performMovement(movementOrigin, movementDestination) {
    let oldPiece = this.pieces[movementDestination];
    this.pieces[movementDestination] = this.pieces[movementOrigin];
    this.pieces[movementOrigin] = oldPiece;

    return this.pieces;
}

export {
    addBoardFunctionality
}
