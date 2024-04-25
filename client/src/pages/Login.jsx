
// eslint-disable-next-line no-unused-vars
import { Button, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import{GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';

export default function Login() {

  const auth = getAuth();
  const handleLoginWithGoogle = async () =>{
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log({res});
  }
  return (
    <>
      <Typography variant="h5" sx={{marginBottom:'10px'}}>Welcome to Note App</Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with google
      </Button>
    </>
  )
}
