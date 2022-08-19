import { addBoardFunctionality } from './board.js';
// import piece factories from ./

function boardBuilder() {
    let board = {};

    function usingInitialPieceDisposition() {
        board.pieces = {
             a8: 'BR', b8: 'BH', c8: 'BB', d8: 'BQ', e8: 'BK', f8: 'BB',  g8: 'BH', h8: 'BR',
             a7: 'BP', b7: 'BP', c7: 'BP', d7: 'BP', e7: 'BP', f7: 'BP', g7: 'BP', h7: 'BP',

             a6: '_', b6: '_', c6: '_', d6: '_', e6: '_', f6: '_', g6: '_', h6: '_',
             a5: '_', b5: '_', c5: '_', d5: '_', e5: '_', f5: '_', g5: '_', h5: '_',
             a4: '_', b4: '_', c4: '_', d4: '_', e4: '_', f4: '_', g4: '_', h4: '_',
             a3: '_', b3: '_', c3: '_', d3: '_', e3: '_', f3: '_', g3: '_', h3: '_',

             a2: 'WP', b2: 'WP', c2: 'WP', d2: 'WP', e2: 'WP', f2: 'WP', g2: 'WP', h2: 'WP',
             a1: 'WR', b1: 'WH', c1: 'WB', d1: 'WQ', e1: 'WK', f1: 'WB', g1: 'WH', h1: 'WR',
        };
        return this;
    }

    function build() {
        return addBoardFunctionality(board);
    }

    return {
        usingInitialPieceDisposition,
        build
    }
}

export {
    boardBuilder
}
