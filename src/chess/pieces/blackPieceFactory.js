import { createFactory } from "./pieceFactory";

const factory = createFactory();

factory._getRook = function () {
    return 'BR';
}

factory._getHorse = function () {
    return 'BH';
}

factory._getBishop = function () {
    return 'BB';
}

factory._getQueen = function () {
    return 'BQ';
}

factory._getKing = function () {
    return 'BK';
}

factory._getPawn = function () {
    return 'BP';
}
