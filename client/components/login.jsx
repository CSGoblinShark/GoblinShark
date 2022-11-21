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
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setUrl] = useState('')
    let fetchEmail = '';
    // let lastName;
    // let firstName;

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
        fetchEmail = res.profileObj.email
        // const emailObj = { email }
        console.log(res.profileObj.imageUrl);
        setEmail(res.profileObj.email);
        // lastName = res.profileObj.familyName;
        setFirstName(res.profileObj.givenName);
        // firstName = res.profileObj.givenName;
        setLastName(res.profileObj.familyName);
        //res.profileObj.givenName
        setUrl(res.profileObj.imageUrl);

        // console.log(emailObj)
        // console.log(`http://127.0.0.1:8090/api/collections/users/records/?filter=(email=%27${fetchEmail}%27)`)

        axios.get('/api/signin', { params: {email: fetchEmail} })
            .then(({data}) => {
                if (!Object.keys(data).length) setFail(!fail)
                setSuccess(!success);
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
            state: { email: email, 
                    firstName: firstName, 
                    lastName: lastName,
                    imageUrl: `${imageUrl}`
                    }
        }}
        /> )
    }
   
    return (
        // <button>test</button>
        // <h1 id="test123">hello from button</h1>
        <div id='loginPage'>
        {!success ? 
        <div>
        <h1 id='welcomeText'> Welcome to the social media app for Codesmith Residents/Alumni!</h1> 
        <GoogleLogin 
            id='LoginButton'
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
        />
        </div>
         :
        <Redirect to='/home'
        /> 
        }
        {signup}
        </div>
    )
}
//<Box setState={setState} state={state}/>
export default withRouter(LoginButton);
