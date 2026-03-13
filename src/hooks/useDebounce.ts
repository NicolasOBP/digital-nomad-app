import { useEffect, useState } from "react";

export function useDebounce<T>(value: T) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
