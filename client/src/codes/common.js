/*ͨ�÷���*/
var Common = {
	/*
		�ۺ�����
		a:Դ����
		b:Ŀ������
		c:a�����������
		d:b�����������
		e:Դ����������������
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
		��ȡcookie,�Լ�ֵ����ʽ����
		����a=3; b=2
		�򷵻�{'a':3,'b':2}
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
		��ȡguid�����
		���������ļ�����,
		���������,
		SplitString:�ָ���,Ĭ�Ͽ�
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