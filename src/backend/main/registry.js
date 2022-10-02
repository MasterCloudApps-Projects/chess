function createRegistry(boardP){
    let mementos = [];
    let index = 0;
    let board = boardP;

    function register() {
        for(let i = 0; i < index; i++){
            mementos.shift();
        }
        index = 0;
        mementos.splice(0, 0, board.createMemento());
    }

    function undo() {
        if(!isUndoable())
            return;
        index++;
        board.setMemento(mementos[index]);
    }

    function redo() {
        if(!isRedoable())
            return;
        index--;
        board.setMemento(mementos[index]);
    }

    function isUndoable() {
        return index < (mementos.length - 1);
    }

    function isRedoable() {
        return index > 0;
    }

    register();

    return {
        register,
        undo,
        redo,
        isUndoable,
        isRedoable,
    }
}

export {
    createRegistry
}
