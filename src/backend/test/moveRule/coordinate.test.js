import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';

let coordinate;
let maxTopLeftCoordinate;
let maxTopRightCoordinate;
let minBottonLeftCoordinate;
let minBottonRightCoordinate;

beforeEach(() => {
    coordinate = createCoordinate(5, 4);
    maxTopLeftCoordinate = createCoordinate(8, 1);
    maxTopRightCoordinate = createCoordinate(8, 8);
    minBottonLeftCoordinate = createCoordinate(1, 1);
    minBottonRightCoordinate = createCoordinate(1, 8);
});

describe('Access / modification', () => {
    test('Set Position Test', () => {
        coordinate.setPosition('a3')
        expect(coordinate.getPosition()).toBe('a3');
    });

    test('Get Position Test', () => {
        expect(coordinate.getPosition()).toBe('d5');
    });

    test('Get Position for Limit values Test', () => {
        expect(maxTopLeftCoordinate.getPosition()).toBe('a8');
        expect(maxTopRightCoordinate.getPosition()).toBe('h8');
        expect(minBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(minBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Position for Values of Bounds Test', () => {
        let higherTopCoordinate= createCoordinate(9, 1);
        let lessBottonCoordinate= createCoordinate(0, 1);
        let higherRightCoordinate= createCoordinate(1, 9);
        let lessRightCoordinate= createCoordinate(1, 0);
        expect(higherTopCoordinate.getPosition()).toBe(undefined);
        expect(lessBottonCoordinate.getPosition()).toBe(undefined);
        expect(higherRightCoordinate.getPosition()).toBe(undefined);
        expect(lessRightCoordinate.getPosition()).toBe(undefined);
    });

    test('Get Column Test', () => {
        expect(coordinate.getColumn()).toBe(4);
    });

    test('Get Row Test', () => {
        expect(coordinate.getRow()).toBe('5');
    });

    test('Get Column Letter', () => {
        expect(coordinate.getColumnLetter()).toBe('d');
    });
});

describe('Calculation of the next coordinate', () => {
    test('Get Next Coordinate North Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTH);
        expect(nextCoordinate.getPosition()).toBe('d6');
        expect(nextCoordinate.getRow()).toBe('6');
    });

    test('Get Next Coordinate North Max Value Test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.NORTH);
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.NORTH);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get Next Coordinate South Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextCoordinate.getPosition()).toBe('d4');
        expect(nextCoordinate.getRow()).toBe('4');
    });

    test('Get Next Coordinate South Min Value Test', () => {
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate East Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.EAST);
        expect(nextCoordinate.getPosition()).toBe('e5');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get Next Coordinate East Limit Value Test', () => {
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.EAST);
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.EAST);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate West Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.WEST);
        expect(nextCoordinate.getPosition()).toBe('c5');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get Next Coordinate West Limit Value Test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.WEST);
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.WEST);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });

    test('Get Next Coordinate Northeast Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHEAST);
        expect(nextCoordinate.getPosition()).toBe('e6');
        expect(nextCoordinate.getRow()).toBe('6');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get Next Coordinatee Northeast Limit Value Test', () => {
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get Next Coordinatee Northwest Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
        expect(nextCoordinate.getPosition()).toBe('c6');
        expect(nextCoordinate.getRow()).toBe('6');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get Next Coordinatee Northwast Limit Value Test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.NORTH);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
    });

    test('Get Next Coordinate Southeast Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHEAST);
        expect(nextCoordinate.getPosition()).toBe('e4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get Next Coordinate Southeast Limit Value Test', () => {
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.SOUTHEAST);
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get Next Coordinate Southwest Test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHWEST);
        expect(nextCoordinate.getPosition()).toBe('c4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get Next Coordinate Southwest Limit Value Test', () => {
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });
});
