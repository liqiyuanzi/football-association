import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import {Button}  from 'react-bootstrap';
class Home extends Component {
	componentWillMount = (props) =>{
		var courseID = window.location.search ? window.location.search.split("=")[1] : "1"; 
		actions.getSqlData( 
			[
				{ Key: "CourseDetail", Path: "coach/course/selectCourseDetail.txt" },
				{ Key: "CourseSession", Path: "coach/course/selectCourseSession.txt" },
				{ Key: "SessionContent", Path: "coach/course/selectSessionContent.txt" },
			],
			{'userID':common.getCookie().userID,'courseID':courseID}
			,"reduceUserCourseDetail"
		);
	}
	showSessionContent = (index) =>{
		$(".session-"+index).slideToggle(100);
		if($(".icon-"+index).hasClass("icon-jiahao")){
			$(".icon-"+index).removeClass('icon-jiahao');
			$(".icon-"+index).addClass('icon-jianhao');
		}else{
			$(".icon-"+index).removeClass('icon-jianhao');
			$(".icon-"+index).addClass('icon-jiahao');
		}
	}
	render(){
		var courseCaption = "",
			courseLevel = "",
			courseArray = [],
			courseStartTime = "",
			courseEndTime = "",
			coursePlace = "",
			organization = "",
			coursePhoneNumber = "";
		if(this.props.userCourseDetail.CourseDetail){
			courseCaption = this.props.userCourseDetail.CourseDetail[0].courseCaption;
			courseLevel = this.props.userCourseDetail.CourseDetail[0].courseLevel;
			courseStartTime = this.props.userCourseDetail.CourseDetail[0].startTime;
			courseEndTime = this.props.userCourseDetail.CourseDetail[0].endTime;
			coursePlace = this.props.userCourseDetail.CourseDetail[0].coursePlace;
			organization = this.props.userCourseDetail.CourseDetail[0].organization;
			coursePhoneNumber = this.props.userCourseDetail.CourseDetail[0].coursePhoneNumber;
			
			if(this.props.userCourseDetail.CourseDetail[0].courseSession){
				courseArray = this.props.userCourseDetail.CourseDetail[0].courseSession.map((sessionObj,i)=>{
					var listArray = [];
					listArray = sessionObj.sessionContent.map((contentObj,j)=>{
						return(
							<li>
								{"第"+(j + 1)+"节课："+contentObj.sessionContentCaption}
							</li>
						)
					})
					return(
						<div className="clear">
							<div className="title" onClick={this.showSessionContent.bind(this,i)}>
								<i className={"icon iconfont icon-jiahao icon-"+i}></i>
								{"第"+(i + 1)+"章节："+sessionObj.sessionCaption}
								<span className="center">
									授课教师：{sessionObj.teacherName ? sessionObj.teacherName : "暂无教师信息"}
								</span>
								<span className="right">			
									{sessionObj.beginTime+" ~ "+sessionObj.endTime}
								</span>
							</div>
							<ul className={"detail-panel session-"+i}>
								{listArray}
							</ul>
						</div>
					)
				})	
			}else{
				courseArray = <div className="no-data">暂无课程数据</div>
			}
		}
		return (
			<div className="course-page">
				<div className="title">
					{courseCaption}
				</div>
				<div className="title-h2">
					<span>
						课程等级：{courseLevel}
					</span>
					<Button bsStyle="info" className="button" onClick={this.sendMsg}>
						下载资料
					</Button>		
				</div>
				<div className="content">
					<div className="head">课程内容：</div>
					{courseArray}
				</div>
				<div className="content">
					<div className="head">课程信息：</div>
					<ul className="detail">
						<li>
							<span>培训机构：</span>
							{organization}
						</li>
						<li>
							<span>授课时间：</span>
							{courseStartTime+" ~ "+courseEndTime}
						</li>
						<li>
							<span>授课地点：</span>
							{coursePlace}
						</li>
						<li>
							<span>联系电话：</span>
							{coursePhoneNumber}
						</li>
					</ul>
				</div>
			</div>
		)	
	}
}
const mapStateToProps = state =>({
	userCourseInfo:state.courseModule.userCourseInfo,
	userCourseDetail:state.courseModule.userCourseDetail,
	courseID:state.courseModule.courseID,
	userInfo:state.userInfo.userInfo,
});
module.exports =  connect(mapStateToProps,null)(Home);
