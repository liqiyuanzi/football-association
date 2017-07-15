import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from "codes/common"

class Home extends Component {
	componentWillMount = () =>{
		actions.getSqlData([{ Key: "UserInfo", Path: "user/user.txt" }],{'userID':common.getCookie().userID},"reduceUserInfo",(res)=>{
			let type= res.UserInfo ? res.UserInfo[1][0].userType : "";
			switch(type){
				case "coach":
					this.context.router.push('/nav/home/homeIndex');
				break;
				case "teacher":
					this.context.router.push('/nav/home/teacherHomeIndex');
				break;
				case "admin":
					this.context.router.push('/nav/home/adminHomeIndex');
				break;
				default:
				break;	
			}
		})
	}
	render(){
		return (
			<div>
				{this.props.children}
			</div>
		)	
	}
}
Home.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userInfo:state.userInfo.userInfo
});
module.exports =  connect(mapStateToProps,null)(Home);;
