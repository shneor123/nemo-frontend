import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';
import { CLIENT_ID } from '../.secret/api';
import googleIcon from '../assets/img/guest.png'

export function LoginWithGoogle() {
    const navigate = useNavigate()


    const handleFailure = (res) => {
        console.log('couldnt login', res)
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [url, setUrl] = useState('')
    const handleLogin = res => {
        setName(res.profileObj.name)
        setEmail(res.profileObj.email)
        setUrl(res.profileObj.imageUrl)
        console.log(res.profileObj)
        // navigate('/workspace')
    }


    return (
        <div className='login-google'>
            {name && email && url && <>
                <h1> {name}</h1>
                <h1> {email}</h1>
                <img src={url} alt={'lll'} />
            </>
            }

            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Continue with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
            />
        </div>
    )
}