import React from 'react';
import { GoogleLogin } from 'react-google-login'
import google from "../../assets/svg/google.svg";
;


export function LoginWithGoogle({ onLoginGoogle, }) {
    const handleFailure = (res) => {
        console.log('couldnt login')
    }

    const handleLogin = (googleData) => {
        onLoginGoogle(googleData)
    }
    return (
        <div>
            <GoogleLogin
                clientId={"349715903171-rm59q64faelu1sivune89lktj8kf78s0.apps.googleusercontent.com"}
                render={renderProps => (
                    <span className='span-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <div className='button-content'>
                        <img src={google} className="google-icon" />
                            <p>Continue with Google</p>
                        </div>
                    </span>
                )}
                buttonText="Log in with Google $$"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            >
            </GoogleLogin>
        </div>
    )
}