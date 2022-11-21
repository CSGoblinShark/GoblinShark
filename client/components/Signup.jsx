import React, { Component, useState, useEffect } from 'react';
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
  const { state } = useLocation();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  let showSalary = false;
  let showEmail = false;

  let element = document.getElementById('verification');
  let addError = function () { element.classList.add('error'); };
  const removeError = function () { setMatchVer('') };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('/api/checkVerification', { params: { verification: event.target.verification.value } })
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
            showemail: showEmail,
            residentAlum: event.target.residentAlum.value,
            cohortLocation: event.target.cohortLocation.value,
            city: event.target.city.value.charAt(0).toUpperCase() + event.target.city.value.slice(1),
            employed: event.target.employed.value,
            employer: event.target.employer.value.charAt(0).toUpperCase() + event.target.employer.value.slice(1),
            salary: event.target.salary.value,
            showsalary: showSalary,
            cohortNum: event.target.cohortNum.value,
            // password: '00000000',
            // passwordConfirm: '00000000',
            linkedin: event.target.linkedin.value,
            verification: event.target.verification.value,
          })
            .then((data) => {
              setSignPage(!signupPage);
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
      <h1 style={{ 'font-weight': 'bold', 'font-size': '30px' }}> Sign up </h1>
      {!signupPage ?
        <form onSubmit={handleSubmit} id="formBox">
          <label for='firstName'>First name:</label>
          <input type='text' id='firstName' placeholder='first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>

          <label for='lastName'>Last name:</label>
          <input type='text' id='lastName' placeholder='last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>

          <label for='email'>Email:<br></br></label>
          <input type='text' id='email' placeholder='email' value={state.email} disabled='disabled' required></input>

          <div className='visibility'>
            <label for='emailVisibility'>Make your email visible to other Codesmith residents/alumn?<br></br></label>
            <input type='checkbox' value={showEmail} onChange={() => showEmail = !showEmail} id='emailVisibility'></input>
          </div>

          <label for='residentAlum'>Resident/Alumni:<br></br></label>
          <select id='residentAlum'>
            <option value="resident">Resident</option>
            <option value="alumni">Alumni</option>
          </select>

          <label for='cohortLocation'> Cohort Location: </label>
          <select id='cohortLocation'>
            <option value="WCRI">West Coast Immersive</option>
            <option value="ECRI">East Coast Immersive</option>
            <option value="CRI">Central Immersive</option>
            <option value="PTRI">Part Time Immersive</option>
          </select>

          <label for='cohortNum'>Cohort Number:<br></br></label>
          <input type='number' id='cohortNum' placeholder='Cohort Number' required></input>

          <label for='city'>City:<br></br></label>
          <input type='text' id='city' placeholder='City' required></input>

          <label for='linkedin'>LinkedIn:<br></br></label>
          <input type='url' id='linkedin' placeholder='Linkedin' required></input>

          <label for='employed'> Employment Status: </label>
          <select id='employed'>
            <option value="true">Currently Unemployed</option>
            <option value="false">Currently Employed</option>
          </select>

          <label for='employer'>Employer:<br></br></label>
          <input type='text' id='employer' placeholder='Job Title' required></input>

          <label for='salary'>Current Salary:<br></br></label>
          <input type='number' id='salary' placeholder='Current Salary' required></input>

          <div className='visibility'>
            <label for='salaryVisibility'>Make your salary visible to other Codesmith residents/alumn?<br></br></label>
            <input type='checkbox' value={showSalary} onChange={() => showSalary = !showSalary} id='salaryVisibility'></input>
          </div>

          <label for='verification'>Verification code:<br></br></label>
          <input type='text' id='verification' placeholder='Verification Code' onChange={removeError} required></input>

          <button id='submitButton' type='submit'>Submit</button>
        </form>
        : <Redirect to='/home' />}
    </div>
  )
}

export default withRouter(Signup)

