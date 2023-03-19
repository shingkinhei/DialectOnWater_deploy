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
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logOut, currentUser, localSignIn, signInMessage, setSignInMessage } =
    useAuth();

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
            error={error && true}
          />
          <Input
            type="password"
            size="lg"
            label="密碼"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            error={error && true}
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
            className="mt-6 text-md"
            fullWidth
            disabled={loading ? true : false}
          >
            -
          </Button>
        </fieldset>
        <Button
          onClick={handleSignOut}
          className="mt-6 text-md bg-black shadow-none"
          fullWidth
        >
          登出
        </Button>
      </form>
      {currentUser && <div>{currentUser.email}</div>}
    </Card>
  );
}
