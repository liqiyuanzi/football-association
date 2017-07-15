import React , { Component } from 'react'
import { Router ,Link} from 'react-router'

class SecondStep extends Component {
	render(){
		return (
			<div>
				
				<Link to="/register/thirdStep">我是第2步</Link>
			</div>
		)	
	}
}
module.exports = SecondStep