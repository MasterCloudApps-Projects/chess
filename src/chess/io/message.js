function createMessage(error=false, errorMessage = ""){
    return {
        error: error,
        errorMessage: errorMessage
    };
}

export {
    createMessage
}