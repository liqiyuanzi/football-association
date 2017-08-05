
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from 'codes/checkInfo'
import DateTpl from "components/common/date"; 

class AddCourseModal extends Component {
	setModalState =()=>{
		this.props.setModalState(false);
	}
	addClass = () =>{
		this.props.addClass();
	}
	deleteClass = () =>{
		this.props.deleteClass();
	}
	saveManageInfo =()=>{
		checkInfo.checkAddCourseInfo.saveAddCourseInfo(this.props.courseID,(state)=>{
			if(state == "success"){
				this.setModalState();
				this.props.setSaveState("success","保存成功");
			}else{
				this.props.setSaveState("error","保存失败");
			}
		});
	}
	render(){
		let classArray = [],teacherArray = [];
		for(var i = 0; i < this.props.classLength; i++){
			classArray.push(
				<div className="class-content">
					<div>
						<FormGroup className="class-name" controlId="formInlineName">
							<FormControl className="session-content"  type="text" placeholder="请输入课时名称" />
						</FormGroup>
						<FormGroup className="class-name begin-time" controlId="formInlineName">
							<DateTpl />
						</FormGroup>
						<FormGroup className="class-name end-time" controlId="formInlineName">
							<DateTpl />
						</FormGroup>
						<FormGroup className="class-operate" controlId="formInlineName">
						{
							i == this.props.classLength - 1 
							? <Button bsStyle="danger" onClick={this.deleteClass}>删除</Button>
							: ""	
						}
						</FormGroup>
					</div>
					<div className="error-div">
						{
							this.props.checkClassNameState.length
							? 
							this.props.checkClassNameState[i]
							?
							<span className="error">! 课时名称不能为空</span>
							: ""
							: ""
						}
					</div>	
				</div>
			)
		}
		if(classArray.length){
			classArray.unshift(
				<ul className="clear course-class">
					<li className="class-name">课时名称</li>
					<li className="class-time">开课时间</li>
					<li className="class-time">结束时间</li>
					<li className="class-operate">操作</li>
				</ul>
			)
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
			<Modal className="add-course-modal" show={this.props.state}  backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton>
					<Modal.Title>添加课时</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="course-edit-info">
						<div >
							<FormGroup controlId="formInlineName">
								<ControlLabel>章节名称：</ControlLabel>
								{' '}
								<FormControl id="sessionName" className="sessionContent"  type="text" placeholder="请输入培训标题内容" />
							</FormGroup>
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>讲师：</ControlLabel>
								{' '}
								<FormControl name="teacher" id="teacherCode"  componentClass="select" placeholder="select">
									{teacherArray}
								</FormControl>
							</FormGroup>
							<FormGroup controlId="formControlsSelect">		
								<Button bsStyle="success distribution-button" onClick={this.addClass}>添加课时</Button>
							</FormGroup>
						</div>
						<div className="error-div">
							{
								!this.props.checkSessionNameState 
								? <span className="error">! 章节名称不能为空</span>
								: ""
							}
						</div>
						<div>
							{classArray}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
				{
					this.props.classLength 
					? <Button bsStyle="primary" onClick={this.saveManageInfo}>保存</Button>
					: ""
				}
					
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  AddCourseModal;
