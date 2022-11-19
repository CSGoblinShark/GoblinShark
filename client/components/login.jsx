import { hot } from 'react-hot-loader/root';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, {Component,  useState, useEffect } from 'react';
import { render } from 'react-dom'
import ReactDOM from 'react-dom';


// Create a react functional hook component that has functionality to initiate oAuth
    // Set up https://pocketbase.io/docs/
    // pocketbase access so we can access the database
    // Look into Oauth through pocketbase

const clientId = '210769127399-2l6p37ude8fr30ufsv4hmjkhkfdcb2jj.apps.googleusercontent.com'

function LoginButton() {
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
    })

    const onSuccess = (res) => {
        console.log('success', res)
    }

    const onFailure = (res) => {
        console.log('failed', err)
    }

    return (
        // <button>test</button>
        // <h1 id="test123">hello from button</h1>
        <GoogleLogin
            id='LoginButton'
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}

export default LoginButton;
