

function port(val){
    let port = Number.parseInt(val,10);
    if(Number.isNaN(port)){
        return val;
    }
    if(port>=0){
        return port;
    }
    return false;
}

export {
    port as normalizePort
};