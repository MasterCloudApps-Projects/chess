import { randomPlayer }  from '../../main/randomPlayer.js';
import { PieceColorEnum } from '../../piece/pieceColorEnum.js';
import { createBoard } from '../mock/board.js';

let mockBoard = createBoard();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Get Movement', () => {
    test('Get Movement when a player is in check test', () => {
        let movement = { origin: 'a1', destination: 'a2' };
        const isColorOnCheck = jest.spyOn(mockBoard, 'isColorOnCheck').mockReturnValue(true);
        const getValid = jest.spyOn(mockBoard, 'getValidMovementNotCausingCheck').mockReturnValue(movement);
        const getAllSquares = jest.spyOn(mockBoard, 'getAllSquaresOfBlackPieces');
        let result = randomPlayer.getMovement(mockBoard);

        expect(isColorOnCheck).toHaveBeenCalledWith(PieceColorEnum.Black);
        expect(getValid).toHaveBeenCalledWith(PieceColorEnum.Black);
        expect(getAllSquares).not.toBeCalled();
        expect(result).toBe(movement);
    });

    test('Get Movement when a player is not in check test', () => {
        let origins = ['a1', 'b2'];
        let destinations = ['a2', 'a3', 'a4'];
        const isColorOnCheck = jest.spyOn(mockBoard, 'isColorOnCheck').mockReturnValue(false);
        const getAllSquares = jest.spyOn(mockBoard, 'getAllSquaresOfBlackPieces').mockReturnValue(origins);
        const destinationsBoard = jest.spyOn(mockBoard, 'movementsFromTheCoordinate').mockReturnValue(destinations);

        let result = randomPlayer.getMovement(mockBoard);

        expect(isColorOnCheck).toHaveBeenCalledWith(PieceColorEnum.Black);
        expect(getAllSquares).toBeCalled();
        expect(destinationsBoard).toHaveBeenCalledTimes(1);
        expect(origins.includes(result.origin)).toBeTruthy();
        expect(destinations.includes(result.destination)).toBeTruthy();
    });

    test('Get Movement when a player is not in check with two first empty destination', () => {
        let origins = ['a1', 'b2'];
        let destinations = ['a2', 'a3', 'a4'];
        const isColorOnCheck = jest.spyOn(mockBoard, 'isColorOnCheck').mockReturnValue(false);
        const getAllSquares = jest.spyOn(mockBoard, 'getAllSquaresOfBlackPieces').mockReturnValue(origins);
        const destinationsBoard = jest.spyOn(mockBoard, 'movementsFromTheCoordinate')
                                        .mockReturnValueOnce([])
                                        .mockReturnValueOnce(destinations);

        let result = randomPlayer.getMovement(mockBoard);

        expect(isColorOnCheck).toHaveBeenCalledWith(PieceColorEnum.Black);
        expect(getAllSquares).toBeCalled();
        expect(destinationsBoard).toHaveBeenCalledTimes(2);
        expect(origins.includes(result.origin)).toBeTruthy();
        expect(destinations.includes(result.destination)).toBeTruthy();
    });
});
