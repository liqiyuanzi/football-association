import {
	GET_USER_INFO,/*获取用户信息*/
	SET_USER_EDIT_MODAL_STATE,/*设置编辑用户信息模态框状态*/
	GET_DICT_DATA,/*获取字典表数据*/
	SET_PROVINCE_CODE,/*设置省份code,连动菜单*/
	CHECK_MANAGE_NAME,/*验证注册姓名*/
	CHECK_MANAGE_ID_CARD,/*验证注册身份证*/
	CHECK_MANAGE_MAIL,/*验证注册邮箱*/
	SHOW_SAVE_STATE,/*显示执行状态*/
	GET_LAST_LOGIN,/*上次登录信息*/
	SET_HEAD_IMAGE_STATE,/*头像模态框*/
	SET_CHANGE_PASSWORD_STATE,/*修改密码模态框状态*/
	SET_CHANGE_PHONE_NUMBER_STATE,/*修改手机号模态框状态*/
	SET_BIND_MAIL_BOX_STATE,/*绑定邮箱模态框*/
	UPDATE_HEAD_PHOTO,/*确定上传头像*/
	CHECK_CHANGE_OLD_PASSWORD,
	CHECK_CHANGE_NEW_PASSWORD,
	CHECK_CHANGE_INSURE_PASSWORD,
	SET_PASSWORD_STATE,/*设置原始密码状态*/
	CHECK_OLD_PHONE_NUMBER,
	CHECK_NEW_PHONE_NUMBER,
	CHECK_IDENTIFY_CODE,
	GET_OPERATE_HISTORY,/*获取操作纪录*/
	SEND_MAIL_STATE,/*发送邮件状态*/
} from 'actions/actiontype';
import Config from "codes/config";
/*初始数据*/
const initState = {
	userInfo:"",
	userIndex:"",
	City:"",
	Province:"",
	Gender:"",
	Type:"",
	provinceCode:"",
	checkNameState:true,
	checkIDCardState:true,
	checkMailState:true,
	saveState:"",
	saveContent:"",
	lastLoginInfo:"",
	modalState:false,
	headImageModalState:false,
	changePasswordState:false,
	bindMailBoxState:false,
	changePhoneNumberState:false,
	checkOldPassword:true,
	checkNewPassword:true,
	checkInsurePassword:true,
	passwordState:true,
	checkOldPhoneNumber:true,
	checkNewPhoneNumber:true,
	checkIdentifyCode:"",
	operateHistory:"",
	sendMailState:false,
};
/*获取数据*/
const userInfo = (state=initState,action) => {
	switch(action.type){
		case GET_USER_INFO:
			return Object.assign({}, state, {
				userInfo:action.data ? action.data.UserInfo[1][0] : "",
				userIndex:action.data ? action.data.UserInfo[1][0].userType : "",
				provinceCode:action.data ? action.data.UserInfo[1][0].provinceCode : ""
			});
		case SET_USER_EDIT_MODAL_STATE:
			return Object.assign({}, state, {
				modalState:action.data
			});	
		case GET_DICT_DATA:
			return Object.assign({}, state, {
				City:action.data ? action.data.City :"",
				Province:action.data ? action.data.Province :"",
				Gender:action.data ? action.data.Gender :"",
				Type:action.data ? action.data.Type :""
			});
		case SET_PROVINCE_CODE:
			return Object.assign({}, state, {
				provinceCode:action.data
			});
		case CHECK_MANAGE_NAME:
			return Object.assign({}, state, {
				checkNameState:action.data
			});
		case CHECK_MANAGE_ID_CARD:
			return Object.assign({}, state, {
				checkIDCardState:action.data
			});
		case CHECK_MANAGE_MAIL:
			return Object.assign({}, state, {
				checkMailState:action.data
			});
		case SHOW_SAVE_STATE:
			return Object.assign({}, state, {
				saveState:action.state,
				saveContent:action.content
			});		
		case GET_LAST_LOGIN:
			return Object.assign({}, state, {
				lastLoginInfo:action.data
			});
		case SET_HEAD_IMAGE_STATE:
			return Object.assign({}, state, {
				headImageModalState:action.data
			});
		case SET_CHANGE_PASSWORD_STATE:
			return Object.assign({}, state, {
				changePasswordState:action.data
			});	
		case SET_CHANGE_PHONE_NUMBER_STATE:
			return Object.assign({}, state, {
				changePhoneNumberState:action.data
			});			
		case UPDATE_HEAD_PHOTO:
			return Object.assign({}, state, {
				userInfo:action.data
			});		
		case CHECK_CHANGE_OLD_PASSWORD:
			return Object.assign({}, state, {
				checkOldPassword:action.data
			});
		case CHECK_CHANGE_NEW_PASSWORD:
			return Object.assign({}, state, {
				checkNewPassword:action.data
			});	
		case CHECK_CHANGE_INSURE_PASSWORD:
			return Object.assign({}, state, {
				checkInsurePassword:action.data
			});
		case SET_PASSWORD_STATE:
			return Object.assign({}, state, {
				passwordState:action.data
			});
		case CHECK_OLD_PHONE_NUMBER:
			return Object.assign({}, state, {
				checkOldPhoneNumber:action.data
			});
		case CHECK_NEW_PHONE_NUMBER:
			return Object.assign({}, state, {
				checkNewPhoneNumber:action.data
			});
		case CHECK_IDENTIFY_CODE:
			return Object.assign({}, state, {
				checkIdentifyCode:action.data
			});	
		case GET_OPERATE_HISTORY:
			return Object.assign({}, state, {
				operateHistory:action.data
			});
		case SET_BIND_MAIL_BOX_STATE:
			return Object.assign({}, state, {
				bindMailBoxState:action.data
			});
		case SEND_MAIL_STATE:
			return Object.assign({}, state, {
				sendMailState:action.data
			});			
			
		default:
		  return state;
	}	
}
export default userInfo;
