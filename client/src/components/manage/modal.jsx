
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from '../../codes/checkInfo'

class Manage extends Component {
	setModalState =()=>{
		this.props.setModalState(false);
	}
	saveManageInfo =()=>{
		checkInfo.checkManageInfo.check((state)=>{
			if(state == 'success'){
				this.props.getUser();
				this.props.setSaveState('success');
				this.props.setModalState(false);
			}else{
				this.props.setSaveState('error');
			}
		});
	}
	setProvince = (ev) =>{
		this.props.setProvince(ev.target.value);
	}
	render(){
		let sexArray =[],typeArray=[],provinceArray=[],cityArray=[];
		if(this.props.City){
			sexArray = this.props.Gender.map((obj)=>{
				let defaultCheck = "";
				if(this.props.Data.gender == obj.code){
					defaultCheck="checked"
				}
				return(
					<label>
						<input name="gender" type="radio" value={obj.code} defaultChecked={defaultCheck}/>
						<span>&nbsp;{obj.caption}</span>
					</label> 
				)
			});
			typeArray = this.props.Type.map((obj)=>{
				let defaultCheck = "";
				if(this.props.Data.userType == obj.code){
					defaultCheck="checked"
				}
				return(
					<label>
						<input name="userType" type="radio" value={obj.code} defaultChecked={defaultCheck}/>
						<span>&nbsp;{obj.caption}</span>
					</label> 
				)
			});
			provinceArray = this.props.Province.map((obj)=>{
				let defaultSelect = "";
				if(this.props.Data.provinceCode == obj.code){
					defaultSelect="selected"
				}
				return(
					<option value={obj.code} defaultSelect={defaultSelect}>{obj.caption}</option>
				)
			});
			cityArray = this.props.City.map((obj)=>{
				if(obj.code.indexOf(this.props.provinceCode) != -1){
					return(
						<option value={obj.code} >{obj.caption}</option>
					)
				}
			});
		}
		
		return (
			<Modal show={this.props.state}   backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton>
					<Modal.Title>编辑个人信息</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="edit-info">
						<Form inline>
							<FormGroup controlId="formInlineName">
							  <ControlLabel>真实姓名：</ControlLabel>
							  {' '}
							  <FormControl name="name" onBlur={checkInfo.checkManageInfo.checkName} type="text" defaultValue={this.props.Data.userName} placeholder="请输入昵称" />
							  <span className="error">
								{!this.props.checkNameState ? "! 姓名格式错误" : false}
							  </span>
							</FormGroup>
							{' '}
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>性别：</ControlLabel>
							  {' '}
							  <div className="radio">
								{sexArray}
							  </div>
							</FormGroup>
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>职务：</ControlLabel>
							  {' '}
							  <div className="radio-job">
								{typeArray}
							  </div>
							</FormGroup>
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>身份证号：</ControlLabel>
							  {' '}
							  <FormControl name="IDCard" onBlur={checkInfo.checkManageInfo.checkIDCard} defaultValue={this.props.Data.IDCard} placeholder="请输入身份证号" />
							  <span className="error">
								{!this.props.checkIDCardState ? "! 身份证号格式错误" : false}
							  </span>
							</FormGroup>
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>手机号码：</ControlLabel>
							  {' '}
							  <FormControl name="phoneNumber" disabled="true" defaultValue={this.props.Data.phoneNumber} placeholder="请输入手机号" />
							  <span className="error">
							  </span>
							</FormGroup>
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>邮件：</ControlLabel>
							  {' '}
							  <FormControl name="mail" onBlur={checkInfo.checkManageInfo.checkMail} type="email" defaultValue={this.props.Data.Emial} placeholder="请输入邮箱" />
								<span className="error">
								{!this.props.checkMailState ? "! 邮箱格式错误" : false}
							  </span>
							</FormGroup>
							<FormGroup controlId="formControlsSelect">
							  <ControlLabel>所在地区（省）：</ControlLabel>
							  {' '}
							  <FormControl  name="provinceCode" id="province" defaultValue={this.props.Data.provinceCode} componentClass="select" placeholder="select" onChange={this.setProvince}>
								{provinceArray}
							  </FormControl>
							</FormGroup>
							<FormGroup controlId="formControlsSelect">
							  <ControlLabel>所在地区（市）：</ControlLabel>
							  {' '}
							  <FormControl name="cityCode" id="city" defaultValue={this.props.Data.cityCode} componentClass="select" placeholder="select">
								{cityArray}
							  </FormControl>
							</FormGroup>
							
							<FormGroup controlId="formInlineEmail">
							  <ControlLabel>个性签名：</ControlLabel>
							  {' '}
							  <FormControl name="userSign" defaultValue={this.props.Data.userSign} />
							</FormGroup>
							<input type="text" name="userID" className="display-none" defaultValue={this.props.Data.userID}/>
						</Form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.saveManageInfo}>保存</Button>
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Manage;
