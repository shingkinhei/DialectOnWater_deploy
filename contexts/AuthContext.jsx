import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [signUpMessage, setSignUpMessage] = useState("");

  async function signup(email, password, displayName) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setDoc(doc(db, "users", userCredential.user.uid), {
          displayName: displayName,
          email: userCredential.user.email,
          created_at: serverTimestamp(),
          role: "member",
        });
      })
      .then(() => setSignUpMessage("Success!"))
      .catch((error) => {
        setSignUpMessage(error.message);
      });
  }

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return unsubsribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signUpMessage,
    setSignUpMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
