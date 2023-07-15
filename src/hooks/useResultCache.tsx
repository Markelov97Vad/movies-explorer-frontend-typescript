import { useCallback } from "react";
import { MovieType } from "../components/Types/MovieType";

export type setResultCacheType = {
  [index: string]: string | MovieType[] | boolean | undefined
}

function useResultCache() {
  const setResultCache = useCallback((key: string, result: setResultCacheType) => {
    const current = JSON.parse(sessionStorage.getItem(key) as string);
    sessionStorage.setItem(key, JSON.stringify({ ...current, ...result }));
  }, [])

  const getResultCache = useCallback((key: string) => {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }, [])

  return { setResultCache, getResultCache };
}

export default useResultCache;