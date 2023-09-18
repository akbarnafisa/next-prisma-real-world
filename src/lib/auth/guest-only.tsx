import { useEffect } from "react";
import { useCurrentUser } from "../hooks/use-current-user";
import Router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function guestOnly(Component: any) {
  const GuestComponent = () => {
    const { user, loading } = useCurrentUser();
    useEffect(() => {
      if (!loading && user) {
        Router.replace("/");
      }
    }, [user, loading]);

    if (loading) return <LoadingSpinner />;
    return !user ? <Component /> : <LoadingSpinner />;
  };

  return GuestComponent;
}
