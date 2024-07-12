// /app/lib/ThemeContext.js

'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { ThemeContextType } from '@/app/types/theme/theme';

// Function to get the saved theme from localStorage or default to 'light'
const getInitialTheme = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
  }
  return 'light';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save the current theme to localStorage
      window.localStorage.setItem('theme', theme);

      // Ensure we only add theme classes in the browser environment
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
