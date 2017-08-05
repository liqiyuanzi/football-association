
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from 'codes/checkInfo'
import Config from "codes/config"

class BindMailBox extends Component {
	setModalState =()=>{
		this.props.setBindMailBoxModal(false);
	}
	saveBindInfo =()=>{
		this.props.getUser(function(){
			if(this.props.Data.Emial == this.props.sendMailState && this.props.Data.bindMailState){
				this.props.setSaveState("success","绑定成功");
				this.props.setBindMailBoxModal(false);
			}else{
				this.props.setSaveState("error","绑定失败");
			}
		}.bind(this));
	}
	sendMail = () =>{
		if($("#mailAddress").val()){
			this.props.sendMail();
		}	
	}
	render(){
		let sendError = this.props.sendMailState == 'error' ? "error-color" : "";
		return (
			<Modal show={this.props.state}  backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton >
					<Modal.Title>绑定邮箱</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div className="bind-mail-box">
						<Form inline>
							 <div className="title">
								<div>
									点击<b>发送邮件</b>后系统会给您发送邮件，<b>点击邮件内链接地址</b>完成绑定后点击<b>完成绑定</b>按钮更新绑定邮箱
								</div>
								{
									this.props.Data.bindMailState ? 
									<div>
										<label className="class-label">已绑定邮箱地址：</label>
										&nbsp;{this.props.Data.Emial}
									</div>
									: ""
								}	
							 </div>
							<FormGroup controlId="formControlsPassword">
							  <ControlLabel className="class-label">邮箱地址：</ControlLabel>
							  {' '}
							  <FormControl id="mailAddress" name="mailBox" onBlur={checkInfo.checkBindMailBoxInfo.checkMailBox} placeholder="输入您的邮箱地址" />
								{
									this.props.checkMailState ?
									  <Button bsStyle="info" className={"mail-button "+sendError} onClick={this.sendMail}>
										  {!this.props.sendMailState ? "发送邮件" : "重新发送"}
									  </Button>	
									: ""
								}
							</FormGroup>
							<div className="error">
								{!this.props.checkMailState ? "! 邮箱格式错误" : ""}
							</div>
							
						</Form>
					</div>
				</Modal.Body>
				<Modal.Footer>
				{
					this.props.sendMailState ? this.props.sendMailState.indexOf('@') != -1 ?
					<Button bsStyle="primary" onClick={this.saveBindInfo}>完成绑定</Button>
					: ""
					: ""
				}
					
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  BindMailBox;
