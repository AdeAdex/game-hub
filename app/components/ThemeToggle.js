import React, { useContext } from 'react';
import ThemeContext from '@/app/lib/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌞' : '🌜'}
        </button>
    );
};

export default ThemeToggle;
