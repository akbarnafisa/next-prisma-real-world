import { useEffect, useState } from "react";
import { useMessageHandler } from "./use-message";
import { useToken } from "./use-token";
import { useCurrentUserLazyQuery } from "@/generated/graphql";

export function useCurrentUser() {
  const { token } = useToken();
  const { handleErrors } = useMessageHandler();
  const [loading, setLoading] = useState(true)
  // TODO: check the cache 
  const [loadCurrentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    // TOOD: check error handlres for none mode
    onError: (err) => handleErrors({ err, mode: 'none' }),
  })

  useEffect(() => {
    const loadData = async () => {
      if (token) await loadCurrentUser();
      setLoading(false)
    }
    loadData()
  }, [loadCurrentUser, token])

  return { user: data?.currentUser, loading };
}