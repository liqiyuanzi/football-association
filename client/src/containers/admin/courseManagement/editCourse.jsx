import React , { Component } from 'react'
import * as actions from 'actions/action';
import * as courseActions from 'actions/course';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import {Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import ConfirmModal from "components/common/confirmModal";
import DateTpl from "components/common/editDate"; 
import checkInfo from 'codes/checkInfo'
import SaveTpl from "components/common/saveState"
import EditSessionModal from 'components/admin/editSession';

class EditCourse extends Component {
	constructor(props) {
		super(props);
		this.state={
			courseCaption : "",
			courseLevel :  "",
			coursePlace : "",
			courseOrganization :  "",
			courseStartTime :  "",
			courseEndTime :  "",
			coursePhoneNumber : "",
			deleteSessionID : "",
		}
	}
	setFormState = () =>{
		this.setState({
			courseCaption : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].caption : "",
			courseLevel : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].levelCode : "",
			coursePlace : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].place : "",
			courseOrganization : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].organizationCode : "",
			courseStartTime : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].startTime : "",
			courseEndTime : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].endTime : "",
			coursePhoneNumber : this.props.courseInfo.getCourseByID ? this.props.courseInfo.getCourseByID[0].phoneNumber : ""
		})
	}
	setCourseCaption = (ev) =>{
		this.setState({
			courseCaption:ev.target.value
		})
	}
	setCourseLevel = (ev) =>{
		this.setState({
			courseLevel:ev.target.value
		})
	}
	setCoursePlace = (ev) =>{
		this.setState({
			coursePlace:ev.target.value
		})
	}
	setOrganization = (ev) =>{
		this.setState({
			courseOrganization:ev.target.value
		})
		courseActions.setOrganizationCode(ev.target.value);
	}
	setStartTime = (ev) =>{
		var time = this.setTime(ev);
		this.setState({
			courseStartTime:time
		})
	}
	setEndTime = (ev) => {
		var time = this.setTime(ev);
		this.setState({
			courseEndTime:time
		})
	}
	setTime = (ev) =>{
		var month = ev._d.getMonth() + 1;
		var date = ev._d.getDate();
		var hours = ev._d.getHours();
		var minutes = ev._d.getMinutes();
		var seconds = ev._d.getSeconds()
		if(month < 10){
			month = "0" + month;
		}
		if(date < 10){
			date = "0" + date;
		}
		if(hours < 10){
			hours = "0" + hours;
		}
		if(minutes < 10){
			minutes = "0" + minutes;
		}
		if(seconds < 10){
			seconds = "0" + seconds;
		}
		var time = ev._d.getFullYear() + 
					"-" + month + 
					"-" + date + 
					" " + hours+
					":" + minutes+
					":" + seconds
		return time;			
	}
	setCoursePhoneNumber = (ev) =>{
		this.setState({
			coursePhoneNumber:ev.target.value
		})
	}
	componentWillMount = () =>{
		this.getCourseInfo();
	}
	getCourseInfo = () =>{
		var courseID = window.location.search ? window.location.search.split("=")[1] : ""; 
		actions.getSqlData( 
			[
				{ Key: "getCourseByID", Path: "admin/course/getCourseByID.txt" },
				{ Key: "getCourseSessionByID", Path: "admin/course/getCourseSessionByID.txt" },
				{ Key: "getSessionContentByID", Path: "admin/course/getSessionContentByID.txt" }
			],
			{'courseID':courseID}
			,"reduceAdminEditCourseInfo",
			(data)=>{
				this.setFormState();
			}
		);
	}
	/*设置模态框显示隐藏*/
	setModalState = (state) =>{
		courseActions.setEditSessionModalState(state);
	}
	setSaveState(state,content){
		actions.showSaveState(state,content);
	}
	saveCourse = () =>{
		checkInfo.checkNewCourseInfo.saveEditCourseInfo((state)=>{
			if(state == 'success'){
				/*重新加载列表*/
				this.setSaveState("success","保存成功");
				this.context.router.replace("/nav/courseManagement/course");	
			}else{
				this.setSaveState("success","保存失败");
			}
		})
	}
	/*编辑章节信息*/
	editSessionInfo = (sessionID) =>{
		actions.getSqlData( 
			[
				{ Key: "getSession", Path: "admin/course/getSession.txt" },
				{ Key: "getSessionContent", Path: "admin/course/getSessionContent.txt" }
			],
			{'sessionID':sessionID}
			,"reduceAdminEditSessionInfo",
			(data)=>{
				this.setModalState(true);
			}
		);
	}
	/*删除课程*/
	deleteSession = (sessionID) =>{
		this.setState({
			deleteSessionID:sessionID
		},()=>{
			this.setConfirmModalState(true);
		})
		
	}
	insureOperate = () =>{
		actions.getSqlData( 
			[
				{ Key: "DeleteSessionByID", Path: "admin/course/deleteSessionByID.txt" }
			],
			{'sessionID':this.state.deleteSessionID}
			,"",
			(data)=>{
				/*显示删除成功弹出框*/
				if(data.DeleteSessionByID){
					this.getCourseInfo();
					this.setSaveState("success","删除成功");
					actions.setConfirmModalState(false);
				}else{
					this.setSaveState("error","删除失败");
				}
			}
		);
	}
	setConfirmModalState = (state) =>{
		actions.setConfirmModalState(state);
	}
	render(){	
		var levelArray = [],
			organizationArray = [],
			teacherArray = [],
			courseArray = [];
		
		if(this.props.Level){
			levelArray = this.props.Level.map((obj)=>{
				return(
					<option value={obj.code}>
						{obj.caption}
					</option>
				)
			});
			organizationArray = this.props.Organization.map((obj)=>{
				return(
					<option value={obj.code}>
						{obj.caption}
					</option>
				)
			});		
		}
		if(this.props.allTeacherInfo){
			teacherArray = this.props.allTeacherInfo.GetTeacher.map((obj)=>{
				return(
					<option value={obj.id}>
						{obj.userName}
					</option>
				)
			})
		}
		if(this.props.courseInfo.getCourseByID){
			var courseObj = this.props.courseInfo.getCourseByID[0].courseSession;
			if(courseObj){
				for(var j = 0; j < courseObj.length; j++){
					var sessionCaption = courseObj[j].sessionCaption;
					var teacherID = courseObj[j].teacherID;
					var sessionBeginTime = courseObj[j].beginTime;
					var sessionEndTime = courseObj[j].endTime;
					
					courseArray.push(
						<div className="class-content">
							{
								<span className="delete" onClick={this.deleteSession.bind(this,courseObj[j].sessionID)}>×</span>
							}
							<FormGroup controlId="formInlineName">
								<ControlLabel>章节名称：</ControlLabel>
								{' '}
								<FormControl disabled="disabled" className="sessionContent" value={sessionCaption} type="text" placeholder="请输入培训标题内容" />
							</FormGroup>
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>讲师：</ControlLabel>
								{' '}
								<FormControl disabled="disabled" name="teacher" id="teacher" value={teacherID} componentClass="select" placeholder="select">
									{teacherArray}
								</FormControl>
							</FormGroup>
							<div className="date-div">
								<ControlLabel>课程时间：</ControlLabel>
								{' '}
								<FormControl disabled="disabled"  value={sessionBeginTime} type="text" />
								<span className="connect-span"> ~ </span>
								{' '}
								<FormControl disabled="disabled"  value={sessionEndTime} type="text" />
							</div>	
							<div className="distribution-class">
								<Button bsStyle="info distribution-button" onClick={this.editSessionInfo.bind(this,courseObj[j].sessionID)}>编辑课程</Button>
							</div>	
						</div>	
					)
				}
			}else{
				courseArray.push(
					<div className="no-data">暂无课程数据</div>
				)
			}	
		}
		return (
			<div className="course-edit-panel clear">
				<div className="title">
					编辑培训课程
				</div>
				<EditSessionModal 
					sessionInfo = {this.props.sessionInfo}
					setModalState = {this.setModalState}
					state = {this.props.editSessionState}
					allTeacherInfo = {this.props.allTeacherInfo}
					checkClassNameState = {this.props.checkClassNameState}
					checkSessionNameState = {this.props.checkSessionNameState}
					setSaveState = {this.setSaveState}
					getCourseInfo = {this.getCourseInfo}
				/>
				<SaveTpl saveState={this.props.saveState} saveContent={this.props.saveContent}/>
				<ConfirmModal
					confirmOperate  = {this.insureOperate}
					setConfirmModalState = {this.setConfirmModalState}
					state = {this.props.confirmModalState}
					info = {"删除该条目"}
				/>
				<Form inline>
					<FormGroup controlId="formInlineName">
						<ControlLabel>培训内容：</ControlLabel>
						{' '}
						<FormControl  id="courseCaption" onChange={this.setCourseCaption} onBlur={checkInfo.checkNewCourseInfo.checkCourseName} value={this.state.courseCaption} type="text" placeholder="请输入培训标题内容" />
					</FormGroup>
			
					<FormGroup controlId="formInlineEmail">
						<ControlLabel>培训级别：</ControlLabel>
						{' '}
						<FormControl  id="courseLevel" onChange={this.setCourseLevel} value={this.state.courseLevel} componentClass="select" placeholder="select" >
							{levelArray}
						</FormControl>
					</FormGroup>
					<div className="error-div">
						{!this.props.checkCourseName ? "! 培训内容不能为空" : ""}
					</div>
					<FormGroup controlId="formInlineName">
						<ControlLabel>培训地点：</ControlLabel>
						{' '}
						<FormControl id="coursePlace" onChange={this.setCoursePlace} onBlur={checkInfo.checkNewCourseInfo.checkCoursePlace} value={this.state.coursePlace} type="text" placeholder="请输入培训标题内容" />
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>培新机构：</ControlLabel>
						{' '}
						<FormControl id="courseOrganization" onChange={this.setOrganization} value={this.state.courseOrganization} onChange={this.setOrganization} componentClass="select" placeholder="select">
							{organizationArray}
						</FormControl>
					</FormGroup>
					<div className="error-div">
						{!this.props.checkCoursePlace ? "! 培训地点不能为空" : ""}
					</div>
					<FormGroup controlId="formInlineName">
						<ControlLabel>联系电话：</ControlLabel>
						{' '}
						<FormControl id="coursePhoneNumber" onChange={this.setCoursePhoneNumber} onBlur={checkInfo.checkNewCourseInfo.checkCoursePhoneNumber} value={this.state.coursePhoneNumber} type="text" placeholder="请输入培训标题内容" />
					</FormGroup>
					<div className="error-div">
						{!this.props.checkCoursePhoneNumber ? "! 联系电话格式错误" : ""}
					</div>
					<div className="date-div">
						<ControlLabel>培训时间：</ControlLabel>
						{' '}
						<DateTpl dateTime={this.state.courseStartTime} onChange={this.setStartTime}/>
						<span className="connect-span"> ~ </span>
						{' '}
						<DateTpl dateTime={this.state.courseEndTime} onChange={this.setEndTime}/>
					</div>
					<div className="save-button">									
						<Button bsStyle="primary" onClick={this.saveCourse}>保存</Button>
					</div>	
					<div className="title-h2">课程内容</div>
					{
						courseArray
					}	
				</Form>
				
			</div>
		)	
	}
}
EditCourse.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	saveState:state.userInfo.saveState,
	saveContent:state.userInfo.saveContent,
	editSessionState:state.courseModule.editSessionState,
	sessionInfo:state.courseModule.sessionInfo,
	checkClassNameState:state.courseModule.checkClassNameState,
	checkSessionNameState:state.courseModule.checkSessionNameState,
	allTeacherInfo:state.courseModule.allTeacherInfo,
	modalState:state.courseModule.modalState,
	organizationCode:state.courseModule.organizationCode,
	Level:state.userInfo.Level,
	Organization:state.userInfo.Organization,
	confirmModalState:state.userInfo.confirmModalState,
	courseInfo:state.courseModule.courseInfo,
	editCourseState:state.courseModule.editCourseState,
	checkCourseName:state.courseModule.checkCourseName,
	checkCoursePlace:state.courseModule.checkCoursePlace,
	checkCoursePhoneNumber:state.courseModule.checkCoursePhoneNumber,
});
module.exports =  connect(mapStateToProps,null)(EditCourse);
