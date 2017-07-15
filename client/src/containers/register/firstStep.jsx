import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/register';
import sendMessage from 'libs/shortMessage'
import checkInfo from 'codes/checkInfo'

let timer = "";
let timerNum = 60;
class FirstStep extends Component {
	sendMsg = () =>{
		if (!this.props.messageState){
			let randomCode = this.randomNum();
			let sendObj = new sendMessage($("#phoneNumber").val(),randomCode);
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
		actions.setMessageState(randomCode);
	}
	submitResgiterForm =() =>{
		checkInfo.checkRegisterInfo.check((state) =>{
			if(state == 'success'){
				this.context.router.replace('/register/registerLogin');
			}else{
				alert('注册失败,请检查网络连接!');
			}
		});
	}
	//密码格式为8-20位数字或英文字符,不包含特殊符号(!,@,#,$,%,^,&,*...)
	render(){
		return (
			<div className="first-step-panel clear">
				<div className="first-step-panel-left clear" id="registerForm">
					<label className="register-input">
						<i className="icon iconfont icon-ren-copy"></i>
						<input type="text" onBlur={checkInfo.checkRegisterInfo.checkName} name="name" placeholder="真实姓名"/>
					</label>
					<label className="register-input">
						<i className="icon iconfont icon-shenfengzheng4"></i>
						<input type="text" onBlur={checkInfo.checkRegisterInfo.checkIDCard} name="IDCard" placeholder="身份证号"/>
					</label>
					<label className="register-input">
						<i className="icon iconfont icon-youjian"></i>
						<input type="text" onBlur={checkInfo.checkRegisterInfo.checkMail} name="mail" placeholder="邮箱"/>
					</label>
					<label className="register-input">
						<i className="icon iconfont icon-mima"></i>
						<input type="password" onBlur={checkInfo.checkRegisterInfo.checkPassword} name="password" placeholder="密码"/>
					</label>
					<label className="register-input">
						<i className="icon iconfont icon-mima"></i>
						<input type="password" onBlur={checkInfo.checkRegisterInfo.checkInsurePassword} name="insurePassword" placeholder="确认密码"/>
					</label>
					<label className="register-input">
						<i className="icon iconfont icon-shouji"></i>
						<input type="text" onBlur={checkInfo.checkRegisterInfo.checkPhoneNumber} name="phoneNumber" id="phoneNumber" placeholder="手机号"/>
					</label>
					<div className="short-message">
						<input type="text" onBlur={checkInfo.checkRegisterInfo.checkIdentifyCodeInput} maxLength="4" name="identifyCode" id="identifyCode" placeholder="短信验证码"/>
						<button onClick={this.sendMsg} className="btn btn-info">
							{
								this.props.messageState == undefined ? 
								"获取验证码" : this.props.messageTime 
								? this.props.messageTime+" 秒" : 
								"重新获取"
							}
						</button>
					</div>
					<div className="person-type">
						<label>
							<input name="type" type="radio" value="1" defaultChecked ="checked"/>
							<span>教练员</span>
						</label>
						<label>
							<input name="type" type="radio" value="2"/>
							<span>讲师</span>
						</label>
					</div>
					<div className="next-step">
						<button onClick={this.submitResgiterForm} className="btn btn-info" to="/register/secondStep">注册</button>
					</div>
				</div>
				<div className = "first-step-panel-right right">
					<ul>
						<li>
							<span className="err-tip">
							{
								!this.props.checkNameState ? "! 姓名格式错误" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								!this.props.checkIDCardState ? "! 身份证号格式错误" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								!this.props.checkMailState ? "! 邮箱格式错误" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								!this.props.checkPasswordState ? "! 密码须由6-16个字符组成，不能包含特殊符号" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								!this.props.checkInsurePasswordState ? "! 密码不一致" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								!this.props.checkPhoneNumberState ? "!	请输入正确的手机号" : ""
							}
							</span>
						</li>
						<li>
							<span className="err-tip">
							{
								this.props.checkIdentifyCodeInfo
							}
							</span>
						</li>
					</ul>
				</div>	
			</div>	
		)	
	}
}
FirstStep.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	messageData:state.registerModule.messageData,
	messageState:state.registerModule.messageState,
	messageTime:state.registerModule.messageTime,
	checkNameState:state.registerModule.checkNameState,
	checkIDCardState:state.registerModule.checkIDCardState,
	checkMailState:state.registerModule.checkMailState,
	checkPasswordState:state.registerModule.checkPasswordState,
	checkInsurePasswordState:state.registerModule.checkInsurePasswordState,
	checkPhoneNumberState:state.registerModule.checkPhoneNumberState,
	checkIdentifyCodeInfo:state.registerModule.checkIdentifyCodeInfo,
});
module.exports = connect(mapStateToProps,null)(FirstStep)