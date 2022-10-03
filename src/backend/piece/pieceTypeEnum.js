function createColor(abbreviation, literal) {
    function getAbbreviation() {
        return abbreviation;
    }

    function getLiteral() {
        return literal;
    }

    function getOppositeColor() {
        if (abbreviation === PieceTypeEnum.Black.getAbbreviation())
            return PieceTypeEnum.White
        return PieceTypeEnum.Black;
    }

    return {
        getAbbreviation,
        getLiteral,
        getOppositeColor
    }
}

const PieceTypeEnum = {
    White : createColor('W', 'white'),
    Black : createColor('B', 'black'),
    Empty: createColor('', 'empty')
}

PieceTypeEnum.valueOf = function (color) {
    if (color === PieceTypeEnum.White.name)
        return PieceTypeEnum.White
    if (color === PieceTypeEnum.Black.name)
        return PieceTypeEnum.Black
    return PieceTypeEnum.Empty
}

export {
    PieceTypeEnum
}
