import React from "react";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/user.actions";

export const LoginWithGoogle = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(googleUser => {
      const id_token = googleUser.getAuthResponse().id_token;
      dispatch(login({ id_token }));
    });
  };

  return (
    <button onClick={handleGoogleLogin}>Sign in with Google</button>
  );
};
