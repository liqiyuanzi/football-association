import React , { Component } from 'react'
import * as actions from 'actions/action';
import { Router ,Link} from 'react-router'
import { connect } from 'react-redux'
import styles from "styles/manage.less"

class Manage extends Component {
	render(){
		return (
			<div className="manage-page">
			我是帮助
			</div>
		)	
	}
}
Manage.contextTypes = {
  router:React.PropTypes.object
};
const mapStateToProps = state =>({
	
});

module.exports =  connect(mapStateToProps,null)(Manage);