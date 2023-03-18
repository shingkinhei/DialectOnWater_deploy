import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
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

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            error={error == "Account already exists." ? true : false}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            error={error == "Passwords do not match." ? true : false}
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
        <Button className="mt-6 text-md" fullWidth>
          登入
        </Button>
      </form>
    </Card>
  );
}
