import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
