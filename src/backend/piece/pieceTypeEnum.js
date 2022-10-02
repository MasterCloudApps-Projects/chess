const PieceTypeEnum = {
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
    if (color === PieceTypeEnum.black)
        return PieceTypeEnum.white
    return PieceTypeEnum.black;
}

function valueOf(color){
    if(color == PieceTypeEnum.white.name)
        return PieceTypeEnum.white
    else if (color == PieceTypeEnum.black.name)
        return PieceTypeEnum.black
    return PieceTypeEnum.empty
}

export {
    PieceTypeEnum, getOppositeColor, valueOf
}
