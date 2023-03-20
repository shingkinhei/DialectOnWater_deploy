import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { auth, db } from "@/firebase";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { getRedirectResult } from "firebase/auth";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    logOut,
    currentUser,
    signInMessage,
    setSignInMessage,
    localSignIn,
    googleSignIn,
    facebookSignIn,
    anonymousSignIn,
  } = useAuth();

  useEffect(() => {
    // handling response for Google & Facebook login
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          return;
        } else {
          const userExists = doc(db, "users", result.user.uid);
          async function fetchUser() {
            // prevent overwriting existing user information
            try {
              const userSnap = await getDoc(userExists);
              if (userSnap.data() !== undefined) {
                return;
              } else {
                if (result && result.providerId == "google.com") {
                  setDoc(doc(db, "users", result.user.uid), {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    phoneNumber: result.user.phoneNumber,
                    createdAt: serverTimestamp(),
                    role: "member",
                    signUpMethod: "Google",
                  });
                }
                if (result && result.providerId == "facebook.com") {
                  setDoc(doc(db, "users", result.user.uid), {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    phoneNumber: result.user.phoneNumber,
                    createdAt: serverTimestamp(),
                    role: "member",
                    signUpMethod: "Facebook",
                  });
                }
              }
            } catch (error) {
              console.log(error);
            }
          }

          fetchUser();
        }
      })
      .catch((error) =>
        error.message ==
        "Firebase: Error (auth/account-exists-with-different-credential)."
          ? setError("該電郵地址已以其他登入方式註冊。")
          : setError(error.message)
      );
  }, []);

  useEffect(() => {
    signInMessage && setError("電郵地址或密碼錯誤。");
    // signInMessage == "Firebase: Error (auth/user-not-found)." &&
    //   setError("無此帳戶紀錄。");
  }, [signInMessage]);

  function handleLocalSignIn(e) {
    e.preventDefault();
    setSignInMessage("");
    setLoading(true);
    setError("");

    if (email == "") {
      setError("請輸入電郵地址。");
      setLoading(false);
      return;
    }

    if (password == "") {
      setError("請輸入密碼。");
      setLoading(false);
      return;
    }

    localSignIn(email, password);
    setPassword("");
    setLoading(false);
  }

  function handleGoogleSignIn(e) {
    e.preventDefault();
    googleSignIn();
  }

  function handleFacebookSignIn(e) {
    e.preventDefault();
    facebookSignIn();
  }

  function handleAnonymousSignIn(e) {
    e.preventDefault();
    anonymousSignIn();
  }

  function handleSignOut(e) {
    e.preventDefault();
    logOut();
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        登入
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="電郵地址"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            error={error && error == "請輸入電郵地址。" ? true : false}
          />
          <Input
            type="password"
            size="lg"
            label="密碼"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            error={error && error == "請輸入密碼。" ? true : false}
          />
        </div>
        {error && (
          <Typography className="mt-1 font-normal text-red-400">
            {error}
          </Typography>
        )}
        <Button
          onClick={handleLocalSignIn}
          className="mt-6 text-md"
          fullWidth
          disabled={loading ? true : false}
        >
          登入
        </Button>
        <fieldset className="mt-6 border-t border-slate-300">
          <legend className="mx-auto px-4 text-gray-700 font-bold">
            或用以下方式登入
          </legend>
          <Button
            onClick={() => router.push("/sign-in/phone")}
            className="mt-6 text-md"
            fullWidth
            disabled={loading ? true : false}
          >
            電話號碼
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            className="mt-6 text-md"
            fullWidth
            disabled={loading ? true : false}
          >
            Google
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            className="mt-6 text-md"
            fullWidth
            disabled={loading ? true : false}
          >
            Facebook
          </Button>
          <Button
            onClick={handleAnonymousSignIn}
            className="mt-6 text-md"
            fullWidth
            disabled={loading ? true : false}
          >
            訪客模式
          </Button>
        </fieldset>
        <Button
          onClick={handleSignOut}
          className="mt-6 text-md bg-black shadow-none"
          fullWidth
        >
          登出
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          未有帳戶？{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer"
          >
            註冊
          </span>
        </Typography>
      </form>
      {currentUser && (
        <div>
          {currentUser.email} {currentUser.phoneNumber}
        </div>
      )}
    </Card>
  );
}
