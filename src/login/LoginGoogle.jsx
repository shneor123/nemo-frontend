import React  from 'react';
import { GoogleLogin } from 'react-google-login';
import { useLocation, useNavigate } from 'react-router';
import { CLIENT_ID } from '../.secret/api';

export function LoginWithGoogle() {
    const navigate = useNavigate()

    const { pathname } = useLocation()

    const handleFailure = (res) => {
        console.log('couldnt login', res)
    }

    const handleLogin = (googleUser) => {
        const { profileObj } = googleUser
        const user = {
          email: profileObj.email,
          firstName: profileObj.givenName,
          lastName: profileObj.familyName,
          imageUrl: profileObj.imageUrl,
          googleId: profileObj.googleId
        }
        console.log(user)
        navigate('/workspace')
      }
    
    return (
        <div className='login-google'>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Continue with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    )
}