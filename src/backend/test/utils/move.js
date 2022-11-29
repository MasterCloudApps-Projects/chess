function getPossibleCoordiantes(origin, pieces, piece){
    let possibleCoordinates = [];
    piece.updateCurrentPosition(origin, pieces);
    piece.getPossibleMovements().forEach(p => possibleCoordinates.push(p.getPosition()));
    return possibleCoordinates;
}

export {
    getPossibleCoordiantes
}
