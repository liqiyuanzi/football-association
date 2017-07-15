import React from "react";
import ReactDOM from 'react-dom';
import common from "codes/common"
class App extends React.Component {
	componentWillMount(){
		if(!common.getCookie().userID && this.context.router.location.pathname.indexOf("firstStep") == -1){
			this.context.router.replace('/login');	
		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

App.contextTypes = {
  router:React.PropTypes.object
};
module.exports = App;