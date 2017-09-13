import Config from "codes/config"

import {
	GET_USER_TYPE,/*提交登录表单*/
	LOGIN_ERROR_MSG,/*登录错误提示*/
	GET_USER_INFO,/*获取用户信息*/
	GET_DICT_DATA,/*获取字典表数据*/
	SHOW_SAVE_STATE,/*显示执行状态*/
	GET_LAST_LOGIN,/*显示上次登录信息*/
	GET_OPERATE_HISTORY,/*获取操作纪录*/
	GET_USER_COURSE,/*获取用户已报名课程信息*/
	GET_USER_COURSE_DETAIL,/*获取课程信息详情*/
	GET_ADMIN_COURSE,/*获取admin课程信息*/
	SET_COURSE_ID,/*设置课程id*/
	GET_ALL_TEACHER,/*admin获取全部教师*/
	EDIT_COURSE_INFO,/*编辑课程信息*/
	EDIT_SESSION_INFO,/*编辑章节信息*/
	CONFIRM_MODAL_STATE,/*确定弹出框*/
	GET_SELECT_COURSE_INFO,/*获取coach选课信息*/
	GET_ADMIN_CHART_DATA,/*获取admin 分析报告*/
} from './actiontype.jsx';
export const getLoginData = (userData,callback) => {
	 $.ajax({
        url: Config.ServerUrl + 'login',
        dataType: "text",
        jsonpCallback: 'callback',
        data: userData,
        method: 'POST',
        success: function (data) {
            callback(data); 
        },
        error: function (xhr, status, error) {
            callback("用户名密码错误!"); 
        }
    });
}
export const getUserType = (type) =>{
	window._STORE_.dispatch(reduceUserType(type));
}
export const checkAutoLogin = (callback) =>{
	$.ajax({
        url: Config.ServerUrl + 'checkAutoLogin',
        dataType: "text",
        jsonpCallback: 'callback',
        method: 'POST',
        success: function (data) {
            callback(data); 
        },
        error: function (xhr, status, error) {
            callback(error); 
        }
    });	
}
/*
	sqlPath:sql路径,从sql算起,
	sqlDetail:替换字符串内容,键值对形式
	loadModule:执行完成后reducer到哪个模块,
	callback:回调
*/
export const getSqlData = (sqlPath,sqlDetail,loadModule,callback) =>{
	let data = JSON.stringify({'sqlPath':sqlPath,'sqlDetail':sqlDetail});
    $.ajax({
        url: Config.ServerUrl + 'sql',
        dataType: "text",
        jsonpCallback: 'callback',
        data: {'data':data},
        method: 'POST',
        success: function (data) {
			/*sql数据dispatch到loadModule模块执行*/
			if(loadModule){
				window._STORE_.dispatch(eval(loadModule+"("+data+")"));
			}
			if(callback){
				callback(JSON.parse(data));
			}
        },
        error: function (xhr, status, error) {
			if(loadModule){
				window._STORE_.dispatch(eval(loadModule+"()"));
			}
        }
    });
}
/*获取分页sql数据
	sqlPath:{ Key: "Key", Path: "sqlPath" },
	sqlDetail:{'x':"xxx",'y':"yyy"},
	pageInfo:{'pageIndex':2,'pageMaxLength':10,'orderField':"loginTime",'sortMethod':'desc'}
	pageIndex:页码,
	pageMaxLength:每页显示条目,名称不可变
	orderField:排序字段,
	sortMethod:排序方法
*/
export const getPageSqlData = (sqlPath,sqlDetail,pageInfo,loadModule) =>{
	let data = JSON.stringify({'sqlPath':sqlPath,'sqlDetail':sqlDetail,'pageInfo':pageInfo});
    $.ajax({
        url: Config.ServerUrl + 'getPageSql',
        dataType: "text",
        jsonpCallback: 'callback',
        data: {'data':data},
        method: 'POST',
        success: function (data) {
			/*sql数据dispatch到loadModule模块执行*/
			if(loadModule){
				window._STORE_.dispatch(eval(loadModule+"("+data+")"));
			}
        },
        error: function (xhr, status, error) {
			if(loadModule){
				window._STORE_.dispatch(eval(loadModule+"()"));
			}
        }
    });
}
/*显示保存状态*/
export const showSaveState = (state,content) =>{
	window._STORE_.dispatch(reduceSaveState(state,content));
	setTimeout(()=>{
		window._STORE_.dispatch(reduceSaveState("",""));
	},1500);
}
/*设置错误消息*/
export const setErrorMsg = (errMsg) =>{
	window._STORE_.dispatch(reduceErrorMsg(errMsg));
}
/*设置课程id*/
export const setCourseID = (courseID) =>{
	window._STORE_.dispatch(reduceSetCourseID(courseID));
}
export const setConfirmModalState = (state) =>{
	window._STORE_.dispatch(reduceSetConfirmModalState(state));
} 
/************************************************************************************************************************/
/*提交账号密码*/
const reduceUserType = (data) => {
	return{
		type:GET_USER_TYPE,
		data:data
	}
}
/*显示密码错误*/
const reduceErrorMsg = (errMsg) => {
	return{
		type:LOGIN_ERROR_MSG,
		data:errMsg
	}
}
/*获取用户信息*/
const reduceUserInfo = (data) => {
	return{
		type:GET_USER_INFO,
		data:data
	}
}
/*获取字典表数据*/
const reduceDictData = (data) => {
	return{
		type:GET_DICT_DATA,
		data:data
	}
}
/*显示执行状态*/
const reduceSaveState = (state,content) => {
	return{
		type:SHOW_SAVE_STATE,
		state:state,
		content:content
	}
}
/*显示上次登录信息*/
const reduceLastLoginInfo =(data) =>{
	return{
		type:GET_LAST_LOGIN,
		data:data
	}
}
/*获取操作纪录*/
const reduceOperateHistory = (data) =>{
	return{
		type:GET_OPERATE_HISTORY,
		data:data
	}
} 
/*获取课程信息*/ 
const reduceUserCourseInfo = (data) =>{
	return{
		type:GET_USER_COURSE,
		data:data
	}
}
/*获取课程信息详情*/ 
const reduceUserCourseDetail = (data) =>{
	return{
		type:GET_USER_COURSE_DETAIL,
		data:data
	}
}
/*获取admin全部信息*/
const reduceAdminCourseInfo = (data) =>{
	return{
		type:GET_ADMIN_COURSE,
		data:data
	}
}
/*设置课程ID*/
const reduceSetCourseID = (data) =>{
	return{
		type:SET_COURSE_ID,
		data:data
	}
}
/*admin获取全部教师,用于新建课程指定教师*/
const reduceAllTeacher = (data) =>{
	return{
		type:GET_ALL_TEACHER,
		data:data
	}
}
/*编辑课程信息*/
const reduceAdminEditCourseInfo = (data) =>{
	return{
		type:EDIT_COURSE_INFO,
		data:data
	}
}
/*编辑章节信息*/
const reduceAdminEditSessionInfo = (data) =>{
	return{
		type:EDIT_SESSION_INFO,
		data:data
	}
}
/*设置确定模态框状态*/
const reduceSetConfirmModalState = (data) =>{
	return{
		type:CONFIRM_MODAL_STATE,
		data:data
	} 
}
/*coach获取选课信息*/
const reduceGetSelectCourseInfo = (data) =>{
	return{
		type:GET_SELECT_COURSE_INFO,
		data:data
	} 
}
/*获取admin分析报告*/
const reduceChartData = (data) =>{
	return{
		type:GET_ADMIN_CHART_DATA,
		data:data
	} 
}
