
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from 'codes/checkInfo'
import DateTpl from "components/common/date"; 
import Config from "codes/config"

class Manage extends Component {
	setModalState =()=>{
		this.props.setNewCourseModalState(false);
	}
	saveNewCourse = () =>{
		checkInfo.checkNewCourseInfo.saveNewCourseInfo((state)=>{
			if(state == 'success'){
				/*重新加载列表*/
				this.props.loadPage(1);
				this.props.setSaveState("success","保存成功");
				this.props.setNewCourseModalState(false);
			}else{
				this.props.setSaveState("success","保存失败");
			}
		})
	}
	render(){
		var levelArray = [],organizationArray = [],teacherArray = [];
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
				if(obj.organization == this.props.organizationCode){
					return(
						<option value={obj.id}>
							{obj.userName}
						</option>
					)
				}
			})
			let nullFlag = true;
			for(var i = 0;i < teacherArray.length;i ++){
				if(teacherArray[i]){
					nullFlag = false;
				}
				if(i == teacherArray.length - 1 && nullFlag){
					teacherArray = <option>暂无教师数据</option>
				}
			}
		}
		return (
			<Modal show={this.props.state}   backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton >
					<Modal.Title>新建培训课程</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div className="new-course-modal">
						<Form inline>
							<FormGroup controlId="formInlineName">
								<ControlLabel>培训内容：</ControlLabel>
								{' '}
								<FormControl onBlur={checkInfo.checkNewCourseInfo.checkCourseName} id="courseName" type="text" placeholder="请输入培训标题内容" />
							</FormGroup>
							<FormGroup controlId="formInlineEmail">
								<ControlLabel>培训级别：</ControlLabel>
								{' '}
								<FormControl  name="level" id="courseLevel" defaultValue={this.props.userInfo.provinceCode} componentClass="select" placeholder="select" >
									{levelArray}
								</FormControl>
							</FormGroup>
							<div className="error-div">
								{!this.props.checkCourseName ? "! 培训内容不能为空" : ""}
							</div>
					
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>培新地点：</ControlLabel>
								{' '}
								<FormControl  id="coursePlace" onBlur={checkInfo.checkNewCourseInfo.checkCoursePlace} placeholder="请输入培训地点"/>
							</FormGroup>
							
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>培新机构：</ControlLabel>
								{' '}
								<FormControl  id="courseOrganization" componentClass="select" placeholder="select">
									{organizationArray}
								</FormControl>
							</FormGroup>
							<div className="error-div">
								{!this.props.checkCoursePlace ? "! 培训地点不能为空" : ""}
							</div>
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>联系电话：</ControlLabel>
								{' '}
								<FormControl id="coursePhoneNumber" onBlur={checkInfo.checkNewCourseInfo.checkCoursePhoneNumber} placeholder="请输入联系电话"/>
							</FormGroup>
							<div className="error-div">
								{!this.props.checkCoursePhoneNumber ? "! 联系电话格式错误" : ""}
							</div>
							<div className="date-div">
								<ControlLabel>培训时间：</ControlLabel>
								{' '}
								<DateTpl />
								<span className="connect-span"> ~ </span>
								{' '}
								<DateTpl />
							</div>	
						</Form>
					</div>	
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.saveNewCourse}>保存</Button>
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Manage;
