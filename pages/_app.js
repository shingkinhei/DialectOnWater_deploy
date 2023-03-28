import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const protectedRoutes = ["/home", "/addNewitem"];
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-in/phone",
    "/sign-up",
    "/reset-password",
  ];

  return (
    <AuthProvider>
      <PrivateRoute
        protectedRoutes={protectedRoutes}
        publicRoutes={publicRoutes}
      >
        <Component {...pageProps} />
      </PrivateRoute>
    </AuthProvider>
  );
}
