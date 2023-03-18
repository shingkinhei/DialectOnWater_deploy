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
    signUpMessage == "Success!"
      ? setSuccess("Account created successfully.")
      : signUpMessage == "Firebase: Error (auth/email-already-in-use)."
      ? setError("Account already exists.")
      : setError(signUpMessage);
  }, [signUpMessage]);

  function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setSignUpMessage("");
    setError("");
    setSuccess("");

    if (displayName == "") {
      setError("Please fill in your name.");
      setLoading(false);
      return;
    }

    if (email == "") {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    if (password == "" || confirmPassword == "") {
      setError("Please enter password.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    signup(email, password, displayName);
    setPassword("");
    setConfirmPassword("");
    setLoading(false);

    // error.message === "Firebase: Error (auth/email-already-in-use)."
    //   ? setError("Account already exists.")
    //   : setError(error.message);
  }

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            required
            error={error == "Please fill in your name." ? true : false}
          />
          <Input
            size="lg"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            error={
              error == "Account already exists." ||
              error == "Please enter your email."
                ? true
                : false
            }
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            error={
              error == "Passwords do not match." ||
              error == "Please enter password."
                ? true
                : false
            }
          />
          <Input
            type="password"
            size="lg"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            error={
              error == "Passwords do not match." ||
              error == "Please enter password."
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
          className="mt-6"
          fullWidth
          onClick={handleSignUp}
          disabled={loading ? true : false}
        >
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
