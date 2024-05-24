// /app/lib/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const handleBatteryChange = (battery) => {
            if (battery.level * 100 < 20) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        };

        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                handleBatteryChange(battery);
                battery.addEventListener('levelchange', () => handleBatteryChange(battery));
            });
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext };
