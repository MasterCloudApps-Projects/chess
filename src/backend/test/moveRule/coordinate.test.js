import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';

let coordinate;

beforeEach(() => {
    coordinate = createCoordinate(5, 4);
});

test('testSetPosition', () => {
    coordinate.setPosition('a3')
    expect(coordinate.getPosition()).toBe('a3');
});

test('testGetPosition', () => {
    expect(coordinate.getPosition()).toBe('d5');
});


test('testGetColumn', () => {
    expect(coordinate.getColumn()).toBe(4);
});

test('testGetRow', () => {
    expect(coordinate.getRow()).toBe('5');
});


test('testColumnLetter', () => {
    expect(coordinate.getColumnLetter()).toBe('d');
});

test('testGetNextCoordinateNorth', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTH);
    expect(nextCoordinate.getPosition()).toBe('d6');
    expect(nextCoordinate.getRow()).toBe('6');
});

test('testGetNextCoordinateSouth', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTH);
    expect(nextCoordinate.getPosition()).toBe('d4');
    expect(nextCoordinate.getRow()).toBe('4');
});

test('testGetNextCoordinateEast', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.EAST);
    expect(nextCoordinate.getPosition()).toBe('e5');
    expect(nextCoordinate.getColumn()).toBe(5);
});

test('testGetNextCoordinateWest', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.WEST);
    expect(nextCoordinate.getPosition()).toBe('c5');
    expect(nextCoordinate.getColumn()).toBe(3);
});

test('testGetNextCoordinateNorthEast', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHEAST);
    expect(nextCoordinate.getPosition()).toBe('e6');
    expect(nextCoordinate.getRow()).toBe('6');
    expect(nextCoordinate.getColumn()).toBe(5);
});

test('testGetNextCoordinateNorthWest', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.NORTHWEST);
    expect(nextCoordinate.getPosition()).toBe('c6');
    expect(nextCoordinate.getRow()).toBe('6');
    expect(nextCoordinate.getColumn()).toBe(3);
});

test('testGetNextCoordinateSouthEast', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHEAST);
    expect(nextCoordinate.getPosition()).toBe('e4');
    expect(nextCoordinate.getRow()).toBe('4');
    expect(nextCoordinate.getColumn()).toBe(5);
});

test('testGetNextCoordinateSouthWest', () => {
    let nextCoordinate = coordinate.getNextCoordinate(DirectionEnum.SOUTHWEST);
    expect(nextCoordinate.getPosition()).toBe('c4');
    expect(nextCoordinate.getRow()).toBe('4');
    expect(nextCoordinate.getColumn()).toBe(3);
});


