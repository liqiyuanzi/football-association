module.exports = (res,state,details) =>{
    res.writeHead(state, {
        'Content-Type': 'text/html',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": " true", 
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    });
    res.write(details);
    res.end();	
}