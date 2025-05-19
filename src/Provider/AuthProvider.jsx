import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./Firebase";

import useAxiosLocal from "../Hook/useAxiosLocal";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const localAxios = useAxiosLocal();
  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      if (currentUser) {
        const user = { email: currentUser.email };
        localAxios.post("/jwt", user).then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            setLoading(false);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("token");
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [localAxios]);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);
  const authInfo = { user, login, logout, loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
