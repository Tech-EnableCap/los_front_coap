import React from 'react';
import ImagePicker from '../../shared/components/formelements/image_picker';


const Imageblock=(props)=>{
	return (
			<ImagePicker center id={`image${(props.id)}`} onInput={props.inpHandle} showbtn={props.show}/>
	);
};

export default Imageblock;