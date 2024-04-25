// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const auth = getAuth();

  useEffect(() => {
    const unsubcrised = auth.onIdTokenChanged((user) => {
      console.log("user : ", user);
    });

    return () => {
      unsubcrised();
    };
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
