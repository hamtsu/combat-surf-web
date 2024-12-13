"use client"
import { useState, useEffect } from "react"

type Theme = "light" | "dark"

const useDarkMode = () => {
    const [theme, setTheme] = useState<Theme>(typeof window !== "undefined" && (localStorage.theme ? localStorage.theme : 'dark'))

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [theme])

    return [theme, setTheme] as const;
}

export default useDarkMode;