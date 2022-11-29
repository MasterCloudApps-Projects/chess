import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum.js';

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
    test('Get next Coordinate north test', () => {
        let nextCoordinate = DirectionEnum.NORTH.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('b4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(2);
    });

    test('Get next coordinate north higher value test', () => {
        let nextTopLeftCoordinate = DirectionEnum.NORTH.getNextCoordinate(maxTopLeftCoordinate);
        let nextTopRightCoordinate = DirectionEnum.NORTH.getNextCoordinate(maxTopRightCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get next coordinate south test', () => {
        let nextCoordinate = DirectionEnum.SOUTH.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('b2');
        expect(nextCoordinate.getRow()).toBe('2');
        expect(nextCoordinate.getColumn()).toBe(2);
    });

    test('Get next coordinate south lower value test', () => {
        let nextMinBottonLeftCoordinate = DirectionEnum.SOUTH.getNextCoordinate(minBottonLeftCoordinate);
        let nextMinBottonRightCoordinate = DirectionEnum.SOUTH.getNextCoordinate(minBottonRightCoordinate);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate east test', () => {
        let nextCoordinate = DirectionEnum.EAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c3');
        expect(nextCoordinate.getRow()).toBe('3');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate east limit values', () => {
        let nextTopRightCoordinate = DirectionEnum.EAST.getNextCoordinate(maxTopRightCoordinate);
        let nextMinBottonRightCoordinate = DirectionEnum.EAST.getNextCoordinate(minBottonRightCoordinate);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate West test', () => {
        let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a3');
        expect(nextCoordinate.getRow()).toBe('3');
        expect(nextCoordinate.getColumn()).toBe(1);
    });

    test('Get next coordinate West limit value test', () => {
        let nextTopLeftCoordinate =  DirectionEnum.WEST.getNextCoordinate(maxTopLeftCoordinate);
        let nextMinBottonLeftCoordinate = DirectionEnum.WEST.getNextCoordinate(minBottonLeftCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });

    test('Get next coordinate northeast test', () => {
        let nextCoordinate = DirectionEnum.NORTHEAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate northeast higher value test', () => {
        let nextTopRightCoordinate =  DirectionEnum.NORTHEAST.getNextCoordinate(maxTopRightCoordinate);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get next coordinate northwest test', () => {
        let nextCoordinate = DirectionEnum.NORTHWEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(1);
    });

    test('Get next coordinate northwest higher value test', () => {
        let nextTopLeftCoordinate =  DirectionEnum.NORTHWEST.getNextCoordinate(maxTopLeftCoordinate);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
    });

    test('Get next coordinate southeast test', () => {
        let nextCoordinate = DirectionEnum.SOUTHEAST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('c2');
        expect(nextCoordinate.getRow()).toBe('2');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate southeast limit value test', () => {
        let nextMinBottonRightCoordinate =  DirectionEnum.SOUTHEAST.getNextCoordinate(minBottonRightCoordinate);
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate southwest test', () => {
        let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
        expect(nextCoordinate.getPosition()).toBe('a3');
        expect(nextCoordinate.getRow()).toBe('3');
        expect(nextCoordinate.getColumn()).toBe(1);
    });

    test('Get next coordinate southwest limit value test', () => {
        let nextMinBottonLeftCoordinate = DirectionEnum.WEST.getNextCoordinate(minBottonLeftCoordinate);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });
});

