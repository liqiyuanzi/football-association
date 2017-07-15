
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from '../../codes/checkInfo'
import Config from "../../codes/config"
import sendMessage from '../../libs/shortMessage'

class Manage extends Component {
	setModalState =()=>{
		this.props.setChangePhoneNumberModal(false);
	}
	checkPhoneNumber =()=>{
		checkInfo.checkChangePhoneNumber.check($("#identifyCode").val(),this.props.Data.userID,this.props.Data.phoneNumber,(state)=>{
			if(state == 'success'){
				this.props.setSaveState("success");
				this.setModalState();
				setTimeout(()=>{
					this.props.logOut();
				},2000)
				
			}
			this.props.recoverMessageData();
		});
	}
	sendMsg = () =>{
		if (!this.props.messageState){
			let randomCode = this.randomNum();
			let sendObj = new sendMessage($("#newPhoneNumber").val(),randomCode);
			sendObj.send(() =>{	
				this.setShortMessageState(randomCode);
			});
		}	
	}
	randomNum = () =>{
		let Num=""; 
		for(let i=0;i < 4;i++) 
		{ 
			Num += Math.ceil(Math.random()*9); 
		}
		return parseInt(Num);	
	}
	setShortMessageState(randomCode){
		this.props.setMessage(randomCode);
	}
	render(){
		return (
			<Modal show={this.props.state}  backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton >
					<Modal.Title>绑定手机</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div className="bind-phone">
						<Form inline>
							 <div className="title">
								<label className="class-label">已绑定手机号：</label>
								&nbsp;{this.props.Data.phoneNumber ? this.props.Data.phoneNumber.substring(0,2)+"******"+ this.props.Data.phoneNumber.substring(9,11) : ""}
							 </div>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">输入已绑定手机号：</ControlLabel>
							  {' '}
							  <FormControl type="password" name="oldPassword" onBlur={checkInfo.checkChangePhoneNumber.checkOldPhoneNumber} placeholder="输入已绑定手机号" />
							  <div className="error">
								{this.props.checkOldPhoneNumber}
							  </div>
							</FormGroup>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">输入新手机号：</ControlLabel>
							  {' '}
							  <FormControl id="newPhoneNumber" type="password" name="oldPassword" onBlur={checkInfo.checkChangePhoneNumber.checkNewPhoneNumber} placeholder="输入新手机号" />
							  <div className="error">
								{!this.props.checkNewPhoneNumber ? "! 手机号码格式错误" : false}
							  </div>
							</FormGroup>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">获取验证码：</ControlLabel>
							  {' '}
							  <div className="inline-block">
								<FormControl id="identifyCode" className="identifying-code" type="password" name="oldPassword" onBlur={checkInfo.checkChangePhoneNumber.checkIdentifyCode} placeholder="输入验证码" />
								<Button bsStyle="info" className="code-button" onClick={this.sendMsg}>
									{
										this.props.messageState == undefined ? 
										"点击获取" : this.props.messageTime 
										? this.props.messageTime+" 秒" : 
										"重新获取"
									}
								</Button>	
							 </div>
							  <div className="error">
								{
									this.props.checkIdentifyCodeInfo
								}
							  </div>
							</FormGroup>
							
						</Form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.checkPhoneNumber}>确定</Button>
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Manage;
