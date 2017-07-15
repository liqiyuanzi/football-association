import React , { Component } from 'react'
import { Router ,Link} from 'react-router'
import styles from "styles/register.less"

class Register extends Component {
	render(){
		let firstActive = this.context.router.location.pathname.indexOf('firstStep') != -1 ? 'active' : '';
		let secondActive = this.context.router.location.pathname.indexOf('secondStep') != -1 ? 'active' : '';
		let thirdActive = this.context.router.location.pathname.indexOf('thirdStep') != -1 ? 'active' : '';
		return (
			<div className="page-wraper">
				<div className="register-head">
					<span>中国足球协会教练员培训系统</span>
				</div>
				<div className="register-wraper">
					<ul className="register-content-head clear">
						<li>
							<div className="clear">
								<span className="num-style">1</span>
								<span className={"info-detail "+firstActive}>注册账号</span>
								<i className="icon iconfont icon-xiayibu next-style"></i>
							</div>
						</li>
						<li>
							<div className="clear">
								<span className="num-style">2</span>
								<span className={"info-detail "+secondActive}>基本信息</span>
								<i className="icon iconfont icon-xiayibu next-style"></i>
							</div>
						</li>
						<li>
							<div className="clear">
								<span className="num-style">3</span>
								<span className={"info-detail "+thirdActive}>辅助信息</span>
							</div>
						</li>
					</ul>
					<div className="register-content-panel">
						{this.props.children}
					</div>
				</div>
			</div>
		)	
	}
}
Register.contextTypes = {
  router:React.PropTypes.object
};
module.exports =  Register;