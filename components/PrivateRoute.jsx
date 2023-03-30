import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/contexts/AuthContext";
import FullPageLoader from "./FullPageLoader";

export default function PrivateRoute({
  protectedRoutes,
  publicRoutes,
  dialectURL,
  children,
}) {
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  const pathIsPublic = publicRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!loading && !currentUser && router.pathname.includes(dialectURL)) {
      router.push("/sign-in");
    }

    if (!loading && !currentUser && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/sign-in");
    }

    if (!loading && currentUser && pathIsPublic) {
      router.push("/home");
    }
  }, [currentUser, loading, pathIsProtected, pathIsPublic]);

  if ((loading || !currentUser) && router.pathname.includes(dialectURL)) {
    return <FullPageLoader />;
  }

  if ((loading || !currentUser) && pathIsProtected) {
    return <FullPageLoader />;
  }

  if ((loading || currentUser) && pathIsPublic) {
    return <FullPageLoader />;
  }

  return children;
}
