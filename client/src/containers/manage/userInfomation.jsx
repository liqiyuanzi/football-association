import React , { Component } from 'react'
import * as manageActions from 'actions/manage';
import * as actions from 'actions/action';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import Modal from "components/manage/modal"
import SaveTpl from "components/common/saveState"

/*
	userName:昵称
	genderCaption:性别
	IDCard:身份证
	Emial:邮箱
	phoneNumber:电话
	city:城市
	province:省份
	userTypeCaption:职务类型
	userSign:个性签名
*/
class Manage extends Component {
	setModalState(state){
		/*验证信息至为true*/
		manageActions.checkName(true);
		manageActions.checkIDCard(true);
		manageActions.checkMail(true);
		/*设置modal隐藏显示*/
		manageActions.setEditModalState(state);
	}
	getUser = () =>{	
		actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':this.props.userInfo ? this.props.userInfo.userID : ""},"reduceUserInfo");
	}
	setSaveState(state){
		actions.showSaveState(state);
	}
	setProvince(code){
		manageActions.setProvinceCode(code);
	}
	render(){
		return (
			<div className="info-panel">
				<Modal 	setModalState={this.setModalState} setProvince={this.setProvince} 
						provinceCode={this.props.provinceCode} state={this.props.modalState} 
						City={this.props.City} Province={this.props.Province} 
						Gender={this.props.Gender} Type={this.props.Type} 
						Data={this.props.userInfo} getUser = {this.getUser}
						checkNameState={this.props.checkNameState} checkIDCardState={this.props.checkIDCardState} 
						checkMailState={this.props.checkMailState} setSaveState={this.setSaveState}/>
				<SaveTpl saveState={this.props.saveState}/>		
				<div className="title">
					<span>个人信息</span>
					<span className="edit" onClick={this.setModalState.bind(this,true)}>
						<i className="icon iconfont icon-bianji"></i>
						编辑
					</span>
				</div>
				<div className="info-content">
					<ul>
						<li>
							<span className="info-title">
								真实姓名
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.userName: ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								性别
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.genderCaption: ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								身份证号
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.IDCard: ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								邮箱
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.Emial : ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								手机号码
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.phoneNumber: ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								所在地区
							</span>
							<span className="info-detail">
								{
									this.props.userInfo ? 
									this.props.userInfo.province == this.props.userInfo.city ? 
									this.props.userInfo.province :
									this.props.userInfo.province +" "+this.props.userInfo.city
									: ""
								}
							</span>
						</li>
						<li>
							<span className="info-title">
								职务
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.userTypeCaption: ""}
							</span>
						</li>
						<li>
							<span className="info-title">
								个性签名
							</span>
							<span className="info-detail">
								{this.props.userInfo ? this.props.userInfo.userSign: ""}
							</span>
						</li>
					</ul>
				</div>
			</div>
		)	
	}
}
Manage.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	modalState:state.userInfo.modalState,
	userInfo:state.userInfo.userInfo,
	City:state.userInfo.City,
	Province:state.userInfo.Province,
	Gender:state.userInfo.Gender,
	Type:state.userInfo.Type,
	provinceCode:state.userInfo.provinceCode,
	checkNameState:state.userInfo.checkNameState,
	checkIDCardState:state.userInfo.checkIDCardState,
	checkMailState:state.userInfo.checkMailState,
	saveState:state.userInfo.saveState
});

module.exports =  connect(mapStateToProps,null)(Manage);