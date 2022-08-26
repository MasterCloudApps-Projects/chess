const columns = "abcdefgh";
const rows = "12345678";

function getRow(coordinate) {
    return coordinate.slice(1, 2);
}

function getColumn(coordinate) {
    return coordinate.slice(0, 1);
}

function incrementRow(coordinate) {
    if (getRow(coordinate) >= rows.length) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) + 1);
}

function incrementColumn(coordinate) {
    if (columns.indexOf(getColumn(coordinate)) >= columns.length-1) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) + 1] + getRow(coordinate).toString();
}

function decreaseRow(coordinate) {
    if (getRow(coordinate) <= 1) return coordinate;
    return getColumn(coordinate) + (parseInt(getRow(coordinate)) - 1);
}

function decreaseColumn(coordinate) {
    if (columns.indexOf(getColumn(coordinate)) <= 0) return coordinate;
    return columns[columns.indexOf(getColumn(coordinate)) - 1] + getRow(coordinate).toString();
}

export {
    columns,
    rows,
    getRow,
    getColumn,
    incrementColumn,
    incrementRow,
    decreaseColumn,
    decreaseRow
}
