module.exports = (req,res) =>{
    const url = require('url');
    const path = require('path');
    const connectDatabase = require(path.join(__dirname,"../dataBase/connectDatabase.js"));

    let urlParams = url.parse(req.url).query;
    let phoneNumber = urlParams.split("&&")[0].split("=")[1];
    let password = urlParams.split("&&")[1].split("=")[1];
    let Emial = urlParams.split("&&")[2].split("=")[1];
    connectDatabase([{ Key: "GetUserInfo", Path: "login/login.txt" }],{'phoneNumber':phoneNumber,'password':password}, (sqlReq) => {
			if(sqlReq.GetUserInfo[0]){
                let userID = sqlReq.GetUserInfo[0].id;
                connectDatabase([{ Key: "BindMailBox", Path: "manage/bindMailBox.txt" }],{'Emial':Emial,'userID':userID}, (sqlReq) => {
                    let indexPath = path.join(__dirname,"./");
                    res.sendFile(path.join(indexPath, '../../client/checkMailSuccess.html'));
                })
            }
    })
}