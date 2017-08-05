
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button}  from 'react-bootstrap';

class Confirm extends Component {
	insure = () =>{
		this.props.confirmOperate();
	}
	hideModal = () =>{
		this.props.setConfirmModalState(false);	
	}
	render(){
		
		return (
			<Modal show={this.props.state}  backdrop="static" onHide={this.hideModal}>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body >
					<div style={{height:"80px",lineHeight:"80px",textAlign:"center",fontSize:"16px"}}>
						{"是否确定"+this.props.info+"?"}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.insure}>确定</Button>
					<Button onClick={this.hideModal}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Confirm;
