async function http(endpoint = '', method = 'POST', data = {}){
    try{
        const res = await fetch(getBackendURL(endpoint), {
            method: method, 
            //mode: 'cors', // no-cors, *cors, same-origin
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
    return 'http://localhost:3000' + endpoint;
}

export{
    http
}