﻿import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import courseManage from 'styles/courseManage.less'

class CourseManagement extends Component {
	componentWillMount = () =>{
		
	}
	render(){
		return (
			<div className="clear course-manage-page">
				{this.props.children}
			</div>
		)	
	}
}
CourseManagement.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userInfo:state.userInfo.userInfo
});
module.exports =  connect(mapStateToProps,null)(CourseManagement);
