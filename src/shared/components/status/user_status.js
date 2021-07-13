import React,{useState,useEffect} from 'react';
import './status.css';
import logo from '../../../Man-Using-Computer.svg';
import {Link} from 'react-router-dom';
import Button from '../../../ui/button';
import Loader from '../../../ui/loader.js';
import Err from '../../../ui/error.js';
import {useHttp} from '../../../shared/hooks/http_hook';

const UserStatus=(props)=>{
	const id=JSON.parse(localStorage.getItem('url'));
	let element=null;
	let st_list=["Authentication done","Personal information filled","Loan details filled","Residence details filled","Work details filled","Documents upoload done"];
	let st_data=[];
	let pid=null;
	let res=null;
	let lid=null;
	let detail_block=null;
	const [user,setUser]=useState(null);
	const [err,setErr]=useState(null);
	const {loading,error,sendReq,clearError}=useHttp();
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	

	useEffect(()=>{
		const getDetails=async ()=>{
			if(!props.err){
				try{
					res=await sendReq("http://65.1.107.76:5001/getstatusetails",
						"GET",
						null,
						{
							"cors":"no-cors",
							"id":id["url"]
						}
					);
					console.log(res);
					if("success" in res.msg){
						if(res.msg.success.code===3000){
							setUser(res.msg.success.data);
						}else{
							setErr("no data found");
						}
					}else{
						setErr("server error");
					}
				}catch(err){
					setErr("Server Error "+err);
				}
			}
		}
		getDetails();
	},[sendReq,setUser,props]);

	const clean=()=>{
		setErr(false);
	}

	if(user){
		detail_block=(
			<div className="card" style={{boxShadow: "0px 1px 5px 0px rgb(0 0 0 / 92%)"}}>
 
			  <div className="card-body" style={{background:"#b6c0c4"}}>
			    <h5 className="card-title" style={{fontWeight:"bold",textAlign:"center"}}>Applicant's Name: {user[0].app_Name.display_value}</h5><hr/>
			    <h5 className="card-title" style={{fontWeight:"bold",textAlign:"center"}}>Institute Name: {user[0].Institute_Name}</h5><hr/>
			    <h5 className="card-title" style={{fontWeight:"bold",textAlign:"center"}}>Financing required : {user[0].Financing_Requirement}</h5><hr/>
			    <h5 className="card-title" style={{fontWeight:"bold",textAlign:"center"}}>Loan ID: {user[0].lid}</h5>
			  </div>
			</div>
		)
	}else{
		detail_block=null;
	}

	if(pid && !props.err){
		for (let i=0;i<st_list.length;i++){
			if(i>pid-1){
				break;
			}
			st_data.push(<><div className="status" key={i}>
					<div className="side" style={{background: "gray"}}><i class="fa fa-check" aria-hidden="true"></i></div>
					{st_list[i]}
				</div>
				<hr/></>);
		}
		if(pid<st_list.length){
			for (let i=pid;i<st_list.length;i++){
				st_data.push(<><div className="status" key={i}>
						<div className="side"><i class="fa fa-times" aria-hidden="true"></i></div>
						{st_list[i]}
					</div>
					<hr/></>);
			}
		}
		element=(<div className="form1" style={{margin:"1rem auto",boxShadow: "0px 1px 5px 0px rgb(0 0 0 / 92%)"}}>
				<h1><center>Your status</center></h1>
				<hr/>
				{st_data}
				<Link to={`/${id["url"]}/form`} className="button">Go to Form</Link>
			 </div>);
	}else{
		element=(<div className="no-applications">
		<img src={logo} className="logo" alt="logo"/>
			<div className="help-text">
				{props.err ? "Server error, just don't panic !" : "Fill application form and view status"}
			</div>
			<div className="help-text">
				{props.err ? <Button onClick={props.reload}>Retry</Button> : <Link to={`/${id["url"]}/form`} className="btn btn-primary">Go to form</Link>}
			</div>
		</div>);
	}
	return(	<>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			<div className="form1">
			{detail_block}

			{element}
			</div>
			</>
		);
	
};

export default UserStatus;