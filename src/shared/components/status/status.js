import React from 'react';
import './status.css';

const Status=(props)=>{
	let element=null;
	if(props.status){
		if(parseInt(props.status)===1){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check"></i></div> 
				<div className="side"><i class="fas fa-user"></i></div> 
				<div className="side"><i class="fas fa-coins"></i></div> 
				<div className="side"><i class="fas fa-landmark"></i></div> 
				<div className="side"><i class="fas fa-keyboard"></i></div> 
				<div className="side"><i class="fas fa-id-card-alt"></i></div>
				</div>
			);
		}if(parseInt(props.status)===2){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-user"></i></div> 
				<div className="side"><i class="fas fa-coins"></i></div> 
				<div className="side"><i class="fas fa-landmark"></i></div> 
				<div className="side"><i class="fas fa-keyboard"></i></div> 
				<div className="side"><i class="fas fa-id-card-alt"></i></div>
				</div>
			);
		}if(parseInt(props.status)===3){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-user"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-coins"></i></div> 
				<div className="side"><i class="fas fa-landmark"></i></div> 
				<div className="side"><i class="fas fa-keyboard"></i></div> 
				<div className="side"><i class="fas fa-id-card-alt"></i></div>
				</div>
			);
		}if(parseInt(props.status)===4){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check fa-3x"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-user"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-coins"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-landmark"></i></div> 
				<div className="side"><i class="fas fa-keyboard"></i></div> 
				<div className="side"><i class="fas fa-id-card-alt"></i></div>
				</div>
			);
		}if(parseInt(props.status)===5){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check fa-lg"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-user fa-lg"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-coins fa-lg"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-landmark fa-lg"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-keyboard fa-lg"></i></div> 
				<div className="side"><i class="fas fa-id-card-alt fa-lg"></i></div>
				</div>
			);
		}if(parseInt(props.status)===6){
			element=(
				<div className="status">
				<div className="side" style={{background: "white"}}><i class="fas fa-user-check"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-user"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-coins"></i></div>
				<div className="side" style={{background: "white"}}><i class="fas fa-landmark"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-keyboard"></i></div> 
				<div className="side" style={{background: "white"}}><i class="fas fa-id-card-alt"></i></div> 
				</div> 
			);
		}
	}if(!props.status){
		element=(
			<div className="status">
			<div className="side"><i class="fas fa-user-check"></i></div> 
			<div className="side"><i class="fas fa-user"></i></div> 
			<div className="side"><i class="fas fa-coins"></i></div> 
			<div className="side"><i class="fas fa-landmark"></i></div> 
			<div className="side"><i class="fas fa-keyboard"></i></div> 
			<div className="side"><i class="fas fa-id-card-alt"></i></div>
			</div>
		);
	}
	return(
		<div style={{margin: "8rem auto"}}>
			{element}
		</div>
	);
};

export default Status;
