
const replaceSqlString = require('../libs/replaceSqlString.js');
const getLoginInfo = require('../libs/getLoginInfo.js');
const pool = require('./pool.js');

module.exports = (sqlPath,sqlDetail,callback,req) => {
  /*替换字符串变量,返回JSON格式SQL语句*/
  replaceSqlString(sqlPath,sqlDetail,(sql)=>{
    pool.getConnection((err,connection) =>{
      if(err){
        callback(err)
      }else{
        var ergodicEnd = 0;
        for(let i in sql){
          //有operate字符串表示有修改操作,需要添加操作纪录
          if(sql[i].indexOf("operateStr") != -1){
            let insertStr = sql[i].match(/&&[\u4e00-\u9fa5]+&&/g);
            if(insertStr){
              let loginInfo = getLoginInfo(req);
              insertStr = insertStr[0].substring(2,insertStr[0].length - 2);
              replaceSqlString([{ Key: "LoginInfo", Path: "login/insertLoginInfo.txt" }],{
                'userID':req.session.userID,
                'loginPlace':req.session.loginPlace,
                'loginDevice':loginInfo.loginDevice,
                'loginIP':loginInfo.loginIP,
                "operate":insertStr,"type":0
				        },(sql)=>{
                  connection.query(sql.LoginInfo,(err, results, fields) => {});
              })
            }
          }
          
          connection.query(sql[i],(err, results, fields) => {
           
            ergodicEnd ++;
            if(err){
              callback(err);
            }else{
              sql[i] = results ? results : "";
              if(sqlPath.length == ergodicEnd){
                  connection.release();         
                  callback(sql);
              }
            }          
          })
        }
      }  
    })
  }); 
}