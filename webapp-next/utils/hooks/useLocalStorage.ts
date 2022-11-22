import React from "react";

const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    if (newValue) {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {}
    } else {
      try {
        window.localStorage.removeItem(keyName);
      } catch (err) {}
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
