import { useCallback, useState } from "react";

export function useLocalStorage(key, initialValue) {
  //Test update
  //asasjdlkajslkdjsad
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [storedValue, setValue, remove];
}
