const http = require('http');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const url = require('url');
const path = require('path');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const checkUser = require('./server/libs/checkUser.js');
const getData = require("./server/dataBase/connectDatabase.js");
const login = require('./server/module/login.js');
const upload = require('./server/module/upload.js');
const bindMailBox = require('./server/module/mail.js');
const checkMail = require('./server/module/checkMail.js');
const setResponse = require('./server/libs/setResponse.js');
const getSqlData = require('./server/dataBase/getSqlData.js');
const getPageSqlData = require('./server/dataBase/getPageSqlData.js');
const app = express();


/*网站工作目录*/ 
let indexPath = path.join(__dirname,"./");
app.use(cookieParser());
app.use(session({
  name: 'skey',
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 10*60 * 1000  // 有效期，单位是毫秒
  }
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(indexPath));
/*校验邮箱*/
app.get('/bindMailBox',function(req,res){
  checkMail(req,res);
})
app.get('*', function (req, res) {
  res.sendFile(path.join(indexPath, './client/index.html'));
})
/*校验是否自动登录 */
app.post('/checkAutoLogin', function (req, res,next) {
  if(req.cookies.autoLogin){
    checkUser(req,(checkData) =>{
      if(checkData){
        res.write("success");  
      }else{
        res.write("error");
      }
      res.end();
    })
  }else{
    res.write("error");
    res.end();
  }
})
/*登录模块*/
app.post('/login', function (req, res) {
  req.on('data',function(datas){
    let resultData =  datas;
  });
  login(req,res);
})
/*注册模块*/
app.post('/register',function(req,res){
   getSqlData(req,res,(callbackData)=>{
    if(callbackData =='success'){
      //req.session.phoneNumber = JSON.parse(req.body.data).sqlDetail.phoneNumber;			
			setResponse(res,200,req.sessionID,"success");	
    }else{
      //req.session.phoneNumber = "";
      setResponse(res,401,"","loginFailed");
    }
   });
})
/* 执行sql语句*/
app.post('/sql',function(req,res){
  checkUser(req,(checkData) =>{
    /*校验通过*/
    if(checkData){
      getSqlData(req,res,(sqlData)=>{
        res.write(JSON.stringify(sqlData));
        res.end();
      });
    }else{
      setResponse(res,401,"loginFailed");
    }
  });
});
/* 执行sql语句*/
app.post('/getPageSql',function(req,res){
  checkUser(req,(checkData) =>{
    /*校验通过*/
    if(checkData){
      getPageSqlData(req,res,(sqlData)=>{
        res.write(JSON.stringify(sqlData));
        res.end();
      });
    }else{
      setResponse(res,401,"loginFailed");
    }
  });
});
/* 上传头像*/
app.post('/uploadHeadImage', function (req, res) {
  upload.uploadHeadImage(req,res);
})
/*绑定邮箱*/
app.post('/bindMailBox',function(req,res){
  bindMailBox(req,res);
})

const server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})