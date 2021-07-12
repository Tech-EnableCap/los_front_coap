import React,{useEffect,useState} from 'react';
import './form.css';
import ImagePicker from '../../shared/components/formelements/image_picker';
import {useForm} from '../../shared/hooks/form_hook';
import {useHttp} from '../../shared/hooks/http_hook';
import WorkDetails from './work_details';
import Loader from '../../ui/loader.js';
import Err from '../../ui/error.js';
import Button from '../../ui/button';
import UserStatus from '../../shared/components/status/user_status';
import Status from '../../shared/components/status/status';
import Imageblock from './imageblock';

const DocUpload=(props)=>{
	let uid=null;
	let pid=null;
	let did=null;
	let res=null;
	let list1=[];
	let list2=[];
	let aa=null;
	let ele1=[]
	let ele2=[]
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	const {loading,error,sendReq,clearError}=useHttp();
	const [user,setUser]=useState(null);
	const [back,setBack]=useState(false);
	const [err,setErr]=useState(false);
	const [paysl,setPaysl]=useState(6);
	const [statem,setStatem]=useState(16);
	const [init,setInit]=useState({});
	const [mod,setMod]=useState([]);
	const [dom,setDom]=useState([]);

	const [formState,inputHandler,setFormData]=useForm(
		{
			image1:{
				value:null,
				isValid:false
			},
			image2:{
				value:null,
				isValid:false
			},
			image3:{
				value:null,
				isValid:false
			},
			image4:{
				value:null,
				isValid:false
			},
			image5:{
				value:null,
				isValid:false
			},
			image6:{
				value:null,
				isValid:true
			},
			image7:{
				value:null,
				isValid:true
			},
			image8:{
				value:null,
				isValid:true
			},
			image9:{
				value:null,
				isValid:true
			},
			image10:{
				value:null,
				isValid:true
			},
			image11:{
				value:null,
				isValid:true
			},
			image12:{
				value:null,
				isValid:true
			},
			image13:{
				value:null,
				isValid:true
			},
			image14:{
				value:null,
				isValid:true
			},
			image15:{
				value:null,
				isValid:false
			},
			image16:{
				value:null,
				isValid:true
			},
			image17:{
				value:null,
				isValid:true
			},
			image18:{
				value:null,
				isValid:true
			},
			image19:{
				value:null,
				isValid:true
			},
			image20:{
				value:null,
				isValid:true
			},
			image21:{
				value:null,
				isValid:true
			},
			image22:{
				value:null,
				isValid:true
			},
			image23:{
				value:null,
				isValid:true
			},
			image24:{
				value:null,
				isValid:true
			}
		},false
	);

	useEffect(()=>{
		const getUser=async ()=>{
			try{
				const storedId=JSON.parse(localStorage.getItem('did'));
				if(storedId){
					uid=storedId.did;
					res=await sendReq("http://65.1.107.76:5001/getUserdocs",
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
							if(res.msg.success.data.aadhar_back_img != "" && 
								res.msg.success.data.aadhar_frnt_img != "" && 
								res.msg.success.data.pan_card_img != "" && 
								res.msg.success.data.selfie_img != ""){
								console.log("herer");
								setUser(res.msg.success);
								setFormData({
									image1:{
										value:"https://creator.zoho.in"+res.msg.success.data.selfie_img,
										isValid:true
									},
									image2:{
										value:"https://creator.zoho.in"+res.msg.success.data.pan_card_img,
										isValid:true
									},
									image3:{
										value:"https://creator.zoho.in"+res.msg.success.data.aadhar_frnt_img,
										isValid:true
									},
									image4:{
										value:"https://creator.zoho.in"+res.msg.success.data.aadhar_frnt_img,
										isValid:true
									},
									image5:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc1,
										isValid:true
									},
									image6:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc2,
										isValid:true
									},
									image7:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc3,
										isValid:true
									},
									image8:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc4,
										isValid:true
									},
									image9:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc5,
										isValid:true
									},
									image10:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc6,
										isValid:true
									},
									image11:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc7,
										isValid:true
									},image12:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc8,
										isValid:true
									},image13:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc9,
										isValid:true
									},image14:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc10,
										isValid:true
									},image15:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc11,
										isValid:true
									},image16:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc12,
										isValid:true
									},image17:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc13,
										isValid:true
									},image18:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc14,
										isValid:true
									},image19:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc15,
										isValid:true
									},image20:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc16,
										isValid:true
									},image21:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc17,
										isValid:true
									},image22:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc18,
										isValid:true
									},image23:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc19,
										isValid:true
									},image24:{
										value:"https://creator.zoho.in"+res.msg.success.data.doc20,
										isValid:true
									}
								},true);
								console.log(user);
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
		console.log(formState.inputs);
		try{
			const storedId=JSON.parse(localStorage.getItem('id'));
			if(storedId){
				uid=storedId.uid;
			}
			if(uid){
				const storedId=JSON.parse(localStorage.getItem('did'));
				if(storedId){
					did=storedId.did;
				}
				console.log(did);
				const formData=new FormData();

				for (let i=0;i<24;i++){
					formData.append("image"+(i+1),formState["inputs"]["image"+(i+1)].value)
				}

				/*formData.append("image1",formState.inputs.image1.value);
				formData.append("image2",formState.inputs.image2.value);
				formData.append("image3",formState.inputs.image3.value);
				formData.append("image4",formState.inputs.image4.value);
				formData.append("image5",formState.inputs.image5.value);
				formData.append("image6",formState.inputs.image6.value);
				if(formState.inputs.image7){
					formData.append("image7",formState.inputs.image7.value);
				}
				formData.append("image8",formState.inputs.image8.value);
				formData.append("image9",formState.inputs.image9.value);
				formData.append("image10",formState.inputs.image10.value);*/
				res=await sendReq('http://65.1.107.76:5001/form4',
					'POST',
					formData,
					{
						'uid':did,
						"cors":"no-cors"
					},
				);
				console.log(res)
				//console.log(formData)
				if("success" in res.msg){
					if(res.msg.success==="successfully uploaded"){
						alert("your application is saved, thanks!!");
						window.location.reload();
						if(parseInt(pid)==5){
							localStorage.setItem(
								'pid',
								JSON.stringify({pid:6})
							);
						}
					}
				}else{
					setErr("server error");
				}
			}
		}catch(err){
			console.log(err);
		}
	};

	const backHandle=()=>{
		setBack(true);
	};

	const reloadHandle=()=>{
		window.location.reload();
	};

	const addPayslipHandle=()=>{
		setPaysl(paysl+1);
		if(paysl>14){
			alert("max 10 images you can upload for this section");
			return;
		}
		setMod([...mod,<Imageblock id={paysl} inpHandle={inputHandler} show={true}/>]);

	}


	const addStatementHandle=()=>{
		setStatem(statem+1);
		if(statem>24){
			alert("max 10 images you can upload for this section");
			return;
		}
		setDom([...dom,<Imageblock id={statem} inpHandle={inputHandler} show={true}/>]);
	}



	let component=null;

	if(back){
		component=<WorkDetails/>
	}else if(loading){
		component=<Loader asOverlay />
	}else if(parseInt(pid)>=6){
		if(user){
			for (let i=2;i<11;i++){
				if(user["data"]["doc"+i]!==""){
					console.log(i);
					ele1.push(<div><ImagePicker view={true} center id={`image${i+4}`} image={`https://creator.zoho.in${user["data"]["doc"+i]}`} onInput={inputHandler}/></div>)
				}
			}
			for (let i=12;i<21;i++){
				if(user["data"]["doc"+i]!==""){
					console.log(i);
					ele2.push(<div><ImagePicker view={true} center id={`image${i+4}`} image={`https://creator.zoho.in${user["data"]["doc"+i]}`} onInput={inputHandler}/></div>)
				}
			}
	
			component=(
				<React.Fragment>
				<Status status={pid}/>
				<form className="form" onSubmit={nextHandle}>
				
				<h1><center>Documents upload</center></h1>
				<hr/>
				<div className="form-control">
					<p><strong>Your passport pic</strong></p>
					<ImagePicker center id="image1" view={true} image={formState.inputs.image1.value} onInput={inputHandler}/>
				</div>
				<div className="form-control">
					<p><strong>Your PAN card</strong></p>
					<ImagePicker center id="image2" view={true} image={`https://creator.zoho.in${user.data.pan_card_img}`} onInput={inputHandler}/>
				</div>
				<div className="form-control">
					<p><strong>Front side of your AADHAR card</strong></p>
					<ImagePicker center id="image3" view={true} image={`https://creator.zoho.in${user.data.aadhar_frnt_img}`} onInput={inputHandler}/>
				</div>
				<div className="form-control">
					<p><strong>Back side of your AADHAR card</strong></p>
					<ImagePicker center id="image4" view={true} image={`https://creator.zoho.in${user.data.aadhar_back_img}`} onInput={inputHandler}/>
				</div>
				{(props.payslip==="Salaried") ? (<><div className="form-control">
					<p><strong>last 3 months payslip</strong></p>
					<ImagePicker center id="image5" view={true} image={`https://creator.zoho.in${user.data.doc1}`} onInput={inputHandler}/>
					{ele1.length>0 && ele1.map((e)=>{
						return e
					})}
				</div>
				<div className="form-control">
					<p><strong>last 3 months salary a/c bank statement</strong></p>
					<ImagePicker center id="image15" view={true} image={`https://creator.zoho.in${user.data.doc11}`} onInput={inputHandler}/>
					{ele2.length>0 && ele2.map((e)=>{
						return e
					})}
				</div></>) : (<><div className="form-control">
					<p><strong>last 2 years ITR</strong></p>
					<ImagePicker center id="image5" view={true} image={`https://creator.zoho.in${user.data.doc1}`} onInput={inputHandler}/>
					{ele1.length>0 && ele1.map((e)=>{
						return e
					})}
				</div><div className="form-control">
					<p><strong>last 3 months bank statement</strong></p>
					<ImagePicker center id="image15" view={true} image={`https://creator.zoho.in${user.data.doc11}`} onInput={inputHandler}/>
					{ele2.length>0 && ele2.map((e)=>{
						return e
					})}
				</div></>)}
				<Button onClick={backHandle}>Back</Button>
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
			
			<h1><center>Documents upload</center></h1>
			<hr/>
			<div className="form-control">
				<p><strong>Please upload selfie</strong></p>
				<ImagePicker center id="image1" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select PAN card</strong></p>
				<ImagePicker center id="image2" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select front side of AADHAR card</strong></p>
				<ImagePicker center id="image3" onInput={inputHandler}/>
			</div>
			<div className="form-control">
				<p><strong>Please select back side of AADHAR card</strong></p>
				<ImagePicker center id="image4" onInput={inputHandler}/>
			</div>
			{(props.payslip==="Salaried") ? (<><div className="form-control">
					<p><strong>Please upload last 3 months payslip</strong></p>
					<ImagePicker center id="image5" onInput={inputHandler}/>
					{mod.map((ele,idx)=>{
						return <div key={idx}>{ele}</div>
					})}
					<p onClick={addPayslipHandle}><i class="fa fa-plus" aria-hidden="true"></i></p>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months salary a/c bank statement</strong></p>
					<ImagePicker center id="image15" onInput={inputHandler}/>
					{dom.map((ele,idx)=>{
						return <div key={idx}>{ele}</div>
					})}
					<p onClick={addStatementHandle}><i class="fa fa-plus" aria-hidden="true"></i></p>
				</div></>) : (<><div className="form-control">
					<p><strong>Please upload last 2 years ITR</strong></p>
					<ImagePicker center id="image5" onInput={inputHandler}/>
					{mod.map((ele,idx)=>{
						return <div key={idx}>{ele}</div>
					})}
					<p onClick={addPayslipHandle}><i class="fa fa-plus" aria-hidden="true"></i></p>
				</div><div className="form-control">
					<p><strong>Please upload last 3 months bank statement</strong></p>
					<ImagePicker center id="image15" onInput={inputHandler}/>
					{dom.map((ele,idx)=>{
						return <div key={idx}>{ele}</div>
					})}
					<p onClick={addStatementHandle}><i class="fa fa-plus" aria-hidden="true"></i></p>
				</div></>)}

			
			<Button onClick={backHandle}>Back</Button>
			<Button type="submit" disabled={!formState.isValid}>Done</Button>
			</form>
			</React.Fragment>
		)
	}

	return(
		<div>
			{loading && <Loader asOverlay />}
			<Err error={error} onClear={clearError}/>
			<Err error={err} onClear={clean}/>
			{component}
		</div>
	)
};

export default DocUpload;