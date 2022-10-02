const messageManager = createMessageManager();

function createMessageManager() {
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

    return {
        createMessage,
        createErrorMessage
    }
}


export {
    messageManager
}