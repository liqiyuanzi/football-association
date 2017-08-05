import React , { Component } from 'react'
import * as actions from 'actions/action';
import * as courseActions from 'actions/course';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import SaveTpl from "components/common/saveState"
/*新建课程模态框*/
import NewCourseModal from 'components/admin/newCourse'
/*分配课时模态框*/
import AddCourseModal from 'components/admin/addCourse';
/*课程面板*/
import CoursePanel from 'components/admin/adminCourseInfo'
import {Tab,Tabs,Button}  from 'react-bootstrap';
var isEndData = "(0,1,2)";

class HomeIndex extends Component {
	componentWillMount = () =>{
		var pageIndex =  Number(window.location.hash.substring(1,window.location.hash.length)) 
						 ? Number(window.location.hash.substring(1,window.location.hash.length))
						 : 1
		this.loadPage(pageIndex);
	}
	/**********************新建课程部分**********************************/
	setOrganizationCode = (ev)=>{		
		courseActions.setOrganizationCode(ev.target.value);
	}
	setSaveState(state,content){
		actions.showSaveState(state,content);
	}
	setNewCourseModalState = (state) =>{
		courseActions.setNewCourseModalState(state);
	}
	selectCourse = (key) =>{
		/*设置页码为1*/
		window.location.hash = "1";
		let isEndArray = ['(0,1,2)','(1)','(2)'];
		isEndData = isEndArray[key - 1];
		this.loadPage(1,isEndArray[key - 1]);
	}
	loadPage = (pageIndex,isEnd) =>{
		actions.getPageSqlData( 
			{ Key: "Course", Path: "admin/course/selectCourse.txt" },
			{'isEnd':isEnd ? isEnd : isEndData},
			{'pageIndex':pageIndex ? pageIndex : 1,'pageMaxLength':8,'orderField':"startTime",'sortMethod':'desc'}
			,"reduceAdminCourseInfo"
		);
	}
	/************************分配课时部分*****************************/
	/*设置模态框显示隐藏*/
	setModalState = (state) =>{
		courseActions.setAddCourseModalState(state);
	}
	/*添加课程*/
	addCourse = ()=>{
		courseActions.addCourseLength();
	}
	/*删除课程*/
	deleteCourse = () =>{
		courseActions.deleteCourseLength();
	}
	/*添加课时*/
	addClass = () =>{
		courseActions.addClassLength();
	}
	/*删除课时*/
	deleteClass = () =>{
		courseActions.deleteClassLength();
	}
	/*设置课程id*/
	setCourseID = (courseID) =>{
		courseActions.setCourseID(courseID);
	}
	/*设置机构code*/
	setOrganizationCode = (code) =>{
		courseActions.setOrganizationCode(code);
	}
	/*************************************编辑课程信息********************************/
	/*获取课程信息*/
	getCourseInfo = (courseID) =>{
		this.context.router.push({pathname:"/nav/courseManagement/editCourse",query:{courseID:courseID}});	
	}
	/*显示弹出框*/
	setEditModalState = (state) =>{
		courseActions.setCourseModalState(state);
	}
	render(){
		return (
			<div className="clear">
				<NewCourseModal 
					setNewCourseModalState = {this.setNewCourseModalState}
					userInfo = {this.props.userInfo}
					checkCourseName = {this.props.checkCourseName}
					checkCoursePlace = {this.props.checkCoursePlace}
					setSaveState = {this.setSaveState}
					checkCoursePhoneNumber= {this.props.checkCoursePhoneNumber}
					state = {this.props.newCourseState}
					allTeacherInfo = {this.props.allTeacherInfo}
					Level = {this.props.Level}
					Organization = {this.props.Organization}
					loadPage = {this.loadPage}
				/>
				<SaveTpl saveState={this.props.saveState} saveContent={this.props.saveContent}/>
				<AddCourseModal 
					courseID = {this.props.courseID}
					setSaveState = {this.setSaveState}
					setModalState={this.setModalState} 
					state={this.props.modalState} 
					classLength = {this.props.classLength}
					allTeacherInfo = {this.props.allTeacherInfo}
					organizationCode = {this.props.organizationCode}
					addClass = {this.addClass}
					deleteClass = {this.deleteClass}
					checkClassNameState = {this.props.checkClassNameState}
					checkSessionNameState = {this.props.checkSessionNameState}
				/>
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.selectCourse}>
					<Tab onClick={this.selectCourse.bind(this,'(0,1,2)')} eventKey={1} title="全部"></Tab>
					<Tab onClick={this.selectCourse.bind(this,'(1)')} eventKey={2} title="进行中"></Tab>
					<Tab onClick={this.selectCourse.bind(this,'(2)')} eventKey={3} title="已完成"></Tab>
				</Tabs>
				<Button bsStyle="success new-button" onClick={this.setNewCourseModalState.bind(this,true)}>新建培训课程</Button>
				<CoursePanel
					setOrganizationCode = {this.setOrganizationCode}
					setCourseID = {this.setCourseID}
					adminCourseInfo = {this.props.adminCourseInfo}
					loadPage = {this.loadPage}
					setModalState = {this.setModalState}
					getCourseInfo = {this.getCourseInfo}
					setEditModalState = {this.setEditModalState}
				/>
			</div>
		)	
	}
}
HomeIndex.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	saveState:state.userInfo.saveState,
	saveContent:state.userInfo.saveContent,
	userInfo:state.userInfo.userInfo,
	/*新建课程*/
	adminCourseInfo:state.courseModule.adminCourseInfo,
	allTeacherInfo:state.courseModule.allTeacherInfo,
	checkCourseName:state.courseModule.checkCourseName,
	checkCoursePlace:state.courseModule.checkCoursePlace,
	checkCoursePhoneNumber:state.courseModule.checkCoursePhoneNumber,
	Level:state.userInfo.Level,
	Organization:state.userInfo.Organization,
	newCourseState:state.courseModule.newCourseState,
	isEnd:state.courseModule.adminCourseIsEnd,
	/*分配课时内容*/
	modalState:state.courseModule.modalState,
	classLength:state.courseModule.classLength,
	organizationCode:state.courseModule.organizationCode,
	checkClassNameState:state.courseModule.checkClassNameState,
	checkSessionNameState:state.courseModule.checkSessionNameState,
	courseID:state.courseModule.courseID,
	/*编辑课程信息*/
	courseInfo:state.courseModule.courseInfo,
	editCourseState:state.courseModule.editCourseState,
});
module.exports =  connect(mapStateToProps,null)(HomeIndex);
