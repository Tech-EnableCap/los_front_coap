import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navigation from './shared/components/navigation/navigation';
import Form from './user/loan_form/form';
import Personal from './user/loan_form/personal_details';
import LoanDetails from './user/loan_form/loan_details';
import Residence from './user/loan_form/residence';
import WorkDetails from './user/loan_form/work_details';
import DocUpload from './user/loan_form/doc';
import UserStatus from './shared/components/status/user_status';
import Footer from './ui/footer';
import './App.css';

function App() {
	let pid=null;
	const pId=JSON.parse(localStorage.getItem('pid'));
	if(pId){
		pid=pId.pid;
	}
	let element=null;
	if(pid){
		if(parseInt(pid)==1){
			element=<Form/>
		}if(parseInt(pid)==2){
			element=<Personal/>
		}if(parseInt(pid)==3){
			element=<LoanDetails/>
		}if(parseInt(pid)==4){
			element=<Residence/>
		}if(parseInt(pid)==5){
			element=<WorkDetails/>
		}if(parseInt(pid)==6){
			element=<DocUpload/>
		}
	}else{
		element=<Form/>
	}
  return (
  	<div className="App">
    <Router>
    
      <Navigation/>
      	<Switch>
        <Route path="/:id" exact>
       	  <UserStatus pid={pid} err={false}/>
          <Footer/>
       </Route>
       <Route path="/:id/form" exact>
        {element}
        <Footer/>
       </Route>
       </Switch>
    </Router>
    </div>
  );
}

export default App;
