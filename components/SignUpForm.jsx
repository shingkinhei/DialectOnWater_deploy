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

export default function SignUpForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, signUpMessage, setSignUpMessage } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setSignUpMessage("");
  }, []);

  useEffect(() => {
    var count = 6;
    function countDown() {
      setLoading(true);
      var counting = setInterval(() => {
        count--;
        setSuccess(`成功建立帳戶。${count}秒後重新導向至主頁。`);
        if (count === 0) clearInterval(counting);
      }, 1000);
    }

    signUpMessage == "Success!"
      ? countDown()
      : // setSuccess(
      //     `Account created successfully. Redirecting in ${count} seconds.`
      //   )
      signUpMessage == "Firebase: Error (auth/email-already-in-use)."
      ? setError("電郵地址已被註冊。")
      : setError(signUpMessage);
  }, [signUpMessage]);

  function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setSignUpMessage("");
    setError("");
    setSuccess("");

    if (displayName == "") {
      setError("請輸入姓名。");
      setLoading(false);
      return;
    }

    if (email == "") {
      setError("請輸入電郵地址。");
      setLoading(false);
      return;
    }

    if (password == "" || confirmPassword == "") {
      setError("請輸入密碼。");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("兩次密碼不相符。");
      setLoading(false);
      return;
    }

    signup(email, password, displayName);
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        建立帳戶
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        請輸入以下資訊。
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="姓名"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
            error={error == "請輸入姓名。" ? true : false}
          />
          <Input
            size="lg"
            label="電郵地址"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            error={
              error == "電郵地址已被註冊。" || error == "請輸入電郵地址。"
                ? true
                : false
            }
          />
          <Input
            type="password"
            size="lg"
            label="密碼"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            error={
              error == "兩次密碼不相符。" || error == "請輸入密碼。"
                ? true
                : false
            }
          />
          <Input
            type="password"
            size="lg"
            label="確認密碼"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            error={
              error == "兩次密碼不相符。" || error == "請輸入密碼。"
                ? true
                : false
            }
          />
        </div>
        {/* <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
        {error && (
          <Typography className="mt-1 font-normal text-red-400">
            {error}
          </Typography>
        )}
        {success && (
          <Typography className="mt-1 font-normal text-green-400">
            {success}
          </Typography>
        )}
        <Button
          className="mt-6 text-md"
          fullWidth
          onClick={handleSignUp}
          disabled={loading ? true : false}
        >
          建立
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          已有帳戶？{" "}
          <a
            href="/sign-in"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            登入
          </a>
        </Typography>
      </form>
    </Card>
  );
}
