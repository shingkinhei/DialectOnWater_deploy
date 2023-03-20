import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true); // prevent flickering by auth when refreshing page.
  const [currentUser, setCurrentUser] = useState();
  const [signUpMessage, setSignUpMessage] = useState("");
  const [signInMessage, setSignInMessage] = useState("");

  async function logOut() {
    return await signOut(auth)
      .then(() => {
        setCurrentUser(null);
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  async function localSignIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged In");
      })
      .catch((error) => {
        setSignInMessage(error.message);
      });
  }

  function setUpRecaptcha(phoneNumber) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container", // render recaptcha inside a div with id "recaptcha-container"
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logOut,
    signup,
    signUpMessage,
    setSignUpMessage,
    signInMessage,
    setSignInMessage,
    localSignIn,
    setUpRecaptcha,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
