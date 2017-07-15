import React , { Component } from 'react'
import {Pagination}  from 'react-bootstrap';
class PaginationAdvanced extends Component {
	constructor(){
	  super();
	  let hashIndex = Number(window.location.hash.substring(1,window.location.hash.length)) 
					? Number(window.location.hash.substring(1,window.location.hash.length))
					: 1
	  this.state={
		activePage: hashIndex
	  }
	}
	loadPage = (eventKey) =>{
		this.setState({
			activePage: eventKey
		},()=>{
			window.location.hash = eventKey;
			this.props.loadPage(eventKey);
		});	
	}
	render(){
		 return (
		  <Pagination
			prev = {"上一页"}
			next = {"下一页"}
			first = {"首页"}
			last = {"尾页"}
			ellipsis
			boundaryLinks
			items={this.props.pageData ? this.props.pageData.pageCount : 1}
			maxButtons={7}
			activePage={this.state.activePage}
			onSelect={this.loadPage} />
		);
	}
}

module.exports =  PaginationAdvanced;
