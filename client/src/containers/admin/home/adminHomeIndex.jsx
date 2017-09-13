import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import PieChartRing from 'components/echarts/tplPieChartRing'
import MapStandard from 'components/echarts/tplMapStandard'
import {Tab,Tabs,Button}  from 'react-bootstrap';

class HomeIndex extends Component {
	componentWillMount = () =>{
		this.loadChartData();
	}
	setCourseID = (courseID)=>{
		
	}
	loadChartData = (index) =>{
		/*
			index :0  人员分布
			index :1  成绩报告
		*/
		actions.getSqlData( 
			[
				{ Key: "selectCoach", Path: "admin/chart/selectCoach.txt" },
				{ Key: "selectTeacher", Path: "admin/chart/selectTeacher.txt" },
				{ Key: "selectProvince", Path: "admin/chart/selectProvince.txt" }
			],
			{}
			,"reduceChartData",
			(data)=>{
				//this.setFormState();
			}
		);
	}
	setChart = (key) =>{
		console.log(key)
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
		var detail = {"text":"教练员和讲师分布","subtext":"","min":0,"max":2500}
		return (
			<div>
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.setChart}>
					<Tab eventKey={0} title="人员分布"></Tab>
					<Tab eventKey={1} title="成绩报告"></Tab>
				</Tabs>
				<div className="clear">
					<MapStandard adminChartData = {this.props.adminChartData} data={["教练员",'教师']} content={detail} / >
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
	adminChartData:state.chartModule.adminChartData
});
module.exports =  connect(mapStateToProps,null)(HomeIndex);
