var fs = require('fs');
var path = "F:/gitworkspace/liqiyuan-node-react/nodejs-react-webpack/client/sql";


function readDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);
        
        files.forEach(function(file) {
            var filePath = dirPath + "/" + file;
            var stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                console.log('\n读取目录：\n', filePath, "\n");
                readDirectory(filePath);
            } else if (stats.isFile()) {
                var buff = fs.readFileSync(filePath);
                if (buff[0].toString(16).toLowerCase() == "ef" && buff[1].toString(16).toLowerCase() == "bb" && buff[2].toString(16).toLowerCase() == "bf") {
                    //EF BB BF 239 187 191
                    console.log('\发现BOM文件：', filePath, "\n");

                    buff = buff.slice(3);
                    fs.writeFile(filePath, buff.toString(), "utf8");
                }
            }
        });        

    } else {
        console.log('Not Found Path : ', dirPath);
    }
}

readDirectory(path);