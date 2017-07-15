
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from '../../codes/checkInfo'
import Config from "../../codes/config"
import CheckInfo from "../../codes/checkInfo"

class Manage extends Component {
	setModalState =()=>{
		this.props.setChangePasswordModal(false);
	}
	checkPassword =()=>{
		checkInfo.checkChangePassword.check(this.props.Data.userID,this.props.Data.userPwd,(state)=>{
			if(state == 'success'){
				this.props.setSaveState("success");
				this.setModalState();
				setTimeout(()=>{
					this.props.logOut();
				},2000)
				
			}
		});
	}
	render(){
		return (
			<Modal show={this.props.state}   backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton >
					<Modal.Title>修改密码</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div className="password-page">
						<Form inline>
							 <div className="error">
								{!this.props.passwordState ? "! 原始密码错误" : false}
							  </div>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">原始密码：</ControlLabel>
							  {' '}
							  <FormControl type="password" name="oldPassword" onBlur={checkInfo.checkChangePassword.checkOldPassword}   placeholder="输入原密码" />
							  <div className="error">
								{!this.props.checkOldPassword ? "! 密码须由6-16个字符组成，不能包含特殊符号" : false}
							  </div>
							</FormGroup>
							{' '}
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">新密码：</ControlLabel>
							  {' '}
							  <FormControl type="password" name="newPassword" onBlur={checkInfo.checkChangePassword.checkNewPassword} placeholder="输入新密码" />
							  <div className="error">
								{!this.props.checkNewPassword ? "! 密码须由6-16个字符组成，不能包含特殊符号" : false}
							  </div>
							</FormGroup>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">确认密码：</ControlLabel>
							  {' '}
							  <FormControl type="password"  name="insurePassword" onBlur={checkInfo.checkChangePassword.checkInsurePassword}   placeholder="输入确认密码" />
							  <div className="error">
								{!this.props.checkInsurePassword ? "! 与新密码密码不一致" : false}
							  </div>
							</FormGroup>
						</Form>
					</div>	
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.checkPassword}>确定</Button>
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Manage;
