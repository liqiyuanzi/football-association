
import React , { Component } from 'react'
import ReactDOM from 'react-dom';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl}  from 'react-bootstrap';
import checkInfo from '../../codes/checkInfo'
import common from "../../codes/common"
import Config from "../../codes/config"

class Manage extends Component {
	setModalState =()=>{
		this.props.setModalState(false);
	}
	/*上传到服务器,只保留一份图片*/
	upLoadHeadImage = () =>{
		let fileName = common.getGuid();
		let fileObj = new FormData();
		fileObj.append('fileName', fileName);
		fileObj.append('userID', this.props.Data.userID);
		fileObj.append('upload', document.getElementById("file").files[0]);
		this.props.upLoadFiles(fileObj);
	}
	/*确定上传*/
	changeHeadImage = () =>{
		this.props.insureChangeHeadImage();
	}
	chooseHeadImage = () =>{
		$("#file").click();
	}
	render(){
		return (
			<Modal show={this.props.state} bsSize="small"  backdrop="static" onHide={this.setModalState}>
				<Modal.Header closeButton >
					<Modal.Title>更换头像</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div className="head-image-info">
						<div className="head-image">
							<img onError={this.props.onError} src={
								this.props.Data 
								? this.props.Data.previousHeadPhoto ?
								Config.ServerUrl + this.props.Data.previousHeadPhoto.substring(1,this.props.Data.previousHeadPhoto.length - 1)
								: Config.ServerUrl + this.props.Data.headPhoto.substring(1,this.props.Data.headPhoto.length - 1)
								:""
							} />
						</div>
						<a onClick={this.chooseHeadImage}>上传头像</a>
						<input type="file" id="file" className="hide" onChange={this.upLoadHeadImage} accept="image/gif,image/jpeg,image/jpg,image/png"/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.changeHeadImage}>确定</Button>
					<Button onClick={this.setModalState}>取消</Button>
				</Modal.Footer>
			</Modal>
		)	
	}
}

module.exports =  Manage;
