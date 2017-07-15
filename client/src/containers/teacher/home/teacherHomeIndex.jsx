import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import homeCss from 'styles/home.less'
import Course from 'components/home/tplCourse.jsx'
import Notice from 'components/home/tplNotice.jsx'
import Calendar from 'components/home/tplCalendar.jsx'

class HomeIndex extends Component {
	setCourseID = (courseID)=>{
		
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
		var a = path;
		return (
			<div className="clear">
				我是teacher的home
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
