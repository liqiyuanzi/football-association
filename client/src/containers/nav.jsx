import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import styles from "styles/nav.less"
import Config from "codes/config"
import getInitDictData from "codes/getInitDictData"

var timer = "";

class Nav extends Component {
	componentWillMount = () =>{
		getInitDictData.getData();
	}
	errorImage = (ev) =>{
		ev.target.src = "/client/build/images/default.png";
	}
	showHideBlock = (flag) =>{	
		flag ? 
		(()=>{
			clearInterval(timer);
			$("#personBlock").show(100)
		})()
		: 
		(()=>{
			timer = setTimeout(()=>{
				$("#personBlock").hide(100);
			},500)
		})()
	}
	submitLogout= () => {
		actions.getLoginData({"logout":true},(resData) =>{
			this.context.router.push('/login');	
		});
	}
	loadManage= () => {
		$("#personBlock").hide(100);
		this.context.router.push('/nav/manage');	
	}
	render(){
		let navArray = [],infoArray = [], notify;
		if(this.props.userInfo){
			notify = this.props.userInfo.notify ? "have-notify" : "";
		}
								
		if(this.props.userInfo){
			navArray = Config.NavInfo[this.props.userIndex].map((obj,index)=>{
				let activeClass = this.context.router.location.pathname.indexOf(obj.Key) != -1 ? "active" :"";
				return(
					<div className={activeClass+" nav-detail"}>
						<Link to={obj.Key} >
							{obj.Value}
						</Link>
					</div>
				)
			})
		}	
		return (
			<div className="page-wraper">
				<div className="page-head">
					<img className="logo-img" src="/client/build/images/logo.jpg"/>
					<div className="nav-list clear">
						{
							navArray
						}
					</div>
					<div className="user-info">
						<div className="info-block">
							<div className={notify}>
								{this.props.userInfo ? this.props.userInfo.notify : ""}
							</div>
							<i className="icon iconfont icon-gaojing"></i>
						</div>
						<div className="person-block" onMouseEnter={this.showHideBlock.bind(this,1)} onMouseLeave={this.showHideBlock.bind(this,0)}>
							<div className="user-detail">
								{this.props.userInfo ? this.props.userInfo.userName : ""}
								<i className="icon iconfont icon-jiantouxia"></i>
							</div>
							
							<div className="person-operation clear" id="personBlock">
								<div className="person-operation-head clear">
									<img onError={this.errorImage} src={
										this.props.userInfo ? 
										this.props.userInfo.headPhoto ?
										Config.ServerUrl + this.props.userInfo.headPhoto.substring(1,this.props.userInfo.headPhoto.length - 1)	
										 
										: "/client/build/images/default.png" 
										: ""
									} />
									<span>
										{this.props.userInfo ? this.props.userInfo.userName : ""}
									</span>
								</div>
								
								<div className="operation-detail" onClick={this.loadManage}>
									<i className="icon iconfont icon-shezhi"></i>
									账号管理
								</div>
								<div className="operation-detail" onClick={this.submitLogout}>
									<i className="icon iconfont icon-tuichu"></i>
									安全退出
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="page-body">
					{this.props.children}
				</div>	
			</div>
		)	
	}
}
Nav.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userInfo:state.userInfo.userInfo,
	userIndex:state.userInfo.userIndex,
});

module.exports =  connect(mapStateToProps,null)(Nav);