import React from 'react';
import './navlink.css';
import {NavLink} from 'react-router-dom';

const Navlinks=(props)=>{
	const url=JSON.parse(localStorage.getItem('url'));
	return(
		<ul className="nav-links">
			<li>
				<NavLink to={`/${url.url}`}>Status</NavLink>
			</li>
			<li>
				<NavLink to={`/${url.url}/form`}>Form</NavLink>
			</li>
		</ul>
	);
};

export default Navlinks;