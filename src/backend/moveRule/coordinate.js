function createCoordinate(rowIndex, columnIndex) {

    let columns = "abcdefgh";
    let position = columns[columnIndex] +''+ rowIndex;

    function setPosition(newPosition) {
        position = newPosition;
    }

    function getPosition() {
        return position;
    }

    function getColumn() {
        return columns.indexOf(getColumnLetter()) + 1;
    }

    function getRow() {
        return position.slice(1, 2);
    }

    function getColumnLetter() {
        return position.slice(0, 1);
    }

    function getNextCoordinate(direction) {
        let originCoordinate = createCoordinate();
        originCoordinate.setPosition(getPosition());
        return direction.getNextCoordinate(originCoordinate);
    }

    function isValid() {
        return (getRow() >= 1 && getRow() <= 8 && getColumn() >= 1 && getColumn() <= 8);
    }

    return {
        setPosition,
        getPosition,
        getColumn,
        getColumnLetter,
        getRow,
        getNextCoordinate,
        isValid
    }
}

export {
    createCoordinate
}
