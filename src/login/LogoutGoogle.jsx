import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../.secret/api';

export function LogoutWithGoogle() {
    const handleLogout = (res) => {
        console.log(" successfulli!")
    }

    return (
        <div>
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={handleLogout}
            />
        </div>
    )
}