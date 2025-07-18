import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export function useAxios<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get<T>(url)
      .then(res => isMounted && setData(res.data))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, [url]);
  console.log("data, isLoading, error", data, isLoading, error);
  return { data, isLoading, error };
}
