import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import styles from "styles/login.less"

class Login extends Component {
	submitLoginForm= () => {
		let loginPlace = "";
		if(remote_ip_info){
			if(remote_ip_info["province"] == remote_ip_info["city"]){
			loginPlace = remote_ip_info["country"] + " " + remote_ip_info["province"]
			}else{
				loginPlace = remote_ip_info["country"] + " " + remote_ip_info["province"] + " " + remote_ip_info["city"];
			}	
		}	
		actions.getLoginData({"phoneNumber":$("#userName").val(),"password":$("#userPwd").val(),
								'autoLogin':$("#autoLogin").is(':checked'),'loginPlace':loginPlace}, (resData) => {
			if(resData == "success"){
				/*登陆成功则获取字典表数据*/
				this.context.router.replace('/nav/home');
				actions.getUserType(resData.userType);	
			}else{
				actions.setErrorMsg(resData);
			}
		});
	}
	render(){
		var errClass = this.props.errMsg ? "error-msg" : "";
		return (
			<div className="login-bg">
				<div className="login-title">
					中国足球协会教练员培训系统
				</div>
				<div className="login-wraper">
					<div className="login-head">
						<Link to="/login" activeClassName="active" className="login-head-detail">登录</Link>
						<Link to="/register" activeClassName="active" className="login-head-detail">注册</Link>
						<span className="login-head-quit">×</span>
					</div>
					<form method="post">
						<input id="userName" placeholder="请输入手机号"/>
						<input id="userPwd" placeholder="6-16位密码,区分大小写,不能用空格" type="password"/>
					</form>
					<div className="login-save-state">
						<label>
							<input type="checkbox" defaultChecked="checked" id="autoLogin" />&nbsp;下次自动登录
						</label>
						<span>忘记密码</span>     
					</div>
					<div className={errClass}>
						{this.props.errMsg}
					</div>	 
					<div className="login-button" onClick={this.submitLoginForm}>
						登录
					</div>                       
				</div>
			</div>
		)	
	}
}
Login.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	loginState:state.loginModule.userState,
	errMsg:state.loginModule.errMsg
});

module.exports =  connect(mapStateToProps,null)(Login);