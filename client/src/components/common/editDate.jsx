import React , { Component } from 'react'
import DateTime  from 'react-datetime';
import Moment  from 'moment';

class DatePanel extends Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div className="date-panel">
				<DateTime
					value={this.props.dateTime || new Date()}	
					onChange = {this.props.onChange}
					timeFormat="HH:mm:ss"
					viewMode = 'days'
					dateFormat = "YYYY-MM-DD"
				/>
			</div>
		)	
	}
}

module.exports =  DatePanel;
