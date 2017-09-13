import {
	SET_EDIT_SESSION_MODAL,/*编辑SESSION信息模态框*/
	EDIT_COURSE_INFO,/*编辑课程信息*/
	SET_NEW_COURSE_MODAL_STATE,/*新建培训模态框*/
	SET_SHOW_COURSE_MODAL_STATE,/*coach显示隐藏查看课程详情模态框*/
	SET_ORGANIZATION_CODE,/*设置机构code显示不同教师*/
	SET_COURSE_ID,/*设置当前课程ID*/
	ADD_COURSE_LENGTH,/*增加课程数目*/
	DELETE_COURSE_LENGTH,/*减少课程数目*/
	ADD_CLASS_LENGTH,/*增加课时数目*/
	DELETE_CLASS_LENGTH,/*减少课时数目*/
	SET_EDIT_COURSE_MODAL,/*设置编辑课程模态框*/
	SET_ADD_COURSE_STATE,/*新建课程模态框显示隐藏*/
	CHECK_COURSE_NAME,/*校验课程名称*/
	CHECK_COURSE_PLACE,
	CHECK_COURSE_PHONENUMBER,
	CHECK_SESSION_NAME,/*校验章节名称*/
	CHECK_CLASS_NAME,/*校验课时名称*/
} from './actiontype.jsx';
/*coach显示隐藏查看课程详情模态框*/
export const setShowCourseModalState =(state) =>{
	window._STORE_.dispatch(reduceSetShowCourseModalState(state));
}
/*显示编辑课程模态框*/
export const setCourseModalState = (state) =>{
	window._STORE_.dispatch(reduceSetEditCourseModalState(state));
}
/*显示编辑Session模态框*/
export const setEditSessionModalState = (state) =>{
	window._STORE_.dispatch(reduceSetEditSessionModalState(state));
}
/*显示新建培训模态框*/
export const setNewCourseModalState = (state) =>{
	window._STORE_.dispatch(reduceSetNewCourseModalState(state));
}
/*分配课时设置机构code*/
export const setOrganizationCode = (code) =>{
	window._STORE_.dispatch(reduceSetOrganizationCode(code));
}
/*分配课时设置课程ID*/
export const setCourseID = (courseID) =>{
	window._STORE_.dispatch(reduceSetCourseID(courseID));
}
/*增加课程数目*/
export const addCourseLength = () =>{
	window._STORE_.dispatch(reduceAddCourseLength());
}
/*减少课程数目*/
export const deleteCourseLength = () =>{
	window._STORE_.dispatch(reduceDeleteCourseLength());
}
/*增加课程数目*/
export const addClassLength = () =>{
	window._STORE_.dispatch(reduceAddClassLength());
}
/*减少课程数目*/
export const deleteClassLength = () =>{
	window._STORE_.dispatch(reduceDeleteClassLength());
}
/*添加课程模态框显示隐藏*/
export const setAddCourseModalState = (state) =>{
	window._STORE_.dispatch(reduceSetAddCourseModalState(state));
}
/*校验信息*/
export const setCheckCourseNameState = (state) =>{
	window._STORE_.dispatch(reduceCheckCourseNameState(state));
}
export const setCheckCoursePlaceState = (state) =>{
	window._STORE_.dispatch(reduceCheckCoursePlaceState(state));
}
export const setCheckCoursePhoneNumberState = (state) =>{
	window._STORE_.dispatch(reduceCheckCoursePhoneNumberState(state));
}
export const setCheckSessionNameState = (state) =>{
	window._STORE_.dispatch(reduceCheckSessionNameState(state));
}
export const setCheckClassNameState = (state) =>{
	window._STORE_.dispatch(reduceCheckClassNameState(state));
}


/**************************************************************************************/

/*获取编辑课程信息*/
const reduceSetEditSessionModalState = (data) =>{
	return{
		type:SET_EDIT_SESSION_MODAL,
		data:data
	}
}
/*编辑course信息*/
const reduceAdminEditCourseInfo = (data) =>{
	return{
		type:EDIT_COURSE_INFO,
		data:data
	}
}

/*新建课程模态框*/
const reduceSetNewCourseModalState = (data) =>{
	return{
		type:SET_NEW_COURSE_MODAL_STATE,
		data:data
	}
}
/*设置机构code显示不同教师*/
const reduceSetOrganizationCode = (data) => {
	return{
		type:SET_ORGANIZATION_CODE,
		data:data
	}
}
/*设置当前课程ID*/
const reduceSetCourseID = (data) =>{
	return{
		type:SET_COURSE_ID,
		data:data
	}
}
/*增加课程数目*/
const reduceAddCourseLength = () => {
	return{
		type:ADD_COURSE_LENGTH
	}
}
/*减少课程数目*/
const reduceDeleteCourseLength = () => {
	return{
		type:DELETE_COURSE_LENGTH
	}
}
/*增加课时目*/
const reduceAddClassLength = () => {
	return{
		type:ADD_CLASS_LENGTH
	}
}
/*减少课时数目*/
const reduceDeleteClassLength = () => {
	return{
		type:DELETE_CLASS_LENGTH
	}
}
/*显示编辑课程模态框*/
const reduceSetEditCourseModalState = (data) => {
	return{
		type:SET_EDIT_COURSE_MODAL,
		data:data
	}
}
/*添加课程模态框显示隐藏*/
const reduceSetAddCourseModalState = (data) => {
	return{
		type:SET_ADD_COURSE_STATE,
		data:data
	}
}
/*设置添加课程,章节名称状态*/
const reduceCheckCourseNameState = (data) =>{
	return{
		type:CHECK_COURSE_NAME,
		data:data
	}
}
/*coach显示隐藏查看课程详情模态框*/
const reduceSetShowCourseModalState = (data) =>{
	return{
		type:SET_SHOW_COURSE_MODAL_STATE,
		data:data
	}
}
const reduceCheckCoursePlaceState = (data) =>{
	return{
		type:CHECK_COURSE_PLACE,
		data:data
	}
}
const reduceCheckCoursePhoneNumberState = (data) =>{
	return{
		type:CHECK_COURSE_PHONENUMBER,
		data:data
	}
}

const reduceCheckSessionNameState = (data) => {
	return{
		type:CHECK_SESSION_NAME,
		data:data
	}
}
const reduceCheckClassNameState = (data) => {
	return{
		type:CHECK_CLASS_NAME,
		data:data
	}
}
