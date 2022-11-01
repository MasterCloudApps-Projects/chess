import { createCoordinate }  from '../../moveRule/coordinate.js';
import { DirectionEnum }  from '../../moveRule/directionEnum';

let originCoordinate;

beforeEach(() => {
    originCoordinate = createCoordinate(3, 2);
});

test('testGetNextCoordinateNorth', () => {
    let nextCoordinate = DirectionEnum.NORTH.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('b4');
});

test('testGetNextCoordinateNorthNotPossible', () => {
    let nextCoordinate = DirectionEnum.NORTH.getNextCoordinate(createCoordinate(8, 2));
    expect(nextCoordinate.getPosition()).toBe('b8');
});

test('testGetNextCoordinateSouth', () => {
    let nextCoordinate = DirectionEnum.SOUTH.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('b2');
});

test('testGetNextCoordinateSouthNotPossible', () => {
    let nextCoordinate = DirectionEnum.SOUTH.getNextCoordinate(createCoordinate(1, 2));
    expect(nextCoordinate.getPosition()).toBe('b1');
});

test('testGetNextCoordinateEast', () => {
    let nextCoordinate = DirectionEnum.EAST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('c3');
});

test('testGetNextCoordinateEastNotPossible', () => {
    let nextCoordinate = DirectionEnum.EAST.getNextCoordinate(createCoordinate(3, 8));
    expect(nextCoordinate.getPosition()).toBe('h3');
});

test('testGetNextCoordinateWest', () => {
    let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('a3');
});

test('testGetNextCoordinateWestNotPossible', () => {
    let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(createCoordinate(3, 1));
    expect(nextCoordinate.getPosition()).toBe('a3');
});

test('testGetNextCoordinateNortheast', () => {
    let nextCoordinate = DirectionEnum.NORTHEAST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('c4');
});

test('testGetNextCoordinateNortheastNotPossible', () => {
    let nextCoordinate = DirectionEnum.NORTHEAST.getNextCoordinate(createCoordinate(8, 8));
    expect(nextCoordinate.getPosition()).toBe('h8');
});

test('testGetNextCoordinateNorthwest', () => {
    let nextCoordinate = DirectionEnum.NORTHWEST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('a4');
});

test('testGetNextCoordinateNorthwestNotPossible', () => {
    let nextCoordinate = DirectionEnum.NORTHWEST.getNextCoordinate(createCoordinate(8, 1));
    expect(nextCoordinate.getPosition()).toBe('a8');
});

test('testGetNextCoordinateSoutheast', () => {
    let nextCoordinate = DirectionEnum.SOUTHEAST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('c2');
});

test('testGetNextCoordinateSoutheastNotPossible', () => {
    let nextCoordinate = DirectionEnum.SOUTHEAST.getNextCoordinate(createCoordinate(1, 8));
    expect(nextCoordinate.getPosition()).toBe('h1');
});

test('testGetNextCoordinateSouthwest', () => {
    let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(originCoordinate);
    expect(nextCoordinate.getPosition()).toBe('a3');
});

test('testGetNextCoordinateSouthwestNotPossible', () => {
    let nextCoordinate = DirectionEnum.WEST.getNextCoordinate(createCoordinate(1, 1));
    expect(nextCoordinate.getPosition()).toBe('a1');
});

