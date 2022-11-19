import React, { useState } from 'react';
import axios from 'axios';
// const { mutate } = params;

function Signup() {

// const res = async () => await fetch ('http://127.0.0.1:8090/api/collections/users/records').then((data) => {
  
// })

// const showAllUsers = (event) => {
//   event.preventDefault();
//   axios.get('http://127.0.0.1:8090/api/collections/users/records', )
//   .then(({ data }) => {
//     console.log(data);
//   })
//   .catch(console.error);
// }

const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('http://127.0.0.1:8090/api/collections/users/records', {
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    residentAlum: event.target.residentAlum.value,
    cohortLocation: event.target.cohortLocation.value,
    city: event.target.city.value,
    employed: event.target.employed.value,
    employer: event.target.employer.value,
    salary: event.target.salary.value,
    cohortNum: event.target.cohortNum.value,
    email: event.target.email.value,
    password: '00000000',
    passwordConfirm: '00000000',
    linkedin: event.target.linkedin.value,
    verification: event.target.verification.value,
  })
  .then(() => {
    console.log('finished');
  })
  .catch(console.error);
  // console.log(event.target.rOrA.value)
  // console.log(event.target.lname.value)
  // console.log(typeof event.target.cohortLocation.value)
}

// const data = /* our form datas */

// const newUser = await pb.collection('users').create(data);
//(Signup.jsx?b265:26:50)
  return (
    <form onSubmit={handleSubmit}>
        <label for='firstName'>First name:</label>
        <input type='text' id='firstName' placeholder='first name' required></input>
        
        <label for='lastName'>Last name:</label>
        <input type='text' id='lastName' placeholder='last name' required></input>

        <label for='email'>Email:<br></br></label>
        <input type='text' id='email' placeholder='email' required></input>

        {/* <label for='password'>Password:</label>
        <input type='password' id='password' placeholder='password' required></input>

        <label for='passwordConfirm'>Password:</label>
        <input type='password' id='passwordConfirm' placeholder='password confirm' required></input> */}

        <label for='residentAlum'>Resident/Alumni:<br></br></label>
        <select id='residentAlum'> 
          <option value="resident">Resident</option>
          <option value="alumni">Alumni</option>
        </select>

        <select id='cohortLocation'> 
          <option value="WCRI">WCRI</option>
          <option value="ECRI">ECRI</option>
          <option value="PTRI">PTRI</option>
          <option value="remote">remote</option>
        </select>

        <label for='cohortNum'>Cohort Number:<br></br></label>
        <input type='number' id='cohortNum' placeholder='cohortNum' required></input>
        
        <label for='city'>City:<br></br></label>
        <input type='text' id='city' placeholder='city' required></input>

        <label for='linkedin'>Linkedin:<br></br></label>
        <input type='url' id='linkedin' placeholder='linkedin' required></input>

        <select id='employed'> 
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <label for='employer'>Employer:<br></br></label>
        <input type='text' id='employer' placeholder='Job Title' required></input>
        
        <label for='salary'>Estimated Salary:<br></br></label>
        <input type='number' id='salary' placeholder='estimated salary' required></input>
        {/* <select id='salary'> 
          <option value="0"> - </option>
          <option value="75000">  $75,000</option>
          <option value="100000">$100,000</option>
          <option value="125000">$125,000</option>
          <option value="150000">$150,000</option>
          <option value="175000">$175,000</option>
          <option value="200000">$200,000</option>
          <option value="225000">$225,000</option>
          <option value="250000">$250,000</option>
          </select> */}
        
        <label for='verification'>Verification code:<br></br></label>
        <input type='text' id='verification' placeholder='verification code' required></input>
        <button type='submit'>Submit</button>
    </form>
  )
}
export default Signup


/* 
handleSubmit = (event) => {
  event.preventDefault();
  axios.get('/restaurants')
  .then(({ data }) => {
    console.log(data);
  })
  .catch(console.error);
}
*/

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [residentAlumni, setresidentAlumni] = useState('');
//   const [jobTitle, setjobTitle] = useState('');
//   const [salary, setSalary] = useState(''); 
//   const [email, setEmail] = useState('')
//   const [verificationCode, setVerificationCode] = useState('');
  
//   const signUp = async () => {
//     try {await fetch('', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({})
//     })
//     }
// //     catch (err) {
// //         throw err;
// //   }
// }

