import { useEffect } from "react";
import { useCurrentUser } from "../hooks/use-current-user";
import Router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function guestOnly(Component: any) {
  const AuthenticatedComponent = () => {
    const { user, loading } = useCurrentUser();
    useEffect(() => {
      if (!loading && !user) {
        Router.replace("/login");
      }
    }, [user, loading]);

    if (loading) return <LoadingSpinner />;

    return user ? <Component {...{ user }}/> : <LoadingSpinner />;
  };

  return AuthenticatedComponent;
}
