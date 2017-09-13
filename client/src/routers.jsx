import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,IndexRoute,IndexRedirect } from 'react-router'
import Login from "containers/login"
/*注册模块*/
import Register from "containers/register/register"
import FirstStep from "containers/register/firstStep"
import RegisterLogin from 'containers/register/registerLogin'
import SecondStep from "containers/register/secondStep"
import ThirdStep from "containers/register/thirdStep"
/*导航模块*/
import Nav from "containers/nav"
import Home from "containers/home"
/*coach用户*/
import HomeIndex from "containers/coach/home/homeIndex"
import CourseDetail from "containers/coach/home/courseDetail"
import SelectCourse from "containers/coach/selectCourse/selectCourse"
/*teacher用户*/
/*amdin用户*/
import AdminHomeIndex from "containers/admin/home/adminHomeIndex"
import CourseManagement from "containers/admin/courseManagement/courseManagement"
import Course from "containers/admin/courseManagement/course"
import EditCourse from "containers/admin/courseManagement/editCourse"
/*teacher用户*/
import TeacherHomeIndex from "containers/teacher/home/teacherHomeIndex"
/*用户信息管理*/
import Manage from "containers/manage/manage"
import UserInfomation from "containers/manage/userInfomation"
import BindMailBox from "containers/manage/bindMailBox"
import OperationNote from "containers/manage/operationNote"
import AccountSecurity from "containers/manage/accountSecurity"
import Help from "containers/manage/help"
import App from 'app'
import * as actions from 'actions/action';

const router =  <Route path="nav"  component={Nav}>
					<IndexRedirect to="home" />
					<Route path="home" component={Home}>
						/*coach模块*/
						<Route path="homeIndex" component={HomeIndex}/>
						<Route path="courseDetail" component={CourseDetail}/>
						/*admin模块*/
						<Route path="adminHomeIndex" component={AdminHomeIndex}/>
						/*teacher模块*/
						<Route path="teacherHomeIndex" component={TeacherHomeIndex}/>						
					</Route>
					
					<Route path="manage"  component={Manage}>
						<IndexRedirect to="userInfomation" />
						<Route path="userInfomation" component={UserInfomation}/>
						<Route path="bindMailBox" component={BindMailBox}/>
						<Route path="operationNote" component={OperationNote}/>
						<Route path="accountSecurity" component={AccountSecurity}/>
						<Route path="help" component={Help}/>
					</Route>
					/*amdin*/
					<Route path="courseManagement"  component={CourseManagement}>
						<IndexRedirect to="course" />
						<Route path="course" component={Course}/>
						<Route path="editCourse" component={EditCourse}/>
					</Route>
					/*coach*/
					<Route path="selectCourse"  component={SelectCourse} />			
				</Route>

const autoLogin = (nextState,replace,callback) =>{
	actions.checkAutoLogin((res)=>{
		if(res == 'success'){
			replace('/nav/home');
		}
		callback();
	})
}
class Routers extends React.Component {
	render() {
		return (
			<Router history={browserHistory} >
				<Route path="/" component={App} >
					<IndexRedirect to="login" />
					<Route path="login" component={Login} onEnter={autoLogin}/>
					<Route path="register"  component={Register}>
						<IndexRedirect to="firstStep" />
						<Route path="firstStep" component={FirstStep}/>
						<Route path="registerLogin" component={RegisterLogin}/>
						<Route path="secondStep" component={SecondStep}/>
						<Route path="thirdStep" component={ThirdStep}/>
					</Route>
					{
						router
					}
				</Route>	
				
			</Router>
		)
	}
}
Routers.contextTypes = {
  router:React.PropTypes.object
};
module.exports = Routers;