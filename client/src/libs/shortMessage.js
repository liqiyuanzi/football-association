/* 
	http://106.ihuyi.com/webservice/sms.php?method=Submit
	&account=APIID&password=APIKEY&mobile=手机号码&content=您的验证码是：1234。请不要把验证码泄露给其他人。
*/
//C42581102
var _baseUri = "http://106.ihuyi.com/webservice/sms.php?method=Submit&account=";
var identifying = function(mobile,identifyingCode,account="C42581102", password="b9cfe8e1a02c878a5fa1073589060747") {
    this.account = account;
    this.password = password;
	this.mobile = mobile
	this.content = encodeURI("您的验证码是："+identifyingCode+"。请不要把验证码泄露给其他人。");
};

identifying.prototype.send = function(callback) {
	$.ajax({
			url:_baseUri+this.account+"&password="+this.password+"&mobile="+this.mobile+"&content="+this.content,
			dataType:"text",
			cache:false,
			timeout:10000,
			success:function(res){
				callback();
			},
			error:function(res){
				callback();
			}
		  })
};

module.exports = identifying;
