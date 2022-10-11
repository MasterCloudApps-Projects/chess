function createColor(abbreviation, literal) {
    function getAbbreviation() {
        return abbreviation;
    }

    function getLiteral() {
        return literal;
    }

    function getOppositeColor() {
        if (abbreviation === PieceColorEnum.Black.getAbbreviation())
            return PieceColorEnum.White;
        return PieceColorEnum.Black;
    }

    return {
        getAbbreviation,
        getLiteral,
        getOppositeColor,
    };
}

const PieceColorEnum = Object.freeze({
    White: createColor("W", "white"),
    Black: createColor("B", "black"),
    Empty: createColor("", "empty"),
});

export { PieceColorEnum };
