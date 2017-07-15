import {
	GET_USER_COURSE,
	GET_USER_COURSE_DETAIL,
	SET_COURSE_ID
} from 'actions/actiontype';

import common from 'codes/common';
import Config from "codes/config";
/*��ʼ����*/
const initState = {
	userCourseInfo:"",
	userCourseDetail:"",
	courseID:""
};
const setCourseRelation = (data) =>{
	common.setRelation(data.CourseSession,data.SessionContent,'sessionID','sessionID','sessionContent');
	common.setRelation(data.CourseDetail,data.CourseSession,'courseID','courseID','courseSession');
}
/*��ȡ����*/
const course = (state=initState,action) => {
	switch(action.type){
		case GET_USER_COURSE:
			return Object.assign({}, state, {
				userCourseInfo:action.data ? action.data : ""
			});
		case GET_USER_COURSE_DETAIL:
			/*�ۺ�����*/
			setCourseRelation(action.data);
			return Object.assign({}, state, {
				userCourseDetail:action.data ? action.data : ""
			});	
		case SET_COURSE_ID:
			return Object.assign({}, state, {
				courseID:action.data
			});	
		default:
		  return state;
	}	
}
export default course;
