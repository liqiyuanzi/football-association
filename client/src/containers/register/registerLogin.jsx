import React , { Component } from 'react'
import { Router ,Link} from 'react-router'

class registerLogin extends Component {
	improveInfo = () =>{
		this.context.router.replace('/register/secondStep');	
	}
	loginNow = () =>{
		this.context.router.replace('/home');	
	}
	render(){
		return (
			<div>
				<div>注册成功!您的账号为:</div>
				<button onClick={this.improveInfo} className="btn btn-info">完善信息</button>
				<button onClick={this.loginNow} className="btn btn-info">立即登录</button>
			</div>
		)	
	}
}
registerLogin.contextTypes = {
  router:React.PropTypes.object
};
module.exports = registerLogin