
function createPawnDecorator(pawnPiece) {

    let pawn = pawnPiece;

    function decoratePawn(){
        const pawnFirstPositions = { 'BP' : '7', 'WP' : '2' }
        pawn.movement = moveRules.getPawnMoveRule(
            pawn.position.includes(pawnFirstPositions[pawn.name]),
            !pawn.isWhite());
        pawn.isQueen = false;
        pawn.doAfterMovement = function () {
            this.movement.doAfterMovement(this.position);
            if (!this.isQueen && this.movement.shouldTurnToQueen()) {
                this.movement = moveRules.getQueenMoveRule();
                this.fullName = this.fullName.replace('pawn', 'queen')
                this.name = this.name.replace('P', 'Q');
                this.isQueen = true;
            }
        };
        return pawn;
    }
}
