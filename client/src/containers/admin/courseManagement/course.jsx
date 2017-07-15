import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import homeCss from 'styles/home.less'
import {Tab,Tabs,Button}  from 'react-bootstrap';

class HomeIndex extends Component {
	newClass = () =>{
		this.context.router.push("/nav/courseManagement/newCourse");	
	}
	loadPage(pageIndex){
		actions.getPageSqlData( 
			{ Key: "Course", Path: "coach/course/selectCourse.txt" },
			{'userID':common.getCookie().userID},
			{'pageIndex':pageIndex ? pageIndex : 1,'pageMaxLength':8,'orderField':"startTime",'sortMethod':'desc'}
			,"reduceUserCourseInfo"
		);
	}
	render(){
		return (
			<div className="clear">
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					<Tab eventKey={1} title="待审核"></Tab>
					<Tab eventKey={2} title="已审核"></Tab>
					<Tab eventKey={3} title="已培训"></Tab>
				</Tabs>
				<Button bsStyle="info new-button" onClick={this.newClass}>新建培训课程</Button>
			</div>
		)	
	}
}
HomeIndex.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	userCourseInfo:state.courseModule.userCourseInfo,
	userInfo:state.userInfo.userInfo,
});
module.exports =  connect(mapStateToProps,null)(HomeIndex);
