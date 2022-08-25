const columns = "abcdefgh";

const rows = "12345678";

function getRow(coordinate) {
    return coordinate.slice(1, 2);
}

function getColumn(coordinate) {
    return coordinate.slice(0, 1);
}

export {
    columns, rows, getRow, getColumn
}
