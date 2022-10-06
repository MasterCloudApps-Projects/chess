import { createBoard } from './board.js';
import { PieceTypeEnum } from '../piece/pieceTypeEnum.js';
import { PieceNameEnum } from '../piece/pieceNameEnum.js';
import { createBlackFactory as blackPieceFactory } from '../piece/blackPieceFactory.js';
import { createWhiteFactory as whitePieceFactory } from '../piece/whitePieceFactory.js';

function boardBuilder() {
    let board = createBoard();

    function fromPieceLayoutString(pieceStringLayout) {
        pieceStringLayout = pieceStringLayout.trim().split('\n').join('-').split('-');
        let stringCounter = 0, pieceName;
        for (let i=8; i>0; i--)
            for (let letter = 0; letter < "abcdefgh".length; letter++) {
                pieceName = PieceNameEnum[pieceStringLayout[stringCounter].trim()];
                let position = "abcdefgh"[letter]+i.toString();

                //TODO: Review for possible refactoring -> blackPieceFactory[pieceName.call]
                let piece = blackPieceFactory()[pieceName.getFactoryCall()](position);
                if (pieceName.getColor() === PieceTypeEnum.White)
                    piece = whitePieceFactory()[pieceName.getFactoryCall()](position);

                board.getPieces()[position] = piece;
                stringCounter++;
            }

        return this;
    }

    function usingInitialPieceDisposition() {
        fromPieceLayoutString(`
            BR-BH-BB-BK-BQ-BB-BH-BR
            BP-BP-BP-BP-BP-BP-BP-BP
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            _-_-_-_-_-_-_-_
            WP-WP-WP-WP-WP-WP-WP-WP
            WR-WH-WB-WK-WQ-WB-WH-WR
        `);
        return this;
    }

    function build() {
        return board;
    }

    return {
        fromPieceLayoutString,
        usingInitialPieceDisposition,
        build
    }
}

export {
    boardBuilder
}