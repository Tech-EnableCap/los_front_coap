import React,{useState,useCallback,useEffect} from 'react';
import './form.css';
import '../../shared/components/formelements/input.css';
import {useForm} from '../../shared/hooks/form_hook';
import Input from '../../shared/components/formelements/input';
import {VALIDATOR_REQUIRE,VALIDATOR_NUMBER,VALIDATOR_POSITIVE,VALIDATOR_PAN} from '../../shared/util/validator';
import {useHttp} from '../../shared/hooks/http_hook';
import Residence from './residence';
import DocUpload from './doc';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import UserStatus from '../../shared/components/status/user_status';
import Status from '../../shared/components/status/status';

const WorkDetails=(props)=>{
	let uid=null;
	let pid=null;
	let res=null;
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	const [salaried,setSalaried]=useState("Salaried");
	const [activeloan,setActiveloan]=useState("Yes");
	const [back,setBack]=useState(false);
	const [front,setFront]=useState(false);
	const [user,setUser]=useState(null);
	const [err,setErr]=useState(false);
	const {loading,error,sendReq,clearError}=useHttp();
	const [formState,formInputHandler,setFormData]=useForm(
		{
			no_emi:{
				value:'',
				isValid:false
			},
			pan:{
				value:'',
				isValid:false
			},
			comp:{
				value:'',
				isValid:false
			},
			address:{
				value:'',
				isValid:false
			},
			city:{
				value:'',
				isValid:false
			},
			state:{
				value:'',
				isValid:false
			},
			postal:{
				value:'',
				isValid:false
			},
			sal:{
				value:'',
				isValid:false
			},
			desig:{
				value:'',
				isValid:false
			},
			work_exp:{
				value:'',
				isValid:false
			},
			cur_job:{
				value:'',
				isValid:false
			}
		},false
	);

	const setSalHandler=(event)=>{
		setSalaried(event.target.value);
	};

	const setLoanHandler=(event)=>{
		setActiveloan(event.target.value);
	};

	const backHandle=()=>{
		setBack(true);
		setFront(false);
	};

	const reloadHandle=()=>{
		window.location.reload();
	};

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
					if("success" in res.msg){
						if("data" in res.msg.success){
							console.log(res);
							if(res.msg.success.data.emp_type !== "" || 
								res.msg.success.data.active_loan_st !== "" || 
								res.msg.success.data.pan !== "" || 
								res.msg.success.data.company_name !== "" || 
								res.msg.success.data.month_sal !== "" || 
								res.msg.success.data.cur_desig !== "" || 
								res.msg.success.data.tot_work_exp !== "" || 
								res.msg.success.data.cur_job_yrs !== ""){

								setUser(res.msg.success.data);
								if(res.msg.success.data.emp_type){
									setSalaried(res.msg.success.data.emp_type);
								}if(res.msg.success.data.active_loan_st){
									setActiveloan(res.msg.success.data.active_loan_st);
								}

								setFormData({
									...formState.inputs,
									no_emi:{
										value:res.msg.success.data.tot_cur_emi,
										isValid:true
									},
									pan:{
										value:res.msg.success.data.pan,
										isValid:true
									},
									comp:{
										value:res.msg.success.data.company_name,
										isValid:true
									},
									address:{
										value:res.msg.success.data.company_addr.address_line_12,
										isValid:true
									},
									city:{
										value:res.msg.success.data.company_addr.district_city2,
										isValid:true
									},
									state:{
										value:res.msg.success.data.company_addr.state_province2,
										isValid:true
									},
									postal:{
										value:res.msg.success.data.company_addr.postal_code2,
										isValid:true
									},
									sal:{
										value:res.msg.success.data.month_sal,
										isValid:true
									},
									desig:{
										value:res.msg.success.data.cur_desig,
										isValid:true
									},
									work_exp:{
										value:res.msg.success.data.tot_work_exp,
										isValid:true
									},
									cur_job:{
										value:res.msg.success.data.cur_job_yrs,
										isValid:true
									}

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

	const clean=()=>{
		setErr(false);
	};


	const nextHandle=async (event)=>{
		event.preventDefault();
		console.log("here");
		try{
  			const storedId=JSON.parse(localStorage.getItem('id'));
			if(storedId){
				uid=storedId.uid;
			}
			if(uid && pid==4){
				res=await sendReq('http://65.1.107.76:5001/form2',
					'POST',
					JSON.stringify({
						data:{
							emp_type:salaried,
							active_loan_st:activeloan,
							tot_cur_emi:formState.inputs.no_emi.value,
							pan:formState.inputs.pan.value,
							company_name:formState.inputs.comp.value,
							company_addr: {
					            address_line_12:formState.inputs.address.value,
					            display_value: "",
					            address_line_22: "",
					            longitude2: "",
					            state_province2:formState.inputs.state.value,
					            latitude: "",
					            postal_code2:formState.inputs.postal.value,
					            district_city2:formState.inputs.city.value,
					            longitude: "",
					            latitude2: "",
					            country2:"India"
					        },
					        month_sal:formState.inputs.sal.value,
					        cur_desig:formState.inputs.desig.value,
					        tot_work_exp:formState.inputs.work_exp.value,
					        cur_job_yrs:formState.inputs.cur_job.value
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
							if(parseInt(pid)==4){
								localStorage.setItem(
									'pid',
									JSON.stringify({pid:5})
								);
							}
						}else{
							setErr("database error");
						}
					}else{
						setErr("database error");
					}
				}else if('sal_err' in res.msg){
					setErr(res.msg.sal_err);
				}else if('exp_err' in res.msg){
					setErr(res.msg.exp_err);
				}
			}else if(pid>=5){
				setFront(true);
			}
		}catch(err) {
			console.log(err);
		} 
	}

	let component=null;
	if(front){
		component=<DocUpload/>
	}
	else if(back){
		component=<Residence/>
	}else if(loading){
		component=<Loader asOverlay />
	}else if(parseInt(pid)>=5){
		if(user && user.pan){
			component=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
				<h1><center>Work Details</center></h1>
				<hr/>
				<div className="form-control" onChange={setSalHandler}>
					<label>I am</label>
		        	<input type="radio" value="Salaried" checked={salaried==="Salaried"} defaultChecked name="sal"/>Salaried
		        	<input type="radio" value="Self Employed Professional" checked={salaried==="Self Employed Professional"} name="sal"/>Self Employed Professional
		        	<input type="radio" value="Self Employed Non Professional" checked={salaried==="Self Employed Non Professional"} name="sal"/>Self Employed Non Professional
		      	</div>

		      	<div className="form-control" onChange={setLoanHandler}>
					<label>Do you have an active loan ?</label>
		        	<input type="radio" value="Yes" checked={activeloan==="Yes"} defaultChecked name="loan"/>Yes
		        	<input type="radio" value="No" checked={activeloan==="No"} name="loan"/>No
		      	</div>

		      	<Input element="input" type="number" label="Total Current EMIs" 
					validators={[VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="no_emi"
					placeholder="0"
					disable={true}
					errorText="Please enter valid positive number"
					onInput={formInputHandler}
					initvalue={user.tot_cur_emi}
					initvalid={true} />

				<Input element="input" type="text" label="Please enter PAN card number" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_PAN()]}
					id="pan"
					placeholder="PAN number"
					disable={true}
					errorText="Invalid valid PAN number format"
					onInput={formInputHandler}
					initvalue={user.pan}
					initvalid={true} />

				<Input element="input" type="text" label="Company name" 
					validators={[VALIDATOR_REQUIRE()]}
					id="comp"
					placeholder="Company name"
					disable={true}
					errorText="Please Enter Full Name as per ROC"
					onInput={formInputHandler}
					initvalue={user.company_name}
					initvalid={true} />

					<div className="form-control">
						<Input element="textarea" label="Company address" 
						validators={[VALIDATOR_REQUIRE()]}
						id="address"
						errorText="Please enter your company address"
						disable={true}
						onInput={formInputHandler}
						initvalue={user.company_addr.address_line_12}
						initvalid={true} />

						<Input element="input" type="text" label="Enter City" 
						validators={[VALIDATOR_REQUIRE()]}
						id="city"
						placeholder="City"
						errorText="Please enter city"
						disable={true}
						onInput={formInputHandler}
						initvalue={user.company_addr.district_city2}
						initvalid={true} />

						<Input element="input" type="text" label="Enter State" 
						validators={[VALIDATOR_REQUIRE()]}
						id="state"
						placeholder="State"
						errorText="Please enter state"
						disable={true}
						onInput={formInputHandler}
						initvalue={user.company_addr.state_province2}
						initvalid={true} />

						<Input element="input" type="number" label="Postal code" 
						validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
						id="postal"
						placeholder="Postal code"
						disable={true}
						errorText="Please enter proper postal code"
						onInput={formInputHandler}
						initvalue={user.company_addr.postal_code2}
						initvalid={true} />
					</div>

					<Input element="input" type="number" label="Monthly Net Salary / Income (Rs.)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="sal"
					placeholder="0"
					errorText="Please enter valid positive number"
					disable={true}
					onInput={formInputHandler}
					initvalue={user.month_sal}
					initvalid={true}/>

					<Input element="input" type="text" label="Current Designation" 
					validators={[VALIDATOR_REQUIRE()]}
					id="desig"
					placeholder="Current Designation"
					errorText="Please Enter Current Designation"
					disable={true}
					onInput={formInputHandler}
					initvalue={user.cur_desig}
					initvalid={true} />

					<Input element="input" type="number" label="Total Work Experience (in years)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="work_exp"
					placeholder="Total Work Experience (in years)"
					errorText="Please enter valid positive value"
					disable={true}
					onInput={formInputHandler}
					initvalue={user.tot_work_exp}
					initvalid={true} />
			
					<Input element="input" type="number" label="Number of years in Current Job" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="cur_job"
					placeholder="Number of years in Current Job"
					errorText="Please enter valid positive value"
					disable={true}
					onInput={formInputHandler}
					initvalue={user.cur_job_yrs}
					initvalid={true} />

					<Button onClick={backHandle}>Back</Button>
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
				<h1><center>Work Details</center></h1>
				<hr/>
				<div className="form-control" onChange={setSalHandler}>
					<label>I am</label>
		        	<input type="radio" value="Salaried" checked={salaried==="Salaried"} name="sal"/>Salaried
		        	<input type="radio" value="Self Employed Professional" checked={salaried==="Self Employed Professional"} name="sal"/>Self Employed Professional
		        	<input type="radio" value="Self Employed Non Professional" checked={salaried==="Self Employed Non Professional"} name="sal"/>Self Employed Non Professional
		      	</div>

		      	<div className="form-control" onChange={setLoanHandler}>
					<label>Do you have an active loan ?</label>
		        	<input type="radio" value="Yes" checked={activeloan==="Yes"} name="loan"/>Yes
		        	<input type="radio" value="No" checked={activeloan==="No"} name="loan"/>No
		      	</div>

		      	<Input element="input" type="number" label="Total Current EMIs" 
					validators={[VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="no_emi"
					placeholder="0"
					errorText="Please enter valid positive number"
					onInput={formInputHandler}
					initvalue={formState.inputs.no_emi.value}
					initvalid={formState.inputs.no_emi.isValid} />

				<Input element="input" type="text" label="Please enter PAN card number" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_PAN()]}
					id="pan"
					placeholder="PAN number"
					errorText="Invalid valid PAN number format"
					onInput={formInputHandler}
					initvalue={formState.inputs.pan.value}
					initvalid={formState.inputs.pan.isValid} />

				<Input element="input" type="text" label="Company name" 
					validators={[VALIDATOR_REQUIRE()]}
					id="comp"
					placeholder="Company name"
					errorText="Please Enter Full Name as per ROC"
					onInput={formInputHandler}
					initvalue={formState.inputs.comp.value}
					initvalid={formState.inputs.comp.isValid} />

				<div className="form-control">
					<Input element="textarea" label="Company address" 
					validators={[VALIDATOR_REQUIRE()]}
					id="address"
					errorText="Please enter your company address"
					onInput={formInputHandler}
					initvalue={formState.inputs.address.value}
					initvalid={formState.inputs.address.isValid} />

					<Input element="input" type="text" label="Enter City" 
					validators={[VALIDATOR_REQUIRE()]}
					id="city"
					placeholder="City"
					errorText="Please enter city"
					onInput={formInputHandler}
					initvalue={formState.inputs.city.value}
					initvalid={formState.inputs.city.isValid} />

					<Input element="input" type="text" label="Enter State" 
					validators={[VALIDATOR_REQUIRE()]}
					id="state"
					placeholder="State"
					errorText="Please enter state"
					onInput={formInputHandler}
					initvalue={formState.inputs.state.value}
					initvalid={formState.inputs.state.isValid} />

					<Input element="input" type="number" label="Postal code" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="postal"
					placeholder="Postal code"
					errorText="Please enter proper postal code"
					onInput={formInputHandler}
					initvalue={formState.inputs.postal.value}
					initvalid={formState.inputs.postal.isValid} />
					</div>

					<Input element="input" type="number" label="Monthly Net Salary / Income (Rs.)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="sal"
					placeholder="0"
					errorText="Please enter valid positive number"
					onInput={formInputHandler}
					initvalue={formState.inputs.sal.value}
					initvalid={formState.inputs.sal.isValid} />

					<Input element="input" type="text" label="Current Designation" 
					validators={[VALIDATOR_REQUIRE()]}
					id="desig"
					placeholder="Current Designation"
					errorText="Please Enter Current Designation"
					onInput={formInputHandler}
					initvalue={formState.inputs.desig.value}
					initvalid={formState.inputs.desig.isValid} />

					<Input element="input" type="number" label="Total Work Experience (in years)" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="work_exp"
					placeholder="Total Work Experience (in years)"
					errorText="Please enter valid positive value"
					onInput={formInputHandler}
					initvalue={formState.inputs.work_exp.value}
					initvalid={formState.inputs.work_exp.isValid} />
			
					<Input element="input" type="number" label="Number of years in Current Job" 
					validators={[VALIDATOR_REQUIRE(),VALIDATOR_NUMBER(),VALIDATOR_POSITIVE()]}
					id="cur_job"
					placeholder="Number of years in Current Job"
					errorText="Please enter valid positive value"
					onInput={formInputHandler}
					initvalue={formState.inputs.cur_job.value}
					initvalid={formState.inputs.cur_job.isValid} />

					<Button onClick={backHandle}>Back</Button>
					<Button type="submit" disabled={!formState.isValid}>Next</Button>

					</form>
					</React.Fragment>

			);
	}

	return(
		<div>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
		</div>
	);
};

export default WorkDetails;