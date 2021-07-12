import React,{useState,useRef,useEffect} from 'react';
import './form.css';
import '../../shared/components/formelements/input.css';
import Form from './form';
import {useForm} from '../../shared/hooks/form_hook';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE} from '../../shared/util/validator';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import LoanDetails from './loan_details';
import {useHttp} from '../../shared/hooks/http_hook';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import UserStatus from '../../shared/components/status/user_status';
import Status from '../../shared/components/status/status';


const Personal=(props)=>{
	let uid=null;
	let pid=null;
	let res=null;
	let lid=null;
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	const [back,setBack]=useState(false);
	const [front,setFront]=useState(false);
	const [gender,setGender]=useState("Male");
	const [marital,setMarital]=useState("Unmarried");
	const [date,setDate]=useState(null);
	const [valid,setValid]=useState(false);
	const [err,setErr]=useState(false);
	const nodeRef=useRef(null);
	const [user,setUser]=useState(null);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formState,formInputHandler,setFormData]=useForm(
		{
			relation:{
				value:'',
				isValid:false
			},
		},false
	)
	const backHandle=()=>{
		setBack(true);
		setFront(false);
	};
	const handleDate=(date)=>{
		setDate(date);
		setValid(true);
	};
	const setGenderHandler=(event)=>{
		setGender(event.target.value);
	};
	const setMaritalHandler=(event)=>{
		setMarital(event.target.value);
	};

	const clean=()=>{
		setErr(false);
	}

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const storedId=JSON.parse(localStorage.getItem('id'));
				const storelId=JSON.parse(localStorage.getItem('lid'));
				if(storedId && storelId){
					uid=storedId.uid;
					lid=storelId.lid;
					const res=await sendReq("http://localhost:5000/getUserformcoapp",
						"GET",
						null,
						{
							'uid':uid,
							'lid':lid,
							"cors":"no-cors"
						}
					);
					console.log(res);
					if("success" in res.msg && "success2" in res.msg){
						if("data" in res.msg.success && "data" in res.msg.success2){
							console.log('ok');
							setUser(res.msg.success2.data);
							if(res.msg.success.data.gender){
								setGender(res.msg.success.data.gender);
							}if(res.msg.success.data.marital_status){
								setMarital(res.msg.success.data.marital_status);
							}if(res.msg.success.data.dob){
								setDate(new Date(res.msg.success.data.dob))
							}
							setFormData({
								...formState.inputs,
								relation:{
									value:res.msg.success2.data.Relation_to_Applicant,
									valid:true
								},
							},true)
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
	},[sendReq]);


	const nextHandle=async (event)=>{
		console.log(date);
		event.preventDefault();
		try{
			let converted_date=date.toLocaleDateString('en-GB',{
  				day:'numeric',
  				month:'short',
  				year:'numeric'
  			}).replace(/ /g,'-');
  			console.log(converted_date);
  			const storedId=JSON.parse(localStorage.getItem('id'));
			if(storedId){
				uid=storedId.uid;
			}
			if(uid && pid==1){
				res=await sendReq('http://localhost:5000/coapppersonal',
					'POST',
					JSON.stringify({
						content1:{
							data:{
								gender:gender,
								//loan_app_dob:converted_date,
								dob:converted_date,
								marital_status:marital
							}
						},
						content2:{
							criteria: "(lid.contains(\"EC15d85e8624cb8eb\"))",
							data:{
								Relation_to_Applicant:formState.inputs.relation.value
							}
						}
					}),
					{
						'Content-Type':'application/json',
						'uid':uid,
						"cors":"no-cors"
					},
				);
				console.log(res);
				if("success" in res.msg){
					if("message" in res.msg.success){
						if(res.msg.success.message==="Data Updated Successfully"){
							setFront(true);
							if(parseInt(pid)==1){
								localStorage.setItem(
									'pid',
									JSON.stringify({pid:2})
								);
							}
						}else{
							setErr("database error");
						}
					}else{
						setErr("database error");
					}
				}else if('date_err' in res.msg){
						setErr(res.msg.date_err);
				}else if('error' in res.msg){
						setErr(res.msg.error);
				}
			}else if(pid>=2){
				setFront(true);
			}
		}catch(err){

		}
		
	}

	const reloadHandle=()=>{
		window.location.reload();
	};

	//if(date){
		//let dd=String(date.getDate()).padStart(2,'0');
		//let mmm=String(date.getMonth()+1).padStart(2,'0')
		//let yyyy=date.getFullYear();
		//let converted_date=dd+"-"+mmm+"-"+yyyy;
		//console.log(converted_date);
	//}

	let element=null;

	if(front){
		element=<LoanDetails go="update"/>
	}else if(back){
		element=<Form go="update"/>
	}else if(loading){
		element=<Loader asOverlay />
	}else if(props.go && parseInt(pid)>=2){
		if(user && user.Relation_to_Applicant){
			element=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
			
				<h1><center>Personal Details</center></h1>
				<hr/>

				<div className="form-control">
				<Input element="input" type="text" label="Relation with the application"
					id="relation" 
					validators={[VALIDATOR_REQUIRE()]}
					placeholder="Relation with the application" 
					errorText="Please enter your relation with the application"
					disable={true}
					onInput={formInputHandler}
					initvalue={user.Relation_to_Applicant}
					initvalid={true} />

				<label>DOB</label>
					<DatePicker className="form-control"  selected={date}
					placeholderText="Click here to select dob"
					onChange={handleDate}
					disabled={true}
					dateFormat="dd/MM/yyyy"
					showYearDropdown
					nodeRef={nodeRef}
					scrollableMonthYearDropdown />
				</div>

				<div className="form-control" onChange={setGenderHandler}>
					<label>Gender</label>
		        	<input type="radio" value="Male" checked={gender==="Male"} defaultChecked name="gender"/>Male
		        	<input type="radio" value="Female" checked={gender==="Female"} name="gender"/>Female
		        	<input type="radio" value="3rd" name="gender"/>I dont want to disclose
		      	</div>

		      	<div className="form-control" onChange={setMaritalHandler}>
					<label>Marital Status</label>
		        	<input type="radio" value="Unmarried" checked={marital==="Unmarried"} defaultChecked name="marital"/>Unmarried
		        	<input type="radio" value="Married" checked={marital==="Married"} name="marital"/>Married
		        	<input type="radio" value="Divorced" checked={marital==="Divorced"} name="marital"/>Divorced
		      	</div>

		

			<Button onClick={backHandle}>Back</Button>
			<Button type="submit">Next</Button>

			</form>
			</React.Fragment>
			);
		}else{
			element=<UserStatus err={true} reload={reloadHandle}/>;
		}
		}else{
			element=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
			
				<h1><center>Personal Details</center></h1>
				<hr/>

				<div className="form-control">
				<Input element="input" type="text" label="Relation with the application"
					id="relation"  
					validators={[VALIDATOR_REQUIRE()]}
					placeholder="Relation with the application" 
					errorText="Please enter your relation with the application"
					onInput={formInputHandler}
					initvalue={formState.inputs.relation.value}
					initvalid={formState.isValid} />
				</div>
				<div className="form-control" onChange={setGenderHandler}>
				<label>DOB</label>
					<DatePicker className="form-control"  selected={date}
					placeholderText="Click here to select dob"
					onChange={handleDate}
					dateFormat="dd/MM/yyyy"
					showYearDropdown
					nodeRef={nodeRef}
					scrollableMonthYearDropdown />
				</div>

				<div className="form-control" onChange={setGenderHandler}>
					<label>Gender</label>
		        	<input type="radio" value="Male" defaultChecked name="gender"/>Male
		        	<input type="radio" value="Female" name="gender"/>Female
		        	<input type="radio" value="3rd" name="gender"/>I dont want to disclose
		      	</div>

		      	<div className="form-control" onChange={setMaritalHandler}>
					<label>Marital Status</label>
		        	<input type="radio" value="Unmarried" defaultChecked name="marital"/>Unmarried
		        	<input type="radio" value="Married" name="marital"/>Married
		        	<input type="radio" value="Divorced" name="marital"/>Divorced
		      	</div>

		

			<Button onClick={backHandle}>Back</Button>
			<Button type="submit" disabled={!valid}>Next</Button>

			</form> 
			</React.Fragment>
		);
		}	
	

	return(
		<div>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{element}
		</div>
	);
};

export default Personal;

