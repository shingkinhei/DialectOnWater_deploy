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
import { db } from "@/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignInPhone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [otpInfo, setOtpInfo] = useState("");

  const { currentUser, signInMessage, setSignInMessage, setUpRecaptcha } =
    useAuth();

  useEffect(() => {
    signInMessage && setError(signInMessage);
    // signInMessage == "Firebase: Error (auth/user-not-found)." &&
    //   setError("無此帳戶紀錄。");
  }, [signInMessage]);

  async function handlePhoneSignIn(e) {
    e.preventDefault();
    setSignInMessage("");
    setLoading(true);
    setError("");

    var HKNumber = `+852${phoneNumber}`;

    if (phoneNumber == "") {
      setError("請輸電話號碼");
      setLoading(false);
      return;
    }

    if (phoneNumber.length < 8 || phoneNumber.length > 8) {
      setError(
        "請輸入8位數字電話號碼。本服務暫只支援香港流動電話服務供應商之用戶。"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await setUpRecaptcha(HKNumber).catch((err) => {
        // << THIS
        console.log(err);
        setError(err.message);
      });
      setOtpInfo(response);
      setFlag(true);
    } catch {
      (error) => console.log(error);
    }

    setLoading(false);
  }

  async function verifyOTP(e) {
    e.preventDefault();
    setSignInMessage("");
    setLoading(true);
    setError("");

    if (otp == "" || otp.length < 6 || otp.length > 6) {
      setError("請輸入6位數字驗證碼。");
      setLoading(false);
      return;
    }

    try {
      await otpInfo
        .confirm(otp) // the .confirm methods come from otpInfo, which is an object returned from << THIS above.
        // then navigate. check video 30:35
        .then((userCredential) => {
          const userExists = doc(db, "users", userCredential.user.uid);
          async function fetchUser() {
            // prevent overwriting existing user information
            try {
              const userSnap = await getDoc(userExists);
              if (userSnap.data() !== undefined) {
                return;
              } else {
                setDoc(doc(db, "users", userCredential.user.uid), {
                  displayName: null,
                  email: null,
                  phoneNumber: phoneNumber,
                  createdAt: serverTimestamp(),
                  role: "member",
                  signUpMethod: "phone number",
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
          fetchUser();
        })
        .catch((err) =>
          err.message == "Firebase: Error (auth/invalid-verification-code)."
            ? setError("無效驗證碼，請重新輸入。")
            : setError(err.message)
        );
    } catch {
      (error) => setError(error.message);
    }

    setLoading(false);
  }

  return (
    <Card color="transparent" shadow={false}>
      {!flag && (
        <>
          <Typography variant="h4" color="blue-gray">
            請輸入電話號碼
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="number"
                size="lg"
                label="電話號碼"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                error={error ? true : false}
              />
              <div id="recaptcha-container" />
            </div>
            {error && (
              <Typography className="mt-1 font-normal text-red-400">
                {error}
              </Typography>
            )}
            <Button
              onClick={handlePhoneSignIn}
              className="mt-6 text-md"
              fullWidth
              disabled={loading ? true : false}
            >
              獲取驗證碼
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                返回
              </a>
            </Typography>
          </form>
        </>
      )}
      {flag && (
        <>
          <Typography variant="h4" color="blue-gray">
            請輸入短訊內6位數字驗證碼
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="number"
                size="lg"
                label="6位數字驗證碼"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
                error={error ? true : false}
              />
              <div id="recaptcha-container" />
              {/* AuthContext setUpRecaptcha() */}
            </div>
            {error && (
              <Typography className="mt-1 font-normal text-red-400">
                {error}
              </Typography>
            )}
            <Button
              onClick={verifyOTP}
              className="mt-6 text-md"
              fullWidth
              disabled={loading ? true : false}
            >
              驗證
            </Button>
          </form>
        </>
      )}
      {currentUser && (
        <div>
          {currentUser.email}
          {currentUser.phoneNumber}
        </div>
      )}
    </Card>
  );
}
