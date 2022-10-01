const pieceTypes = {
    white :{
        abbreviate : 'W',
        name: 'white'
    },
    black :{
        abbreviate : 'B',
        name: 'black'
    },
    empty: {
        abbreviate: '',
        name: 'empty'
    }
}

function getOppositeColor(color) {
    if (color === pieceTypes.black.name)
        return pieceTypes.white.name
    return pieceTypes.black.name;
}

export {
    pieceTypes, getOppositeColor
}
