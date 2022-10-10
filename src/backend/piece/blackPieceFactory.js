import { createFactory } from "./pieceFactory.js";
import { PieceTypeEnum } from './pieceTypeEnum.js';

function createBlackFactory() {
    //TODO: Pending to refactor black and white factory
    const returned = createFactory();
    const color = PieceTypeEnum.Black;

    function getRook(position){
        return returned.getRook(color, position)
    }

    function getHorse(position){
        return returned.getHorse(color, position)
    }

    function getBishop(position){
        return returned.getBishop(color, position)
    }

    function getQueen(position){
        return returned.getQueen(color, position)
    }

    function getKing(position){
        return returned.getKing(color, position)
    }

    //TODO: Pending to add old pawn decorator functionality
    function getPawn(position){
        return returned.getPawn(color, position)
    }

    return {
        ...returned,
        ...{ getRook,
        getHorse,
        getBishop,
        getQueen,
        getKing,
        getPawn }
    }
}

export{
    createBlackFactory
}
