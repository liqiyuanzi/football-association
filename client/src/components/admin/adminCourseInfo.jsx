
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Button}  from 'react-bootstrap';
import checkInfo from 'codes/checkInfo'
import DateTpl from "components/common/date"; 
import Pagination from "components/common/pagination" 

class CoursePanel extends Component {
	distributeClass = (courseID,organizationCode) =>{
		/*设置课程id*/
		this.props.setCourseID(courseID);
		/*设置机构code*/
		this.props.setOrganizationCode(organizationCode);
		/*显示分配课时模态框*/
		this.props.setModalState(true);
	}
	editInfo = (courseID) =>{
		this.props.getCourseInfo(courseID);
		this.props.setEditModalState(true);
	}
	render(){
		let courseArray = [],teacherArray = [];
		if(this.props.adminCourseInfo){
			for(var i = 0;i < this.props.adminCourseInfo.results.length;i ++){
				var resultObj = this.props.adminCourseInfo.results[i];
				var classZebra = i % 2 ? "class-zebra" : ""
				courseArray.push(
					<tr className={classZebra}>
						<td>
							{i + 1}
						</td>
						<td>
							{resultObj.caption}
						</td>
						<td>
							{resultObj.place}
						</td>
						<td>
							{resultObj.organization}
						</td>
						<td>
							{resultObj.level}
						</td>
						<td>
							{resultObj.phoneNumber}
						</td>
						<td>
							<Button bsStyle="info operate-button" onClick={this.editInfo.bind(this,resultObj.courseID)}>编辑</Button>
							<Button bsStyle="success operate-button" onClick={this.distributeClass.bind(this,resultObj.courseID,resultObj.organizationCode)}>
								添加课时
							</Button>
						</td>	
					</tr>

				)
			}
		}
		if(courseArray.length){
			courseArray.unshift(
				<tr className="clear course-class">
					<th className="course-number">序号</th>
					<th className="course-content">培训内容</th>
					<th className="course-place">培训地点</th>
					<th className="course-organization">培训机构</th>
					<th className="course-level">级别</th>
					<th className="course-phone">联系电话</th>
					<th className="course-operate">操作</th>
				</tr>
			)
		}
		return (
			<div className= "table-div">
				<table>
					<tbody>
						{courseArray}
					</tbody>	
				</table>
				<div className="page-div">
					<Pagination pageData={this.props.adminCourseInfo} loadPage={this.props.loadPage}/>
				</div>
			</div>	
		)	
	}
}

module.exports =  CoursePanel;
