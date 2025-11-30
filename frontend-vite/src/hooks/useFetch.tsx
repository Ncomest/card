import { useState, useEffect, useCallback } from "react";

interface IFetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useFetch<T>(
  url: string,
  method?: string,
  body?: any
  // options?: RequestInit
) {
  const [state, setState] = useState<IFetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    setState({
      data: null,
      error: null,
      loading: true,
    });

    const token = localStorage.getItem("accessToken") || null;

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorizaion": `Bearer ${token}`,
      },
      body: body,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = (await response.json()) as T;

      setState({ data, error: null, loading: false });
    } catch (error) {
      setState({
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
    }
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
