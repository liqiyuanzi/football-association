module.exports = (req) =>{	
	let loginInfo = {};
	loginInfo.loginPlace = req.body.loginPlace;
	loginInfo.loginIP = req.headers['x-forwarded-for'] ||
						req.connection.remoteAddress ||
						req.socket.remoteAddress ||
						req.connection.socket.remoteAddress;
	let loginDevice = req.headers['user-agent'].toLowerCase().match(/(iphone|ipod|ipad|android)/);
	loginInfo.loginDevice = loginDevice ? "移动设备" : "PC机";
		
	return loginInfo
}