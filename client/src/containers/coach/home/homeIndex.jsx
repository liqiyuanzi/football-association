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
	componentWillMount = () =>{
		let pageIndex = Number(window.location.hash.substring(1,window.location.hash.length)) 
					? Number(window.location.hash.substring(1,window.location.hash.length))
					: 1
		this.loadPage(pageIndex);
	}
	setCourseID = (courseID)=>{
		//actions.setCourseID(courseID);
		this.context.router.push({pathname:"/nav/home/courseDetail",query:{courseID:courseID}});	
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
				<Course Data={this.props.userCourseInfo} loadPage={this.props.loadPage} setCourseID={this.setCourseID}/>
				<div className="home-slide">
					<div className="notice-panel">
						<Notice />
					</div>
					<div className="calendar-panel">
						<Calendar />
					</div>
				</div>		
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
