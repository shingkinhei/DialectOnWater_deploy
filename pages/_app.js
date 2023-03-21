import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const protectedRoutes = ["/home"];
  const publicRoutes = ["/", "/sign-in", "/sign-in/phone", "/sign-up"];

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
