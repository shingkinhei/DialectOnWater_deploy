import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const protectedRoutes = ["/home", "/addNewitem", "setting"];
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-in/phone",
    "/sign-up",
    "/reset-password",
  ];
  const dialectURL = "/dialect";

  return (
    <AuthProvider>
      <PrivateRoute
        protectedRoutes={protectedRoutes}
        publicRoutes={publicRoutes}
        dialectURL={dialectURL}
      >
        <Component {...pageProps} />
      </PrivateRoute>
    </AuthProvider>
  );
}
