import React,{useState,useEffect} from 'react';
import './form.css';
import '../../shared/components/formelements/input.css';
import Form from './form';
import {useForm} from '../../shared/hooks/form_hook';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_POSITIVE} from '../../shared/util/validator';
import Personal from './personal_details';
import Residence from './residence';
import {useHttp} from '../../shared/hooks/http_hook';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import UserStatus from '../../shared/components/status/user_status';
import Status from '../../shared/components/status/status';


const LoanDetails=(props)=>{
	let uid=null;
	let lid=null;
	let pid=null;
	let res=null;
	let element=null;
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	const [school,setSchool]=useState("Other");
	const [back,setBack]=useState(false);
	const [front,setFront]=useState(false);
	const [user,setUser]=useState(null);
	const [err,setErr]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formState,formInputHandler,setFormData]=useForm(
		{
			inst_name:{
				value:'',
				isValid:false
			},
			loc:{
				value:'',
				isValid:false
			},
			c_name:{
				value:'',
				isValid:false
			},
			tenure:{
				value:'',
				isValid:false
			},
			amount:{
				value:'',
				isValid:false
			},
			amount_fn:{
				value:'',
				isValid:false
			},
			loan_tenure:{
				value:'',
				isValid:false
			}
		},false
	);

	const [formState1,formInputHandler1,setFormData1]=useForm({
		cls:{
			value:'',
			isValid:false
		},
	},false);


	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const storedId=JSON.parse(localStorage.getItem('lid'));
				if(storedId){
					lid=storedId.lid;
					res=await sendReq("http://localhost:5000/getloandetails",
						"GET",
						null,
						{
							'lid':lid,
							"cors":"no-cors"
						}
					);
					console.log(res)
					if("success" in res.msg){
						if("data" in res.msg.success){
							if(res.msg.success.data.Institute_Name !== "" || 
								res.msg.success.data.Institute_Location !== "" || 
								res.msg.success.data.Course_Name !== "" || 
								res.msg.success.data.Course_Tenure !== "" || 
								res.msg.success.data.Course_Fee_Amount !== "" || 
								res.msg.success.data.Financing_Requirement !== "" || 
								res.msg.success.data.Loan_Tenure !== ""){
								setUser(res.msg.success.data);
								if(res.msg.success.data.Type_of_Institute){
									setSchool(res.msg.success.data.Institute_Type);
								}
								setFormData({
									...formState.inputs,
									inst_name:{
										value:res.msg.success.data.Institute_Name,
										isValid:true
									},
									loc:{
										value:res.msg.success.data.Institute_Location,
										isValid:true
									},
									c_name:{
										value:res.msg.success.data.Course_Name,
										isValid:true
									},
									tenure:{
										value:res.msg.success.data.Course_Tenure,
										isValid:true
									},
									amount:{
										value:res.msg.success.data.Course_Fee_Amount,
										isValid:true
									},
									amount_fn:{
										value:res.msg.success.data.Financing_Requirement,
										isValid:true
									},
									loan_tenure:{
										value:res.msg.success.data.Loan_Tenure,
										isValid:true
									}

								},true);

								setFormData1({
									...formState1.inputs,
									cls:{
										value:res.msg.success.data.Class_of_Student,
										isValid:true
									},
								},true);
							}
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

	const setSchoolHandler=(event)=>{
		setSchool(event.target.value);
	};

	const backHandle=()=>{
		setBack(true);
		setFront(false);
	};

	const clean=()=>{
		setErr(false);
	};

	const reloadHandle=()=>{
		window.location.reload();
	};

	const nextHandle=()=>{
		setFront(true);
		if(parseInt(pid)==2){
			localStorage.setItem(
				'pid',
				JSON.stringify({pid:3})
			);
		}
	}

	/*

	const nextHandle=async (event)=>{
		event.preventDefault();
		try{
  			const storedId=JSON.parse(localStorage.getItem('id'));
  			const storelId=JSON.parse(localStorage.getItem('lid'));
			if(storedId && storelId){
				uid=storedId.uid;
				lid=storelId.lid;
			}
			if(uid && lid && pid==2){
				res=await sendReq('http://localhost:5000/form2',
					'POST',
					JSON.stringify({
						data:{
							Institute_Name:formState.inputs.inst_name.value,
							//Type_of_Institute:school,
							Institute_Type:school,
							//Location_of_Institute:formState.inputs.loc.value,
							Institute_Location:formState.inputs.loc.value,
							Course_Name:formState.inputs.c_name.value,
							Class_of_Student:element ? formState1.inputs.cls.value : "",
							Course_Tenure:formState.inputs.tenure.value,
							Course_Fee_Amount:formState.inputs.amount.value,
							//financing_required:formState.inputs.amount_fn.value,
							Financing_Requirement:formState.inputs.amount_fn.value,
							Loan_Tenure:formState.inputs.loan_tenure.value
						}
					}),
					{
						'Content-Type':'application/json',
						'lid':lid,
						"cors":"no-cors"
					},
				);
				console.log(res);
				if("success" in res.msg){
					if("message" in res.msg.success){
						if(res.msg.success.message==="Data Updated Successfully"){
							setFront(true);
							if(parseInt(pid)==2){
								localStorage.setItem(
									'pid',
									JSON.stringify({pid:3})
								);
							}
						}else{
							setErr("database error");
						}
					}else{
						setErr("database error");
					}
				}else if('tenure_err' in res.msg){
					setErr(res.msg.tenure_err);
				}else if('amt_err' in res.msg){
					setErr(res.msg.amt_err);
				}
			}else if(pid>=3){
				setFront(true);
			}
		}catch(err){

		}
		
	}

	*/


	

	if(school==="School"){
		if(user && user.Institute_Type){
			element=(
				<Input element="input" type="text" label="Class of Student" 
				validators={[VALIDATOR_REQUIRE()]}
				id="cls"
				placeholder="Class of Student"
				errorText="Please enter class"
				disable={true}
				onInput={formInputHandler1}
				initvalue={user.Class_of_Student}
				initvalid={true} />
			);
		}/*else{
			element=(
				<Input element="input" type="text" label="Class of Student" 
				validators={[VALIDATOR_REQUIRE()]}
				id="cls"
				placeholder="Class of Student"
				errorText="Please enter class"
				onInput={formInputHandler1}
				initvalue={formState1.inputs.cls.value}
				initvalid={formState1.inputs.cls.isValid} />
			);
		}*/
	}else{
		element=null;
	}




	let component=null;

	if(front){
		component=<Residence go="update"/>;
	}else if(back){
		component=<Personal go="update"/>;
	}else if(loading){
		component=<Loader asOverlay />
	}else if(props.go && parseInt(pid)>=2){
		if(user && user.Institute_Type){
			component=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
				<h1><center>Loan Details</center></h1>
				<hr/>
				<Input element="input" type="text" label="Institute name"
				id="inst_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Institute name" 
				errorText="Please enter institute name"
				onInput={formInputHandler}
				disable={true}
				initvalue={user.Institute_Name}
				initvalid={true} />

				<div className="form-control" onChange={setSchoolHandler}>
					<label>Type Of Institute</label>
		        	<input type="radio" value="School" checked={school==="School"} name="sch"/>School
		        	<input type="radio" value="Other" checked={school==="Other"} name="sch"/>Other
		      	</div>

				<Input element="input" type="text" label="Location of Institute"
				id="loc" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Location"
				disable={true}
				errorText="Please enter location of institute"
				onInput={formInputHandler}
				initvalue={user.Institute_Location}
				initvalid={true} />

				{element}

				<Input element="input" type="text" label="Course Name" 
				validators={[VALIDATOR_REQUIRE()]}
				id="c_name"
				placeholder="Course Name"
				errorText="Please enter course name"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Course_Name}
				initvalid={true} />

				<Input element="input" type="number" label="Course Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="tenure"
				placeholder="0"
				errorText="Course tenure must be a positive number"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Course_Tenure}
				initvalid={true} />

				<Input element="input" type="number" label="Course Fee Amount" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount"
				placeholder="0"
				errorText="Amount must not be empty and a positive number"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Course_Fee_Amount}
				initvalid={true} /> 

				<Input element="input" type="number" label="Amount of financing required (Rs.)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount_fn"
				placeholder="0"
				errorText="Amount must not be empty and a positive number"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Financing_Requirement}
				initvalid={true} />

				<Input element="input" type="number" label="Loan Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="loan_tenure"
				placeholder="0"
				errorText="Loan tenure must be a positive number"
				disable={true}
				onInput={formInputHandler}
				initvalue={user.Loan_Tenure}
				initvalid={true} />

				<Button onClick={backHandle}>Back</Button>
				<Button type="submit" disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Next</Button> 

				</form>
				</React.Fragment>
			);
		}else{
			component=<UserStatus err={true} reload={reloadHandle}/>;
		}
	}/*else{

			component=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
				<h1><center>Loan Details</center></h1>
				<hr/>
				<Input element="input" type="text" label="Institute name"
				id="inst_name" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Institute name" 
				errorText="Please enter institute name"
				initvalue={formState.inputs.inst_name.value}
				initvalid={formState.inputs.inst_name.isValid}
				onInput={formInputHandler} />

				<div className="form-control" onChange={setSchoolHandler}>
					<label>Type Of Institute</label>
		        	<input type="radio" value="School" checked={school==="School"} name="sch"/>School
		        	<input type="radio" value="Other" checked={school==="Other"} name="sch"/>Other
		      	</div>

				<Input element="input" type="text" label="Location of Institute"
				id="loc" 
				validators={[VALIDATOR_REQUIRE()]}
				placeholder="Location"
				errorText="Please enter location of institute"
				initvalue={formState.inputs.loc.value}
				initvalid={formState.inputs.loc.isValid}
				onInput={formInputHandler} />

				{element}

				<Input element="input" type="text" label="Course Name" 
				validators={[VALIDATOR_REQUIRE()]}
				id="c_name"
				placeholder="Course Name"
				errorText="Please enter course name"
				initvalue={formState.inputs.c_name.value}
				initvalid={formState.inputs.c_name.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Course Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="tenure"
				placeholder="0"
				errorText="Course tenure must be a positive number"
				initvalue={formState.inputs.tenure.value}
				initvalid={formState.inputs.tenure.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Course Fee Amount" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount"
				placeholder="0"
				errorText="Amount must not be empty and a positive number"
				initvalue={formState.inputs.amount.value}
				initvalid={formState.inputs.amount.isValid}
				onInput={formInputHandler} /> 

				<Input element="input" type="number" label="Amount of financing required (Rs.)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="amount_fn"
				placeholder="0"
				errorText="Amount must not be empty and a positive number"
				initvalue={formState.inputs.amount_fn.value}
				initvalid={formState.inputs.amount_fn.isValid}
				onInput={formInputHandler} />

				<Input element="input" type="number" label="Loan Tenure (months)" 
				validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
				id="loan_tenure"
				placeholder="0"
				errorText="Loan tenure must be a positive number"
				initvalue={formState.inputs.loan_tenure.value}
				initvalid={formState.inputs.loan_tenure.isValid}
				onInput={formInputHandler} />

				<Button onClick={backHandle}>Back</Button>
				<Button type="submit" disabled={!formState.isValid || (element ? !formState1.isValid : false)}>Next</Button> 

				</form>
				</React.Fragment>
			);
		}*/
		


	return (
		<div>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
		</div>
	);
};

export default LoanDetails;