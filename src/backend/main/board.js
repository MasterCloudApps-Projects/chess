import { PieceColorEnum } from "../piece/pieceColorEnum.js";
import { PieceBuilderEnum } from "../piece/pieceBuilderEnum.js";
import { piecesBuilder } from "./piecesBuilder.js";

function createBoard() {
    let pieces = {};
    let checkmate = false;
    let errorMessage;

    function getPieces() {
        return pieces;
    }

    function setPieces(piecesParam) {
        pieces = piecesParam;
    }

    function isStalemate(turnColor) {
        const origins = getAllCoordinatesByColor(turnColor);
        for(const origin of origins) {
            const destinations = movementsFromTheCoordinate(origin);
            if(destinations.length > 0) {
                const piece = pieces[origin];
                if(pieceIsKing(piece)) {
                    const previousState = createMemento();
                    for(const destination of destinations) {
                        move(origin, destination);
                        const checkValue = isColorOnCheck(turnColor);
                        setMemento(previousState);
                        if (!checkValue) {
                            return false;
                        }
                    }
                    continue;
                }
                return false;
            }
        }
        console.log("Stalemate");
        return true;
    }

    function pieceIsKing(piece) {
        return piece.getAbbreviation().includes('K');
    }

    function isCheckMate() {
        return checkmate;
    }

    function tryMove(movementOrigin, movementDestination, playerColor) {
        errorMessage = undefined;
        if (!pieces[movementOrigin].isOfColor(playerColor)) {
            errorMessage = "Invalid move: Attempting to move a wrong color piece.";
            return;
        }
        if (!pieces[movementOrigin].isPossibleMove(movementDestination, pieces)) {
            errorMessage = getInvalidMovementError(pieces[movementOrigin].getFullName());
            return;
        }
        let stateBeforeMoving = createMemento();
        move(movementOrigin, movementDestination);
        updateCheckStatus(playerColor, stateBeforeMoving);
    }

    function move(movementOrigin, movementDestination) {
        pieces[movementDestination] = pieces[movementOrigin];
        pieces[movementDestination].setPosition(movementDestination);
        createEmptyTile(movementOrigin);
    }

    function updateCheckStatus(playerColor, previousState) {
        if (isColorOnCheck(playerColor)) {
            errorMessage = "Invalid move: cannot end turn on check";
            setMemento(previousState);
            return;
        }
        if (isColorOnCheck(playerColor.getOppositeColor())) {
            console.log("possible checkmate");
            console.log("is checkmate: " + isColorOnCheckMate(playerColor.getOppositeColor()));
            if (isColorOnCheckMate(playerColor.getOppositeColor()))
                checkmate = true;
        }
    }

    function isColorOnCheck(color) {
        let attackpos = getAllAttackPositionsByColor(color.getOppositeColor());
        let kingpos = getKingPositionByColor(color);
        return attackpos.includes(kingpos);
    }

    function isColorOnCheckMate(color) {
        if (!isColorOnCheck(color)) return false;

        return getValidMovementWhileColorIsOnCheck(color) == undefined;
    }

    function getValidMovementWhileColorIsOnCheck(color) {
        const previousState = createMemento();
        for (let coord of getAllCoordinatesByColor(color)) {
            for (let mov of movementsFromTheCoordinate(
                pieces[coord].getPosition()
            )) {
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
        setPieces(piecesBuilder(memento.split("-")).build());
    }

    function getErrorMessage() {
        let result = errorMessage;
        errorMessage = undefined;
        return result;
    }

    function hasError() {
        return errorMessage !== undefined;
    }

    function getAllAttackPositionsByColor(color) {
        if (color.isEmpty()) return [];
        const coordinatesUnderAttack = [];
        let colorPieces = getAllPiecesByColor(color);
        for (let colorPiece of colorPieces) {
            coordinatesUnderAttack.push(...colorPiece.getAttackPositions(pieces));
        }
        return [...new Set(coordinatesUnderAttack)];
    }

    function getKingPositionByColor(color) {
        return getAllPiecesByColor(color)
            .find((piece) => piece.getAbbreviation() === color.getAbbreviation() + 'K')
            .getPosition();
    }

    function getAllPiecesByColor(color) {
        const coloredPieces = [];
        let allColorCoordinates = getAllCoordinatesByColor(color);
        for (let i in allColorCoordinates)
            coloredPieces.push(pieces[allColorCoordinates[i]]);
        return coloredPieces;
    }

    function createEmptyTile(coordinate) {
        pieces[coordinate] = PieceBuilderEnum._.buildPiece(coordinate);
    }

    function getInvalidMovementError(pieceFullName) {
        return "Invalid " + pieceFullName + " movement";
    }

    return {
        tryMove,
        isColorOnCheck,
        getValidMovementWhileColorIsOnCheck,
        movementsFromTheCoordinate,
        getBoardPieceNames,
        getAllSquaresOfBlackPieces,
        getAllEmptySquares,
        getAllCoordinatesByColor,
        createMemento,
        setMemento,
        getErrorMessage,
        hasError,
        getPieces,
        setPieces,
        isCheckMate,
        isStalemate
    };
}

export { createBoard };
