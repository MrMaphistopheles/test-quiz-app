import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
export default function useFakeUser() {
  const [key, setKey] = useState("");
  useEffect(() => {
    const key = window.localStorage.getItem("key");

    if (key) setKey(key);

    if (!key) {
      const newKey: string = uuidv4();
      window.localStorage.setItem("key", newKey);
      setKey(newKey);
    }
  }, []);

  return { key };
}
