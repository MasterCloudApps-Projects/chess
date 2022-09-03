const pieceTypes = {
	white: 'white',
	black: 'black',
    empty: 'empty'
}

function getOppositeColor(color) {
    if (color === pieceTypes.black)
        return pieceTypes.white
    return pieceTypes.black;
}

export {
    pieceTypes, getOppositeColor
}
