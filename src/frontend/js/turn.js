const turn = createTurn();

function createTurn() {
    let turns = ["White", "Black"];
    let index = 0;

    function get() {
        return turns[index];
    }

    function next() {
        index = index % 2 ? 0 : 1;  
    }

    return{
        get,
        next
    }
}

export {
    turn
}