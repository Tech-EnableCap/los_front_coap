import React,{useRef,useState,useEffect} from 'react';
import './image_picker.css';
import './input.css';
import Button from '../../../../src/ui/button';

const ImagePicker=(props)=>{
	let element=null;
	let btn=null;
	let block=null;
	let ftype="";
	const [file,setFile]=useState();
	const [show,setShow]=useState(true);
	const [preview,setPreview]=useState();
	const [valid,setValid]=useState(false);

	const imagePick=useRef();

	useEffect(()=>{
		if(!file){
			return;
		}
		const fileReader=new FileReader();
		fileReader.onload=()=>{
			setPreview(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	},[file]);

	const pickedHandler=(event)=>{
		let pickedFile;
		let fileValid=valid;
		if(event.target.files && event.target.files.length===1 && event.target.files[0].size*0.000001<=1.5){
			pickedFile=event.target.files[0];
			setFile(pickedFile);
			setValid(true);
			fileValid=true;
		}else{
			setValid(false);
			fileValid=false;
			alert("File must be under 1.5 MB");
		}
		props.onInput(props.id,pickedFile,fileValid);
	}

	const imageHandler=()=>{
		imagePick.current.click();
	}

	const cancelHandler=(e)=>{
		setShow(false);
	}

	if(props.showbtn){
		//btn=<Button type="button" onClick={cancelHandler}>Pick Image</Button>;
		btn=<span onClick={cancelHandler}><i class="fas fa-trash-alt fa-lg"></i></span>
	}

	
	if(preview){
		ftype=file.name.split(".")[1]
		if(ftype==="pdf"){
			element=file.name
		}else{
			element=<img src={preview} alt="Preview"/>;
		}	
	}else if(props.image){
		element=<img src={props.image} alt="Preview"/>;
	}else if(!preview){
		element=<p>Please select file</p>
	}

	return(
		<div>{show ? (<div className="form-control">
			<input id={props.id}
			ref={imagePick}
			style={{display:'none'}} 
			type="file"
			onChange={pickedHandler}
			accept={!props.ft ? ".jpg,.png,.jpeg" : ".jpg,.png,.jpeg,.pdf"}/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					{element}
				</div>
				<div style={{flexDirection:"row"}}>
				{!props.view && <Button type="button" onClick={imageHandler}>Select file</Button>}
			
				</div>
			</div>
			{!valid && <p>{props.errorText}</p>}
		</div>) : null}</div>
	);
};

export default ImagePicker;
