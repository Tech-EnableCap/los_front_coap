import React from 'react';
import './navlink.css';
import {NavLink} from 'react-router-dom';

const Navlinks=(props)=>{
	const id=window.location.href.split("/").slice(-2)[0];
	const url=JSON.parse(localStorage.getItem('url'));
	if(!url){
		localStorage.setItem(
			'url',
			JSON.stringify({url:id})
		);
	}
	return(
		<ul className="nav-links">
			<li>
				<NavLink to={`/${url && url.url}`}>Status</NavLink>
			</li>
			<li>
				<NavLink to={`/${url && url.url}/form`}>Form</NavLink>
			</li>
		</ul>
	);
};

export default Navlinks;