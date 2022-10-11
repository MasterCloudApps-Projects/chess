function createColor(abbreviation, literal) {
    function getAbbreviation() {
        return abbreviation;
    }

    function getLiteral() {
        return literal;
    }

    function getOppositeColor() {
        if (this.isWhite())
            return PieceColorEnum.Black;
        return PieceColorEnum.White;
    }

    function isWhite() {
        return this === PieceColorEnum.White;
    }

    function isEmpty() {
        return this === PieceColorEnum.Empty;
    }

    return {
        getAbbreviation,
        getLiteral,
        getOppositeColor,
        isWhite,
        isEmpty
    };
}

const PieceColorEnum = Object.freeze({
    White: createColor("W", "white"),
    Black: createColor("B", "black"),
    Empty: createColor("", "empty"),
});

export { PieceColorEnum };
