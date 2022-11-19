import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum.js';

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
    test('Update position test', () => {
        coordinate.setPosition('a3')
        expect(coordinate.getPosition()).toBe('a3');
    });

    test('Get position test', () => {
        expect(coordinate.getPosition()).toBe('d5');
    });

    test('Get position for limit values test', () => {
        expect(maxTopLeftCoordinate.getPosition()).toBe('a8');
        expect(maxTopRightCoordinate.getPosition()).toBe('h8');
        expect(minBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(minBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get position for values of bounds test', () => {
        let higherTopCoordinate= createCoordinate(9, 1);
        let lessBottonCoordinate= createCoordinate(0, 1);
        let higherRightCoordinate= createCoordinate(1, 9);
        let lessRightCoordinate= createCoordinate(1, 0);
        expect(higherTopCoordinate.getPosition()).toBe(undefined);
        expect(lessBottonCoordinate.getPosition()).toBe(undefined);
        expect(higherRightCoordinate.getPosition()).toBe(undefined);
        expect(lessRightCoordinate.getPosition()).toBe(undefined);
    });

    test('Get column test', () => {
        expect(coordinate.getColumn()).toBe(4);
    });

    test('Get row test', () => {
        expect(coordinate.getRow()).toBe('5');
    });

    test('Get column letter', () => {
        expect(coordinate.getColumnLetter()).toBe('d');
    });
});

describe('Calculation of the next coordinate', () => {
    test('Get next coordinate north test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTH);
        expect(nextCoordinate.getPosition()).toBe('d6');
        expect(nextCoordinate.getRow()).toBe('6');
    });

    test('Get next coordinate north max value test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.NORTH);
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.NORTH);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get next coordinate south test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextCoordinate.getPosition()).toBe('d4');
        expect(nextCoordinate.getRow()).toBe('4');
    });

    test('Get next coordinate south min value test', () => {
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate east test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.EAST);
        expect(nextCoordinate.getPosition()).toBe('e5');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get next coordinate east limit value test', () => {
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.EAST);
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.EAST);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate west test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.WEST);
        expect(nextCoordinate.getPosition()).toBe('c5');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate west limit value test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.WEST);
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.WEST);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });

    test('Get next coordinate northeast test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHEAST);
        expect(nextCoordinate.getPosition()).toBe('e6');
        expect(nextCoordinate.getRow()).toBe('6');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get next coordinatee northeast limit value test', () => {
        let nextTopRightCoordinate = maxTopRightCoordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
        expect(nextTopRightCoordinate.getPosition()).toBe('h8');
    });

    test('Get next coordinatee northwest test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
        expect(nextCoordinate.getPosition()).toBe('c6');
        expect(nextCoordinate.getRow()).toBe('6');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate northweast limit value test', () => {
        let nextTopLeftCoordinate = maxTopLeftCoordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
        expect(nextTopLeftCoordinate.getPosition()).toBe('a8');
    });

    test('Get next coordinate southeast test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHEAST);
        expect(nextCoordinate.getPosition()).toBe('e4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(5);
    });

    test('Get next coordinate southeast limit value test', () => {
        let nextMinBottonRightCoordinate = minBottonRightCoordinate.getNextCoordinate(DirectionEnum.SOUTHEAST);
        expect(nextMinBottonRightCoordinate.getPosition()).toBe('h1');
    });

    test('Get next coordinate southwest test', () => {
        let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHWEST);
        expect(nextCoordinate.getPosition()).toBe('c4');
        expect(nextCoordinate.getRow()).toBe('4');
        expect(nextCoordinate.getColumn()).toBe(3);
    });

    test('Get next coordinate southwest limit value test', () => {
        let nextMinBottonLeftCoordinate = minBottonLeftCoordinate.getNextCoordinate(DirectionEnum.SOUTH);
        expect(nextMinBottonLeftCoordinate.getPosition()).toBe('a1');
    });
});
