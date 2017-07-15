import {
	GET_USER_TYPE,
	LOGIN_ERROR_MSG
} from 'actions/actiontype';
import Config from "codes/config";
/*初始数据*/
const initState = {
	userType:false,
	errMsg:""
};
/*获取数据*/
const login = (state=initState,action) => {
	switch(action.type){
		case GET_USER_TYPE:
			return Object.assign({}, state, {
				userType:action.data
			});
		case LOGIN_ERROR_MSG:
			return Object.assign({}, state, {
				errMsg:action.data
			});	
		default:
		  return state;
	}	
}
export default login;
