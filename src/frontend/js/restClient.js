const restClient = createRestClient();

function createRestClient() {
    const baseUrl = 'http://localhost:3000';

    async function http(endpoint = '', method = 'POST', data = {}){
        try{
            const res = await fetch(getBackendURL(endpoint), {
                method: method, 
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: method === 'POST' ? JSON.stringify(data) : undefined 
            });
            const resJSON = await res.json();
            return resJSON;
        }catch(error){
            return {
                error: true,
                errorMessage: error
            }
        }
    }
    
    function getBackendURL(endpoint = '') {
        return baseUrl + endpoint;
    }

    return {
        http
    }
}

export{
    restClient
}