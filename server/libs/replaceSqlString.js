/*
    解析某路径下的txt文件根据'{}'替换内容,
    返回json,以替换后txt内容为json内容
*/
module.exports = (sqlPath,sqlDetail,callback) =>{
    /*
    let sqlPath = [
        { Key: "ApproveResult", Path: "login/login.txt" },
        { Key: "ApproveResult", Path: "login/login.txt" }
    ]
    let sqlDetail = {name:'123456',userType:'2'}
    */
    const Promise = require('bluebird');
    const fs = Promise.promisifyAll(require("fs"));
    const path = require('path');
    let res = {};
    let fileIndex = 0;
    sqlPath.forEach((ele) =>{
        let aSqlPath = path.join(__dirname,"../../client/sql",ele.Path);
        fs.readFileAsync(aSqlPath,'utf8').then((data,error) =>{
             for(let j in sqlDetail){      
                let oldStr = '{'+j+'}';
                let newStr = sqlDetail[j];
                data = data.replace(new RegExp(oldStr,"g"),newStr)
            }
            res[ele.Key] = data;
            fileIndex ++;
            if(fileIndex == sqlPath.length){           
                return new Promise(() =>{
                   callback(res);     
                }) 
            }
        })
    })
}