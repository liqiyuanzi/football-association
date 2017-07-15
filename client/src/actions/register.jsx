import Config from "codes/config"
let timer = "";
let timerNum = Config.DefaultCodeTime;
import{
	SHORT_MESSAGE_DATA,/*短信内容*/
	SHORT_MESSAGE_STATE,/*短信发送状态*/
	SHORT_MESSAGE_TIME,/*短信剩余时间*/
	CHECK_NAME,/*验证注册姓名*/
	CHECK_ID_CARD,/*验证注册身份证*/
	CHECK_MAIL,/*验证注册邮箱*/
	CHECK_PASSWORD,/*验证注册密码*/
	CHECK_INSURE_PASSWORD,/*验证注册确认密码*/
	CHECK_PHONE_NUMBER,/*验证注册电话*/
	CHECK_IDENTIFY_INFO,/*验证码*/
} from './actiontype.jsx';
/*校验注册内容*/
export const setMessageState = (randomCode) =>{
	window._STORE_.dispatch(reduceMessageState(true));
	getTime();
	window._STORE_.dispatch(reduceMessageData(randomCode));
}
export const setMessageData = () =>{
	clearInterval(timer);
	timerNum = Config.DefaultCodeTime;
	/*时间恢复默认值*/
	window._STORE_.dispatch(reduceSurplusTime(timerNum));
	/*验证码发送状态变为未发送*/
	window._STORE_.dispatch(reduceMessageState(undefined));
	/*验证码清空*/
	window._STORE_.dispatch(reduceMessageData(""));
}
export const getTime = () =>{
	timer = setInterval(() =>{
		timerNum 
		? (() =>{
			timerNum -- ;
			window._STORE_.dispatch(reduceSurplusTime(timerNum))	
		})()
		: (() =>{
			clearInterval(timer);
			timerNum = Config.DefaultCodeTime;
			window._STORE_.dispatch(reduceMessageState(false));
			window._STORE_.dispatch(reduceMessageData(""));
		})();
	},1000);
}
/*注册信息*/
export const registerInfo = (sqlPath,sqlDetail,callback) =>{
	let data = JSON.stringify({'sqlPath':sqlPath,'sqlDetail':sqlDetail});
    $.ajax({
        url: 'http://127.0.0.1:3000/register',
        dataType: "text",
        jsonpCallback: 'callback',
        data: {'data':data},
        method: 'POST',
        success: function (data) {
            callback(data); 
        },
        error: function (xhr, status, error) {
            callback(error); 
        }
    });
}
export const checkName = (state) =>{
	window._STORE_.dispatch(reduceCheckName(state))
}
export const checkIDCard = (state) =>{
	window._STORE_.dispatch(reduceCheckIDCard(state))
}
export const checkMail = (state) =>{
	window._STORE_.dispatch(reduceCheckMail(state))
}
export const checkPassword = (state) =>{
	window._STORE_.dispatch(reduceCheckPassword(state))
}
export const checkInsurePassword = (state) =>{
	window._STORE_.dispatch(reduceCheckInsurePassword(state))
}
export const checkPhoneNumber = (state) =>{
	window._STORE_.dispatch(reduceCheckPhoneNumber(state))
}
export const checkIdentifyCode = (info) =>{
	window._STORE_.dispatch(reduceCheckIndetifyCode(info))
}
/****************************************************************************************/
const reduceMessageData = (randomCode) =>{
	return{
		type:SHORT_MESSAGE_DATA,
		data:randomCode
	}
}
const reduceMessageState = (state) =>{
	return{
		type:SHORT_MESSAGE_STATE,
		data:state
	}
}
const reduceSurplusTime = (time) =>{
	return{
		type:SHORT_MESSAGE_TIME,
		data:time
	}
}
/*验证注册信息*/
const reduceCheckName = (state) =>{
	return{
		type:CHECK_NAME,
		data:state
	}
}
const reduceCheckIDCard = (state) =>{
	return{
		type:CHECK_ID_CARD,
		data:state
	}
}
const reduceCheckMail = (state) =>{
	return{
		type:CHECK_MAIL,
		data:state
	}
}
const reduceCheckPassword = (state) =>{
	return{
		type:CHECK_PASSWORD,
		data:state
	}
}
const reduceCheckInsurePassword = (state) =>{
	return{
		type:CHECK_INSURE_PASSWORD,
		data:state
	}
}
const reduceCheckPhoneNumber = (state) =>{
	return{
		type:CHECK_PHONE_NUMBER,
		data:state
	}
}
const reduceCheckIndetifyCode = (info) =>{
	return{
		type:CHECK_IDENTIFY_INFO,
		data:info
	}
}