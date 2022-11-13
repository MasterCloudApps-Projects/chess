import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';

let originCoordinate;
let maxTopLeftCoordinate;
let maxTopRightCoordinate;
let minBottonLeftCoordinate;
let minBottonRightCoordinate;

beforeEach(() => {
    originCoordinate = createCoordinate(3, 2);
    maxTopLeftCoordinate = createCoordinate(8, 1);
    maxTopRightCoordinate = createCoordinate(8, 8);
    minBottonLeftCoordinate = createCoordinate(1, 1);
    minBottonRightCoordinate = createCoordinate(1, 8);
});

describe('Calculation of the next coordinate', () => {
    test('Get Next Coordinate North Test', () => {
        let nextCoordinate = DirectionEnum.NORTH.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('b4');
    });

    test('Get Next Coordinate North Higher Value Test', () => {
        let nextTopLeftCoordinate = DirectionEnum.NORTH.getNextCoordinate(maxTopLeftCoordinate);
        let nextTopRightCoordinate = DirectionEnum.NORTH.getNextCoordinate(maxTopRightCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get Next Coordinate South Test', () => {
        let nextCoordinate = DirectionEnum.SOUTH.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('b2');
    });

    test('Get Next Coordinate South Lower Value Test', () => {
        let nextMinBottonLeftCoordinate = DirectionEnum.SOUTH.getNextCoordinate(minBottonLeftCoordinate);
        let nextMinBottonRightCoordinate = DirectionEnum.SOUTH.getNextCoordinate(minBottonRightCoordinate);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate East Test', () => {
        let nextCoordinate = DirectionEnum.EAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c3');
    });

    test('Get Next Coordinate East Limit Values', () => {
        let nextTopRightCoordinate = DirectionEnum.EAST.getNextCoordinate(maxTopRightCoordinate);
        let nextMinBottonRightCoordinate = DirectionEnum.EAST.getNextCoordinate(minBottonRightCoordinate);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate West Test', () => {
        let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a3');
    });

    test('Get Next Coordinate West Limit Value Test', () => {
        let nextTopLeftCoordinate =  DirectionEnum.WEST.getNextCoordinate(maxTopLeftCoordinate);
        let nextMinBottonLeftCoordinate = DirectionEnum.WEST.getNextCoordinate(minBottonLeftCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });

    test('Get Next Coordinate Northeast Test', () => {
        let nextCoordinate = DirectionEnum.NORTHEAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c4');
    });

    test('Get Next Coordinate Northeast Higher Value Test', () => {
        let nextTopRightCoordinate =  DirectionEnum.NORTHEAST.getNextCoordinate(maxTopRightCoordinate);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get Next Coordinate Northwest Test', () => {
        let nextCoordinate = DirectionEnum.NORTHWEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a4');
    });

    test('Get Next Coordinate Northwest Higher Value Test', () => {
        let nextTopLeftCoordinate =  DirectionEnum.NORTHWEST.getNextCoordinate(maxTopLeftCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
    });

    test('Get Next Coordinate Southeast Test', () => {
        let nextCoordinate = DirectionEnum.SOUTHEAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c2');
    });

    test('Get Next Coordinate Southeast Limit Value Test', () => {
        let nextMinBottonRightCoordinate =  DirectionEnum.SOUTHEAST.getNextCoordinate(minBottonRightCoordinate);
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate Southwest Test', () => {
        let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a3');
    });

    test('Get Next Coordinate Southwest Limit Value Test', () => {
        let nextMinBottonLeftCoordinate = DirectionEnum.WEST.getNextCoordinate(minBottonLeftCoordinate);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });
});

