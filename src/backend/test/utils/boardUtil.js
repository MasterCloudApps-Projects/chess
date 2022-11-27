function boardToArray(board) {
    let pieces = board.getPieces();
    let result = [];
    for (let i=8; i>0; i--){
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let position = "abcdefgh"[letter]+i.toString();
            result.push(pieces[position].getAbbreviation());
        }
    }
    return result;
}

function strLayoutToArray(layout) {
    return layout.substring(1).split('\n').join('-').split('-');
}

export {
    boardToArray,
    strLayoutToArray
}