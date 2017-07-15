import React , { Component } from 'react'
import DateTimeField  from 'react-bootstrap-datetimepicker-seconds';

class DatePanel extends Component {
	constructor(props) {
		super(props);
		var year = new Date().getFullYear();
		var month = new Date().getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		var day = new Date().getDate();
		if(day < 10){
			day = "0" + day;
		}
		var date = year+"-"+month+"-"+day;
		this.state = {
			date:date,	
			format: "YYYY-MM-DD",
			inputFormat: "YYYY-MM-DD h:mm A",
			mode: "time"
		};
	}
	render(){
		const {date,format, mode, inputFormat} = this.state;
		return (
			<div className="date-panel">
				<DateTimeField 
					dateTime={date}	
					format={format}
					inputFormat={inputFormat}
					viewMode={mode}
					showToday = {true}
				/>
			</div>
		)	
	}
}

module.exports =  DatePanel;
