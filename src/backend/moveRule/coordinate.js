function createCoordinate(rowIndex, columnIndex) {
    let rowTotal = 8;
    let columns = "abcdefgh";
    let position = initPosition(rowIndex, columnIndex);

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

    function initPosition(row, column){
        if(row && row > 0 && row <= rowTotal && column && column > 0 && column <= columns.length)
            return columns[columnIndex-1] + rowIndex;
    }
    
    return {
        setPosition,
        getPosition,
        getColumn,
        getColumnLetter,
        getRow,
        getNextCoordinate
    }
}

export {
    createCoordinate
}
