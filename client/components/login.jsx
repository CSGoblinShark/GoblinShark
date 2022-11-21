import { hot } from 'react-hot-loader/root';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, {Component,  useState, useEffect } from 'react';
import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";


// Create a react functional hook component that has functionality to initiate oAuth
    // Set up https://pocketbase.io/docs/
    // pocketbase access so we can access the database
    // Look into Oauth through pocketbase

const clientId = '210769127399-2l6p37ude8fr30ufsv4hmjkhkfdcb2jj.apps.googleusercontent.com'

function LoginButton(props) {
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    let email = 'email@gmail.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
    })
//login verifified by google -> route to table component
    const onSuccess = (res) => {
        email = res.profileObj
        console.log('success')
        const emailObj = { email }
        // console.log(emailObj)

        axios.get('http://127.0.0.1:8090/api/collections/users/records', { params: emailObj })
        .then((data) => {
            // if data is null, redirect to sign up
            // else redirect to table
            // console.log('before set', success)
            // console.log('axios');
            console.log(data);
            setSuccess(!success);
            setFail(!fail);
        })
        .catch(console.error);
    }
            
//fail verif by google -> route to signup page
    const onFailure = (res) => {
        //on failure redirect to signup
    }
    const signup = []
    if (fail) {
        signup.push(<Redirect to = {{
            pathname: '/signup',
            state: { email: email }
        }}
        /> )
    }
   
    return (
        // <button>test</button>
        // <h1 id="test123">hello from button</h1>
        <div id='loginPage'>
        {/* {!success ?  */}
        <h1 id='welcomeText'> Welcome to the social media app for Codesmith Residents/Alumni!</h1> 
        <GoogleLogin 
            id='LoginButton'
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
        {/* // :
        // <Redirect to = {{
        //     pathname: '/signup',
        //     state: { email: email }
        // }}
        // /> 
        // }
        // {signup} */}
        </div>
    )
}
//<Box setState={setState} state={state}/>
export default withRouter(LoginButton);
