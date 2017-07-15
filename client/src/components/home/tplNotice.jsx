import React , { Component } from 'react'
import * as actions from '../../actions/action';
import { Router } from 'react-router'
import { connect } from 'react-redux'
class HomeTpl extends Component {

	submitLogout= () => {
		actions.getLoginData({"logout":true},(resData) =>{
			this.context.router.replace('/login');	
		});
	}
	getSqlData= () => {
		actions.getSqlData({"logout":true},(resData) =>{
			
		});
	}
	render(){
		return (
			<div className="notice-panel">

			</div>
		)	
	}
}
HomeTpl.contextTypes = {
  router:React.PropTypes.object
};
module.exports =  HomeTpl;
