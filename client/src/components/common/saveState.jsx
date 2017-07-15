import React , { Component } from 'react'
class SaveStateTpl extends Component {
	render(){
		let stateClass = this.props.saveState == "success" 
							? "icon-chenggong"
							: this.props.saveState == "error"
							? "icon-iconfontshibai"
							: "";
		return (
			<div>
			{
				this.props.saveState ? 
				<div className="save-info-panel">
					<i className={"icon iconfont "+stateClass}></i>
					{
						this.props.saveState == "success" ? 					
						<span>&nbsp;
						{
							this.props.saveContent || "执行成功" 
						}								
						</span>						
						: this.props.saveState == "error" ?
						<span>&nbsp;
						{
							this.props.saveContent || "执行失败"
						}
						</span>	
						: ""
					}
				</div>
				: ""
			}
			</div>
			
		)	
	}
}

module.exports =  SaveStateTpl;
