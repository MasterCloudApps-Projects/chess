import { layout } from '../utils/layoutBoard.js';
import { boardBuilder } from '../../main/boardBuilder.js';

describe('Build board', () => {
    test('Build board', () => {
        expect(checkBoardPieces(layout.stalemate.substring(1).split('\n').join('-').split('-'),
            boardBuilder().fromPieceLayoutString(layout.stalemate).build()))
            .toBeTruthy();
        expect(checkBoardPieces(layout.tryMove.substring(1).split('\n').join('-').split('-'),
            boardBuilder().fromPieceLayoutString(layout.tryMove).build()))
            .toBeTruthy();
    })
});

function checkBoardPieces(piecesArray, board) {
    let counter = 0;
    let pieces = board.getPieces();

    console.log(piecesArray)

    for (let i=8; i>0; i--){
        for (let letter = 0; letter < "abcdefgh".length; letter++) {
            let position = "abcdefgh"[letter]+i.toString();
            if(pieces[position].getAbbreviation() !== piecesArray[counter]) {
                console.log(pieces[position].getAbbreviation() + ' vs ' + piecesArray[counter])
                return false;
            }
            counter++;
        }
    }
    return true;
}