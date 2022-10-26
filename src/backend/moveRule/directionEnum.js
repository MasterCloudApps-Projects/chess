import { createCoordinate } from "./coordinate.js";

function createDirection(row, column) {

    function getRow() {
        return row;
    }

    function getColumn() {
        return column;
    }

    function getNextCoordinate(originCoordinate) {
        let newRow = parseInt(originCoordinate.getRow()) + parseInt(row);
        let newColumn = parseInt(originCoordinate.getColumn()) + parseInt(column);
        let newCoordinate = createCoordinate( newRow, newColumn );
        return newCoordinate.isValid() ? newCoordinate : originCoordinate;
    }

    return {
        getRow,
        getColumn,
        getNextCoordinate
    };
}

const DirectionEnum = Object.freeze({
    NORTH : createDirection(1, 0),
    SOUTH : createDirection(-1, 0),
    EAST : createDirection(0, 1),
    WEST : createDirection(0, -1),
    NORTHEAST_DIAGONAL: createDirection(1, 1),
    NORTHWEST_DIAGONAL: createDirection(1, -1),
    SOUTHEAST_DIAGONAL: createDirection(-1, 1),
    SOUTHWEST_DIAGONAL: createDirection(-1, -1),
});

export { DirectionEnum };
