import React , { Component } from 'react'
import * as actions from 'actions/action';
import * as registerActions from 'actions/register';
import * as manageActions from 'actions/manage';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import {Button}  from 'react-bootstrap';
import ChangePasswordModal from "components/manage/changePassword"
import BindMailBox from "components/manage/bindMailBox"
import ChangePhoneNumberModal from "components/manage/changePhoneNumber"
import SaveTpl from "components/common/saveState"

class AccountSecurity extends Component {
	/*获取登录信息*/
	componentWillMount(){
		actions.getSqlData([{ Key: "LastLogin", Path: "login/lastLoginInfo.txt" }],{'userID':common.getCookie().userID},"reduceLastLoginInfo");
	}
	/*显示执行状态组件*/
	setSaveState(state,content){
		actions.showSaveState(state,content);
	}
	/*设置改密码modal显示隐藏*/
	setChangePasswordModal(state){
		manageActions.checkOldPassword(true);
		manageActions.checkNewPassword(true);
		manageActions.checkInsurePassword(true);
		manageActions.setChangePasswordState(state);
	}
	/*设置改手机号显示隐藏*/
	setChangePhoneNumberModal(state){
		this.recoverMessageData();
		manageActions.setChangePhoneNumberState(state);
	}
	/*设置绑定邮箱模态框显示隐藏*/
	setBindMailBoxModal(state){
		/*设置状态为未发送*/
		manageActions.setSendState(false);
		/*设置校验状态为true*/
		registerActions.checkMail(true);
		manageActions.setBindMailBoxState(state);
	}
	/*发送邮件*/
	sendMail = () =>{
		manageActions.sendMailMessage(
			{
				"phoneNumber":this.props.userInfo.phoneNumber,
				"password":this.props.userInfo.userPwd,
				"mailAddress":$("#mailAddress").val()
			});
	}
	/*重新获取用户信息*/
	getUser = (callback) =>{	
		actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':this.props.userInfo ? this.props.userInfo.userID : ""},"reduceUserInfo",callback);
	}
	/*退出登录*/
	logOut = () =>{
		actions.getLoginData({"logout":true},(resData) =>{
			this.context.router.replace('/login');	
		});
	}
	/*设置验证码随机数到state*/
	setMessage = (randomCode) =>{
		registerActions.setMessageState(randomCode);
	}
	/*重新恢复验证码状态以及时间*/
	recoverMessageData=() =>{
		registerActions.setMessageData();
	}
	/*替换操作纪录路由*/
	replaceRouter = () =>{
		this.context.router.replace('/nav/manage/operationNote');	
	}
	render(){
		return (
			<div className="security-page">
				{/*修改密码模态框*/}
				<ChangePasswordModal setChangePasswordModal={this.setChangePasswordModal} 
									 state={this.props.changePasswordState} 
									 checkInsurePassword = {this.props.checkInsurePassword} 
									 checkNewPassword = {this.props.checkNewPassword} 
									 checkOldPassword = {this.props.checkOldPassword} 
									 Data={this.props.userInfo} 
									 logOut = {this.logOut}
									 passwordState = {this.props.passwordState}
									 setSaveState={this.setSaveState}/>
									 
				{/*绑定邮箱模态框*/}
				<BindMailBox setBindMailBoxModal={this.setBindMailBoxModal}
									 getUser = {this.getUser}
									 sendMail = {this.sendMail}
									 checkMailState = {this.props.checkMailState}	
									 state={this.props.bindMailBoxState} 
									 Data={this.props.userInfo}
									 sendMailState={this.props.sendMailState}	
									 setSaveState={this.setSaveState}/>					 
									
				{/*修改手机绑定模态框*/}
				<ChangePhoneNumberModal setChangePhoneNumberModal={this.setChangePhoneNumberModal} 
										state={this.props.changePhoneNumberState}
										messageTime={this.props.messageTime}
										messageState={this.props.messageState}	
										checkOldPhoneNumber = {this.props.checkOldPhoneNumber}
										checkNewPhoneNumber = {this.props.checkNewPhoneNumber}
										checkIdentifyCode = {this.props.checkIdentifyCode}
										Data={this.props.userInfo} 
										logOut = {this.logOut}
										recoverMessageData = {this.recoverMessageData}	
										setMessage = {this.setMessage}
										checkIdentifyCodeInfo = {this.props.checkIdentifyCodeInfo}
										setSaveState={this.setSaveState}/>
				{/*执行状态组件*/}
				<SaveTpl saveState={this.props.saveState} saveContent={this.props.saveContent}/>					
				<div className="last-operate">
					<span>
						上次登录时间：
						{
							this.props.lastLoginInfo ? 
							this.props.lastLoginInfo.LastLogin[0] ? 
							this.props.lastLoginInfo.LastLogin[0].loginTime 
							: "无"
							: ""
						}
					&nbsp; 
						地点：
						{
							this.props.lastLoginInfo 
							? this.props.lastLoginInfo.LastLogin[0]
							? this.props.lastLoginInfo.LastLogin[0].loginPlace 
							:"无"
							:""
						} 
					</span>
				</div>
				<div className="title">
					<span>账号安全</span>
				</div>
				<ul className="change-page">
					<li >
						<div className="fl font-div">
							<i className="icon iconfont icon-shouji"></i>
						</div>
						<div className="fl detail-div">
							<div className="detail">
								<span className="weight-font">手机</span>
								<span className="normal">（已绑定）</span>
							</div>
							<div className="describe">
								<span>绑定后可用手机号加密码登录，可通过手机号找回密码</span>
							</div>
						</div>
						<div className="fr button-div">
							<Button onClick={this.setChangePhoneNumberModal.bind(this,true)}>修改绑定</Button>
						</div>
					</li>
					<li >
						<div className="fl font-div">
							<i className="icon iconfont icon-youjian"></i>
						</div>
						<div className="fl detail-div">
							<div className="detail">
								<span className="weight-font">邮箱</span>
								<span className="normal">
								{
									this.props.userInfo.bindMailState ? "（已绑定）" : "（未绑定）"	
								}
								</span>
							</div>
							<div className="describe">
								<span>绑定后可通过加密码登录，可通过邮箱找回密码</span>
							</div>
						</div>
						<div className="fr button-div">
							<Button onClick={this.setBindMailBoxModal.bind(this,true)}>
								{
									this.props.userInfo.bindMailState ? "修改绑定" : "现在绑定"
								}
							</Button>
						</div>
					</li>
					<li >
						<div className="fl font-div">
							<i className="icon iconfont icon-mima"></i>
						</div>
						<div className="fl detail-div">
							<div className="detail">
								<span className="weight-font">密码</span>
								<span className="normal">（已设置）</span>
							</div>
							<div className="describe">
								<span>用于保护账号信息和安全登录</span>
							</div>
						</div>
						<div className="fr button-div">
							<Button onClick={this.setChangePasswordModal.bind(this,true)}>修改密码</Button>
						</div>
					</li>
					<li >
						<div className="fl font-div">
							<i className="icon iconfont icon-xuankexitong"></i>
						</div>
						<div className="fl detail-div">
							<div className="detail">
								<span className="weight-font">操作纪录</span>
								<span className="normal"></span>
							</div>
							<div className="describe">
								<span>查看账号信息是否安全</span>
							</div>
						</div>
						<div className="fr button-div">
							<Button onClick={this.replaceRouter}>
								立即查看
							</Button>
						</div>
					</li>
					
				</ul>
			</div>
		)	
	}
}
AccountSecurity.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userInfo:state.userInfo.userInfo,
	lastLoginInfo:state.userInfo.lastLoginInfo,
	saveState:state.userInfo.saveState,
	saveContent:state.userInfo.saveContent,
	changePasswordState:state.userInfo.changePasswordState,
	changePhoneNumberState:state.userInfo.changePhoneNumberState,
	checkOldPassword:state.userInfo.checkOldPassword,
	checkNewPassword:state.userInfo.checkNewPassword,
	checkInsurePassword:state.userInfo.checkInsurePassword,
	passwordState:state.userInfo.passwordState,
	messageState:state.registerModule.messageState,/*验证码状态*/
	messageTime:state.registerModule.messageTime,
	checkOldPhoneNumber:state.userInfo.checkOldPhoneNumber,
	checkNewPhoneNumber:state.userInfo.checkNewPhoneNumber,
	checkIdentifyCode:state.userInfo.checkIdentifyCode,
	checkIdentifyCodeInfo:state.registerModule.checkIdentifyCodeInfo,
	bindMailBoxState:state.userInfo.bindMailBoxState,/*绑定邮箱模态框state*/
	sendMailState:state.userInfo.sendMailState,/*邮件发送状态*/
	checkMailState:state.registerModule.checkMailState
});

module.exports =  connect(mapStateToProps,null)(AccountSecurity);