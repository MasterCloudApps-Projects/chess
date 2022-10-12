function createCoordinate(){

    let columns = "abcdefgh";
    let rows = "12345678";
    let position;

    function setPosition(newPosition) {
        position = newPosition;
    }

    function getPosition() {
        return position;
    }

    function getColumn(coordinate) {
        return coordinate.slice(0, 1);
    }

    function getRow(coordinate) {
        return coordinate.slice(1, 2);
    }

    function nextRow(coordinate, direction){
        let index = parseInt(getRow(coordinate)) + direction;
        return (index > 0  && index <= rows.length) ? getColumn(coordinate) + index : coordinate;
    }

    function nextColumn(coordinate, direction){
        let index = columns.indexOf(getColumn(coordinate)) + direction;
        return (index >= 0 && index < columns.length) ? columns[index] + getRow(coordinate) : coordinate;
    }

    function nextDiagonal(coordinate, rowDirection, columnDirection) {
        return validDiagonal(coordinate, nextRow(coordinate, + rowDirection), nextColumn(coordinate, + columnDirection));
    }

    function validDiagonal(coordinate, newRow, newColumn) {
        return (coordinate === newRow || coordinate === newColumn) ? coordinate : getColumn(newColumn) + getRow(newRow);
    }

    return {
        setPosition,
        getPosition,
        getRow,
        nextRow,
        nextColumn,
        nextDiagonal
    }
}

export {
    createCoordinate
}
