function createRegistry () {

    function undo() {

    }

    function redo() {

    }

    function register() {

    }

    function isUndoable() {

    }

    function isRedoable() {

    }

    return {
        register,
        undo,
        redo,
        isUndoable,
        isRedoable
    }
}

export {
    createRegistry
}
