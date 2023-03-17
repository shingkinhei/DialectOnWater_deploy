import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
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

export default function Example() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    {
      password == confirmPassword
        ? createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log(userCredential);
              // router.push("/dashboard");
              setDoc(doc(db, "users", userCredential.user.uid), {
                // get database
                displayName: displayName,
                email: userCredential.user.email,
                created_at: serverTimestamp(),
                role: "member",
              });
              setDisplayName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setSuccess("Account created successfully.");
            })
            .catch((error) => {
              console.log(error.message);
              {
                error.message === "Firebase: Error (auth/email-already-in-use)."
                  ? setError("Account already exists.")
                  : setError(error.message);
              }
            })
        : setError("Passwords do not match.");
    }
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
          />
          <Input
            size="lg"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Input
            type="password"
            size="lg"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
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
        <Button className="mt-6" fullWidth onClick={handleSignUp}>
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
