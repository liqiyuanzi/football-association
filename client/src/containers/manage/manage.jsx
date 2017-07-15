import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import Config from "codes/config"
import styles from "styles/manage.less"
import style from "styles/common.less"
import Modal from "components/manage/headImage"
import * as manageActions from 'actions/manage';
import SaveTpl from "components/common/saveState"

class Manage extends Component {
	setModalState(state){
		/*设置modal隐藏显示*/
		manageActions.setHeadImageModalState(state);
	}
	errorImage = (ev) =>{
		ev.target.src = "/client/build/images/default.png";
	}
	/*确定上传*/
	insureChangeHeadImage= () =>{
		let headPhoto = JSON.stringify(this.props.userInfo.previousHeadPhoto ? this.props.userInfo.previousHeadPhoto : this.props.userInfo.headPhoto);
		manageActions.updateUserInfo([{ Key: "updateHeadPhoto", Path: "manage/updateHeadPhoto.txt" }],
			{'userID':this.props.userInfo.userID,'headPhoto':headPhoto.substring(1,headPhoto.length -1)},
				(res) =>{
					if(res == "success"){
						actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':this.props.userInfo ? this.props.userInfo.userID : ""},"reduceUserInfo");
						actions.showSaveState("success");
						this.setModalState(false);
					}else{
						actions.showSaveState("error");
					}
				}
			);
	}
	/*上传头像*/
	upLoadFiles = (fileObj) =>{
		manageActions.uploadHeadImage(fileObj,(res)=>{
			if(res == "success"){
				actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':this.props.userInfo ? this.props.userInfo.userID : ""},"reduceUserInfo");
			}else{
				
			}
		});
	}
	render(){
		let manageArray = [];
		if(this.props.userIndex){
			manageArray = Config.ManageInfo[this.props.userIndex].map((obj)=>{
				let activeClass = this.context.router.location.pathname.indexOf(obj.Key) != -1 ? "active" :"normal";
				return(
					<Link to={obj.Key} className={activeClass}>
						{obj.Value}
						<i className={obj.Font}></i>
					</Link>
				)
			});
		}

		return (
			<div className="manage-page">
				<Modal 	setModalState={this.setModalState} state={this.props.headImageModalState} insureChangeHeadImage={this.insureChangeHeadImage}
						Data={this.props.userInfo} getUser = {this.getUser} upLoadFiles={this.upLoadFiles} onError={this.errorImage}/>
				<SaveTpl saveState={this.props.saveState} />	
				<div className="left-panel">
					<div className="head-panel">
						<div className="img">
							
							<img onError={this.errorImage} src={
								this.props.userInfo ? 
								this.props.userInfo.headPhoto ?
								Config.ServerUrl + this.props.userInfo.headPhoto.substring(1,this.props.userInfo.headPhoto.length - 1)	
								 
								: "/client/build/images/default.png" 
								: ""
							} />
							<div className="img-div" onClick={this.setModalState.bind(this,true)}>
								更换头像
							</div>
						</div>
						<div className="name">{this.props.userInfo ? this.props.userInfo.userName : ""}</div>
					</div>
					<div className="content-panel">
						<div className="title">账户管理</div>
						<div className="clear wraper">
							{manageArray}
						</div>
					</div>
				</div>
				<div className="right-panel">
					{this.props.children}
				</div>
			</div>
		)	
	}
}
Manage.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userIndex:state.userInfo.userIndex,
	userInfo:state.userInfo.userInfo,
	headImageModalState:state.userInfo.headImageModalState,
	saveState:state.userInfo.saveState
});

module.exports =  connect(mapStateToProps,null)(Manage);