import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }

    useEffect(() => {
        const allThemes = localStorage.getItem('theme')
        if (allThemes) {
            setTheme(allThemes);
        }
    }, [])

    return [theme, toggleTheme];
};

export default useDarkMode;
