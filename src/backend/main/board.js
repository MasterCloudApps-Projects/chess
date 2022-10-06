import { PieceTypeEnum } from "../piece/pieceTypeEnum.js";
import { PieceNameEnum } from "../piece/pieceNameEnum.js";
import { createBlackFactory } from "../piece/blackPieceFactory.js";
import { createWhiteFactory } from "../piece/whitePieceFactory.js";
import { createFactory } from "../piece/pieceFactory.js";

function createBoard() {
    let pieces = {};
    let checkmate = false;
    let errorMessage;

    function getPieces() {
        return pieces;
    }

    function isCheckMate() {
        return checkmate;
    }
    function tryMove(movementOrigin, movementDestination, playerColor) {
        errorMessage = undefined;
        if (!pieces[movementOrigin].isOfColor(playerColor)) {
            errorMessage =
                "Invalid move: Attempting to move a wrong color piece.";
            return;
        }
        if (
            !pieces[movementOrigin].isPossibleMove(movementDestination, pieces)
        ) {
            errorMessage = getInvalidMovementError(
                pieces[movementOrigin].fullName
            );
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
        pieces[movementDestination].doAfterMovement();
    }

    function updateCheckStatus(playerColor, previousState) {
        if (isColorOnCheck(playerColor)) {
            errorMessage = "Invalid move: cannot end turn on check";
            setMemento(previousState);
            return;
        }
        if (isColorOnCheck(playerColor.getOppositeColor())) {
            console.log("possible checkmate");
            console.log(
                "is checkmate: " +
                    isColorOnCheckMate(playerColor.getOppositeColor())
            );
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
        for (let key in pieces) result[key] = pieces[key].getName();

        return result;
    }

    function getAllSquaresOfBlackPieces() {
        return getAllCoordinatesByColor(PieceTypeEnum.Black);
    }

    function getAllEmptySquares() {
        return getAllCoordinatesByColor(PieceTypeEnum.Empty);
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
        for (let i = 1; i <= 8; i++)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let currentID = "abcdefgh"[letter] + i.toString();
                boardString += boardNames[currentID] + "-";
            }
        return boardString;
    }

    function setMemento(memento) {
        const blackPieceFactory = createBlackFactory();
        const whitePieceFactory = createWhiteFactory();
        memento = memento.split("-");
        let stringCounter = 0;
        for (let i = 1; i <= 8; i++)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                let pieceName = PieceNameEnum[memento[stringCounter].trim()];
                let position = "abcdefgh"[letter] + i.toString();
                let piece =
                    blackPieceFactory[pieceName.getFactoryCall()](position);
                if (pieceName.getColor() === PieceTypeEnum.White)
                    piece =
                        whitePieceFactory[pieceName.getFactoryCall()](position);

                pieces[position] = piece;
                stringCounter++;
            }
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
        if (color === PieceTypeEnum.Empty) return [];
        const coordinatesUnderAttack = [];
        let colorPieces = getAllPiecesByColor(color);
        for (let i in colorPieces)
            coordinatesUnderAttack.push(
                ...colorPieces[i].getAttackPositions(pieces)
            );
        return [...new Set(coordinatesUnderAttack)];
    }

    function getKingPositionByColor(color) {
        let king =
            color === PieceTypeEnum.Black ? PieceNameEnum.BK : PieceNameEnum.WK;
        return getAllPiecesByColor(color)
            .find((piece) => piece.getName() === king.getName())
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
        //TODO: refactor factory
        pieces[coordinate] = createFactory().getEmptyPiece(coordinate);
    }

    function getInvalidMovementError(piece) {
        return "Invalid " + piece + " movement";
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
        isCheckMate,
    };
}

export { createBoard };