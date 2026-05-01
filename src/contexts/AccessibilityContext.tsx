import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  isAccessible: boolean;
  toggle: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isAccessible: false,
  toggle: () => {},
});

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isAccessible, setIsAccessible] = useState(() => {
    return localStorage.getItem("accessible") === "1";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("accessible", isAccessible);
    localStorage.setItem("accessible", isAccessible ? "1" : "0");
  }, [isAccessible]);

  return (
    <AccessibilityContext.Provider value={{ isAccessible, toggle: () => setIsAccessible((v) => !v) }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export default AccessibilityContext;
