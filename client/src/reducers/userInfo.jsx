import {
	GET_USER_INFO,/*��ȡ�û���Ϣ*/
	SET_USER_EDIT_MODAL_STATE,/*���ñ༭�û���Ϣģ̬��״̬*/
	GET_DICT_DATA,/*��ȡ�ֵ������*/
	SET_PROVINCE_CODE,/*����ʡ��code,�����˵�*/
	CHECK_MANAGE_NAME,/*��֤ע������*/
	CHECK_MANAGE_ID_CARD,/*��֤ע�����֤*/
	CHECK_MANAGE_MAIL,/*��֤ע������*/
	SHOW_SAVE_STATE,/*��ʾִ��״̬*/
	GET_LAST_LOGIN,/*�ϴε�¼��Ϣ*/
	SET_HEAD_IMAGE_STATE,/*ͷ��ģ̬��*/
	SET_CHANGE_PASSWORD_STATE,/*�޸�����ģ̬��״̬*/
	SET_CHANGE_PHONE_NUMBER_STATE,/*�޸��ֻ���ģ̬��״̬*/
	SET_BIND_MAIL_BOX_STATE,/*������ģ̬��*/
	UPDATE_HEAD_PHOTO,/*ȷ���ϴ�ͷ��*/
	CHECK_CHANGE_OLD_PASSWORD,
	CHECK_CHANGE_NEW_PASSWORD,
	CHECK_CHANGE_INSURE_PASSWORD,
	SET_PASSWORD_STATE,/*����ԭʼ����״̬*/
	CHECK_OLD_PHONE_NUMBER,
	CHECK_NEW_PHONE_NUMBER,
	CHECK_IDENTIFY_CODE,
	GET_OPERATE_HISTORY,/*��ȡ������¼*/
	SEND_MAIL_STATE,/*�����ʼ�״̬*/
} from 'actions/actiontype';
import Config from "codes/config";
/*��ʼ����*/
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
/*��ȡ����*/
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
