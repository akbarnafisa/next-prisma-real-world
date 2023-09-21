import { useEffect, useState } from "react";
import { useMessageHandler } from "./use-message";
import { useToken } from "./use-token";
import { useCurrentUserLazyQuery } from "@/generated/graphql";

export function useCurrentUser() {
  const { token } = useToken();
  const { handleErrors } = useMessageHandler();
  const [loading, setLoading] = useState(true)
  const [loadCurrentUser, { data }] = useCurrentUserLazyQuery({
    // https://www.apollographql.com/docs/react/data/queries/#cache-first
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    errorPolicy: 'all',
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
