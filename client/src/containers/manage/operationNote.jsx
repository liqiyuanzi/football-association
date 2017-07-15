import React , { Component } from 'react'
import * as actions from 'actions/action';
import * as manageActions from 'actions/manage';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import styles from "styles/manage.less"
import SaveTpl from "components/common/saveState"
import ChangePasswordModal from "components/manage/changePassword"
import Pagination from "components/common/pagination" 

class Manage extends Component {
	componentWillMount = () =>{
		let pageIndex = Number(window.location.hash.substring(1,window.location.hash.length)) 
					? Number(window.location.hash.substring(1,window.location.hash.length))
					: 1
		this.loadPage(pageIndex);
	}
	loadPage(pageIndex){
		actions.getPageSqlData( 
			{ Key: "GetOperateHistory", Path: "manage/getOperateHistory.txt" },
			{'userID':common.getCookie().userID},
			{'pageIndex':pageIndex ? pageIndex : 1,'pageMaxLength':10,'orderField':"loginTime",'sortMethod':'desc'}
			,"reduceOperateHistory"
		);
	}
	/*显示执行状态组件*/
	setSaveState(state){
		actions.showSaveState(state);
	}
	/*设置改密码modal显示隐藏*/
	setChangePasswordModal(state){
		/*关闭或打开隐藏错误信息*/
		manageActions.checkOldPassword(true);
		manageActions.checkNewPassword(true);
		manageActions.checkInsurePassword(true);
		/*设置modal状态*/
		manageActions.setChangePasswordState(state);
	}
	/*退出登录*/
	logOut = () =>{
		actions.getLoginData({"logout":true},(resData) =>{
			this.context.router.replace('/login');	
		});
	}
	render(){
		let tableContentArray = [];
		if(this.props.operateHistory.results){
			tableContentArray = this.props.operateHistory.results.map((obj) =>{
				return(
					<tr className="table-content">	
						<td>	
							{obj.operate}			
						</td>
						<td>	
							{obj.loginTime}			
						</td>
						<td>	
							{obj.loginPlace}			
						</td>
						<td>	
							{obj.loginIP}			
						</td>
						<td>	
							{obj.loginDevice}			
						</td>
					</tr>	
				)
			})
			if(!tableContentArray.length){
				tableContentArray.push(
					<tr className="table-content">
						<td colSpan = "5">无可显示的操作纪录!</td>
					</tr>	
				)
			}
		}
		return (
			<div className="operate-page">
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
				<div className="title">
					<span>操作纪录</span>
					<span className="detail">通过查看操作纪录可以判断账号状态是否异常</span>
					<span onClick={this.setChangePasswordModal.bind(this,true)} className="warning">不是本人登录？</span>
				</div>
				<div className="table-div">
					<table className="table">
						<tbody>
							<tr className="table-head">
								<th>
									操作
								</th>
								<th>
									登录时间
								</th>
								<th>
									登录地点
								</th>
								<th>
									IP地址	
								</th>
								<th>
									登录设备
								</th>								
							</tr>
								{tableContentArray}
						</tbody>
					</table>
					<div className="page-div">
						<Pagination pageData={this.props.operateHistory} loadPage={this.loadPage}/>
					</div>
				</div>	
			</div>
		)	
	}
}
Manage.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userInfo:state.userInfo.userInfo,
	saveState:state.userInfo.saveState,
	operateHistory:state.userInfo.operateHistory,
	changePasswordState:state.userInfo.changePasswordState,
	changePhoneNumberState:state.userInfo.changePhoneNumberState,
	checkOldPassword:state.userInfo.checkOldPassword,
	checkNewPassword:state.userInfo.checkNewPassword,
	checkInsurePassword:state.userInfo.checkInsurePassword,
	passwordState:state.userInfo.passwordState
});

module.exports =  connect(mapStateToProps,null)(Manage);