const mysql = require('mysql');
const config = require("../config.js");
module.exports =  
    mysql.createPool({
        host: config.host,
        user: config.user,
        port:config.port,
        password: config.password,
        database: config.dataBaseName,
        acquireTimeout: 10000,
        multipleStatements: true,
        /*获取连接池超时时间*/
        waitForConnections: true,
        /*没有连接可用时false返回错误*/
        connectionLimit: 100,
        /*一次创建最大连接数*/
        queueLimit: 0
        /*连接池队列中最大请求数,0无限制 */
    });
    