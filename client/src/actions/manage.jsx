import Config from "codes/config"
import {
	SET_USER_EDIT_MODAL_STATE,/*编辑用户信息模态框*/
	SET_PROVINCE_CODE,/*修改省份*/
	CHECK_MANAGE_NAME,/*验证注册姓名*/
	CHECK_MANAGE_ID_CARD,/*验证注册身份证*/
	CHECK_MANAGE_MAIL,/*验证注册邮箱*/
	SET_HEAD_IMAGE_STATE,/*头像模态框显示隐藏*/
	UPDATE_HEAD_PHOTO,/*确定上传头像*/
	SET_CHANGE_PASSWORD_STATE,/*改密码模态框显示隐藏*/
	SET_CHANGE_PHONE_NUMBER_STATE,/*修改手机号码模态框显示隐藏*/
	SET_BIND_MAIL_BOX_STATE,/*绑定邮箱模态框显示隐藏*/
	CHECK_CHANGE_OLD_PASSWORD,/*校验旧密码*/
	CHECK_CHANGE_NEW_PASSWORD,/*校验新密码*/
	CHECK_CHANGE_INSURE_PASSWORD,/*校验确定密码*/
	SET_PASSWORD_STATE,/*设置原始密码状态*/
	CHECK_OLD_PHONE_NUMBER,
	CHECK_NEW_PHONE_NUMBER,
	BIND_MAIL_BOX,/*绑定邮箱*/
	SEND_MAIL_STATE,/*邮件发送状态*/
	
} from './actiontype.jsx';
/*设置弹出框状态*/
export const setEditModalState = (state) =>{
	window._STORE_.dispatch(reduceEditUserInfo(state));
}
/*设置头像modal*/
export const setHeadImageModalState = (state) =>{
	window._STORE_.dispatch(reduceHeadImageState(state));
}
/*设置改密码modal*/
export const setChangePasswordState = (state) =>{
	window._STORE_.dispatch(reduceChangePasswordState(state));
}
/*绑定邮箱modal*/
export const setBindMailBoxState = (state) =>{
	window._STORE_.dispatch(reduceBindMailBoxState(state));
}
/*设置改手机号modal*/
export const setChangePhoneNumberState = (state) =>{
	window._STORE_.dispatch(reduceChangePhoneNumberState(state));
}
/*设置省CODE连动下拉菜单*/
export const setProvinceCode = (code) =>{
	window._STORE_.dispatch(reduceProvinceCode(code));
}
/*校验信息*/
export const checkName = (state) =>{
	window._STORE_.dispatch(reduceCheckName(state))
}
export const checkIDCard = (state) =>{
	window._STORE_.dispatch(reduceCheckIDCard(state))
}
export const checkMail = (state) =>{
	window._STORE_.dispatch(reduceCheckMail(state))
}
export const setPasswordState = (state)=>{
	window._STORE_.dispatch(reducePasswordState(state))
}
/*保存用户信息*/
export const updateUserInfo = (sqlPath,sqlDetail,callback) =>{
	let data = JSON.stringify({'sqlPath':sqlPath,'sqlDetail':sqlDetail});
    $.ajax({
        url: Config.ServerUrl +'sql',
        dataType: "text",
        jsonpCallback: 'callback',
        data: {'data':data},
        method: 'POST',
        success: function (data) {
			callback("success");
        },
        error: function (xhr, status, error) {
			callback("error");
        }
    });
}
/*上传头像*/
export const uploadHeadImage = (fileObj,callback) =>{
	$.ajax({
        url: Config.ServerUrl +'uploadHeadImage',
        data: fileObj,
        method: 'POST',
		cache: false,
		contentType: false, //不可缺参数
        processData: false, //不可缺参数
        success: function (data) {
			callback("success");
        },
        error: function (xhr, status, error) {
			callback("error");
        }
    });
}
/*发送邮件*/
export const sendMailMessage = (fileObj,callback) =>{
	$.ajax({
        url: Config.ServerUrl +'bindMailBox',
        data: fileObj,
		dataType: "text",
        method: 'POST',
		jsonpCallback: 'callback',
        success: function (data) {
			window._STORE_.dispatch(reduceSendMailState(data));
        },
        error: function (xhr, status, error) {
			window._STORE_.dispatch(reduceSendMailState("error"));
        }
    });
}
/*设置邮件发送状态*/
export const setSendState = (state) =>{
	window._STORE_.dispatch(reduceSendMailState(state));
}
/*修改密码模块*/
export const checkOldPassword = (state) =>{
	window._STORE_.dispatch(reduceOldPassword(state));
}
export const checkNewPassword =(state) =>{
	window._STORE_.dispatch(reduceNewPassword(state));
}
export const checkInsurePassword =(state) =>{
	window._STORE_.dispatch(reduceInsurePassword(state));
}
/*修改手机绑定模块*/
export const checkOldPhoneNumber = (state) =>{
	window._STORE_.dispatch(reduceOldPhoneNumber(state));
}
export const checkNewPhoneNumber =(state) =>{
	window._STORE_.dispatch(reduceNewPhoneNumber(state));
}

/************************************************************************************************************************/
/*提交账号密码*/
const reduceEditUserInfo = (data) => {
	return{
		type:SET_USER_EDIT_MODAL_STATE,
		data:data
	}
}
/*头像modal显示隐藏*/
const reduceHeadImageState = (data) =>{
	return{
		type:SET_HEAD_IMAGE_STATE,
		data:data
	}
}
/*改密码modal显示隐藏*/
const reduceChangePasswordState = (data) =>{
	return{
		type:SET_CHANGE_PASSWORD_STATE,
		data:data
	}
}
/*改手机号modal显示隐藏*/
const reduceChangePhoneNumberState = (data) =>{
	return{
		type:SET_CHANGE_PHONE_NUMBER_STATE,
		data:data
	}
}
/*连动下拉菜单*/
const reduceProvinceCode = (code) => {
	return{
		type:SET_PROVINCE_CODE,
		data:code
	}
}/*验证修改信息*/
const reduceCheckName = (state) =>{
	return{
		type:CHECK_MANAGE_NAME,
		data:state
	}
}
const reduceCheckIDCard = (state) =>{
	return{
		type:CHECK_MANAGE_ID_CARD,
		data:state
	}
}
const reduceCheckMail = (state) =>{
	return{
		type:CHECK_MANAGE_MAIL,
		data:state
	}
}
/*确定上传头像*/
const reduceChangeHeadPhoto = (data) =>{
	return{
		type:UPDATE_HEAD_PHOTO,
		data:data
	}
}
/*修改密码模块*/
const reduceOldPassword = (data) =>{
	return{
		type:CHECK_CHANGE_OLD_PASSWORD,
		data:data
	}
}
const reduceNewPassword = (data) =>{
	return{
		type:CHECK_CHANGE_NEW_PASSWORD,
		data:data
	}
}
const reduceInsurePassword = (data) =>{
	return{
		type:CHECK_CHANGE_INSURE_PASSWORD,
		data:data
	}
}
/*验证原始密码是否正确*/
const reducePasswordState = (data)=>{
	return{
		type:SET_PASSWORD_STATE,
		data:data
	}
}
/*修改绑定手机模块*/
const reduceOldPhoneNumber = (data) =>{
	return{
		type:CHECK_OLD_PHONE_NUMBER,
		data:data
	}
}
const reduceNewPhoneNumber = (data) =>{
	return{
		type:CHECK_NEW_PHONE_NUMBER,
		data:data
	}
}
/*绑定邮箱*/
const reduceBindMailBoxState = (data) =>{
	return{
		type:SET_BIND_MAIL_BOX_STATE,
		data:data
	}
}
/*发送邮件*/
const reduceSendMailState = (data) =>{
	return{
		type:SEND_MAIL_STATE,
		data:data
	}
}