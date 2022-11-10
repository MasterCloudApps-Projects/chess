import { PieceColorEnum } from "../piece/pieceColorEnum.js";
import { getPiece, piecesBuilder } from "../piece/piecesBuilder.js";

function createBoard() {
    let pieces = {};

    function getPieces() {
        return pieces;
    }

    function setPieces(piecesParam) {
        pieces = piecesParam;
    }

    function tryMove(movementOrigin, movementDestination, playerColor) {
        if (!pieces[movementOrigin].isOfColor(playerColor)) {
            return "Invalid move: Attempting to move a wrong color piece.";
        }
        if (!pieces[movementOrigin].isPossibleMove(movementDestination, pieces)) {
            return getInvalidMovementError(pieces[movementOrigin].getFullName());
        }
        let stateBeforeMoving = createMemento();
        move(movementOrigin, movementDestination);
        if (isColorOnCheck(playerColor)) {
            setMemento(stateBeforeMoving);
            return "Invalid move: cannot end turn on check";
        }
    }

    function move(movementOrigin, movementDestination) {
        pieces[movementDestination] = pieces[movementOrigin];
        pieces[movementDestination].setPosition(movementDestination);
        createEmptyTile(movementOrigin);
    }

    function isStalemate(turnColor) {
        return getValidMovementNotCausingCheck(turnColor) === undefined;
    }

    function isOnCheckMate(playerColor) {
        if (isColorOnCheck(playerColor)) {
            console.log("possible checkmate");
            console.log("is checkmate: " + isColorOnCheckMate(playerColor));
            if (isColorOnCheckMate(playerColor))
                return true;
        }
        return false;
    }

    function isColorOnCheck(color) {
        let attackpos = getAllAttackPositionsByColor(color.getOppositeColor());
        let kingpos = getKingPositionByColor(color);
        return attackpos.has(kingpos);
    }

    function isColorOnCheckMate(color) {
        if (!isColorOnCheck(color)) return false;

        return getValidMovementNotCausingCheck(color) == undefined;
    }

    function getValidMovementNotCausingCheck(color) {
        const previousState = createMemento();
        for (let coord of getAllCoordinatesByColor(color)) {
            for (let mov of movementsFromTheCoordinate(pieces[coord].getPosition())) {
                move(pieces[coord].getPosition(), mov);
                if (!isColorOnCheck(color)) {
                    setMemento(previousState);
                    return { origin: coord, destination: mov };
                }
                setMemento(previousState);
            }
        }
        return undefined;
    }

    function movementsFromTheCoordinate(origin) {
        pieces[origin].updateCurrentPosition(origin, pieces);
        return pieces[origin].getPossibleMovements();
    }

    function getBoardPieceNames() {
        let result = {};
        for (let key in pieces) result[key] = pieces[key].getAbbreviation();

        return result;
    }

    function getAllSquaresOfBlackPieces() {
        return getAllCoordinatesByColor(PieceColorEnum.Black);
    }

    function getAllEmptySquares() {
        return getAllCoordinatesByColor(PieceColorEnum.Empty);
    }

    function getAllCoordinatesByColor(color) {
        const coloredSquares = [];
        for (let coordinate in pieces)
            if (pieces[coordinate].isOfColor(color))
                coloredSquares.push(coordinate);
        return coloredSquares;
    }

    function createMemento() {
        let boardString = "";
        const boardNames = getBoardPieceNames();
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let currentID = "abcdefgh"[letter] + i.toString();
                boardString += boardNames[currentID] + "-";
            }
        return boardString;
    }

    function setMemento(memento) {
        setPieces(piecesBuilder(memento.split("-")).buildFromLayout());
    }

    function getAllAttackPositionsByColor(color) {
        const coordinatesUnderAttack = new Set();
        if (color.isEmpty()) return coordinatesUnderAttack;
        let colorPieces = getAllPiecesByColor(color);
        for (let colorPiece of colorPieces) {
            colorPiece.getAttackPositions(pieces)
                .forEach(coordinate => coordinatesUnderAttack.add(coordinate));
        }
        return coordinatesUnderAttack;
    }

    function getKingPositionByColor(color) {
        return getAllPiecesByColor(color)
            .find((piece) => piece.getAbbreviation() === color.getAbbreviation() + 'K')
            .getPosition();
    }

    function getAllPiecesByColor(color) {
        const coloredPieces = [];
        let allColorCoordinates = getAllCoordinatesByColor(color);
        for (let coloredCoordinate of allColorCoordinates)
            coloredPieces.push(pieces[coloredCoordinate]);
        return coloredPieces;
    }

    function createEmptyTile(coordinate) {
        pieces[coordinate] = getPiece('_', coordinate);
    }

    function getInvalidMovementError(pieceFullName) {
        return "Invalid " + pieceFullName + " movement";
    }

    return {
        tryMove,
        isColorOnCheck,
        getValidMovementNotCausingCheck,
        movementsFromTheCoordinate,
        getBoardPieceNames,
        getAllSquaresOfBlackPieces,
        getAllEmptySquares,
        getAllCoordinatesByColor,
        createMemento,
        setMemento,
        getPieces,
        setPieces,
        isOnCheckMate,
        isStalemate
    };
}

export { createBoard };
