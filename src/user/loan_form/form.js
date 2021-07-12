import React,{useState,useEffect} from 'react';
import './form.css';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_EMAIL,VALIDATOR_PHONE,VALIDATOR_NUMBER} from '../../shared/util/validator';
import {useParams} from "react-router-dom";
import Personal from './personal_details';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
/*import axios from 'axios'; */
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import UserStatus from '../../shared/components/status/user_status';
import Status from '../../shared/components/status/status';
import SweetAlert from 'react-bootstrap-sweetalert';

const Form=(props)=>{
	const id=useParams();
	let uid=null;
	let pid=null;
	let res=null;
	let otp_part=null;
	let otp_button=null;
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	const storedId=JSON.parse(localStorage.getItem('id'));
	if(storedId){
		uid=storedId.uid;
	}
	const {loading,error,sendReq,clearError}=useHttp();
	const [user,setUser]=useState(null);
	const [err,setErr]=useState(false);
	const [otpValid,setOtpValid]=useState(false);
	const [comeOtp,setComeOtp]=useState(false);
	const [formState,formInputHandler,setFormData]=useForm(
		{
			first_name:{
				value:'',
				isValid:false
			},
			last_name:{
				value:'',
				isValid:false
			},
			email:{
				value:'',
				isValid:false
			},
			phone:{
				value:'',
				isValid:false
			}
		},false
	);

	const [otp_form,otp_handler,setOtp_form]=useForm(
		{
			otp:{
				value:'',
				isValid:false
			}
		},false
	)

	const clean=()=>{
		setErr(false);
	}


	const [next,setNext]=useState(false);

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const storedId=JSON.parse(localStorage.getItem('id'));
				if(storedId){
					uid=storedId.uid;
					res=await sendReq("http://65.1.107.76:5001/getUserform1",
						"GET",
						null,
						{
							'uid':uid,
							"cors":"no-cors"
						}
					);
					console.log(res);
					if("success" in res.msg){
						if("data" in res.msg.success){
							setUser(res.msg.success.data);
							setFormData({
								...formState.inputs,
								first_name:{
									value:res.msg.success.data.name.first_name,
									valid:true
								},
								last_name:{
									value:res.msg.success.data.name.last_name,
									valid:true
								},
								email:{
									value:res.msg.success.data.email,
									valid:true
								},
								phone:{
									value:res.msg.success.data.Mobile,
									valid:true
								}
							},true);
						}else{
							setErr("server error");
						}
					}else{
						setErr("server error");
					}
				}
			}catch(err){

			}	
		}
		getUser();
	},[sendReq,setFormData])


	/*const nextHandle=(e) => {
		const config = {
			data:{
					loan_app_name:{
						prefix:"",
						first_name:formState.inputs.first_name.value,
						last_name:formState.inputs.last_name.value,
						suffix:""
					},
					loan_app_mail:formState.inputs.email.value,
					Mobile:formState.inputs.phone.value
				}
		}
		axios.post('http://localhost:5000/', config)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	}*/

	const comeOtpHandle=()=>{
		setComeOtp(true);
	}

	const closeBlock=()=>{
		setComeOtp(false);
	}

	const handleOtp=()=>{
		setOtpValid(true);
		alert("otp validated, press next and continue !!");
		setComeOtp(false);
	}

	const nextHandle=async (event)=>{
		event.preventDefault();
		try{
			/*if(uid){
				res=await sendReq('http://localhost:5000/',
					'POST',
					JSON.stringify({
						data:{
							loan_app_name:{
								prefix:"",
								first_name:formState.inputs.first_name.value,
								last_name:formState.inputs.last_name.value,
								suffix:""
							},
							loan_app_mail:formState.inputs.email.value,
							Mobile:formState.inputs.phone.value
						}
					}),
					{
						'Content-Type':'application/json',
						'uid':uid,
						"cors":"no-cors"
					},
				);
				console.log(res)
			}else*/ 
			if(!uid && otpValid){
				res=await sendReq('http://65.1.107.76:5001/coappidentification',
					'POST',
						JSON.stringify({
							content1:{
								data:{
								/*loan_app_name:{
									prefix:"",
									first_name:formState.inputs.first_name.value,
									last_name:formState.inputs.last_name.value,
									suffix:""
								},*/
								name:{
									prefix:"",
									first_name:formState.inputs.first_name.value,
									last_name:formState.inputs.last_name.value,
									suffix:""
								},
								app_name:{
									prefix:"",
									first_name:formState.inputs.first_name.value,
									last_name:formState.inputs.last_name.value,
									suffix:""
								},
								//loan_app_mail:formState.inputs.email.value,
								email:formState.inputs.email.value,
								app_mail:formState.inputs.email.value,
								Mobile:formState.inputs.phone.value
							}
						},
						content2:{
							criteria: "(lid.contains(\""+id["id"]+"\"))",
							data:{
								coapp_Name:{
									prefix:"",
									first_name:formState.inputs.first_name.value,
									last_name:formState.inputs.last_name.value,
									suffix:""
								},
								Co_Applicant_Phone:formState.inputs.phone.value
							}
						}
					}),
					{
						'Content-Type':'application/json',
						"cors":"no-cors"
					},
				);
				console.log(res);
				if(!pid && res.msg.success && res.msg.success1 && res.msg.success2){
					let id=res.msg.success.data.ID;
					let did=res.msg.success1.data.ID;
					let lid=res.msg.success2.result[0].data.ID;
					localStorage.setItem(
						'id',
						JSON.stringify({uid:id})
					);
					localStorage.setItem(
						'did',
						JSON.stringify({did:did})
					);
					localStorage.setItem(
						'lid',
						JSON.stringify({lid:lid})
					);
					localStorage.setItem(
						'pid',
						JSON.stringify({pid:1})
					);
					setNext(true);
				}
				else if(!res.msg.success && res.msg.error){
					setErr("server error");
				}

			}else if(pid){
				setNext(true);
			}else{
				alert("you must validate otp");
			}
		}catch(err){
			console.log(err);	
		}
		
	};



	if(!uid && formState.inputs.phone.isValid){
		otp_button=(
			<Button type="button" onClick={comeOtpHandle}>Send otp</Button>
		);
	}else{
		otp_button=null;
	}

	if(comeOtp){
		otp_part=(
			<SweetAlert
		       show={comeOtp}
		        style={{backgroundImage:"linear-gradient(rgb(255 252 252),transparent)"}}
		         customButtons={
		          <Button onClick={closeBlock}>Cancel</Button>
		        }
		      ><div><center><React.Fragment><Input element="input" type="text" label="OTP"
							id="otp" 
							validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER()]}
							placeholder="enter otp" 
							errorText="Please input otp"
							onInput={otp_handler} />
							<Button type="button" onClick={handleOtp} disabled={!otp_form.isValid}>Validate otp</Button>
							</React.Fragment></center></div>
		    </SweetAlert>	
		);
	}else{
		otp_part=null;
	}

	const reloadHandle=()=>{
		window.location.reload();
	};

	let component=null;
	if(next){
		component=<Personal/>;
	}else if(loading){
		component=<Loader asOverlay />
	}else if(parseInt(pid)>=1){
		if(user){
		component=(
			<React.Fragment>
			<Status status={pid}/>
			<form className="form" onSubmit={nextHandle}>
				<h1><center>Authentication</center></h1>
				<hr/>
				<Input element="input" type="text" label="Firstname"
				id="first_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Firstname" 
				errorText="Please enter your first name"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.name.first_name}
				initvalid={true} />

				<Input element="input" type="text" label="Lastname"
				id="last_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Lastname"
				errorText="Please enter your last name"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.name.last_name}
				initvalid={true} />

				<Input element="input" type="email" label="Email" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
				id="email"
				placeholder="Email"
				errorText="Invalid email"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.email}
				initvalid={true} />

				<Input element="input" type="phone" label="Phone" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_PHONE()]}
				id="phone"
				placeholder="Mobile number"
				errorText="Invalid mobile number"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Mobile}
				initvalid={true} /> 

			<Button type="submit" disabled={!formState.isValid}>Next</Button> 

			</form>
			</React.Fragment>
		);
	}else{
			component=<UserStatus err={true} reload={reloadHandle}/>;
	}
	}else{
		component=(
			<React.Fragment>
			<Status status={pid}/>
			<form className="form" onSubmit={nextHandle}>
				<h1><center>Authentication</center></h1>
				<hr/>
				<Input element="input" type="text" label="Firstname"
				id="first_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Firstname" 
				errorText="Please enter your first name"
				onInput={formInputHandler}
				initvalue={formState.inputs.first_name.value}
				initvalid={formState.isValid} />

				<Input element="input" type="text" label="Lastname"
				id="last_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Lastname"
				errorText="Please enter your last name"
				onInput={formInputHandler}
				initvalue={formState.inputs.last_name.value}
				initvalid={formState.isValid} />

				<Input element="input" type="email" label="Email" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
				id="email"
				placeholder="Email"
				errorText="Invalid email"
				onInput={formInputHandler}
				initvalue={formState.inputs.email.value}
				initvalid={formState.isValid} />

				<Input element="input" type="phone" label="Phone" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_PHONE()]}
				id="phone"
				placeholder="Mobile number"
				errorText="Invalid mobile number"
				onInput={formInputHandler}
				initvalue={formState.inputs.phone.value}
				initvalid={formState.isValid} />

				{otp_button}

				{otp_part}


			<Button type="submit" disabled={!formState.isValid || !otpValid}>Next</Button> 

			</form>
			</React.Fragment>

		);
	}


	return(
		<React.Fragment>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
		</React.Fragment>
	);
};

export default Form;
