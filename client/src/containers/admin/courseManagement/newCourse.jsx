import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import common from 'codes/common'
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import DateTpl from "components/common/date" 

class HomeIndex extends Component {
	
	componentWillMount = () =>{
		
	}
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
		
		var levelArray = [];
		var organizationArray = [];
		return (
			<div className="clear">
				<div className="title">
					新建培训课程
				</div>
				<Form inline>
					<FormGroup controlId="formInlineName">
						<ControlLabel>培训内容：</ControlLabel>
						{' '}
						<FormControl name="name"  type="text" placeholder="请输入培训标题内容" />
					</FormGroup>
					<FormGroup controlId="formInlineEmail">
						<ControlLabel>培训级别：</ControlLabel>
						{' '}
						<FormControl  name="provinceCode" id="level" defaultValue={this.props.userInfo.provinceCode} componentClass="select" placeholder="select" >
							{levelArray}
						</FormControl>
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>培新机构：</ControlLabel>
						{' '}
						<FormControl name="cityCode" id="city" defaultValue={this.props.userInfo.cityCode} componentClass="select" placeholder="select">
							{organizationArray}
						</FormControl>
					</FormGroup>
				
					<div className="date-div">
						<ControlLabel>培训时间：</ControlLabel>
						{' '}
						<DateTpl />
						<span className="connect-span"> ~ </span>
						{' '}
						<DateTpl />
					</div>	
					<div className="title-h2">课程内容</div>
					<div className="class-content">
						<span className="delete">×</span>
						<FormGroup controlId="formInlineName">
							<ControlLabel>章节名称：</ControlLabel>
							{' '}
							<FormControl name="name"  type="text" placeholder="请输入培训标题内容" />
						</FormGroup>
						<FormGroup controlId="formControlsSelect">
							<ControlLabel>讲师：</ControlLabel>
							{' '}
							<FormControl name="cityCode" id="city" defaultValue={this.props.userInfo.cityCode} componentClass="select" placeholder="select">
								{organizationArray}
							</FormControl>
						</FormGroup>
						<div className="distribution-class">
							<Button bsStyle="info distribution-button">分配课时</Button>
						</div>	
					</div>
					<div className="add-button">
						<Button bsStyle="info">添加课程</Button>
					</div>	
				</Form>
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
