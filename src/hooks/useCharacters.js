import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get(`${url}=${query}`, {
        signal,
      })
      .then(({ data }) => setCharacters(data.results))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("successfully aborted");
        } else {
          setCharacters([]);
          toast.error(error.response?.data.error || error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, characters };
}
