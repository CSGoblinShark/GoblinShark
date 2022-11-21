import React, {Component,  useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  withRouter
} from "react-router-dom";
import ReactDOM from 'react-dom';

// const { mutate } = params;

function Signup() {
const [signupPage, setSignPage] = useState(false);
const [matchVer, setMatchVer] = useState('');
const {state} = useLocation();

console.log(state);
console.log(state.email);
console.log(state.lastName);
console.log(state.firstName);

let element = document.getElementById('verification');
let addError = function() { element.classList.add('error'); };
const removeError = function() { setMatchVer('') };  

const handleSubmit = (event) => {
  event.preventDefault();
  axios.get('/api/checkVerification', { params: {verification: event.target.verification.value} })
  .then((data) => {
    if (!data.data) {
      setMatchVer('error')
      alert('Invalid Verification Code')
    }
    else {
      axios.post('/api/signup', {
        imageUrl: state.imageUrl,
        firstName: event.target.firstName.value.charAt(0).toUpperCase() + event.target.firstName.value.slice(1),
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        residentAlum: event.target.residentAlum.value,
        cohortLocation: event.target.cohortLocation.value,
        city: event.target.city.value.charAt(0).toUpperCase() + event.target.city.value.slice(1), 
        employed: event.target.employed.value,
        employer: event.target.employer.value.charAt(0).toUpperCase() + event.target.employer.value.slice(1), 
        salary: event.target.salary.value,
        cohortNum: event.target.cohortNum.value,
        // password: '00000000',
        // passwordConfirm: '00000000',
        linkedin: event.target.linkedin.value,
        verification: event.target.verification.value,
      })
      .then((data) => {
        setSignPage(!signupPage);
        console.log(signupPage)
      })
      .catch(console.log('error'));
    }
  })
  // axios.post('/api/signup', {
  //   imageUrl: state.imageUrl,
  //   firstName: event.target.firstName.value.charAt(0).toUpperCase() + event.target.firstName.value.slice(1),
  //   lastName: event.target.lastName.value,
  //   email: event.target.email.value,
  //   residentAlum: event.target.residentAlum.value,
  //   cohortLocation: event.target.cohortLocation.value,
  //   city: event.target.city.value.charAt(0).toUpperCase() + event.target.city.value.slice(1), 
  //   employed: event.target.employed.value,
  //   employer: event.target.employer.value.charAt(0).toUpperCase() + event.target.employer.value.slice(1), 
  //   salary: event.target.salary.value,
  //   cohortNum: event.target.cohortNum.value,
  //   // password: '00000000',
  //   // passwordConfirm: '00000000',
  //   linkedin: event.target.linkedin.value,
  //   verification: event.target.verification.value,
  // })
  // .then((data) => {
  //   setSignPage(!signupPage);
  //   console.log(signupPage)
  // })
  // .catch(console.log('error'));
}

  return (
    <div id="signUpBody">
    <h1 style={{'font-weight': 'bold', 'font-size': '30px'}}> Sign up </h1> 
    {!signupPage ? 
    <form onSubmit={handleSubmit} id="formBox">
        <label for='firstName'>First name:</label>
        <input type='text' id='firstName' placeholder='first name' value={state.firstName} required></input>
        
        <label for='lastName'>Last name:</label>
        <input type='text' id='lastName' placeholder='last name' value={state.lastName} required></input>

        <label for='email'>Email:<br></br></label>
        <input type='text' id='email' placeholder='email' value={state.email} disabled='disabled' required></input>

        <label for='residentAlum'>Resident/Alumni:<br></br></label>
        <select id='residentAlum'> 
          <option value="resident">Resident</option>
          <option value="alumni">Alumni</option>
        </select>

        <label for='cohortLocation'> Cohort Location: </label>
        <select id='cohortLocation'> 
          <option value="WCRI">WCRI</option>
          <option value="ECRI">ECRI</option>
          <option value="PTRI">PTRI</option>
        </select>

        <label for='cohortNum'>Cohort Number:<br></br></label>
        <input type='number' id='cohortNum' placeholder='Cohort Number' required></input>
        
        <label for='city'>City:<br></br></label>
        <input type='text' id='city' placeholder='City' required></input>

        <label for='linkedin'>Linkedin:<br></br></label>
        <input type='url' id='linkedin' placeholder='Linkedin' required></input>

        <label for='employed'> Employed: </label>
        <select id='employed'> 
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <label for='employer'>Employer:<br></br></label>
        <input type='text' id='employer' placeholder='Job Title' required></input>
        
        <label for='salary'>Estimated Salary:<br></br></label>
        <input type='number' id='salary' placeholder='Estimated Salary' required></input>
        
        <label for='verification'>Verification code:<br></br></label>
        <input type='text' id='verification' class={matchVer} placeholder='Verification Code' onChange={removeError} required></input>
        <button id='submitButton' type='submit'>Submit</button>
    </form>
    : <Redirect to='/home'/>}
    </div>
  )
}

export default withRouter(Signup)

