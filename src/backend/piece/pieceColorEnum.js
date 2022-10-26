function createColor(abbreviation, literal) {
    function getAbbreviation() {
        return abbreviation;
    }

    function getLiteral() {
        return literal;
    }

    function getOppositeColor() {
        if (isWhite())
            return PieceColorEnum.Black;
        return PieceColorEnum.White;
    }

    function isWhite() {
        return isSameColor(PieceColorEnum.White);
    }

    function isEmpty() {
        return isSameColor(PieceColorEnum.Empty);
    }

    function isSameColor(color) {
        return literal === color.getLiteral();
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
