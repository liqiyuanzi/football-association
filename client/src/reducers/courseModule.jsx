import {
	SET_NEW_COURSE_MODAL_STATE,/*新建培训模态框显示隐藏*/
	GET_USER_COURSE,/*获取用户课程信息*/
	GET_USER_COURSE_DETAIL,/*获取用户课程详细信息*/
	GET_ADMIN_COURSE,/*获取admin全部课程*/
	SET_COURSE_ID,/*设置课程ID*/
	GET_ALL_TEACHER,/*获取全部教师信息*/
	SET_ORGANIZATION_CODE,/*设置机构code,菜单连动*/
	SET_ADD_COURSE_STATE,/*设置添加课程模态框显示隐藏*/
	ADD_CLASS_LENGTH,/*添加课时*/
	DELETE_CLASS_LENGTH,/*删除课时*/
	CHECK_COURSE_NAME,
	CHECK_COURSE_PLACE,
	CHECK_COURSE_PHONENUMBER,
	CHECK_SESSION_NAME,
	CHECK_CLASS_NAME,
	EDIT_COURSE_INFO,/*编辑课程信息*/
	EDIT_SESSION_INFO,/*编辑SESSION信息*/
	SET_EDIT_COURSE_MODAL,/*编辑课程信息模态框显示隐藏*/
	SET_EDIT_SESSION_MODAL,/*编辑SESSION模态框显示隐藏*/
	GET_SELECT_COURSE_INFO,/*coach获取全部课程*/
	SET_SHOW_COURSE_MODAL_STATE,/*coach显示隐藏查看课程模态框*/
} from 'actions/actiontype';

import common from 'codes/common';
import Config from "codes/config";
/*初始数据*/
const initState = {	
	editSessionState:false,
	newCourseState:false,
	editCourseState:false,
	userCourseInfo:"",
	adminCourseInfo:"",
	userCourseDetail:"",
	courseID:"",
	allTeacherInfo:"",
	organizationCode:"",
	courseLength:1,
	modalState:false,
	classLength:0,
	checkCourseName:true,
	checkCoursePlace:true,
	checkCoursePhoneNumber:true,
	checkSessionNameState:true,
	checkClassNameState:[],
	courseInfo:"",
	sessionInfo:"",
	getSelectCourseInfo:"",
	coachGetCourseModalState:false
};
/*聚合coach课程信息*/
const setCourseRelation = (data) =>{
	common.setRelation(data.CourseSession,data.SessionContent,'sessionID','sessionID','sessionContent');
	common.setRelation(data.CourseDetail,data.CourseSession,'courseID','courseID','courseSession');
}
/*聚合admin课程信息*/
const setAdminCourseRelation = (data) =>{
	common.setRelation(data.getCourseSessionByID,data.getSessionContentByID,'sessionID','sessionID','sessionContent');
	common.setRelation(data.getCourseByID,data.getCourseSessionByID,'courseID','courseID','courseSession');
}
/*聚合admin session信息*/
const setAdminSessionRelation = (data) =>{
	
}
/*获取数据*/
const course = (state=initState,action) => {
	switch(action.type){
		case SET_SHOW_COURSE_MODAL_STATE:
			return Object.assign({}, state, {
				coachGetCourseModalState:action.data
			});
		case GET_SELECT_COURSE_INFO:
			return Object.assign({}, state, {
				getSelectCourseInfo:action.data
			});
		case SET_EDIT_SESSION_MODAL:
			return Object.assign({}, state, {
				editSessionState:action.data
			});
		case EDIT_SESSION_INFO:
			return Object.assign({}, state, {
				sessionInfo:action.data
			});		
		/*admin编辑课程信息*/
		case EDIT_COURSE_INFO:
			setAdminCourseRelation(action.data);
			return Object.assign({}, state, {
				courseInfo:action.data
			});
		/*admin编辑课程信息*/	
		case SET_EDIT_COURSE_MODAL:
			return Object.assign({}, state, {
				editCourseState:action.data
			});	
		case SET_NEW_COURSE_MODAL_STATE:
			return Object.assign({}, state, {
				newCourseState:action.data
			});
		case GET_USER_COURSE:
			return Object.assign({}, state, {
				userCourseInfo:action.data ? action.data : ""
			});
		case GET_USER_COURSE_DETAIL:
			/*聚合数据*/
			setCourseRelation(action.data);
			return Object.assign({}, state, {
				userCourseDetail:action.data ? action.data : ""
			});	
		case GET_ADMIN_COURSE:
			return Object.assign({}, state, {
				adminCourseInfo:action.data ? action.data : ""
			});	
		case SET_COURSE_ID:
			return Object.assign({}, state, {
				courseID:action.data
			});
		case GET_ALL_TEACHER:
			return Object.assign({}, state, {
				allTeacherInfo:action.data
			});	
		case SET_ORGANIZATION_CODE:
			return Object.assign({}, state, {
				organizationCode:action.data
			});	
		case SET_ADD_COURSE_STATE:
			return Object.assign({}, state, {
				modalState:action.data
			});
		case ADD_CLASS_LENGTH:
			return Object.assign({}, state, {
				classLength:state.classLength + 1
			});		
		case DELETE_CLASS_LENGTH:
			return Object.assign({}, state, {
				classLength:state.classLength - 1
			});
		case CHECK_COURSE_NAME:
			return Object.assign({}, state, {
				checkCourseName:action.data
			});
		case CHECK_COURSE_PLACE:
			return Object.assign({}, state, {
				checkCoursePlace:action.data
			});
		case CHECK_COURSE_PHONENUMBER:
			return Object.assign({}, state, {
				checkCoursePhoneNumber:action.data
			});		
		case CHECK_SESSION_NAME:
			return Object.assign({}, state, {
				checkSessionNameState:action.data
			});
		case CHECK_CLASS_NAME:
			return Object.assign({}, state, {
				checkClassNameState:action.data
			});		
		default:
		  return state;
	}	
}
export default course;
