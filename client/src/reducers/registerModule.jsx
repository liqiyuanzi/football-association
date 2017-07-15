import Config from "codes/config"
import {
	SHORT_MESSAGE_DATA,
	SHORT_MESSAGE_STATE,
	SHORT_MESSAGE_TIME,
	CHECK_NAME,
	CHECK_ID_CARD,
	CHECK_MAIL,
	CHECK_PASSWORD,
	CHECK_INSURE_PASSWORD,
	CHECK_PHONE_NUMBER,
	CHECK_IDENTIFY_INFO
} from 'actions/actiontype';
/*初始数据*/
const initState = {
	messageData:"",
	messageState:undefined,
	messageTime:Config.DefaultCodeTime,
	checkNameState:true,
	checkIDCardState:true,
	checkMailState:true,
	checkPasswordState:true,
	checkInsurePasswordState:true,
	checkPhoneNumberState:true,
	checkIdentifyCodeInfo:""
};
/*获取数据*/
const register = (state=initState,action) => {
	switch(action.type){
		case SHORT_MESSAGE_DATA:
			return Object.assign({}, state, {
				messageData:action.data
			});
		case SHORT_MESSAGE_STATE:
			return Object.assign({}, state, {
				messageState:action.data
			});	
		case SHORT_MESSAGE_TIME:
			return Object.assign({}, state, {
				messageTime:action.data
			});	
		case CHECK_NAME:
			return Object.assign({}, state, {
				checkNameState:action.data
			});
		case CHECK_ID_CARD:
			return Object.assign({}, state, {
				checkIDCardState:action.data
			});
		case CHECK_MAIL:
			return Object.assign({}, state, {
				checkMailState:action.data
			});
		case CHECK_PASSWORD:
			return Object.assign({}, state, {
				checkPasswordState:action.data
			});
		case CHECK_INSURE_PASSWORD:
			return Object.assign({}, state, {
				checkInsurePasswordState:action.data
			});
		case CHECK_PHONE_NUMBER:
			return Object.assign({}, state, {
				checkPhoneNumberState:action.data
			});	
		case CHECK_IDENTIFY_INFO:
			return Object.assign({}, state, {
				checkIdentifyCodeInfo:action.data
			});	
		default:
		  return state;
	}	
}
export default register;