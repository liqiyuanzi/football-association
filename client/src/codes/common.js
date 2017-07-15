/*通用方法*/
var Common = {
	/*
		聚合数据
		a:源数组
		b:目标数组
		c:a数组对象属性
		d:b数组对象属性
		e:源数组新增属性名称
	*/
	setRelation:function(a,b,c,d,e){
		try{
			for(var i = 0;i < a.length;i ++){
				for(var j = 0;j < b.length;j ++){
					if(a[i][c] == b[j][d]){
						if(!a[i][e]){
							a[i][e] = [];
						}
						a[i][e].push(b[j]);
					}	
				}
			}
		}catch(err){};
	},
	/*
		获取cookie,以键值对形式返回
		例如a=3; b=2
		则返回{'a':3,'b':2}
	*/
	getCookie:function(){
		var cookies = {};
		cookies = document.cookie.split("; ");
		for(var i of cookies){
			cookies[i.split("=")[0]] = i.split("=")[1];
		}
		return cookies;
	},
	/*
		获取guid随机数
		用于设置文件名称,
		返回随机数,
		SplitString:分隔符,默认空
	*/
	getGuid:function(SplitString){
		var aId = "";
		var aSplitString = (SplitString != null) ? SplitString : "";
		try {
			var S4 = function () {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			};
			aId = (S4() + S4() + aSplitString + S4() + aSplitString + S4() + aSplitString + S4() + aSplitString + S4() + S4() + S4());
		}
		catch (cer) { ; }
		return aId;
	}
}
module.exports = Common