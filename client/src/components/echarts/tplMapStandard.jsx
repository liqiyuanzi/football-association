import React , { Component } from 'react'
import { Router } from 'react-router'
import { connect } from 'react-redux'
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/map/js/china';
import 'echarts/dist/echarts.min'
import macarons from "echarts/theme/macarons"

class HomeTpl extends Component {
	getOption(){
		return {
			title : {
				text: this.props.content? this.props.content.text : "text",
				subtext: this.props.content ? this.props.content.subtext : "",
				x:'center'
			},
			
			tooltip : {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				x:this.props.content ? this.props.content.left : 'left',
				data:this.props.data ? this.props.data : ['data0','data1']
			},
			visualMap: {
				min: this.props.content ? this.props.content.min : 0,
				max: this.props.content ? this.props.content.max : 2500,
				x: 'left',
				y: 'center',
				text:[this.props.content ? this.props.content.highest : '高',this.props.content ? this.props.content.lowest : '低'],
				calculable : true
			},
			toolbox: {
				show: true,
				orient : 'horizontal',
				y: 'top',
				feature : {
					dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true,width:100}
				},
				itemSize:15,
				itemGap:30,
				right:50
			},
			roamController: {
				show: true,
				x: 'right',
				mapTypeControl: {
					'china': true
				}
			},
			series : [
				{
					name: this.props.data ? this.props.data[0] : 'data0',
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:this.props.adminChartData ? this.props.adminChartData.coach : []
				},
				{
					name: this.props.data ? this.props.data[1] : 'data1',
					type: 'map',
					mapType: 'china',
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:this.props.adminChartData ? this.props.adminChartData.teacher : []
				}
			]
        }
	}
	render(){
		let EventsDict = {
			  'click': this.onChartClick,
			  'legendselectchanged': this.onChartLegendselectchanged
			}
		return (
			<div >
				<ReactEcharts style={{height:"800px"}}
					  option={this.getOption()}
					  notMerge={true}
					  lazyUpdate={true}
					  theme={"macarons"}
					  onChartReady={this.onChartReadyCallback}
					  onEvents={EventsDict} />
			</div>
		)	
	}
}
HomeTpl.contextTypes = {
  router:React.PropTypes.object
};
module.exports =  HomeTpl;
