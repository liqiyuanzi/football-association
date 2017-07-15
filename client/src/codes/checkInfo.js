/*校验模块*/
import checkIDCard from "libs/checkIDCard"
import * as registerActions from 'actions/register';
import * as manageActions from 'actions/manage';

let checkModule = {};
/*********************************************************校验注册信息模块*****************************************************/
let checkRegisterInfo = function(){
	this.property = {name : '',IDCard : '',mail : '',password : '',insurePassword : '',phoneNumber : '',identifyCode : '',type : ''}	
}
let checkRegister = new checkRegisterInfo();
checkRegisterInfo.prototype.checkName = function(ev){
	let state = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z.])*$/.test(ev.target.value);
	if(state){
		checkRegister.property.name = ev.target.value;
		registerActions.checkName(true);
	}else{
		/*防止先输对再输错*/
		checkRegister.property.name = "";
		registerActions.checkName(false);
	}
}
checkRegisterInfo.prototype.checkIDCard = function(ev){
	let state = checkIDCard(ev.target.value);
	if(state){
		checkRegister.property.IDCard = ev.target.value;
		registerActions.checkIDCard(true);
	}else{
		checkRegister.property.IDCard = "";
		registerActions.checkIDCard(false);
	}
}
checkRegisterInfo.prototype.checkMail = function(ev){
	let state = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(ev.target.value);
	if(state){
		checkRegister.property.mail = ev.target.value;
		registerActions.checkMail(true);
	}else{
		checkRegister.property.mail = "";
		registerActions.checkMail(false);
	}
}
checkRegisterInfo.prototype.checkPassword = function(ev){
	let value =  ev.target.value;
	let state = value.length < 6 ? 0 : 1;
	if(checkRegister.property.insurePassword != value){
		/*密码只要修改,重复密码即错误*/
		checkRegister.property.insurePassword = "";
		registerActions.checkInsurePassword(false);
	}
	for(let i of value){
		if(!/^[0-9a-zA-Z_]*$/.test(i)){
			state = 0;
		} 	
	}
	if(state){
		checkRegister.property.password = value;
		registerActions.checkPassword(true);
	}else{
		checkRegister.property.password = "";
		registerActions.checkPassword(false);
	}
}
checkRegisterInfo.prototype.checkInsurePassword = function(ev){
	let insurePassword = ev.target.value;
	let password = checkRegister.property.password ? checkRegister.property.password : ""
	let state =  password == insurePassword ? 1 : 0
	if(state){
		checkRegister.property.insurePassword = insurePassword;
		registerActions.checkInsurePassword(true);
	}else{
		checkRegister.property.insurePassword = "";
		registerActions.checkInsurePassword(false);
	}
}
checkRegisterInfo.prototype.checkPhoneNumber = function(ev){
	let state =  /^1[3,4,5,7,8]{1}\d{9}$/.test(ev.target.value);
	if(checkRegister.property.phoneNumber != ev.target.value){
		registerActions.setMessageData();
	}
	if(state){
		checkRegister.property.phoneNumber = ev.target.value;
		registerActions.checkPhoneNumber(true);
	}else{
		checkRegister.property.phoneNumber = "";
		registerActions.checkPhoneNumber(false);
	}
}
checkRegisterInfo.prototype.checkIdentifyCodeInput = function(ev){
	let value =  ev.target ? ev.target.value : arguments[0];
	let state =  /^\d{4}$/.test(value);
	if(state){
		checkRegister.property.identifyCode = value;
		registerActions.checkIdentifyCode("");
	}else{
		checkRegister.property.identifyCode = "";
		registerActions.checkIdentifyCode("! 验证码错误");
	}
}
checkRegisterInfo.prototype.checkIdentifyCodeEqual = function(){
	let value = arguments[0];
	let state = window._STORE_.getState().registerModule.messageState ? 
	window._STORE_.getState().registerModule.messageData == value ?
	"" : 
	"! 验证码错误" :
	"! 请先获取验证码"
	if(window._STORE_.getState().registerModule.messageData == value){
		checkRegister.property.identifyCode = value;
		return true
	}else{
		registerActions.checkIdentifyCode(state);
		return false;
	}
}
checkRegisterInfo.prototype.check = function(callback){
	let _registerFlag = 1;
	this.property["type"] = $("[name=type]:checked").val();
	for(let i in this.property){
		if(!this.property[i]){
			_registerFlag = 0;
			switch(i){
				case 'name':
					registerActions.checkName(false);
				break;
				case 'IDCard':
					registerActions.checkIDCard(false);
				break;
				case 'mail':
					registerActions.checkMail(false);
				break;
				case 'password':
					registerActions.checkPassword(false);
				break;
				case 'insurePassword':
					registerActions.checkInsurePassword(false);
				break;
				case 'phoneNumber':
					registerActions.checkPhoneNumber(false);
				case 'identifyCode':
					this.checkIdentifyCodeInput($("[name=identifyCode]").val());
				break;
			}
		}
	}
	if(!this.checkIdentifyCodeEqual($("[name=identifyCode]").val())){
		_registerFlag = 0;
	}
	if(_registerFlag){
		this.property.identifyCode = $("[name=type]").val();
		registerActions.registerInfo(
			[{ Key: "Register", Path: "register/register.txt" }],this.property,(resState) => {
				callback(resState);
			}
		);
	}
}


/********************************************校验修改信息模块************************************************/
let checkManageInfo = function(){
	this.property = {name : '',gender : '',userType : '',IDCard : '',phoneNumber : '',mail : '',provinceCode : '',cityCode : '',userSign : '',userID:''}	
}
let checkManage = new checkManageInfo();
checkManageInfo.prototype.checkName = function(ev,ele){
	let state = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z.])*$/.test(ele || ev.target.value);
	if(state){
		checkManage.property.name = ele || ev.target.value;
		manageActions.checkName(true);
	}else{
		/*防止先输对再输错*/
		checkManage.property.name = "";
		manageActions.checkName(false);
	}
	return state;
}
checkManageInfo.prototype.checkIDCard = function(ev,ele){
	let state = checkIDCard(ele || ev.target.value);
	if(state){
		checkManage.property.IDCard = ele || ev.target.value;
		manageActions.checkIDCard(true);
	}else{
		checkManage.property.IDCard = "";
		manageActions.checkIDCard(false);
	}
	return state;
}
checkManageInfo.prototype.checkMail = function(ev,ele){
	let state = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(ele || ev.target.value);
	if(state){
		checkManage.property.mail = ele || ev.target.value;
		manageActions.checkMail(true);
	}else{
		checkManage.property.mail = "";
		manageActions.checkMail(false);
	}
	return state;
}
checkManageInfo.prototype.check = function(callback){
	let _registerFlag = 1;
	for(let i in this.property){
		switch(i){
			case 'userType':
			case 'gender':
				this.property[i] = $("[name="+ i +"]:checked").val();
			break;
			case 'name':
				_registerFlag = this.checkName(true,$("[name=name]").val());
			break;
			case 'IDCard':
				_registerFlag = this.checkIDCard(true,$("[name=IDCard]").val());
			break;
			case 'mail':
				_registerFlag = this.checkMail(true,$("[name=mail]").val());
			break;
			default:
				this.property[i] = $("[name=" + i + "]").val();
			break;
		}
		if(!_registerFlag){
			break;
		}
	}
	if(_registerFlag){
		 manageActions.updateUserInfo(
			 [{ Key: "UpdateUserInfo", Path: "manage/updateUserInfo.txt" }],this.property,(resState) => {
				 callback(resState);
			 }
		 );
	}
}
/********************************校验修改密码模块*************************************/
let checkChangePasswordInfo = function(){
	this.property = {oldPassword : '',newPassword:'',insurePassword:''}	
}
let checkChangePassword= new checkChangePasswordInfo();
checkChangePasswordInfo.prototype.checkOldPassword = function(ev){
	let value =  ev.target.value;
	let state = value.length < 6 ? 0 : 1;
	for(let i of value){
		if(!/^[0-9a-zA-Z_]*$/.test(i)){
			state = 0;
		} 	
	}
	/*修改原始密码状态*/
	manageActions.setPasswordState(true);
	if(state){
		checkChangePassword.property.oldPassword = value;
		manageActions.checkOldPassword(true);
	}else{
		checkChangePassword.property.oldPassword = "";
		manageActions.checkOldPassword(false);
	}
}
checkChangePasswordInfo.prototype.checkNewPassword = function(ev){
	let value =  ev.target.value;
	let state = value.length < 6 ? 0 : 1;
	if(checkChangePassword.property.insurePassword != value){
		/*密码只要修改,重复密码即错误*/
		checkChangePassword.property.insurePassword = "";
		manageActions.checkInsurePassword(false);
	}
	for(let i of value){
		if(!/^[0-9a-zA-Z_]*$/.test(i)){
			state = 0;
		} 	
	}
	if(state){
		checkChangePassword.property.newPassword = value;
		manageActions.checkNewPassword(true);
	}else{
		checkChangePassword.property.newPassword = "";
		manageActions.checkNewPassword(false);
	}
}
checkChangePasswordInfo.prototype.checkInsurePassword = function(ev){
	let insurePassword = ev.target.value;
	let password = checkChangePassword.property.newPassword ? checkChangePassword.property.newPassword : ""
	let state =  password == insurePassword ? 1 : 0
	if(state){
		checkChangePassword.property.insurePassword = insurePassword;
		manageActions.checkInsurePassword(true);
	}else{
		checkChangePassword.property.insurePassword = "";
		manageActions.checkInsurePassword(false);
	}
}
checkChangePasswordInfo.prototype.check = function(userID,userPwd,callback){
	let _registerFlag = 1;
	for(let i in this.property){
		if(!this.property[i]){
			_registerFlag = 0;	
		}
	}
	if(userPwd == this.property.oldPassword){
		manageActions.setPasswordState(true);
	}else{
		_registerFlag = 0;
		manageActions.setPasswordState(false);
	}
	if(_registerFlag){
		manageActions.updateUserInfo([{ Key: "UpdatePassword", Path: "manage/updatePassword.txt" }],{'userID':userID,'password':this.property.newPassword},(state)=>{
			callback(state);
		});
	}
}
/********************************校验手机绑定模块*************************************/
let checkChangePhoneNumberInfo = function(){
	this.property = {oldPhoneNumber: '',newPhoneNumber:'',identifyCode:''}	
}
let checkChangePhoneNumber= new checkChangePhoneNumberInfo();
checkChangePhoneNumberInfo.prototype.checkOldPhoneNumber = function(ev){
	let state =  /^1[3,4,5,7,8]{1}\d{9}$/.test(ev.target.value);
	if(state){
		checkChangePhoneNumber.property.oldPhoneNumber = ev.target.value;
		manageActions.checkOldPhoneNumber("");
	}else{
		checkChangePhoneNumber.property.oldPhoneNumber = "";
		manageActions.checkOldPhoneNumber("! 手机号码格式错误");
	}
}
checkChangePhoneNumberInfo.prototype.checkNewPhoneNumber = function(ev){
	let state =  /^1[3,4,5,7,8]{1}\d{9}$/.test(ev.target.value);
	if(checkChangePhoneNumber.property.newPhoneNumber != ev.target.value){
		registerActions.setMessageData();
	}
	if(state){
		checkChangePhoneNumber.property.newPhoneNumber = ev.target.value;
		manageActions.checkNewPhoneNumber(true);
	}else{
		checkChangePhoneNumber.property.newPhoneNumber = "";
		manageActions.checkNewPhoneNumber(false);
	}
}
checkChangePhoneNumberInfo.prototype.checkIdentifyCode = function(ev){
	let value =  ev.target ? ev.target.value : arguments[0];
	let state =  /^\d{4}$/.test(value);
	if(state){
		checkChangePhoneNumber.property.identifyCode = value;
		registerActions.checkIdentifyCode("");
	}else{
		checkChangePhoneNumber.property.identifyCode = "";
		registerActions.checkIdentifyCode("! 验证码错误");
	}
}
checkChangePhoneNumberInfo.prototype.checkIdentifyCodeEqual = function(code){
	let value = code;
	let state = window._STORE_.getState().registerModule.messageState ? 
	window._STORE_.getState().registerModule.messageData == value ?
	"" : 
	"! 验证码错误" :
	"! 请先获取验证码"
	if(window._STORE_.getState().registerModule.messageData == value){
		checkChangePhoneNumber.property.identifyCode = value;
		return true
	}else{
		registerActions.checkIdentifyCode(state);
		return false;
	}
}
checkChangePhoneNumberInfo.prototype.check = function(code,userID,phoneNumber,callback){
	let _registerFlag = 1;
	for(let i in this.property){
		if(!this.property[i]){
			_registerFlag = 0;	
		}
	}
	if(phoneNumber == this.property.oldPhoneNumber){
		manageActions.checkOldPhoneNumber("");
	}else{
		_registerFlag = 0;
		manageActions.checkOldPhoneNumber("! 与已绑定号码不符");
	}
	if(!this.checkIdentifyCodeEqual(code)){
		_registerFlag = 0;	
	}
	if(_registerFlag){
		manageActions.updateUserInfo([{ Key: "UpdatePhoneNumber", Path: "manage/updatePhoneNumber.txt" }],{'userID':userID,'phoneNumber':this.property.newPhoneNumber},(state)=>{
			callback(state);
		});
	}
}

/*************************************************验证邮箱*************************************************/

let checkBindMailBoxInfo = function(){
	this.property = {mail: ''}	
}
let checkBindMailBox= new checkBindMailBoxInfo();
checkBindMailBoxInfo.prototype.checkMailBox = function(ev){
	let state = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(ev.target.value);
	if(state){
		checkBindMailBox.property.mail = ev.target.value;
		registerActions.checkMail(true);
	}else{
		checkBindMailBox.property.mail = "";
		registerActions.checkMail(false);
	}
}

checkModule.checkRegisterInfo = checkRegister
checkModule.checkManageInfo = checkManage
checkModule.checkChangePassword = checkChangePassword
checkModule.checkChangePhoneNumber = checkChangePhoneNumber
checkModule.checkBindMailBoxInfo = checkBindMailBox
module.exports = checkModule;