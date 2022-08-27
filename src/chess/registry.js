function createRegistry(board){
    let registry = {};
    registry.mementos = [];
    registry.index = 0;
    registry.board = board;

    registry.register = function(){
        for(let i = 0; i < this.index; i++){
            this.mementos.shift();
        }
        this.index = 0;
        this.mementos.splice(0, 0, this.board.createMemento());
    }

    registry.undo = function(){
        if(!this.isUndoable())
            return;
        this.index++;
        this.board.setMemento(this.mementos[this.index]);
    }

    registry.redo = function(){
        if(!this.isRedoable())
            return;
        this.index--;
        this.board.setMemento(this.mementos[this.index]);
    }

    registry.isUndoable = function(){
        return this.index < (this.mementos.length - 1);
    }

    registry.isRedoable = function isRedoable(){
        return this.index > 0;
    }

    registry.register();

    return registry;
}


export {
    createRegistry
}
