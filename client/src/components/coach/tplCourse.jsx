import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import Pagination from "components/common/pagination" 
class CourseTpl extends Component {

	setCourseID= (courseID) => {
		this.props.setCourseID(courseID);
	}
	render(){
		var courseArray = [];
		if(this.props.Data.results){
			courseArray = this.props.Data.results.map((obj)=>{
				var courseStatus = obj.isEnd == 2 ? "end-class" : obj.isEnd == 1 ? "in-class" : 'before-class';
				var statusStr = obj.isEnd == 2 ? "已结束" : obj.isEnd == 1 ? "进行中" : '未开始';
				return (
					<li onClick={this.setCourseID.bind(this,obj.courseID)}>
						<div className="title">
							{obj.courseCaption}
						</div>
						<div className="detail">
							<span className={courseStatus+" status-class"}>
								{statusStr}
							</span>
							<span>
								{obj.startTime +"~"+ obj.endTime}
							</span>
						</div>
						<i className="icon iconfont icon-arrowright"></i>	
					</li>
				)	
			})
		}
		return (
			<div className="course-panel">
				<div className="list-head">近期课程</div>
				<ul className="page-ul">
					{courseArray}
				</ul>
				<div className="page-div">
					<Pagination pageData={this.props.Data} loadPage={this.props.loadPage}/>
				</div>
			</div>
		)	
	}
}
module.exports =  CourseTpl;
