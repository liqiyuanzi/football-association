const crypto = require('crypto');
const path = require('path');
const session = require('express-session');
const connectDatabase = require(path.join(__dirname,"../dataBase/connectDatabase.js"));
const setResponse = require(path.join(__dirname,'../libs/setResponse.js'));
const replaceSqlString = require('../libs/replaceSqlString.js');
const getLoginInfo = require('../libs/getLoginInfo.js');

let loginModule = (req,res,logFlag) =>{
	if(req.body.logout){
		//req.session.destroy(function(err){
		//	if(err){
		//		return res.json({ret_code: 2, ret_msg: '退出失败!'});                
		//	}
		
			res.cookie('phoneNumber', "", { expires: new Date(Date.now() -1 ), httpOnly: true });
			res.cookie('userPwd', "", { expires: new Date(Date.now() -1), httpOnly: true });	
			res.cookie('userName', "", { expires: new Date(Date.now() -1)});
			res.cookie('userID', "", { expires: new Date(Date.now() -1)});
			res.end();
		//})
	}else{
		let phoneNumber = req.body.phoneNumber;
		let password = req.body.password;
		let autoLogin = req.body.autoLogin;
		//let md5 = crypto.createHash('md5');
		//password = md5.update(password.toString()).digest('hex');
		connectDatabase([{ Key: "LoginApprove", Path: "login/login.txt" }],{'phoneNumber':phoneNumber,'password':password}, (sqlReq) => {
			if(sqlReq.LoginApprove[0]){
				/*if(!req.sessionID){
					req.session.regenerate(function(err) {
						if(err){
							return res.json({ret_code: 2, ret_msg: '登录失败!'});                
						}
					});
				}
				req.session.phoneNumber = phoneNumber;
				*/
				let loginInfo = getLoginInfo(req);
				req.session.userID = sqlReq.LoginApprove[0].id;
				req.session.loginPlace = loginInfo.loginPlace;
				connectDatabase([{ Key: "LoginInfo", Path: "login/insertLoginInfo.txt" }],{
					'userID':sqlReq.LoginApprove[0].id,'loginPlace':loginInfo.loginPlace,'loginDevice':loginInfo.loginDevice,'loginIP':loginInfo.loginIP,"operate":"登录","type":1
				}, (sqlReq) => {})
				res.cookie('autoLogin', autoLogin, { expires: new Date(Date.now() + 120000), httpOnly: true });
				//设置cookie登录名和密码
				res.cookie('phoneNumber', sqlReq.LoginApprove[0].phoneNumber, { expires: new Date(Date.now() + 1200000), httpOnly: true });
				res.cookie('userPwd', sqlReq.LoginApprove[0].userPwd, { expires: new Date(Date.now() + 1200000), httpOnly: true });
				//cookie中存入userName		
				res.cookie('userID', sqlReq.LoginApprove[0].id, { expires: new Date(Date.now() + 1200000)});
				res.cookie('userType', sqlReq.LoginApprove[0].userType, { expires: new Date(Date.now() + 1200000)});
				setResponse(res,200,"success")	
			}else{
				setResponse(res,401,"loginFailed")
			}
		});
	}
}
module.exports = loginModule