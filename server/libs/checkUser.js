const connectDatabase = require("../dataBase/connectDatabase.js");
module.exports = (req,callback) => {
    connectDatabase([{ Key: "LoginApprove", Path: "login/login.txt" }],
    {'phoneNumber':req.cookies.phoneNumber,'password':req.cookies.userPwd}, (sqlReq) => {
        if(sqlReq.LoginApprove[0]){
            callback(true);
        }else{
            callback(false);
        }
    })
}