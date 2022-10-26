import { createPlayerView } from "./playerView.js";
import { createGameView } from './gameView.js';

const gameView = createGameView();
gameView.initializeGame();
const playerView = createPlayerView(gameView);

$('.cell').each(function(i, cell) {
    cell.onclick = function() { playerView.move(cell.id) };
});
$('.undo').each(function(i, btn){
    btn.onclick = function(){
        gameView.undo();
    }
});
$('.redo').each(function(i, btn){
    btn.onclick = function(){
        gameView.redo();
    }
});