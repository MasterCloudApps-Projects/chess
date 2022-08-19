import { createFactory } from "./pieceFactory";

const factory = createFactory();

factory._getRook = function () {
    return 'WR';
}

factory._getHorse = function () {
    return 'WH';
}

factory._getBishop = function () {
    return 'WB';
}

factory._getQueen = function () {
    return 'WQ';
}

factory._getKing = function () {
    return 'WK';
}

factory._getPawn = function () {
    return 'WP';
}
