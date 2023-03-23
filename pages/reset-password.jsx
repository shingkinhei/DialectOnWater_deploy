import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export default function resetPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { currentUser, signInMessage, resetPassword } = useAuth();

  useEffect(() => {
    if (signInMessage == "Firebase: Error (auth/invalid-email).") {
      setError("無此電郵地址紀錄。");
    } else if (signInMessage == "Success!") {
      setSuccess("成功申請。請檢查電子郵件信箱以繼續重設密碼程序。");
    } else if (signInMessage) {
      setError(signInMessage);
    }
  }, [signInMessage]);

  useEffect(() => {
    setError("");
    setSuccess("");
  }, []);

  function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);

    if (email == "") {
      setError("請輸入電郵地址。");
      setLoading(false);
      return;
    }

    resetPassword(email);
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        重設密碼
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        只適用於以電郵地址及密碼註冊之帳戶
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
        </div>
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
          onClick={handleResetPassword}
          className="mt-6 text-md"
          fullWidth
          disabled={loading ? true : false}
        >
          重設
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          <span
            onClick={() => router.push("/sign-in")}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer"
          >
            返回
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
