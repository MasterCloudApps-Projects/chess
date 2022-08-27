const pieceTypes = {
	white: 'white',
	black: 'black',
    empty: 'empty'
}

function getOppositeColor(color) {
    return pieceTypes.black == color ? pieceTypes.white
        : pieceTypes.white == color ? pieceTypes.black
            : pieceTypes.empty;
}

export {
    pieceTypes, getOppositeColor
}
