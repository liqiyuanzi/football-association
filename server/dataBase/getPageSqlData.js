const connectDatabase = require("./connectDatabase.js");
const Promise = require('bluebird');
const pool = require('./pool.js');
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');
const replaceSqlString = require('../libs/replaceSqlString.js');

const xxx = (req,res,callback)=>{
    let sqlPath = JSON.parse(req.body.data).sqlPath;
    let sqlDetail = JSON.parse(req.body.data).sqlDetail;
    let pageInfo = JSON.parse(req.body.data).pageInfo;

    let aSqlPath = path.join(__dirname,"../../client/sql",sqlPath.Path);
    fs.readFileAsync(aSqlPath,'utf8').then((data,error) =>{
         let newData = "select * from( " + data + ") table1 order by "+pageInfo.orderField+" "+ pageInfo.sortMethod+ " limit "+(pageInfo.pageIndex - 1) * pageInfo.pageMaxLength
         +","+pageInfo.pageMaxLength;   
        for(let j in sqlDetail){      
            let oldStr = '{'+j+'}';
            let newStr = sqlDetail[j];
            newData = newData.replace(new RegExp(oldStr,"g"),newStr)
        }
         pool.getConnection((err,connection) =>{
            if(err){
                callback(err)
            }else{
                connection.query(newData,(err, results, fields) => {
                    if(err){
                        callback(err);
                    }else{
                        let resSql = {};
                        resSql.results = results ? results : "";
                        let queryString = "select count(*) as pageCount from("+ data +") table1";
                        for(let j in sqlDetail){      
                            oldStr = '{'+j+'}';
                            newStr = sqlDetail[j];
                            queryString = queryString.replace(new RegExp(oldStr,"g"),newStr)
                        }
                        connection.query(queryString,(err, results, fields) => {
                            resSql.pageCount = results ? Math.ceil(results[0].pageCount / pageInfo.pageMaxLength) : 0;    
                            connection.release();         
                            callback(resSql);    
                        })
                    }          
                })
            } 
        })    
    })
}    
    

module.exports = xxx