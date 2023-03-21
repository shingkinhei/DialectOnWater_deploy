import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Button } from "@material-tailwind/react";

export default function SignOutButton() {
  const { logOut } = useAuth();

  function handleSignOut(e) {
    e.preventDefault();
    logOut();
  }
  return (
    <Button
      onClick={handleSignOut}
      className="mt-6 text-md bg-black shadow-none"
    >
      登出
    </Button>
  );
}
