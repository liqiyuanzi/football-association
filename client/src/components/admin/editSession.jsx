
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from 'codes/checkInfo'
import DateTpl from "components/common/date"; 
import * as actions from 'actions/action';

class AddCourseModal extends Component {
	constructor(props) {
		super(props);
		this.state={
			sessionContentArray : []
		}
	}
	componentWillMount = () =>{
		this.getInitState();
	}
	componentDidUpdate = () =>{
		this.getInitState();
	}
	getInitState = () =>{
		if(this.props.sessionInfo){
			if(JSON.stringify(this.props.sessionInfo.getSessionContent) != JSON.stringify(this.state.sessionContentArray)){
				this.setState({
					sessionContentArray : this.props.sessionInfo.getSessionContent
				})
			}	
		}
	}
	/*增加课程章节内容*/
	addSessionContent = () =>{
		let array = this.state.sessionContentArray;
		array.push({
			beginTime:"",
			endTime:"",
			sessionContentCaption:""
		})
		this.setState({
			sessionContentArray :array
		})
	}
	removeSessionContent = () =>{
		let array = this.state.sessionContentArray;
		array.pop({
			beginTime:"",
			endTime:"",
			sessionContentCaption:""
		})
		this.setState({
			sessionContentArray :array
		})
	}
	setModalState =()=>{
		this.setState({
			sessionContentArray : []
		},()=>{
			this.props.setModalState(false);
		})
	}

	saveSessionInfo =()=>{
		var sessionID = this.props.sessionInfo.getSession[0].sessionID;
		var courseID = window.location.search ? window.location.search.split("=")[1] : ""; 
		checkInfo.checkAddCourseInfo.saveEditSessionInfo(sessionID,courseID,(state)=>{
			if(state == "success"){
				this.setModalState();
				this.props.getCourseInfo();
				this.props.setSaveState("success","保存成功");
			}else{
				this.props.setSaveState("error","保存失败");
			}
		});
	}
	render(){
		if(this.props.sessionInfo.getSession){
			let classArray = [],teacherArray = [];
			
			let sessionObj = this.props.sessionInfo.getSession;
			let sessionCaption = sessionObj[0].sessionCaption;
			let teacherID = sessionObj[0].teacherID;
			let endTime = sessionObj[0].beginTime;
			let beginTime = sessionObj[0].endTime;
			
			if(this.props.allTeacherInfo){
				teacherArray = this.props.allTeacherInfo.GetTeacher.map((obj)=>{
					return(
						<option value={obj.id}>
							{obj.userName}
						</option>
					)
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
			
			if(this.props.sessionInfo.getSessionContent){
				for(var i = 0; i < this.state.sessionContentArray.length; i++){
					let sessionContentObj = this.state.sessionContentArray[i];
					let sessionContentCaption = sessionContentObj.sessionContentCaption;
					let contentBeginTime = sessionContentObj.beginTime;
					let contentEndTime = sessionContentObj.endTime;
					classArray.push(
						<div className="class-content">
							<div>
								<FormGroup className="class-name" controlId="formInlineName">
									<FormControl className="session-content"  type="text" defaultValue={sessionContentCaption} />
								</FormGroup>
								<FormGroup className="class-name begin-time" controlId="formInlineName">
									<DateTpl date={contentBeginTime}/>
								</FormGroup>
								<FormGroup className="class-name end-time" controlId="formInlineName">
									<DateTpl date={contentEndTime}/>
								</FormGroup>
								<FormGroup className="class-operate" controlId="formInlineName">
								{
									i == this.state.sessionContentArray.length - 1 ?
									<Button bsStyle="btn btn-danger" onClick={this.removeSessionContent}>删除</Button>
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
			}
			return (
				<Modal className="add-course-modal" show={this.props.state}  backdrop="static" onHide={this.setModalState}>
					<Modal.Header closeButton>
						<Modal.Title>编辑课时</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="course-edit-info">
							<div >
								<FormGroup controlId="formInlineName">
									<ControlLabel>章节名称：</ControlLabel>
									{' '}
									<FormControl id="sessionName" className="sessionContent" defaultValue={sessionCaption} type="text"  />
								</FormGroup>
								<FormGroup controlId="formControlsSelect">
									<ControlLabel>讲师：</ControlLabel>
									{' '}
									<FormControl name="teacher" id="teacherCode"  componentClass="select" defaultValue={teacherID} placeholder="select">
										{teacherArray}
									</FormControl>
								</FormGroup>
								<FormGroup controlId="formControlsSelect">		
									<Button bsStyle="success distribution-button" onClick={this.addSessionContent}>添加课时</Button>
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
						this.state.sessionContentArray.length 
						? <Button bsStyle="primary" onClick={this.saveSessionInfo} >保存</Button>
						: ""
					}
						
						<Button onClick={this.setModalState}>取消</Button>
					</Modal.Footer>
				</Modal>
			)	
		}else{
			return(
				<div></div>
			)
		}
		
		
		
		
		
	}
}

module.exports =  AddCourseModal;
