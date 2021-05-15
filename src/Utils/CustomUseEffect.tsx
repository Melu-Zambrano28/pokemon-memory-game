import { useEffect, useState } from "react";

type useFetchResponse = {
  loading: boolean;
  error: string | null;
  response: string | null;
};
const useFetch = (path: string): useFetchResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const chiamataServer = await (await fetch(path)).json();
        setResponse(chiamataServer);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => console.log("I'm Unmounting :P");
  }, [path]);

  return { loading: loading, error: error, response: response };
};



export { useFetch};
