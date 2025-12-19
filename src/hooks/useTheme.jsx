// import { useEffect, useState } from "react";

import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

// const useTheme = () => {
//   const [theme, setTheme] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("theme") || "system";
//     }
//     return "system";
//   });

//   useEffect(() => {
//     const root = document.documentElement;

//     const applyTheme = (currentTheme) => {
//       if (currentTheme === "dark") {
//         root.setAttribute("data-theme", "dark");
//       } else if (currentTheme === "light") {
//         root.setAttribute("data-theme", "light");
//       } else {
//         // system theme
//         const systemDark = window.matchMedia(
//           "(prefers-color-scheme: dark)"
//         ).matches;
//         root.setAttribute("data-theme", systemDark ? "dark" : "light");
//       }
//     };

//     applyTheme(theme);

//     localStorage.setItem("theme", theme);

//     // Listen for system changes if theme = "system"
//     if (theme === "system") {
//       const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//       const handleChange = () => applyTheme("system");
//       mediaQuery.addEventListener("change", handleChange);
//       return () => mediaQuery.removeEventListener("change", handleChange);
//     }
//   }, [theme]);

//   return { theme, setTheme };
// };

// export default useTheme;

// import { useContext } from "react";
// import { ThemeContext } from "../Context/Theme/ThemeContext";

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
