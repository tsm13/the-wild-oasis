import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface IDarkMode {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface Props {
  children: ReactNode;
}

const DarkModeContext = createContext<IDarkMode | undefined>(undefined);

function DarkModeProvider({ children }: Props) {
  const matchMediaDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    matchMediaDark,
    "isDarkMode"
  );

  const toggleDarkMode = () => {
    setIsDarkMode((darkMode) => !darkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode context was used outside of DarkModeProvider!");
  return context;
}

export { DarkModeProvider, useDarkMode };
