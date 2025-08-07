import { useEffect, useState } from "react";

export interface DataType {}

export const useFetch = <T>(url: string, opts: RequestInit = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`, opts);
        if (!response.ok) throw new Error("Response is not ok!");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [{ data, loading }];
};
