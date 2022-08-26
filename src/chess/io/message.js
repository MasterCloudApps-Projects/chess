function createMessage(data={}){
    return {
        error: false,
        data: data
    };
}

function createErrorMessage(errorMessage){
    return {
        error: true,
        errorMessage: errorMessage
    }
}

export {
    createMessage,
    createErrorMessage
}