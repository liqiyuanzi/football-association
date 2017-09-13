import React , { Component } from 'react'
import { Router } from 'react-router'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import macarons from "echarts/theme/macarons"

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
	getOption(){
		return {
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
	}
	getOption1(){
		return{
			tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','加一个','再加一个']
				},
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false},
						magicType : {
							show: true, 
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'center',
									max: 1548
								}
							}
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				series : [
					{
						name:'访问来源',
						type:'pie',
						radius : ['50%', '70%'],
						itemStyle : {
							normal : {
								label : {
									show : false
								},
								labelLine : {
									show : false
								}
							},
							emphasis : {
								label : {
									show : true,
									position : 'center',
									textStyle : {
										fontSize : '30',
										fontWeight : 'bold'
									}
								}
							}
						},
						data:[
							{value:335, name:'直接访问'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1548, name:'搜索引擎'},
							{value:1548, name:'加一个'},
							{value:1548, name:'再加一个'}
						]
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
			<div>1234565</div>
				<ReactEcharts
					  option={this.getOption1()}
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
