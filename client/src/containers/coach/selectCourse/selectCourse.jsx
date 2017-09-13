import React , { Component } from 'react'
import * as actions from 'actions/action';
import * as courseActions from 'actions/course';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import {Modal,Button,FormGroup,FormControl}  from 'react-bootstrap';
import selectCourse from 'styles/coach/selectCourse.less'
import Pagination from "components/common/pagination" 
import CourseModal from "components/coach/courseModal" 
import SaveTpl from "components/common/saveState"

class CourseManagement extends Component {
	componentWillMount = () =>{
		this.loadPage();
	}
	loadPage = (pageIndex) =>{
		var searchText = $("#searchContent").val() ? $("#searchContent").val() : '';
		actions.getPageSqlData( 
			{ Key: "GetSelectCourseInfo", Path: "coach/course/getSelectCourseInfo.txt" },
			{'userID':common.getCookie().userID,'SearchText':searchText},
			{'pageIndex':pageIndex ? pageIndex : 1,'pageMaxLength':10,'orderField':"startTime",'sortMethod':'desc'}
			,"reduceGetSelectCourseInfo"
		);
	}
	loadCourseInfo = (courseID) =>{
		actions.getSqlData( 
			[
				{ Key: "CourseDetail", Path: "coach/course/selectCourseDetail.txt" },
				{ Key: "CourseSession", Path: "coach/course/selectCourseSession.txt" },
				{ Key: "SessionContent", Path: "coach/course/selectSessionContent.txt" },
			],
			{'userID':common.getCookie().userID,'courseID':courseID}
			,"reduceUserCourseDetail",()=>{
				this.setModalState(true);
			}
		);
	}
	setModalState = (state) =>{
		courseActions.setShowCourseModalState(state);
	}
	signUpCourse = (courseID) =>{
		
	}
	render(){
		let courseArray = [];
		if(this.props.selectCourseInfo){
			courseArray = this.props.selectCourseInfo.results.map((courseObj,i)=>{
				var classZebra = i % 2 ? "class-zebra" : "";
				return (
					<tr className={classZebra}>
						<td className="text-center">{courseObj.startTime}</td>
						<td className="text-center">{courseObj.endTime}</td>
						<td>{courseObj.caption}</td>
						<td>{courseObj.organizationCaption}</td>
						<td className="table-button">
							<Button bsStyle="info" onClick={this.loadCourseInfo.bind(this,courseObj.courseID)}>课程详情</Button>
							<Button bsStyle="success" onClick={this.signUpCourse.bind(this,courseObj.courseID)}>报名</Button>
						</td>
					</tr>
				)
			});
			if(courseArray.length){
				courseArray.unshift(
					<tr>
						<th style={{width:"15%"}}>开始时间</th>
						<th style={{width:"15%"}}>结束时间</th>
						<th style={{width:"35%"}}>培新内容</th>
						<th style={{width:"20%"}}>机构</th>
						<th style={{width:"15%"}}>操作</th>
					</tr>
				)
			}
		}
		return (
			<div className="clear select-course-panel">
				<CourseModal 
					modalState = {this.props.coachGetCourseModalState}
				/>
				<SaveTpl saveState={this.props.saveState} saveContent={this.props.saveContent}/>
				<div className="title">全部课程</div>
				<FormGroup className="class-name" controlId="formInlineName">
					<FormControl className="search-content"  type="text" id="searchContent" placeholder="请输入培训内容关键字"/>
					<Button bsStyle="primary" onClick={this.loadPage.bind(this,1)} className="search-button">搜索</Button>
				</FormGroup>
				
				<div className="select-course-table">
					<table>
						<tbody>
							{courseArray}
						</tbody>
					</table>
				</div>
				<div className="page-div">
					<Pagination pageData={this.props.selectCourseInfo} loadPage={this.loadPage}/>
				</div>	
			</div>
		)	
	}
}
CourseManagement.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	saveState:state.userInfo.saveState,
	saveContent:state.userInfo.saveContent,
	userInfo:state.userInfo.userInfo,
	selectCourseInfo:state.courseModule.getSelectCourseInfo,
	coachGetCourseModalState:state.courseModule.coachGetCourseModalState
	
});
module.exports =  connect(mapStateToProps,null)(CourseManagement);