function createOrginalPoint(rowP, columnP) {
    let row = rowP;
    let column = columnP;

    function getRow() {
        return row;
    }

    function getColumn() {
        return column;
    }

    function isDiagonal(){
        return row != 0 && column !=0;
    }

    function isColumn(){
        return column != 0;
    }
    return {
        getRow,
        getColumn,
        isDiagonal,
        isColumn
    };
}

const DirectionEnum = Object.freeze({
    north: createOrginalPoint(+1, 0),
    south: createOrginalPoint(-1, 0),
    east: createOrginalPoint(0, +1),
    west: createOrginalPoint(0, -1),
    northEast: createOrginalPoint(+1, +1),
    northWest: createOrginalPoint(+1, -1),
    southEast: createOrginalPoint(-1, +1),
    southWest: createOrginalPoint(-1, -1)
});

export { DirectionEnum };
