// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {useNavigate} from'react-router-dom';

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubcrised = auth.onIdTokenChanged((user) => {
      console.log("user : ", user);
      if(user?.uid){
        setUser(user);
        localStorage.setItem('accessToken', user.accessToken);
        return
      }
      //reset user info
      setUser({})
      localStorage.clear();
      navigate('/login');
    });

    return () => {
      unsubcrised();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
