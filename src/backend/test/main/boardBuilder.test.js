import { layout } from '../utils/layoutBoard.js';
import { boardBuilder } from '../../main/boardBuilder.js';
import { boardToArray, strLayoutToArray } from '../utils/boardUtil.js';

describe('Build board', () => {
    test('Build board', () => {
        expect(boardToArray(boardBuilder().fromPieceLayoutString(layout.stalemate).build()))
            .toEqual(strLayoutToArray(layout.stalemate));
        expect(boardToArray(boardBuilder().fromPieceLayoutString(layout.tryMove).build()))
            .toEqual(strLayoutToArray(layout.tryMove));
        expect(boardToArray(boardBuilder().fromPieceLayoutString(layout.checkMate).build()))
            .toEqual(strLayoutToArray(layout.checkMate));
    });
});