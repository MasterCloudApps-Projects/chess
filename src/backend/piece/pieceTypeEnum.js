function createColor(abbreviation, literal) {
    function getAbbreviation() {
        return abbreviation;
    }

    function getLiteral() {
        return literal;
    }

    function getOppositeColor() {
        if (abbreviation === PieceTypeEnum.Black.getAbbreviation())
            return PieceTypeEnum.White;
        return PieceTypeEnum.Black;
    }

    return {
        getAbbreviation,
        getLiteral,
        getOppositeColor,
    };
}

const PieceTypeEnum = Object.freeze({
    White: createColor("W", "white"),
    Black: createColor("B", "black"),
    Empty: createColor("", "empty"),
});

export { PieceTypeEnum };
