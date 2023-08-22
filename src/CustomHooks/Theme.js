import { useState, useEffect } from "react";

export const useTheme = () => {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark(!dark);
  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [dark]);
  return [toggle, dark];
};
