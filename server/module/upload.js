const formidable = require("formidable")
const fs = require("fs")
const path = require("path")
const connectDatabase = require(path.join(__dirname,"../dataBase/connectDatabase.js"));
let upload = {
	uploadHeadImage:(req,res)=>{
		const imageDir = path.join(__dirname,'../uploadFiles/images/');
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8'; //设置编辑
		form.uploadDir = imageDir; //设置上传目录
		form.keepExtensions = true; //保留后缀
		form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
		form.type = true;
		
		form.parse(req, function(err, fields, files) {
			connectDatabase([{ Key: "GetHeadImage", Path: "manage/getPreviousHeadImage.txt" }],{'userID':fields.userID}, (sqlReq) => {
				try{
					let Imagepath = sqlReq.GetHeadImage[0].previousHeadPhoto;
					fs.unlinkSync(path.join(__dirname,"../../",Imagepath.substring(1,Imagepath.length-1)),(err)=>{
						if (err) {
							res.send(err);
							return;
						}
						
					});	/*删除上一个文件*/	
				}catch(err){};	
			})
			if (err) {
				res.send(err);
				return;
			}
			var extName = ''; //后缀名
			switch (files.upload.type) {
			case 'image/pjpeg':
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
			case 'image/x-png':
				extName = 'png';
				break;
			case 'image/gif':
				extName = 'gif';
				break;
			}
			if (extName.length === 0) {
				res.send({
					code: 202,
					msg: '只支持png，jpg，gif格式图片'
				});
				return;
			}else{			
						
				var newPath = path.join(imageDir,fields.fileName+"."+extName);
				fs.rename(files.upload.path, newPath,(err)=>{
					var newPath = path.join("/server/uploadFiles/images/",fields.fileName+"."+extName);
					newPath = JSON.stringify(newPath);
					connectDatabase([{ Key: "UpdateHeadImage", Path: "manage/updatePreviousHeadImage.txt" }],{'userID':fields.userID,'previousHeadPhoto':newPath}, (sqlReq) => {
						/*插入新的头像和previousHeadPhoto*/
						res.send({
							code: 200,
							msg: "success"
						});	
					})
				}); //重命名
			}
		}) 
	},
	uploadFile:()=>{
		
	}	
}
module.exports = upload