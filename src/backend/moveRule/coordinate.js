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

    function nextSquare(origin, direction){
        if(direction.isDiagonal())
            return nextDiagonal(origin, direction);
        return nextHorizontal(origin, direction.getRow(), direction.getColumn())
    }

    function nextHorizontal(origin, directionRow, directionColumn){
        let newRow = parseInt(getRow(origin)) + directionRow;
        let newColumn = columns.indexOf(getColumn(origin)) + directionColumn;
        if((newRow > 0  && newRow <= rows.length) && (newColumn >= 0 && newColumn < columns.length))
            return columns[newColumn] + newRow;
        return origin;
    }

    function nextDiagonal(origin, direction) {
        let nextRow = nextHorizontal(origin, direction.getRow(), 0);
        let nextColumn = nextHorizontal(origin, 0, direction.getColumn());
        return getValidDiagonal(origin, nextRow, nextColumn);
    }

    function getValidDiagonal(origin, newRow, newColumn) {
        return (origin === newRow || origin === newColumn) ? origin : getColumn(newColumn) + getRow(newRow);
    }

    return {
        setPosition,
        getPosition,
        getRow,
        nextSquare
    }
}

export {
    createCoordinate
}
