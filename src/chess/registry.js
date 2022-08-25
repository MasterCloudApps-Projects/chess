function createRegistry(board){
    let registry = {};
    registry.mementos = [];
    registry.index = 0;
    registry.board = board;
    registry.register = register;
    registry.undo = undo;
    registry.redo = redo;
    registry.isUndoable = isUndoable;
    registry.isRedoable = isRedoable;
    registry.register();
    return registry;
}

function register(){
    for(let i = 0; i < this.index; i++){
        this.mementos.shift();
    }
    this.index = 0;
    this.mementos.splice(0, 0, this.board.createMemento()); 
}

function undo(){
    if(!this.isUndoable())
        return;
    this.index++;
    this.board.setMemento(this.mementos[this.index]);
}

function redo(){
    if(!this.isRedoable())
        return;
    this.index--;
    this.board.setMemento(this.mementos[this.index]);
}

function isUndoable(){
    return this.index < (this.mementos.length - 1);
}

function isRedoable(){
    return this.index > 0;
}

export {
    createRegistry
}