const connectDatabase = require("./connectDatabase.js");
module.exports = (req,res,callback)=>{
    let sqlPath = JSON.parse(req.body.data).sqlPath;
    let sqlDetail = JSON.parse(req.body.data).sqlDetail;
    connectDatabase(sqlPath,sqlDetail, (sqlReq) =>{
        callback(sqlReq);
    },req)
}